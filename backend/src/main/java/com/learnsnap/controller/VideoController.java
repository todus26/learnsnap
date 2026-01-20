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
import java.util.List;

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

    // 비디오 검색
    @GetMapping("/search")
    public ResponseEntity<Page<VideoResponse>> searchVideos(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<VideoResponse> videos = videoService.searchVideos(q, pageable);
        return ResponseEntity.ok(videos);
    }

    // 카테고리별 비디오 조회 (난이도 필터 포함)
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<VideoResponse>> getVideosByCategory(
            @PathVariable Long categoryId,
            @RequestParam(required = false) DifficultyLevel difficulty,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        
        Page<VideoResponse> videos;
        if (difficulty != null) {
            videos = videoService.getVideosByCategoryAndDifficulty(categoryId, difficulty, pageable);
        } else {
            videos = videoService.getVideosByCategory(categoryId, pageable);
        }
        
        return ResponseEntity.ok(videos);
    }

    // 강사별 비디오 조회
    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<Page<VideoResponse>> getVideosByInstructor(
            @PathVariable Long instructorId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<VideoResponse> videos = videoService.getVideosByInstructor(instructorId, pageable);
        return ResponseEntity.ok(videos);
    }

    // 인기 비디오
    @GetMapping("/popular")
    public ResponseEntity<List<VideoResponse>> getPopularVideos(
            @RequestParam(defaultValue = "10") int limit) {
        
        List<VideoResponse> videos = videoService.getPopularVideos(limit);
        return ResponseEntity.ok(videos);
    }

    // 최신 비디오
    @GetMapping("/recent")
    public ResponseEntity<List<VideoResponse>> getRecentVideos(
            @RequestParam(defaultValue = "10") int limit) {
        
        List<VideoResponse> videos = videoService.getRecentVideos(limit);
        return ResponseEntity.ok(videos);
    }
}