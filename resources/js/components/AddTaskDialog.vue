<script setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Select from "primevue/select";

import { storeToRefs } from 'pinia';
import { computed, reactive, ref, watch } from "vue";
import { useProjectStore } from "../stores/project";

const visible = ref(false);
const projectStore = useProjectStore();
const { storeTask } = projectStore;
const { errors } = storeToRefs(projectStore);

const options = [
    { name: "TEst", value: 1 },
    { name: "TEst", value: 1 },
    { name: "TEst", value: 1 },
    { name: "TEst", value: 1 },
    { name: "TEst", value: 1 }
];

const formData = reactive({
    title: '',
    assigned_id: null,
});

async function submit(){
    const project = await storeTask(formData);

    if(project){
        visible.value = false;
        formData.title = '';
        formData.assigned_id = '';
    }
}


watch(visible, (newValue) => {
    if(!newValue){
        formData.title = '';
        formData.assigned_id = '';
    }
});
</script>

<template>
    <div>
        <Button icon="pi pi-plus" @click="visible = true" severity="secondary" text rounded />

        <Dialog v-model:visible="visible" modal header="Add Task" :style="{ width: '25rem' }">
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
                
                <div class="flex justify-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                    <Button type="submit" label="Add" :loading="projectStore.isFormLoading"></Button>
                </div>
            </form>
        </Dialog>
    </div>
</template>