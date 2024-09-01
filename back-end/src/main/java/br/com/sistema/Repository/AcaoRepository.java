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

    @Query("SELECT a FROM Acao a " +
            "LEFT JOIN FETCH a.evento e " +
            "LEFT JOIN FETCH a.projeto p " +
            "LEFT JOIN FETCH a.acaoPessoas ap " +
            "LEFT JOIN FETCH ap.pessoa pe " +
            "LEFT JOIN FETCH a.tipoAcao t " +
            "WHERE (:ano IS NULL OR (COALESCE(:ano, YEAR(a.dtInicio)) = YEAR(a.dtInicio))) " +
            "AND (:idTipoAcao IS NULL OR t.id = :idTipoAcao) " +
            "AND (:idProjeto IS NULL OR p.id = :idProjeto)")
    List<Acao> findAcoesByCriteria(@Param("ano") Long ano,
                                   @Param("idTipoAcao") Long idTipoAcao,
                                   @Param("idProjeto") Long idProjeto);


}