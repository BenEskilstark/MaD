// @flow

const {makeEntity} = require('../entities/entity');
const {makeMissile} = require('../entities/projectile');
const {config} = require('../config');

import type {GameState, PlayerID} from '../types';

const initGameState = (players: Array<PlayerID>): GameState => {
  const testMissile =
      makeMissile(
        {x: 50, y: 150},
        {x: 750, y: 175},
      );
  return {
    players,
    time: 0,
    tickInterval: null,
    entities: [
      testMissile,
    ],
  };
}

module.exports = {initGameState};
