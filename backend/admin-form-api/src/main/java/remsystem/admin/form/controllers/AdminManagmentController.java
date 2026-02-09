package remsystem.admin.form.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import remsystem.admin.form.models.dto.Response;
import remsystem.admin.form.models.dto.UsuarioCreateDto;
import remsystem.admin.form.service.AdminAddUsuario;

@RestController
@RequestMapping("/managment/users")
public class AdminManagmentController {
    private final AdminAddUsuario adminAddUsuario;

    public AdminManagmentController(
            AdminAddUsuario adminAddUsuario
    ) {
        this.adminAddUsuario = adminAddUsuario;
    }

    @PostMapping("/create")
    public ResponseEntity<Response> createUser(@RequestBody UsuarioCreateDto usuario){
        return ResponseEntity.ok(adminAddUsuario.methodService(usuario));
    }
}