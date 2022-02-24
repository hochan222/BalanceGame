package com.example.backend.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@ApiModel("게시글 댓글에 대한 수정 내용 요청")
@Getter
public class ArticleCommentPatchRequest {

    @ApiModelProperty(value = "내용", dataType = "String", readOnly = true, example = "댓글 내용 수정")
    private String content;

}
