<script setup>
  import TextInput from '../components/TextInput.vue';
</script>

<template>
  <div class="grid grid-rows-3 h-screen place-content-center">
    <div class="text-5xl text-slate-600 col-start-2 self-center">
      <h1>Bookclub App</h1>
    </div>

    <div class="shadow-lg border-2 rounded-md text-slate-600 bg-white row-start-2 col-start-2">
      <h1 class="m-4 text-2xl font-semibold">Login</h1>
      <TextInput legend-text="Email"/>
      <TextInput legend-text="Password"/> 
      <button class="shadow-lg border-1 rounded-md p-1 ml-5 cursor-pointer active:bg-slate-200">Log in</button>
    </div>
  </div>
</template>

<style scoped>
</style>