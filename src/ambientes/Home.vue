<template>
  <div class="home">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>
      <v-toolbar-title>Home</v-toolbar-title>
    </v-app-bar>
    
    <div align = "center">
      <p>
      Preparando la version 1.0
      </p>
      <img class="tamanio-img" alt="Palta logo" src="../assets/palta.png">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  inject: ['toggleDrawer']
}
</script>

<style scoped>
.tamanio-img {
  width: 50% !important;
  height: 50%;

}
</style>
