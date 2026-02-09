package remsystem.admin.form.service;

import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import remsystem.admin.form.models.dto.Response;
import remsystem.admin.form.models.dto.UsuarioCreateDto;
import remsystem.admin.form.models.entities.TipoUsuario;
import remsystem.admin.form.models.entities.Usuario;
import remsystem.admin.form.models.enums.TipoUsuarioEnum;
import remsystem.admin.form.repository.TipoUsuarioDao;
import remsystem.admin.form.repository.UsuarioDao;

import java.time.LocalDate;

@Service
public class AdminAddUsuarioService extends AdminService<UsuarioCreateDto>{
    private final PasswordEncoder encoder;
    private final UsuarioDao usuarioDao;
    private final TipoUsuarioDao tipoUsuarioDao;

    public AdminAddUsuarioService(
            PasswordEncoder encoder,
            UsuarioDao usuarioDao,
            TipoUsuarioDao tipoUsuarioDao
    ) {
        this.encoder = encoder;
        this.usuarioDao = usuarioDao;
        this.tipoUsuarioDao = tipoUsuarioDao;
    }

    @Transactional
    @Override
    public Response methodService(UsuarioCreateDto user) {
        Response response = new Response();

        if (validateAllData(user)) {
            response.setMessage("¡Los datos ingresados no son válidos! ¡Todos deben estar llenos!");
            response.setStatus(400);
            return response;
        }

        if (usuarioDao.existsByEmail(user.getEmail())) {
            response.setMessage("¡El usuario ya existe!");
            response.setStatus(400);
            return response;
        }

        if (notValid(user.getNombreUsuario())){
            response.setMessage("¡El nombre ingresado no es válido!");
            response.setStatus(400);
            return response;
        }

        if (notValid(user.getEmail())){
            response.setMessage("¡El email ingresado no es válido!");
            response.setStatus(400);
            return response;
        }

        if (notValid(user.getContrasenia())){
            response.setMessage("¡La contraseña ingresada no es válida!");
            response.setStatus(400);
            return response;
        }

        if (notValid(user.getTipoUsuario())){
            response.setMessage("¡El tipo de usuario ingresado no es válido!");
            response.setStatus(400);
            return response;
        }

        //validación de demás datos
        if (!user.getEmail().contains("@")){
            response.setMessage("¡El correo ingresado no es válido!" +
                    "\nDebe contener el arroba + dominio,");
            response.setStatus(400);
            return response;
        }

        if (validPassword(user.getContrasenia())){
            response.setMessage(
                            "¡La contraseña no es válida!" +
                                    "\n¡La contraseña debe tener" +
                                    "\nentre 8-16 caracteres,una mayúscula," +
                                    "\n una minúscula, un número y un carácter especial!"
            );
            response.setStatus(400);
            return response;
        }

        if (!TipoUsuarioEnum.existsTipo(user.getTipoUsuario())){
            response.setMessage("¡El tipo de usuario ingresado no existe!" +
                    "\nSolo existen Administrador y Trabajador");
            response.setStatus(404);
            return response;
        }

        addUser(user);

        response.setMessage("¡El usuario fue agregado con éxito!");
        response.setSuccess(true);
        response.setStatus(201);
        return response;
    }

    private void addUser(UsuarioCreateDto user){
        TipoUsuario tipo = tipoUsuarioDao.findByTipo(
                TipoUsuarioEnum.fromString(user.getTipoUsuario())
        ).orElseThrow();

        Usuario usuario = new Usuario();
        usuario.setNombreUsuario(user.getNombreUsuario());
        usuario.setEmail(user.getEmail());
        usuario.setContrasenia(encoder.encode(user.getContrasenia()));
        usuario.setEstado(true);
        usuario.setFechaRegistro(LocalDate.now());
        usuario.setTipoUsuario(tipo);

        usuarioDao.save(usuario);
    }

    private boolean validateAllData(UsuarioCreateDto user) {
        return notValid(user.getNombreUsuario())
                && notValid(user.getEmail())
                && notValid(user.getContrasenia())
                && notValid(user.getTipoUsuario());
    }
}