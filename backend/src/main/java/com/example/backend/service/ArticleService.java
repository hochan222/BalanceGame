package com.example.backend.service;

import com.example.backend.domain.Article;
import com.example.backend.domain.ArticleCategory;
import com.example.backend.dto.ArticlePostRequest;
import com.example.backend.repository.ArticleCategoryRepository;
import com.example.backend.repository.ArticleRepository;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ArticleService {

    private static final int PAGE_SIZE = 10;

    private final ArticleRepository articleRepository;
    private final ArticleCategoryRepository articleCategoryRepository;

    @Transactional
    public void createArticle(ArticlePostRequest articlePostRequest) {
        ArticleCategory articleCategory = articleCategoryRepository.findByName(
            articlePostRequest.getArticleCategoryName()).orElseThrow();
        Article article = articlePostRequest.toEntity(articleCategory);
        articleRepository.save(article);
    }

    public List<Article> getArticles(Long offset, String sort, String categoryName, String search) {
        if (Objects.isNull(offset)) {
            // TODO: 에러 처리
        }

        Article article = articleRepository.findById(offset).orElseThrow();

        if (Objects.isNull(sort) && Objects.isNull(categoryName) && Objects.isNull(search)) {
            return articleRepository.findPerPageBeforeOrderByCreatedAt(article.getCreatedAt(), PAGE_SIZE);
        }

        if (Objects.isNull(categoryName) && Objects.isNull(search)) {
            return articleRepository.findPerPageBeforeOrderByTotalCount(article.getCreatedAt(), PAGE_SIZE);
        }

        if (Objects.isNull(sort) && Objects.isNull(search)) {
            ArticleCategory articleCategory = articleCategoryRepository.findByName(categoryName).orElseThrow();
            return articleRepository.findPerPageBeforeByCategoryOrderByCreatedAt(article.getCreatedAt(),
                articleCategory.getId(), PAGE_SIZE);
        }

        if (Objects.isNull(sort) && Objects.isNull(categoryName)) {
            return articleRepository.findPerPageBeforeBySearchOrderByCreatedAt(article.getCreatedAt(),
                "%" + search + "%", PAGE_SIZE);
        }

        if (Objects.isNull(search)) {
            ArticleCategory articleCategory = articleCategoryRepository.findByName(categoryName).orElseThrow();
            return articleRepository.findPerPageBeforeByCategoryOrderByTotalCount(article.getCreatedAt(),
                articleCategory.getId(), PAGE_SIZE);
        }

        if (Objects.isNull(categoryName)) {
            return articleRepository.findPerPageBeforeBySearchOrderByTotalCount(article.getCreatedAt(),
                "%" + search + "%", PAGE_SIZE);
        }

        if (Objects.isNull(sort)) {
            ArticleCategory articleCategory = articleCategoryRepository.findByName(categoryName).orElseThrow();
            return articleRepository.findPerPageBeforeByCategoryBySearchOrderByCreatedAt(article.getCreatedAt(),
                articleCategory.getId(), "%" + search + "%", PAGE_SIZE);
        }

        ArticleCategory articleCategory = articleCategoryRepository.findByName(categoryName).orElseThrow();
        return articleRepository.findPerPageBeforeByCategoryBySearchOrderByTotalCount(article.getCreatedAt(),
            articleCategory.getId(), "%" + search + "%", PAGE_SIZE);
    }
}
