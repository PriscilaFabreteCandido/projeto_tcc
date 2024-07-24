package br.com.sistema.Mapper;

import br.com.sistema.DTO.Acao.AcaoDTO;
import br.com.sistema.DTO.Acao.AcaoPessoaDTO;
import br.com.sistema.Model.Acao;
import br.com.sistema.Model.AcaoPessoa;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = { PessoaMapper.class, FuncaoMapper.class })
public interface AcaoPessoaMapper {
    AcaoPessoa toEntity(AcaoPessoaDTO acaoPessoaDTO);
    AcaoPessoaDTO toDto(AcaoPessoa acaoPessoa);
}

