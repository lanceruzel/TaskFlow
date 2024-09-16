<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="w-full shadow-md h-[70px] bg-green-700">
        <nav>
            <span class="nav-title">Logo</span>

            <div>
                <RouterLink class="link nav-link" :to="{ name: 'home' }">
                    <span>Home</span> 
                </RouterLink>

                <RouterLink class="link nav-link" :to="{ name: 'about' }">
                    <span>About</span> 
                </RouterLink>
            </div>
        </nav>
    </div>
</template>