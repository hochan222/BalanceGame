package com.example.backend.service;

import com.example.backend.domain.ArticleCategory;
import com.example.backend.repository.ArticleCategoryRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ArticleCategoryService {

    private final ArticleCategoryRepository articleCategoryRepository;

    public List<ArticleCategory> getArticleCategories() {
        return articleCategoryRepository.findAll();
    }
}
