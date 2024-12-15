<script setup>
import ScrollPanel from 'primevue/scrollpanel';
import AddProjectDialog from './AddProjectDialog.vue';

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
    <div class="min-w-[300px] max-w-[300px] h-full bg-zinc-800 text-zinc-200">
        <div class="text-center text-2xl font-semibold bg-zinc-700/60 py-5">
            TaskFlow
        </div>

        <div class="py-3">
            <div class="text-sm font-semibold uppercase tracking-widest text-zinc-500 px-3">
                <p>Projects</p>
            </div>

            <div class="flex flex-col items-center justify-between h-full px-2">
                <ScrollPanel class="w-full h-[calc(100dvh-12rem)]">
                    <div v-for="project in projectStore.projects" 
                        :key="project.id" 
                        class="hover:bg-zinc-700 rounded"
                        :class="{'bg-zinc-900': selectedProject && selectedProject.id && selectedProject.id === project.id}"
                        @click="getSelectedProject(project.id)"
                    >
                        <div class="leading-snug py-3 px-3 cursor-pointer truncate">
                            <p v-text="project.project_title" class="truncate"></p>
                            <p class="text-base text-zinc-500"><span>{{ project.tasks.length }}</span> tasks</p>
                        </div>

                        <hr class="border-zinc-700 border">
                    </div>
                </ScrollPanel>

                <div class="flex items-center justify-center py-6">
                    <AddProjectDialog />
                </div>
            </div>
        </div>
    </div>
</template>