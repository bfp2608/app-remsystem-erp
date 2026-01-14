package com.remsystem.api_erp.models.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public abstract class Response {
    private boolean success;
    private String message;
    private int status;

    //public abstract boolean isValidate();
}