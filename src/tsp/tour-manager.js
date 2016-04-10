
const destinationCities = [];

export default class TourManager {
  // Adds a destination city
  static addCity(city) {
    destinationCities.push(city);
  }

  // Get a city
  static getCity(index) {
    return destinationCities[index];
  }

  // Get the number of destination cities
  static countCities() {
    return destinationCities.length;
  }
}
