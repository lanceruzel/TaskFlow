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
    <div class="w-full border-b bg-white transition-all p-3 flex items-center justify-between">
        <nav class="flex items-center justify-start gap-3">
            <AddProjectDialog />

            <ScrollPanel :pt="{
                content: {
                    class: 'flex gap-3 items-center',
                },
                root: {
                    class: 'w-[calc(100dvw-38.8rem)] mt-3.5'
                }
            }">
                <div v-for="project in projectStore.projects" :key="project.id" 
                    class="w-[180px] max-w-[180px] bg-gray-50 border flex items-center justify-center gap-3 px-5 py-3 rounded-lg cursor-pointer hover:shadow transition-all"
                    :class="{ 'border-blue-500 bg-blue-100' : selectedProject && selectedProject.id && selectedProject.id === project.id }"
                    @click="getSelectedProject(project.id)"
                >
                    <div>
                        <Avatar v-if="selectedProject && selectedProject.id && selectedProject.id === project.id" icon="pi pi-check" class="!bg-blue-200" shape="circle" />
                        <Avatar v-else icon="pi pi-user" shape="circle" />
                    </div>

                    <div class="w-full leading-tight truncate">
                        <p class="font-medium truncate" v-text="project.project_title"></p>
                        <small>Progress: <span v-text="project.percentage"></span>%</small>
                    </div>
                </div>
            </ScrollPanel>
        </nav>

        <nav class="flex items-center justify-start gap-3 px-3">
            <NotificationPopover/>
            <ProfileMenu />
        </nav>
    </div>
</template>