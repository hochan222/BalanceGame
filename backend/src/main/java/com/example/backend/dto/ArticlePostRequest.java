package com.example.backend.dto;

import com.example.backend.domain.Article;
import com.example.backend.domain.ArticleCategory;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@ApiModel(description = "게시글 등록 요청")
@Getter
public class ArticlePostRequest {

    @ApiModelProperty(value = "게시글 카테고리 이름", dataType = "String", required = true, example = "BackEnd")
    private String articleCategoryName;
    @ApiModelProperty(value = "게시글 제목", dataType = "String", required = true, example = "제목1")
    private String title;
    @ApiModelProperty(value = "게시글 내용", dataType = "String", required = true, example = "내용 재밌다")
    private String content;
    @ApiModelProperty(value = "왼쪽 항목", dataType = "String", required = true, example = "자바")
    private String leftItem;
    @ApiModelProperty(value = "오른쪽 항목", dataType = "String", required = true, example = "코틀린")
    private String rightItem;
    @ApiModelProperty(value = "비밀번호", dataType = "String", required = true, example = "st123")
    private String password;

    public Article toEntity(ArticleCategory articleCategory) {
        return new Article(articleCategory, title, content, leftItem, rightItem, password);
    }
}
