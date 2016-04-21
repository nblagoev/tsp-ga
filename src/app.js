import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import remote from 'remote';
import webFrame from 'web-frame';
import {ipcRenderer} from 'electron';

import App from './containers/App';
import ContextMenu from './menus/context-menu.json';

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

// react entry point
(() => {
  const settings = { limitX: 500, limitY: 461 };
  ReactDOM.render(
    <App settings={settings} />,
    document.getElementById('root')
  );
})();
