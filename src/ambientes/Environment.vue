<template>
  <v-container fill-height>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>
      <v-toolbar-title>{{name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-moon-waxing-crescent</v-icon>
      </v-btn>
      <template v-slot:extension>
          <v-tabs>
              <template v-for="(device, key) in devices">
                  <v-tab :key="key" :to="path+'/'+device.path">{{device.meta.name}}</v-tab>
              </template>
          </v-tabs>
      </template>
    </v-app-bar>
    <v-fade-transition mode="out-in">
      <router-view/>
    </v-fade-transition>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: "Default",
      path: "/default",
      environment: "default",
      devices: [],
    }
  },
  created() {

    var route = this.$route.matched[0];

    console.log(route);
    this.name = route.meta.name;
    this.path = route.path;
    this.environment = route.meta.environment;

    // Obtener los dispositivos
    var routeEnvironment = this.$router.options.routes.find(route => route.path == this.path)
    var devices = routeEnvironment.children.slice(1);
    this.devices = devices;

  },
  inject: ['toggleDrawer']
}
</script>

<style>

</style>