package com.learnsnap.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateProfileRequest {

    @Size(min = 2, max = 50, message = "사용자명은 2-50자 사이여야 합니다")
    private String username;

    @Size(max = 500, message = "자기소개는 500자 이하여야 합니다")
    private String bio;

    @Size(max = 500, message = "프로필 이미지 URL은 500자 이하여야 합니다")
    private String profileImage;
}