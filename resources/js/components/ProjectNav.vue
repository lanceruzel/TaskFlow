<script setup>
import Avatar from 'primevue/avatar';
import ProfileMenu from './ProfileMenu.vue';
import NotificationPopover from './NotificationPopover.vue';
import AddProjectDialog from './AddProjectDialog.vue';
</script>

<template>
    <div class="w-full border-b bg-white transition-all p-3 flex items-center justify-between">
        <nav class="flex items-center justify-start gap-3">
            <AddProjectDialog />

            <div v-for="i in 5" :key="i" class="bg-gray-50 border flex items-center justify-center gap-3 px-5 py-3 rounded-lg cursor-pointer hover:shadow transition-all">
                <Avatar icon="pi pi-user" class="bg-green-700" shape="circle" />
                <div class=" leading-tight">
                    <p class="font-medium">Project 1</p>
                    <small>Progress: 50%</small>
                </div>
            </div>
        </nav>

        <nav class="flex items-center justify-start gap-1">
            <NotificationPopover/>
            <ProfileMenu />
        </nav>
    </div>
</template>