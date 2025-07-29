<script setup>
  import { ref } from 'vue'
  import TextInput from '../components/TextInput.vue';

  const newClub = ref()
  const error = ref()
  const clubError = ref()
  const clubSuccess = ref()


  async function addNewClub(clubName) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: clubName}),
        credentials: 'include'
      }

      const result = await fetch('http://localhost:8080/club/new', requestOptions)
      const data = await result.json()

      if (data.success == true) {
        clubSuccess.value = data.body
      } else{
        clubError.value = data.body
      }
    } catch (err) {
        error.value = 'Unable to fetch data. Please try again.'
    }
  }

  function handler(newClubName) {
    addNewClub(newClubName)
  }

</script>

<template>
  <div>
    Enter name for new club:
    <TextInput pt-5 legend-text="clubname" v-model:title="newClub"/>
    <button @click='handler(newClub)' class="shadow-lg border-1 rounded-md p-1 ml-5 cursor-pointer active:bg-slate-200">Submit</button>
  </div>
</template>

<style scoped></style>