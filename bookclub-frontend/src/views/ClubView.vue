<script setup>
import { useRoute } from 'vue-router';
import { getClubRecord } from '../dummy-book-clubs';
const route = useRoute()
const currentClub = getClubRecord(route.params.clubId)
</script>

<template>
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
</template>

<style scoped></style>