package remsystem.admin.form.clientes.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import remsystem.admin.form.clientes.models.dto.PersonaCreateDto;
import remsystem.admin.form.clientes.models.dto.Response;
import remsystem.admin.form.clientes.services.AdminAddPersonaService;

@RestController
@RequestMapping("/admin")
public class AdminPersonaController {

    private final AdminAddPersonaService adminAddPersonaService;

    public AdminPersonaController(AdminAddPersonaService adminAddPersonaService) {
        this.adminAddPersonaService = adminAddPersonaService;
    }

    @PostMapping("/add/persona")
    public ResponseEntity<Response> addPersona(@RequestBody PersonaCreateDto dto) {
        return ResponseEntity.ok(adminAddPersonaService.addPersona(dto));
    }
}