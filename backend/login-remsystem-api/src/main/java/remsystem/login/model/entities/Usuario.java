package remsystem.login.model.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "usuario")
@Data
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario",nullable = false)
    private long idUsuario;

    @Email
    @NotBlank
    @Column(name = "email",unique = true,nullable = false)
    private String email;

    @Column(name = "contrasenia",nullable = false)
    private String contrasenia;

    @Column(name = "id_tipo_usuario",nullable = false)
    private int idTipoUsuario;
}