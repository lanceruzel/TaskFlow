<script setup>
import ProfileMenu from './ProfileMenu.vue';
import { useProjectStore } from '../stores/project';
import ProjectSettingsDialog from './ProjectSettingsDialog.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const projectStore = useProjectStore();
</script>

<template>
    <nav class="bg-white flex items-center justify-between gap-3 px-5 py-4 shadow">
        <div class="flex items-center justify-center">
            <ProjectSettingsDialog />
            <p v-if="projectStore.selectedProject" class="text-lg font-semibold">Project: <span class="font-normal" v-text="projectStore.selectedProject.project_title"></span></p>
            <p v-else class="text-lg font-semibold flex items-center justify-center gap-3">Project: <PulseLoader size="10px" /></p>
        </div>

        <div class="flex items-center justify-center">
            <!-- <NotificationPopover/> -->
            <ProfileMenu />
        </div>
    </nav>
</template>