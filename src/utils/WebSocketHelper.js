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
      
      console.log(event);
    }
  }
  send(topic, message) {
    var data = {
      topic: topic,
      message: message
    }
    data = JSON.stringify(data);
    this.connection.send(data);
  }
}