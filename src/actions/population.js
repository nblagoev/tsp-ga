const EVOLVE_POPULATION = 'EVOLVE_POPULATION';
const RESET_POPULATION = 'RESET_POPULATION';

const evolvePopulation = (
  population,
  populationSize,
  mutationRate,
  selectionSize,
  elitismEnabled,
  cities
) => ({
  type: EVOLVE_POPULATION,
  population,
  populationSize,
  mutationRate,
  selectionSize,
  elitismEnabled,
  cities,
});

const resetPopulation = () => ({
  type: RESET_POPULATION,
});

export { EVOLVE_POPULATION, RESET_POPULATION, evolvePopulation, resetPopulation };
