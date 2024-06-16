package br.com.sistema.Repository;

import br.com.sistema.Model.Acao;
import br.com.sistema.Model.Instituicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcaoRepository extends JpaRepository<Acao, Long> {
    @Query("SELECT a FROM Acao a WHERE a.tipoAcao.nome = :tipoAcaoNome")
    List<Acao> findByTipoAcaoNome(@Param("tipoAcaoNome") String tipoAcaoNome);
}