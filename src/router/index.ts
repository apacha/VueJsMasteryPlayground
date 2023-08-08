import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import EventDetailsView from '../views/EventDetailsView.vue'
import AboutView from '@/views/AboutView.vue'
import NestedMDiv from '@/views/NestedMDiv.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: route => ({ page: Number(route.query.page) || 1 })
    },
    {
      path: '/event/:id',
      name: 'event-details',
      props: true,
      component: EventDetailsView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/nested',
      name: 'nested-mdiv',
      component: NestedMDiv
    },
  ]
})

export default router
