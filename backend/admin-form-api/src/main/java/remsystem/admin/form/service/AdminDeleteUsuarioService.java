package remsystem.admin.form.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import remsystem.admin.form.models.dto.Response;
import remsystem.admin.form.repository.UsuarioDao;

@Service
public class AdminDeleteUsuarioService extends AdminService<String>{
    private final UsuarioDao usuarioDao;
    public AdminDeleteUsuarioService(UsuarioDao usuarioDao) {
        this.usuarioDao = usuarioDao;
    }

    @Transactional
    @Override
    public Response methodService(String correo) {
        Response response = new Response();

        if (notValid(correo)) {
            response.setMessage("¡El correo ingresado no es válido!");
            response.setStatus(404);
            return response;
        }

        if (!usuarioDao.existsByEmail(correo)) {
            response.setMessage("¡El usuario no existe! ¡No se puede eliminar!");
            response.setStatus(404);
            return response;
        }

        usuarioDao.deleteByEmail(correo);

        if (usuarioDao.existsByEmail(correo)) {
            response.setMessage("¡El usuario no fue eliminado! ¡Algo salió mal!");
            response.setStatus(400);
            return response;
        }

        response.setMessage("¡El usuario fue eliminado con éxito!");
        response.setStatus(204);
        response.setSuccess(true);
        return response;
    }
}