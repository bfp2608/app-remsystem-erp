package remsystem.admin.form.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import remsystem.admin.form.models.entities.TipoUsuario;
import remsystem.admin.form.models.enums.TipoUsuarioEnum;

import java.util.Optional;

@Repository
public interface TipoUsuarioDao extends JpaRepository<TipoUsuario, Long> {
    Optional<TipoUsuario> findByTipo(TipoUsuarioEnum tipo);
}