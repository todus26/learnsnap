package com.learnsnap.repository;

import com.learnsnap.domain.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // slug로 카테고리 찾기
    Optional<Category> findBySlug(String slug);

    // name으로 카테고리 존재 여부 확인
    boolean existsByName(String name);

    // slug로 카테고리 존재 여부 확인
    boolean existsBySlug(String slug);
}