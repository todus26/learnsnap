package com.learnsnap.service;

import com.learnsnap.domain.category.Category;
import com.learnsnap.dto.CategoryRequest;
import com.learnsnap.dto.CategoryResponse;
import com.learnsnap.exception.CategoryNotFoundException;
import com.learnsnap.exception.DuplicateCategoryException;
import com.learnsnap.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    // 전체 카테고리 조회
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // 특정 카테고리 조회 (ID)
    @Transactional(readOnly = true)
    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("카테고리를 찾을 수 없습니다: " + id));
        
        return convertToResponse(category);
    }

    // 카테고리 생성
    @Transactional
    public CategoryResponse createCategory(CategoryRequest request) {
        // 이름 중복 체크
        if (categoryRepository.existsByName(request.getName())) {
            throw new DuplicateCategoryException("이미 존재하는 카테고리 이름입니다: " + request.getName());
        }

        // slug 중복 체크
        if (categoryRepository.existsBySlug(request.getSlug())) {
            throw new DuplicateCategoryException("이미 존재하는 슬러그입니다: " + request.getSlug());
        }

        // Category 엔티티 생성
        Category category = Category.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .description(request.getDescription())
                .icon(request.getIcon())
                .build();

        // 저장
        Category savedCategory = categoryRepository.save(category);

        return convertToResponse(savedCategory);
    }

    // 카테고리 수정
    @Transactional
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        // 카테고리 찾기
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("카테고리를 찾을 수 없습니다: " + id));

        // 이름 중복 체크 (자기 자신 제외)
        if (!category.getName().equals(request.getName()) 
                && categoryRepository.existsByName(request.getName())) {
            throw new DuplicateCategoryException("이미 존재하는 카테고리 이름입니다: " + request.getName());
        }

        // slug 중복 체크 (자기 자신 제외)
        if (!category.getSlug().equals(request.getSlug()) 
                && categoryRepository.existsBySlug(request.getSlug())) {
            throw new DuplicateCategoryException("이미 존재하는 슬러그입니다: " + request.getSlug());
        }

        // 업데이트
        category.update(
            request.getName(),
            request.getSlug(),
            request.getDescription(),
            request.getIcon()
        );

        return convertToResponse(category);
    }

    // 카테고리 삭제
    @Transactional
    public void deleteCategory(Long id) {
        // 카테고리 존재 확인
        if (!categoryRepository.existsById(id)) {
            throw new CategoryNotFoundException("카테고리를 찾을 수 없습니다: " + id);
        }

        categoryRepository.deleteById(id);
    }

    // Entity -> Response DTO 변환
    private CategoryResponse convertToResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .description(category.getDescription())
                .icon(category.getIcon())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }
}