<script setup>
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

</script>

<template>
    <div class="w-screen h-screen flex items-center justify-center">
        <Card class="w-[400px]">
            <template #title>
                <h1 class="text-3xl">Signup</h1>
            </template>

            <template #content>
                <form action="">
                    <div class="flex flex-col gap-1 mt-3">
                        <label for="username">First Name</label>
                        <InputText type="text" />
                    </div>

                    <div class="flex flex-col gap-1 mt-3">
                        <label for="username">Last Name</label>
                        <InputText type="text" />
                    </div>

                    <div class="flex flex-col gap-1 mt-3">
                        <label for="username">Email</label>
                        <InputText type="email" />
                    </div>

                    <div class="flex flex-col gap-1 mt-3">
                        <label for="username">Password</label>
                        <Password :feedback="false" toggleMask fluid />
                    </div>

                    <div class="flex flex-col gap-1 mt-3">
                        <label for="username">Password Confirmation</label>
                        <Password :feedback="false" fluid />
                    </div>

                    <Button label="Create account" class="mt-5" fluid />
                </form>

                <Button label="Signin instead?" link fluid as="router-link" :to="{ name: 'sign-in' }" />
            </template>
        </Card>
    </div>
</template>