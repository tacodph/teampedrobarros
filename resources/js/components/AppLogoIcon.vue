<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>

<template>
    <img
        src="/images/logo-desafio.png"
        alt="Desafio de Verão — Team Pedro Barros"
        :class="cn('block h-16 w-auto object-contain', props.class)"
        style="mix-blend-mode: screen"
    />
</template>
