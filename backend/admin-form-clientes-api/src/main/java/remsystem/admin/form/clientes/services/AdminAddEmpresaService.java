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

@Service
public class AdminAddEmpresaService {

    private final EmpresaRepository empresaRepo;
    private final EmpresaTipoRepository empresaTipoRepo;
    private final DistritoRepository distritoRepository;

    public AdminAddEmpresaService(
            EmpresaRepository empresaRepo,
            EmpresaTipoRepository empresaTipoRepo,
            DistritoRepository distritoRepository
    ) {
        this.empresaRepo = empresaRepo;
        this.empresaTipoRepo = empresaTipoRepo;
        this.distritoRepository = distritoRepository;
    }

    @Transactional
    public Response addEmpresa(EmpresaCreateDto dto) {

        // Validaciones básicas
        Response validationError = validateData(dto);
        if (validationError != null) return validationError;

        // Validación de formato RUC
        if (!isValidRuc(dto.getRuc())) {
            return buildError("¡El RUC debe tener exactamente 11 dígitos numéricos!", 400);
        }

        // Validar existencia de empresa
        if (empresaRepo.existsByRuc(dto.getRuc())) {
            return buildError("¡Ya existe una empresa con ese RUC!", 409);
        }

        // Validar distrito existente
        Distrito distrito = distritoRepository
                .findById(dto.getIdDistrito())
                .orElse(null);

        if (distrito == null) {
            return buildError("¡El distrito especificado no existe!", 404);
        }

        // Crear empresa
        Empresa empresa = mapToEmpresa(dto, distrito);
        empresaRepo.save(empresa);

        // 6Crear tipo de empresa
        EmpresaTipo empresaTipo = new EmpresaTipo();
        empresaTipo.setEmpresa(empresa);
        empresaTipo.setTipo(dto.getTipoEmpresa());
        empresaTipoRepo.save(empresaTipo);

        return buildSuccess("Empresa agregada exitosamente");
    }


    /**
     * Valida los datos básicos del DTO de creación de empresa, asegurando que los campos obligatorios estén presentes y sean válidos
     */
    private Response validateData(EmpresaCreateDto dto) {

        if (isBlank(dto.getRuc()))
            return buildError("¡El RUC es obligatorio!", 400);

        if (isBlank(dto.getRazonSocial()))
            return buildError("¡La Razón Social es obligatoria!", 400);

        if (dto.getIdDistrito() == null || dto.getIdDistrito() <= 0)
            return buildError("¡El distrito es obligatorio y debe ser válido!", 400);

        if (isBlank(dto.getTipoEmpresa()))
            return buildError("¡El tipo de empresa es obligatorio!", 400);

        return null;
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private boolean isValidRuc(String ruc) {
        return ruc.matches("\\d{20}");
    }


    /**
     * Mapea el DTO de creación de empresa a la entidad Empresa, asignando el distrito correspondiente
     */
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


    /**
     * Construye una respuesta de error con el mensaje y estado proporcionados
     */
    private Response buildError(String message, Integer status) {
        Response response = new Response();
        response.setMessage(message);
        response.setStatus(status);
        response.setSuccess(false);
        return response;
    }

    /**
     * Construye una respuesta de éxito con el mensaje proporcionado
     */
    private Response buildSuccess(String message) {
        Response response = new Response();
        response.setMessage(message);
        response.setStatus(201);
        response.setSuccess(true);
        return response;
    }
}