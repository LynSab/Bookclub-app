<script setup>
</script>

<template>
  <div class = "grid-cols-1 border p-5">
    <div class="col-1">
      <h1 class="text-6xl font-bold text-center text-cyan-800">chapters.</h1>
      <button class="fixed top-3 right-3 shadow-lg border-1 rounded-md p-1 ml-5 cursor-pointer active:bg-slate-200">Account</button>
    </div>
  </div>

  <div class="grid grid-cols-5 rows-1">
    <div class="min-h-[calc(100vh-102px)] border">
      <button class="w-full shadow-lg border-1 p-2 cursor-pointer active:bg-slate-200">
        My Bookclubs
      </button>

      <button class="w-full shadow-lg border-1 p-2 cursor-pointer active:bg-slate-200">
        Create a new club
      </button>
    </div>
    <div class="col-span-4 p-3">main content</div>
  </div>
</template>

<style scoped>
</style>