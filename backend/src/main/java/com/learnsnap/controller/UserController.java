package com.learnsnap.controller;

import com.learnsnap.dto.UpdateProfileRequest;
import com.learnsnap.dto.UserResponse;
import com.learnsnap.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 현재 사용자 정보 조회
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser() {
        // SecurityContext에서 현재 인증된 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        UserResponse response = userService.getCurrentUser(email);
        return ResponseEntity.ok(response);
    }

    // 프로필 업데이트 
    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateProfile(
            @Valid @RequestBody UpdateProfileRequest request) {
        // SecurityContext에서 현재 인증된 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        UserResponse response = userService.updateProfile(email, request);
        return ResponseEntity.ok(response);
    }
}