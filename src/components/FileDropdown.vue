<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useFilesStore } from '@/stores/file'
import { computed, ref, onMounted, defineProps } from 'vue'

const props = defineProps({
  fileId: Number
});

const filesStore = useFilesStore();

const fileList = computed(() => filesStore.files);

const deleteFiles = (fileId) => {
  filesStore.deleteFile(fileId);
};

const viewFile = (fileId) => {
    filesStore.viewFile(fileId)
};

const download = (fileId) => {
  filesStore.downloadFile(fileId)
};

const editComment = (fileId) => {
  const newComment = prompt('Enter the new comment: ');
  if (newComment !== null && newComment.trim() !== '') {
    filesStore.updateFileComment(fileId, newComment);
  }
};

onMounted(filesStore.fetchFiles);

</script>

<template>
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Options
          <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </MenuButton>
      </div>
  
      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <a @click="viewFile(props.fileId)" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View file</a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a @click="editComment(props.fileId)" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit Comment</a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a  @click="download(props.fileId)" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Download file</a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a @click="deleteFiles(props.fileId)" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Delete file</a>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </template>