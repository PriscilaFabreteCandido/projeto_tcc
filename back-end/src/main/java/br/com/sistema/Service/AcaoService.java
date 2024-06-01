package br.com.sistema.Service;

import br.com.sistema.DTO.Acao.AcaoContextDataDTO;
import br.com.sistema.DTO.Acao.AcaoDTO;

import br.com.sistema.DTO.InstituicaoDTO;
import br.com.sistema.DTO.PeriodoAcademicoDTO;
import br.com.sistema.DTO.TipoAcaoDTO;
import br.com.sistema.DTO.TurmaDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.AcaoMapper;
import br.com.sistema.Model.Acao;
import br.com.sistema.Repository.AcaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AcaoService {

    private final AcaoRepository repository;
    private final TipoAcaoService tipoAcaoService;

    private final AcaoMapper mapper;
    private final InstituicaoService instituicaoService;
    private final TurmaService turmaService;
    private final PeriodoAcademicoService periodoAcademicoService;


    public AcaoDTO create(AcaoDTO acaoDTO){

        Acao entity = mapper.toEntity(acaoDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public List<AcaoDTO> getProjetos(){

        return new ArrayList<>();
    }

    public List<AcaoDTO> getEventos(){

        return new ArrayList<>();
    }
    public AcaoContextDataDTO getContextData() {
        AcaoContextDataDTO acaoContextDataDTO = new AcaoContextDataDTO();
        //instituicao
        List<InstituicaoDTO> instituicaoDTOS = instituicaoService.findAll();
        acaoContextDataDTO.setInstituicoes(instituicaoDTOS);
        //periodo
        List<PeriodoAcademicoDTO> periodoAcademicoDTOS = periodoAcademicoService.findAll();
        acaoContextDataDTO.setPeriodos(periodoAcademicoDTOS);
        //tipoAcoes
        List<TipoAcaoDTO> tipoAcoes = tipoAcaoService.findAll();
        acaoContextDataDTO.setTipoAcoes(tipoAcoes);

        List<AcaoDTO> projetos = getProjetos();
        List<AcaoDTO> eventos = getEventos();


        return acaoContextDataDTO;
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
