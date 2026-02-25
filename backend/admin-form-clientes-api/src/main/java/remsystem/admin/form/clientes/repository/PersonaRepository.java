package remsystem.admin.form.clientes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import remsystem.admin.form.clientes.models.entities.Persona;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long> {

    // Buscar personas por empresa
    List<Persona> findByEmpresa_Id(Long idEmpresa);

    // Buscar por correo
    Optional<Persona> findByCorreoPersonal(String correoPersonal);

    // Validar si ya existe un correo
    boolean existsByCorreoPersonal(String correoPersonal);

    // Buscar por nombre (búsqueda parcial)
    List<Persona> findByNombresCompletosContainingIgnoreCase(String nombre);

}