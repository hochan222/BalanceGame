package com.example.backend.repository;

import com.example.backend.domain.Article;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Query(nativeQuery = true,
        value = "select * from article a "
            + "where a.created_at < :createdAt "
            + "order by a.created_at desc "
            + "limit :pageSize")
    List<Article> findPerPageBeforeOrderByCreatedAt(@Param("createdAt") LocalDateTime createdAt,
        @Param("pageSize") int pageSize);

    @Query(nativeQuery = true,
        value = "select * from article a "
            + "where a.created_at < :createdAt "
            + "order by a.total_count desc "
            + "limit :pageSize")
    List<Article> findPerPageBeforeOrderByTotalCount(@Param("createdAt") LocalDateTime createdAt,
        @Param("pageSize") int pageSize);

    @Query(nativeQuery = true,
        value = "select * from article a "
            + "where a.created_at < :createdAt "
            + "and a.article_category_id = :categoryId "
            + "order by a.created_at desc "
            + "limit :pageSize")
    List<Article> findPerPageBeforeByCategoryOrderByCreatedAt(@Param("createdAt") LocalDateTime createdAt,
        @Param("categoryId") Long categoryId, @Param("pageSize") int pageSize);

    @Query(nativeQuery = true,
        value = "select * from article a "
            + "where a.created_at < :createdAt "
            + "and (a.title like :search or a.content like :search ) "
            + "order by a.created_at desc "
            + "limit :pageSize")
    List<Article> findPerPageBeforeBySearchOrderByCreatedAt(@Param("createdAt") LocalDateTime createdAt,
        @Param("search") String search, @Param("pageSize") int pageSize);

    @Query(nativeQuery = true,
        value = "select * from article a "
            + "where a.created_at < :createdAt "
            + "and a.article_category_id = :categoryId "
            + "order by a.total_count desc "
            + "limit :pageSize")
    List<Article> findPerPageBeforeByCategoryOrderByTotalCount(@Param("createdAt") LocalDateTime createdAt,
        @Param("categoryId") Long categoryId, @Param("pageSize") int pageSize);

    @Query(nativeQuery = true,
        value = "select * from article a "
            + "where a.created_at < :createdAt "
            + "and (a.title like :search or a.content like :search ) "
            + "order by a.total_count desc "
            + "limit :pageSize")
    List<Article> findPerPageBeforeBySearchOrderByTotalCount(@Param("createdAt") LocalDateTime createdAt,
        @Param("search") String search, @Param("pageSize") int pageSize);

    @Query(nativeQuery = true,
        value = "select * from article a "
            + "where a.created_at < :createdAt "
            + "and a.article_category_id = :categoryId "
            + "and (a.title like :search or a.content like :search ) "
            + "order by a.created_at desc "
            + "limit :pageSize")
    List<Article> findPerPageBeforeByCategoryBySearchOrderByCreatedAt(@Param("createdAt") LocalDateTime createdAt,
        @Param("categoryId") Long categoryId, @Param("search") String search, @Param("pageSize") int pageSize);

    @Query(nativeQuery = true,
        value = "select * from article a "
            + "where a.created_at < :createdAt "
            + "and a.article_category_id = :categoryId "
            + "and (a.title like :search or a.content like :search ) "
            + "order by a.total_count desc "
            + "limit :pageSize")
    List<Article> findPerPageBeforeByCategoryBySearchOrderByTotalCount(@Param("createdAt") LocalDateTime createdAt,
        @Param("categoryId") Long categoryId, @Param("search") String search, @Param("pageSize") int pageSize);

    @Query(nativeQuery = true,
        value = "select * from article a "
            + "order by a.created_at desc "
            + "limit :pageSize")
    List<Article> findFirstPageByPageSize(@Param("pageSize") int pageSize);


    @Query(nativeQuery = true,
        value = "select * from article a "
            + "where a.article_category_id = :categoryId "
            + "order by a.created_at desc "
            + "limit :pageSize")
    List<Article> findFirstPageBeforeByCategoryOrder(@Param("categoryId") Long categoryId,
        @Param("pageSize") int pageSize);

    @Query(nativeQuery = true,
        value = "select * from article a "
            + "where a.title like :search or a.content like :search "
            + "order by a.created_at desc "
            + "limit :pageSize")
    List<Article> findFirstPageBeforeBySearchOrderByCreatedAt(@Param("pageSize") int pageSize,
        @Param("search") String search);

    @Query(nativeQuery = true,
        value = "select * from article a "
            + "where (a.title like :search or a.content like :search ) "
            + "order by a.total_count desc "
            + "limit :pageSize")
    List<Article> findFirstPageBeforeBySearchOrderByTotalCount(
        @Param("search") String search, @Param("pageSize") int pageSize);

    @Query(nativeQuery = true,
        value = "select * from article a "
            + "where a.article_category_id = :categoryId "
            + "and (a.title like :search or a.content like :search) "
            + "order by a.created_at desc "
            + "limit :pageSize")
    List<Article> findFirstPageBeforeByCategoryBySearch(@Param("categoryId") Long categoryId,
        @Param("search") String search, @Param("pageSize") int pageSize);

    @Query(nativeQuery = true,
        value = "select * from article a "
            + "where a.article_category_id = :categoryId "
            + "order by a.total_count desc "
            + "limit :pageSize")
    List<Article> findFirstPageBeforeByCategoryOrderByTotalCount(
        @Param("categoryId") Long categoryId, @Param("pageSize") int pageSize);

    @Query(nativeQuery = true,
        value = "select * from article a "
            + "order by a.total_count desc "
            + "limit :pageSize")
    List<Article> findFirstPageByPageSizeOrderByTotalCount(int pageSize);
}
