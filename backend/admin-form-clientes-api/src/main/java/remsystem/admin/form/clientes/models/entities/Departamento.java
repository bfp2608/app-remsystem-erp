package remsystem.admin.form.clientes.models.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "departamento")
@Data
public class Departamento{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_provincia")
    private long idProvincia;
}