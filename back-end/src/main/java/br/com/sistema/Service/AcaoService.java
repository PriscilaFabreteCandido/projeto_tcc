package br.com.sistema.Service;

import br.com.sistema.DTO.AcaoDTO;
import br.com.sistema.DTO.PessoaDTO;
import br.com.sistema.Exception.BusinessException;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.AcaoMapper;
import br.com.sistema.Mapper.PessoaMapper;
import br.com.sistema.Model.Acao;
import br.com.sistema.Model.Pessoa;
import br.com.sistema.Repository.AcaoRepository;
import br.com.sistema.Repository.PessoaRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AcaoService {

    private final AcaoRepository repository;
    private final AcaoMapper mapper;


    public AcaoDTO create(AcaoDTO acaoDTO){

        Acao entity = mapper.toEntity(acaoDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public AcaoDTO update(AcaoDTO acaoDTO, Long id){

        findById(id);

        Acao entity = mapper.toEntity(acaoDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Acao entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ação com ID '" + id + "' não encontrado."));

        repository.delete(entity);
    }


    //=============================================================================================

    public AcaoDTO findById(Long id){
        Acao entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ação com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<AcaoDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }


}
