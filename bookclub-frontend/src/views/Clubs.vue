<script setup>
  import { ref } from 'vue'
  import router from '../router';
  import { bookclubs } from '../dummy-book-clubs';
</script>

<template>
  <h3 class="text-xl font-semibold">My Clubs</h3>
  <div class="p-3" v-for="bookclub in bookclubs">
    <button @click="router.push({ name: 'ClubView', params: {clubId: bookclub.id}})" class="cursor-pointer active:bg-slate-200">{{ bookclub.name }}</button>
  </div>
</template>

<style scoped></style>