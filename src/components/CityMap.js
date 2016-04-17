import React, { Component, PropTypes } from 'react';
import City from '../tsp/city';
import Population from '../tsp/population';

export default class CityMap extends Component {
  static propTypes = {
    cities: PropTypes.arrayOf(PropTypes.instanceOf(City)).isRequired,
    evolvedPopulation: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidUpdate(prevProps, prevState) {
    var context = this.canvas.getContext("2d");
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let city of this.props.cities) {
      context.beginPath();
      context.arc(city.x, city.y, 2, 0, 2 * Math.PI, true);
      context.fill();
    }
    console.log(this.props.evolvedPopulation);
  }

  render() {
    return (
      <canvas ref={(ref) => this.canvas = ref}
              width={this.props.settings.limitX}
              height={this.props.settings.limitY}/>
    );
  }
}
