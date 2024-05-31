<script setup>
    import { useUsers } from '@/stores/user.js';
    import { onBeforeMount, computed } from 'vue';
    import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
    import ProfileSidebar from '@/components/ProfileSidebar.vue';

    const { userData } = useUsers();

    const store = useUsers();


    onBeforeMount(() => {
        store.getData()
    })

    const fetchCompanyContactInfo = async () => {
    try {
        const response = await axios.get('/api/companies-with-info');
        const company = response.data.find(c => c.id === userData.company_id);
        if (company) {
            companyContactInfo.value = company.contact_info;
        }
    } catch (error) {
        console.error("Error fetching company contact info:", error);
    }
};


</script>


<template>
  <AuthenticatedLayout>
    <div class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8 rounded">
      <div class="grid grid-cols-3 gap-1">
        <ProfileSidebar></ProfileSidebar>

        <!-- Pats userprofile -->
        <div class="col-span-2">
          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Company Profile
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Company details.
              </p>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Company type
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ userData.company.company_type }}
                  </dd>
                </div>

                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Company name
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ userData.company.company_name }}
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Address
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Email
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
  