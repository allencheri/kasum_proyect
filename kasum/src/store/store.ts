import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as null | {
            id: string
            nombre: string
            email: string
        },
        isLoggedIn: false,
    }),
    actions: {
        setUser(user: any) {
            this.user = user
            this.isLoggedIn = true
        },
        logout() {
            this.user = null
            this.isLoggedIn = false
        }
    }
})
