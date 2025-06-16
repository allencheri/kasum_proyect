package kasum.backend.allenFeli.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kasum.backend.allenFeli.domain.model.Movimiento;
import kasum.backend.allenFeli.repository.MovimientoRepository;

@Service
public class MovimientoService {
    
    @Autowired
    MovimientoRepository movimientoRepository;

    public List<Movimiento> obtenerTodosMovimientos(){
        return movimientoRepository.findAll();
    }

    public Movimiento obtenerMovimientoPorId(Long id)throws RuntimeException{
        return movimientoRepository.findById(id).orElseThrow(()-> new RuntimeException("Movimiento no encontrado"));
    }

    public void grabarMovimineto(Movimiento movimiento){
        movimientoRepository.save(movimiento);
    }

    public Movimiento actualizarMovimiento(Movimiento movimiento) throws RuntimeException{
        obtenerMovimientoPorId(movimiento.getId());
        return movimientoRepository.save(movimiento);
    }

    public void eliminarMovimiento(Long id) throws RuntimeException{
        obtenerMovimientoPorId(id);
        movimientoRepository.deleteById(id);
    }
}
