package br.com.sistema.Service;

import br.com.sistema.DTO.CursoDTO;
import br.com.sistema.DTO.FuncaoDTO;
import br.com.sistema.DTO.InstituicaoDTO;
import br.com.sistema.DTO.Pessoa.ContextDataPessoaDTO;
import br.com.sistema.DTO.Pessoa.PessoaDTO;
import br.com.sistema.DTO.Pessoa.PessoaFilterDTO;
import br.com.sistema.DTO.VinculoDTO;
import br.com.sistema.Exception.BusinessException;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.*;
import br.com.sistema.Model.*;
import br.com.sistema.Repository.*;
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
    private final CursoRepository cursoRepository;

    private final FuncaoRepository funcaoRepository;
    private final PessoaMapper mapper;
    private final InstituicaoMapper instituicaoMapper;
    private final VinculoMapper vinculoMapper;
    private final CursoMapper cursoMapper;
    private final FuncaoMapper funcaoMapper;
    private final Validator validator;

    public PessoaDTO create(PessoaDTO pessoaDTO){
        validatePessoa(pessoaDTO);

        Pessoa entity = mapper.toEntity(pessoaDTO);
        entity = repository.save(entity);

        return mapper.toDto(entity);
    }

    public List<PessoaDTO> filter(PessoaFilterDTO filterDTO) {
        return repository.findAll().stream()
                .filter(pessoa -> (filterDTO.getNome() == null || pessoa.getNome().contains(filterDTO.getNome())) &&
                        (filterDTO.getCpf() == null || pessoa.getCpf().contains(filterDTO.getCpf())) &&
                        (filterDTO.getMatricula() == null || pessoa.getMatricula().contains(filterDTO.getMatricula())))
                .filter(Objects::nonNull)
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    public ContextDataPessoaDTO getContextData(){
        ContextDataPessoaDTO contextDataPessoaDTO = new ContextDataPessoaDTO();
        System.out.println("VEIOOOOOOO         List<Instituicao> instituicoes = instituicaoRepository.findAll();\n");

        List<Instituicao> instituicoes = instituicaoRepository.findAll();

        System.out.println("DEPOSSSS\n");
        List<Funcao> funcoes = funcaoRepository.findAll();
        List<Curso> cursos = cursoRepository.findAll();

        // Mapeamento de entidades para DTOs
        List<InstituicaoDTO> instituicoesDTO = instituicoes.stream()
                .filter(Objects::nonNull)
                .map(instituicaoMapper::toDto)
                .collect(Collectors.toList());

        List<FuncaoDTO> funcoesDTO = funcoes.stream()
                .filter(Objects::nonNull)
                .map(funcaoMapper::toDto)
                .collect(Collectors.toList());

        List<CursoDTO> cursosDTO = cursos.stream()
                .filter(Objects::nonNull)
                .map(cursoMapper::toDto)
                .collect(Collectors.toList());

        contextDataPessoaDTO.setInstituicoes(instituicoesDTO);
        contextDataPessoaDTO.setFuncoes(funcoesDTO);
        contextDataPessoaDTO.setCursos(cursosDTO);

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
