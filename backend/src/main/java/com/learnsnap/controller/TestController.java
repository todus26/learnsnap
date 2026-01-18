package com.learnsnap.controller;

import com.learnsnap.domain.user.Role;
import com.learnsnap.domain.user.User;
import com.learnsnap.repository.UserRepository;
import com.learnsnap.util.JwtUtil;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor  
public class TestController {

    private final UserRepository userRepository;  
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;  

    @GetMapping("/hello")
    public String hello() {
        return "Hello from LearnSnap Backend!";
    }

    @GetMapping("/status")
    public String status() {
        return "Backend is running successfully!";
    }

    // 테스트용: 사용자 생성 (비밀번호 암호화 적용)
    @PostMapping("/test/user")
    public User createTestUser() {
        User user = User.builder()
                .email("test@example.com")
                .password(passwordEncoder.encode("password123"))  // 암호화 추가!
                .username("테스트사용자")
                .role(Role.LEARNER)
                .build();

        return userRepository.save(user);
    }

    // 테스트용: 모든 사용자 조회
    @GetMapping("/test/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 테스트용: 이메일로 사용자 찾기
    @GetMapping("/test/user/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email)
                .orElse(null);
    }

    // JWT 테스트 엔드포인트 (새로 추가!)
    @GetMapping("/test/jwt")
    public Map<String, Object> testJwt() {
        String email = "test@example.com";
        
        // JWT 토큰 생성
        String token = jwtUtil.generateToken(email);
        
        // 토큰 검증
        boolean isValid = jwtUtil.validateToken(token);
        
        // 토큰에서 이메일 추출
        String extractedEmail = jwtUtil.extractEmail(token);
        
        Map<String, Object> response = new HashMap<>();
        response.put("email", email);
        response.put("token", token);
        response.put("isValid", isValid);
        response.put("extractedEmail", extractedEmail);
        
        return response;
    }
}