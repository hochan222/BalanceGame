package com.example.backend.dto;

import com.example.backend.domain.ArticleCategory;
import lombok.Getter;

@Getter
public class ArticleCategoryGetResponse {

    private Long id;
    private String name;

    public static ArticleCategoryGetResponse of(ArticleCategory articleCategory){
        return new ArticleCategoryGetResponse(articleCategory.getId(), articleCategory.getName());
    }

    public ArticleCategoryGetResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
