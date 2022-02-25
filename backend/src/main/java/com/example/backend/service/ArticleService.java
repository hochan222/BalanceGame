package com.example.backend.service;

import com.example.backend.controller.error.exception.UnauthorizedException;
import com.example.backend.controller.error.exception.article.NoArticleException;
import com.example.backend.controller.error.exception.articlecategory.NoArticleCategoryException;
import com.example.backend.controller.error.exception.votehistory.DuplicateVoteException;
import com.example.backend.domain.Article;
import com.example.backend.domain.ArticleCategory;
import com.example.backend.domain.VoteHistory;
import com.example.backend.dto.ArticlePasswordPostRequest;
import com.example.backend.dto.ArticlePatchRequest;
import com.example.backend.dto.ArticlePostRequest;
import com.example.backend.repository.ArticleCategoryRepository;
import com.example.backend.repository.ArticleRepository;
import com.example.backend.repository.VoteHistoryRepository;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ArticleService {

    private static final int PAGE_SIZE = 6;

    private final ArticleRepository articleRepository;
    private final ArticleCategoryRepository articleCategoryRepository;
    private final VoteHistoryRepository voteHistoryRepository;

    @Transactional
    public void createArticle(ArticlePostRequest articlePostRequest) {
        ArticleCategory articleCategory = articleCategoryRepository.findByName(
            articlePostRequest.getArticleCategoryName()).orElseThrow();
        Article article = articlePostRequest.toEntity(articleCategory);
        articleRepository.save(article);
    }

    public boolean isNullOrBlankOrEmpty(String value) {
        return Objects.isNull(value) || value.isBlank() || value.isEmpty();
    }

    public List<Article> getArticles(Long offset, String sort, String categoryName, String search) {

        if (offset == null) {
            if (isNullOrBlankOrEmpty(sort) && isNullOrBlankOrEmpty(categoryName) && isNullOrBlankOrEmpty(search)) {
                return articleRepository.findFirstPageByPageSize(PAGE_SIZE);
            }
            if (isNullOrBlankOrEmpty(categoryName) && isNullOrBlankOrEmpty(search)) {
                return articleRepository.findFirstPageByPageSizeOrderByTotalCount(PAGE_SIZE);
            }

            if (isNullOrBlankOrEmpty(sort) && isNullOrBlankOrEmpty(search)) {
                ArticleCategory articleCategory = articleCategoryRepository.findByName(categoryName)
                    .orElseThrow(NoArticleCategoryException::new);
                return articleRepository.findFirstPageBeforeByCategoryOrder(articleCategory.getId(), PAGE_SIZE);
            }

            if (isNullOrBlankOrEmpty(sort) && isNullOrBlankOrEmpty(categoryName)) {
                return articleRepository.findFirstPageBeforeBySearchOrderByCreatedAt(PAGE_SIZE, "%" + search + "%");
            }

            if (isNullOrBlankOrEmpty(search)) {
                ArticleCategory articleCategory = articleCategoryRepository.findByName(categoryName).orElseThrow();
                return articleRepository.findFirstPageBeforeByCategoryOrderByTotalCount(articleCategory.getId(),
                    PAGE_SIZE);
            }

            if (isNullOrBlankOrEmpty(categoryName)) {
                return articleRepository.findFirstPageBeforeBySearchOrderByTotalCount(
                    "%" + search + "%", PAGE_SIZE);
            }

            if (isNullOrBlankOrEmpty(sort)) {
                ArticleCategory articleCategory = articleCategoryRepository.findByName(categoryName).orElseThrow();
                return articleRepository.findFirstPageBeforeByCategoryBySearch(articleCategory.getId(),
                    "%" + search + "%", PAGE_SIZE);
            }

        }

        Article article = articleRepository.findById(offset).orElseThrow(NoArticleException::new);

        if (isNullOrBlankOrEmpty(sort) && isNullOrBlankOrEmpty(categoryName) && isNullOrBlankOrEmpty(search)) {
            return articleRepository.findPerPageBeforeOrderByCreatedAt(article.getCreatedAt(), PAGE_SIZE);
        }

        if (isNullOrBlankOrEmpty(categoryName) &&isNullOrBlankOrEmpty(search)) {
            return articleRepository.findPerPageBeforeOrderByTotalCount(article.getCreatedAt(), PAGE_SIZE);
        }

        if (isNullOrBlankOrEmpty(sort) && isNullOrBlankOrEmpty(search)) {
            ArticleCategory articleCategory = articleCategoryRepository.findByName(categoryName)
                .orElseThrow(NoArticleCategoryException::new);
            return articleRepository.findPerPageBeforeByCategoryOrderByCreatedAt(article.getCreatedAt(),
                articleCategory.getId(), PAGE_SIZE);
        }

        if (isNullOrBlankOrEmpty(sort) && isNullOrBlankOrEmpty(categoryName)) {
            return articleRepository.findPerPageBeforeBySearchOrderByCreatedAt(article.getCreatedAt(),
                "%" + search + "%", PAGE_SIZE);
        }

        if (isNullOrBlankOrEmpty(search)) {
            ArticleCategory articleCategory = articleCategoryRepository.findByName(categoryName).orElseThrow();
            return articleRepository.findPerPageBeforeByCategoryOrderByTotalCount(article.getCreatedAt(),
                articleCategory.getId(), PAGE_SIZE);
        }

        if (isNullOrBlankOrEmpty(categoryName)) {
            return articleRepository.findPerPageBeforeBySearchOrderByTotalCount(article.getCreatedAt(),
                "%" + search + "%", PAGE_SIZE);
        }

        if (isNullOrBlankOrEmpty(sort)) {
            ArticleCategory articleCategory = articleCategoryRepository.findByName(categoryName).orElseThrow();
            return articleRepository.findPerPageBeforeByCategoryBySearchOrderByCreatedAt(article.getCreatedAt(),
                articleCategory.getId(), "%" + search + "%", PAGE_SIZE);
        }

        ArticleCategory articleCategory = articleCategoryRepository.findByName(categoryName).orElseThrow();
        return articleRepository.findPerPageBeforeByCategoryBySearchOrderByTotalCount(article.getCreatedAt(),
            articleCategory.getId(), "%" + search + "%", PAGE_SIZE);
    }

    public Article getArticle(Long articleId) {
        //TODO: error 처리 ?
        return articleRepository.findById(articleId).orElseThrow();
    }

    @Transactional
    public void addCount(Long articleId, String selectedVote, String userId) {
        Article article = articleRepository.findById(articleId).orElseThrow();
        if (voteHistoryRepository.findByUserIdAAndArticle(userId, article).isPresent()) {
            throw new DuplicateVoteException();
        }
        VoteHistory voteHistory = new VoteHistory(userId, article);
        voteHistoryRepository.save(voteHistory);
        article.updateVoteCount(selectedVote);
        articleRepository.save(article);
    }

    @Transactional
    public void updateArticle(Long articleId, ArticlePatchRequest articlePatchRequest) {
        Article article = articleRepository.findById(articleId).orElseThrow(NoArticleException::new);
        ArticleCategory articleCategory = articleCategoryRepository.findByName(articlePatchRequest.getCategoryName())
            .orElseThrow(NoArticleCategoryException::new);
        article.updateArticle(articlePatchRequest.getTitle(), articlePatchRequest.getContent(), articleCategory);
    }

    @Transactional
    public void deleteArticle(Long articleId) {
        Article article = articleRepository.findById(articleId).orElseThrow(NoArticleException::new);
        articleRepository.delete(article);
    }

    public void matchArticlePassword(Long articleId, ArticlePasswordPostRequest articlePasswordPostRequest) {
        Article article = articleRepository.findById(articleId).orElseThrow(NoArticleException::new);
        if (!articlePasswordPostRequest.getPassword().equals(article.getPassword())) {
            throw new UnauthorizedException();
        }
    }
}
