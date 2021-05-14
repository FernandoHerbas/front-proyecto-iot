<template>
  <v-container fill-height>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>
      <v-toolbar-title>Home</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-moon-waxing-crescent</v-icon>
      </v-btn>
    </v-app-bar>
    
    <div class="mt-6" align="center">
      <p>
        Preparando la version 1.0
      </p>
      <img class="tamanio-img" alt="Palta logo" src="../assets/palta.png">
    </div>
  </v-container>
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
