<script setup>
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Message from 'primevue/message';
import { onMounted, reactive } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { authenticate } = authStore;
const { errors } = storeToRefs(authStore);

const formData = reactive({
    email: '',
    password: ''
});

onMounted(() => {
    errors.value = {};
});
</script>

<template>
    <div class="w-full h-full flex items-center justify-center">
        <Card class="w-[400px]">
            <template #title>
                <h1 class="text-3xl">Signin</h1>
            </template>

            <template #content>
                <Message class="mt-2" :severity="authStore.message.severity" v-if="authStore.message">{{ authStore.message.detail }}</Message>
                
                <form @submit.prevent="authenticate('login', formData)">
                    <div class="flex flex-col gap-1 mt-3">
                        <label for="username">Email</label>
                        <InputText type="email" v-model="formData.email" :invalid="errors.email"/>
                        <small class="form-error-message" v-if="errors.email">{{ errors.email[0] }}</small>
                    </div>

                    <div class="flex flex-col gap-1 mt-3">
                        <label for="username">Password</label>
                        <Password :feedback="false" v-model="formData.password" toggleMask fluid :invalid="errors.password" />
                        <small class="form-error-message" v-if="errors.password">{{ errors.password[0] }}</small>
                    </div>

                    <div class="flex justify-end">
                        <Button label="Forgot Password?" link />
                    </div>

                    <Button type="submit" label="Signin" class="mt-5" fluid :loading="authStore.isLoading" />
                </form>

                <Button label="Create new account" link fluid as="router-link" :to="{ name: 'sign-up' }" />
            </template>
        </Card>
    </div>
</template>