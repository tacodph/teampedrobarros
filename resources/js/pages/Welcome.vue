<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue';
import { Head, Link } from '@inertiajs/vue3';
import { Menu, X } from 'lucide-vue-next';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const PIX_KEY = '61998401811';
const SIGNUP_END = new Date('2026-10-30T23:59:59-03:00').getTime();
const WHATS_HREF =
    'https://wa.me/5561998401811?text=' + encodeURIComponent('Olá! Fiz o PIX do Desafio de Verão Team Pedro Barros e quero garantir minha vaga.');

const menuOpen = ref(false);
const now = ref(Date.now());
const copied = ref(false);
let timer: ReturnType<typeof setInterval> | null = null;
let copiedTimer: ReturnType<typeof setTimeout> | null = null;

const pad = (value: number) => String(value).padStart(2, '0');

const signup = computed(() => {
    const diff = Math.max(0, SIGNUP_END - now.value);
    const seconds = Math.floor(diff / 1000);

    return {
        label: diff > 0 ? 'Inscrições encerram em' : 'Inscrições encerradas',
        units: [
            { v: pad(Math.floor(seconds / 86400)), l: 'DIAS' },
            { v: pad(Math.floor(seconds / 3600) % 24), l: 'HORAS' },
            { v: pad(Math.floor(seconds / 60) % 60), l: 'MIN' },
            { v: pad(seconds % 60), l: 'SEG' },
        ],
    };
});

const copyLabel = computed(() => (copied.value ? 'Chave copiada ✓' : 'Copiar chave PIX'));

const copyPix = async () => {
    try {
        await navigator.clipboard.writeText(PIX_KEY);
    } catch {
        const input = document.createElement('input');
        input.value = PIX_KEY;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    }

    copied.value = true;
    if (copiedTimer) {
        clearTimeout(copiedTimer);
    }
    copiedTimer = setTimeout(() => {
        copied.value = false;
    }, 2000);
};

const closeMenu = () => {
    menuOpen.value = false;
};

onMounted(() => {
    timer = setInterval(() => {
        now.value = Date.now();
    }, 1000);
});

onUnmounted(() => {
    if (timer) {
        clearInterval(timer);
    }
    if (copiedTimer) {
        clearTimeout(copiedTimer);
    }
});

const navLinks = [
    { href: '#detalhes', label: 'Detalhes' },
    { href: '#como-funciona', label: 'Como funciona' },
    { href: '#equipe', label: 'Equipe' },
];
</script>

<template>
    <Head title="Desafio de Verão: 30 dias de treino e dieta" />

    <div class="brand-canvas">
        <header class="relative z-[2] mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-[22px]">
            <a href="#topo" class="inline-flex">
                <AppLogo class="h-16 sm:h-20" />
            </a>

            <nav class="hidden items-center gap-7 text-[17px] font-bold uppercase tracking-[1px] lg:flex">
                <a v-for="link in navLinks" :key="link.href" :href="link.href" class="text-white hover:text-brand-gold">
                    {{ link.label }}
                </a>
                <a href="#inscricao" class="btn-skew hover:bg-white hover:text-brand-ink">Garanta sua vaga</a>
                <Link v-if="$page.props.auth.user" :href="route('dashboard')" class="text-white hover:text-brand-gold"> Painel </Link>
            </nav>

            <button class="border border-brand-gold/50 p-2 text-white lg:hidden" type="button" @click="menuOpen = !menuOpen">
                <X v-if="menuOpen" class="size-5" />
                <Menu v-else class="size-5" />
            </button>
        </header>

        <nav v-if="menuOpen" class="relative z-[2] flex flex-col gap-4 border-y border-brand-gold/25 px-6 py-4 lg:hidden">
            <a
                v-for="link in navLinks"
                :key="link.href"
                :href="link.href"
                class="text-[17px] font-bold uppercase tracking-[1px] text-white"
                @click="closeMenu"
            >
                {{ link.label }}
            </a>
            <a href="#inscricao" class="btn-skew w-fit" @click="closeMenu">Garanta sua vaga</a>
            <Link v-if="$page.props.auth.user" :href="route('dashboard')" class="text-[17px] font-bold uppercase tracking-[1px]" @click="closeMenu">
                Painel
            </Link>
        </nav>

        <section id="topo" class="relative z-[1] mx-auto flex max-w-[1200px] flex-wrap items-center gap-10 px-6 pb-14 pt-8">
            <div class="min-w-0 flex-[1_1_460px]">
                <div
                    class="inline-flex items-center gap-2.5 border border-brand-gold/50 px-3.5 py-1.5 text-base font-bold uppercase tracking-[2px] text-brand-gold"
                >
                    01/11 a 05/12 · 30 dias
                </div>
                <h1 class="mt-6 max-w-[620px]">
                    <img
                        src="/images/logo-desafio.png"
                        alt="Desafio de Verão — Team Pedro Barros"
                        class="block h-auto w-full"
                        style="mix-blend-mode: screen"
                    />
                </h1>
                <p class="mt-[34px] max-w-[560px] text-pretty text-[clamp(22px,2.4vw,28px)] font-bold uppercase leading-[1.25] tracking-[1.5px]">
                    Quer chegar ao verão mais <span class="italic text-brand-gold">leve</span>, mais <span class="text-brand-gold">saudável</span> e
                    com mais <span class="italic text-brand-gold">disposição</span>?
                </p>
                <div class="mt-8 flex flex-wrap items-center gap-5">
                    <a href="#inscricao" class="btn-cta">GARANTA SUA VAGA!</a>
                    <div class="flex flex-col leading-none">
                        <span class="text-base font-bold uppercase tracking-[2px] text-brand-muted">Apenas</span>
                        <span class="text-[40px] font-extrabold">R$ 60<span class="text-2xl">,00</span></span>
                    </div>
                </div>
            </div>

            <div class="mx-auto grid min-w-0 max-w-[560px] flex-[1_1_380px] grid-cols-2 items-end gap-4">
                <figure class="relative m-0">
                    <div class="clip-photo-a -rotate-[2deg] bg-brand-gold">
                        <img
                            src="/images/pedro.jpg"
                            alt="Pedro Barros, coach"
                            class="portrait-duotone block aspect-[3/4.2] w-full object-cover object-[50%_8%]"
                        />
                    </div>
                    <figcaption class="mt-4 -rotate-[4deg]">
                        <div class="font-display text-[clamp(24px,2.6vw,32px)] leading-[0.95]">PEDRO<br />BARROS</div>
                        <div class="clip-dash mt-1.5 h-[5px] w-[120px] bg-brand-gold" />
                        <div class="mt-1 text-[17px] font-bold tracking-[2px]">COACH</div>
                    </figcaption>
                </figure>
                <figure class="relative mb-10">
                    <div class="clip-photo-b rotate-2 bg-brand-gold">
                        <img
                            src="/images/thais.png"
                            alt="Thaís Moraes, nutricionista"
                            class="portrait-duotone block aspect-[3/4.2] w-full object-cover object-[50%_8%]"
                        />
                    </div>
                    <figcaption class="mt-4 -rotate-[4deg] text-right">
                        <div class="font-display text-[clamp(24px,2.6vw,32px)] leading-[0.95]">THAÍS<br />MORAES</div>
                        <div class="clip-dash ml-auto mt-1.5 h-[5px] w-[140px] bg-brand-gold" />
                        <div class="mt-1 text-[17px] font-bold tracking-[2px]">NUTRICIONISTA</div>
                    </figcaption>
                </figure>
            </div>
        </section>

        <section id="detalhes" class="relative z-[1] mx-auto max-w-[1200px] px-6">
            <div class="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] border-y border-brand-gold/35">
                <div class="flex flex-col items-center gap-2.5 border-brand-gold/25 px-6 py-9 text-center sm:border-r">
                    <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="#2CCBF2" stroke-width="3" stroke-linejoin="round">
                        <rect x="6" y="9" width="36" height="33" rx="3" />
                        <path d="M6 18h36M15 5v8M33 5v8M14 26h4M22 26h4M30 26h4M14 33h4M22 33h4" />
                    </svg>
                    <div class="text-[34px] font-extrabold leading-none">DE 01/11<br />A 05/12</div>
                    <div class="text-lg font-semibold tracking-wide text-brand-muted">
                        DURAÇÃO <span class="font-extrabold text-white">30 DIAS</span>
                    </div>
                </div>
                <div class="flex flex-col items-center gap-2.5 border-brand-gold/25 px-6 py-9 text-center sm:border-r">
                    <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="#2CCBF2" stroke-width="3">
                        <ellipse cx="30" cy="10" rx="13" ry="5" />
                        <path d="M17 10v6c0 2.8 5.8 5 13 5s13-2.2 13-5v-6M17 16v6c0 2.8 5.8 5 13 5s13-2.2 13-5v-6" />
                        <ellipse cx="18" cy="30" rx="13" ry="5" />
                        <path d="M5 30v6c0 2.8 5.8 5 13 5s13-2.2 13-5v-6" />
                    </svg>
                    <div class="text-[22px] font-extrabold tracking-wide">APENAS</div>
                    <div class="text-[28px] font-extrabold leading-[0.9]">R$ <span class="text-[58px]">60</span>,00</div>
                </div>
                <div class="flex flex-col items-center gap-2.5 border-brand-gold/25 px-6 py-9 text-center sm:border-r">
                    <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="#2CCBF2" stroke-width="3" stroke-linejoin="round">
                        <path d="M10 4h20l8 8v32H10z" />
                        <path d="M30 4v8h8M16 20h16M16 27h16M16 34h8" />
                    </svg>
                    <div class="text-[30px] font-extrabold leading-none">BIOIMPEDÂNCIA</div>
                    <div class="text-[19px] font-semibold tracking-wide text-brand-muted">INICIAL (28/10) E FINAL</div>
                </div>
                <div class="flex flex-col items-center gap-2.5 px-6 py-9 text-center">
                    <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="#2CCBF2" stroke-width="3" stroke-linejoin="round">
                        <path d="M14 6h20v12a10 10 0 0 1-20 0z" />
                        <path d="M14 10H6c0 7 4 11 9 11M34 10h8c0 7-4 11-9 11M24 28v8M16 42h16l-2-6H18z" />
                    </svg>
                    <div class="text-[30px] font-extrabold leading-none">PREMIAÇÃO</div>
                    <div class="text-pretty text-lg font-semibold tracking-wide text-brand-muted">
                        PARA 1º, 2º E 3º LUGAR, DE ACORDO COM A EVOLUÇÃO NA BIOIMPEDÂNCIA
                    </div>
                </div>
            </div>
        </section>

        <section id="como-funciona" class="relative z-[1] mx-auto max-w-[1200px] px-6 pb-10 pt-20">
            <div class="flex justify-center">
                <h2
                    class="clip-heading m-0 -rotate-3 bg-brand-gold px-12 pb-3 pt-4 font-display text-[clamp(32px,4.4vw,52px)] font-normal leading-none text-brand-ink"
                >
                    COMO VAI FUNCIONAR?
                </h2>
            </div>
            <div class="mt-14 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))]">
                <div class="flex flex-col items-center gap-3 border-brand-gold/25 px-6 py-7 text-center sm:border-r">
                    <svg width="64" height="52" viewBox="0 0 60 48" fill="none" stroke="#2CCBF2" stroke-width="3" stroke-linejoin="round">
                        <rect x="8" y="12" width="7" height="24" rx="2" />
                        <rect x="45" y="12" width="7" height="24" rx="2" />
                        <rect x="2" y="17" width="6" height="14" rx="2" />
                        <rect x="52" y="17" width="6" height="14" rx="2" />
                        <path d="M15 24h30" />
                    </svg>
                    <div class="font-display text-[30px] leading-none">TREINO</div>
                    <div class="text-[19px] font-semibold tracking-wide text-brand-muted">DURANTE TODO O DESAFIO</div>
                </div>
                <div class="flex flex-col items-center gap-3 border-brand-gold/25 px-6 py-7 text-center sm:border-r">
                    <svg
                        width="52"
                        height="52"
                        viewBox="0 0 48 48"
                        fill="none"
                        stroke="#2CCBF2"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M12 4v12a5 5 0 0 0 10 0V4M17 4v40M34 44V4c-5 3-7 10-7 18h7" />
                    </svg>
                    <div class="font-display text-[30px] leading-none">DIETA</div>
                    <div class="text-[19px] font-semibold tracking-wide text-brand-muted">COM ORIENTAÇÃO DA NUTRICIONISTA THAÍS MORAES</div>
                </div>
                <div class="flex flex-col items-center gap-3 border-brand-gold/25 px-6 py-7 text-center sm:border-r">
                    <svg
                        width="52"
                        height="52"
                        viewBox="0 0 48 48"
                        fill="none"
                        stroke="#2CCBF2"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <rect x="10" y="3" width="28" height="42" rx="4" />
                        <path d="M17 33l5-6 4 3 6-8M29 22h3v3" />
                    </svg>
                    <div class="font-display text-[30px] leading-none">GYMRATS</div>
                    <div class="text-[19px] font-semibold tracking-wide text-brand-muted">REGISTRO DIÁRIO E ACOMPANHAMENTO DA SUA EVOLUÇÃO</div>
                </div>
                <div class="flex flex-col items-center gap-3 px-6 py-7 text-center">
                    <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="#2CCBF2" stroke-width="3" stroke-linejoin="round">
                        <path d="M24 4l6 13 14 1.5-10.5 9.5 3 14L24 35l-12.5 7 3-14L4 18.5 18 17z" />
                    </svg>
                    <div class="font-display text-[30px] leading-none">DESAFIOS</div>
                    <div class="text-[19px] font-semibold tracking-wide text-brand-muted">E METAS TODO DIA</div>
                </div>
            </div>
        </section>

        <section id="inscricao" class="relative z-[1] mx-auto max-w-[1200px] px-6 pb-10 pt-14">
            <div class="flex flex-wrap items-center justify-between gap-10 border-y border-brand-gold/35 py-12">
                <div class="clip-stamp -rotate-[5deg] bg-brand-gold px-11 pb-4 pt-5 text-center text-brand-ink">
                    <div class="font-display text-[26px] leading-none">INSCRIÇÕES ATÉ</div>
                    <div class="font-display text-[clamp(40px,5vw,58px)] leading-none">30 DE OUTUBRO</div>
                </div>
                <div class="flex min-w-0 flex-[1_1_300px] flex-col gap-[18px]">
                    <div class="flex items-center gap-[18px]">
                        <svg width="58" height="44" viewBox="0 0 58 44" fill="none" stroke="#2CCBF2" stroke-width="3.5" stroke-linejoin="round">
                            <rect x="3" y="3" width="52" height="38" rx="5" />
                            <path d="M3 14h52M11 30h14" />
                        </svg>
                        <div class="leading-none">
                            <div class="text-xl font-extrabold tracking-[2px] text-brand-gold">PIX</div>
                            <div class="text-[clamp(34px,4vw,44px)] font-extrabold">61 99840-1811</div>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <button type="button" class="btn-outline cursor-pointer" @click="copyPix">{{ copyLabel }}</button>
                        <a :href="WHATS_HREF" target="_blank" rel="noopener" class="btn-ghost-line">Enviar comprovante</a>
                    </div>
                </div>
                <div class="flex-[0_1_auto] -rotate-[8deg] text-center font-display text-[clamp(36px,4vw,48px)] leading-[0.95]">
                    GARANTA<br />SUA VAGA!
                    <div class="clip-dash mx-auto mt-2 h-1.5 w-4/5 bg-brand-gold" />
                </div>
            </div>

            <div class="mt-10 flex flex-col items-center gap-3.5">
                <div class="text-lg font-bold uppercase tracking-[3px] text-brand-muted">{{ signup.label }}</div>
                <div class="flex flex-wrap justify-center gap-3">
                    <div
                        v-for="unit in signup.units"
                        :key="unit.l"
                        class="min-w-24 border border-brand-gold/45 bg-brand-card px-2.5 py-3.5 text-center"
                    >
                        <div class="text-[44px] font-extrabold tabular-nums leading-none">{{ unit.v }}</div>
                        <div class="mt-1.5 text-[15px] font-bold tracking-[2px] text-brand-gold">{{ unit.l }}</div>
                    </div>
                </div>
            </div>
        </section>

        <section id="equipe" class="relative z-[1] mx-auto max-w-[1200px] px-6 pb-6 pt-14">
            <div class="flex justify-center">
                <h2
                    class="clip-heading-alt m-0 -rotate-3 bg-white px-11 pb-2.5 pt-3.5 font-display text-[clamp(30px,4vw,46px)] font-normal leading-none text-brand-ink"
                >
                    QUEM VAI TE ACOMPANHAR
                </h2>
            </div>
            <div class="mt-14 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
                <div
                    class="grid grid-cols-1 items-center gap-6 border border-brand-gold/35 bg-brand-card p-6 sm:grid-cols-[minmax(0,160px)_minmax(0,1fr)]"
                >
                    <div class="bg-brand-gold">
                        <img
                            src="/images/pedro.jpg"
                            alt="Pedro Barros"
                            class="portrait-duotone block aspect-[4/5] w-full object-cover object-[50%_5%]"
                        />
                    </div>
                    <div class="flex min-w-0 flex-col gap-2.5">
                        <div class="text-base font-extrabold tracking-[2px] text-brand-gold">COACH</div>
                        <div class="font-display text-[34px] leading-none">PEDRO BARROS</div>
                        <div class="text-base font-semibold tracking-wide text-brand-muted">CREF 020856-G/DF · Brasília DF</div>
                        <div class="flex flex-col gap-1 text-lg font-semibold leading-snug text-white">
                            <span class="italic text-brand-gold">Movimento é vida! Transforme-se comigo!</span>
                            <span>CrossFit · Personal · Dança</span>
                            <span>Consultoria on-line</span>
                        </div>
                        <div class="flex flex-wrap gap-x-5 gap-y-2">
                            <a
                                href="https://www.instagram.com/pedrobarrosof"
                                target="_blank"
                                rel="noopener"
                                class="text-lg font-extrabold tracking-wide text-brand-gold hover:text-white"
                            >
                                @pedrobarrosof
                            </a>
                            <a
                                href="https://wa.me/5561998401811"
                                target="_blank"
                                rel="noopener"
                                class="text-lg font-extrabold tracking-wide text-brand-gold hover:text-white"
                            >
                                61 99840-1811
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    class="grid grid-cols-1 items-center gap-6 border border-brand-gold/35 bg-brand-card p-6 sm:grid-cols-[minmax(0,160px)_minmax(0,1fr)]"
                >
                    <div class="bg-brand-gold">
                        <img
                            src="/images/thais.png"
                            alt="Thaís Moraes"
                            class="portrait-duotone block aspect-[4/5] w-full object-cover object-[50%_5%]"
                        />
                    </div>
                    <div class="flex min-w-0 flex-col gap-2.5">
                        <div class="text-base font-extrabold tracking-[2px] text-brand-gold">NUTRICIONISTA</div>
                        <div class="font-display text-[34px] leading-none">THAÍS MORAES</div>
                        <div class="text-base font-semibold tracking-wide text-brand-muted">CRN1 7235</div>
                        <div class="flex flex-col gap-1 text-lg font-semibold leading-snug text-white">
                            <span class="italic text-brand-gold">Nutrição Esportiva · Performance</span>
                            <span>Emagrecimento e metabolismo feminino</span>
                            <span>Intestino · Hormônio · NutriGenética</span>
                        </div>
                        <div class="flex flex-wrap gap-x-5 gap-y-2">
                            <a
                                href="https://www.instagram.com/thaismoraesnutri"
                                target="_blank"
                                rel="noopener"
                                class="text-lg font-extrabold tracking-wide text-brand-gold hover:text-white"
                            >
                                @thaismoraesnutri
                            </a>
                            <a
                                href="https://wa.me/5561998548549"
                                target="_blank"
                                rel="noopener"
                                class="text-lg font-extrabold tracking-wide text-brand-gold hover:text-white"
                            >
                                61 99854-8549
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer class="relative z-[1] mx-auto max-w-[1200px] px-6 pb-[72px] pt-10 text-center">
            <p class="m-0 -rotate-2 text-balance font-display text-[clamp(24px,3vw,36px)] leading-[1.15]">
                ENTRE PARA O TEAM PEDRO BARROS<br />E VENHA CONQUISTAR SUA MELHOR VERSÃO NESTE VERÃO!
            </p>
            <div class="clip-dash-wide mx-auto mt-3.5 h-1.5 w-[min(560px,80%)] bg-brand-gold" />
        </footer>
    </div>
</template>
