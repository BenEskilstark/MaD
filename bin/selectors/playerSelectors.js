'use strict';

var _require = require('../utils/errors'),
    invariant = _require.invariant;

var _require2 = require('../config'),
    config = _require2.config;

var getPlayerColor = function getPlayerColor(state, playerID) {
  var colorIndex = state.game.players.indexOf(playerID) + 1;
  return config.playerColors[colorIndex];
};

var getClientPlayer = function getClientPlayer(state) {
  for (var playerID in state.players) {
    if (state.players[playerID].isThisClient) {
      return state.players[playerID];
    }
  }
  invariant(false, 'no client player somehow');
};

var getHostPlayer = function getHostPlayer(state) {
  return state.game.players[0];
};

var isHost = function isHost(state) {
  return getClientPlayer(state).id === getHostPlayer(state).id;
};

/**
 *  Since the client should know about all games that exist, it can compute this?
 *  TODO this is insanely dangerous though
 */
var getNextGameID = function getNextGameID(state) {
  var nextGameID = -1;
  for (var gameID in state.games) {
    if (parseInt(gameID) > nextGameID) {
      nextGameID = parseInt(gameID);
    }
  }
  // what're the odds there's a collision!?
  return '' + (nextGameID + Math.round(Math.random() * 100));
};

module.exports = {
  getPlayerColor: getPlayerColor,
  getClientPlayer: getClientPlayer,
  getHostPlayer: getHostPlayer,
  isHost: isHost,
  getNextGameID: getNextGameID
};