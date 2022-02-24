package com.example.backend.repository;

import com.example.backend.domain.VoteHistory;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteHistoryRepository extends JpaRepository<VoteHistory, Long> {

    Optional<VoteHistory> findByUserId(String userId);
}
