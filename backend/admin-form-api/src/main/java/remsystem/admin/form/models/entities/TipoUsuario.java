package remsystem.admin.form.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import remsystem.admin.form.models.enums.TipoUsuarioEnum;

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
}