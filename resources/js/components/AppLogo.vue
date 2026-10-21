<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>

<template>
    <AppLogoIcon :class="props.class" />
</template>
