import WebsocketTransmitter from "./websocket_transmitter"
import Upness from "./upness"
import Acceleration from "./acceleration"
import Velocity from "./velocity"

class App {
  constructor(elements) {
    this.elements = elements;

    const uuid = this.generateUuid()
    //this.elements["uuid"].innerHTML = uuid
    this.websocketTransmitter = new WebsocketTransmitter(uuid)

    this.upness = new Upness()
    //this.upness.addCallback(this.handleUpnessUpdate.bind(this))

    this.acceleration = new Acceleration()
    //this.acceleration.addCallback(this.handleAccelerationUpdate.bind(this))
    
    this.velocity = new Velocity(this.acceleration)
    //this.velocity.addCallback(this.handleVelocityUpdate.bind(this))

    this.elements["page-color"].style = "display: none"

    this.elements["name-form"].addEventListener("submit", (event) => {
      this.websocketTransmitter.sendName(event.target.name.value)

      this.elements["page-name"].style = "display: none"
      this.elements["page-color"].style = ""

      event.target.parentNode.removeChild(event.target) // prevent shake to undo in a very sledgehammer kind of way

      event.preventDefault();
    })

    this.elements["color-yellow"].addEventListener("click", (event) => {
      this.websocketTransmitter.sendColor("Yellow")
    })
    this.elements["color-red"].addEventListener("click", (event) => {
      this.websocketTransmitter.sendColor("Red")
    })
    this.elements["color-cyan"].addEventListener("click", (event) => {
      this.websocketTransmitter.sendColor("Cyan")
    })
    this.elements["color-purple-blue"].addEventListener("click", (event) => {
      this.websocketTransmitter.sendColor("Purple-Blue")
    })

    setInterval(this.sendTick.bind(this), 10);
  }

/*
  handleUpnessUpdate(upness) {
    this.elements["upness"].innerHTML = upness
  }

  handleAccelerationUpdate() {
    this.elements["acceleration-x"].innerHTML = this.acceleration.x
    this.elements["acceleration-z"].innerHTML = this.acceleration.z
    this.elements["acceleration-y"].innerHTML = this.acceleration.y
  }

  handleVelocityUpdate() {
    this.elements["velocity-x"].innerHTML = this.velocity.x
    this.elements["velocity-z"].innerHTML = this.velocity.z
    this.elements["velocity-y"].innerHTML = this.velocity.y

    if (this.velocity.x < -0.2) {
      this.elements["direction"].innerHTML = "RIGHT"
    } else if (this.velocity.x > 0.2) {
      this.elements["direction"].innerHTML = "LEFT"
    } else {
      this.elements["direction"].innerHTML = ""
    }
  }
  */

  generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  sendTick() {
    this.websocketTransmitter.sendTick(this.upness, this.velocity)
  }
}

export default App
