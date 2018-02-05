class Velocity {
  constructor(acceleration) {
    this.acceleration = acceleration;
    this.callbacks = [];
    this.x = 0;
    this.y = 0;
    this.z = 0;

    setInterval(this.updateVelocity.bind(this), 10);
  }

  addCallback(callback) {
    this.callbacks.push(callback);
  }

  updateVelocity() {
    this.x = this.updateVelocityDimension(this.x, this.acceleration.x);
    this.y = this.updateVelocityDimension(this.y, this.acceleration.y);
    this.z = this.updateVelocityDimension(this.z, this.acceleration.z);

    this.callbacks.map((callback) => callback())
  }

  updateVelocityDimension(current, acceleration) {
    var result = current;
    //if (acceleration > 0.1 || acceleration < -0.1) {
      result = result + acceleration/100
    //}
    if (Math.abs(result) < 0.01) {
      result = 0;
    } else if (result < 0) {
      result = result + 0.01;
    } else {
      result = result - 0.01;
    }
    return result;
  }
}

export default Velocity
