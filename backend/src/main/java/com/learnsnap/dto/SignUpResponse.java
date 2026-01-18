package com.learnsnap.dto;

import com.learnsnap.domain.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpResponse {

    private Long id;
    private String email;
    private String username;
    private Role role;
    private LocalDateTime createdAt;
}