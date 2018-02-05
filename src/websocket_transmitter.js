class WebsocketTransmitter {
  constructor(uuid) {
    this.uuid = uuid;
    this.socket = new WebSocket("ws://stagecast.se/api/events/team_phogg/ws")
  }

  sendTick(upness, velocity) {
    if (this.socket.readyState != 1) { return }

    this.socket.send(JSON.stringify(
      {
        "type": "tick",
        "uuid": this.uuid,
        "upness": upness.value,
        "velocity": {
          "x": velocity.x,
          "y": velocity.y,
          "z": velocity.z,
        }
      }
    ))
  }

  sendName(name) {
    if (this.socket.readyState != 1) { return }

    this.socket.send(JSON.stringify(
      {
        "type": "name",
        "uuid": this.uuid,
        "name": name
      }
    ))
  }

  sendColor(colorName) {
    if (this.socket.readyState != 1) { return }

    this.socket.send(JSON.stringify(
      {
        "type": "namedColor",
        "uuid": this.uuid,
        "colorName": colorName
      }
    ))
  }
}

export default WebsocketTransmitter
