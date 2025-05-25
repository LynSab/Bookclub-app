<script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router';

  const route = useRoute()
  const error = ref()
  const currentClub = ref({})
  const loading = ref(true)

  async function fetchCurrentClub(clubId) {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      }
      const result = await fetch('http://localhost:8080/club/' + clubId, requestOptions)
        const data = await result.json()
        currentClub.value = data
      } catch(err) {
        error.value = 'Unable to fetch data. Please try again.'
      }
    loading.value = false
  }

fetchCurrentClub(route.params.clubId)
</script>

<template>
  <div v-if="loading" class="w-4 h-4 border-2 border-t-transparent border-cyan-500 rounded-full animate-spin"></div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <h3 class="text-xl font-semibold">{{ currentClub.name }}</h3>
    <div>
      <h4 class="text-m font-semibold">Members:</h4>
      <ul>
        <li v-for="member in currentClub.members">{{ member }}</li>
      </ul>
      <h4 class="text-m font-semibold">Current Book: </h4>
      {{ currentClub.book.name }} by {{ currentClub.book.author }} 
        <h4 class="text-m font-semibold">Next Meeting Date: </h4>
        {{ currentClub.meeting }}
    </div>
  </div>
</template>

<style scoped></style>