package com.example.backend.dto;

import com.example.backend.domain.Article;
import com.example.backend.domain.ArticleComment;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@ApiModel(description = "게시글 댓글 등록 요청")
@Getter
public class ArticleCommentPostRequest {

    @ApiModelProperty(value = "게시글 댓글 비밀번호", dataType = "String", required = true, example = "12345678")
    private String password;
    @ApiModelProperty(value = "게시글 댓글 내용", dataType = "String", required = true, example = "댓글 내용")
    private String content;

    public ArticleComment toEntity(Article article) {
        return new ArticleComment(article, password, content);
    }
}
