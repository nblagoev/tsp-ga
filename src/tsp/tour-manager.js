

export default class TourManager {
  static destinationCities = [];

  // Adds a destination city
  static addCity(city) {
    this.destinationCities.push(city);
  }

  // Get a city
  static getCity(index) {
    return this.destinationCities[index];
  }

  // Get the number of destination cities
  static countCities() {
    return this.destinationCities.length;
  }
}
