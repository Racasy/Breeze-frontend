import axios from '@/lib/axios'
import { useStorage } from '@vueuse/core'
import { defineStore, acceptHMRUpdate } from 'pinia'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useUsers = defineStore('users', {
    state: () => ({
        userData: useStorage('userData', []),
        authStatus: useStorage('authStatus', []),
    }),

    getters: {
        is_admin: state => state.userData.role === 'admin',
        authUser: state => state.authStatus === 204,
        hasUserData: state => Object.keys(state.userData).length > 0,
        hasVerified: state =>
            Object.keys(state.userData).length > 0
                ? state.userData.email_verified_at !== null
                : false,
    },

    actions: {
        async getData() {
            await csrf()
            axios.get('/api/user')
                .then(response => {
                    const company = response.data.company ? response.data.company.name : 'Not assigned';
                    
                    this.userData = {
                        ...response.data,
                        companyName: company
                    };
                })
                .catch(error => {
                    if (error.response && error.response.status !== 409) {
                        console.error('An error occurred while fetching user data:', error);
                    } else {
                    }
                });
        },

        async register(form, setErrors, processing) {
            await csrf()

            processing.value = true

            axios
                .post('/register', form.value)
                .then(response => {
                    this.authStatus = response.status
                    processing.value = false

                    this.router.push({ name: 'dashboard' })
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                })
        },

        async login(form, setErrors, processing) {
            await csrf()

            processing.value = true

            axios
                .post('/login', form.value)
                .then(response => {
                    this.authStatus = response.status;
                    console.log(response)
                    localStorage.setItem('authToken', response.data.token);
                    processing.value = false;

                    this.router.push({ name: 'dashboard' })
                })
                /*.catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                })*/
        },

        async forgotPassword(form, setStatus, setErrors, processing) {
            await csrf()

            processing.value = true

            axios
                .post('/forgot-password', form.value)
                .then(response => {
                    setStatus.value = response.data.status
                    processing.value = false
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                })
        },

        async resetPassword(form, setErrors, processing) {
            await csrf()

            processing.value = true

            axios
                .post('/reset-password', form.value)
                .then(response => {
                    this.router.push(
                        '/login?reset=' + btoa(response.data.status),
                    )
                    processing.value = false
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors.value = Object.values(
                        error.response.data.errors,
                    ).flat()
                    processing.value = false
                })
        },

        resendEmailVerification(setStatus, processing) {
            processing.value = true

            axios.post('/email/verification-notification').then(response => {
                setStatus.value = response.data.status
                processing.value = false
            })
        },

        async logout() {
            await axios
                .post('/logout')
                .then(() => {
                    this.$reset()
                    this.userData = {}
                    this.authStatus = []

                    this.router.push({ name: 'welcome' })
                })
                .catch(error => {
                    if (error.response.status !== 422) throw error
                })
        },
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUsers, import.meta.hot))
}
