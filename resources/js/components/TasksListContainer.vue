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
                <Panel v-for="i in 20" :key="i" class="py-3 my-3 mx-1 shadow-sm" toggleable collapsed="false">
                    <template #header>
                        <div class="leading-tight">
                            <p>UI Layout</p>
                            <small>Frank Molina</small>
                        </div>
                    </template>

                    <template #icons>
                        <Avatar label="10%" class="!text-xs font-bold !size-9 me-1" shape="circle" />
                    </template>

                    <div class="flex flex-col items-center justify-between mt-2">
                        <ul class="w-full">
                            <li class="py-1" v-for="i in 10" :key="i" >
                                <div class="flex items-center">
                                    <Checkbox name="pizza" value="Cheese" />
                                    <label class="ml-2">TEst</label>
                                </div>
                            </li>
                        </ul>

                        <Button label="Add Task" text size="small" />
                    </div>
                </Panel>
            </ScrollPanel>
        </template>
    </Card>
</template>