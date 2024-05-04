package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nome;


//    @ManyToOne
//    @JoinColumn(name = "instituicao_id")
//    private Instituicao instituicao;
}
