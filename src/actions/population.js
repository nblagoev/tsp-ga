const EVOLVE_POPULATION = 'EVOLVE_POPULATION';
const RESET_POPULATION = 'RESET_POPULATION';

const evolvePopulation = (
  generations,
  populationSize,
  mutationRate,
  selectionSize,
  elitismEnabled,
  cities
) => ({
  type: EVOLVE_POPULATION,
  generations,
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
