<template>
  <v-app>
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
          :to="environment.path"
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
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        environments: [],
        drawer: null
      }
    },
    created() {
      this.$vuetify.theme.dark = true;
      this.environments = this.$router.options.routes;
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
<style lang="scss">
</style>
