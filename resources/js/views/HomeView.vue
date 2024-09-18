<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import ScrollPanel from 'primevue/scrollpanel';
import Panel from 'primevue/panel';
import Checkbox from 'primevue/checkbox';
import AddTaskDialog from '../components/AddTaskDialog.vue';
</script>

<template>
    <div class="grid grid-cols-3 gap-5 absolute top-0 bottom-0 right-0 left-0 p-5">
        <Card class="grid-cols-1 cursor-pointer h-full -mb-5">
            <template #title>
                <div class="flex items-center justify-between">
                    <p>Assigned</p>
                    
                    <AddTaskDialog />
                </div>
            </template>
            <template #content>
                <ScrollPanel class="w-full h-[63dvh] px-1">
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

        <Card class="grid-cols-1 cursor-pointer h-full -mb-5">
            <template #title>
                <div class="flex items-center justify-between">
                    <p>In Progress</p>
                </div>
            </template>
            <template #content>
                <ScrollPanel class="w-full h-[63dvh] px-1">
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

        <Card class="grid-cols-1 cursor-pointer h-full -mb-5">
            <template #title>
                <div class="flex items-center justify-between">
                    <p>Done</p>
                    <!-- <Avatar label="10%" class="!text-xs font-bold" shape="circle" /> -->
                </div>
            </template>
            <template #content>
                <ScrollPanel class="w-full h-[63dvh] px-1">
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
    </div>
</template>