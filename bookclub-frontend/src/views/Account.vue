<script setup>
  import { ref } from 'vue';
  import router from '../router';
  import TextInput from '../components/TextInput.vue';


  const username = ref();
  const changeUsername = ref(false);
  const newUsername = ref();
  const email = ref();
  const changeEmail = ref(false);
  const newEmail = ref();
  const password = ref();
  const oldPassword = ref();
  const changePassword = ref(false);
  const error = ref();
  const passwordMessage = ref();


  async function fetchAccountDetails() {
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
        email.value = data.body.email;
      }

    } catch {
      error.value = 'Unable to fetch data. Please try again.';
    }    
  }

  async function updateUsername(username) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username}),
        credentials: 'include'
      }; 

      const result = await fetch('http://localhost:8080/user/update', requestOptions);
      const data = await result.json();

      if (data.cookieError) {
        router.push({ name: 'Login' });
      } else if (data.success == true) {
        fetchAccountDetails();
      } else {
        error.value = data.body;
      }

    } catch {
      error.value = 'Unable to fetch data. Please try again.';
    }
  }

  async function updateEmail(email) {
    try {
        const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email}),
        credentials: 'include'
      }; 

      const result = await fetch('http://localhost:8080/user/update', requestOptions);
      const data = await result.json();

      if (data.cookieError) {
        router.push({ name: 'Login' });
      } else if (data.success == true) {
        fetchAccountDetails();
      } else {
        error.value = data.body;
      }

    } catch {
        error.value = 'Unable to fetch data. Please try again.';
    }
  }

  async function updatePassword(currentPword, newPword) {
    try {
        const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({currentPassword: currentPword, newPassword: newPword}),
        credentials: 'include'
      }; 

      const result = await fetch('http://localhost:8080/user/update', requestOptions);
      const data = await result.json();

      if (data.cookieError) {
        router.push({ name: 'Login' });
      } else if (data.success == true) {
        fetchAccountDetails();
        passwordMessage.value = 'Password Changed Successfully';
        setTimeout(() => passwordMessage.value = false, 2000);
        console.log(passwordMessage);
      } else {
        error.value = data.body;
      }

    } catch {
        error.value = 'Unable to fetch data. Please try again.';
    }
  }

  fetchAccountDetails();

</script>

<template>
    <div class="text-xl font-semibold mb-5 text-white">Your Account Details:</div>
    <div class="text-white">
        Username: {{ username }} <button @click="changeUsername = !changeUsername" class="shadow-lg border-1 rounded-md p-1 m-5 font-normal italic text-sm cursor-pointer active:bg-slate-200">Change Username</button>
    </div>
    <div class="columns-3 m-2 text-white" v-if="changeUsername"><TextInput legend-text="New Username" v-model:title="newUsername"/><button @click='updateUsername(newUsername), changeUsername = false, newUsername = ""' class="shadow-lg border-1 rounded-md p-1 my-9 font-normal italic text-white text-sm cursor-pointer active:bg-slate-200">Submit</button></div>

    <div class="text-white">
        Email: {{ email }} <button @click="changeEmail = !changeEmail" class="shadow-lg border-1 rounded-md p-1 m-5 font-normal italic text-sm cursor-pointer active:bg-slate-200">Change Email</button>
    </div>
    <div class="columns-3 m-2 text-white" v-if="changeEmail"><TextInput legend-text="New Email" v-model:title="newEmail"/><button @click='updateEmail(newEmail), changeEmail = false, newEmail = ""' class="shadow-lg border-1 rounded-md p-1 my-9 font-normal italic text-white text-sm cursor-pointer active:bg-slate-200">Submit</button></div>

    <div class="text-white">
        Password: <button @click="changePassword = !changePassword" class="shadow-lg border-1 rounded-md p-1 m-5 font-normal italic text-sm cursor-pointer active:bg-slate-200">Change Email</button>
    </div>
    <div class="columns-3 m-2 text-white" v-if="changePassword">
        <TextInput type="password" legend-text="Current Password" v-model:title="oldPassword"/>
    </div>
    <div class="columns-3 m-2 text-white" v-if="changePassword">
        <TextInput type="password" legend-text="New Password" v-model:title="password"/><button @click='updatePassword(oldPassword, password), changePassword = false, oldPassword = "", password = ""' class="shadow-lg border-1 rounded-md p-1 my-9 font-normal italic text-white text-sm cursor-pointer active:bg-slate-200">Submit</button>
    </div>
    <div v-if="passwordMessage" class="text-white italic">{{ passwordMessage }}</div>

</template>

<style scoped>
</style>