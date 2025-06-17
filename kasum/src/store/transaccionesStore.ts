import { defineStore } from 'pinia'

interface MovimientoBackend {
    tipo: string;
    descripcion: string;
    monto: number;
    fecha: string;
    categoria: string;
}

export const useTransaccionesStore = defineStore('transacciones', {
    state: () => ({
        transacciones: [] as MovimientoBackend[]
    }),
    actions: {
        async agregar(movimiento: MovimientoBackend) {
            const response = await fetch('http://localhost:8080/kubera/movimientos/nuevo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movimiento)
            });
            
            if (!response.ok) {
                throw new Error('Error al guardar la transacción');
            }
            
            const nuevaTransaccion = await response.json();
            this.transacciones.unshift(nuevaTransaccion);
            return nuevaTransaccion;
        },
        async cargar() {
            const response = await fetch('http://localhost:8080/kubera/movimientos/');
            if (!response.ok) {
                throw new Error('Error al cargar las transacciones');
            }
            this.transacciones = await response.json();
        }
    }
});