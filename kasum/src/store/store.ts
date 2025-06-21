import { defineStore } from 'pinia'
import { deleteUser, updateUser } from '../app/api';

interface Jar {
    id: string;
    name: string;
    saved: number;
    goal: number;
}

interface User {
    id: string;
    nombre: string;
    email: string;
    apellido?: string;
    fechaRegistro?: Date;
    plan?: string;
    paymentMethod?: any;
    jars?: Jar[];
    settings?: {
        emailNotifications: boolean;
        spendingAlerts: boolean;
        twoFactorEnabled: boolean;
        notificationPreferences: {
            expenses: boolean;
            goals: boolean;
            tips: boolean;
            marketing: boolean;
        };
    };
}

export const useUserStore = defineStore('user', {
    state: (): {
        user: User | null,
        isAuthenticated: boolean,
        settings: {
            emailNotifications: boolean,
            spendingAlerts: boolean
        },
        currentUser: User | null,
        token: string | null
    } => ({
        user: null,
        isAuthenticated: false,
        settings: {
            emailNotifications: false,
            spendingAlerts: false
        },
        currentUser: null,
        token: null
    }),
    getters: {
        userId: (state) => state.currentUser?.id,
        isAuthenticatedByToken: (state) => !!state.token
    },
    actions: {
        setUser(userData: User) {
            this.user = userData;
            this.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(userData));
            const savedSettings = localStorage.getItem('userSettings');
            if (savedSettings) {
                this.settings = JSON.parse(savedSettings);
            }
        },
        initAuth() {
            const user = localStorage.getItem('user');
            if (user) {
                this.user = JSON.parse(user);
                this.isAuthenticated = true;
            } else {
                this.user = null;
                this.isAuthenticated = false;
            }
        },

        updateSettings(settings: typeof this.settings) {
            this.settings = settings;
            localStorage.setItem('userSettings', JSON.stringify(settings));
        },

        addJar(jar: Jar) {
            if (this.user && this.user.jars) {
                this.user.jars.push(jar);
                this.saveUserData();
            }
        },

        updateJar(updatedJar: Jar) {
            if (this.user && this.user.jars) {
                const index = this.user.jars.findIndex(j => j.id === updatedJar.id);
                if (index !== -1) {
                    this.user.jars[index] = updatedJar;
                    this.saveUserData();
                }
            }
        },

        deleteJar(jarId: string) {
            if (this.user && this.user.jars) {
                this.user.jars = this.user.jars.filter(j => j.id !== jarId);
                this.saveUserData();
            }
        },

        async saveUserData() {
            if (this.user) {
                try {
                    await updateUser(this.user.id, this.user);
                } catch (error) {
                    console.error('Error al guardar los datos del usuario:', error);
                }
            }
        },


        async updateUserSettings(settings: any) {
            if (!this.user) return;
            try {
                await updateUser(this.user.id, {
                    ...this.user,
                    settings: {
                        ...this.user.settings,
                        ...settings
                    }
                });
                this.user.settings = {
                    ...this.user.settings,
                    ...settings
                };
                localStorage.setItem('user', JSON.stringify(this.user));
            } catch (error) {
                console.error('Error updating user settings:', error);
                throw error;
            }
        },

        async deleteUserAccount() {
            if (!this.user) return;
            try {
                await deleteUser(this.user.id);
                this.user = null;
                this.isAuthenticated = false;
                localStorage.removeItem('user');
                localStorage.removeItem('userSettings');
                sessionStorage.clear();
            } catch (error) {
                console.error('Error deleting user account:', error);
                throw error;
            }
        },

        logout() {
            this.user = null;
            this.isAuthenticated = false;
            localStorage.removeItem('user');
            localStorage.removeItem('userSettings');
            sessionStorage.clear();
        }
    }
});