<template>
  <v-card class="e4">
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
</template>

<script>
import WebSocketHelper from '@/utils/WebSocketHelper.js';
var wsh = new WebSocketHelper();

export default {
  data() {
    return {
      rgb: {
        red: 0,
        green: 0,
        blue: 0
      }
    }
  },
  methods: {
    recibirRGB(data) {
      console.log(data);
    },
    enviarRGB() {
      wsh.send("RGB", this.rgb);
    }
  },
  created() {
    wsh.receive("RGB", this.recibirRGB);
  },
  watch: {
    'rgb.red'() {
      this.enviarRGB();
    },
    'rgb.green'() {
      this.enviarRGB();
    },
    'rgb.blue'() {
      this.enviarRGB();
    }
  }
}
</script>

<style scoped>
.e4 {
  width: 400px;
  margin: auto;
}
</style>