<script setup>
import Avatar from 'primevue/avatar';
import ProfileMenu from './ProfileMenu.vue';
import NotificationPopover from './NotificationPopover.vue';
import AddProjectDialog from './AddProjectDialog.vue';
import ScrollPanel from 'primevue/scrollpanel';

import { useProjectStore } from '../stores/project';
import { onMounted, ref } from 'vue';

const projectStore = useProjectStore();
const { getProjects } = projectStore;

onMounted(async () => {
    await getProjects();
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
                <div v-for="project in projectStore.projects" :key="project.id" class="w-[180px] max-w-[180px] bg-gray-50 border flex items-center justify-center gap-3 px-5 py-3 rounded-lg cursor-pointer hover:shadow transition-all">
                    <div>
                        <Avatar icon="pi pi-user" class="bg-green-700" shape="circle" />
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