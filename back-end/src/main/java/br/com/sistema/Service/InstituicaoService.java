package br.com.sistema.Service;

import br.com.sistema.DTO.FuncaoDTO;
import br.com.sistema.DTO.InstituicaoDTO;
import br.com.sistema.DTO.PessoaDTO;
import br.com.sistema.Exception.BusinessException;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.FuncaoMapper;
import br.com.sistema.Mapper.InstituicaoMapper;
import br.com.sistema.Mapper.PessoaMapper;
import br.com.sistema.Model.Funcao;
import br.com.sistema.Model.Instituicao;
import br.com.sistema.Model.Pessoa;
import br.com.sistema.Repository.FuncaoRepository;
import br.com.sistema.Repository.InstituicaoRepository;
import br.com.sistema.Repository.PessoaRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class InstituicaoService {

    private final InstituicaoRepository repository;
    private final InstituicaoMapper mapper;


    public InstituicaoDTO create(InstituicaoDTO instituicaoDTO){

        Instituicao entity = mapper.toEntity(instituicaoDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public InstituicaoDTO update(InstituicaoDTO instituicaoDTO, Long id){

        findById(id);

        Instituicao entity = mapper.toEntity(instituicaoDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Instituicao entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Instituição com ID '" + id + "' não encontrado."));

        repository.delete(entity);
    }


    //=============================================================================================

    public InstituicaoDTO findById(Long id){
        Instituicao entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Instituição com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<InstituicaoDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }


}
