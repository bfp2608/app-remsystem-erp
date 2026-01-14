package com.remsystem.api_erp.services;

import com.remsystem.api_erp.configuration.jwt.JwtService;
import com.remsystem.api_erp.models.dto.request.LoginRequest;
import com.remsystem.api_erp.models.dto.response.LoginResponse;
import com.remsystem.api_erp.models.entities.Usuario;
import com.remsystem.api_erp.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class LoginService {
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;

    public LoginService(
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            UsuarioRepository usuarioRepository
    ) {
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository;
    }

    public LoginResponse login(LoginRequest loginRequest) {
        LoginResponse loginResponse = new LoginResponse();

        String email =  loginRequest.getEmail();
        String password = loginRequest.getPassword();

        if(!validateEmail(email)){
            loginResponse.setMessage("¡El email ingresado no es válido!");
            loginResponse.setStatus(300);
            return loginResponse;
        }

        if(!validatePassword(password)){
            loginResponse.setMessage("¡La contraseña no es válida!");
            loginResponse.setStatus(301);
            return loginResponse;
        }

        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);

        if(usuario.isEmpty()){
            loginResponse.setMessage("¡El correo electrónico no fue encontrado!");
            loginResponse.setStatus(404);
            return loginResponse;
        }

        String findPassword = usuario.get().getContrasena();

        if(!passwordEncoder.matches(password,findPassword)){
            loginResponse.setMessage("¡La contraseña ingresada es incorrecta!");
            loginResponse.setStatus(400);
            return loginResponse;
        }

        loginResponse.setMessage("¡Sesión lograda con éxito! ¡Bienvenido(a) " + usuario.get().getRazonSocial() +"!");
        loginResponse.setStatus(200);
        loginResponse.setToken(jwtService.generateToken(
                loginRequest.getEmail(),
                Map.of(
                        "tipoUsuario",usuario.get().getTipoUsuario()
                )
                ));

        return loginResponse;
    }

    private boolean validateEmail(String email) {
        return email != null && !email.isEmpty() && !email.contains("@");
    }

    private boolean validatePassword(String password) {
        return !password.isEmpty() && password.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,16}$");
    }
}