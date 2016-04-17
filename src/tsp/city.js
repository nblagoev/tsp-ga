
export default class City {
  // Constructs a randomly placed city
  constructor(limitX, limiY) {
    this.x = Math.floor(Math.random() * limitX);
    this.y = Math.floor(Math.random() * limiY);
  }

  // Gets the distance to given city
  distanceTo(city) {
    let xDistance = Math.abs(this.x - city.x);
    let yDistance = Math.abs(this.y - city.y);
    let distance = Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));

    return distance;
  }

  toString() {
    return `${this.x}, ${this.y}`;
  }
}
