<script setup>
import Menubar from '../components/Menubar.vue';
import Sidebar from '../components/Sidebar.vue';
import ProjectNav from '../components/ProjectNav.vue';
</script>

<template>
    <div class="flex min-h-screen h-screen overflow-hidden">
        <Sidebar />

        <div class="flex flex-col h-full w-full">
            <ProjectNav />
            <!-- <Menubar /> -->
            
            <div class="p-5 flex-1 relative">
                <slot />
            </div>
        </div>
    </div>
</template>