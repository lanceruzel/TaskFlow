<script setup>
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

import { onMounted, reactive, ref, watch } from "vue";
import { useProjectStore } from '../stores/project';
import { storeToRefs } from 'pinia';

const projectStore = useProjectStore();
const { storeProject } = projectStore;
const { errors } = storeToRefs(projectStore);
const visible = ref(false);

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

watch(visible, (newValue) => {
    if(!newValue){
        formData.project_title = '';
    }
});

onMounted(() => {
    errors.value = {};
});
</script>

<template>
    <Button label="+ Add project" @click="visible = true" size="small" rounded class="!bg-transparent !border-transparent hover:!border-zinc-400 !px-7" />

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
                <Button type="submit" label="Add" :loading="projectStore.isFormLoading"></Button>
            </div>
        </form>
    </Dialog>
</template>