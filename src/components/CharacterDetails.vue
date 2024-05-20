<template>
  <div class="container mx-auto p-4 min-h-screen flex flex-col items-center">
    <h1 class="text-white text-4xl font-bold mb-8 animate-fade-in">Character Detail</h1>
    <div v-if="loading">
      <p class="text-white font-bold text-center text-4xl my-8 animate-bounce">Loading...</p>
    </div>
    <div v-else-if="error">
      <p class="text-red-500 font-bold text-center text-4xl my-8 animate-shake">Error: {{ error.message }}</p>
    </div>
    <div v-else-if="character" class="bg-gray-700 w-full rounded-lg shadow-lg p-8 animate-slide-in">
      <div class="flex flex-col  items-center mb-4 ">
        <img :src="character.image" :alt="character.name" class="w-32 h-32 rounded-full mr-4" />
        <div>
          <h2 class="text-2xl font-bold text-yellow-500">{{ character.name }}</h2>
          <div class="flex items-center">
            <p class="text-blue-600 font-extrabold mr-4">Status: {{ character.status }}</p>
            <p class="text-yellow-600 font-extrabold mr-4">Species: {{ character.species }}</p>
            <p class="text-green-600 font-extrabold">Gender: {{ character.gender }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap w-2xl">
  <h3 class="text-xl font-bold text-blue-500 mt-4 w-full">Episodes:</h3>
  <ul class="flex flex-wrap w-full space-x-4 space-y-4">
  <li v-for="episode in character.episode" :key="episode.name" class="episode-card justify-between bg-gray-100 rounded-lg p-4 mb-2 animate-scale-up w-fit">
    <h4 class="font-bold">{{ episode.name }}</h4>
    <p>Air Date: {{ episode.air_date }}</p>
    <p>Episode: {{ episode.episode }}</p>
    <p>Created: {{ episode.created }}</p>
  </li>
</ul>


</div>
      <div>
      <h3 class="text-xl font-bold text-blue-500 mt-4">Location:</h3>
      <div class="location-card bg-gray-100 rounded-lg p-4 animate-slide-in">
        <p class="font-bold">ID: {{ character.location.id }}</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const route = useRoute()

const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: ID!) {
    charactersByIds(ids: [$id]) {
      name
      status
      species
      gender
      image
      episode {
        name
        air_date
        episode
        created
      }
      location {
        id
      }
    }
  }
`

const id = route.params.id
const { result, loading, error } = useQuery(GET_CHARACTER_BY_ID, { id: id })

const character = ref(null)

if (result.value && result.value.charactersByIds) {
  character.value = result.value.charactersByIds[0]
}
</script>

<style>
.episode-card {
  animation: scale-up 0.5s ease-in-out;
}

.location-card {
  animation: slide-in 0.5s ease-in-out;
}

.episode-card:hover {
  transform: scale(1.05);
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}

@keyframes slide-in {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scale-up {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-in-out;
}

.animate-bounce {
  animation: bounce 1s ease-in-out infinite;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-slide-in {
  animation: slide-in 0.5s ease-in-out;
}
</style>