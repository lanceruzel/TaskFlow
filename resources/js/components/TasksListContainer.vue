<script setup>
import AddTaskDialog from '../components/AddTaskDialog.vue';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import ScrollPanel from 'primevue/scrollpanel';
import Panel from 'primevue/panel';

const props = defineProps(['status']);

</script>

<template>
    <Card class="grid-cols-1 cursor-pointer h-full -mb-5">
        <template #title>
            <div class="flex items-center justify-between" v-bind:class="{ 'py-1.5' : props.status !== 'Assigned'  }">
                <p v-text="props.status"></p>
                
                <AddTaskDialog v-if="props.status === 'Assigned'" />
            </div>
        </template>
        <template #content>
            <ScrollPanel class="w-full h-[calc(100dvh-17rem)] p-2">
                <div v-for="i in 20" :key="i" class="p-3 my-3 mx-1 shadow-sm leading-tight border rounded">
                    <p>UI Layout</p>
                    <small>Frank Molina</small>
                </div>
            </ScrollPanel>
        </template>
    </Card>
</template>