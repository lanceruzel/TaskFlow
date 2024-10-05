<script setup>
import ScrollPanel from 'primevue/scrollpanel';
import InviteMemberDialog from './InviteMemberDialog.vue';
</script>

<template>
    <div class="min-w-[300px] max-w-[300px] h-full bg-zinc-800 text-zinc-200">
        <div class="text-center text-2xl font-semibold bg-zinc-700/60 py-5">
            TaskFlow
        </div>

        <div class="py-3">
            <div class="text-sm font-semibold uppercase tracking-widest text-zinc-500 px-3">
                <p>Members</p>
            </div>

            <div class="flex flex-col items-center justify-between h-full px-2">
                <ScrollPanel class="w-full h-[calc(100dvh-12rem)]">
                    <div v-for="i in 20" :key="i" class="hover:bg-zinc-700">
                        <div class="leading-snug py-3 px-3 cursor-pointer">
                            <p>Frank Molina</p>
                            <p class="text-sm text-zinc-500">2 Projects & 6 tasks</p>
                        </div>

                        <hr v-if="i != 5" class="border-zinc-700 border">
                    </div>
                </ScrollPanel>

                <div class="flex items-center justify-center py-6">
                    <InviteMemberDialog />
                </div>
            </div>
        </div>
    </div>
</template>