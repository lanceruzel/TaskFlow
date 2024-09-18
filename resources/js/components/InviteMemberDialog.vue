<script setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { ref } from "vue";

const visible = ref(false);
</script>

<template>
    <div>
        <Button label="+ Invite Members" @click="visible = true" size="small" rounded class="!bg-transparent !border-transparent hover:!border-zinc-400 !px-7" />

        <Dialog v-model:visible="visible" modal header="Invite Member" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block">Input member email.</span>

            <div class="flex flex-col gap-1 my-3">
                <label for="username">Email</label>
                <InputText type="email" />
            </div>

            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Invite" @click="visible = false"></Button>
            </div>
        </Dialog>
    </div>
</template>