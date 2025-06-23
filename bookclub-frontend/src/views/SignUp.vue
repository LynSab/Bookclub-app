<script setup>
  import { ref } from 'vue'
  import router from '../router';
  import TextInput from '../components/TextInput.vue';

  const userId = ref()
  const error = ref()
  const username = ref()
  const email = ref()
  const password = ref()
  const passwordConfirmation = ref()
  const signUpError = ref('')

  async function signUp(signUpUsername, signUpEmail, signUpPassword) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: signUpUsername,email: signUpEmail, password: signUpPassword}),
        credentials: 'include'
      }
      const result = await fetch('http://localhost:8080/user/', requestOptions)
      const data = await result.json()
      if (data.success == true) {
        userId.value = data.body.id
        router.push({name: 'Login'})
      } else {
        signUpError.value = data.body
      }
    } catch(err) {
      error.value = 'Unable to fetch data. Please try again.'
    }
  }

  function handler(signUpUsername, signUpEmail, signUpPassword, pwordConf) {
    signUpError.value = ''
    if (signUpPassword === pwordConf) {
      signUp(signUpUsername, signUpEmail, signUpPassword)
    } else {
      signUpError.value = 'Passwords don\'t match'
    }
  }
</script>

<template>
  <div class="grid grid-rows-4 h-screen place-content-center">
    <div class="text-5xl text-slate-600 col-start-2 self-center">
      <h1>chapters.</h1>
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-else class="shadow-lg border-2 rounded-md text-slate-600 bg-white row-start-2 row-span-2 col-start-2">
      <h1 class="m-4 pt-5 text-2xl font-semibold">Sign-up</h1>
      <TextInput pt-5 legend-text="Username" v-model:title="username"/>
      <TextInput legend-text="Email" v-model:title="email"/>
      <TextInput type="password" legend-text="Password" v-model:title="password"/> 
      <TextInput type="password" legend-text="Confirm Password" v-model:title="passwordConfirmation"/> 
      <button @click='handler(username, email, password, passwordConfirmation)' class="shadow-lg border-1 rounded-md p-1 ml-5 cursor-pointer active:bg-slate-200">Sign-up</button>
      <div v-if="signUpError"> {{ signUpError }} </div>
    </div>
  </div>
</template>

<style scoped></style>