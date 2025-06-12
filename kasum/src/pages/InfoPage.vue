<template>
    <div class="min-h-screen bg-secondary text-primary font-sans">

        <header
            class="bg relative h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary/50"></div>
            <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1
                    class="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 animate-slide-in leading-tight text-secondary">
                    KASUM: Controla tu Futuro Financiero
                </h1>
                <p class="text-xl sm:text-2xl max-w-3xl mx-auto mb-10 animate-fade-in-delay text-secondary">
                    Gestiona tus ingresos y gastos con facilidad, obtén informes gráficos y alcanza tus metas
                    financieras con nuestra plataforma intuitiva.
                </p>
                <div class="flex justify-center gap-6">
                    <router-link to="login"
                        class="bg-secondary text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-secondary/80 transition-all duration-500 transform hover:scale-110 shadow-lg">
                        Prueba Gratis
                    </router-link>
                </div>
            </div>
        </header>

        <section class="py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
            <div class="max-w-7xl mx-auto">
                <h2 class="text-4xl sm:text-5xl font-bold text-center text-primary mb-16 animate-fade-in">
                    ¿Por Qué Elegir KASUM?
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div
                        class="relative bg-primary text-secondary p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                        <div class="text-amber-500 text-5xl mb-6 animate-bounce">💸</div>
                        <h3 class="text-2xl font-semibold mb-4">Gestión Sencilla</h3>
                        <p class="leading-relaxed">
                            Registra tus ingresos y gastos fácilmente con categorización automática.
                        </p>
                    </div>
                    <div
                        class="relative bg-primary text-secondary p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                        <div class="text-amber-500 text-5xl mb-6 animate-bounce">📊</div>
                        <h3 class="text-2xl font-semibold mb-4">Informes Visuales</h3>
                        <p class="leading-relaxed">
                            Obtén gráficos claros para entender tus hábitos financieros.
                        </p>
                    </div>
                    <div
                        class="relative bg-primary text-secondary p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                        <div class="text-amber-500 text-5xl mb-6 animate-bounce">🏦</div>
                        <h3 class="text-2xl font-semibold mb-4">Sincronización Bancaria</h3>
                        <p class="leading-relaxed">
                            Conecta tus cuentas para un control total (plan Estándar/Pro).
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-secondary relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-secondary/10 to-primary/80"></div>
            <div class="relative max-w-7xl mx-auto">
                <h2 class="text-4xl sm:text-5xl font-bold text-center mb-16 animate-fade-in">Lo que Dicen Nuestros
                    Usuarios</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div
                        class="bg-secondary text-primary p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
                        <p class="italic mb-6 text-lg">"KASUM me ayudó a organizar mis finanzas en minutos."</p>
                        <p class="font-semibold">— Ana G.</p>
                    </div>
                    <div
                        class="bg-secondary text-primary p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
                        <p class="italic mb-6 text-lg">"Los gráficos son súper claros, ahora controlo mi presupuesto."
                        </p>
                        <p class="font-semibold">— Carlos M.</p>
                    </div>
                    <div
                        class="bg-secondary text-primary p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
                        <p class="italic mb-6 text-lg">"La sincronización bancaria es un cambio total."</p>
                        <p class="font-semibold">— Laura P.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary to-secondary/80">
            <div class="max-w-7xl mx-auto">
                <h2
                    class="text-4xl sm:text-5xl font-extrabold text-center text-primary mb-16 animate-fade-in tracking-tight">
                    Planes para Todos
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div
                        class="relative bg-gradient-to-br from-primary to-primary/80 text-secondary p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-secondary/20">
                        <h3 class="text-2xl font-semibold mb-4">Gratis</h3>
                        <p class="text-4xl font-bold mb-4">0€/mes</p>
                        <p class="mb-6 text-secondary/80">Registro manual y gráficos básicos para empezar.</p>
                        <ul class="mb-6 space-y-2 text-sm">
                            <li class="flex items-center"><span class="mr-2 text-amber-500">✔</span> Registro manual</li>
                            <li class="flex items-center"><span class="mr-2 text-amber-500">✔</span> Gráficos básicos</li>
                            <li class="flex items-center"><span class="mr-2 text-amber-500">✔</span> Soporte por correo</li>
                        </ul>
                        <button @click="getStarted"
                            class="w-full bg-secondary text-primary px-6 py-3 rounded-full font-semibold hover:bg-secondary/80 transition-all duration-300 transform hover:scale-105">
                            Comenzar
                        </button>
                    </div>
                    <div
                        class="relative bg-gradient-to-br from-primary to-primary/80 text-secondary p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-secondary/20">
                        <span
                            class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full">Recomendado</span>
                        <h3 class="text-2xl font-semibold mb-4">Estándar</h3>
                        <p class="text-4xl font-bold mb-4">7€/mes</p>
                        <p class="mb-6 text-secondary/80">Sincronización bancaria, categorías automáticas y
                            recordatorios.</p>
                        <ul class="mb-6 space-y-2 text-sm">
                            <li class="flex items-center"><span class="mr-2 text-amber-500">✔</span> Sincronización bancaria</li>
                            <li class="flex items-center"><span class="mr-2 text-amber-500">✔</span> Categorías automáticas</li>
                            <li class="flex items-center"><span class="mr-2 text-amber-500">✔</span> Recordatorios personalizados</li>
                            <li class="flex items-center"><span class="mr-2 text-amber-500">✔</span> Soporte prioritario</li>
                        </ul>
                        <button @click="getStarted"
                            class="w-full bg-amber-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-400 transition-all duration-300 transform hover:scale-105">
                            Probar Ahora
                        </button>
                    </div>
                    <div
                        class="relative bg-gradient-to-br from-primary to-primary/80 text-secondary p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-secondary/20">
                        <h3 class="text-2xl font-semibold mb-4">Pro</h3>
                        <p class="text-4xl font-bold mb-4">10€/mes</p>
                        <p class="mb-6 text-secondary/80">Gestión en equipo, análisis predictivo y exportación de datos.
                        </p>
                        <ul class="mb-6 space-y-2 text-sm">
                            <li class="flex items-center"><span class="mr-2 text-amber-500">✔</span> Gestión en equipo</li>
                            <li class="flex items-center"><span class="mr-2 text-amber-500">✔</span> Análisis predictivo</li>
                            <li class="flex items-center"><span class="mr-2 text-amber-500">✔</span> Exportación de datos</li>
                            <li class="flex items-center"><span class="mr-2 text-amber-500">✔</span> Soporte 24/7</li>
                        </ul>
                        <button @click="getStarted"
                            class="w-full bg-secondary text-primary px-6 py-3 rounded-full font-semibold hover:bg-secondary/80 transition-all duration-300 transform hover:scale-105">
                            Obtener Pro
                        </button>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
const getStarted = () => { };
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Biryani:wght@400;600;800&family=Khula:wght@400;600&display=swap');

:root {
    --primary-color: #0a1e2e;
    --secondary-color: #f5f3ff;
}

.bg {
    background-image: url('/background.jpg');
}

h1, h2, h3 {
    font-family: 'Hammersmith One', sans-serif !important;
}

p, button {
    font-family: 'Biryani', sans-serif !important;
}

ul, li, span, small, .text-sm, .text-xs {
    font-family: 'Khula', sans-serif !important;
}

/* Animations */
/* ... existing animations ... */

/* Parallax Effect */
header {
    background-attachment: fixed;
}

/* Smooth Scroll */
html {
    scroll-behavior: smooth;
}
</style>