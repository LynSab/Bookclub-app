<script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router';
  import TextInput from '../components/TextInput.vue';
  import Datepicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css';
  import router from '../router';


  const route = useRoute()
  const error = ref()
  const currentClub = ref({})
  const loading = ref(true)
  let newMember = ref(false)
  const email = ref()
  let newBook = ref(false)
  const bookTitle = ref()
  const bookAuthor = ref()
  let newMeeting = ref(false)
  const meetingDate = ref()
  const meetingLocation = ref()

  async function fetchCurrentClub(clubId) {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      }
      const result = await fetch('http://localhost:8080/club/' + clubId, requestOptions)
        const data = await result.json()

        if (data.cookieError) {
          router.push({ name: 'Login' })
        } else {
          currentClub.value = data
          loading.value = false
        }

      } catch(err) {
        error.value = 'Unable to fetch data. Please try again.'
        loading.value = false
      }
  }

  async function addNewMember(clubId, email) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, club: clubId}),
        credentials: 'include'
      }

      const result = await fetch('http://localhost:8080/club/update/members', requestOptions)
      const data = await result.json()

      if (data.success == true) {
        fetchCurrentClub(route.params.clubId)
      }
    } catch(err) {
      error.value = 'Unable to fetch data. Please try again.'
    } 
  }

  async function addNewBook(clubId, newBookTitle, newBookAuthor) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"title": newBookTitle, "author": newBookAuthor, "club": clubId}),
        credentials: 'include'
      }

      const result = await fetch('http://localhost:8080/club/update/book', requestOptions)
      const data = await result.json()

      if (data.success == true) {
        fetchCurrentClub(route.params.clubId)
      }
    } catch(err) {
      error.value = 'Unable to fetch data. Please try again.'
    } 
  }

  async function addNewMeeting(clubId, newMeetingDate, newMeetingLocation) {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"date": newMeetingDate, "location": newMeetingLocation, "club": clubId}),
        credentials: 'include'
      }

      const result = await fetch('http://localhost:8080/club/update/meeting', requestOptions)
      const data = await result.json()

      if (data.success == true) {
        fetchCurrentClub(route.params.clubId)
      }
    } catch(err) {
      error.value = 'Unable to fetch data. Please try again.'
    } 
  }

  function newMemberHandler(userEmail) {
    addNewMember(route.params.clubId, userEmail)
    newMember = false
  }

  function newBookHandler(title, author) {
    addNewBook(route.params.clubId, title, author)
    newBook = false
  }

  function newMeetingHandler(date, location) {
    addNewMeeting(route.params.clubId, date, location)
    newMeeting = false
  }

fetchCurrentClub(route.params.clubId)
</script>

<template>
  <div v-if="loading" class="w-4 h-4 border-2 border-t-transparent border-cyan-500 rounded-full animate-spin"></div>
  <div v-else-if="error">{{ error }}</div>
  <div class="text-white" v-else>
    <h3 class="text-xl font-semibold ">{{ currentClub.name }}</h3>
    <div>
      <h4 class="text-m font-semibold">Members: <button @click="newMember = true" class="shadow-lg border-1 rounded-md p-1 m-5 font-normal italic text-sm cursor-pointer active:bg-slate-200">Add new member</button></h4> 
      <div class="columns-3 m-2" v-if="newMember"><TextInput legend-text="New Member Email" v-model:title="email"/><button @click='newMemberHandler(email)' class="shadow-lg border-1 rounded-md p-1 my-9 font-normal italic text-slate-600 text-sm cursor-pointer active:bg-slate-200">Submit</button></div>
      <ul>
        <li v-for="member in currentClub.members">{{ member }}</li>
      </ul>
      <h4 class="text-m font-semibold">Current Book: <button @click="newBook = true" class="shadow-lg border-1 rounded-md p-1 m-5 font-normal italic text-sm cursor-pointer active:bg-slate-200">Change book</button></h4>
      <div class="grid grid-cols-3 justify-start m-2" v-if="newBook"><TextInput legend-text="Title" v-model:title="bookTitle"/><TextInput legend-text="Author" v-model:title="bookAuthor"/><button @click='newBookHandler(bookTitle, bookAuthor)' class="w-32 shadow-lg border-1 rounded-md p-1 my-9 font-normal italic text-slate-600 text-sm cursor-pointer active:bg-slate-200">Submit</button></div>
      {{ currentClub.book.name }} by {{ currentClub.book.author }} 
      <h4 class="text-m font-semibold">Next Meeting: <button @click="newMeeting = true" class="shadow-lg border-1 rounded-md p-1 m-5 font-normal italic text-sm cursor-pointer active:bg-slate-200">Change next meeting</button></h4>
      <div class="grid grid-cols-3 m-2" v-if="newMeeting"><Datepicker class="my-8" v-model="meetingDate" /><TextInput legend-text="Location" v-model:title="meetingLocation"/><button @click='newMeetingHandler(meetingDate, meetingLocation)' class="w-32 shadow-lg border-1 rounded-md p-1 my-9 font-normal italic text-slate-600 text-sm cursor-pointer active:bg-slate-200">Submit</button></div>
      {{ currentClub.meeting.date }} at {{ currentClub.meeting.location }}
    </div>
  </div>
</template>

<style scoped></style>