package br.com.sistema.Service;

import br.com.sistema.DTO.FuncaoDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.FuncaoMapper;
import br.com.sistema.Model.Funcao;
import br.com.sistema.Repository.FuncaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FuncaoService {

    private final FuncaoRepository repository;
    private final FuncaoMapper mapper;


    public FuncaoDTO create(FuncaoDTO funcaoDTO){

        Funcao entity = mapper.toEntity(funcaoDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public FuncaoDTO update(FuncaoDTO funcaoDTO, Long id){

        findById(id);

        Funcao entity = mapper.toEntity(funcaoDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Funcao entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Função com ID '" + id + "' não encontrado."));

        repository.delete(entity);
    }


    //=============================================================================================

    public FuncaoDTO findById(Long id){
        Funcao entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Função com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<FuncaoDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }


}
