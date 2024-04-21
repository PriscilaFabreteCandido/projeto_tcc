package br.com.sistema.Repository;

import br.com.sistema.Model.Projeto;
import br.com.sistema.Model.TipoAcao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoAcaoRepository extends JpaRepository<TipoAcao, Long> {
}
