package remsystem.admin.form.clientes.services;

import org.springframework.stereotype.Service;
import remsystem.admin.form.clientes.models.dto.Response;
import remsystem.admin.form.clientes.repository.EmpresaRepository;
import remsystem.admin.form.clientes.repository.EmpresaTipoRepository;

@Service
public class AdminAddEmpresaService extends AdminService {
    private final EmpresaRepository empresaRepo;
    private final EmpresaTipoRepository empresaTipoRepo;

    public AdminAddEmpresaService(
            EmpresaRepository empresaRepo,
            EmpresaTipoRepository empresaTipoRepo
    ){
        this.empresaRepo = empresaRepo;
        this.empresaTipoRepo = empresaTipoRepo;
    }

    @Override
    public Response method() {
        Response response = new Response();

        return response;
    }
}