<script setup>
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

import { onMounted, reactive, ref } from "vue";
import { useProjectStore } from '../stores/project';
import { storeToRefs } from 'pinia';
import { useToast } from 'primevue/usetoast';

const projectStore = useProjectStore();
const { storeProject } = projectStore;
const { errors } = storeToRefs(projectStore);
const visible = ref(false);
const toast = useToast();

const formData = reactive({
    project_title: '',
});

async function submit(){
    const project = await storeProject(formData);

    if(project){
        visible.value = false;
        formData.project_title = '';
    }
}

onMounted(() => {
    errors.value = {};
});
</script>

<template>
    <div class="w-[180px] max-w-[180px] bg-green-50 border border-green-500 flex items-center justify-center gap-3 px-3 py-4 rounded-lg cursor-pointer hover:shadow transition-all" @click="visible = true">
        <div>
            <Avatar icon="pi pi-plus" class="!bg-green-200" shape="circle" />
        </div>
        
        <div class="leading-tight">
            <p class="font-medium text-nowrap">Add Project</p>
        </div>
    </div>

    <Dialog v-model:visible="visible" modal header="Add Project" :style="{ width: '25rem' }">

        <form @submit.prevent="submit">
            <span class="text-surface-500 dark:text-surface-400 block">Input project details.</span>

            <div class="flex flex-col gap-1 my-3">
                <label class="font-semibold">Project Name</label>
                <InputText v-model="formData.project_title" :invalid="errors.project_title" />
                <small class="form-error-message" v-if="errors.project_title">{{ errors.project_title[0] }}</small>
            </div>

            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button type="submit" label="Add" :loading="projectStore.isLoading"></Button>
            </div>
        </form>
    </Dialog>
</template>