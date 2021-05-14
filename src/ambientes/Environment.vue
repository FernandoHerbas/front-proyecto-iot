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
                  <v-tab v-if="device.meta" :key="key" :to="path+'/'+device.path">{{device.meta.name}}</v-tab>
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
      devices: [],
    }
  },
  created() {
    var environment = this.$route.matched[this.$route.matched.length - 2];
    this.$router.options.routes



    this.devices = this.recursiveChildrenSearch(this.$router.options.routes, environment.meta.name);
    this.path = environment.path;
    console.log(this.$route);
    console.log(this.$router);
    /*
    var route = this.$route.matched[1];

    console.log(route);
    this.name = route.meta.name;
    this.path = route.path;
    this.environment = route.meta.environment;

    console.log(this.$router.options)

    // Obtener los dispositivos
    var routeEnvironment = this.$router.options.routes.find(route => route.path == this.path)
    var devices = routeEnvironment.children.slice(1);
    this.devices = devices;
    */

  },
  methods: {
    recursiveChildrenSearch(routes, name) {
      for (let route of routes) {
        if(!route.meta)
          continue;
        
        console.log(`${route.meta.name} == ${name}`);
        if (route.meta.name === name) {
          console.log("Devolviendo hijos: ", route.children);
          return route.children;
        }
        else if (route.children) {
          console.log("Entrando a hijos")
          if (route.children.length > 0)
            return this.recursiveChildrenSearch(route.children, name);
        }
      }
    },
    metodoDos(routes, name) {
      
    }
  },
  inject: ['toggleDrawer']
}
</script>

<style>

</style>