
import Population from './population';
import Tour from './tour';


export default class GeneticAlgorithm {
  // Constructs a randomly placed city
  constructor(mutationRate = 0.015, tournamentSize = 5, elitism = true) {
    this.mutationRate = mutationRate;
    this.tournamentSize = tournamentSize;
    this.elitism = elitism;
  }

  setCities(cities) {
    this.cities = cities;
  }

  // Evolves a population over one generation
  evolvePopulation(pop) {
    let newPopulation = new Population(pop.size(), false);

    // Keep our best individual if elitism is enabled
    let elitismOffset = 0;
    if (this.elitism) {
      newPopulation.saveTour(0, pop.getFittest());
      elitismOffset = 1;
    }

    // Crossover population
    // Loop over the new population's size and create
    // individuals from current population
    for (let i = elitismOffset; i < newPopulation.size(); i++) {
      // Select parents
      let parent1 = this.tournamentSelection(pop);
      let parent2 = this.tournamentSelection(pop);
      // Crossover parents
      let child = this.crossover(parent1, parent2);
      // Add child to new population
      newPopulation.saveTour(i, child);
    }

    // Mutate the new population a bit to add some new genetic material
    for (let i = elitismOffset; i < newPopulation.size(); i++) {
      this.mutate(newPopulation.getTour(i));
    }

    return newPopulation;
  }

  // Applies crossover to a set of parents and creates offspring
  crossover(parent1, parent2) {
    // Create new child tour
    let child = new Tour(this.cities);

    // Get start and end sub tour positions for parent1's tour
    let startPos = Math.floor(Math.random() * parent1.tourSize);
    let endPos = Math.floor(Math.random() * parent1.tourSize);

    // Loop and add the sub tour from parent1 to our child
    for (let i = 0; i < child.tourSize; i++) {
      if (startPos < endPos && i > startPos && i < endPos) {
        // If our start position is less than the end position
        child.setCity(i, parent1.getCity(i));
      } else if (startPos > endPos) {
        // If our start position is larger
        if (!(i < startPos && i > endPos)) {
          child.setCity(i, parent1.getCity(i));
        }
      }
    }

    // Loop through parent2's city tour
    for (let i = 0; i < parent2.tourSize; i++) {
      // If child doesn't have the city add it
      if (!child.containsCity(parent2.getCity(i))) {
        // Loop to find a spare position in the child's tour
        for (let j = 0; j < child.tourSize; j++) {
          // Spare position found, add city
          if (child.getCity(j) == null) {
            child.setCity(j, parent2.getCity(i));
            break;
          }
        }
      }
    }

    return child;
  }

  // Mutate a tour using swap mutation
  mutate(tour) {
    // Loop through tour cities
    for (let tourPos1=0; tourPos1 < tour.tourSize; tourPos1++){
      // Apply mutation rate
      if (Math.random() < this.mutationRate){
        // Get a second random position in the tour
        let tourPos2 = Math.floor(tour.tourSize * Math.random());

        // Get the cities at target position in tour
        let city1 = tour.getCity(tourPos1);
        let city2 = tour.getCity(tourPos2);

        // Swap them around
        tour.setCity(tourPos2, city1);
        tour.setCity(tourPos1, city2);
      }
    }
  }

  // Selects candidate tour for crossover
  tournamentSelection(pop) {
    // Create a tournament population
    let tournament = new Population(this.tournamentSize, false);
    // For each place in the tournament get a random candidate tour and add it
    for (let i = 0; i < this.tournamentSize; i++) {
      let randomId = Math.floor(Math.random() * pop.size());
      tournament.saveTour(i, pop.getTour(randomId));
    }

    // Get the fittest tour
    let fittest = tournament.getFittest();
    return fittest;
  }
}
