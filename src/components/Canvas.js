import React, { Component, PropTypes } from 'react';
import City from '../tsp/city';
import Population from '../tsp/population';

export default class Canvas extends Component {
  static propTypes = {
    cities: PropTypes.arrayOf(PropTypes.instanceOf(City)).isRequired,
    evolvedPopulation: PropTypes.instanceOf(Population),//.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { cities, evolvedPopulation } = this.props;
    return (
      <div>
        <h2>cities: {cities.length}</h2>
        <ul>
          { cities.map(city => <li>{city.x}, {city.y}</li>) }
        </ul>
      </div>
    );
  }
}
