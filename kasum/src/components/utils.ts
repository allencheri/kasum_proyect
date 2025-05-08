import { ref } from 'vue'

type Movimiento = {
    fecha: string;
    descripcion: string;
    referencia: string;
    tipo: string;
    monto: number;
    saldo: number;
}

type Categorias = {
    Ingresos: number;
    Gastos: number;
    Transferencias: number;
}

const categorias = ref<Categorias>({
    Ingresos: 0,
    Gastos: 0,
    Transferencias: 0,
})

const getCategorias = async () => {
    try {

        const response = await fetch('https://681d0676f74de1d219ae9377.mockapi.io/movimientos')
        const data = await response.json()

        const movimientos: Movimiento[] = data[0].extracto_bancario.movimientos

        const categoriasTemp: Categorias = {
            Ingresos: 0,
            Gastos: 0,
            Transferencias: 0,
        }

        movimientos.forEach((movimiento) => {
            if (movimiento.tipo === 'Ingreso') {
                categoriasTemp.Ingresos += movimiento.monto
            } else if (movimiento.tipo === 'Gasto') {
                categoriasTemp.Gastos += movimiento.monto
            } else if (movimiento.tipo === 'Transferencia') {
                categoriasTemp.Transferencias += movimiento.monto
            }
        })

        categorias.value = categoriasTemp
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error)
    }
}

export { categorias, getCategorias }