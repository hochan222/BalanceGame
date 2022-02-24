package com.example.backend.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class ArticlePatchRequest {

    @ApiModelProperty(value = "제목", dataType = "String", required = true, example = "코틀린 vs 자바")
    private String title;

    @ApiModelProperty(value = "내용", dataType = "String", required = true, example = "코틀린이 좋아? 자바가 나아? 나 스프링 쓸 건데 의견 부탁")
    private String content;

    @ApiModelProperty(value = "게시글 카테고리 이름", dataType = "String", required = true, example = "Backend")
    private String categoryName;
}
