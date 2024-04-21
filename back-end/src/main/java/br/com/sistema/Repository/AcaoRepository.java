package br.com.sistema.Repository;

import br.com.sistema.Model.Acao;
import br.com.sistema.Model.Instituicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcaoRepository extends JpaRepository<Acao, Long> {
}