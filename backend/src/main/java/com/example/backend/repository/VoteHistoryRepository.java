package com.example.backend.repository;

import com.example.backend.domain.Article;
import com.example.backend.domain.VoteHistory;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VoteHistoryRepository extends JpaRepository<VoteHistory, Long> {

    @Query("select vh from VoteHistory vh where vh.userId = :userId and vh.article = :article")
    Optional<VoteHistory> findByUserIdAAndArticle(@Param("userId") String userId, @Param("article") Article article);
}
