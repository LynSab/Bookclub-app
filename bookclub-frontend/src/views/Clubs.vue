<script setup>
  import { ref } from 'vue'
  import router from '../router';

  const error = ref()
  const bookclubs = ref([])
  async function fetchClubs() {
    try {
      const result = await fetch('http://localhost:8080/club/')
      const data = await result.json()
      bookclubs.value = data
    } catch(err) {
      error.value = 'Unable to fetch data. Please try again.'
    }
  }

fetchClubs()
</script>

<template>
  <h3 class="text-xl font-semibold">My Clubs</h3>
  <div v-if="error">{{ error }}</div>
  <div v-else class="p-3" v-for="bookclub in bookclubs">
    <button @click="router.push({ name: 'ClubView', params: {clubId: bookclub.id}})" class="cursor-pointer active:bg-slate-200">{{ bookclub.name }}</button>
  </div>
</template>

<style scoped></style>