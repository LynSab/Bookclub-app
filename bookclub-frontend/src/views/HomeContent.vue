<script setup>
import { ref } from 'vue';
import router from '../router';
  
const username = ref('user');
const error = ref();

async function fetchUsername() {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    };
    const result = await fetch('http://localhost:8080/user/get', requestOptions);
    const data = await result.json();
 
    if (data.cookieError) {
      router.push({ name: 'Login' });
    } else {
      username.value = data.body.name;
    }

  } catch {
    error.value = 'Unable to fetch data. Please try again.';
  }
}

fetchUsername();
</script>

<template>
    <div class="text-white">Hello {{ username }}, Welcome to chapters. your bookclub management app.</div>
</template>

<style scoped></style>