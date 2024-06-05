package br.com.sistema.DTO.Acao;

import br.com.sistema.DTO.InstituicaoDTO;
import br.com.sistema.DTO.PeriodoAcademicoDTO;
import br.com.sistema.DTO.Pessoa.PessoaDTO;
import br.com.sistema.DTO.ProjetoDTO;
import br.com.sistema.DTO.TipoAcaoDTO;
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
    private Date dtFim;
    private String turma;
    private PeriodoAcademicoDTO periodo;
    private String modalidade;
    private String horarioInicio;
    private String horarioTermino;
    private String numeroProcesso;
    private int qtdVagas;
    private int qtdParticipantes;
    private List<AcaoPessoaDTO> acaoPessoas;
    private String cep;
    private String endereco;
    private String rua;
    private String uf;
    private String cidade;
    private String numero;
    private String complemento;
    private byte[] participantes;
    private List<byte[]> documentos;

}
