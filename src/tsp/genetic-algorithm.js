
import Population from './population';
import Tour from './tour';

/* GA parameters */
const mutationRate = 0.015;
const tournamentSize = 5;
const elitism = true;

  // Evolves a population over one generation
  export function evolvePopulation(pop) {
    let newPopulation = new Population(pop.size(), false);

    // Keep our best individual if elitism is enabled
    let elitismOffset = 0;
    if (elitism) {
      newPopulation.saveTour(0, pop.getFittest());
      elitismOffset = 1;
    }

    // Crossover population
    // Loop over the new population's size and create
    // individuals from current population
    for (let i = elitismOffset; i < newPopulation.size(); i++) {
      // Select parents
      let parent1 = tournamentSelection(pop);
      let parent2 = tournamentSelection(pop);
      // Crossover parents
      let child = crossover(parent1, parent2);
      // Add child to new population
      newPopulation.saveTour(i, child);
    }

    // Mutate the new population a bit to add some new genetic material
    for (let i = elitismOffset; i < newPopulation.size(); i++) {
      mutate(newPopulation.getTour(i));
    }

    return newPopulation;
  }

  // Applies crossover to a set of parents and creates offspring
  export function crossover(parent1, parent2) {
    // Create new child tour
    let child = new Tour();

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
  export function mutate(tour) {
    // Loop through tour cities
    for (let tourPos1=0; tourPos1 < tour.tourSize; tourPos1++){
      // Apply mutation rate
      if (Math.random() < mutationRate){
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
  export function tournamentSelection(pop) {
    // Create a tournament population
    let tournament = new Population(tournamentSize, false);
    // For each place in the tournament get a random candidate tour and add it
    for (let i = 0; i < tournamentSize; i++) {
      let randomId = Math.floor(Math.random() * pop.size());
      tournament.saveTour(i, pop.getTour(randomId));
    }

    // Get the fittest tour
    let fittest = tournament.getFittest();
    return fittest;
  }
