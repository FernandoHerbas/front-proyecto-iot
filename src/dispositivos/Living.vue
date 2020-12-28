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
    <div
      class="led-container"
    >
      <template v-for="(led, index) in leds">
        <div :key="index">
          <v-btn
            :dark="!led.encendido"
            fab
            :color="led.encendido ? 'white' : 'blue-grey darken-2'"
            elevation="10"
            x-large
            class="led-btn"
            @click="toggleLed(index)"
          >
            <v-icon>{{led.icon}}</v-icon>
          </v-btn>
        </div>
      </template>
    </div> 
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      leds: [
        {
          icon: "fa-lightbulb",
          encendido: false
        },
        {
          icon: "fa-lightbulb",
          encendido: false
        },
        {
          icon: "fa-lightbulb",
          encendido: true
        },
        {
          icon: "fa-lightbulb",
          encendido: false
        }
      ],
      tabItems: [
        {
          text: "LEDS",
          to: "/living/leds"
        },
        {
          text: "RGB",
          to: "/living/rgb"
        }
      ]
    }
  },
  inject: ['toggleDrawer'],
  methods: {
    toggleLed(index) {
      this.leds[index].encendido = !this.leds[index].encendido;
      
      //  this.enviarASocket(index);
    }//,
    // enviarASocket(index) {
    //   var id = index;
    //   var encendido = leds[index].encendido;
      
      
    // }
  }
}
</script>

<style>
.led-container {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template: 
    "a b" auto
    "c d" auto / auto auto;
}
.led-container > div {
  display: flex;
  padding: 3rem;
}
.led-container > div:nth-child(1) {
  align-items: flex-end;
  justify-content: flex-end;
}
.led-container > div:nth-child(2) {
  align-items: flex-end;
  justify-content: flex-start;
}
.led-container > div:nth-child(3) {
  align-items: flex-start;
  justify-content: flex-end;
}
.led-container > div:nth-child(4) {
  align-items: flex-start;
  justify-content: flex-start;
}
.led-btn {
  width: 7rem !important;
  height: 7rem !important;
}
</style>