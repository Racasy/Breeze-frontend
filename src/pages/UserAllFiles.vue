<script setup>
    import UserFileTable from '@/components/UserFileTable.vue'
    import { useUsers } from '@/stores/user.js';
    import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
    import { onBeforeMount, computed } from 'vue';

    const { userData } = useUsers();

    const store = useUsers();

    onBeforeMount(() => {
        store.getData()
    })
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                All files of: {{ userData.company.company_type }} {{ userData.company.company_name }}
            </h2>
        </template>

        <div class="py-12 flex-1">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="flex bg-white shadow-sm rounded-md">
                    <UserFileTable/>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
