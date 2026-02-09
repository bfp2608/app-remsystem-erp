package remsystem.login.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.*;
import remsystem.login.model.entities.Usuario;

import java.util.Optional;

@Repository
public interface UsuarioDao extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}