<template>
  <div fill-height>
    <v-row class="justify-center align-center">
        <v-col cols="12" sm="4">
            <template >
                <v-btn
                fab
                :color="led.encendido ? 'white' : 'blue-grey darken-2'"
                elevation="10"
                x-large
                class="led-btn"
                :style="`height: ${ledSize}rem; width: ${ledSize}rem;`"
                @click="toggleLed()"
                >
                    <v-icon :style="{'color': led.encendido ? 'grey' : 'white'}">{{led.icon}}</v-icon>
                </v-btn>
            </template>
        </v-col>
    </v-row>
  </div> 
</template>

<script>
import WebSocketHelper from '@/utils/WebSocketHelper.js';
var wsh = new WebSocketHelper();

export default {
  data() {
    return {
      environment: this.$route.matched[0].meta.environment,
      led: 
        {
          icon: "fa-lightbulb",
          encendido: false
        }
    }
  },
  computed: {
    ledSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 5;
        default: return 7;
      }
    }
  },
  methods: {
    toggleLed() {
      this.led.encendido = !this.led.encendido;
      wsh.send(this.environment,"leds","C" + this.led.encendido);
    },
    estadoBotones(data) {
      if(data.environment === this.environment) {
        if(data.device === "botones") {
            //Boton en estado apagado - led apagado
            if(data.message === "00") this.led.encendido = true;
            //Boton accionado - led encendido
            if(data.message === "10") this.led.encendido = false;
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
/*
.led-container {
  /*display: grid;
  display: flex;
  width: 100%;
  height: 100%;
  align-content: center;
  flex: 20%;
  /*grid-template: 
    "a" auto ;
    /*"a b" auto
    "c d" auto / auto auto;
}

.led-container > div {
  display: flex;
  padding: 15%;
}
.led-container > div:nth-child(1) {
  align-items: flex-end;
  justify-content: flex-end;
}*/
</style>