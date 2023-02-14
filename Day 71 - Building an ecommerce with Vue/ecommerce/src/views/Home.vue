<template>
  <v-app>
    <Navbar class="index" style="position: relative" />
    <Dashboard />
    <Footer />
  </v-app>
</template>

<script>
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';

export default {
  name: 'HomeView',
  components: {
    Navbar,
    Dashboard,
    Footer,
  },
};
</script>
<style>
.index {
  z-index: 9999;
}
</style>
