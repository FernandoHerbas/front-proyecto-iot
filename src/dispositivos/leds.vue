<template>
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
</template>

<script>
import WebSocketHelper from '@/utils/WebSocketHelper.js';
var wsh = new WebSocketHelper();

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
          encendido: false
        },
        {
          icon: "fa-lightbulb",
          encendido: false
        }
      ],
    }
  },
  methods: {
    toggleLed(index) {
      this.leds[index].encendido = !this.leds[index].encendido;
      wsh.send("living","leds","L" + index);
    },
    estadoBotones(data) {
      if(data.environment === "living") {
        if(data.device === "botones") {
            //Boton en estado apagado - led apagado
            if(data.message === "00") this.leds[0].encendido = false;
            //Boton accionado - led encendido
            if(data.message === "10") this.leds[0].encendido = true;
            if(data.message === "01") this.leds[1].encendido = false;
            if(data.message === "11") this.leds[1].encendido = true;
            if(data.message === "02") this.leds[2].encendido = false;
            if(data.message === "12") this.leds[2].encendido = true;
            if(data.message === "03") this.leds[3].encendido = false;
            if(data.message === "13") this.leds[3].encendido = true;
        }
      }
    }
  },
  created() {
    wsh.receive("botones", this.estadoBotones);
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