<script setup>
import Avatar from 'primevue/avatar';
import ProfileMenu from './ProfileMenu.vue';
import NotificationPopover from './NotificationPopover.vue';
import AddProjectDialog from './AddProjectDialog.vue';
import ScrollPanel from 'primevue/scrollpanel';

import { useProjectStore } from '../stores/project';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

const projectStore = useProjectStore();
const { getProjects, getSelectedProject } = projectStore;
const { selectedProject, projects } = storeToRefs(projectStore);

const loadDefaultSelectedProject = () => {
    if(selectedProject.value === null){
        if(projects.value[0]){
            getSelectedProject(projects.value[0].id);
        }
    }
}

onMounted(async () => {
    await getProjects();

    loadDefaultSelectedProject();
});
</script>

<template>
    <div class="w-full border-b bg-white transition-all p-3 flex items-center justify-end">
        <nav class="flex items-center justify-start gap-3 px-3">
            <NotificationPopover/>
            <ProfileMenu />
        </nav>
    </div>
</template>