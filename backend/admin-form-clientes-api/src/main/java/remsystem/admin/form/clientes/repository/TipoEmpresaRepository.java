package remsystem.admin.form.clientes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import remsystem.admin.form.clientes.models.entities.TipoEmpresa;

import java.util.Optional;

@Repository
public interface TipoEmpresaRepository extends JpaRepository<TipoEmpresa, Long> {
    Optional<TipoEmpresa> findByNombre(String nombre);
}
