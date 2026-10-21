<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>

<template>
    <div :class="cn('rounded-none border border-brand-gold/35 bg-card text-card-foreground shadow-sm', props.class)">
        <slot />
    </div>
</template>
