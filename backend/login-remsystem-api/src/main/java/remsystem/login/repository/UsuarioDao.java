package remsystem.login.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.*;
import remsystem.login.model.dto.MeData;
import remsystem.login.model.entities.Usuario;

import java.util.Optional;

@Repository
public interface UsuarioDao extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

    @Query(value = """
                SELECT 
                    u.nombre_usuario AS nombres,
                    u.email,
                    tu.tipo AS tipoUsuario,
                    u.fecha_registro AS fechaRegistro
                FROM usuario u
                JOIN tipo_usuario tu ON tu.id_tipo_usuario = u.id_tipo_usuario
                WHERE u.id_usuario = :idUsuario
            """, nativeQuery = true)
    Optional<MeData> findMeDataById(@Param("idUsuario") long idUsuario);
}