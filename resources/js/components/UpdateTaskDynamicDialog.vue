<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";

import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref, watch } from "vue";
import { useProjectStore } from "../stores/project";
import { inject } from "vue";

const visible = ref(false);
const taskID = ref(null);
const projectStore = useProjectStore();
const { updateTaskStatus, destroyTask } = projectStore;
const { errors } = storeToRefs(projectStore);

const dialogRef = inject('dialogRef');

const closeDialog = () => {
    dialogRef.value.close();
}

const formData = reactive({
    title: '',
});

async function submit(){
    if(taskID.value){
        const task = await updateTaskStatus(taskID.value, null, formData.title);

        if(task){
            closeDialog();
            formData.title = '';
        }
    }
}

async function deleteTask(){
    if(taskID.value){
        const task = await destroyTask(taskID.value);

        if(task){
            closeDialog();
        }
    }
}

onMounted(() => {
    taskID.value = dialogRef.value.data.task;
    formData.title = dialogRef.value.data.title;
});
</script>

<template>
    <form @submit.prevent="submit">
        <span class="text-surface-500 dark:text-surface-400 block">Input task details.</span>

        <div class="flex flex-col gap-1 my-3">
            <label class="font-semibold">Task Title</label>
            <InputText v-model="formData.title" :invalid="errors.title"/>
            <small class="form-error-message" v-if="errors.title">{{ errors.title[0] }}</small>
        </div>

        <!-- <div class="flex flex-col gap-1 my-3">
            <label class="font-semibold">Assign</label>
            <Select :options="options" optionLabel="name" placeholder="Default" checkmark :highlightOnSelect="false" />
        </div> -->

        <!-- SubTasks Form Fields -->
        <!-- <div class="flex flex-col gap-1 mt-5 mb-10">
            <div class="flex items-center justify-between">
                <p class="font-semibold">Subtasks</p>
                <Button label="+ Add" size="small" text/>
            </div>

            <ul class="w-full">
                <li v-for="i in 1" :key="i" :value="i">
                    <div class="flex items-center justify-between">
                        <Inplace>
                            <template #display>
                                {{ text || 'Click to Edit' }}
                            </template>

                            <template #content="{ closeCallback }">
                                <span class="inline-flex items-center gap-2">
                                    <InputText v-model="text" autofocus fluid />
                                    <Button icon="pi pi-times" text severity="danger" @click="closeCallback" />
                                </span>
                            </template>
                        </Inplace>

                        <Button icon="pi pi-trash" severity="danger" rounded outlined aria-label="Cancel" size="small" />
                    </div>
                    
                    <Divider v-if="i !== 10" />
                </li>
            </ul>
        </div> -->

        <div class="flex justify-between gap-2">
            <Button type="button" label="Delete" outlined severity="danger" @click="deleteTask" :loading="projectStore.isDeleteLoading" :disabled="projectStore.isFormLoading"></Button>

            <div class="flex items-center justify-center gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="closeDialog"></Button>
                <Button type="submit" label="Update" :loading="projectStore.isFormLoading" :disabled="projectStore.isDeleteLoading"></Button>
            </div>
        </div>
    </form>
</template>