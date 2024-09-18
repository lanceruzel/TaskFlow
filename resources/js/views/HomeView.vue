<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import ScrollPanel from 'primevue/scrollpanel';
</script>


<template>
    <div class="grid grid-cols-3 gap-5 absolute top-0 bottom-0 right-0 left-0 p-5">
        <Card class="grid-cols-1 cursor-pointer h-full -mb-5">
            <template #title>
                <div class="flex items-center justify-between">
                    <p>Assigned</p>
                    <Button icon="pi pi-plus" severity="secondary" text rounded />
                </div>
            </template>
            <template #content>
                <ScrollPanel class="w-full h-[63dvh]">
                    <Card v-for="i in 20" :key="i" class="my-3 mx-1">
                        <template #content>
                            <div class="flex items-center justify-between">
                                <div class="leading-tight">
                                    <p>UI Layout</p>
                                    <small>Frank Molina</small>
                                </div>

                                <Avatar label="10%" class="!text-xs font-bold" shape="circle" size="large" />
                            </div>
                        </template>
                    </Card>
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
                <ScrollPanel class="w-full h-[63dvh]">
                    <Card v-for="i in 20" :key="i" class="my-3 mx-1">
                        <template #content>
                            <div class="flex items-center justify-between">
                                <div class="leading-tight">
                                    <p>UI Layout</p>
                                    <small>Frank Molina</small>
                                </div>

                                <Avatar label="10%" class="!text-xs font-bold" shape="circle" size="large" />
                            </div>
                        </template>
                    </Card>
                </ScrollPanel>
            </template>
        </Card>

        <Card class="grid-cols-1 cursor-pointer h-full -mb-5">
            <template #title>
                <div class="flex items-center justify-between">
                    <p>Done</p>
                    <Avatar label="10%" class="!text-xs font-bold" shape="circle" />
                </div>
            </template>
            <template #content>
                <ScrollPanel class="w-full h-[63dvh]">
                    <Card v-for="i in 20" :key="i" class="my-3 mx-1">
                        <template #content>
                            <div class="flex items-center justify-between">
                                <div class="leading-tight">
                                    <p>UI Layout</p>
                                    <small>Frank Molina</small>
                                </div>

                                <Avatar label="10%" class="!text-xs font-bold" shape="circle" size="large" />
                            </div>
                        </template>
                    </Card>
                </ScrollPanel>
            </template>
        </Card>
    </div>
</template>