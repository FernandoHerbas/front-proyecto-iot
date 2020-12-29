<template>
  <v-container fill-height>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>
      <v-toolbar-title>Living</v-toolbar-title>
      <template v-slot:extension>
          <v-tabs>
              <template v-for="(item, key) in tabItems">
                  <v-tab :key="key" :to="item.to">{{item.text}}</v-tab>
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
      tabItems: [
        {
          text: "LEDS",
          to: "/living/leds"
        },
        {
          text: "RGB",
          to: "/living/rgb"
        }
      ],
    }
  },
  inject: ['toggleDrawer']
}
</script>

<style>

</style>