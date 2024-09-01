package br.com.sistema.Service;

import br.com.sistema.DTO.*;
import br.com.sistema.DTO.Acao.*;

import br.com.sistema.DTO.Pessoa.PessoaDTO;
import br.com.sistema.Exception.EntityNotFoundException;
import br.com.sistema.Mapper.AcaoMapper;
import br.com.sistema.Mapper.AcaoPessoaMapper;
import br.com.sistema.Model.*;
import br.com.sistema.Repository.AcaoPessoaRepository;
import br.com.sistema.Repository.AcaoRepository;
import br.com.sistema.Repository.DocumentoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
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
                AcaoPessoa entity = new AcaoPessoa();
                Pessoa pessoa = new Pessoa(); pessoa.setId(acaoPessoaDTO.getPessoa().getId());
                entity.setPessoa(pessoa);
                Funcao funcao = new Funcao(); funcao.setId(acaoPessoaDTO.getFuncao().getId());
                entity.setFuncao(funcao);
                acaoPessoas.add(entity);
            }
        }
        return acaoPessoas;
    }

    public AcaoDTO create(AcaoDTO acaoDTO){
        Acao entity = mapper.toEntity(acaoDTO);
       if(acaoDTO.getHorarioInicio() != null){
           entity.setHorarioTermino(acaoDTO.getHorarioTermino());
           entity.setHorarioInicio(acaoDTO.getHorarioInicio());
       }
        entity.setDocumentos(null);
        entity.setAcaoPessoas(null);
        // Save Acao entity first
        Acao savedAcao = acaoRepository.save(entity);

        // Save each Documento entity and associate it with the saved Acao
        List<Documento> documentos = mapper.toDocumentoEntityList(acaoDTO.getDocumentos());
        for (Documento documento : documentos) {
            documento.setAcao(savedAcao);
            documentoRepository.save(documento);
        }

        List<AcaoPessoa> acaoPessoas = toAcaoPessoaEntityList(acaoDTO.getAcaoPessoas());
        for (AcaoPessoa acaoPessoa : acaoPessoas) {
            acaoPessoa.setAcao(savedAcao);
            acaoPessoaRepository.save(acaoPessoa);
        }

        // Update the saved Acao with the saved documents
        savedAcao.setDocumentos(documentos);
        savedAcao.setAcaoPessoas(acaoPessoas);
        acaoRepository.save(savedAcao);
        return acaoDTO;
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
                        .map(acao -> {
                            AcaoDTO dto = new AcaoDTO();
                            dto.setId(acao.getId());
                            dto.setNome(acao.getNome());
                            return dto;
                        })
                        .collect(Collectors.toList());


        acaoContextDataDTO.setProjetos(projetos);

        // Eventos
        List<AcaoDTO> eventos = getEventos().stream()
                .filter(Objects::nonNull)
                .map(acao -> {
                    AcaoDTO dto = new AcaoDTO();
                    dto.setId(acao.getId());
                    dto.setNome(acao.getNome());
                    return dto;
                })
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

        Acao entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ação com id '" + id + "' não encontrado."));

        Acao acao = dtoToEntity(acaoDTO);
        repository.save(entity);

        return mapper.toDto(entity);
    }

    public void delete(Long id) {
        Acao entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ação com ID '" + id + "' não encontrado."));

        repository.delete(entity);
    }

    public Acao dtoToEntity(AcaoDTO dto) {
        Acao acao = new Acao();
        acao.setId(dto.getId());
        acao.setNome(dto.getNome());
        acao.setPublicoAlvo(dto.getPublicoAlvo());

        if (dto.getPeriodo() != null) {
            PeriodoAcademico periodo = new PeriodoAcademico();
            periodo.setId(dto.getPeriodo().getId());
            acao.setPeriodo(periodo);
        }

        acao.setDtInicio(dto.getDtInicio());
        acao.setDtTermino(dto.getDtTermino());

        if (dto.getInstituicaoAtendida() != null) {
            Instituicao instituicao = new Instituicao();
            instituicao.setId(dto.getInstituicaoAtendida().getId());
            instituicao.setNome(dto.getInstituicaoAtendida().getNome());
            acao.setInstituicaoAtendida(instituicao);
        }

        acao.setTurma(dto.getTurma());
        acao.setModalidade(dto.getModalidade());
        acao.setHorarioInicio(dto.getHorarioInicio());
        acao.setHorarioTermino(dto.getHorarioTermino());
        acao.setQtdParticipantes(dto.getQtdParticipantes());
        acao.setQtdVagas(dto.getQtdVagas());
        acao.setNumeroProcesso(dto.getNumeroProcesso());

        if (dto.getTipoAcao() != null) {
            TipoAcao tipoAcao = new TipoAcao();
            tipoAcao.setId(dto.getTipoAcao().getId());
            tipoAcao.setNome(dto.getTipoAcao().getNome());
            acao.setTipoAcao(tipoAcao);
        }

        if (dto.getProjeto() != null) {
            Acao projeto = new Acao();
            projeto.setId(dto.getProjeto().getId());
            acao.setProjeto(projeto);
        }

        if (dto.getEvento() != null) {
            Acao evento = new Acao();
            evento.setId(dto.getEvento().getId());
            acao.setEvento(evento);
        }

        acao.setCep(dto.getCep());
        acao.setEndereco(dto.getEndereco());
        acao.setRua(dto.getRua());
        acao.setUf(dto.getUf());
        acao.setCidade(dto.getCidade());
        acao.setNumero(dto.getNumero());

        List<Documento> documentos = new ArrayList<>();
        if (dto.getDocumentos() != null && dto.getDocumentos().size() > 0) {
            dto.getDocumentos().forEach(documentoDTO -> {
                Documento documento = new Documento();
                documento.setNome(documentoDTO.getNome());
                documento.setConteudo(documentoDTO.getConteudo());
                documento.setTipo(documentoDTO.getTipo());
                documento.setId(documentoDTO.getId());
                documentos.add(documento);
            });
        }

        List<AcaoPessoa> acaoPessoas = new ArrayList<>();
        if (dto.getAcaoPessoas() != null && dto.getAcaoPessoas().size() > 0) {
            dto.getAcaoPessoas().forEach(acaoPessoaDTO -> {
                AcaoPessoa acaoPessoa = new AcaoPessoa();
                if (acaoPessoaDTO.getAcao() != null) {
                    Acao acaoEntity = new Acao();
                    acaoEntity.setId(acaoPessoaDTO.getAcao().getId());
                    acaoPessoa.setAcao(acaoEntity);
                }

                if (acaoPessoaDTO.getFuncao() != null) {
                    Funcao funcao = new Funcao();
                    funcao.setId(acaoPessoaDTO.getFuncao().getId());
                    funcao.setNome(acaoPessoaDTO.getFuncao().getNome());
                    acaoPessoa.setFuncao(funcao);
                }

                if (acaoPessoaDTO.getPessoa() != null) {
                    Pessoa pessoa = new Pessoa();
                    pessoa.setId(acaoPessoaDTO.getPessoa().getId());
                    pessoa.setNome(acaoPessoaDTO.getPessoa().getNome());
                    acaoPessoa.setPessoa(pessoa);
                }

                acaoPessoas.add(acaoPessoa);
            });
        }

        acao.setDocumentos(documentos);
        acao.setAcaoPessoas(acaoPessoas);

        return acao;
    }


    //=============================================================================================
    public AcaoDTO entityToDto(Acao acao) {
        AcaoDTO dto = new AcaoDTO();
        dto.setId(acao.getId());
        dto.setNome(acao.getNome());
        dto.setPublicoAlvo(acao.getPublicoAlvo());
        if(acao.getPeriodo() != null){
            PeriodoAcademicoDTO periodoAcademicoDTO = new PeriodoAcademicoDTO();
            periodoAcademicoDTO.setId(acao.getPeriodo().getId());
            dto.setPeriodo(periodoAcademicoDTO);
        }
        dto.setDtInicio(acao.getDtInicio());
        dto.setDtTermino(acao.getDtTermino());
        InstituicaoDTO instituicaoDTO = new InstituicaoDTO();
        instituicaoDTO.setId(acao.getInstituicaoAtendida().getId());
        instituicaoDTO.setNome(acao.getInstituicaoAtendida().getNome());
        dto.setInstituicaoAtendida(instituicaoDTO);
        dto.setTurma(acao.getTurma());
        dto.setModalidade(acao.getModalidade());
        dto.setHorarioInicio(acao.getHorarioInicio());
        dto.setHorarioTermino(acao.getHorarioTermino());
        dto.setQtdParticipantes(acao.getQtdParticipantes());
        dto.setQtdVagas(acao.getQtdVagas());
        dto.setNumeroProcesso(acao.getNumeroProcesso());
        TipoAcaoDTO tipoAcaoDTO = new TipoAcaoDTO();
        tipoAcaoDTO.setId(acao.getTipoAcao().getId());
        tipoAcaoDTO.setNome(acao.getTipoAcao().getNome());
        dto.setTipoAcao(tipoAcaoDTO);

        if(acao.getProjeto() != null ){
            AcaoDTO acaoDTO = new AcaoDTO();
            acaoDTO.setId(acao.getProjeto().getId());
            dto.setProjeto(acaoDTO);
        }
        if(acao.getEvento() != null ){
            AcaoDTO acaoDTO = new AcaoDTO();
            acaoDTO.setId(acao.getEvento().getId());
            dto.setEvento(acaoDTO);
        }

        dto.setCep(acao.getCep());
        dto.setEndereco(acao.getEndereco());
        dto.setRua(acao.getRua());
        dto.setUf(acao.getUf());
        dto.setCidade(acao.getCidade());
        dto.setNumero(acao.getNumero());

        List<DocumentoDTO> documentoDTOS = new ArrayList<>();
        if(acao.getDocumentos() != null && acao.getDocumentos().size() > 0){
            acao.getDocumentos().forEach(x -> {
                DocumentoDTO documentoDTO = new DocumentoDTO();
                documentoDTO.setNome(x.getNome());
                documentoDTO.setConteudo(x.getConteudo());
                documentoDTO.setTipo(x.getTipo());
                documentoDTO.setId(x.getId());
                documentoDTOS.add(documentoDTO);
            });
        }
        List<AcaoPessoaDTO> acoesPessoas = new ArrayList<>();
        if(acao.getAcaoPessoas() != null && acao.getAcaoPessoas().size() > 0){
                acao.getAcaoPessoas().forEach(x -> {
                AcaoPessoaDTO acaoPessoaDTO = new AcaoPessoaDTO();
                AcaoDTO acaoDTO = new AcaoDTO(); acaoDTO.setId(acao.getId());
                acaoPessoaDTO.setAcao(acaoDTO);
                FuncaoDTO funcaoDTO = new FuncaoDTO();
                funcaoDTO.setId(x.getFuncao() != null ? x.getFuncao().getId() : null);
                funcaoDTO.setNome(x.getFuncao() != null ? x.getFuncao().getNome() : null);
                acaoPessoaDTO.setFuncao(funcaoDTO);
                PessoaDTO pessoaDTO = new PessoaDTO();
                pessoaDTO.setId(x.getPessoa() != null ? x.getPessoa().getId() : null);
                pessoaDTO.setNome(x.getPessoa() != null ? x.getPessoa().getNome() : null);
                acaoPessoaDTO.setPessoa(pessoaDTO);
                acoesPessoas.add(acaoPessoaDTO);
            });
        }
        dto.setDocumentos(documentoDTOS);
        dto.setAcaoPessoas(acoesPessoas);

        return dto;
    }

    @Transactional
    public AcaoDTO findById(Long id){
        Acao entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ação com id '" + id + "' não encontrado."));
        System.out.println("VEIOOOOOOO AQUIIIII");

        return entityToDto(entity);
    }

    public List<AcaoDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }

    @Transactional
    public List<AcaoResultRelatorioDTO> getRelatorios(AcaoFilterDTO acaoFilterDTO) {
        List<Acao> acoes = acaoRepository.findAcoesByCriteria(acaoFilterDTO.getAno() , acaoFilterDTO.getIdTipoAcao(), acaoFilterDTO.getIdProjeto());
        List<AcaoResultRelatorioDTO> acaoResult = new ArrayList<>();

        if (acoes != null && !acoes.isEmpty()) {
            // Primeira etapa: Filtrar as ações com base nos critérios fornecidos
            List<Acao> filteredAcoes = acoes.stream()
                    .filter(x -> (acaoFilterDTO.getIdTipoAcao() == null || x.getTipoAcao().getId().equals(acaoFilterDTO.getIdTipoAcao())) &&
                            (acaoFilterDTO.getIdProjeto() == null || (x.getProjeto() != null && x.getProjeto().getId().equals(acaoFilterDTO.getIdProjeto()))) &&
                            (acaoFilterDTO.getIdEvento() == null || (x.getEvento() != null && x.getEvento().getId().equals(acaoFilterDTO.getIdEvento()))) &&
                            (acaoFilterDTO.getDtInicio() == null || (x.getDtInicio() != null && !x.getDtInicio().before(acaoFilterDTO.getDtInicio()))) &&
                            (acaoFilterDTO.getDtTermino() == null || (x.getDtTermino() != null && !x.getDtTermino().after(acaoFilterDTO.getDtTermino()))))
                    .collect(Collectors.toList());

            if (acaoFilterDTO.getPessoas() != null && !acaoFilterDTO.getPessoas().isEmpty()) {
                List<Long> pessoaIds = acaoFilterDTO.getPessoas().stream()
                        .map(PessoaDTO::getId)
                        .collect(Collectors.toList());

                filteredAcoes = filteredAcoes.stream()
                        .filter(x -> x.getAcaoPessoas().stream()
                                .anyMatch(p -> pessoaIds.contains(p.getPessoa().getId())))
                        .collect(Collectors.toList());

                // Segunda etapa: Adicionar ações com projetos associados às ações filtradas
                Set<Long> projetoIds = filteredAcoes.stream()
                        .filter(x -> x.getProjeto() != null)
                        .map(x -> x.getProjeto().getId())
                        .collect(Collectors.toSet());

                List<Acao> acoesAdd = acoes.stream()
                        .filter(x -> projetoIds.contains(x.getId()))
                        .collect(Collectors.toList());

                // Adicionar as ações encontradas na segunda etapa à lista final
                filteredAcoes.addAll(acoesAdd);
            }

            // Remover duplicatas, se necessário
            filteredAcoes = filteredAcoes.stream()
                    .distinct()
                    .collect(Collectors.toList());

            filteredAcoes.forEach(x -> {
                AcaoResultRelatorioDTO result = new AcaoResultRelatorioDTO();
                result.setId(x.getId());
                int year;
                if (x.getDtInicio() != null) {
                    // Converter java.sql.Date para java.util.Date
                    java.util.Date utilDate = new java.util.Date(x.getDtInicio().getTime());

                    // Converter java.util.Date para LocalDate
                    LocalDate dtInicioLocalDate = utilDate.toInstant()
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate();

                    // Obter o ano
                    year = dtInicioLocalDate.getYear();
                } else {
                    year = 0;
                }
                result.setAno(year);
                result.setDescricao(x.getNome());
                result.setTipoAcao(x.getTipoAcao().getNome());
                result.setEventoId(x.getEvento() != null ? x.getEvento().getId() : null);
                result.setProjetoId(x.getProjeto() != null ? x.getProjeto().getId() : null);
                result.setNomeAcao(x.getNome());
                result.setInstituicaoAtendida(x.getInstituicaoAtendida() != null  ? x.getInstituicaoAtendida().getNome() : null);
                result.setVinculacao(x.getProjeto() != null ? x.getProjeto().getNome() : "Leter");
                result.setDtInicio(x.getDtInicio());
                result.setDtFim(x.getDtTermino());
                result.setNomeProcesso(x.getNumeroProcesso());
                result.setQtdParticipantes(x.getQtdParticipantes());
                acaoResult.add(result);
            });
        }

        return acaoResult;
    }



}
