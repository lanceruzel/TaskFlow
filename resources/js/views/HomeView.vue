<script setup>
import ScrollPanel from 'primevue/scrollpanel';
import Card from 'primevue/card';
import AddTaskDialog from '../components/AddTaskDialog.vue';
import interact from 'interactjs';

let previousDropzone = null;
let previewElement = null;

interact('*[data-dropzone]')
  .dropzone({
    ondrop: function (event) {
        const droppedElement = event.relatedTarget; // The element being dragged
        const newDropzone = event.target; // The new dropzone

        const taskId = droppedElement.getAttribute('data-taskid');
        
        // Remove the element from the previous dropzone, if it exists
        if (previousDropzone && previousDropzone !== newDropzone) {
        previousDropzone.removeChild(droppedElement);
        }

        // Append the element to the new dropzone
        newDropzone.appendChild(droppedElement);

        // Update the previousDropzone to the new one
        previousDropzone = newDropzone;

        console.log('Task: ' + taskId + ' was dropped into ' + newDropzone.id);
    }
  })
  .on('dropactivate', function (event) {
    event.target.classList.add('drop-activated');
  });

  interact('*[data-draggable]').draggable({
  listeners: {
    start (event) {
      // Create a preview of the dragged element
      previewElement = event.target.cloneNode(true);
      
      // Add necessary styles to make it visible and follow the cursor
      previewElement.style.position = 'absolute';
      previewElement.style.pointerEvents = 'none'; // Prevent interaction with the preview
      previewElement.style.opacity = '0.7'; // Semi-transparent preview
      previewElement.style.zIndex = '1000'; // Make sure it's above other elements
      
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
</script>

<template>
    <div class="grid grid-cols-3 gap-5 absolute top-0 bottom-0 right-0 left-0 p-5">
        <Card class="grid-cols-1 cursor-pointer h-full -mb-10 Z-10" id="dropzone-assigned">
            <template #title>
                <div class="flex items-center justify-between py-1.5">
                    <p>Assigned</p>
                    
                    <AddTaskDialog />
                </div>
            </template>

            <template #content>
                <ScrollPanel :pt="{
                    content: {
                        'data-dropzone': true,
                    },
                }" class="w-full h-[calc(100dvh-19rem)] p-2 !z-20">
                    <div v-for="i in 3" :key="i" class="p-3 my-3 mx-1 shadow-sm leading-tight border rounded !z-30 select-none" data-draggable :data-taskid="i">
                        <p>UI Layout</p>
                        <small>Frank Molina</small>
                    </div>
                </ScrollPanel>
            </template>
        </Card>

        <Card class="grid-cols-1 cursor-pointer h-full -mb-10 z-10" id="dropzone-inprogress">
            <template #title>
                <div class="flex items-center justify-between">
                    <p>In Progress</p>
                </div>
            </template>

            <template #content>
                <ScrollPanel :pt="{
                    content: {
                        'data-dropzone': true,
                    },
                }" class="w-full h-[calc(100dvh-19rem)] p-2 !z-20">
                    <div v-for="i in 3" :key="i" class="p-3 my-3 mx-1 shadow-sm leading-tight border rounded !z-30 select-none" data-draggable :data-taskid="i">
                        <p>UI Layout</p>
                        <small>Frank Molina</small>
                    </div>
                </ScrollPanel>
            </template>
        </Card>

        <Card class="grid-cols-1 cursor-pointer h-full -mb-10 z-10" id="dropzone-done">
            <template #title>
                <div class="flex items-center justify-between">
                    <p>Done</p>
                </div>
            </template>

            <template #content>
                <ScrollPanel :pt="{
                    content: {
                        'data-dropzone': true,
                    },
                }" class="w-full h-[calc(100dvh-19rem)] p-2 !z-20">
                    <div v-for="i in 3" :key="i" class="p-3 my-3 mx-1 shadow-sm leading-tight border rounded !z-30 select-none" data-draggable :data-taskid="i">
                        <p>UI Layout</p>
                        <small>Frank Molina</small>
                    </div>
                </ScrollPanel>
            </template>
        </Card>
    </div>
</template>