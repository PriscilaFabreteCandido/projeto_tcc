package br.com.sistema.Service;

import br.com.sistema.DTO.PessoaDTO;
import br.com.sistema.Exception.BusinessException;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.PessoaMapper;
import br.com.sistema.Model.Pessoa;
import br.com.sistema.Repository.PessoaRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PessoaService {

    private final PessoaRepository repository;
    private final PessoaMapper mapper;

    private final Validator validator;

    public PessoaDTO create(PessoaDTO pessoaDTO){
        validatePessoa(pessoaDTO);

        Pessoa entity = mapper.toEntity(pessoaDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public PessoaDTO update(PessoaDTO pessoaDTO, Long id){
        validatePessoa(pessoaDTO);

        findById(id);

        Pessoa entity = mapper.toEntity(pessoaDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Pessoa entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pessoa com ID '" + id + "' não encontrado."));

        repository.delete(entity);
    }


    //=============================================================================================

    public PessoaDTO findById(Long id){
        Pessoa entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pessoa com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<PessoaDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }

    private void validatePessoa(PessoaDTO pessoaDTO){
        Set<ConstraintViolation<PessoaDTO>> violations = validator.validate(pessoaDTO);

        for (ConstraintViolation<PessoaDTO> violation : violations) {
            throw new BusinessException(violation.getMessage());
        }
    }

}
