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
            tipo: transaccion.tipo,
            descripcion: transaccion.descripcion,
            importe: Number(transaccion.importe),
            fecha: transaccion.fecha,
            categoria: transaccion.categoria,
        })
        transacciones.value.unshift(nueva)
    }

    return {
        transacciones,
        cargar,
        agregar,
    }
})
