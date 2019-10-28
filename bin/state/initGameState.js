'use strict';

var _require = require('../entities/entity'),
    makeEntity = _require.makeEntity;

var _require2 = require('../entities/projectile'),
    makeMissile = _require2.makeMissile;

var _require3 = require('../config'),
    config = _require3.config;

var initGameState = function initGameState(players) {
  var testMissile = makeMissile({ x: 50, y: 150 }, { x: 750, y: 175 });
  return {
    players: players,
    time: 0,
    tickInterval: null,
    entities: [testMissile]
  };
};

module.exports = { initGameState: initGameState };