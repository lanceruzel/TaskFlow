<script setup>
import TasksListContainer from '../components/TasksListContainer.vue';
</script>

<template>
    <div class="grid grid-cols-3 gap-5 absolute top-0 bottom-0 right-0 left-0 p-5">
        <TasksListContainer status="Assigned"/>

        <TasksListContainer status="In Progress"/>

        <TasksListContainer status="Done"/>
    </div>
</template>