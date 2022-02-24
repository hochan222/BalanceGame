package com.example.backend.controller.error;

import com.example.backend.controller.error.exception.UnauthorizedException;
import com.example.backend.controller.error.exception.article.NoArticleException;
import com.example.backend.controller.error.exception.articlecategory.NoArticleCategoryException;
import com.example.backend.controller.error.exception.articlecomment.NoArticleCommentException;
import com.example.backend.controller.error.exception.votehistory.DuplicateVoteException;
import com.example.backend.dto.BaseResult;
import com.example.backend.service.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RequiredArgsConstructor
@RestControllerAdvice
public class ErrorController {

    private final ResponseService responseService;

    @ExceptionHandler(NoArticleException.class)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<BaseResult> handleNoArticleException() {
        return ResponseEntity.ok(responseService.getFailBaseResult("없는 게시글입니다."));
    }

    @ExceptionHandler(NoArticleCategoryException.class)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<BaseResult> handleNoArticleCommentException() {
        return ResponseEntity.ok(responseService.getFailBaseResult("없는 게시글 카테고리입니다."));
    }

    @ExceptionHandler(DuplicateVoteException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ResponseEntity<BaseResult> duplicateVoteException() {
        return ResponseEntity.ok(responseService.getFailBaseResult("이미 투표했습니다."));
    }
    
    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<BaseResult> handleUnauthroizedException() {
        return ResponseEntity.ok(responseService.getFailBaseResult("접근 권한이 없습니다."));
    }

    @ExceptionHandler(NoArticleCommentException.class)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<BaseResult> noArticleCommentExcepption() {
        return ResponseEntity.ok(responseService.getFailBaseResult("없는 게시글 댓글입니다."));
    }
}
