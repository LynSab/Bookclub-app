<script setup>
  const {legendText, type='text'} = defineProps(['legendText', 'type'])
  const title = defineModel('title')
</script>

<template>
  <div>
    <fieldset class="block m-5 text-base border rounded-md border-white">
      <legend class="mt-3 ml-3">{{legendText}}</legend>
      <input :type="type" class="w-full outline-none" v-model="title"/>
    </fieldset>
  </div>
</template>