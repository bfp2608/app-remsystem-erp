package com.remsystem.api_erp.models.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "EMPRESA")
@Data
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_empresa")
    private int idEmpresa;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "idCliente",nullable = false)
    private Cliente cliente;

    @Column(name = "sitio_web",nullable = false)
    private String sitioWeb;

    @Column(name = "actividad_economica", nullable = false)
    private String actividadEconomica;

    @Column(name = "nombre_comercial",nullable = false)
    private String nombreComercial;

    @Column(name = "tipo_empresa",nullable = false)
    private String tipoEmpresa;
}