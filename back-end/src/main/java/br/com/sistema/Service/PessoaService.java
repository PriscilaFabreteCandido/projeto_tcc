package br.com.sistema.Service;

import br.com.sistema.DTO.FuncaoDTO;
import br.com.sistema.DTO.InstituicaoDTO;
import br.com.sistema.DTO.Pessoa.ContextDataPessoaDTO;
import br.com.sistema.DTO.Pessoa.PessoaDTO;
import br.com.sistema.DTO.VinculoDTO;
import br.com.sistema.Exception.BusinessException;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.FuncaoMapper;
import br.com.sistema.Mapper.InstituicaoMapper;
import br.com.sistema.Mapper.PessoaMapper;
import br.com.sistema.Mapper.VinculoMapper;
import br.com.sistema.Model.Funcao;
import br.com.sistema.Model.Instituicao;
import br.com.sistema.Model.Pessoa;
import br.com.sistema.Model.Vinculo;
import br.com.sistema.Repository.FuncaoRepository;
import br.com.sistema.Repository.InstituicaoRepository;
import br.com.sistema.Repository.PessoaRepository;
import br.com.sistema.Repository.VinculoRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PessoaService {

    private final PessoaRepository repository;
    private final InstituicaoRepository instituicaoRepository;
    private final VinculoRepository vinculoRepository;

    private final FuncaoRepository funcaoRepository;
    private final PessoaMapper mapper;
    private final InstituicaoMapper instituicaoMapper;
    private final VinculoMapper vinculoMapper;
    private final FuncaoMapper funcaoMapper;
    private final Validator validator;

    public PessoaDTO create(PessoaDTO pessoaDTO){
        validatePessoa(pessoaDTO);

        Pessoa entity = mapper.toEntity(pessoaDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public ContextDataPessoaDTO getContextData(){
        ContextDataPessoaDTO contextDataPessoaDTO = new ContextDataPessoaDTO();
        List<Instituicao> instituicoes = instituicaoRepository.findAll();
        List<Vinculo> vinculos = vinculoRepository.findAll();
        List<Funcao> funcoes = funcaoRepository.findAll();

        // Mapeamento de entidades para DTOs
        List<InstituicaoDTO> instituicoesDTO = instituicoes.stream()
                .filter(Objects::nonNull)
                .map(instituicaoMapper::toDto)
                .collect(Collectors.toList());

        List<VinculoDTO> vinculosDTO = vinculos.stream()
                .filter(Objects::nonNull)
                .map(vinculoMapper::toDto)
                .collect(Collectors.toList());

        List<FuncaoDTO> funcoesDTO = funcoes.stream()
                .filter(Objects::nonNull)
                .map(funcaoMapper::toDto)
                .collect(Collectors.toList());

        contextDataPessoaDTO.setInstituicoes(instituicoesDTO);
        contextDataPessoaDTO.setVinculos(vinculosDTO);
        contextDataPessoaDTO.setFuncoes(funcoesDTO);

        return contextDataPessoaDTO;
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
