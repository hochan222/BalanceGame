package com.example.backend.controller;

import com.example.backend.domain.Article;
import com.example.backend.dto.ArticleDetailGetResponse;
import com.example.backend.dto.ArticleGetResponse;
import com.example.backend.dto.ArticlePatchRequest;
import com.example.backend.dto.ArticlePostRequest;
import com.example.backend.dto.ArticleVoteCountPatchRequest;
import com.example.backend.dto.BaseResult;
import com.example.backend.dto.ListResult;
import com.example.backend.dto.SingleResult;
import com.example.backend.service.ArticleService;
import com.example.backend.service.ResponseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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
    public ResponseEntity<ListResult<ArticleGetResponse>> getArticles(@RequestParam(required = false) Long offset,
        @RequestParam(required = false) String sort, @RequestParam(required = false) String category,
        @RequestParam(required = false) String search) {
        List<Article> articles = articleService.getArticles(offset, sort, category, search);
        List<ArticleGetResponse> articleResponses = articles.stream().map(ArticleGetResponse::of)
            .collect(Collectors.toList());
        ListResult<ArticleGetResponse> articleGetResponseResults = responseService.getListResult(articleResponses);
        return new ResponseEntity<>(articleGetResponseResults, HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 단건조회", notes = "조건에 맞는 게시글 단건을 반환한다.")
    @GetMapping("/{articleId}")
    public ResponseEntity<SingleResult<ArticleDetailGetResponse>> getArticle(@RequestParam Long articleId) {

        Article article = articleService.getArticle(articleId);
        ArticleDetailGetResponse articleDetailGetResponse = ArticleDetailGetResponse.of(article);
        SingleResult<ArticleDetailGetResponse> articleDetailGetResponseSingleResult = responseService.getSingleResult(
            articleDetailGetResponse);
        return new ResponseEntity<>(articleDetailGetResponseSingleResult, HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 투표 추가", notes = "중복 투표를 검증하고, 투표수가 증가한다.")
    @PatchMapping("/{articleId}/vote")
    public ResponseEntity<BaseResult> addVoteCount(@PathVariable Long articleId, @RequestBody ArticleVoteCountPatchRequest articleVoteCountPatchRequest,
        @RequestHeader Map<String, Object> requestHeader) {
        // TODO: key 변경하기
        String userId = (String) requestHeader.get("key");
        articleService.addCount(articleId, articleVoteCountPatchRequest.getSelectedVote(), userId);
        return new ResponseEntity<>(responseService.getSuccessBaseResult(), HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 수정", notes = "게시글의 제목과 내용, 카테고리를 수정한다.")
    @PatchMapping("/{articleId}")
    public ResponseEntity<BaseResult> updateArticle(@PathVariable Long articleId,
        @RequestBody ArticlePatchRequest articlePatchRequest) {
        articleService.updateArticle(articleId, articlePatchRequest);
        return new ResponseEntity<>(responseService.getSuccessBaseResult(), HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 삭제", notes = "게시글을 삭제한다.")
    @DeleteMapping("/{articleId}")
    public ResponseEntity<BaseResult> deleteArticle(@PathVariable Long articleId) {
        articleService.deleteArticle(articleId);
        return new ResponseEntity<>(responseService.getSuccessBaseResult(), HttpStatus.OK);
    }
}
