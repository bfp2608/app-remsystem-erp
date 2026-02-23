package remsystem.admin.form.clientes.services;

import org.springframework.stereotype.Service;
import remsystem.admin.form.clientes.models.dto.EmpresaCreateDto;
import remsystem.admin.form.clientes.models.dto.Response;
import remsystem.admin.form.clientes.repository.DistritoRepository;
import remsystem.admin.form.clientes.repository.EmpresaRepository;
import remsystem.admin.form.clientes.repository.EmpresaTipoRepository;

@Service
public class AdminAddEmpresaService{
    private final EmpresaRepository empresaRepo;
    private final EmpresaTipoRepository empresaTipoRepo;
    private final DistritoRepository distritoRepository;

    public AdminAddEmpresaService(
            EmpresaRepository empresaRepo,
            EmpresaTipoRepository empresaTipoRepo,
            DistritoRepository distritoRepository
    ){
        this.empresaRepo = empresaRepo;
        this.empresaTipoRepo = empresaTipoRepo;
        this.distritoRepository = distritoRepository;
    }

    public Response addEmpresa(EmpresaCreateDto empresa){
        Response response = new Response();

        return response;
    }
}