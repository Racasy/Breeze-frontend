<script setup>
    import UploadFilesComp from '@/components/UploadFilesComp.vue'
    import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Upload files</h2>
        </template>

        <div class="max-w-7xl mx-auto py-12 flex-1">
            <div class="sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <UploadFilesComp/>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
