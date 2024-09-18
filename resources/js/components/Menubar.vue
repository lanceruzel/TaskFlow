<script setup>
import Avatar from 'primevue/avatar';
</script>

<style>
#test {
    clip-path: polygon(0% 0%, 75% 0, 100% 50%, 75% 100%, 0% 100%);
      
    }
</style>

<template>
    <div class="w-full border-b-2 bg-white transition-all px-3">
        <nav class="flex gap-3">
            <ul class="flex gap-3">
                <li class="hover:border-b-green-700 border-b-2 border-transparent py-3 cursor-pointer px-5">Announcements</li>
                <li class="hover:border-b-green-700 border-b-2 border-transparent py-3 cursor-pointer px-5">Tasks</li>
            </ul>
        </nav>
    </div>
</template>