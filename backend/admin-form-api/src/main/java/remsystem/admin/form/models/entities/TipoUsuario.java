package remsystem.admin.form.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import remsystem.admin.form.models.enums.TipoUsuarioEnum;

import java.util.List;

@Entity
@Table(name = "tipo_usuario")
@Data
public class TipoUsuario{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_usuario")
    private int idTipoUsuario;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false, length = 50)
    private TipoUsuarioEnum tipo;

    @OneToMany(mappedBy = "tipoUsuario")
    @JsonIgnore
    private List<Usuario> usuarios;
}