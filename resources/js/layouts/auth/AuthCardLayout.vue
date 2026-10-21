<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/vue3';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div class="brand-canvas flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div class="relative z-[1] flex w-full max-w-md flex-col gap-6">
            <Link :href="route('home')" class="inline-flex self-center">
                <AppLogo class="h-24" />
            </Link>

            <div class="flex flex-col gap-6">
                <Card class="rounded-none">
                    <CardHeader class="px-10 pb-0 pt-8 text-center">
                        <CardTitle class="text-xl">{{ title }}</CardTitle>
                        <CardDescription>
                            {{ description }}
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="px-10 py-8">
                        <slot />
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>
