package com.learnsnap.domain.video;

import com.learnsnap.domain.category.Category;
import com.learnsnap.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "videos")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false, length = 500)
    private String videoUrl;  // S3 URL

    @Column(length = 500)
    private String thumbnailUrl;  // 썸네일 S3 URL

    @Column(nullable = false)
    private Integer duration;  // 재생 시간 (초)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private DifficultyLevel difficultyLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id", nullable = false)
    private User instructor;

    @Column(nullable = false)
    @Builder.Default
    private Long viewsCount = 0L;

    @Column(nullable = false)
    @Builder.Default
    private Long likesCount = 0L;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // 비디오 업데이트 메서드
    public void update(String title, String description, String thumbnailUrl, 
                      Integer duration, DifficultyLevel difficultyLevel, Category category) {
        this.title = title;
        this.description = description;
        this.thumbnailUrl = thumbnailUrl;
        this.duration = duration;
        this.difficultyLevel = difficultyLevel;
        this.category = category;
    }

    // 조회수 증가
    public void incrementViews() {
        this.viewsCount++;
    }

    // 좋아요 증가
    public void incrementLikes() {
        this.likesCount++;
    }

    // 좋아요 감소
    public void decrementLikes() {
        if (this.likesCount > 0) {
            this.likesCount--;
        }
    }
}