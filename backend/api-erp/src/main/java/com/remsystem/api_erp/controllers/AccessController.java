package com.remsystem.api_erp.controllers;

import com.remsystem.api_erp.models.dto.request.LoginRequest;
import com.remsystem.api_erp.models.dto.response.LoginResponse;
import com.remsystem.api_erp.services.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/access")
public class AccessController {
    private final LoginService loginService;

    public AccessController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/sign/in")
    public ResponseEntity<LoginResponse> signIn(LoginRequest loginRequest) {
        return ResponseEntity.ok(loginService.login(loginRequest));
    }
}