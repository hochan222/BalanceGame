package com.example.backend.service;

import com.example.backend.controller.error.exception.article.NoArticleException;
import com.example.backend.controller.error.exception.articlecategory.NoArticleCategoryException;
import com.example.backend.controller.error.exception.votehistory.DuplicateVoteException;
import com.example.backend.domain.Article;
import com.example.backend.domain.ArticleCategory;
import com.example.backend.domain.VoteHistory;
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

    public List<Article> getArticles(Long offset, String sort, String categoryName, String search) {

        if(offset == null) {
            return articleRepository.findAllByPageSize(PAGE_SIZE);
        }

        Article article = articleRepository.findById(offset).orElseThrow(NoArticleException::new);

        if (Objects.isNull(sort) && Objects.isNull(categoryName) && Objects.isNull(search)) {
            return articleRepository.findPerPageBeforeOrderByCreatedAt(article.getCreatedAt(), PAGE_SIZE);
        }

        if (Objects.isNull(categoryName) && Objects.isNull(search)) {
            return articleRepository.findPerPageBeforeOrderByTotalCount(article.getCreatedAt(), PAGE_SIZE);
        }

        if (Objects.isNull(sort) && Objects.isNull(search)) {
            ArticleCategory articleCategory = articleCategoryRepository.findByName(categoryName).orElseThrow(NoArticleCategoryException::new);
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

    public Article getArticle(Long articleId) {
        //TODO error 처리 ?
        return articleRepository.findById(articleId).orElseThrow();
    }

    @Transactional
    public void addCount(Long articleId, String selectedVote, String userId) {
        Article article = articleRepository.findById(articleId).orElseThrow();
        if(voteHistoryRepository.findByUserId(userId).isPresent()) {
            throw new DuplicateVoteException();
        }
        VoteHistory voteHistory = new VoteHistory(userId, article);
        voteHistoryRepository.save(voteHistory);
        article.updateVoteCount(selectedVote);
    }

    @Transactional
    public void updateArticle(Long articleId, ArticlePatchRequest articlePatchRequest) {
        Article article = articleRepository.findById(articleId).orElseThrow(NoArticleException::new);
        ArticleCategory articleCategory = articleCategoryRepository.findByName(articlePatchRequest.getCategoryName()).orElseThrow(NoArticleCategoryException::new);
        article.updateArticle(articlePatchRequest.getTitle(), articlePatchRequest.getContent(), articleCategory);
    }

    @Transactional
    public void deleteArticle(Long articleId) {
        Article article = articleRepository.findById(articleId).orElseThrow(NoArticleException::new);
        articleRepository.delete(article);
    }
}
