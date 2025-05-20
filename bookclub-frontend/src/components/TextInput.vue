<script setup>
  const props = defineProps(['legendText'])
  const title = defineModel('title')
</script>

<template>
  <div>
    <fieldset class="block m-5 text-base border rounded-md border-slate-600">
      <legend class="mt-3 ml-3">{{props.legendText}}</legend>
      <input class="outline-none" v-model="title"/>
    </fieldset>
  </div>
</template>