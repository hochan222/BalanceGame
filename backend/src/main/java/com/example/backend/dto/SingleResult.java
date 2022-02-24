package com.example.backend.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SingleResult<T> extends BaseResult {

    @ApiModelProperty(value = "조회 데이터", dataType = "Object", required = true)
    private T data;
}
