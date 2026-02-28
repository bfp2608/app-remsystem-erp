package remsystem.admin.form.clientes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import remsystem.admin.form.clientes.models.entities.Distrito;

import java.util.Optional;

@Repository
public interface DistritoRepository extends JpaRepository<Distrito,Long> {
    Optional<Distrito> findByDistrito(String distrito);
}