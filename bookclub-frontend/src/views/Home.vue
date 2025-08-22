<script setup>
import router from '../router';
import { ref } from 'vue';

const error = ref();

async function logout() {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      };
      const result = await fetch('http://localhost:8080/user/logout/', requestOptions);
      result.json();
      
      router.push({ name: 'Login' });
    } catch {
      error.value = 'Unable to logout. Please try again.';
    }
}
</script>

<template>
    <div class="bg-[url('./assets/imgs/books.png')] bg-cover h-screen content-center">
    <div class = "grid-cols-1 p-5">
      <div class="col-1">
        <h1 class="text-6xl font-bold text-center text-white">chapters.</h1>
        <button @click="logout()" class="fixed top-3 right-3 shadow-lg border-1 rounded-md p-1 ml-5 cursor-pointer active:bg-slate-200 text-white">Logout</button>
        <div v-if="error"> {{ error }}</div>
      </div>
    </div>
  
    <div class="grid grid-cols-5 rows-1">
      <div class="min-h-[calc(100vh-102px)] text-white bg-black/10">
        <button @click="router.push({ name: 'Clubs' })" class="bg-[url('./assets/imgs/book_spine_brown.png')] bg-cover w-full shadow-lg p-2 cursor-pointer active:bg-slate-200">
          My Bookclubs
        </button>
  
        <button @click="router.push({ name: 'NewClub' })" class="bg-[url('./assets/imgs/book_spine_red.png')] bg-cover w-full shadow-lg p-2 cursor-pointer active:bg-slate-200">
          Create a new club
        </button>
  
        <button @click="router.push({ name: 'Account' })" class="bg-[url('./assets/imgs/book_spine_yello.png')] bg-cover w-full shadow-lg p-2 cursor-pointer active:bg-slate-200">
          My Account
        </button>
      </div>
      <div class="col-span-4 p-3 bg-black/30">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>