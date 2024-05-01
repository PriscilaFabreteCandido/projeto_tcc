package br.com.sistema.Controller;

import br.com.sistema.DTO.TipoAcaoDTO;
import br.com.sistema.DTO.TipoAcaoDTO;
import br.com.sistema.Service.TipoAcaoService;
import br.com.sistema.Service.TipoAcaoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "TipoAcaoController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tipoAcoes")
public class TipoAcaoController {

    private final TipoAcaoService tipoAcaoService;

    @PostMapping("/create")
    public ResponseEntity<TipoAcaoDTO> createTipoAcao(@RequestBody TipoAcaoDTO tipoAcaoDTO) {
        return new ResponseEntity<>(tipoAcaoService.create(tipoAcaoDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TipoAcaoDTO> updateTipoAcao(@RequestBody TipoAcaoDTO tipoAcaoDTO, @PathVariable Long id) {
        return new ResponseEntity<>(tipoAcaoService.update(tipoAcaoDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<TipoAcaoDTO> deleteTipoAcao(@PathVariable Long id) {
        tipoAcaoService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<TipoAcaoDTO> findTipoAcaoById(@PathVariable Long id) {
        return new ResponseEntity<>(tipoAcaoService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<TipoAcaoDTO>> findAllTiposAcoes() {
        List<TipoAcaoDTO> tipoAcaoDTOList = tipoAcaoService.findAll();
        return new ResponseEntity<>(tipoAcaoDTOList, tipoAcaoDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }

}
