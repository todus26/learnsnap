package com.learnsnap.controller;

import com.learnsnap.domain.video.DifficultyLevel;
import com.learnsnap.dto.VideoRequest;
import com.learnsnap.dto.VideoResponse;
import com.learnsnap.service.VideoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    // 전체 비디오 조회 (페이징)
    @GetMapping
    public ResponseEntity<Page<VideoResponse>> getAllVideos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "DESC") String direction,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) DifficultyLevel difficulty) {
        
        Sort.Direction sortDirection = direction.equalsIgnoreCase("ASC") 
                ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sort));

        Page<VideoResponse> videos;
        if (categoryId != null) {
            videos = videoService.getVideosByCategory(categoryId, pageable);
        } else if (difficulty != null) {
            videos = videoService.getVideosByDifficulty(difficulty, pageable);
        } else {
            videos = videoService.getAllVideos(pageable);
        }

        return ResponseEntity.ok(videos);
    }

    // 특정 비디오 조회
    @GetMapping("/{id}")
    public ResponseEntity<VideoResponse> getVideoById(@PathVariable Long id) {
        VideoResponse video = videoService.getVideoById(id);
        return ResponseEntity.ok(video);
    }

    // 비디오 생성 (강사/관리자)
    @PostMapping
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<VideoResponse> createVideo(@Valid @RequestBody VideoRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        VideoResponse video = videoService.createVideo(request, email);
        return ResponseEntity.status(HttpStatus.CREATED).body(video);
    }

    // 비디오 수정 (본인 또는 관리자)
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<VideoResponse> updateVideo(
            @PathVariable Long id,
            @Valid @RequestBody VideoRequest request) {
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        VideoResponse video = videoService.updateVideo(id, request, email);
        return ResponseEntity.ok(video);
    }

    // 비디오 삭제 (본인 또는 관리자)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
    public ResponseEntity<Void> deleteVideo(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        videoService.deleteVideo(id, email);
        return ResponseEntity.noContent().build();
    }

    // 조회수 증가
    @PostMapping("/{id}/view")
    public ResponseEntity<Map<String, Long>> incrementViews(@PathVariable Long id) {
        Map<String, Long> response = videoService.incrementViews(id);
        return ResponseEntity.ok(response);
    }
}