<script setup>
import { RouterView } from 'vue-router';
import Toast from 'primevue/toast';
</script>

<template>
    <component :is="$route.meta.layout || 'div'">
        <Toast />
        <RouterView />
    </component>
</template>