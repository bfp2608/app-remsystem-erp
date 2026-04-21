package remsystem.admin.form.service;

import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import remsystem.admin.form.models.dto.*;
import remsystem.admin.form.models.entities.Usuario;
import remsystem.admin.form.repository.UsuarioDao;

@Service
public class AdminUpdatePasswordUsuarioService extends AdminService<UpdatePasswordDto>{

    private final UsuarioDao usuarioDao;
    private final PasswordEncoder passwordEncoder;

    public AdminUpdatePasswordUsuarioService(
            UsuarioDao usuarioDao,
            PasswordEncoder passwordEncoder
    ) {
        this.usuarioDao = usuarioDao;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @Override
    public Response methodService(UpdatePasswordDto updateDto) {
        Response response = new Response();

        if (validateAllData(updateDto)) {
            response.setMessage("¡Los datos ingresados no son validos!");
            response.setStatus(400);
            return response;
        }

        if (notValid(updateDto.getEmail())){
            response.setMessage("¡El correo ingresado no es válido!");
            response.setStatus(400);
            return response;
        }

        if (notValid(updateDto.getNewPassword())){
            response.setMessage("¡La nueva contraseña ingresada no es válida!");
            response.setStatus(400);
            return response;
        }

        if (notValid(updateDto.getConfirmNewPassword())){
            response.setMessage("¡La nueva contraseña ingresada no es válida!");
            response.setStatus(400);
            return response;
        }

        if (!usuarioDao.existsByEmail(updateDto.getEmail())){
            response.setMessage("¡El usuario consultado no existe!");
            response.setStatus(404);
            return response;
        }

        if (!updateDto.getNewPassword()
                .equals(updateDto.getConfirmNewPassword())) {
            response.setMessage("¡Las contraseñas ingresadas deben ser iguales!");
            response.setStatus(400);
            return response;
        }

        if (validPassword(updateDto.getNewPassword())){
            response.setMessage(
                    "¡La contraseña no es válida!" +
                            "\n¡La contraseña debe tener" +
                            "\nentre 8-16 caracteres,una mayúscula," +
                            "\n una minúscula, un número y un carácter especial!"
            );
            response.setStatus(400);
            return response;
        }

        updatePassword(updateDto);
        response.setMessage("¡La contraseña fue actualizada con éxito!");
        response.setStatus(200);
        response.setSuccess(true);
        return response;
    }

    private void updatePassword(UpdatePasswordDto updateDto){
        Usuario usuario = usuarioDao.findByEmail(updateDto.getEmail()).orElseThrow();
        usuario.setContrasenia(passwordEncoder.encode(updateDto.getNewPassword()));
        usuarioDao.save(usuario);
    }

    private boolean validateAllData(UpdatePasswordDto updateDto){
        return notValid(updateDto.getEmail()) && notValid(updateDto.getNewPassword()) && notValid(updateDto.getConfirmNewPassword());
    }
}