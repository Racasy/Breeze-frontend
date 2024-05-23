<script setup>
import AdminFileTable from '@/components/AdminFileTable.vue'
import { useUsers } from '@/stores/user.js';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import { onBeforeMount, computed, ref } from 'vue';
import Dropdown from '@/components/Dropdown.vue'
import axios from 'axios';

const { userData } = useUsers();

const store = useUsers();

onBeforeMount(() => {
    store.getData()
});

const companies = ref([]);
const selectedCompany = ref(null);

const fetchCompanies = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/companies');
        companies.value = response.data;
    } catch (error) {
        console.error("Error fetching companies:", error);
    }
};

const selectCompany = (company) => {
    selectedCompany.value = company;
    console.log("Selected company:", company);
};

onBeforeMount(() => {
    fetchCompanies();
});
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <div class="flex items-center sm:ml-6">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight mr-4">
                    All files of:
                </h2>
                <Dropdown>
                    <template #trigger="{ open }">
                        <button class="text-gray-800 font-semibold text-xl py-2 px-4 rounded inline-flex items-center">
                            <span>Select Company</span>
                            <svg class="fill-current w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M5.516 7.548c0.436-0.446 1.043-0.481 1.576 0l2.908 2.957 2.908-2.957c0.533-0.481 1.141-0.446 1.576 0 0.436 0.445 0.408 1.197 0 1.615l-3.492 3.541c-0.533 0.481-1.408 0.481-1.941 0l-3.492-3.541c-0.408-0.418-0.436-1.17 0-1.615z"/>
                            </svg>
                        </button>
                    </template>
                    <template #content>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" v-for="company in companies" :key="company.id" @click="selectCompany(company)">
                            {{ company.company_name }}
                        </a>
                    </template>
                </Dropdown>
            </div>
        </template>

        <div class="py-12 flex justify-center">
            <div class="bg-white shadow-sm rounded-md p-4">
                <AdminFileTable />
            </div>
        </div>
    </AuthenticatedLayout>
</template>
