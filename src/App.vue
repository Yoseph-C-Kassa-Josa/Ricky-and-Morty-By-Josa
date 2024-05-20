<template  class="bg-blue-500">
  <div id="app" class="font-sans">
    <header   class="bg-yellow-300 text-white py-4 ">
      <nav class="flex flex-col justify-center items-center md:flex-row">
        <!-- Hamburger/Cancel Icon Button -->
        <button @click="toggleNav" class="icon-button block md:hidden">
          <svg v-if="isNavVisible" class="w-6 h-6 animate-rotate" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <svg v-else class="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        
        <!-- Navigation Links -->
        <ul :class="{ 'hidden md:flex': !isNavVisible }" class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 text-black">
          <li :class="{ 'active': $route.path === '/' }">
            <router-link to="/" class="nav-link" active-class="nav-link is-active" >Home</router-link>
          </li>
          <li :class="{ 'active': $route.name === 'episodeDetails' && $route.params.id == recentId }">
            <router-link :to="'/episodeDetails/' + (recentId || '1')" class="nav-link" active-class="nav-link is-active">Episode</router-link>
          </li>
          <li :class="{ 'active': $route.name === 'characterDetails' && $route.params.id == recentId }">
            <router-link :to="'/characterDetails/' + (recentId || '1')" class="nav-link" active-class="nav-link is-active">Character</router-link>
          </li>
          <li :class="{ 'active': $route.name === 'locationDetails' && $route.params.id == recentId }">
            <router-link :to="'/locationDetails/' + (recentId || '1')" class="nav-link" active-class="nav-link is-active">Location</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <main class="container mx-auto py-8">
      <div class= " brr animate-fade-in">
        <router-view></router-view>
      </div>
    </main>
    <footer class="bg-yellow-300 text-white py-4 text-center">
     
      <p>Github:https://github.com/Yoseph-C-Kassa-Josa/Ricky-and-Morty-By-Josa</p>
      <p>Figma Design:https://www.figma.com/design/NUsvVKxlUtLLDXOzWKaRio/ricky?node-id=28%3A12&t=4YxizCpwTd3K9tAZ-1</p>
       <p>&copy; 2024 Yoseph Chalie Kassa</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      recentId: 1,
      isNavVisible: false
    };
  },
  methods: {
    toggleNav() {
      this.isNavVisible = !this.isNavVisible;
    }
  },
  watch: {
    '$route.params.id'(newId) {
      this.recentId = newId;
    }
  }
}
</script>

<style>
.nav-link {
  @apply py-2 px-4 rounded-full hover:bg-white hover:text-purple-500 transition-colors duration-300;
}

.nav-link.is-active {
  @apply bg-white text-purple-500;
}

.icon-button {
  @apply bg-transparent text-white px-4 py-2;
}

.icon-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  cursor: pointer;
}

.icon-wrapper.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.icon-wrapper.active span:nth-child(2) {
  opacity: 0;
}

.icon-wrapper.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.card-container {
  animation: slide-in 0.5s ease-in-out;
}

@keyframes slide-in {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}


@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
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

.brr{
  background-image: url(./assets/er.jpeg);
}
.animate-rotate {
  animation: rotate 1s linear ;
}

.animate-bounce {
  animation: bounce 1s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-in-out;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.5s ease-in-out;
}

@keyframes slide-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.animate-scale-up {
  animation: scale-up 0.5s ease-in-out;
}

@keyframes scale-up {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
