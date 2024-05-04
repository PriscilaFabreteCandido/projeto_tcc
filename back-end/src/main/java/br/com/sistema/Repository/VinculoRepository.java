package br.com.sistema.Repository;

import br.com.sistema.Model.Instituicao;
import br.com.sistema.Model.TipoInstituicao;
import br.com.sistema.Model.Vinculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface VinculoRepository extends JpaRepository<Vinculo, Long> {
}


