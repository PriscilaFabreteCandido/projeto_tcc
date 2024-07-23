package br.com.sistema.Service;

import br.com.sistema.DTO.Acao.AcaoContextDataDTO;
import br.com.sistema.DTO.Acao.AcaoDTO;

import br.com.sistema.DTO.Acao.AcaoPessoaDTO;
import br.com.sistema.DTO.InstituicaoDTO;
import br.com.sistema.DTO.PeriodoAcademicoDTO;
import br.com.sistema.DTO.Pessoa.PessoaDTO;
import br.com.sistema.DTO.TipoAcaoDTO;
import br.com.sistema.DTO.TurmaDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.AcaoMapper;
import br.com.sistema.Mapper.AcaoPessoaMapper;
import br.com.sistema.Model.Acao;
import br.com.sistema.Model.AcaoPessoa;
import br.com.sistema.Model.Documento;
import br.com.sistema.Model.Pessoa;
import br.com.sistema.Repository.AcaoPessoaRepository;
import br.com.sistema.Repository.AcaoRepository;
import br.com.sistema.Repository.DocumentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AcaoService {

    private final AcaoRepository repository;
    private final TipoAcaoService tipoAcaoService;

    private final AcaoMapper mapper;
    private final AcaoPessoaMapper acaoPessoaMapper;
    private final InstituicaoService instituicaoService;
    private final TurmaService turmaService;
    private final PeriodoAcademicoService periodoAcademicoService;
    private final PessoaService pessoaService;
    private final FuncaoService funcaoService;

    @Autowired
    private AcaoRepository acaoRepository;

    @Autowired
    private DocumentoRepository documentoRepository;
    @Autowired
    private AcaoPessoaRepository acaoPessoaRepository;

    List<AcaoPessoa> toAcaoPessoaEntityList(List<AcaoPessoaDTO> acaoPessoaDTOS){
        List<AcaoPessoa> acaoPessoas = new ArrayList<>();
        if(acaoPessoaDTOS != null){
            for (AcaoPessoaDTO acaoPessoaDTO : acaoPessoaDTOS) {
                AcaoPessoa entity = acaoPessoaMapper.toEntity(acaoPessoaDTO);
                acaoPessoas.add(entity);
            }
        }
        return acaoPessoas;
    }

    public AcaoDTO create(AcaoDTO acaoDTO){
        Acao entity = mapper.toEntity(acaoDTO);

        // Save Acao entity first
        Acao savedAcao = acaoRepository.save(entity);

        // Save each Documento entity and associate it with the saved Acao
        List<Documento> documentos = mapper.toDocumentoEntityList(acaoDTO.getDocumentos());
        for (Documento documento : documentos) {
            documento.setAcao(savedAcao);
            documentoRepository.save(documento);
        }

        // Save each AcaoPessoa entity and associate it with the saved Acao
        List<AcaoPessoa> acaoPessoas = toAcaoPessoaEntityList(acaoDTO.getAcaoPessoas());
        for (AcaoPessoa acaoPessoa : acaoPessoas) {
            acaoPessoa.setAcao(savedAcao);
            acaoPessoaRepository.save(acaoPessoa);
        }

        // Update the saved Acao with the saved documents
        savedAcao.setDocumentos(documentos);
        acaoRepository.save(savedAcao);
        return mapper.toDto(savedAcao);
    }

    public List<Acao> findByTipoAcaoNome(String tipoAcaoNome) {
        return acaoRepository.findByTipoAcaoNome(tipoAcaoNome);
    }

    public List<Acao> getProjetos() {
        return findByTipoAcaoNome("Projeto");
    }

    public List<Acao> getEventos() {
        return findByTipoAcaoNome("Evento");
    }


    public AcaoContextDataDTO getContextData() {
        AcaoContextDataDTO acaoContextDataDTO = new AcaoContextDataDTO();

        // Instituicao
        List<InstituicaoDTO> instituicaoDTOS = instituicaoService.findAll();
        acaoContextDataDTO.setInstituicoes(instituicaoDTOS);

        // Periodo
        List<PeriodoAcademicoDTO> periodoAcademicoDTOS = periodoAcademicoService.findAll();
        acaoContextDataDTO.setPeriodos(periodoAcademicoDTOS);

        // TipoAcoes
        List<TipoAcaoDTO> tipoAcoes = tipoAcaoService.findAll();
        acaoContextDataDTO.setTipoAcoes(tipoAcoes);

        // Projetos
        List<AcaoDTO> projetos = getProjetos().stream()
                        .filter(Objects::nonNull)
                        .map(mapper::toDto)
                        .collect(Collectors.toList());


        acaoContextDataDTO.setProjetos(projetos);

        // Eventos
        List<AcaoDTO> eventos = getEventos().stream()
                .filter(Objects::nonNull)
                .map(mapper::toDto)
                .collect(Collectors.toList());

        acaoContextDataDTO.setEventos(eventos);

        // Funcoes
        acaoContextDataDTO.setFuncoes(funcaoService.findAll());

        // Participantes
        acaoContextDataDTO.setPessoas(pessoaService.findAll().stream().filter(PessoaDTO::isAtivo)
                .collect(Collectors.toList()));

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
