package kasum.backend.allenFeli.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import kasum.backend.allenFeli.domain.model.Movimiento;


public interface MovimientoRepository extends JpaRepository<Movimiento, Long> {
    
}
