<template>
  <v-container fluid>
    <div class="rgb-container" ref="rgbContainer">
      <div class="panel-rgb">
        <v-card class="card-panel-rgb" :style="`opacity: ${power && !auto ? 1 : 0}`">
          <v-responsive
            :style="{ background: `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})` }"
            height="100px"
          ></v-responsive>
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <v-slider
                    v-model="rgb.red"
                    :max="255"
                    label="R"
                    class="align-center"
                  >
                    <template v-slot:append>
                      <v-text-field
                        v-model="rgb.red"
                        class="mt-0 pt-0"
                        type="number"
                        style="width: 60px"
                      ></v-text-field>
                    </template>
                  </v-slider>
                </v-col>

                <v-col cols="12">
                  <v-slider
                    v-model="rgb.green"
                    :max="255"
                    label="G"
                    class="align-center"
                  >
                    <template v-slot:append>
                      <v-text-field
                        v-model="rgb.green"
                        class="mt-0 pt-0"
                        type="number"
                        style="width: 60px"
                      ></v-text-field>
                    </template>
                  </v-slider>
                </v-col>

                <v-col cols="12">
                  <v-slider
                    v-model="rgb.blue"
                    :max="255"
                    label="B"
                    class="align-center"
                  >
                    <template v-slot:append>
                      <v-text-field
                        v-model="rgb.blue"
                        class="mt-0 pt-0"
                        type="number"
                        style="width: 60px"
                      ></v-text-field>
                    </template>
                  </v-slider>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </div>
      <div class="switch-rgb" :style="`transform: translateX(${switchX}px)`">
        <v-switch
          v-model="power"
          :label="power ? 'Encendido' : 'Apagado'"
        ></v-switch>
        <v-scroll-x-transition>
          <v-switch
            v-if="power"
            v-model="auto"
            :label="auto ? 'Automático' : 'Manual'"
          ></v-switch>
        </v-scroll-x-transition>
      </div>
    </div>
  </v-container>
</template>

<script>
import WebSocketHelper from '@/utils/WebSocketHelper.js';
var wsh = new WebSocketHelper();

export default {
  data() {
    return {
      environment: this.$route.matched[0].meta.environment,
      rgb: {
        red: 0,
        green: 0,
        blue: 0
      },
      auto: false,
      power: false,
      containerWidth: 0
    }
  },
  computed: {
    switchX() {
      if(this.power && !this.auto) {
        // Se ponga a la derecha
        return this.containerWidth - 130;
      } else {
        // Este en el centro
        return (this.containerWidth / 2) - (130 / 2);
      }
    }
  },
  methods: {
    getContainerWidth() {
      this.containerWidth = this.$refs.rgbContainer.clientWidth;
    },
    updateContainerWidth() {
      this.getContainerWidth();
    },
    recibirRGB(data) {
      console.log(data);
    },
    enviarRGB(topic, message) {
      wsh.send(this.environment, topic, message);
    }
  },
  mounted() {
    this.getContainerWidth();
  },
  created() {
    window.addEventListener("resize", this.updateContainerWidth);
    wsh.receive("RGB", this.recibirRGB);
  },
  destroyed() {
    window.removeEventListener("resize", this.updateContainerWidth);
  },
  watch: {
    // Si se apaga el rgb, se cambia a modo manual
    power(state) {
      if(!state)
        this.auto = false;
      this.enviarRGB("control", state ? 'Y': 'N');
    },
    auto(state) {
      this.enviarRGB("control", state ? 'A': 'Y');
    },
    'rgb.red'() {
      this.enviarRGB("rgb", this.rgb);
    },
    'rgb.green'() {
      this.enviarRGB("rgb", this.rgb);
    },
    'rgb.blue'() {
      this.enviarRGB("rgb", this.rgb);
    }
  }
}
</script>

<style scoped>
/* Contenedor de los switch y el panel */
.rgb-container {
  position: relative;
}
/* Panel de modificacion de rgb */
.panel-rgb {
  width: calc(100% - 140px);
}
/* Tarjeta de modificacion de colores rgb, se centra al padre y se anima su opacidad */
.card-panel-rgb {
  max-width: 400px;
  width: 100%;
  margin: auto;
  transition: .5s opacity;
}
/* Los switches, se posicionan en el centro cuando esta apagado y se pone al costado
 * cuando aparece el panel, se anima su transformacion (traslacion)
 */
.switch-rgb {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 130px;
  transition: .5s transform;
}
</style>