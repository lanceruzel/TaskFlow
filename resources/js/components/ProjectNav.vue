<script setup>
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
</script>

<template>
    <div class="w-full border-b bg-white transition-all p-3 flex items-center justify-between">
        <nav class="flex items-center justify-start gap-3">
            <div v-for="i in 5" :key="i" class="bg-gray-50 border flex items-center justify-center gap-3 p-3 rounded-lg cursor-pointer hover:shadow transition-all">
                <Avatar icon="pi pi-user" class="bg-green-700" shape="circle" />
                <div class=" leading-tight">
                    <p class="me-5 font-medium">Project 1</p>
                    <small>Progress: 50%</small>
                </div>
            </div>
        </nav>

        <nav class="flex items-center justify-start">
            <Button label="+ Add Project" size="small" rounded class="me-3"/>
            <Avatar icon="pi pi-user" shape="circle" class="me-1" />
            <Button icon="pi pi-bell" rounded text />
        </nav>
    </div>
</template>