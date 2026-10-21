<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue';
import BrandArt from '@/components/brand/BrandArt.vue';
import { useChallenge } from '@/composables/useChallenge';
import { GOAL_DETAILS, type GoalKey } from '@/data/goalDetails';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, Menu, X } from 'lucide-vue-next';
import { nextTick, onMounted, ref, watch } from 'vue';

const props = defineProps<{
    goal: GoalKey;
}>();

const { pushDay, pushReps, bars } = useChallenge();
const menuOpen = ref(false);

const scrollToGoal = (key: string) => {
    const el = document.getElementById(key);
    if (!el) {
        return;
    }

    const offset = 96;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
};

onMounted(() => {
    nextTick(() => scrollToGoal(props.goal));
});

watch(
    () => props.goal,
    (key) => nextTick(() => scrollToGoal(key)),
);
</script>

<template>
    <Head :title="`Objetivos — ${GOAL_DETAILS.find((item) => item.key === goal)?.title ?? 'Regras'}`" />

    <div class="brand-canvas">
        <header class="bg-brand-ink/88 relative sticky top-0 z-[2] border-b border-brand-gold/25 backdrop-blur-[10px]">
            <div class="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-[22px]">
                <Link :href="route('home')" class="inline-flex">
                    <AppLogo class="h-16 sm:h-20" />
                </Link>

                <nav class="hidden items-center justify-end gap-7 text-[17px] font-bold uppercase tracking-[1px] lg:flex">
                    <Link
                        v-for="item in GOAL_DETAILS"
                        :key="item.key"
                        :href="route('objetivos.show', item.key)"
                        class="hover:text-brand-gold"
                        :class="item.key === goal ? 'text-white' : 'text-brand-muted'"
                    >
                        {{ item.title.split(' ')[0] }}
                    </Link>
                    <Link :href="route('home')" class="btn-skew hover:bg-white hover:text-brand-ink"> Voltar ao início </Link>
                </nav>

                <button class="border border-brand-gold/50 p-2 text-white lg:hidden" type="button" @click="menuOpen = !menuOpen">
                    <X v-if="menuOpen" class="size-5" />
                    <Menu v-else class="size-5" />
                </button>
            </div>

            <nav v-if="menuOpen" class="flex flex-col gap-3 border-t border-brand-gold/25 px-6 py-4 lg:hidden">
                <Link
                    v-for="item in GOAL_DETAILS"
                    :key="item.key"
                    :href="route('objetivos.show', item.key)"
                    class="text-[17px] font-bold uppercase tracking-[1px] text-brand-muted"
                    @click="menuOpen = false"
                >
                    {{ item.title }}
                </Link>
                <Link :href="route('home')" class="btn-skew w-fit" @click="menuOpen = false"> Voltar ao início </Link>
            </nav>
        </header>

        <section class="relative z-[1] mx-auto max-w-[1200px] px-6 pb-8 pt-[clamp(40px,6vw,72px)]">
            <Link
                :href="`${route('home')}#como-funciona`"
                class="inline-flex items-center gap-2 text-sm font-semibold text-brand-muted-3 hover:text-brand-cream"
            >
                <ArrowLeft class="size-4" />
                5 objetivos por dia
            </Link>
            <div class="mt-6 flex flex-col gap-3.5">
                <div class="eyebrow">Todo dia, sem exceção</div>
                <h1 class="display-title m-0 text-[clamp(44px,6vw,80px)]">A regra de cada objetivo</h1>
                <p class="m-0 max-w-[560px] text-[17px] leading-relaxed text-brand-muted">
                    Toque nos cards da home ou use o menu acima. Aqui está a regra, por que funciona e dicas práticas de cada um dos 5.
                </p>
            </div>
        </section>

        <section
            v-for="item in GOAL_DETAILS"
            :id="item.key"
            :key="item.key"
            class="relative z-[1] scroll-mt-24 border-t border-brand-line"
            :class="item.key === 'flexoes' || item.key === 'alimentacao' || item.key === 'habilidade' ? 'bg-brand-strip' : 'bg-brand-ink'"
        >
            <div class="mx-auto grid max-w-[1200px] items-start gap-10 px-6 py-[clamp(56px,8vw,96px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div class="flex flex-col gap-5">
                    <img :src="item.icon" alt="" class="size-[88px]" />
                    <div class="text-sm font-bold uppercase tracking-[3px]" :style="{ color: item.color }">{{ item.pillar }}</div>
                    <h2 class="display-title m-0 text-[clamp(40px,5vw,72px)]">{{ item.title }}</h2>
                    <p class="text-[clamp(32px,4vw,48px)] font-extrabold leading-none" :style="{ color: item.color }">
                        {{ item.metric }}
                    </p>
                    <p class="m-0 max-w-[420px] text-[17px] leading-relaxed text-brand-muted">{{ item.desc }}</p>
                </div>

                <div class="flex flex-col gap-4">
                    <div class="surface-card flex flex-col gap-3 p-7">
                        <span class="text-[13px] font-bold uppercase tracking-[2px]" :style="{ color: item.color }">A regra</span>
                        <ul class="m-0 flex list-none flex-col gap-3 p-0">
                            <li v-for="line in item.rule" :key="line" class="text-[16px] leading-relaxed text-brand-muted-3">{{ line }}</li>
                        </ul>
                    </div>
                    <div class="surface-card flex flex-col gap-3 p-7">
                        <span class="text-[13px] font-bold uppercase tracking-[2px] text-brand-gold">Por que funciona</span>
                        <ul class="m-0 flex list-none flex-col gap-3 p-0">
                            <li v-for="line in item.why" :key="line" class="text-[16px] leading-relaxed text-brand-muted-3">{{ line }}</li>
                        </ul>
                    </div>
                    <div class="surface-card flex flex-col gap-3 p-7">
                        <span class="text-[13px] font-bold uppercase tracking-[2px] text-brand-muted-2">Dicas práticas</span>
                        <ul class="m-0 flex list-none flex-col gap-3 p-0">
                            <li v-for="line in item.tips" :key="line" class="text-[16px] leading-relaxed text-brand-muted-3">{{ line }}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div v-if="item.key === 'flexoes'" class="mx-auto max-w-[1200px] px-6 pb-[clamp(56px,8vw,96px)]">
                <div class="grid items-center gap-8 lg:grid-cols-2">
                    <div class="flex flex-col gap-3.5 border border-brand-gold/35 bg-brand-ink px-6 pb-[18px] pt-6">
                        <BrandArt kind="flexoes" />
                        <div class="flex justify-between text-[13px] font-bold uppercase tracking-widest text-brand-muted-2">
                            <span>30 / dia</span>
                            <span class="text-brand-conhecimento">4.000 no total</span>
                            <span>100 / dia</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-6 border border-brand-gold/35 bg-brand-ink p-7">
                        <div class="flex items-end justify-between gap-4">
                            <div class="flex flex-col gap-1">
                                <span class="text-[13px] font-bold uppercase tracking-[2px] text-brand-muted-2">Dia {{ pushDay }}</span>
                                <span class="text-[88px] font-extrabold tabular-nums leading-none text-brand-cream">{{ pushReps }}</span>
                            </div>
                            <span class="pb-1.5 text-[22px] font-bold uppercase text-brand-conhecimento">flexões</span>
                        </div>
                        <div class="flex h-[120px] items-end gap-0.5">
                            <div
                                v-for="(bar, index) in bars"
                                :key="index"
                                class="flex-1 rounded-t-sm"
                                :style="{ height: bar.h, background: bar.c }"
                            />
                        </div>
                        <input v-model.number="pushDay" type="range" min="1" max="60" aria-label="Dia do desafio" class="w-full" />
                        <div class="flex justify-between text-[13px] font-semibold text-brand-muted-2">
                            <span>Dia 1 · 30</span>
                            <span>Dia 30 · 60</span>
                            <span>Dia 60 · 100</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="relative z-[1] bg-brand-gold text-brand-ink">
            <div class="mx-auto flex max-w-[1200px] flex-col items-start gap-5 px-6 py-16 lg:flex-row lg:items-center lg:justify-between">
                <h2 class="display-title m-0 text-[clamp(36px,5vw,56px)]">Garanta sua vaga.<br />Desafio de Verão.</h2>
                <Link :href="`${route('home')}#inscricao`" class="btn-ghost-line border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-white">
                    GARANTA SUA VAGA!
                </Link>
            </div>
        </section>
    </div>
</template>
