import { EVOLVE_POPULATION, RESET_POPULATION } from '../actions/population';
import Population from '../tsp/population';
import GeneticAlgorithm from '../tsp/genetic-algorithm';

export default function population(state = {}, action) {
  switch (action.type) {
    case EVOLVE_POPULATION: {
      let result = {};
      let ga = new GeneticAlgorithm(action.mutationRate, action.selectionSize, action.elitismEnabled);
      ga.setCities(action.cities);
      let population = new Population(action.populationSize, true, action.cities);

      result.initialDistance = population.getFittest().getDistance();

      population = ga.evolvePopulation(population);
      for (let i = 0; i < action.generations; i++) {
          population = ga.evolvePopulation(population);
      }

      //result.evolvedPopulation = evolvedPopulation;
      result.finalDistance = population.getFittest().getDistance();
      result.solution = population.getFittest();
      console.log(result);
      return result;
    } case RESET_POPULATION: {
      return {};
    } default: {
      return state;
    }
  }
}
