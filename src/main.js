import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'

import LocationDetails from './components/LocationDetails.vue'
import episodeDetails from './components/EpisodeDetails.vue'
import characterDetails from './components/CharacterDetails.vue'
import './index.css';
const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'https://rickandmortyapi.com/graphql',
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
   
    {path: '/locationDetails/:id',
    name: 'locationDetails',
    component: LocationDetails,
    props: true},
    { path: '/episodeDetails/:id',
     name: 'episodeDetail',
      component: episodeDetails,
       props: true },
       { path: '/characterDetails/:id',
       name: 'characterDetail',
        component: characterDetails,
         props: true }

  ]
})

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(router)
app.mount('#app')