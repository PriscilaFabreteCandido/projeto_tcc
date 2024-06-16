package br.com.sistema.DTO.Acao;

import br.com.sistema.DTO.Pessoa.PessoaDTO;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class AcaoFilterDTO {
    private int ano;
    private Long idTipoAcao;
    private Long idProjeto;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT-3")
    private Date dtInicio;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT-3")
    private Date dtTermino;
    private PessoaDTO pessoas;

}
