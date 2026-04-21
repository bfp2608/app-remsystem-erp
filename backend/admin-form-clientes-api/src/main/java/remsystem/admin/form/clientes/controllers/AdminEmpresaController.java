package remsystem.admin.form.clientes.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import remsystem.admin.form.clientes.models.dto.EmpresaCreateDto;
import remsystem.admin.form.clientes.models.dto.Response;
import remsystem.admin.form.clientes.services.AdminAddEmpresaService;

@RestController
@RequestMapping("/admin")
public class AdminEmpresaController {
    private final AdminAddEmpresaService adminAddEmpresaService;

    /** Constructor para inyectar el servicio de administración de empresas
     * @param adminAddEmpresaService Servicio para agregar empresas
     */
    public AdminEmpresaController(AdminAddEmpresaService adminAddEmpresaService) {
        this.adminAddEmpresaService = adminAddEmpresaService;
    }

    /** Endpoint para agregar una nueva empresa
     * @param dto Objeto con los datos de la empresa a crear
     * @return ResponseEntity con el resultado de la operación
     */
    @PostMapping("/add/empresa")
    public ResponseEntity<Response> addEmpresa(@RequestBody EmpresaCreateDto dto) {
        return ResponseEntity.ok(adminAddEmpresaService.addEmpresa(dto));
    }

}
