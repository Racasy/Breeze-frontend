<script setup>
import { useRoute } from 'vue-router'
import { useFilesStore } from '@/stores/file'
import { computed, ref } from 'vue'

const filesStore = useFilesStore();

const file = computed(() => filesStore.file);
const comment = computed({
  get: () => filesStore.comment,
  set: value => { filesStore.comment = value; }
});
const errors = computed(() => filesStore.errors);

const { handleFileUpload, submitFile } = filesStore;

</script>

<template>
    <div class="flex justify-center">
      <form @submit.prevent="submitFile" class="w-full mt-4 ">
        <div class="mb-4">
          <input type="file" class="form-control block ml-3 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" @change="handleFileUpload" id="fileInput" aria-describedby="fileHelp">
          <div v-if="errors.file" class="alert alert-danger bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {{ errors.file.join(', ') }}
          </div>
          <div id="fileHelp" class="form-text ml-3 text-sm text-gray-600">Max upload size: 50MB. Supported filetypes: jpg, jpeg, png, csv, txt, xlx, xls, pdf, doc, docm, docx, odt, txt, csv, xls, xlsm, xlsm, xml</div>
        </div>
        <div class="mb-4">
          <input type="text" class="form-control block w-full ml-3 mr-4 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Enter a comment" v-model="comment">
          <div v-if="errors.comment" class="alert alert-danger bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {{ errors.comment.join(', ') }}
          </div>
        </div>
        <button type="submit" class="btn btn-primary w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Upload</button>
        <div v-if="Object.keys(errors).length > 0" class="alert alert-danger bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          Please correct the errors before submitting.
        </div>
      </form>
    </div>
  </template>
