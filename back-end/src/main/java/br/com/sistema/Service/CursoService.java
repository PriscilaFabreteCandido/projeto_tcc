package br.com.sistema.Service;

import br.com.sistema.DTO.AcaoDTO;
import br.com.sistema.DTO.CursoDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.AcaoMapper;
import br.com.sistema.Mapper.CursoMapper;
import br.com.sistema.Model.Acao;
import br.com.sistema.Model.Curso;
import br.com.sistema.Repository.AcaoRepository;
import br.com.sistema.Repository.CursoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CursoService {

    private final CursoRepository repository;
    private final CursoMapper mapper;


    public CursoDTO create(CursoDTO cursoDTO){

        Curso entity = mapper.toEntity(cursoDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public CursoDTO update(CursoDTO cursoDTO, Long id){

        findById(id);

        Curso entity = mapper.toEntity(cursoDTO);
        entity.setId(id);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Curso entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Curso com ID '" + id + "' não encontrado."));

        repository.delete(entity);
    }

    public CursoDTO findById(Long id){
        Curso entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Curso com id '" + id + "' não encontrado."));

        return mapper.toDto(entity);
    }

    public List<CursoDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }


}
