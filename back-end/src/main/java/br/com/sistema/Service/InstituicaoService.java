package br.com.sistema.Service;

import br.com.sistema.DTO.Instituicao.InstituicaoFilterDTO;
import br.com.sistema.DTO.InstituicaoDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.InstituicaoMapper;
import br.com.sistema.Model.Instituicao;
import br.com.sistema.Model.TipoInstituicao;
import br.com.sistema.Repository.InstituicaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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

    public List<InstituicaoDTO> filter(InstituicaoFilterDTO filterDTO) {
        List<Instituicao> instituicoes = repository.findByFilters(
                filterDTO.getNome(),
                filterDTO.getTipoInstituicao()
        );

        return instituicoes.stream()
                .filter(Objects::nonNull)
                .map(mapper::toDto)
                .collect(Collectors.toList());
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
