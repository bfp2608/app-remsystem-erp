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

        //Validar ruc de empresa
        if (dto.getRuc() == null || dto.getRuc().isBlank()) {
            response.setMessage("¡El RUC es obligatorio!");
            response.setStatus(400);
            return response;
        }

        // Validar nombres obligatorios
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

        // Validar cargo opcional
        if (dto.getCargo() != null && dto.getCargo().length() > 120) {
            response.setMessage("¡El cargo no puede exceder 120 caracteres!");
            response.setStatus(400);
            return response;
        }

        // Validar correo
        if (dto.getCorreoPersonal() != null) {

            if (dto.getCorreoPersonal().length() > 150) {
                response.setMessage("¡El correo no puede exceder 150 caracteres!");
                response.setStatus(400);
                return response;
            }

            // Uso de existsByCorreoPersonal
            if (personaRepository.existsByCorreoPersonal(dto.getCorreoPersonal())) {
                response.setMessage("El correo ya está registrado");
                response.setStatus(409);
                return response;
            }

            // Uso de findByCorreoPersonal
            Optional<Persona> personaExistente =
                    personaRepository.findByCorreoPersonal(dto.getCorreoPersonal());

            if (personaExistente.isPresent()) {
                response.setMessage("Ya existe una persona con ese correo");
                response.setStatus(409);
                return response;
            }
        }

        // Validar celular opcional
        if (dto.getCelularPersonal() != null &&
                dto.getCelularPersonal().length() > 20) {

            response.setMessage("¡El celular no puede exceder 20 caracteres!");
            response.setStatus(400);
            return response;
        }

        // Verificar si empresa existe
        Empresa empresa = empresaRepository
                .findById(dto.getIdEmpresa())
                .orElse(null);

        if (empresa == null) {
            response.setMessage("¡La empresa no existe!");
            response.setStatus(404);
            return response;
        }

        // Uso de findByEmpresa_Id
        List<Persona> personasEmpresa =
                personaRepository.findByEmpresa_Id(dto.getIdEmpresa());

        if (personasEmpresa.size() > 100) {
            response.setMessage("La empresa ya tiene demasiadas personas registradas");
            response.setStatus(400);
            return response;
        }

        // Uso de findByNombresCompletosContainingIgnoreCase
        List<Persona> personasSimilares =
                personaRepository.findByNombresCompletosContainingIgnoreCase(
                        dto.getNombresCompletos()
                );

        if (!personasSimilares.isEmpty()) {
            response.setMessage("Ya existe una persona con nombre similar");
            response.setStatus(409);
            return response;
        }


        // Crear y guardar persona
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