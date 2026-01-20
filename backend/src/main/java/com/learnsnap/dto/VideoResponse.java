package com.learnsnap.dto;

import com.learnsnap.domain.video.DifficultyLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VideoResponse {

    private Long id;
    private String title;
    private String description;
    private String videoUrl;
    private String thumbnailUrl;
    private Integer duration;
    private DifficultyLevel difficultyLevel;
    private CategoryResponse category;
    private InstructorInfo instructor;
    private Long viewsCount;
    private Long likesCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 강사 정보 (간단한 정보만)
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class InstructorInfo {
        private Long id;
        private String username;
        private String email;
        private String profileImage;
    }
}