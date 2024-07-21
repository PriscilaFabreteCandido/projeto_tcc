package br.com.sistema.Repository;

import br.com.sistema.Model.Documento;
import br.com.sistema.Model.Funcao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentoRepository extends JpaRepository<Documento, Long> {
}
