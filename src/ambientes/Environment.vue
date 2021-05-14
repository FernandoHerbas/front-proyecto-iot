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
import RoutesHelper from '@/utils/RoutesHelper'

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

      RoutesHelper.recursiveChildrenRouteSearch(this.$router.options.routes, environment.meta.name, environment);

      if(environment.children != [])
        this.devices = environment.children;

      this.path = environment.path;
      this.name = environment.meta.name;
    }
  },
  watch: {
    $route () {
      // Cambio de ruta
      this.updateAppVarDevices();
    }
  },
  inject: ['toggleDrawer']
}
</script>

<style>

</style>