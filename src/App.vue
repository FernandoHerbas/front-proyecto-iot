<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Palta
          </v-list-item-title>
          <v-list-item-subtitle>
            S.A
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-fade-transition mode="out-in">
        <router-view/>
      </v-fade-transition>
    </v-main>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Home',to: '/' },
          { title: 'Living',to: '/living' },
        ],
        drawer: null
      }
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
