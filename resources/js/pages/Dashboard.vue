<script setup lang="ts">
import BrandArt from '@/components/brand/BrandArt.vue';
import { GOALS, useChallenge } from '@/composables/useChallenge';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/vue3';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Painel',
        href: '/dashboard',
    },
];

defineProps<{
    name?: string;
}>();

const { countdown, pushDay, pushReps, bars, milestones } = useChallenge();
</script>

<template>
    <Head title="Painel" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
            <div class="flex flex-col gap-3">
                <div class="eyebrow">Team Pedro Barros</div>
                <h1 class="display-title text-[clamp(36px,5vw,56px)]">Desafio de <span class="text-brand-gold">Verão</span></h1>
                <p class="max-w-xl text-brand-muted">{{ countdown.label }}. Treino, dieta, Gymrats e metas todo dia.</p>
            </div>

            <div class="grid gap-4 md:grid-cols-3">
                <div class="surface-card flex flex-col justify-between gap-4 p-6">
                    <span class="text-[13px] font-bold uppercase tracking-[2px] text-brand-muted-2">{{ countdown.label }}</span>
                    <div v-if="countdown.isCounting" class="flex gap-2">
                        <div v-for="unit in countdown.units.slice(0, 2)" :key="unit.l" class="text-center">
                            <div class="text-4xl font-extrabold tabular-nums">{{ unit.v }}</div>
                            <div class="text-xs uppercase tracking-widest text-brand-muted-2">{{ unit.l }}</div>
                        </div>
                    </div>
                    <div v-else-if="countdown.isRunning" class="flex flex-col gap-3">
                        <div class="font-display text-5xl uppercase">
                            Dia <span class="text-brand-gold">{{ countdown.day }}</span>
                        </div>
                        <div class="h-2 overflow-hidden bg-brand-line">
                            <div class="h-full bg-brand-gold" :style="{ width: countdown.pct }" />
                        </div>
                    </div>
                    <div v-else class="font-display text-3xl uppercase text-brand-gold">Concluído</div>
                </div>

                <div class="surface-card flex flex-col justify-between gap-4 p-6">
                    <span class="text-[13px] font-bold uppercase tracking-[2px] text-brand-conhecimento">Flexões</span>
                    <div class="flex items-end justify-between">
                        <span class="text-6xl font-extrabold tabular-nums">{{ pushReps }}</span>
                        <span class="text-lg font-bold uppercase text-brand-conhecimento">dia {{ pushDay }}</span>
                    </div>
                    <div class="flex h-16 items-end gap-px">
                        <div v-for="(bar, index) in bars" :key="index" class="flex-1 rounded-t-sm" :style="{ height: bar.h, background: bar.c }" />
                    </div>
                </div>

                <div class="surface-card overflow-hidden p-6">
                    <BrandArt kind="amizade" />
                </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <Link v-for="goal in GOALS" :key="goal.key" :href="route('objetivos.show', goal.key)" class="surface-card flex flex-col gap-3 p-5">
                    <img :src="goal.icon" alt="" class="size-14" />
                    <span class="text-2xl font-extrabold leading-none" :style="{ color: goal.color }">{{ goal.metric }}</span>
                    <span class="font-display text-lg leading-tight">{{ goal.title }}</span>
                </Link>
            </div>

            <div class="grid gap-3 md:grid-cols-5">
                <div
                    v-for="mile in milestones"
                    :key="mile.day"
                    class="flex flex-col gap-2 p-4"
                    :style="{ background: mile.bg, border: `1.5px solid ${mile.border}` }"
                >
                    <span class="text-[11px] font-bold uppercase tracking-widest text-brand-muted-2">{{ mile.date }}</span>
                    <span class="font-display text-3xl" :style="{ color: mile.numColor }">Dia {{ mile.day }}</span>
                    <span class="text-base font-extrabold uppercase">{{ mile.title }}</span>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
