import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getTransacciones, addTransaccion } from '../app/jsonapi'

export const useTransaccionesStore = defineStore('transacciones', () => {
    const transacciones = ref<any[]>([])

    async function cargar() {
        transacciones.value = await getTransacciones()
    }

    async function agregar(transaccion: any) {
        // Asegura que los campos sean correctos antes de enviar
        const nueva = await addTransaccion({
            fecha: transaccion.fecha,
            tipo: transaccion.tipo,
            categoria: transaccion.categoria,
            descripcion: transaccion.descripcion,
            importe: Number(transaccion.importe)
        })
        transacciones.value.unshift(nueva)
    }

    return {
        transacciones,
        cargar,
        agregar,
    }
})
