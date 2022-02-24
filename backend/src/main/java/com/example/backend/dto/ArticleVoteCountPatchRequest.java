package com.example.backend.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class ArticleVoteCountPatchRequest {

    @ApiModelProperty(value = "투표 선택결과", dataType = "String", required = true, example = "right")
    private String selectedVote;
}
