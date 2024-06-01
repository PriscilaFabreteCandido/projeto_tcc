package br.com.sistema.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Entity
public class Acao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nome;

    @Column
    private String turma;

    @Column
    private String semestre;//será entidade

    @Column
    private String modalidade;//será entidade

    @Column
    private Integer qtdParticipantes;

    @Column
    private Integer qtdVagas;

    @Column
    private String localRealizacao;

    @ManyToOne
    @JoinColumn(name = "instituicao_id")
    private Instituicao instituicao;

    @ManyToOne
    @JoinColumn(name = "tipo_acao_id")
    private TipoAcao tipoAcao;

    @ManyToOne
    @JoinColumn(name = "acao_projeto_id")
    private Acao projeto;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false, updatable = false)
    private Date dtCriacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "acao_evento_id")
    private Acao evento;

    @Column
    private String participantesPDF;

    @Column
    private List<String> demaisDocumentos;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "acao_pai_id")
    private Acao acaoPai;

    @PrePersist
    protected void onCreate() {
        dtCriacao = new Date();
    }

}
