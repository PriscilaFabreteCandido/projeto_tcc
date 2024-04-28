package br.com.sistema.Mapper;

import br.com.sistema.DTO.TipoAcaoDTO;
import br.com.sistema.DTO.TipoInstituicaoDTO;
import br.com.sistema.Model.TipoAcao;
import br.com.sistema.Model.TipoInstituicao;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TipoInstituicaoMapper extends EntityMapper<TipoInstituicaoDTO, TipoInstituicao> {
}