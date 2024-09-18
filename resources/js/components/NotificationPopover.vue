<script setup>
import Button from "primevue/button";
import Popover from "primevue/popover";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import { ref } from "vue";

const op = ref();
const members = ref([
    { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
]);

const toggle = (event) => {
    op.value.toggle(event);
}
</script>

<template>
    <div class="card flex justify-center">
        <Button icon="pi pi-bell" @click="toggle" rounded text />

        <Popover ref="op">
            <div class="flex flex-col gap-4 w-[25rem]">
                <p class="font-medium block">Notification</p>
                <div>
                    <ul class="list-none p-0 m-0 flex flex-col gap-4">
                        <li v-for="member in members" :key="member.name" class="flex items-center gap-2">
                            <img :src="`https://primefaces.org/cdn/primevue/images/avatar/${member.image}`" style="width: 32px" />
                            <div>
                                <span class="font-medium">{{ member.name }}</span>
                                <div class="text-sm text-surface-500 dark:text-surface-400">{{ member.email }}</div>
                            </div>
                            <div class="flex items-center gap-2 text-surface-500 dark:text-surface-400 ml-auto text-sm">
                                <span>{{ member.role }}</span>
                                <i class="pi pi-angle-down"></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Popover>
    </div>
</template>
