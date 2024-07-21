
package br.com.sistema.Mapper;

import br.com.sistema.DTO.Acao.AcaoDTO;
import br.com.sistema.DTO.DocumentoDTO;
import br.com.sistema.Model.Acao;
import br.com.sistema.Model.Documento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", uses = {AcaoPessoaMapper.class})
public interface AcaoMapper {
    AcaoMapper INSTANCE = Mappers.getMapper(AcaoMapper.class);

    @Mapping(source = "acaoPessoas", target = "acaoPessoas")
    @Mapping(source = "documentos", target = "documentos")
    AcaoDTO toDto(Acao acao);

    @Mapping(source = "acaoPessoas", target = "acaoPessoas")
    @Mapping(source = "documentos", target = "documentos")
    Acao toEntity(AcaoDTO acaoDTO);

    List<AcaoDTO> toDto(List<Acao> acoes);
    List<Acao> toEntity(List<AcaoDTO> acaoDTOs);

    List<DocumentoDTO> toDocumentoDtoList(List<Documento> documentos);
    List<Documento> toDocumentoEntityList(List<DocumentoDTO> documentoDTOs);
}