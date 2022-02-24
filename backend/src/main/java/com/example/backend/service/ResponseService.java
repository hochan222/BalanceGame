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

    public <T> SingleResult<T> getSingleResult(T data) {
        SingleResult<T> singleResult = new SingleResult<>();
        singleResult.setData(data);
        setSuccessStatus(singleResult);
        return singleResult;
    }

    public <T> ListResult<T> getListResult(List<T> data) {
        ListResult<T> listResult = new ListResult<>();
        listResult.setData(data);
        setSuccessStatus(listResult);
        return listResult;
    }

    public BaseResult getSuccessBaseResult() {
        BaseResult baseResult = new BaseResult();
        setSuccessStatus(baseResult);
        return baseResult;
    }

    public BaseResult getFailBaseResult(String message) {
        BaseResult baseResult = new BaseResult();
        setFailStatus(baseResult, message);
        return baseResult;
    }

    private void setSuccessStatus(BaseResult baseResult) {
        baseResult.setSuccess(true);
        baseResult.setCode(CommonResponse.SUCCESS.getCode());
        baseResult.setMessage(CommonResponse.SUCCESS.getMessage());
    }

    private void setFailStatus(BaseResult baseResult, String message) {
        baseResult.setSuccess(false);
        baseResult.setCode(CommonResponse.FAIL.getCode());
        baseResult.setMessage(message);
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
