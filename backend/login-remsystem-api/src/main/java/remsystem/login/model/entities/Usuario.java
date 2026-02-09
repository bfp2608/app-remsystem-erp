package remsystem.login.model.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuario")
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private long idUsuario;

    @Column(name = "email")
    private String email;

    @Column(name = "contrasenia")
    private String contrasenia;

    @Column(name = "id_tipo_usuario")
    private int idTipoUsuario;
}