package com.example.backend.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@ApiModel(value = "댓글 비밀번호 매칭을 위한 request")
@Getter
public class ArticleCommentPasswordPostRequest {

    @ApiModelProperty(value = "댓글 비밀번호", dataType = "String", required = true)
    private String password;
}
