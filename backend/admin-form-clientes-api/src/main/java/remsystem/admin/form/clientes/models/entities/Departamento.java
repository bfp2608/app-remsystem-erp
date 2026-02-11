package remsystem.admin.form.clientes.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "departamento")
@Data
public class Departamento{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_provincia")
    private long idProvincia;

    @OneToMany(mappedBy = "departamento")
    @JsonIgnore
    private List<Provincia> provincias;

    @Column(name = "departamento",nullable = false,unique = true)
    private String departamento;

    @Column(name = "ubigeo",unique = true,nullable = false,length = 2)
    private String ubigeo;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}