<template>
  <div class="home">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>
      <v-toolbar-title>Home</v-toolbar-title>
    </v-app-bar>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  inject: ['toggleDrawer'],
  components: {
    HelloWorld
  }
}
</script>
