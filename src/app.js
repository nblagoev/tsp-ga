import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import remote from 'remote';
import webFrame from 'web-frame';
import {ipcRenderer} from 'electron';

import { configureStore } from './store/configureStore';
import Root from './containers/Root';

import ContextMenu from './menus/context-menu.json';
import City from './tsp/city';
import Population from './tsp/population';
import TourManager from './tsp/tour-manager';
import {evolvePopulation} from './tsp/genetic-algorithm';

(() => {

  let contextMenu = _.cloneDeep(ContextMenu);
  const menu = remote.require('menu').buildFromTemplate(contextMenu);

  window.addEventListener('contextmenu', onContextMenu, false);

  function onContextMenu(e) {
    e.preventDefault();
    menu.popup(remote.getCurrentWindow());
  }
})();

(() => {
  // Temporary fix for node bug : https://github.com/nodejs/node/issues/3158
  let ownPropertyNames = Object.getOwnPropertyNames.bind(Object);

  Object.getOwnPropertyNames = (o) => {
    let result = ownPropertyNames(o);
    let keys = Object.keys(o);
    let difference = _.difference(keys, result);
    return difference.length ? result.concat(difference) : result;
  };
})();

(() => {
  for (let i = 0; i < 10; i++) {
    TourManager.addCity(new City());
  }

  // Initialize population
  let population = new Population(50, true);
  console.log("Initial distance: " + population.getFittest().getDistance());

  // Evolve population for 100 generations
  population = evolvePopulation(population);
  for (let i = 0; i < 100; i++) {
      population = evolvePopulation(population);
  }

  // Print final results
  console.log("Finished");
  console.log("Final distance: " + population.getFittest().getDistance());
  console.log("Solution:" + population.getFittest());
})();

// react entry point
(() => {
  const store = configureStore({
    settings: {
      numberOfCities: 20,
      numberOfGenerations: 100,
      populationSize: 50,
      mutationRate: 0.015,
      selectionSize: 5,
      elitismEnabled: true
    }
  });
  ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
  );
})();
