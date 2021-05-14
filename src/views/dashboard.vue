<template>
  <div>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Palta
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        nav
      >
        <v-list-item
          v-for="(environment, key) in environments"
          :key="key"
          :to="path + '/' +environment.path"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ environment.meta.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-fade-transition mode="out-in">
        <router-view :key="$route.matched[0] ? $route.matched[0].path : null"/>
      </v-fade-transition>
    </v-main>
  </div>
</template>

<script>
import RoutesHelper from '@/utils/RoutesHelper'

export default {
  data () {
    return {
      environments: [],
      path: "/default",
      drawer: null
    }
  },
  created() {
    this.$vuetify.theme.dark = true;

    var dashboard = this.$route.matched[0];

    RoutesHelper.recursiveChildrenRouteSearch(this.$router.options.routes, dashboard.meta.name, dashboard);
    
    this.environments = dashboard.children;
    this.path = dashboard.path;
  },
  provide() {
    return {
      toggleDrawer: this.toggleDrawer
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
}
</script>

<style>

</style>