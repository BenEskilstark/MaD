'use strict';

var _require = require('../utils/errors'),
    invariant = _require.invariant;

var _require2 = require('../config'),
    config = _require2.config;

var getPlayerColor = function getPlayerColor(state, playerID) {
  var colorIndex = state.game.gamePlayers.indexOf(playerID) + 1;
  return config.playerColors[colorIndex];
};

var getNextTarget = function getNextTarget(state, playerID) {};

var getEntityByID = function getEntityByID(game, id) {
  var _state = state,
      entities = _state.entities;

  var entityIDs = entities.map(function (entity) {
    return entity.id;
  });

  var index = entityIDs.indexOf(id);
  if (index == -1) {
    return null;
  }
  return entities[index];
};

module.exports = {
  getPlayerColor: getPlayerColor,
  getNextTarget: getNextTarget,
  getEntityByID: getEntityByID
};