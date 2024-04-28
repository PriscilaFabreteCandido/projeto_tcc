package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class TipoAcao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nome;

    //@OneToMany(mappedBy = "tipoAcao")
    //private List<Acao> acoes = new ArrayList<>();
}
