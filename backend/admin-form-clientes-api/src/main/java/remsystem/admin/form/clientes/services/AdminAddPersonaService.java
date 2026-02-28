package remsystem.admin.form.clientes.services;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import remsystem.admin.form.clientes.models.dto.PersonaCreateDto;
import remsystem.admin.form.clientes.models.entities.Empresa;
import remsystem.admin.form.clientes.models.entities.Persona;
import remsystem.admin.form.clientes.repository.EmpresaRepository;
import remsystem.admin.form.clientes.repository.PersonaRepository;
import remsystem.admin.form.clientes.models.dto.Response;

@Service
public class AdminAddPersonaService {

    private final PersonaRepository personaRepository;
    private final EmpresaRepository empresaRepository;

    public AdminAddPersonaService(PersonaRepository personaRepository,
                                  EmpresaRepository empresaRepository) {
        this.personaRepository = personaRepository;
        this.empresaRepository = empresaRepository;
    }

    @Transactional
    public Response addPersona(PersonaCreateDto dto) {

        Response response = new Response();

        if (dto.getRucEmpresa() == null || dto.getRucEmpresa().isBlank()) {
            response.setMessage("¡El RUC es obligatorio!");
            response.setStatus(400);
            return response;
        }

        if(dto.getRucEmpresa().length() != 11){
            response.setMessage("¡El RUC debe tener 11 digitos");
            response.setStatus(400);
            return response;
        }

        if (dto.getNombresCompletos() == null || dto.getNombresCompletos().isBlank()) {
            response.setMessage("¡El nombre completo es obligatorio!");
            response.setStatus(400);
            return response;
        }

        if (dto.getCargo() != null && dto.getCargo().isBlank()) {
            response.setMessage("¡El cargo no es valido!");
            response.setStatus(400);
            return response;
        }

        if (dto.getCorreoPersonal() == null || dto.getCorreoPersonal().length() > 150) {
            response.setMessage("¡El correo ingresado no es valido!");
            response.setStatus(400);
            return response;
        }

        if (personaRepository.existsByCorreoPersonal(dto.getCorreoPersonal())) {
            response.setMessage("La persona con este correo ya está registrada");
            response.setStatus(409);
            return response;
        }

        if (dto.getCelularPersonal() == null ||
                dto.getCelularPersonal().length() > 20) {

            response.setMessage("¡El celular no puede exceder 20 caracteres!");
            response.setStatus(400);
            return response;
        }

        Empresa empresa = empresaRepository
                .findByRuc(dto.getRucEmpresa())
                .orElse(null);

        if (empresa == null) {
            response.setMessage("¡La empresa no existe!");
            response.setStatus(404);
            return response;
        }

        Persona persona = new Persona();
        persona.setEmpresa(empresa);
        persona.setNombresCompletos(dto.getNombresCompletos());
        persona.setCargo(dto.getCargo());
        persona.setCorreoPersonal(dto.getCorreoPersonal());
        persona.setCelularPersonal(dto.getCelularPersonal());

        personaRepository.save(persona);

        response.setMessage("¡La persona fue registrada con éxito!");
        response.setSuccess(true);
        response.setStatus(201);

        return response;
    }
}