package br.com.sistema.Service;

import br.com.sistema.DTO.ProjetoDTO;
import br.com.sistema.DTO.PessoaDTO;
import br.com.sistema.Exception.BusinessException;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.ProjetoMapper;
import br.com.sistema.Mapper.PessoaMapper;
import br.com.sistema.Model.Projeto;
import br.com.sistema.Model.Pessoa;
import br.com.sistema.Repository.ProjetoRepository;
import br.com.sistema.Repository.PessoaRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProjetoService {

    private final ProjetoRepository repository;
    private final ProjetoMapper mapper;


    public ProjetoDTO create(ProjetoDTO projetoDTO){

        Projeto entity = mapper.toEntity(projetoDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public ProjetoDTO update(ProjetoDTO projetoDTO, Long id){

        findById(id);

        Projeto entity = mapper.toEntity(projetoDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Projeto entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Projeto com ID '" + id + "' não encontrado."));

        repository.delete(entity);
    }


    //=============================================================================================

    public ProjetoDTO findById(Long id){
        Projeto entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Projeto com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<ProjetoDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }


}
