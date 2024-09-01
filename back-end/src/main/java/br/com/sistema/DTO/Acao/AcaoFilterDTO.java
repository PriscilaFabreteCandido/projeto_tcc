package br.com.sistema.DTO.Acao;

import br.com.sistema.DTO.Pessoa.PessoaDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class AcaoFilterDTO {
    private Long ano;
    private Long idTipoAcao;
    private Long idProjeto;
    private Long idEvento;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT-3")
    private Date dtInicio;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT-3")
    private Date dtTermino;
    private List<PessoaDTO> pessoas;

}
