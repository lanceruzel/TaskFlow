<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

import { onMounted, reactive, ref, watch } from "vue";
import { useProjectStore } from '../stores/project';
import { storeToRefs } from 'pinia';

const projectStore = useProjectStore();
const { updateProject, destroyProject } = projectStore;
const { errors } = storeToRefs(projectStore);
const visible = ref(false);

const formData = reactive({
    project_title: '',
});

async function submit(){
    const project = await updateProject(formData);

    if(project){
        visible.value = false;
    }
}

async function deleteProject(){
    const destroy = await destroyProject();

    if(destroy){
        visible.value = false;
    }
}

watch(visible, (newValue) => {
    if(!newValue){
        formData.project_title = '';
    }else{
        formData.project_title = projectStore.selectedProject.project_title;
    }
});

onMounted(() => {
    errors.value = {};
});
</script>

<template>
    <Button icon="pi pi-cog" @click="visible = true" severity="secondary" variant="text" rounded />

    <Dialog v-model:visible="visible" modal header="Project Settings" :style="{ width: '25rem' }">

        <form @submit.prevent="submit">
            <span class="text-surface-500 dark:text-surface-400 block">Update project details.</span>

            <div class="flex flex-col gap-1 my-3">
                <label class="font-semibold">Project Name</label>
                <InputText v-model="formData.project_title" :invalid="errors.project_title" />
                <small class="form-error-message" v-if="errors.project_title">{{ errors.project_title[0] }}</small>
            </div>

            <div class="flex justify-between gap-2">
                <Button type="button" label="Delete" outlined severity="danger" @click="deleteProject" :loading="projectStore.isDeleteLoading" :disabled="projectStore.isFormLoading"></Button>

                <div class="flex items-center justify-center gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                    <Button type="submit" label="Update" :loading="projectStore.isFormLoading" :disabled="projectStore.isDeleteLoading"></Button>
                </div>
            </div>
        </form>
    </Dialog>
</template>