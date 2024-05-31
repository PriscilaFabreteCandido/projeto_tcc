package br.com.sistema.Mapper;

import br.com.sistema.DTO.Acao.AcaoDTO;
import br.com.sistema.Model.Acao;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AcaoMapper extends EntityMapper<AcaoDTO, Acao> {
}