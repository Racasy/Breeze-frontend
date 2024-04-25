<template>
  <div class="mt-5 w-full">
    <div v-if="files && files.length">
      <table class="min-w-full divide-y divide-gray-200 rounded-md">
        <thead class="bg-gray-50 ">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded by</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size (MB)</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(file, index) in files" :key="file.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ index + 1 }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ file.uploaded_by }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ file.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ file.comment }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ (file.size / (1024 * 1024)).toFixed(2) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <FileDropdown :fileId="file.id"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="alert-info">
      No files have been uploaded yet.
    </div>
  </div>
</template>

<script>
import axios from '@/lib/axios'
import Dropdown from './Dropdown.vue';
import DropdownLink from './DropdownLink.vue';
import FileDropdown from './FileDropdown.vue';

const csrf = () => axios.get('/sanctum/csrf-cookie')

export default {
  name: 'FilesTable',
  components: {
    Dropdown,
    DropdownLink,
    FileDropdown
  },
  data() {
    return {
      files: [],
    };
  },
  mounted() {
    this.fetchFiles();
  },
  methods: {
    fetchFiles() {
      csrf()
      axios.get('http://localhost:8000/api/get-files')
        .then(response => {
          this.files = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the files:', error);
        });
    },
  }
};
</script>

  