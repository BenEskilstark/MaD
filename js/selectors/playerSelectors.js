// @flow

const {invariant} = require('../utils/errors');
const {config} = require('../config');

import type {Color, State, GameState, Player, PlayerID, Game, GameID} from '../types';

const getPlayerColor = (state: State, playerID: PlayerID): Color => {
  const colorIndex = state.game.players.indexOf(playerID) + 1;
  return config.playerColors[colorIndex];
};

const getClientPlayer = (state: State): Player => {
  for (const playerID in state.players) {
    if (state.players[playerID].isThisClient) {
      return state.players[playerID];
    }
  }
  invariant(false, 'no client player somehow');
};

const getHostPlayer = (state: State): Player => {
  return state.game.players[0];
};

const isHost = (state: State): boolean => {
  return getClientPlayer(state).id === getHostPlayer(state).id;
};

/**
 *  Since the client should know about all games that exist, it can compute this?
 *  TODO this is insanely dangerous though
 */
const getNextGameID = (state: State): GameID => {
  let nextGameID = -1;
  for (const gameID in state.games) {
    if (parseInt(gameID) > nextGameID) {
      nextGameID = parseInt(gameID);
    }
  }
  // what're the odds there's a collision!?
  return '' + (nextGameID + Math.round(Math.random() * 100));
}

module.exports = {
  getPlayerColor,
  getClientPlayer,
  getHostPlayer,
  isHost,
  getNextGameID,
};
