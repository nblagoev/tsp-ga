const EVOLVE_POPULATION = 'EVOLVE_POPULATION';

const evolvePopulation = (
  generations,
  populationSize,
  mutationRate,
  selectionSize,
  elitismEnabled
) => ({
  type: EVOLVE_POPULATION,
  generations,
  populationSize,
  mutationRate,
  selectionSize,
  elitismEnabled,
});

export { EVOLVE_POPULATION, evolvePopulation };
