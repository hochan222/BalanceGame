package com.example.backend.repository;

import com.example.backend.domain.ArticleComment;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ArticleCommentRepository extends JpaRepository<ArticleComment, Long> {

    @Query(nativeQuery = true, value = "select * from article_comment c "
        + "where c.article_id = :articleId "
        + "order by c.created_at desc "
        + "limit :pageSize")
    List<ArticleComment> findArticleCommentByArticleId(@Param("articleId") Long articleId,
        @Param("pageSize") int pageSize);

    @Query(nativeQuery = true, value = "select * from article_comment c "
        + "where c.article_id = :articleId "
        + "and c.created_at < :createdAt "
        + "order by c.created_at desc "
        + "limit :pageSize")
    List<ArticleComment> findByIdAndArticleId(@Param("articleId") Long articleId, @Param("pageSize") int pageSize,
        @Param("createdAt") LocalDateTime createdAt);
}
