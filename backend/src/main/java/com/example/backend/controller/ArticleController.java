package com.example.backend.controller;

import com.example.backend.domain.Article;
import com.example.backend.domain.ArticleComment;
import com.example.backend.dto.ArticleCommentGetResponse;
import com.example.backend.dto.ArticleCommentPasswordPostRequest;
import com.example.backend.dto.ArticleCommentPatchRequest;
import com.example.backend.dto.ArticleCommentPostRequest;
import com.example.backend.dto.ArticleDetailGetResponse;
import com.example.backend.dto.ArticleGetResponse;
import com.example.backend.dto.ArticlePasswordPostRequest;
import com.example.backend.dto.ArticlePatchRequest;
import com.example.backend.dto.ArticlePostRequest;
import com.example.backend.dto.ArticleVoteCountPatchRequest;
import com.example.backend.dto.BaseResult;
import com.example.backend.dto.ListResult;
import com.example.backend.dto.SingleResult;
import com.example.backend.service.ArticleCommentService;
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
    private final ArticleCommentService articleCommentService;

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
    public ResponseEntity<SingleResult<ArticleDetailGetResponse>> getArticle(@PathVariable Long articleId) {

        Article article = articleService.getArticle(articleId);
        List<ArticleComment> articles = articleCommentService.getArticles(articleId);
        ArticleDetailGetResponse articleDetailGetResponse = ArticleDetailGetResponse.of(article, articles);
        SingleResult<ArticleDetailGetResponse> articleDetailGetResponseSingleResult = responseService.getSingleResult(
            articleDetailGetResponse);
        return new ResponseEntity<>(articleDetailGetResponseSingleResult, HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 투표 추가", notes = "중복 투표를 검증하고, 투표수가 증가한다.")
    @PatchMapping("/{articleId}/vote")
    public ResponseEntity<BaseResult> addVoteCount(@PathVariable Long articleId,
        @RequestBody ArticleVoteCountPatchRequest articleVoteCountPatchRequest,
        @RequestHeader Map<String, Object> requestHeader) {
        String userId = (String) requestHeader.get("user-agent");
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

    @ApiOperation(value = "게시글 비밀번호 일치 확인", notes = "입력된 비밀번호와 게시글 비밀번호의 일치 여부를 반환한다.")
    @PostMapping("/{articleId}/password")
    public ResponseEntity<BaseResult> matchArticlePassword(@PathVariable Long articleId,
        @RequestBody ArticlePasswordPostRequest articlePasswordPostRequest) {
        articleService.matchArticlePassword(articleId, articlePasswordPostRequest);
        return new ResponseEntity<>(responseService.getSuccessBaseResult(), HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 댓글 등록", notes = "게시글에 대한 댓글을 등록한다.")
    @PostMapping("/{articleId}/comments")
    public ResponseEntity<BaseResult> createArticleComment(@PathVariable Long articleId,
        @RequestBody ArticleCommentPostRequest articleCommentPostRequest) {
        articleCommentService.createArticleComment(articleId, articleCommentPostRequest);
        return new ResponseEntity<>(responseService.getSuccessBaseResult(), HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 댓글 수정", notes = "게시글에 대한 댓글을 수정한다.")
    @PatchMapping("/comments/{commentId}")
    public ResponseEntity<BaseResult> createArticleComment(@PathVariable Long commentId,
        @RequestBody ArticleCommentPatchRequest articleCommentPatchRequest) {
        articleCommentService.updateArticleComment(commentId, articleCommentPatchRequest);
        return new ResponseEntity<>(responseService.getSuccessBaseResult(), HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 댓글 삭제", notes = "게시글의 특정 댓글을 삭제한다.")
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<BaseResult> deleteArticleComment(@PathVariable Long commentId) {
        articleCommentService.deleteArticleComment(commentId);
        return new ResponseEntity<>(responseService.getSuccessBaseResult(), HttpStatus.OK);
    }

    @ApiOperation(value = "댓글 비밀번호 일치 확인", notes = "입력된 비밀번호와 댓글 비밀번호의 일치 여부를 반환한다.")
    @PostMapping("/comments/{commentId}")
    public ResponseEntity<BaseResult> matchArticleCommentPassword(@PathVariable Long commentId,
        @RequestBody ArticleCommentPasswordPostRequest articleCommentPasswordPostRequest) {
        articleCommentService.matchArticleCommentPassword(commentId, articleCommentPasswordPostRequest);
        return new ResponseEntity<>(responseService.getSuccessBaseResult(), HttpStatus.OK);
    }

    @ApiOperation(value = "댓글 목록 조회", notes = "조건에 맞는 댓글 목록을 반환한다.")
    @GetMapping("{articleId}/comments")
    public ResponseEntity<ListResult<ArticleCommentGetResponse>> getArticles(
        @RequestParam(required = false) Long offset,
        @RequestParam Long articleId) {
        List<ArticleComment> articleComments = articleCommentService.getArticleComments(articleId, offset);
        List<ArticleCommentGetResponse> articleCommentGetResponses = articleComments.stream()
            .map(ArticleCommentGetResponse::of)
            .collect(Collectors.toList());
        ListResult<ArticleCommentGetResponse> articleGetResponseResults = responseService.getListResult(
            articleCommentGetResponses);
        return new ResponseEntity<>(articleGetResponseResults, HttpStatus.OK);
    }
}
