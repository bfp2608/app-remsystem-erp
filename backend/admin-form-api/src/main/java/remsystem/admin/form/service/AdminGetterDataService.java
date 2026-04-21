package remsystem.admin.form.service;

import org.springframework.stereotype.Service;
import remsystem.admin.form.models.dto.*;
import remsystem.admin.form.models.entities.Usuario;
import remsystem.admin.form.repository.UsuarioDao;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminGetterDataService {
    private final UsuarioDao usuarioDao;

    public AdminGetterDataService(UsuarioDao usuarioDao) {
        this.usuarioDao = usuarioDao;
    }

    public Response findUsuario(String email){
        Response response = new Response();

        boolean exists = usuarioDao.existsByEmail(email);

        if (exists) {
            response.setMessage("¡El usuario si existe!");
            response.setStatus(200);
        }else{
            response.setMessage("¡El usuario no existe!");
            response.setStatus(404);
        }
        response.setSuccess(exists);

        return response;
    }

    public Response getData(String email){
        if (!findUsuario(email).isSuccess()){
            return Response
                    .builder()
                    .message("¡El usuario no fue encontrado!")
                    .status(404)
                    .build();
        }

        UsuarioData data = usuarioData(email);

        return UsuarioFindResponse
                .builder()
                .message("¡El usuario fue encontrado!")
                .status(200)
                .usuario(data)
                .success(true)
                .build();
    }

    private UsuarioData usuarioData(String email){
        Usuario usuario = usuarioDao.findByEmail(email).orElseThrow();
        return UsuarioData
                .builder()
                .nombre(usuario.getNombreUsuario())
                .email(usuario.getEmail())
                .tipo(usuario.getTipoUsuario().getTipo().getTipo())
                .fechaRegistro(usuario.getFechaRegistro())
                .build();
    }

    public Response getDataTable(){
        List<Usuario> usuarios = usuarioDao.findAll();

        if (usuarios.isEmpty()) {
            return Response
                    .builder()
                    .message("¡Actualmente, no existen usuarios!")
                    .status(404)
                    .build();
        }

        List<UsuarioTableData>  usuarioTableData = new ArrayList<>();
        for (Usuario usuario : usuarios) {
            UsuarioTableData u = UsuarioTableData
                    .builder()
                    .nombres(usuario.getNombreUsuario())
                    .email(usuario.getEmail())
                    .tipo(usuario.getTipoUsuario().getTipo().getTipo())
                    .fechaRegistro(usuario.getFechaRegistro())
                    .estado(usuario.isEstado())
                    .build();
            usuarioTableData.add(u);
        }

        return UsuarioTable
                .builder()
                .message("¡Usuarios encontrados!")
                .success(true)
                .status(200)
                .allUserTable(usuarioTableData)
                .build();
    }
}