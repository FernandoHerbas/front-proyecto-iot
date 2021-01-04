export default class WebSocketHelper {
  constructor() {
    this.connection = new WebSocket("ws://192.168.0.67:9000/Socket")
    this.connection.onopen = function() {
      console.log("Me conecté");
    }
  }
  receive(topic, handler) {
    console.log(topic);
    console.log(handler);
    this.connection.onmessage = function(event) {
      handler(JSON.parse(event.data));
      console.log(event.data);
    }
  }
  send(environment, device, message) {
    var data = {
      environment: environment,
      device: device,
      message: {
        values: message
      }
    }
    data = JSON.stringify(data);
    this.connection.send(data);
    console.log(data);
  }
}