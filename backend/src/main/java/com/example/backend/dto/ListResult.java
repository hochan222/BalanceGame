package com.example.backend.dto;

import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ListResult<T> extends BaseResult {

    @ApiModelProperty(value = "조회 데이터 List", dataType = "List", required = true)
    private List<T> data;

}
