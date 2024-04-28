package br.com.sistema.Service;

import br.com.sistema.DTO.TipoAcaoDTO;
import br.com.sistema.DTO.TipoInstituicaoDTO;
import br.com.sistema.Mapper.TipoAcaoMapper;
import br.com.sistema.Mapper.TipoInstituicaoMapper;
import br.com.sistema.Model.TipoInstituicao;
import br.com.sistema.Repository.TipoAcaoRepository;
import br.com.sistema.Repository.TipoInstituicaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TipoInstituicaoService {

    private final TipoInstituicaoRepository repository;
    private final TipoInstituicaoMapper mapper;

    public List<TipoInstituicaoDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }
}
