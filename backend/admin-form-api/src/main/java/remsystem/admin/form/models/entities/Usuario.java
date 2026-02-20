package remsystem.admin.form.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.*;

@Entity
@Table(name = "usuario")
@EntityListeners(AuditingEntityListener.class)
@Data
public class Usuario{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario",nullable = false)
    private long idUsuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_usuario",nullable = false)
    private TipoUsuario tipoUsuario;

    @Column(name = "nombre_usuario",nullable = false, length = 50)
    private String nombreUsuario;

    @Email
    @NotBlank
    @Column(name = "email",unique = true,nullable = false,length = 100)
    private String email;

    @Column(name = "contrasenia",nullable = false)
    private String contrasenia;

    @Column(name = "fecha_registro",nullable = false)
    private LocalDate fechaRegistro;

    @Column(name = "estado",nullable = false)
    private boolean estado;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}