package kasum.backend.allenFeli.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import kasum.backend.allenFeli.domain.model.Movimiento;
import kasum.backend.allenFeli.service.MovimientoService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/kubera/movimientos")
public class MovimientoController {

    @Autowired
    private MovimientoService movimientoService;

    @GetMapping("/")
    public ResponseEntity<?> obtenerTodos() {
        return ResponseEntity.ok(movimientoService.obtenerTodosMovimientos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerMovimientoPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(movimientoService.obtenerMovimientoPorId(id));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping("/nuevo")
    public ResponseEntity<?> nuevoMovimiento(@RequestBody Movimiento nuevoMovimiento) {
        System.out.println(nuevoMovimiento);
        if (nuevoMovimiento.getFecha() == null) {
            nuevoMovimiento.setFecha(LocalDateTime.now());
        }
        movimientoService.grabarMovimineto(nuevoMovimiento);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoMovimiento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarMovimiento(@PathVariable Long id, @RequestBody Movimiento movimientoModificado) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(movimientoService.actualizarMovimiento(movimientoModificado));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());

        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarMovimiento(@PathVariable Long id) {
        try {
            movimientoService.eliminarMovimiento(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());

        }
    }
}
