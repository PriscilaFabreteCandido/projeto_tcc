package br.com.sistema.Service;

import br.com.sistema.DTO.VinculoDTO;
import br.com.sistema.Mapper.VinculoMapper;
import br.com.sistema.Model.Vinculo;
import br.com.sistema.Repository.VinculoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VinculoService {

    private final VinculoRepository repository;
    private final VinculoMapper mapper;


    public VinculoDTO create(VinculoDTO vinculoDTO){

        Vinculo entity = mapper.toEntity(vinculoDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public VinculoDTO update(VinculoDTO vinculoDTO, Long id){

        findById(id);

        Vinculo entity = mapper.toEntity(vinculoDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Vinculo entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Vínculo com ID '" + id + "' não encontrado."));

        repository.delete(entity);
    }


    //=============================================================================================

    public VinculoDTO findById(Long id){
        Vinculo entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Vínculo com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<VinculoDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }
}
