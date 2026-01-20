package com.learnsnap.dto;

import com.learnsnap.domain.video.DifficultyLevel;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VideoRequest {

    @NotBlank(message = "제목은 필수입니다")
    @Size(max = 200, message = "제목은 200자 이하여야 합니다")
    private String title;

    @Size(max = 1000, message = "설명은 1000자 이하여야 합니다")
    private String description;

    @NotBlank(message = "비디오 URL은 필수입니다")
    @Size(max = 500, message = "비디오 URL은 500자 이하여야 합니다")
    private String videoUrl;

    @Size(max = 500, message = "썸네일 URL은 500자 이하여야 합니다")
    private String thumbnailUrl;

    @NotNull(message = "재생 시간은 필수입니다")
    @Min(value = 1, message = "재생 시간은 1초 이상이어야 합니다")
    private Integer duration;

    @NotNull(message = "난이도는 필수입니다")
    private DifficultyLevel difficultyLevel;

    @NotNull(message = "카테고리 ID는 필수입니다")
    private Long categoryId;
}