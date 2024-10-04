<script setup>
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

import { ref } from "vue";

const visible = ref(false);


</script>

<template>
    <div class="bg-green-50 border border-green-500 flex items-center justify-center gap-3 px-3 py-4 rounded-lg cursor-pointer hover:shadow transition-all" @click="visible = true">
        <Avatar icon="pi pi-plus" class="!bg-green-200" shape="circle" />
        
        <div class="leading-tight">
            <p class="font-medium">Add Project</p>
        </div>
    </div>

    <Dialog v-model:visible="visible" modal header="Add Project" :style="{ width: '25rem' }">

        <span class="text-surface-500 dark:text-surface-400 block">Input project details.</span>

        <div class="flex flex-col gap-1 my-3">
            <label class="font-semibold">Project Name</label>
            <InputText />
        </div>
        
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Add" @click="visible = false"></Button>
        </div>
    </Dialog>
</template>