package com.example.backend.service;

import com.example.backend.controller.error.exception.UnauthorizedException;
import com.example.backend.controller.error.exception.articlecomment.NoArticleCommentException;
import com.example.backend.domain.Article;
import com.example.backend.domain.ArticleComment;
import com.example.backend.dto.ArticleCommentPasswordPostRequest;
import com.example.backend.dto.ArticleCommentPatchRequest;
import com.example.backend.dto.ArticleCommentPostRequest;
import com.example.backend.repository.ArticleCommentRepository;
import com.example.backend.repository.ArticleRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ArticleCommentService {

    private static final int PAGE_SIZE = 6;

    private final ArticleCommentRepository articleCommentRepository;
    private final ArticleRepository articleRepository;

    public List<ArticleComment> getArticles(Long articleId) {
        return articleCommentRepository.findArticleCommentByArticleId(articleId, PAGE_SIZE);
    }

    @Transactional
    public void createArticleComment(Long articleId, ArticleCommentPostRequest articleCommentPostRequest) {
        Article article = articleRepository.findById(articleId).orElseThrow(NoArticleCommentException::new);
        ArticleComment articleComment = articleCommentPostRequest.toEntity(article);
        articleCommentRepository.save(articleComment);
    }

    @Transactional
    public void updateArticleComment(Long commentId, ArticleCommentPatchRequest articleCommentPatchRequest) {
        ArticleComment articleComment = articleCommentRepository.findById(commentId).orElseThrow();
        articleComment.updateArticleComment(articleCommentPatchRequest.getContent());
    }

    @Transactional
    public void deleteArticleComment(Long commentId) {
        ArticleComment articleComment = articleCommentRepository.findById(commentId).orElseThrow();
        articleCommentRepository.delete(articleComment);
    }

    public void matchArticleCommentPassword(Long commentId,
        ArticleCommentPasswordPostRequest articleCommentPasswordPostRequest) {
        ArticleComment articleComment = articleCommentRepository.findById(commentId).orElseThrow(
            NoArticleCommentException::new);
        if (!articleCommentPasswordPostRequest.getPassword().equals(articleComment.getPassword())) {
            throw new UnauthorizedException();
        }
    }

    public List<ArticleComment> getArticleComments(Long articleId, Long offset) {
        ArticleComment articleComment = articleCommentRepository.findById(offset).orElseThrow();
        return articleCommentRepository.findByIdAndArticleId(articleId, PAGE_SIZE, articleComment.getCreatedAt());
    }
}
