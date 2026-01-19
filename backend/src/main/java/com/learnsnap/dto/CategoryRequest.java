package com.learnsnap.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryRequest {

    @NotBlank(message = "카테고리 이름은 필수입니다")
    @Size(max = 100, message = "카테고리 이름은 100자 이하여야 합니다")
    private String name;

    @NotBlank(message = "슬러그는 필수입니다")
    @Size(max = 100, message = "슬러그는 100자 이하여야 합니다")
    private String slug;

    @Size(max = 500, message = "설명은 500자 이하여야 합니다")
    private String description;

    @Size(max = 100, message = "아이콘은 100자 이하여야 합니다")
    private String icon;
}