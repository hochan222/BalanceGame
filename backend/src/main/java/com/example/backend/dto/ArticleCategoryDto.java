package com.example.backend.dto;

import com.example.backend.domain.ArticleCategory;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@ApiModel(description = "게시글 카테고리를 반환한다.")
@Getter
public class ArticleCategoryDto {

    @ApiModelProperty(value = "게시글 카테고리 아이디", dataType = "Long", required = true, example = "1")
    private Long id;

    @ApiModelProperty(value = "게시글 카테고리 이름", dataType = "String", required = true, example = "BackEnd")
    private String name;

    public ArticleCategoryDto(ArticleCategory articleCategory) {
        this.id = articleCategory.getId();
        this.name = articleCategory.getName();
    }
}
