package com.learnsnap.service;

import com.learnsnap.domain.category.Category;
import com.learnsnap.domain.user.Role;
import com.learnsnap.domain.user.User;
import com.learnsnap.domain.video.DifficultyLevel;
import com.learnsnap.domain.video.Video;
import com.learnsnap.dto.CategoryResponse;
import com.learnsnap.dto.VideoRequest;
import com.learnsnap.dto.VideoResponse;
import com.learnsnap.exception.CategoryNotFoundException;
import com.learnsnap.exception.UnauthorizedAccessException;
import com.learnsnap.exception.VideoNotFoundException;
import com.learnsnap.repository.CategoryRepository;
import com.learnsnap.repository.UserRepository;
import com.learnsnap.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    // 전체 비디오 조회 (페이징)
    @Transactional(readOnly = true)
    public Page<VideoResponse> getAllVideos(Pageable pageable) {
        return videoRepository.findAll(pageable)
                .map(this::convertToResponse);
    }

    // 카테고리별 비디오 조회
    @Transactional(readOnly = true)
    public Page<VideoResponse> getVideosByCategory(Long categoryId, Pageable pageable) {
        return videoRepository.findByCategoryId(categoryId, pageable)
                .map(this::convertToResponse);
    }

    // 난이도별 비디오 조회
    @Transactional(readOnly = true)
    public Page<VideoResponse> getVideosByDifficulty(DifficultyLevel difficulty, Pageable pageable) {
        return videoRepository.findByDifficultyLevel(difficulty, pageable)
                .map(this::convertToResponse);
    }

    // 특정 비디오 조회
    @Transactional(readOnly = true)
    public VideoResponse getVideoById(Long id) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new VideoNotFoundException("비디오를 찾을 수 없습니다: " + id));
        
        return convertToResponse(video);
    }

    // 비디오 생성 (강사/관리자)
    @Transactional
    public VideoResponse createVideo(VideoRequest request, String email) {
        // 강사 찾기
        User instructor = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + email));

        // 카테고리 찾기
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("카테고리를 찾을 수 없습니다: " + request.getCategoryId()));

        // 비디오 생성
        Video video = Video.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .videoUrl(request.getVideoUrl())
                .thumbnailUrl(request.getThumbnailUrl())
                .duration(request.getDuration())
                .difficultyLevel(request.getDifficultyLevel())
                .category(category)
                .instructor(instructor)
                .build();

        Video savedVideo = videoRepository.save(video);
        return convertToResponse(savedVideo);
    }

    // 비디오 수정 (본인 또는 관리자)
    @Transactional
    public VideoResponse updateVideo(Long id, VideoRequest request, String email) {
        // 비디오 찾기
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new VideoNotFoundException("비디오를 찾을 수 없습니다: " + id));

        // 권한 확인
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + email));

        if (!video.getInstructor().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new UnauthorizedAccessException("이 비디오를 수정할 권한이 없습니다");
        }

        // 카테고리 찾기
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("카테고리를 찾을 수 없습니다: " + request.getCategoryId()));

        // 업데이트
        video.update(
            request.getTitle(),
            request.getDescription(),
            request.getThumbnailUrl(),
            request.getDuration(),
            request.getDifficultyLevel(),
            category
        );

        return convertToResponse(video);
    }

    // 비디오 삭제 (본인 또는 관리자)
    @Transactional
    public void deleteVideo(Long id, String email) {
        // 비디오 찾기
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new VideoNotFoundException("비디오를 찾을 수 없습니다: " + id));

        // 권한 확인
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + email));

        if (!video.getInstructor().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new UnauthorizedAccessException("이 비디오를 삭제할 권한이 없습니다");
        }

        videoRepository.delete(video);
    }

    // 조회수 증가
    @Transactional
    public Map<String, Long> incrementViews(Long id) {
        Video video = videoRepository.findById(id)
                .orElseThrow(() -> new VideoNotFoundException("비디오를 찾을 수 없습니다: " + id));

        video.incrementViews();

        Map<String, Long> response = new HashMap<>();
        response.put("viewsCount", video.getViewsCount());
        return response;
    }

    // Entity -> Response DTO 변환
    private VideoResponse convertToResponse(Video video) {
        return VideoResponse.builder()
                .id(video.getId())
                .title(video.getTitle())
                .description(video.getDescription())
                .videoUrl(video.getVideoUrl())
                .thumbnailUrl(video.getThumbnailUrl())
                .duration(video.getDuration())
                .difficultyLevel(video.getDifficultyLevel())
                .category(convertCategoryToResponse(video.getCategory()))
                .instructor(convertInstructorToInfo(video.getInstructor()))
                .viewsCount(video.getViewsCount())
                .likesCount(video.getLikesCount())
                .createdAt(video.getCreatedAt())
                .updatedAt(video.getUpdatedAt())
                .build();
    }

    private CategoryResponse convertCategoryToResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .description(category.getDescription())
                .icon(category.getIcon())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }

    private VideoResponse.InstructorInfo convertInstructorToInfo(User instructor) {
        return VideoResponse.InstructorInfo.builder()
                .id(instructor.getId())
                .username(instructor.getUsername())
                .email(instructor.getEmail())
                .profileImage(instructor.getProfileImage())
                .build();
    }
}