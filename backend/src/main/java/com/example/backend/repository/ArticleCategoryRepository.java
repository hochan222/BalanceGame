package com.example.backend.repository;

import com.example.backend.domain.ArticleCategory;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleCategoryRepository extends JpaRepository<ArticleCategory, Long> {

    Optional<ArticleCategory> findByName(String articleCategoryName);

    List<ArticleCategory> findAll();
}
