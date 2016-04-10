
import Tour from './tour';

export default class Population {

    // Construct a population
    constructor(populationSize, initialize) {
      this.tours = new Array(populationSize);
      // If we need to initialize a population of tours do so
      if (initialize === true) {
        // Loop and create individuals
        for (let i = 0; i < this.size(); i++) {
          let newTour = new Tour();
          newTour.generateIndividual();
          this.saveTour(i, newTour);
        }
      }
    }

    // Saves a tour
    saveTour(index, tour) {
      this.tours[index] = tour;
    }

    // Gets a tour from population
    getTour(index) {
      return this.tours[index];
    }

    // Gets the best tour in the population
    getFittest() {
      let fittest = this.tours[0];
      // Loop through individuals to find fittest
      for (let i = 1; i < this.size(); i++) {
        if (fittest.getFitness() <= this.getTour(i).getFitness()) {
          fittest = this.getTour(i);
        }
      }
      return fittest;
    }

    // Gets population size
    size() {
      return this.tours.length;
    }
}
