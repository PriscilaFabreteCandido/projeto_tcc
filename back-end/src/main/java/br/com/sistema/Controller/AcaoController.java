package br.com.sistema.Controller;

import br.com.sistema.DTO.Acao.AcaoContextDataDTO;
import br.com.sistema.DTO.Acao.AcaoDTO;
import br.com.sistema.Service.AcaoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "AcaoController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/acoes")
public class AcaoController {

    private final AcaoService acaoService;

    @PostMapping("/create")
    public ResponseEntity<AcaoDTO> createAcao(@RequestBody AcaoDTO acaoDTO) {
        return new ResponseEntity<>(acaoService.create(acaoDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AcaoDTO> updateAcao(@RequestBody AcaoDTO acaoDTO, @PathVariable Long id) {
        return new ResponseEntity<>(acaoService.update(acaoDTO, id), HttpStatus.OK);
    }

    @GetMapping("/contextData")
    public ResponseEntity<AcaoContextDataDTO> getContextData() {
        return new ResponseEntity<>(acaoService.getContextData(), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<AcaoDTO> deleteAcao(@PathVariable Long id) {
        acaoService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<AcaoDTO> findAcaoById(@PathVariable Long id) {
        return new ResponseEntity<>(acaoService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<AcaoDTO>> findAllAcoes() {
        List<AcaoDTO> acaoDTOList = acaoService.findAll();
        return new ResponseEntity<>(acaoDTOList, acaoDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }

}
