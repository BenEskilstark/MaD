'use strict';

// a system for starting up the other systems

var _require = require('./renderSystem'),
    initRenderSystem = _require.initRenderSystem;

var _require2 = require('./keyboardControlsSystem'),
    initKeyboardControlsSystem = _require2.initKeyboardControlsSystem;

var started = false; // TODO there's a better way to handle this...
var initSystems = function initSystems(store) {
  store.subscribe(function () {
    var state = store.getState();
    if (started || !state.game) {
      return;
    }
    started = true;

    initRenderSystem(store);
    initKeyboardControlsSystem(store);
  });
};

module.exports = { initSystems: initSystems };