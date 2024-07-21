package br.com.sistema.DTO.Acao;

import br.com.sistema.DTO.*;
import br.com.sistema.DTO.Pessoa.PessoaDTO;
import br.com.sistema.Service.PeriodoAcademicoService;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class AcaoDTO {

    private Long id;
    private String nome;
    private TipoAcaoDTO tipoAcao;
    private Long idProjeto;
    private Long idEvento;
    private String publicoAlvo;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT-3")
    private Date dtInicio;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT-3")
    private Date dtTermino;

    private String turma;
    private PeriodoAcademicoDTO periodo;
    private String modalidade;
    private String horarioInicio;
    private String horarioTermino;
    private String numeroProcesso;
    private int qtdVagas;
    private int qtdParticipantes;

    private String cep;
    private String endereco;
    private String rua;
    private String uf;
    private String cidade;
    private String numero;
    private String complemento;
    private List<DocumentoDTO> documentos;

    private List<AcaoPessoaDTO> acaoPessoas;
    private InstituicaoDTO instituicaoAtendida;
    private AcaoDTO projeto;
    private AcaoDTO evento;
}
