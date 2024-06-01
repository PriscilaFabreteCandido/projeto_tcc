package br.com.sistema.Controller;

import br.com.sistema.DTO.ProjetoDTO;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "ProjetoController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/projetos")
public class ProjetoController {

    private final ProjetoService projetoService;

    @PostMapping("/create")
    public ResponseEntity<ProjetoDTO> createProjeto(@RequestBody ProjetoDTO projetoDTO) {
        return new ResponseEntity<>(projetoService.create(projetoDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProjetoDTO> updateProjeto(@RequestBody ProjetoDTO projetoDTO, @PathVariable Long id) {
        return new ResponseEntity<>(projetoService.update(projetoDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ProjetoDTO> deleteProjeto(@PathVariable Long id) {
        projetoService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<ProjetoDTO> findProjetoById(@PathVariable Long id) {
        return new ResponseEntity<>(projetoService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ProjetoDTO>> findAllProjetos() {
        List<ProjetoDTO> projetoDTOList = projetoService.findAll();
        return new ResponseEntity<>(projetoDTOList, projetoDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }

}
