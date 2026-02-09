package remsystem.login.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import remsystem.login.jwt.JwtService;
import remsystem.login.model.dto.LoginRequest;
import remsystem.login.model.dto.LoginResponse;
import remsystem.login.model.dto.TokenBody;
import remsystem.login.model.entities.Usuario;
import remsystem.login.repository.UsuarioDao;

import java.util.Optional;

@Service
public class AuthService{
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final UsuarioDao usuarioDao;

    public AuthService(
            UsuarioDao usuarioDao,
            JwtService jwtService,
            PasswordEncoder encoder
    ) {
        this.usuarioDao = usuarioDao;
        this.jwtService = jwtService;
        this.encoder = encoder;
    }

    public LoginResponse login(LoginRequest loginRequest) {
        LoginResponse loginResponse = new LoginResponse();

        if (loginRequest.password().isEmpty() && loginRequest.email().isEmpty()) {
            loginResponse.setMessage("¡Los campos deben estar llenos!");
            loginResponse.setStatus(404);
            return loginResponse;
        }

        if (loginRequest.email().isEmpty()){
            loginResponse.setMessage("¡El correo ingresado no es válido!");
            loginResponse.setStatus(404);
            return loginResponse;
        }

        if (loginRequest.password().isEmpty()) {
            loginResponse.setMessage("¡La contraseña ingresada no es válida!");
            loginResponse.setStatus(404);
            return loginResponse;
        }

        Optional<Usuario> usuarioOpt = usuarioDao.findByEmail(loginRequest.email());

        if (usuarioOpt.isEmpty()){
            loginResponse.setMessage("¡El usuario no fue encontrado!");
            loginResponse.setStatus(400);
            return loginResponse;
        }

        Usuario usuario = usuarioOpt.get();

        if (!encoder.matches(loginRequest.password(),usuario.getContrasenia())){
            loginResponse.setMessage("¡Contraseña incorrecta! ¡Vuelve a intentarlo!");
            loginResponse.setStatus(404);
            return loginResponse;
        }

        String token = jwtService.generateToken(
                TokenBody.builder().idUsuario(usuario.getIdUsuario()).idTipoUsuario(usuario.getIdTipoUsuario()).build()
        );
        loginResponse.setMessage("¡Sesión lograda con éxito!");
        loginResponse.setStatus(200);
        loginResponse.setSuccess(true);
        loginResponse.setToken(token);

        return loginResponse;
    }
}