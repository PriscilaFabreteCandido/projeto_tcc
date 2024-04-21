package br.com.sistema.Controller;

import br.com.sistema.DTO.FuncaoDTO;
import br.com.sistema.DTO.FuncaoDTO;
import br.com.sistema.Service.FuncaoService;
import br.com.sistema.Service.FuncaoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "FuncaoController")

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/funcoes")
public class FuncaoController {

    private final FuncaoService funcaoService;

    @PostMapping("/create")
    public ResponseEntity<FuncaoDTO> createFuncao(@RequestBody FuncaoDTO funcaoDTO) {
        return new ResponseEntity<>(funcaoService.create(funcaoDTO), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<FuncaoDTO> updateFuncao(@RequestBody FuncaoDTO funcaoDTO, @PathVariable Long id) {
        return new ResponseEntity<>(funcaoService.update(funcaoDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<FuncaoDTO> deleteFuncao(@PathVariable Long id) {
        funcaoService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=============================================================================================

    @GetMapping("/{id}")
    public ResponseEntity<FuncaoDTO> findFuncaoById(@PathVariable Long id) {
        return new ResponseEntity<>(funcaoService.findById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<FuncaoDTO>> findAllFuncoes() {
        List<FuncaoDTO> funcaoDTOList = funcaoService.findAll();
        return new ResponseEntity<>(funcaoDTOList, funcaoDTOList.isEmpty() ? HttpStatus.NO_CONTENT : HttpStatus.OK);
    }

}
