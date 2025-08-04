<script setup>
  import { ref } from 'vue'
  import router from '../router';
  import TextInput from '../components/TextInput.vue';

  const userId = ref()
  const error = ref()
  const email = ref()
  const password = ref()
  const loginError = ref('')

  async function login(loginEmail, loginPassword) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: loginEmail, password: loginPassword}),
        credentials: 'include'
      }
      const result = await fetch('http://localhost:8080/user/login/', requestOptions)
      const data = await result.json()
      if (data.success == true) {
        userId.value = data.body.id
        router.push({name: 'HomeContent'})
      } else {
        loginError.value = data.body
      }
    } catch(err) {
      error.value = 'Unable to fetch data. Please try again.'
    }
  }

  function handler(userEmail, userPassword) {
    loginError.value = ''
    login(userEmail, userPassword)
  }
</script>

<template>
  <div class="grid grid-rows-3 h-screen place-content-center">
    <div class="text-5xl text-slate-600 col-start-2 self-center">
      <h1>chapters.</h1>
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-else class="shadow-lg border-2 rounded-md text-slate-600 bg-white row-start-2 col-start-2 p-3">
      <h1 class="m-4 text-2xl font-semibold">Login</h1>
      <TextInput legend-text="Email" v-model:title="email"/>
      <TextInput type="password" legend-text="Password" v-model:title="password"/> 
      <button @click='handler(email, password)'class="shadow-lg border-1 rounded-md p-1 ml-5 cursor-pointer active:bg-slate-200">Log in</button>
      <div v-if="loginError"> {{ loginError }} </div>
    </div>
  </div>
</template>

<style scoped>
</style>