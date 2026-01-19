package com.learnsnap.service;

import com.learnsnap.domain.user.User;
import com.learnsnap.dto.UpdateProfileRequest;
import com.learnsnap.dto.UserResponse;
import com.learnsnap.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public UserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + email));

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .role(user.getRole())
                .profileImage(user.getProfileImage())
                .bio(user.getBio())
                .createdAt(user.getCreatedAt())
                .build();
    }

    // 프로필 업데이트 메서드 
    @Transactional
    public UserResponse updateProfile(String email, UpdateProfileRequest request) {
        // 1. 사용자 찾기
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + email));

        // 2. 프로필 업데이트 (null이 아닌 필드만 업데이트)
        if (request.getUsername() != null) {
            user.updateProfile(
                request.getUsername(),
                request.getBio() != null ? request.getBio() : user.getBio(),
                request.getProfileImage() != null ? request.getProfileImage() : user.getProfileImage()
            );
        } else if (request.getBio() != null || request.getProfileImage() != null) {
            user.updateProfile(
                user.getUsername(),
                request.getBio() != null ? request.getBio() : user.getBio(),
                request.getProfileImage() != null ? request.getProfileImage() : user.getProfileImage()
            );
        }

        // 3. 저장 (JPA dirty checking으로 자동 저장됨)
        // userRepository.save(user); // @Transactional이 있어서 생략 가능

        // 4. Response 반환
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .role(user.getRole())
                .profileImage(user.getProfileImage())
                .bio(user.getBio())
                .createdAt(user.getCreatedAt())
                .build();
    }
}