package com.example.backend.controller.error;

import com.example.backend.controller.error.exception.article.NoArticleException;
import com.example.backend.controller.error.exception.articlecategory.NoArticleCategoryException;
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

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<BaseResult> handleUnexpectedException() {
        return ResponseEntity.ok(responseService.getFailBaseResult("unexpected error"));
    }

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
}
