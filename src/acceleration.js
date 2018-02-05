class Acceleration {
  constructor() {
    this.callbacks = [];
    this.x = null;
    this.y = null;
    this.z = null;

    window.addEventListener("devicemotion", this.handleDeviceMotion.bind(this))
  }

  addCallback(callback) {
    this.callbacks.push(callback);
  }

  handleDeviceMotion(event) {
    this.x = event.acceleration.x
    this.y = event.acceleration.y
    this.z = event.acceleration.z

    this.callbacks.map((callback) => callback())
  }
}

export default Acceleration;
