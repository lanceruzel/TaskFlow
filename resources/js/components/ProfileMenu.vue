
<script setup>
import Popover from 'primevue/popover';
import Avatar from 'primevue/avatar';
import { ref } from "vue";
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const { logout } = authStore;

const op = ref();

const toggle = (event) => {
    op.value.toggle(event);
}
</script>

<template>
    <div class="card flex justify-center">
        <div class="flex items-center justify-center gap-2 cursor-pointer" @click="toggle"  aria-haspopup="true" aria-controls="overlay_menu">
            <Avatar icon="pi pi-user" shape="circle" class="me-1 !bg-green-100 border border-green-200 !text-green-700" />
            <p class="leading-none text-md text-center font-medium">Welcome back, <span v-text="authStore.fullname"></span>!</p>
        </div>

        <Popover ref="op">
            <div class="flex flex-col">
                <ul class="list-none p-0 m-0 flex flex-col">
                    <!-- <li class="flex items-center gap-2 py-2 ps-3 pe-12 hover:bg-gray-100 cursor-pointer transition-all">
                        <i class="pi pi-user"></i>
                        <p class="text-sm">Profile</p>
                    </li> -->

                    <li class=" hover:bg-gray-100 cursor-pointer transition-all">
                        <form @submit.prevent="logout">
                            <button class="flex items-center gap-2 py-2 ps-3 pe-12">
                                <i class="pi pi-sign-out"></i>
                                <p class="text-sm">Sign out</p>
                            </button>
                        </form>
                    </li>
                </ul>
            </div>
        </Popover>
    </div>
</template>


