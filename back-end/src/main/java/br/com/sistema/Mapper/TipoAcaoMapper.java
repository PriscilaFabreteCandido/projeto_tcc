package br.com.sistema.Mapper;


import br.com.sistema.DTO.ProjetoDTO;
import br.com.sistema.DTO.TipoAcaoDTO;
import br.com.sistema.Model.Projeto;
import br.com.sistema.Model.TipoAcao;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TipoAcaoMapper extends EntityMapper<TipoAcaoDTO, TipoAcao> {
}