package br.com.sistema.Service;

import br.com.sistema.DTO.TipoAcaoDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.TipoAcaoMapper;
import br.com.sistema.Model.TipoAcao;
import br.com.sistema.Repository.TipoAcaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TipoAcaoService {

    private final TipoAcaoRepository repository;
    private final TipoAcaoMapper mapper;


    public TipoAcaoDTO create(TipoAcaoDTO tipoAcaoDTO){

        TipoAcao entity = mapper.toEntity(tipoAcaoDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public TipoAcaoDTO update(TipoAcaoDTO tipoAcaoDTO, Long id){

        findById(id);

        TipoAcao entity = mapper.toEntity(tipoAcaoDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        TipoAcao entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de ação com ID '" + id + "' não encontrado."));

        repository.delete(entity);
    }


    //=============================================================================================

    public TipoAcaoDTO findById(Long id){
        TipoAcao entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de ação com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<TipoAcaoDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }


}
