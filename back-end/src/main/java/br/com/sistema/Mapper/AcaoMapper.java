package br.com.sistema.Mapper;

import br.com.sistema.DTO.Acao.AcaoDTO;
import br.com.sistema.DTO.Acao.AcaoPessoaDTO;
import br.com.sistema.Model.Acao;
import br.com.sistema.Model.AcaoPessoa;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AcaoMapper extends EntityMapper<AcaoDTO, Acao> {
    AcaoMapper INSTANCE = Mappers.getMapper(AcaoMapper.class);

    @Mapping(source = "acao.id", target = "acaoId")
    @Mapping(source = "pessoa.id", target = "pessoaId")
    @Mapping(source = "funcao.id", target = "funcaoId")
    AcaoPessoaDTO acaoPessoaToAcaoPessoaDTO(AcaoPessoa acaoPessoa);

    List<AcaoPessoaDTO> acaoPessoasToAcaoPessoaDTOs(List<AcaoPessoa> acaoPessoas);

    @Mapping(source = "acaoPessoas", target = "acaoPessoas")
    AcaoDTO acaoToAcaoDTO(Acao acao);

    List<AcaoDTO> acoesToAcaoDTOs(List<Acao> acoes);

    @Mapping(target = "acaoPessoas", ignore = true)
    Acao acaoDTOToAcao(AcaoDTO acaoDTO);
}