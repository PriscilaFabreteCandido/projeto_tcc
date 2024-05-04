package br.com.sistema.Controller;

import br.com.sistema.DTO.CursoDTO;
import br.com.sistema.DTO.FuncaoDTO;
import br.com.sistema.DTO.VinculoDTO;
import br.com.sistema.Service.CursoService;
import br.com.sistema.Service.FuncaoService;
import br.com.sistema.Service.VinculoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "VinculoController")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vinculos")
public class VinculoController {
    private final VinculoService vinculoService;

    @PostMapping("/create")
    public ResponseEntity<VinculoDTO> createVinculo(@RequestBody VinculoDTO vinculoDTO) {
        return new ResponseEntity<>(vinculoService.create(vinculoDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<VinculoDTO> updateVinculo(@RequestBody VinculoDTO vinculoDTO, @PathVariable Long id) {
        return new ResponseEntity<>(vinculoService.update(vinculoDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteVinculo(@PathVariable Long id) {
        vinculoService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VinculoDTO> findVinculoById(@PathVariable Long id) {
        return new ResponseEntity<>(vinculoService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<VinculoDTO>> findAllVinculos() {
        List<VinculoDTO> vinculoDTOList = vinculoService.findAll();
        return new ResponseEntity<>(vinculoDTOList, vinculoDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }
}