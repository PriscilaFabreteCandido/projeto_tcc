package br.com.sistema.Mapper;

import br.com.sistema.DTO.Acao.AcaoDTO;
import br.com.sistema.DTO.Acao.AcaoPessoaDTO;
import br.com.sistema.Model.Acao;
import br.com.sistema.Model.AcaoPessoa;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AcaoPessoaMapper  extends EntityMapper<AcaoPessoaDTO, AcaoPessoa> {
}
