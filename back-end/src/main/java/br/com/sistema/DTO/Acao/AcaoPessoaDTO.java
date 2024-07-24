package br.com.sistema.DTO.Acao;

import br.com.sistema.DTO.FuncaoDTO;
import br.com.sistema.DTO.Pessoa.PessoaDTO;
import lombok.Data;

@Data
public class AcaoPessoaDTO {
    private Long id;
    private AcaoDTO acao;
    private FuncaoDTO funcao;
    private PessoaDTO pessoa;
}
