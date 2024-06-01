package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nome;

    @Column
    private String nivel;

    @OneToMany(mappedBy = "curso")
    private List<Pessoa> pessoas;
}
