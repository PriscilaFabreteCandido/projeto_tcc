package br.com.sistema.Mapper;

import br.com.sistema.DTO.DocumentoDTO;
import br.com.sistema.Model.Documento;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DocumentoMapper extends EntityMapper<DocumentoDTO, Documento> {
}
