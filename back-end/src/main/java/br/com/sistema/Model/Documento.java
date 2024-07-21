package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Documento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Lob
    @Column(nullable = false)
    private String conteudo;

    @Column(nullable = false)
    private String tipo;

    @ManyToOne
    @JoinColumn(name = "acao_id", nullable = false)
    private Acao acao;


}
