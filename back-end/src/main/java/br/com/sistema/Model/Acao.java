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
    private String publicoAlvo;

    @Column
    private PeriodoAcademico semestre;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false, updatable = false)
    private Date dtInicio;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false, updatable = false)
    private Date dtTermino;

    @ManyToOne
    @JoinColumn(name = "instituicao_id")
    private Instituicao instituicao;

    @Column
    private String turma;

    @Column
    private String modalidade;//será entidade

    @Column
    private String horaInicio;

    @Column
    private String horaTermino;

    @Column
    private Integer qtdParticipantes;

    @Column
    private Integer qtdVagas;


    @Column
    private String numeroProcesso;


    @ManyToOne
    @JoinColumn(name = "tipo_acao_id")
    private TipoAcao tipoAcao;

    @ManyToOne
    @JoinColumn(name = "acao_projeto_id")
    private Acao projeto;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "acao_evento_id")
    private Acao evento;

    @Column
    private byte[] participantesPDF;

    @Column
    private List<byte[]> demaisDocumentos;

    @Column
    private String cep;

    @Column
    private String endereco;

    @Column
    private String rua;

    @Column
    private String uf;

    @Column
    private String cidade;

    @Column
    private String numero;

    @OneToMany(mappedBy = "acao")
    private List<AcaoPessoa> acaoPessoas;


}
