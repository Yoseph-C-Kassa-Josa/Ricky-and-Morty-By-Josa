<template>
  <div class="container mx-auto p-4  min-h-screen" style="background-image: url(./bean2.jpg);">
    <h1 class="text-3xl mb-4 text-white text-center font-extrabold animate-bounce">Welcome to the Home Page</h1>
    <p v-if="error" class="text-red-500 font-bold animate-shake">Something went wrong: {{ error.message }}</p>
    <p v-if="loading" class="text-blue-500 font-bold animate-pulse">Loading...</p>
    <div v-else-if="shows.length" class="flex justify-center items-center min-h-screen">
      <div class="flex justify-center">
  <div v-for="show in shows" :key="show.id" class="bg-gray-700 w-104 lg:w-2/3 h-auto rounded-lg shadow-lg p-4 transform hover:scale-105 transition duration-300">
    <h2 class="text-xl text-center font-bold mb-2 text-blue-500 animate-fadeIn">{{ show.title }}</h2>
    <div class="show-container">
      <carousel :items-to-show="1" :wrap-around="true" :autoplay="2000">
        <slide v-for="(image, index) in show.images" :key="index">
          <img :src="image" :alt="show.title" class="animate-zoomIn" />
        </slide>

        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
      
    </div>
    <p class="mb-2 font-bold animate-fadeInUp">
      <span class="text-red-400">Description/Storyline:</span>
      <span class="text-white animate-bounce">{{ show.description }}</span>
    </p>
    <p class="mb-2 font-bold animate-fadeInUp">
      <span class="text-red-400">Genre:</span>
      <span class="text-white">{{ show.genre }}</span>
    </p>
    <p class="mb-2 font-bold animate-fadeInUp">
      <span class="text-red-400">Creators:</span>
      <span class="text-white">{{ show.creators }}</span>
    </p>
    <p class="mb-2 font-bold animate-fadeInUp">
      <span class="text-red-400">Stars:</span>
      <span class="text-white"> {{ show.stars }}</span>
    </p>
    <p class="mb-2 font-bold animate-fadeInUp">
      <span class="text-red-400">Rating:</span>
      <span class="text-white">{{ show.rating }}</span>
    </p>
  </div>
</div>


</div>


    <div>
      <h1 class="text-3xl mb-4 text-red-500 text-center font-extrabold animate-bounce">Episodes</h1>
      <div v-if="result && result.episodes && result.episodes.results.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="episode in result.episodes.results" :key="episode.id" class="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition duration-300 animate-fadeInUp">
          <router-link :to="'/episodeDetails/' + episode.id" :class="{ 'active': $route.path.includes('/episodeDetails') }" class="text-xl font-bold mb-2 text-black animate-text-underline">{{ episode.name }}</router-link>
        </div>
      </div>
    </div>

    <div>
      <h1 class="text-3xl mb-4 text-red-500 text-center font-extrabold animate-bounce">Characters</h1>
      <div v-if="result && result.characters && result.characters.results.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="character in result.characters.results" :key="character.id" class="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition duration-300 animate-fadeInUp">
          <router-link :to="'/characterDetails/' + character.id" class="text-xl font-bold mb-2 text-black animate-text-underline">{{ character.name }}</router-link>
        </div>
      </div>
    </div>

    <div>
      <h1 class="text-3xl mb-4 text-red-500 text-center font-extrabold animate-bounce">Locations</h1>
      <div v-if="result && result.locations && result.locations.results.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="location in result.locations.results" :key="location.id" class="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition duration-300 animate-fadeInUp">
          <router-link :to="'/locationDetails/' + location.id" :class="{ 'text-blue-500 font-bold mb-2': $route.path.includes('/locationDetails'+ location.id) }" class="text-xl font-bold mb-2 text-black animate-text-underline">{{ location.name }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable'
import { gql } from 'graphql-tag'

const EPISODE_QUERY = gql`
  query {
    episodes {
      results {
        id
        name
      }
    }
    characters {
      results {
        id
        name
        image
      }
    }
    locations {
      results {
        id
        name
      }
    }
  }
`

const { result, loading, error } = useQuery(EPISODE_QUERY)
console.log("result:", result.value)
if (result.value && result.value.locations && result.value.locations.results) {
  console.log("locations data:", result.value.locations.results)
}
</script>

<script>
import { defineComponent } from 'vue'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Home',
  components: {
    Carousel,
    Slide,
    Navigation,
    Pagination
  },
  data() {
    return {
      shows: [
        {
          id: 1,
          title: 'Rick and Morty',
          images: [
            'https://c4.wallpaperflare.com/wallpaper/410/59/609/rick-and-morty-tv-rick-sanchez-morty-smith-wallpaper-preview.jpg',
            'https://motionbgs.com/media/776/multiverse-of-rick-and-morty.jpg' ,
        'https://images4.alphacoders.com/133/thumbbig-1335396.webp',
        'https://images5.alphacoders.com/133/thumbbig-1335149.webp',
        'https://i.pinimg.com/originals/92/21/50/922150cb7f1a0e6088f797873ce18461.jpg',
        'https://i.pinimg.com/originals/a3/0e/89/a30e89dd06a37a72c60321d55cf02346.jpg'
            
          ],
          description: 'Rick and Morty is an American adult animated science fiction sitcom that follows the misadventures of Rick Sanchez, a cynical mad scientist, and his good-hearted but fretful grandson Morty Smith, who split their time between domestic life and interdimensional adventures across an infinite number of realities.',
          genre: 'Adult animated science fiction sitcom',
          creators: 'Justin Roiland and Dan Harmon',
          stars: 'Justin Roiland as Rick Sanchez and Morty Smith (voice),Chris Parnell as Jerry Smith (voice),Spencer Grammer as Summer Smith (voice),Sarah Chalke as Beth Smith (voice)',
          rating: '9.1/10'
        }
      ]
      
    }
  }
})
</script>

<style>
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

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zoomIn {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}

.animate-bounce {
  animation: bounce 1s ease-in-out infinite;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-pulse {
  animation: pulse 1s ease-in-out infinite;
}

.animate-fadeIn {
  animation: fadeIn 1s ease-in-out;
}

.animate-fadeInUp {
  animation: fadeInUp 0.5s ease-in-out;
}

.animate-zoomIn {
  animation: zoomIn 0.5s ease-in-out;
}

.animate-text-underline {
  position: relative;
}

.animate-text-underline::before {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color:blue;
  transition: width 0.3s ease-in-out;
}

.animate-text-underline:hover::before {
  width: 100%;
}
</style>