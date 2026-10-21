<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue';
import { Link } from '@inertiajs/vue3';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div class="brand-canvas flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div class="relative z-[1] w-full max-w-sm">
            <div class="flex flex-col gap-8">
                <div class="flex flex-col items-center gap-4">
                    <Link :href="route('home')" class="flex flex-col items-center gap-3 font-medium">
                        <AppLogo class="h-24" />
                        <span class="sr-only">{{ title }}</span>
                    </Link>
                    <div class="space-y-2 text-center">
                        <h1 class="display-title text-[32px] leading-none">{{ title }}</h1>
                        <p class="text-center text-sm text-brand-muted">{{ description }}</p>
                    </div>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>
