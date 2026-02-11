package remsystem.admin.form.clientes.models.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "sucursal")
@Data
public class Sucursal{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sucursal")
    private long idSucursal;
}