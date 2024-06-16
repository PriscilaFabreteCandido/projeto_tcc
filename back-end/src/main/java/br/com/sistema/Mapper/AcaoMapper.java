
package br.com.sistema.Mapper;

import br.com.sistema.DTO.Acao.AcaoDTO;
import br.com.sistema.Model.Acao;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", uses = {AcaoPessoaMapper.class})
public interface AcaoMapper {
    AcaoMapper INSTANCE = Mappers.getMapper(AcaoMapper.class);

    @Mapping(source = "acaoPessoas", target = "acaoPessoas")
    AcaoDTO toDto(Acao acao);

    @Mapping(source = "acaoPessoas", target = "acaoPessoas")
    Acao toEntity(AcaoDTO acaoDTO);

    List<AcaoDTO> toDto(List<Acao> acoes);
    List<Acao> toEntity(List<AcaoDTO> acaoDTOs);
}