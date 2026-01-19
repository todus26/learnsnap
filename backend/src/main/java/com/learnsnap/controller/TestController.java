package com.learnsnap.controller;

import com.learnsnap.domain.category.Category;
import com.learnsnap.domain.user.Role;
import com.learnsnap.domain.user.User;
import com.learnsnap.repository.CategoryRepository;
import com.learnsnap.repository.UserRepository;
import com.learnsnap.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final CategoryRepository categoryRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/user")
    public ResponseEntity<User> createTestUser() {
        User user = User.builder()
                .email("test@example.com")
                .password(passwordEncoder.encode("password123"))
                .username("테스트사용자")
                .role(Role.LEARNER)
                .build();
        
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/jwt")
    public ResponseEntity<Map<String, Object>> testJwt() {
        String email = "test@example.com";
        String token = jwtUtil.generateToken(email);
        
        Map<String, Object> response = new HashMap<>();
        response.put("email", email);
        response.put("token", token);
        response.put("isValid", jwtUtil.validateToken(token, email));
        response.put("extractedEmail", jwtUtil.extractEmail(token));
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/protected")
    public ResponseEntity<Map<String, Object>> protectedEndpoint() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        Map<String, Object> response = new HashMap<>();
        
        if (authentication != null && authentication.isAuthenticated() 
                && !authentication.getPrincipal().equals("anonymousUser")) {
            response.put("authenticated", true);
            response.put("email", authentication.getName());
            response.put("authorities", authentication.getAuthorities());
            response.put("message", "인증된 사용자입니다!");
        } else {
            response.put("authenticated", false);
            response.put("message", "인증되지 않은 사용자입니다.");
        }
        
        return ResponseEntity.ok(response);
    }

    // 카테고리 테스트 엔드포인트 추가
    @PostMapping("/category")
    public ResponseEntity<Category> createTestCategory() {
        Category category = Category.builder()
                .name("백엔드")
                .slug("backend")
                .description("백엔드 개발 관련 강의")
                .icon("💻")
                .build();
        
        Category saved = categoryRepository.save(category);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/category/{slug}")
    public ResponseEntity<Category> getCategoryBySlug(@PathVariable String slug) {
        Category category = categoryRepository.findBySlug(slug).orElse(null);
        return ResponseEntity.ok(category);
    }

    // 여러 카테고리 한 번에 생성
    @PostMapping("/categories/init")
    public ResponseEntity<List<Category>> initializeCategories() {
        // 기존 카테고리 전부 삭제 (테스트용)
        categoryRepository.deleteAll();
        
        // 5개 카테고리 생성
        List<Category> categories = List.of(
            Category.builder()
                .name("백엔드")
                .slug("backend")
                .description("백엔드 개발 관련 강의 (Node.js, Python, Java, Spring Boot)")
                .icon("💻")
                .build(),
            
            Category.builder()
                .name("프론트엔드")
                .slug("frontend")
                .description("프론트엔드 개발 관련 강의 (React, Vue, JavaScript)")
                .icon("🎨")
                .build(),
            
            Category.builder()
                .name("DevOps")
                .slug("devops")
                .description("DevOps 및 인프라 관련 강의 (Docker, Kubernetes, CI/CD)")
                .icon("🚀")
                .build(),
            
            Category.builder()
                .name("데이터베이스")
                .slug("database")
                .description("데이터베이스 관련 강의 (PostgreSQL, MySQL, MongoDB)")
                .icon("🗄️")
                .build(),
            
            Category.builder()
                .name("AI/ML")
                .slug("ai-ml")
                .description("인공지능 및 머신러닝 관련 강의 (TensorFlow, PyTorch)")
                .icon("🤖")
                .build()
        );
        
        // 모두 저장
        List<Category> savedCategories = categoryRepository.saveAll(categories);
        
        return ResponseEntity.ok(savedCategories);
    }
}