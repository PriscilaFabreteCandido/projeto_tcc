package br.com.sistema.Repository;

import br.com.sistema.Model.Funcao;
import br.com.sistema.Model.Instituicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstituicaoRepository extends JpaRepository<Instituicao, Long> {
    @Query("SELECT i FROM Instituicao i WHERE " +
            "(:nome IS NULL OR LOWER(i.nome) LIKE LOWER(CONCAT('%', :nome, '%'))) AND " +
            "(:tipoInstituicao IS NULL OR i.tipoInstituicao = :tipoInstituicao)")
    List<Instituicao> findByFilters(@Param("nome") String nome,
                                    @Param("tipoInstituicao") String tipoInstituicao);
}
