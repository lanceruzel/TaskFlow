<script setup>
import { RouterView } from 'vue-router';
import Toast from 'primevue/toast';
import DynamicDialog from 'primevue/dynamicdialog';
</script>

<template>
    <component :is="$route.meta.layout || 'div'">
        <Toast />
        <DynamicDialog />
        <RouterView />
    </component>
</template>