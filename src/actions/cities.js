const GENERATE_CITIES = 'GENERATE_CITIES';

const generateCities = (count, limitX, limitY) => ({ type: GENERATE_CITIES, count, limitX, limitY });

export { GENERATE_CITIES, generateCities };
