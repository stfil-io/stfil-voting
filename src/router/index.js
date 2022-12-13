import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProposalDetails from '../views/ProposalDetails.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/details',
    name: 'details',
    component: ProposalDetails
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
