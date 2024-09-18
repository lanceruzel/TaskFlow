
<script setup>
import Popover from 'primevue/popover';
import Avatar from 'primevue/avatar';
import { ref } from "vue";

const op = ref();

const toggle = (event) => {
    op.value.toggle(event);
}
</script>

<template>
    <div class="card flex justify-center">
        <Avatar type="button" icon="pi pi-user" shape="circle" class="me-1" @click="toggle"  aria-haspopup="true" aria-controls="overlay_menu"/>

        <Popover ref="op">
            <div class="flex flex-col">
                <ul class="list-none p-0 m-0 flex flex-col">
                    <li class="flex items-center gap-2 py-2 ps-5 pe-10 hover:bg-gray-100 cursor-pointer transition-all">
                        <i class="pi pi-user"></i>
                        <p class="text-sm">Profile</p>
                    </li>

                    <li class="flex items-center gap-2 py-2 ps-5 pe-10 hover:bg-gray-100 cursor-pointer transition-all">
                        <i class="pi pi-sign-out"></i>
                        <p class="text-sm">Sign out</p>
                    </li>
                </ul>
            </div>
        </Popover>
    </div>
</template>


