package com.example.backend.controller;

import com.example.backend.domain.ArticleCategory;
import com.example.backend.dto.ArticleCategoryGetResponse;
import com.example.backend.dto.ListResult;
import com.example.backend.service.ArticleCategoryService;
import com.example.backend.service.ResponseService;
import io.swagger.annotations.Api;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"게시글 카테고리"})
@RequiredArgsConstructor
@RequestMapping("/categories")
@RestController
public class ArticleCategoryController {

    private final ResponseService responseService;
    private final ArticleCategoryService articleCategoryService;

    @GetMapping("")
    public ResponseEntity<ListResult<ArticleCategoryGetResponse>> getArticleCategories() {
        List<ArticleCategory> articleCategories = articleCategoryService.getArticleCategories();
        List<ArticleCategoryGetResponse> articleCategoryGetResponses = articleCategories.stream()
            .map(ArticleCategoryGetResponse::of)
            .collect(Collectors.toList());
        ListResult<ArticleCategoryGetResponse> result = responseService.getListResult(articleCategoryGetResponses);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
