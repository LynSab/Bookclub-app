<script setup>
  import { ref } from 'vue';
  import TextInput from '../components/TextInput.vue';
  import router from '../router';


  const newClub = ref();
  const error = ref();
  const clubSuccess = ref();


  async function addNewClub(clubName) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: clubName}),
        credentials: 'include'
      };

      const result = await fetch('http://localhost:8080/club/new', requestOptions);
      const data = await result.json();

      if (data.success == true) {
        clubSuccess.value = data.body;
      } else if (data.cookieError) {
          router.push({ name: 'Login' });
      } else {
        error.value = data.body;
      }
      
    } catch {
        error.value = 'Error. Please try again';
    }
  }

  function handler(newClubName) {
    addNewClub(newClubName);
  }

</script>

<template>
  <div class="text-white">
    Enter name for new club:
    <TextInput pt-5 legend-text="clubname" v-model:title="newClub"/>
    <button @click='handler(newClub), newClub = ""' class="shadow-lg border-1 rounded-md p-1 ml-5 cursor-pointer active:bg-slate-200">Submit</button>
  </div>
  <div class="text-white" v-if="error">{{ error }}</div>
  <div class="text-white" v-if="clubSuccess">{{ clubSuccess }}</div>
</template>

<style scoped></style>