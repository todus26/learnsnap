package com.learnsnap.service;

import com.learnsnap.domain.user.Role;
import com.learnsnap.domain.user.User;
import com.learnsnap.dto.SignUpRequest;
import com.learnsnap.dto.SignUpResponse;
import com.learnsnap.exception.DuplicateEmailException;
import com.learnsnap.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public SignUpResponse signUp(SignUpRequest request) {
        // 1. 이메일 중복 체크
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("이미 사용 중인 이메일입니다: " + request.getEmail());
        }

        // 2. User 엔티티 생성
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))  // 비밀번호 암호화
                .username(request.getUsername())
                .role(Role.LEARNER)  // 기본 역할
                .build();

        // 3. 저장
        User savedUser = userRepository.save(user);

        // 4. Response DTO로 변환
        return SignUpResponse.builder()
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .username(savedUser.getUsername())
                .role(savedUser.getRole())
                .createdAt(savedUser.getCreatedAt())
                .build();
    }
}
