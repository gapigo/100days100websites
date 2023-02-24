<script>
import { RouterLink, RouterView } from 'vue-router';

import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/guessing">About</router-link>
  </div> -->

  <Navbar />
  <div class="wrap">
    <router-view />
  </div>
  <div class="teste"></div>
</template>

<style>
.wrap {
  padding-top: 3rem;
}
</style>
