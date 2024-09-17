<script setup>
import Button from 'primevue/button';
</script>

<template>
    <div class="w-[350px] h-full bg-zinc-800 text-zinc-200">
        <div class="text-center text-2xl font-semibold bg-zinc-700/60 py-5">
            TaskFlow
        </div>

        <div class="py-3">
            <div class="flex justify-between items-center px-3">
                <p class="text-sm font-semibold uppercase tracking-widest text-zinc-500">Members</p>

                <Button label="View All" text size="small" class="hover:!bg-transparent !text-zinc-200" />
            </div>

            <div>
                <div v-for="i in 5" :key="i" class="hover:bg-zinc-700">
                    <div class="leading-snug py-3 px-3 cursor-pointer">
                        <p>Frank Molina</p>
                        <p class="text-sm text-zinc-500">2 Projects & 6 tasks</p>
                    </div>

                    <hr v-if="i != 5" class="border-zinc-700 border">
                </div>

                <div class="flex items-center justify-center mt-1">
                    <Button label="+ Invite Members" size="small" rounded class="!bg-transparent !border-transparent hover:!border-zinc-400 !px-7" />
                </div>
            </div>
        </div>
    </div>
</template>