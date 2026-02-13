package remsystem.admin.form.clientes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import remsystem.admin.form.clientes.models.entities.Persona;

@Repository
public interface PersonaRepository extends JpaRepository<Persona,Long> {

}