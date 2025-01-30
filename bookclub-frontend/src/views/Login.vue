<script setup>
  import TextInput from '../components/TextInput.vue';
</script>

<template>
  <div class="box-content shadow-lg size-80 border-2 rounded-md m-auto p-5">
    <h1 class="m-5 text-2xl font-semibold">Login</h1>
     
    <TextInput legend-text="Email"/>
    <TextInput legend-text="Password"/>
  </div>
</template>

<style scoped>
</style>