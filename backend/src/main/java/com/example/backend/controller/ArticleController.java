package com.example.backend.controller;

import com.example.backend.domain.Article;
import com.example.backend.dto.ArticleGetResponse;
import com.example.backend.dto.ArticlePostRequest;
import com.example.backend.dto.BaseResult;
import com.example.backend.dto.ListResult;
import com.example.backend.service.ArticleService;
import com.example.backend.service.ResponseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 게시글 전체 목록 조회 및 추가 API
 */

@Api(tags = {"게시글"})
@RequiredArgsConstructor
@RequestMapping("/articles")
@RestController
public class ArticleController {

    private final ArticleService articleService;
    private final ResponseService responseService;


    @ApiOperation(value = "게시글 추가", notes = "게시글을 추가한다.")
    @PostMapping("")
    public ResponseEntity<BaseResult> createArticle(@RequestBody ArticlePostRequest articlePostRequest) {
        articleService.createArticle(articlePostRequest);
        return new ResponseEntity<>(responseService.getSuccessBaseResult(), HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 목록 조회", notes = "조건에 맞는 게시글 목록을 반환한다.")
    @GetMapping("")
    public ResponseEntity<ListResult<ArticleGetResponse>> getArticles(@RequestParam Long offset,
        @RequestParam(required = false) String sort, @RequestParam(required = false) String category,
        @RequestParam(required = false) String search) {

        List<Article> articles = articleService.getArticles(offset, sort, category, search);
        List<ArticleGetResponse> articleResponses = articles.stream().map(ArticleGetResponse::of)
            .collect(Collectors.toList());
        ListResult<ArticleGetResponse> articleGetResponseResults = responseService.getListResult(articleResponses);
        return new ResponseEntity<>(articleGetResponseResults, HttpStatus.OK);
    }
}
