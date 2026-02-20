package remsystem.admin.form.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import remsystem.admin.form.models.dto.Response;
import remsystem.admin.form.models.dto.UpdatePasswordDto;
import remsystem.admin.form.models.dto.UsuarioCreateDto;
import remsystem.admin.form.service.AdminAddUsuarioService;
import remsystem.admin.form.service.AdminDeleteUsuarioService;
import remsystem.admin.form.service.AdminGetterDataService;
import remsystem.admin.form.service.AdminUpdatePasswordUsuarioService;

@RestController
@RequestMapping("/managment/users")
public class AdminManagmentController {
    private final AdminAddUsuarioService adminAddUsuarioService;
    private final AdminDeleteUsuarioService adminDeleteUsuarioService;
    private final AdminUpdatePasswordUsuarioService adminUpdatePasswordUsuarioService;
    private final AdminGetterDataService adminGetterDataService;

    public AdminManagmentController(
            AdminAddUsuarioService adminAddUsuarioService,
            AdminDeleteUsuarioService adminDeleteUsuarioService,
            AdminUpdatePasswordUsuarioService adminUpdatePasswordUsuarioService,
            AdminGetterDataService adminGetterDataService
    ) {
        this.adminAddUsuarioService = adminAddUsuarioService;
        this.adminDeleteUsuarioService = adminDeleteUsuarioService;
        this.adminUpdatePasswordUsuarioService = adminUpdatePasswordUsuarioService;
        this.adminGetterDataService = adminGetterDataService;
    }

    @PostMapping("/create")
    public ResponseEntity<Response> createUser(@RequestBody UsuarioCreateDto usuario){
        return ResponseEntity.ok(adminAddUsuarioService.methodService(usuario));
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<Response> deleteUser(@PathVariable String email){
        return ResponseEntity.ok(adminDeleteUsuarioService.methodService(email));
    }

    @PatchMapping("/update/password")
    public ResponseEntity<Response> updatePassword(@RequestBody UpdatePasswordDto update){
        return ResponseEntity.ok(adminUpdatePasswordUsuarioService.methodService(update));
    }

    @GetMapping("/get/all")
    public ResponseEntity<Response> getAllUser(){
        return ResponseEntity.ok(adminGetterDataService.getDataTable());
    }

    @GetMapping("/get/user/{email}")
    public ResponseEntity<Response> getUserData(@PathVariable String email){
        return ResponseEntity.ok(adminGetterDataService.getData(email));
    }

    @GetMapping("/exists/user/{email}")
    public ResponseEntity<Response> existsUserByEmail(@PathVariable String email){
        return ResponseEntity.ok(adminGetterDataService.findUsuario(email));
    }
}