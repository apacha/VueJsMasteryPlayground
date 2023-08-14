import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import EventDetails from '@/views/event/Details.vue'
import EventLayout from '@/views/event/Layout.vue'
import EventRegister from '@/views/event/Register.vue'
import EventEdit from '@/views/event/Edit.vue'
import AboutView from '@/views/AboutView.vue'
import MusicalDivisions from '@/views/MusicalDivisions.vue'
import MusicalDivisionsNested from '@/views/MusicalDivisionsNested.vue'
import CompositionListView from "@/views/CompositionListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: route => ({ page: Number(route.query.page) || 1 }),
    },
    {
      path: '/event/:id',
      name: 'EventLayout',
      props: route => ({ id: Number(route.params.id) }),
      component: EventLayout,
      children: [
        {
          path: '',
          name: 'EventDetails',
          component: EventDetails,
        },
        {
          path: 'register',
          name: 'EventRegister',
          component: EventRegister,
        },
        {
          path: 'edit',
          name: 'EventEdit',
          component: EventEdit,
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/compositions',
      name: 'composition-list',
      component: CompositionListView,
      props: route => ({ limit: Number(route.query.limit) || 20, offset: Number(route.query.offset) || 1 }),
    },
    {
      path: '/musical-divisions',
      name: 'musical-divisions',
      component: MusicalDivisions
    },
    {
      path: '/musical-divisions-nested',
      name: 'musical-divisions-nested',
      component: MusicalDivisionsNested
    },
  ]
})

export default router
