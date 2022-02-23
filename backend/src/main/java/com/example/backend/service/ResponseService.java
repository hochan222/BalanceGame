package com.example.backend.service;

import com.example.backend.dto.BaseResult;
import com.example.backend.dto.ListResult;
import com.example.backend.dto.SingleResult;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.stereotype.Service;

@Service
public class ResponseService {

    public BaseResult getCommonResult() {
        BaseResult baseResult = new BaseResult();
        setStatus(baseResult);
        return baseResult;
    }

    public <T> SingleResult<T> getSingleResult(T data) {
        SingleResult<T> singleResult = new SingleResult<>();
        singleResult.setData(data);
        setStatus(singleResult);
        return singleResult;
    }

    public <T> ListResult<T> getListResult(List<T> data) {
        ListResult<T> listResult = new ListResult<>();
        listResult.setData(data);
        setStatus(listResult);
        return listResult;
    }

    private void setStatus(BaseResult baseResult) {
        baseResult.setSuccess(true);
        baseResult.setCode(CommonResponse.SUCCESS.getCode());
        baseResult.setMessage(CommonResponse.SUCCESS.getMessage());
    }

    @Getter
    @AllArgsConstructor
    public enum CommonResponse {
        SUCCESS(0, "성공하였습니다."),
        FAIL(-1, "실패하였습니다.");

        int code;
        String message;
    }
}
