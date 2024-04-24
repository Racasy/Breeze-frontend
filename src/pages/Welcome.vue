<script setup>
import { useUsers } from '@/stores/user'

const store = useUsers()

const auth = store.authUser
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    <header class="bg-[#FFEDD8] p-4 flex justify-between items-center">
      <img class="h-12" src="../assets/logo1.png" alt="Logo" />

      <div>
        <router-link
          v-if="!auth"
          to="/login"
          class="bg-[#EABE6C] text-[#891652] py-2 px-4 mr-2 rounded font-bold"
        >
          Log in
        </router-link>
        <router-link
          v-if="!auth"
          to="/register"
          class="bg-[#891652] text-[#EABE6C] py-2 px-4 rounded font-bold"
        >
          Register
        </router-link>
        <router-link
          v-if="auth"
          to="/dashboard"
          class="text-sm text-gray-700 dark:text-gray-400 underline"
        >
          Dashboard
        </router-link>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex-grow container mx-auto px-6 py-12">
      <!-- Dynamic Content -->
      <router-view />
    </div>

    <!-- Footer -->
    <footer class="bg-[#EABE6C] text-center p-4">
      © 2024 "SIA Abrams Business Services". All rights reserved.
    </footer>
  </div>
</template>

<style scoped>
footer {
  font-size: 0.9rem;
}
</style>
