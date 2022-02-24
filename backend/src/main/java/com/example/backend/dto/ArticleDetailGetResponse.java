package com.example.backend.dto;

import com.example.backend.domain.Article;
import com.example.backend.domain.ArticleComment;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;


@ApiModel(description = "게시글 단건 요청시 반환 되는 정보")
@Getter
public class ArticleDetailGetResponse {

    private static final String DATE_TIME_FORMAT = "yyyy.MM.dd hh:mm";

    @ApiModelProperty(value = "게시글 아이디", dataType = "Long", required = true, example = "1")
    private Long id;
    @ApiModelProperty(value = "게시글 카테고리", dataType = "Object", required = true)
    private ArticleCategoryDto articleCategoryDto;
    @ApiModelProperty(value = "게시글 제목", dataType = "String", required = true, example = "제목")
    private String title;
    @ApiModelProperty(value = "게시글 내용", dataType = "String", required = true, example = "제목")
    private String content;
    @ApiModelProperty(value = "왼쪽 투표 아이템", dataType = "String", required = true, example = "스프링")
    private String leftItem;
    @ApiModelProperty(value = "오른쪽 투표 아이템", dataType = "String", required = true, example = "코들린")
    private String rightItem;
    @ApiModelProperty(value = "게시글 전체 투표수", dataType = "Long", required = true, example = "10")
    private Long totalCount;
    @ApiModelProperty(value = "게시글 등록일자", dataType = "String", required = true, example = "2022.02.22 14:30")
    private String createdAt;
    @ApiModelProperty(value = "게시글 수정일자", dataType = "String", required = true, example = "2022.02.27 12:20")
    private String modifiedAt;
    @ApiModelProperty(value = "댓글 목록", dataType = "String", required = true, example = "2022.02.27 12:20")
    private List<ArticleCommentDto> articleCategoryDtos;


    public ArticleDetailGetResponse(Long id, ArticleCategoryDto articleCategoryDto, String title, String content,
        String leftItem, String rightItem, Long totalCount, String createdAt,
        String modifiedAt, List<ArticleCommentDto> articleCommentDtos) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.leftItem = leftItem;
        this.rightItem = rightItem;
        this.totalCount = totalCount;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.articleCategoryDto = articleCategoryDto;
        this.articleCategoryDtos = articleCommentDtos;
    }

    public static ArticleDetailGetResponse of(Article article, List<ArticleComment> articleComments) {
        String createdAt = article.getCreatedAt().format(DateTimeFormatter.ofPattern(DATE_TIME_FORMAT));
        String modifiedAt = article.getModifiedAt().format(DateTimeFormatter.ofPattern(DATE_TIME_FORMAT));
        List<ArticleCommentDto> articleCommentDtos = articleComments.stream()
            .map(ArticleCommentDto::new).collect(Collectors.toList());
        return new ArticleDetailGetResponse(article.getId(), new ArticleCategoryDto(article.getArticleCategory()),
            article.getTitle(), article.getContent(), article.getLeftItem(), article.getRightItem(),
            article.getTotalCount(), createdAt, modifiedAt, articleCommentDtos);
    }

}
