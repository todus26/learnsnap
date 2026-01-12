package com.learnsnap.controller;

import com.learnsnap.domain.user.Role;
import com.learnsnap.domain.user.User;
import com.learnsnap.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor  
public class TestController {

    private final UserRepository userRepository;  

    @GetMapping("/hello")
    public String hello() {
        return "Hello from LearnSnap Backend!";
    }

    @GetMapping("/status")
    public String status() {
        return "Backend is running successfully!";
    }

    // 테스트용: 사용자 생성
    @PostMapping("/test/user")
    public User createTestUser() {
        User user = User.builder()
                .email("test@example.com")
                .password("password123")
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
}