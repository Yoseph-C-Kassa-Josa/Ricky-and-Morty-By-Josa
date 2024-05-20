import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import episodeDetails from '../components/EpisodeDetails.vue'
import characterDetails from '../components/CharacterDetails.vue'
import LocationDetails from '@/views/LocationDetails.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
 
  { path: '/locations', component: Location },
  { path: ''/episodeDetails/' + episode.id', name: 'episodeDetails', component: episodeDetails, props: true },
  { path: ''/characterDetails/' + character.id', name: 'characterDetails', component: characterDetails, props: true },
  { path: ''/LocationDetails/' + location.id', name: 'locationDetails', component: LocationDetails, props: true },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router