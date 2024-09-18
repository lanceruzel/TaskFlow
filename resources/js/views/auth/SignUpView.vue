<script setup>
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { onMounted, reactive } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { authenticate } = authStore;
const { errors } = storeToRefs(authStore);

const formData = reactive({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

onMounted(() => {
    errors.value = {};
});
</script>

<template>
    <div class="w-full h-full flex items-center justify-center">
        <Card class="w-[400px]">
            <template #title>
                <h1 class="text-3xl">Signup</h1>
            </template>

            <template #content>
                <form @submit.prevent="authenticate('register', formData)">
                    <div class="flex flex-col gap-1 mt-3">
                        <label for="username">First Name</label>
                        <InputText type="text" v-model="formData.first_name" :invalid="errors.first_name"/>
                        <small class="form-error-message" v-if="errors.first_name">{{ errors.first_name[0] }}</small>
                    </div>

                    <div class="flex flex-col gap-1 mt-3">
                        <label for="username">Last Name</label>
                        <InputText type="text" v-model="formData.last_name" :invalid="errors.last_name"/>
                        <small class="form-error-message" v-if="errors.last_name">{{ errors.last_name[0] }}</small>
                    </div>

                    <div class="flex flex-col gap-1 mt-3">
                        <label for="username">Email</label>
                        <InputText type="email" v-model="formData.email" :invalid="errors.email"/>
                        <small class="form-error-message" v-if="errors.email">{{ errors.email[0] }}</small>
                    </div>

                    <div class="flex flex-col gap-1 mt-3">
                        <label for="username">Password</label>
                        <Password :feedback="false" toggleMask fluid v-model="formData.password" :invalid="errors.password"/>
                        <small class="form-error-message" v-if="errors.password">{{ errors.password[0] }}</small>
                    </div>

                    <div class="flex flex-col gap-1 mt-3">
                        <label for="username">Password Confirmation</label>
                        <Password :feedback="false" fluid v-model="formData.password_confirmation" :invalid="errors.password_confirmation"/>
                        <small class="form-error-message" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</small>
                    </div>

                    <Button type="submit" label="Create account" class="mt-5" fluid :loading="authStore.isLoading" />
                </form>

                <Button label="Signin instead?" link fluid as="router-link" :to="{ name: 'sign-in' }" />
            </template>
        </Card>
    </div>
</template>