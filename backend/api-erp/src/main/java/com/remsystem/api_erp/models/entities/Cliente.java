package com.remsystem.api_erp.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "CLIENTE")
@Data
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_cliente",nullable = false)
    private int idCliente;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario",nullable = false)
    private Usuario usuario;

    @Column(name = "domicilio_fiscal",nullable = false)
    private String domicilioFiscal;

    @Column(name = "distrito",nullable = false)
    private String distrito;

    @Column(name = "provincia",nullable = false)
    private String provincia;

    @Column(name = "departamento",nullable = false)
    private String departamento;

    @Column(name = "pais",nullable = false)
    private String pais;

    @Column(name = "fecha_inicio_actividades",nullable = false)
    private LocalDate fechaInicioActividades;

    @Column(name = "tipo_cliente",nullable = false)
    private String tipoCliente;
}