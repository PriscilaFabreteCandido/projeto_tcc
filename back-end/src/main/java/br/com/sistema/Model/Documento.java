package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

//@Data
//@Entity
public class Documento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nome;

    @Column
    private List<byte[]> conteudo;

    @Column
    private String tipo;
}
