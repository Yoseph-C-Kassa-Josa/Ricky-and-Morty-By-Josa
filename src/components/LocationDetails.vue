<template>
  <div class="container mx-auto p-4  min-h-screen flex flex-col items-center">
    <h1 class="text-white text-4xl font-bold mb-8 animate-fade-in">Location Detail</h1>
    <div v-if="loading">
      <p class="text-white font-bold text-center text-4xl my-8 animate-bounce">Loading...</p>
    </div>
    <div v-else-if="error">
      <p class="text-red-500 font-bold text-center text-4xl my-8 animate-shake">Error: {{ error.message }}</p>
    </div>
    <div v-else-if="location" class="bg-gray-700 rounded-lg shadow-lg p-8 animate-slide-in">
      <h2 class="text-2xl font-bold text-yellow-500">{{ location.name }}</h2>
      <p class="text-blue-600 font-extrabold">Type: {{ location.type }}</p>
      <p class="text-yellow-600 font-extrabold">Dimension: {{ location.dimension }}</p>
      <p class="text-green-600 font-extrabold">Created: {{ location.created }}</p>
      
      <h3 class="text-xl font-bold text-blue-500 mt-4">Residents:</h3>
      <ul class="flex flex-wrap">
        <li v-for="resident in location.residents" :key="resident.id" class="resident-card bg-gray-100 rounded-lg p-4 flex items-center mr-4 mb-4 animate-scale-up">
          <img :src="resident.image" :alt="resident.name" class="w-16 h-16 rounded-full mr-4" />
          <div>
            <p class="font-bold">{{ resident.name }}</p>
            <p class="text-gray-600">{{ resident.status }}, {{ resident.species }}, {{ resident.gender }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const route = useRoute()

const GET_LOCATION_BY_ID = gql`
  query GetLocationById($id: ID!) {
    locationsByIds(ids: [$id]) {
      id
      name
      type
      dimension
      created
      residents {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`
const id =  route.params.id;
const { result, loading, error } = useQuery(GET_LOCATION_BY_ID, { id: id })

const location = ref(null)

if (result.value && result.value.locationsByIds) {
  location.value = result.value.locationsByIds[0]
}
</script>

<style>
.resident-card {
  animation: scale-up 0.5s ease-in-out;
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