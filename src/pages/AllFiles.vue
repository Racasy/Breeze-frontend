<script setup>
    import FileTable from '@/components/FileTable.vue'
    import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">All your files</h2>
        </template>

        <div class="py-12 flex-1">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm rounded-md">
                    <FileTable class="touch-none"/>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
