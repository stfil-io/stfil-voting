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
    path: '/proposal/:id',
    name: 'proposal',
    component: ProposalDetails
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
