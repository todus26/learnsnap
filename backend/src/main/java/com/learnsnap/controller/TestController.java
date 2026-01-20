package com.learnsnap.controller;

import com.learnsnap.domain.category.Category;
import com.learnsnap.domain.user.Role;
import com.learnsnap.domain.user.User;
import com.learnsnap.domain.video.DifficultyLevel;
import com.learnsnap.domain.video.Video;
import com.learnsnap.repository.CategoryRepository;
import com.learnsnap.repository.UserRepository;
import com.learnsnap.repository.VideoRepository;
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
    private final VideoRepository videoRepository;

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

    // 관리자 사용자 생성
    @PostMapping("/admin")
    public ResponseEntity<User> createAdminUser() {
        User admin = User.builder()
                .email("admin@learnsnap.com")
                .password(passwordEncoder.encode("admin123"))
                .username("관리자")
                .role(Role.ADMIN)
                .build();
        
        User savedAdmin = userRepository.save(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    // 테스트 비디오 생성
    @PostMapping("/video")
    public ResponseEntity<Video> createTestVideo() {
        // 첫 번째 카테고리 찾기
        Category category = categoryRepository.findAll().stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("카테고리가 없습니다"));

        // 강사 역할 사용자 찾기 또는 생성
        User instructor = userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.INSTRUCTOR || u.getRole() == Role.ADMIN)
                .findFirst()
                .orElseGet(() -> {
                    User newInstructor = User.builder()
                            .email("instructor@learnsnap.com")
                            .password(passwordEncoder.encode("instructor123"))
                            .username("강사")
                            .role(Role.INSTRUCTOR)
                            .build();
                    return userRepository.save(newInstructor);
                });

        // 비디오 생성
        Video video = Video.builder()
                .title("Spring Boot 입문 강의")
                .description("Spring Boot의 기초부터 배우는 강의입니다")
                .videoUrl("https://example.com/videos/spring-boot-intro.mp4")
                .thumbnailUrl("https://example.com/thumbnails/spring-boot-intro.jpg")
                .duration(600)  // 10분
                .difficultyLevel(DifficultyLevel.BEGINNER)
                .category(category)
                .instructor(instructor)
                .build();

        Video saved = videoRepository.save(video);
        return ResponseEntity.ok(saved);
    }

    // 모든 비디오 조회
    @GetMapping("/videos")
    public ResponseEntity<List<Video>> getAllVideos() {
        List<Video> videos = videoRepository.findAll();
        return ResponseEntity.ok(videos);
    }

    // 여러 테스트 비디오 생성
    @PostMapping("/videos/init")
    public ResponseEntity<List<Video>> initializeVideos() {
        // 기존 비디오 삭제
        videoRepository.deleteAll();

        // 카테고리와 강사 찾기
        List<Category> categories = categoryRepository.findAll();
        if (categories.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        User instructor = userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.INSTRUCTOR || u.getRole() == Role.ADMIN)
                .findFirst()
                .orElseGet(() -> {
                    User newInstructor = User.builder()
                            .email("instructor@learnsnap.com")
                            .password(passwordEncoder.encode("instructor123"))
                            .username("강사")
                            .role(Role.INSTRUCTOR)
                            .build();
                    return userRepository.save(newInstructor);
                });

        // 여러 비디오 생성
        List<Video> videos = List.of(
            Video.builder()
                .title("Spring Boot 입문")
                .description("Spring Boot의 기초부터 배우는 강의")
                .videoUrl("https://example.com/videos/spring-boot-intro.mp4")
                .thumbnailUrl("https://example.com/thumbnails/spring-boot-intro.jpg")
                .duration(600)
                .difficultyLevel(DifficultyLevel.BEGINNER)
                .category(categories.get(0))
                .instructor(instructor)
                .build(),
            
            Video.builder()
                .title("React 기초 강의")
                .description("React의 기본 개념과 컴포넌트")
                .videoUrl("https://example.com/videos/react-basics.mp4")
                .thumbnailUrl("https://example.com/thumbnails/react-basics.jpg")
                .duration(900)
                .difficultyLevel(DifficultyLevel.BEGINNER)
                .category(categories.size() > 1 ? categories.get(1) : categories.get(0))
                .instructor(instructor)
                .build(),
            
            Video.builder()
                .title("Java 심화 과정")
                .description("Java의 고급 기능과 디자인 패턴")
                .videoUrl("https://example.com/videos/java-advanced.mp4")
                .thumbnailUrl("https://example.com/thumbnails/java-advanced.jpg")
                .duration(1200)
                .difficultyLevel(DifficultyLevel.ADVANCED)
                .category(categories.get(0))
                .instructor(instructor)
                .build(),
            
            Video.builder()
                .title("Docker 입문")
                .description("Docker 기초와 컨테이너 개념")
                .videoUrl("https://example.com/videos/docker-intro.mp4")
                .thumbnailUrl("https://example.com/thumbnails/docker-intro.jpg")
                .duration(750)
                .difficultyLevel(DifficultyLevel.INTERMEDIATE)
                .category(categories.size() > 2 ? categories.get(2) : categories.get(0))
                .instructor(instructor)
                .build(),
            
            Video.builder()
                .title("PostgreSQL 완벽 가이드")
                .description("PostgreSQL 설치부터 고급 쿼리까지")
                .videoUrl("https://example.com/videos/postgresql-guide.mp4")
                .thumbnailUrl("https://example.com/thumbnails/postgresql-guide.jpg")
                .duration(1800)
                .difficultyLevel(DifficultyLevel.INTERMEDIATE)
                .category(categories.size() > 3 ? categories.get(3) : categories.get(0))
                .instructor(instructor)
                .build()
        );

        List<Video> savedVideos = videoRepository.saveAll(videos);
        return ResponseEntity.ok(savedVideos);
    }

    // 강사 사용자 생성
    @PostMapping("/instructor")
    public ResponseEntity<User> createInstructorUser() {
        User instructor = User.builder()
                .email("instructor@learnsnap.com")
                .password(passwordEncoder.encode("instructor123"))
                .username("강사")
                .role(Role.INSTRUCTOR)
                .build();
        
        User savedInstructor = userRepository.save(instructor);
        return ResponseEntity.ok(savedInstructor);
    }
}