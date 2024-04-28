package br.com.sistema.Repository;

import br.com.sistema.Model.TipoAcao;
import br.com.sistema.Model.TipoInstituicao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TipoInstituicaoRepository extends JpaRepository<TipoInstituicao, Long> {
}
