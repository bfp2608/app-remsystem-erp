package remsystem.admin.form.clientes.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "distrito")
@Data
public class Distrito{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_distrito")
    private long idDistrito;

    @ManyToOne
    @JoinColumn(name = "id_provincia")
    private Provincia provincia;

    @OneToMany(mappedBy = "distrito")
    @JsonIgnore
    private List<Empresa> empresas;

    @OneToMany(mappedBy = "distrito")
    @JsonIgnore
    private List<Sucursal> sucursales;

    @Column(name = "distrito")
    private String distrito;

    @Column(name = "ubigeo",length = 6, nullable = false,unique = true)
    private String ubigeo;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}