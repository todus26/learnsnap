package com.learnsnap.service;

import com.learnsnap.domain.user.Role;
import com.learnsnap.domain.user.User;
import com.learnsnap.dto.LoginRequest;
import com.learnsnap.dto.LoginResponse;
import com.learnsnap.dto.SignUpRequest;
import com.learnsnap.dto.SignUpResponse;
import com.learnsnap.exception.DuplicateEmailException;
import com.learnsnap.exception.InvalidCredentialsException;
import com.learnsnap.repository.UserRepository;
import com.learnsnap.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;  

    @Transactional
    public SignUpResponse signUp(SignUpRequest request) {
        // 1. 이메일 중복 체크
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("이미 사용 중인 이메일입니다: " + request.getEmail());
        }

        // 2. User 엔티티 생성
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .username(request.getUsername())
                .role(Role.LEARNER)
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

    // 로그인 메서드 
    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        // 1. 이메일로 사용자 찾기
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("이메일 또는 비밀번호가 올바르지 않습니다"));

        // 2. 비밀번호 검증
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("이메일 또는 비밀번호가 올바르지 않습니다");
        }

        // 3. JWT 토큰 생성
        String accessToken = jwtUtil.generateToken(user.getEmail());

        // 4. Response 생성
        LoginResponse.UserInfo userInfo = LoginResponse.UserInfo.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .role(user.getRole().name())
                .build();

        return LoginResponse.builder()
                .accessToken(accessToken)
                .user(userInfo)
                .build();
    }
}