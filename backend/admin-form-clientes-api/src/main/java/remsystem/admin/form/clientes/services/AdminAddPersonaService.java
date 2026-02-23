package remsystem.admin.form.clientes.services;

import org.springframework.stereotype.Service;
import remsystem.admin.form.clientes.repository.PersonaRepository;

@Service
public class AdminAddPersonaService {
    private final PersonaRepository personaRepository;

    public AdminAddPersonaService(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }
}