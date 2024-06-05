package br.com.sistema;



import br.com.sistema.Model.TipoAcao;
import br.com.sistema.Repository.TipoAcaoRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class DataInitializer {

    @Autowired
    private TipoAcaoRepository tipoAcaoRepository;

    @PostConstruct
    public void init() {
        if (tipoAcaoRepository.count() == 0) {
            TipoAcao curso = new TipoAcao();
            curso.setNome("Curso");
            tipoAcaoRepository.save(curso);

            TipoAcao projeto = new TipoAcao();
            projeto.setNome("Projeto");
            tipoAcaoRepository.save(projeto);

            TipoAcao visitaGuiada = new TipoAcao();
            visitaGuiada.setNome("Visita Guiada");
            tipoAcaoRepository.save(visitaGuiada);

            TipoAcao palestra = new TipoAcao();
            palestra.setNome("Palestra");
            tipoAcaoRepository.save(palestra);
        }
    }
}
