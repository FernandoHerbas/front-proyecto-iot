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
    this.updateAppVarDevices();
  },
  methods: {
    updateAppVarDevices() {
      var environment = this.$route.matched[this.$route.matched.length - 2];

      this.recursiveChildrenRouteSearch(this.$router.options.routes, environment.meta.name, environment);

      if(environment.children != [])
        this.devices = environment.children;

      this.path = environment.path;
      this.name = environment.meta.name;
    },
    recursiveChildrenRouteSearch(routes, name, result) {
      for (let route of routes) {
        if(route.meta)
          console.log(`${route.meta.name} == ${name}`);

        if (route.meta && route.meta.name === name) {
          result.children = route.children;
          break;
        }
        if (route.children && route.children.length > 0) {
          this.recursiveChildrenRouteSearch(route.children, name, result);
        }
      }
    }
  },
  watch: {
    "$route.matched"() {
      // Cambio de ruta
      console.log("cambio de ruta");
      this.updateAppVarDevices();
    }
  },
  inject: ['toggleDrawer']
}
</script>

<style>

</style>