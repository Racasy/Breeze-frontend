<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import { onBeforeMount, ref } from 'vue'
import axios from '@/lib/axios'
import { useUsers } from '@/stores/user'

const store = useUsers()

const auth = store.authUser
const admin = store.userData.is_admin

const companyCount = ref(0)
const fileCount = ref(0)
const userFileCount = ref(0)
const userCount = ref(0)

const fetchCounts = async () => {
    try {
        const [companyRes, fileRes, userFileRes, userRes] = await Promise.all([
            axios.get('/api/company-count'),
            axios.get('/api/file-count'),
            axios.get('/api/user-file-count'),
            axios.get('/api/user-count')
        ])
        companyCount.value = companyRes.data.company_count
        fileCount.value = fileRes.data.total_files
        userFileCount.value = userFileRes.data.user_files
        userCount.value = userRes.data.user_count
    } catch (error) {
        console.error('Error fetching counts:', error)
    }
}

onBeforeMount(() => {
    if (!store.hasUserData) {
        store.getData()
    }
    fetchCounts()
})

</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard
            </h2>
        </template>

        <div v-if="admin" class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="flex justify-around space-x-4">
                    <div class="bg-white shadow-md rounded-lg p-6 text-center flex-1">
                        <h3 class="text-2xl font-bold">{{ companyCount }}</h3>
                        <p class="font-bold">Total companies in system</p>
                    </div>
                    <div class="bg-white shadow-md rounded-lg p-6 text-center flex-1">
                        <h3 class="text-2xl font-bold">{{ fileCount }}</h3>
                        <p class="font-bold">Total files in system</p>
                    </div>
                    <div class="bg-white shadow-md rounded-lg p-6 text-center flex-1">
                        <h3 class="text-2xl font-bold">{{ userCount }}</h3>
                        <p class="font-bold">Total users</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="py-12">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="p-6 bg-white border-b border-gray-200">
                            You have uploaded {{ userFileCount }} files!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
