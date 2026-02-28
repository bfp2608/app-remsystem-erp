package remsystem.admin.form.clientes.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import remsystem.admin.form.clientes.models.dto.EmpresaCreateDto;
import remsystem.admin.form.clientes.models.dto.Response;
import remsystem.admin.form.clientes.models.entities.Distrito;
import remsystem.admin.form.clientes.models.entities.Empresa;
import remsystem.admin.form.clientes.models.entities.EmpresaTipo;
import remsystem.admin.form.clientes.repository.DistritoRepository;
import remsystem.admin.form.clientes.repository.EmpresaRepository;
import remsystem.admin.form.clientes.repository.EmpresaTipoRepository;
import remsystem.admin.form.clientes.repository.TipoEmpresaRepository;

/**
 * CLASE SERVICIO QUE IMPLEMENTA LA LOGICA DE NEGOCIO
 * PARA AGREGAR EMPRESAS
 */
@Service
public class AdminAddEmpresaService {

    private final EmpresaRepository empresaRepo;
    private final EmpresaTipoRepository empresaTipoRepo;
    private final DistritoRepository distritoRepository;
    private final TipoEmpresaRepository tipoEmpresaRepository;

    /**
     * Constructor para inicializar repositorios
     * @param empresaRepo repositorio de la empresa
     * @param empresaTipoRepo repositorio de el tipo de empresa
     * @param distritoRepository repositorio de el distrito
     */
    public AdminAddEmpresaService(
            EmpresaRepository empresaRepo,
            EmpresaTipoRepository empresaTipoRepo,
            DistritoRepository distritoRepository,
            TipoEmpresaRepository tipoEmpresaRepository
    ) {
        this.empresaRepo = empresaRepo;
        this.empresaTipoRepo = empresaTipoRepo;
        this.distritoRepository = distritoRepository;
        this.tipoEmpresaRepository = tipoEmpresaRepository;
    }

    /**
     * Metodo para agregar datos de una empresa
     * @param dto parametro objeto que contiene datos de la empresa
     * @return devuelve una respuesta http
     */
    @Transactional
    public Response addEmpresa(EmpresaCreateDto dto) {
        Response validationError = validateData(dto);
        if (validationError != null) return validationError;

        if (!isValidRuc(dto.getRuc())) {
            return buildError("¡El RUC debe tener exactamente 11 dígitos numéricos!", 400);
        }

        if (empresaRepo.existsByRuc(dto.getRuc())) {
            return buildError("¡Ya existe una empresa con ese RUC!", 409);
        }

        Distrito distrito = distritoRepository
                .findByDistrito(dto.getDistrito())
                .orElse(null);

        if (distrito == null) {
            return buildError("¡El distrito especificado no existe!", 404);
        }

        Empresa empresa = mapToEmpresa(dto, distrito);
        empresaRepo.save(empresa);

        EmpresaTipo empresaTipo = new EmpresaTipo();
        empresaTipo.setEmpresa(empresa);
        empresaTipo.setTipoEmpresa(
                tipoEmpresaRepository.findByNombre(dto.getTipoEmpresa())
                        .orElseThrow()
        );
        empresaTipoRepo.save(empresaTipo);

        return buildSuccess("Empresa agregada exitosamente");
    }

    private Response validateData(EmpresaCreateDto dto) {

        if (isBlank(dto.getRuc()))
            return buildError("¡El RUC es obligatorio!", 400);

        if (isBlank(dto.getRazonSocial()))
            return buildError("¡La Razón Social es obligatoria!", 400);

        if (dto.getDistrito() == null || dto.getDistrito().isEmpty())
            return buildError("¡El distrito es obligatorio y debe ser válido!", 400);

        if (isBlank(dto.getTipoEmpresa()))
            return buildError("¡El tipo de empresa es obligatorio!", 400);

        return null;
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private boolean isValidRuc(String ruc) {
        return ruc.length() == 11;
    }

    private Empresa mapToEmpresa(EmpresaCreateDto dto, Distrito distrito) {
        return Empresa.builder()
                .ruc(dto.getRuc())
                .razonSocial(dto.getRazonSocial())
                .nombreComercial(dto.getNombreComercial())
                .telefono(dto.getTelefono())
                .correoCorporativo(dto.getCorreoCorporativo())
                .direccion(dto.getDireccion())
                .fechaInicioActividades(dto.getFechaInicioActividades())
                .sitioWeb(dto.getSitioWeb())
                .condicionRuc(dto.getCondicionRuc())
                .distrito(distrito)
                .build();
    }

    private Response buildError(String message, Integer status) {
        Response response = new Response();
        response.setMessage(message);
        response.setStatus(status);
        response.setSuccess(false);
        return response;
    }

    private Response buildSuccess(String message) {
        Response response = new Response();
        response.setMessage(message);
        response.setStatus(201);
        response.setSuccess(true);
        return response;
    }
}