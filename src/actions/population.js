const EVOLVE_POPULATION = 'EVOLVE_POPULATION';

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

export { EVOLVE_POPULATION, evolvePopulation };
