<script setup>
import ScrollPanel from 'primevue/scrollpanel';
import Card from 'primevue/card';
import AddTaskDialog from '../components/AddTaskDialog.vue';
import interact from 'interactjs';
import { useProjectStore } from '../stores/project'; 
import BeatLoader from 'vue-spinner/src/BeatLoader.vue';

let previousDropzone = null;
let previewElement = null;
let hoverClone = null;

const projectStore = useProjectStore();
const { getFilteredTasks, updateTaskStatus } = projectStore;

interact('*[data-dropzone]')
  .dropzone({
    ondrop: function (event) {
        const droppedElement = event.relatedTarget; // The element being dragged
        const newDropzone = event.target; // The new dropzone

        const taskId = droppedElement.getAttribute('data-taskid');
        
        // Remove the element from the previous dropzone, if it exists
        if(previousDropzone && previousDropzone !== newDropzone && previousDropzone.contains(droppedElement)){
            previousDropzone.removeChild(droppedElement);
        }

        // Append the element to the new dropzone
        newDropzone.appendChild(droppedElement);

        // Update the previousDropzone to the new one
        previousDropzone = null;

        updateStatus(newDropzone.parentElement.parentElement.parentElement.parentElement.parentElement.id, taskId);
    },
    ondropdeactivate: function (event) {
        const dropzone = event.target;

        // Remove the hover clone when the element leaves the dropzone
        if(hoverClone && dropzone.contains(hoverClone)){
            dropzone.removeChild(hoverClone);
            hoverClone = null;
        }
    },
    ondragenter: function (event) {
        const dropzone = event.target;
        const draggedElement = event.relatedTarget;

        // Create a preview (clone) only if it doesn't exist
        if(!hoverClone){
            hoverClone = draggedElement.cloneNode(true); // Clone the dragged element
            
            // Add necessary styles to the preview
            hoverClone.classList.add('opacity-50', 'pointer-events-none', 'relative', 'transform-none')
            
            // Append the clone to the dropzone
            dropzone.appendChild(hoverClone);
        }
    },
    ondragleave: function (event) {
        const dropzone = event.target;

        // Remove the hover clone when the element leaves the dropzone
        if(hoverClone && dropzone.contains(hoverClone)){
            dropzone.removeChild(hoverClone);
            hoverClone = null;
        }
    },
  })
  .on('dropactivate', function (event) {
    event.target.classList.add('drop-activated');
  });

  interact('*[data-draggable]').draggable({
    // autoScroll: true,
    listeners: {
        start (event) {
            // Create a preview of the dragged element
            previewElement = event.target.cloneNode(true);
            
            //Add necessary styles to make it visible and follow the cursor
            previewElement.classList.add('bg-white', 'w-[300px]', 'py-2', 'pe-3', 'z-[1000]', 'opacity-70', 'pointer-events-none', 'absolute');
            
            // Append the preview to the body
            document.body.appendChild(previewElement);

            // Initially position the preview under the cursor
            updatePreviewPosition(event.clientX, event.clientY);
        },
        move (event) {
            // Update the preview's position to follow the cursor
            updatePreviewPosition(event.clientX, event.clientY);
        },
        end (event) {
            // Clean up the preview element after dragging ends
            if (previewElement) {
                document.body.removeChild(previewElement);
                previewElement = null;
            }
        }
    }
});

// Helper function to update the preview position
function updatePreviewPosition(x, y) {
  // Set the preview's position to be centered under the cursor
  const offsetX = previewElement.offsetWidth / 2;
  const offsetY = previewElement.offsetHeight / 2;

  previewElement.style.left = `${x - offsetX}px`;
  previewElement.style.top = `${y - offsetY}px`;
}

async function updateStatus(zone, taskId){
    let status = 'assigned';

    if(zone === 'dropzone-assigned'){
        status = 'assigned';
    }else if(zone === 'dropzone-inprogress'){
        status = 'in-progress';
    }else{
        status = 'done';
    }

    await updateTaskStatus(taskId, status);
}
</script>

<template>
    <div class="grid grid-cols-3 gap-5 absolute top-0 bottom-0 right-0 left-0 p-5 select-none">
        <Card class="grid-cols-1 cursor-pointer h-full -mb-10 Z-10" id="dropzone-assigned">
            <template #title>
                <div class="flex items-center justify-between py-0.5">
                    <p>Assigned</p>
                    
                    <AddTaskDialog />
                </div>
            </template>

            <template #content>
                <ScrollPanel :pt="{
                    content: {
                        'data-dropzone': true,
                    },
                }" :key="projectStore.selectedProject ? projectStore.selectedProject.id : null" class="w-full h-[calc(100dvh-16rem)] p-2 !z-20">
                    <div class="w-full h-full flex items-center justify-center" v-if="projectStore.istTaskListLoading">
                        <BeatLoader />
                    </div>
                    
                    <div v-else v-for="task in getFilteredTasks('assigned')" :key="task.id" class="p-3 my-3 mx-1 shadow-sm leading-tight border rounded !z-30" data-draggable :data-taskid="task.id">
                        <p v-text="task.title"></p>
                        <small>
                            <span v-if="task.user">
                                {{ task.user.name }}
                            </span>

                            <span v-else>
                                N/A
                            </span>
                        </small>
                    </div>
                </ScrollPanel>
            </template>
        </Card>

        <Card class="grid-cols-1 cursor-pointer h-full -mb-10 z-10" id="dropzone-inprogress">
            <template #title>
                <div class="flex items-center justify-between py-1">
                    <p>In Progress</p>
                </div>
            </template>

            <template #content>
                <ScrollPanel :pt="{
                    content: {
                        'data-dropzone': true,
                    },
                }" :key="projectStore.selectedProject ? projectStore.selectedProject.id : null" class="w-full h-[calc(100dvh-16rem)] p-2 !z-20">
                    <div class="w-full h-full flex items-center justify-center" v-if="projectStore.istTaskListLoading">
                        <BeatLoader />
                    </div>
                    
                    <div v-else v-for="task in getFilteredTasks('in-progress')" :key="task.id" class="p-3 my-3 mx-1 shadow-sm leading-tight border rounded !z-30" data-draggable :data-taskid="task.id">
                        <p v-text="task.title"></p>
                        <small>
                            <span v-if="task.user">
                                {{ task.user.name }}
                            </span>

                            <span v-else>
                                N/A
                            </span>
                        </small>
                    </div>
                </ScrollPanel>
            </template>
        </Card>

        <Card class="grid-cols-1 cursor-pointer h-full -mb-10 z-10" id="dropzone-done">
            <template #title>
                <div class="flex items-center justify-between py-1">
                    <p>Done</p>
                </div>
            </template>

            <template #content>
                <ScrollPanel :pt="{
                    content: {
                        'data-dropzone': true,
                    },
                }" :key="projectStore.selectedProject ? projectStore.selectedProject.id : null" class="w-full h-[calc(100dvh-16rem)] p-2 !z-20">
                    <div class="w-full h-full flex items-center justify-center" v-if="projectStore.istTaskListLoading">
                        <BeatLoader />
                    </div>
                    
                    <div v-else v-for="task in getFilteredTasks('done')" :key="task.id" class="p-3 my-3 mx-1 shadow-sm leading-tight border rounded !z-30" data-draggable :data-taskid="task.id">
                        <p v-text="task.title"></p>
                        <small>
                            <span v-if="task.user">
                                {{ task.user.name }}
                            </span>

                            <span v-else>
                                N/A
                            </span>
                        </small>
                    </div>
                </ScrollPanel>
            </template>
        </Card>
    </div>
</template>