package remsystem.login.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import remsystem.login.model.dto.LoginRequest;
import remsystem.login.model.dto.LoginResponse;
import remsystem.login.model.dto.MeData;
import remsystem.login.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/sign/in")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @GetMapping("/me")
    public ResponseEntity<MeData> me(
    ) {
        return ResponseEntity.ok(authService.getMe());
    }
}