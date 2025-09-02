<script setup>
import { ref } from 'vue';
import router from '../router';

const error = ref();
const bookclubs = ref([]);

async function fetchClubs() {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    };
    const result = await fetch('http://localhost:8080/club/', requestOptions);
    const data = await result.json();

    if (data.cookieError) {
      router.push({ name: 'Login' });
    } else {
      bookclubs.value = data;
    }
  } catch {
    error.value = 'Unable to fetch data. Please try again.';
  }
}

fetchClubs();
</script>

<template>
  <h3 class="text-xl font-semibold text-white">My Clubs</h3>
  <div v-if="error">{{ error }}</div>
  <div v-else class="p-3 text-white" v-for="bookclub in bookclubs" :key="bookclub.id">
    <button @click="router.push({ name: 'ClubView', params: {clubId: bookclub.id}})" class="cursor-pointer active:bg-slate-200">{{ bookclub.name }}</button>
  </div>
</template>

<style scoped></style>