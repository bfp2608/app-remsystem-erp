package remsystem.admin.form.clientes.services;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import remsystem.admin.form.clientes.models.dto.PersonaCreateDto;
import remsystem.admin.form.clientes.models.entities.Empresa;
import remsystem.admin.form.clientes.models.entities.Persona;
import remsystem.admin.form.clientes.repository.EmpresaRepository;
import remsystem.admin.form.clientes.repository.PersonaRepository;
import remsystem.admin.form.clientes.models.dto.Response;

import java.util.List;
import java.util.Optional;

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

        if (dto.getNombresCompletos() == null || dto.getNombresCompletos().isBlank()) {
            response.setMessage("¡El nombre completo es obligatorio!");
            response.setStatus(400);
            return response;
        }

        if (dto.getNombresCompletos().length() > 255) {
            response.setMessage("¡El nombre completo no puede exceder 255 caracteres!");
            response.setStatus(400);
            return response;
        }

        if (dto.getCargo() != null && dto.getCargo().length() > 120) {
            response.setMessage("¡El cargo no puede exceder 120 caracteres!");
            response.setStatus(400);
            return response;
        }

        if (dto.getCorreoPersonal() != null) {

            if (dto.getCorreoPersonal().length() > 150) {
                response.setMessage("¡El correo no puede exceder 150 caracteres!");
                response.setStatus(400);
                return response;
            }

            if (personaRepository.existsByCorreoPersonal(dto.getCorreoPersonal())) {
                response.setMessage("El correo ya está registrado");
                response.setStatus(409);
                return response;
            }

            Optional<Persona> personaExistente =
                    personaRepository.findByCorreoPersonal(dto.getCorreoPersonal());

            if (personaExistente.isPresent()) {
                response.setMessage("Ya existe una persona con ese correo");
                response.setStatus(409);
                return response;
            }
        }

        if (dto.getCelularPersonal() != null &&
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

        List<Persona> personasEmpresa =
                personaRepository.findByEmpresa_Ruc(dto.getRucEmpresa());

        if (personasEmpresa.size() > 100) {
            response.setMessage("La empresa ya tiene demasiadas personas registradas");
            response.setStatus(400);
            return response;
        }

        List<Persona> personasSimilares =
                personaRepository.findByNombresCompletosContainingIgnoreCase(
                        dto.getNombresCompletos()
                );

        if (!personasSimilares.isEmpty()) {
            response.setMessage("Ya existe una persona con nombre similar");
            response.setStatus(409);
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