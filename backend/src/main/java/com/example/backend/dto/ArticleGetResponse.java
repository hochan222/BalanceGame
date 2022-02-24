package com.example.backend.dto;

import com.example.backend.domain.Article;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.format.DateTimeFormatter;
import lombok.Getter;

@ApiModel(description = "게시글 목록 요청 시 반환되는 게시글 정보")
@Getter
public class ArticleGetResponse {

    private static final String DATE_TIME_FORMAT = "yyyy.MM.dd hh:mm";

    @ApiModelProperty(value = "게시글 아이디", dataType = "Long", required = true, example = "1")
    private Long id;
    @ApiModelProperty(value = "게시글 카테고리", dataType = "Object", required = true)
    private ArticleCategoryDto articleCategoryDto;
    @ApiModelProperty(value = "게시글 제목", dataType = "String", required = true, example = "제목")
    private String title;
    @ApiModelProperty(value = "게시글 전체 투표수", dataType = "Long", required = true, example = "10")
    private Long totalCount;
    @ApiModelProperty(value = "게시글 등록일자", dataType = "String", required = true, example = "2022.02.22 14:30")
    private String createdAt;
    @ApiModelProperty(value = "게시글 수정일자", dataType = "String", required = true, example = "2022.02.27 12:20")
    private String modifiedAt;

    public ArticleGetResponse(Long id, ArticleCategoryDto articleCategoryDto, String title, Long totalCount, String createdAt,
        String modifiedAt) {
        this.id = id;
        this.articleCategoryDto = articleCategoryDto;
        this.title = title;
        this.totalCount = totalCount;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }

    public static ArticleGetResponse of(Article article) {
        String createdAt = article.getCreatedAt().format(DateTimeFormatter.ofPattern(DATE_TIME_FORMAT));
        String modifiedAt = article.getModifiedAt().format(DateTimeFormatter.ofPattern(DATE_TIME_FORMAT));
        return new ArticleGetResponse(article.getId(), new ArticleCategoryDto(article.getArticleCategory()),
            article.getTitle(), article.getTotalCount(), createdAt, modifiedAt);
    }
}
