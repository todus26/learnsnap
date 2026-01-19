package com.learnsnap.repository;

import com.learnsnap.domain.category.Category;
import com.learnsnap.domain.user.User;
import com.learnsnap.domain.video.DifficultyLevel;
import com.learnsnap.domain.video.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {

    // 카테고리로 조회
    Page<Video> findByCategory(Category category, Pageable pageable);

    // 카테고리 ID로 조회
    Page<Video> findByCategoryId(Long categoryId, Pageable pageable);

    // 강사로 조회
    Page<Video> findByInstructor(User instructor, Pageable pageable);

    // 강사 ID로 조회
    Page<Video> findByInstructorId(Long instructorId, Pageable pageable);

    // 난이도로 조회
    Page<Video> findByDifficultyLevel(DifficultyLevel difficultyLevel, Pageable pageable);

    // 제목으로 검색
    Page<Video> findByTitleContaining(String keyword, Pageable pageable);

    // 제목 또는 설명으로 검색
    Page<Video> findByTitleContainingOrDescriptionContaining(
            String titleKeyword, String descKeyword, Pageable pageable);

    // 카테고리와 난이도로 조회
    Page<Video> findByCategoryIdAndDifficultyLevel(
            Long categoryId, DifficultyLevel difficultyLevel, Pageable pageable);

    // 조회수 많은 순 (인기 비디오)
    List<Video> findTop10ByOrderByViewsCountDesc();

    // 최신 비디오
    List<Video> findTop10ByOrderByCreatedAtDesc();
}