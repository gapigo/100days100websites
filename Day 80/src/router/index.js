import { createWebHistory, createRouter } from 'vue-router';
import InitialView from '../views/InitialView.vue';
import GuessingView from '../views/GuessingView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: InitialView,
  },
  {
    path: '/guessing',
    name: 'Guessing',
    component: GuessingView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
