<template>
  <div class="w-full overflow-x-auto">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">Files</h2>
      <span class="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
        <h2 class="bg-[#FFEDD8] inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">Sort by: </h2>
        <button @click="sortFiles('size')"
          class="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
        >
          Size
        </button>
      
        <button @click="sortFiles('date')"
          class="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
        >
          Date
        </button>
      
        <button @click="resetToDefaults"
          class="bg-[#d39fb7] inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
        >
          To defaults
        </button>
      </span>
    </div>
    <div v-if="files && files.length">
      <table class="min-w-full divide-y divide-gray-200 rounded-md">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In company</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded by</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Path</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size (MB)</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(file, index) in sortedFiles" :key="file.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ index + 1 }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ file.company }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ file.uploaded_by }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ file.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ file.path }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ file.comment }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ (file.size / (1024 * 1024)).toFixed(2) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <FileDropdown :fileId="file.id"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="alert-info p-4 bg-blue-100 border border-blue-200 rounded text-blue-700">
      No files have been uploaded yet.
    </div>
  </div>
</template>

<script>
import axios from '@/lib/axios';
import Dropdown from './Dropdown.vue';
import DropdownLink from './DropdownLink.vue';
import FileDropdown from './FileDropdown.vue';

const csrf = () => axios.get('/sanctum/csrf-cookie');

export default {
  name: 'FilesTable',
  props: {
    selectedCompany: {
      type: Object,
      default: null
    }
  },
  components: {
    Dropdown,
    DropdownLink,
    FileDropdown
  },
  data() {
    return {
      files: [],
      sortKey: 'date',
      sortAsc: true 
    };
  },
  computed: {
    sortedFiles() {
      let sortedFiles = [...this.files];
      if (this.sortKey === 'size') {
        sortedFiles.sort((a, b) => this.sortAsc ? a.size - b.size : b.size - a.size);
      } else if (this.sortKey === 'date') {
        sortedFiles.sort((a, b) => {
          const dateA = parseInt(a.name.split('_')[0], 10);
          const dateB = parseInt(b.name.split('_')[0], 10);
          return this.sortAsc ? dateA - dateB : dateB - dateA;
        });
      }
      return sortedFiles;
    }
  },
  watch: {
    selectedCompany: 'fetchFiles'
  },
  mounted() {
    this.fetchFiles();
  },
  methods: {
    fetchFiles() {
      csrf();
      const params = this.selectedCompany ? { company_id: this.selectedCompany.id } : {};
      axios.get('/api/get-files-admin', { params })
        .then(response => {
          this.files = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the files:', error);
        });
    },
    sortFiles(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true; 
      }
    },
    resetToDefaults() {
      this.sortKey = 'date'; 
      this.sortAsc = true;   
    }
  }
};
</script>
