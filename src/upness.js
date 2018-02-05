class Upness {
  constructor() {
    this.callbacks = [];
    this.value = null;

    window.addEventListener("deviceorientation", this.handleDeviceOrientationEvent.bind(this), true);
  }

  addCallback(callback) {
    this.callbacks.push(callback);
  }

  handleDeviceOrientationEvent(event) {
    this.value = this.convertBetaAxisToUpness(event.beta);

    this.callbacks.map((callback) => callback(this.value))
  }

  convertBetaAxisToUpness(beta) {
    return 1 - (Math.abs(beta) / 180);
  }
}

export default Upness;
