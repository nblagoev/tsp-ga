
import TourManager from './tour-manager';
import {knuthShuffle as shuffle} from 'knuth-shuffle';
import _ from 'lodash';

export default class Tour {

  constructor (cities) {
    this.cities = cities;
    this.tour = new Array(cities.length);
    this.fitness = 0;
    this.distance = 0;
  }

  // Creates a random individual
  generateIndividual() {
    // Loop through all our destination cities and add them to our tour
    for (let cityIndex = 0; cityIndex < this.cities.length; cityIndex++) {
      this.setCity(cityIndex, this.cities[cityIndex]);
    }

    // Randomly reorder the tour
    shuffle(this.tour);
  }

  // Gets a city from the tour
  getCity(tourPosition) {
    return this.tour[tourPosition];
  }

  // Sets a city in a certain position within a tour
  setCity(tourPosition, city) {
    this.tour[tourPosition] = city;
    // If the tours been altered we need to reset the fitness and distance
    this.fitness = 0;
    this.distance = 0;
  }

  // Gets the tours fitness
  getFitness() {
    if (this.fitness == 0) {
      this.fitness = 1 / this.getDistance();
    }

    return this.fitness;
  }

    // Gets the total distance of the tour
  getDistance() {
    if (this.distance == 0) {
      let tourDistance = 0;
      // Loop through our tour's cities
      for (let cityIndex = 0; cityIndex < this.tourSize; cityIndex++) {
        // Get city we're travelling from
        let fromCity = this.getCity(cityIndex);
        // City we're travelling to
        let destinationCity;
        // Check we're not on our tour's last city, if we are set our
        // tour's final destination city to our starting city
        if (cityIndex + 1 < this.tourSize) {
            destinationCity = this.getCity(cityIndex + 1);
        } else {
            destinationCity = this.getCity(0);
        }

        // Get the distance between the two cities
        tourDistance += fromCity.distanceTo(destinationCity);
      }
      this.distance = tourDistance;
    }

    return this.distance;
  }

  // Get number of cities on our tour
  get tourSize() {
    return this.tour.length;
  }

  // Check if the tour contains a city
  containsCity(city) {
    return this.tour.includes(city);
    //return _.includes(this.tour, city);
  }

  toString() {
    var geneString = "|";
    for (let i = 0; i < this.tourSize; i++) {
      geneString += this.getCity(i) + "|";
    }

    return geneString;
  }

}
