import axios from '@/lib/axios';
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia';

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useFilesStore = defineStore('files', {
  state: () => ({
    files: [],
    file: null,
    comment: '',
    errors: {},
  }),

  getters: {
    // No getters rn
  },

  actions: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },

    fetchFiles() {
      axios.get('/api/get-files')
        .then(response => {
          this.files = response.data;
        })
        .catch(error => {
          console.error('There was an error fetching the files:', error);
        });
    },

    deleteFile(fileId) {
      axios.delete(`/api/delete-file/${fileId}`)
        .then(() => {
          alert('File deleted successfully');
          this.fetchFiles();
          location.reload();
        })
        .catch(error => {
          console.error('Error deleting the file:', error);
          alert('Failed to delete the file');
        });
    },

    viewFile(fileId) {
      //const url = `/api/view-file/${fileId}`;
      //window.open(url, '_blank');
      //hard codeoju lh/8000/api, jo izmantojot augstāk minēto viņš atver 3000 portu
      window.open(`http://localhost:8000/api/view-file/${fileId}`, '_blank');
    },

    downloadFile(fileId) {
      //hard codeoju lh/8000/api, jo izmantojot augstāk minēto viņš atver 3000 portu
      window.open(`http://localhost:8000/api/download-file/${fileId}`);
    },

    updateFileComment(fileId, newComment) {
      axios.put(`/api/update-comment/${fileId}`, { comment: newComment })
        .then(response => {
          if (response.data.success) {
            const file = this.files.find(f => f.id === fileId);
            if (file) {
              file.comment = newComment;
            }
            location.reload();
          }
        })
        .catch(error => {
          console.error('Failed to update comment:', error);
          alert('Error updating comment');
        });
    },

    async submitFile() {
      if (!this.file) {
        alert('Please select a file to upload');
        return;
      }

      try {
        await csrf()

        let formData = new FormData();
        formData.append('file', this.file, this.file.name);
        formData.append('comment', this.comment);

        const response = await axios.post('/api/upload-file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        alert(response.data.success);
        this.comment = '';
        this.file = null;
        this.errors = {};
      } catch (error) {
        if (!error.response) {
          console.error('An error occurred:', error);
          alert('An error occurred. Please check your network and try again.');
          return;
        }

        switch (error.response.status) {
          case 422:
            this.errors = error.response.data.errors || {};
            break;
          case 413:
            this.errors = { file: ['The file is too large to upload.'] };
            break;
          default:
            console.error('An unexpected error occurred:', error);
            alert('An unexpected error occurred. Please try again.');
            break;
        }
      }
    },
  },
});
