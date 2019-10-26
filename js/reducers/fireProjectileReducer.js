// @flow

const {config} = require('../config');
const {queueAdd} = require('../utils/queue');
const {makeVector} = require('../utils/vectors')
const {makeLaser, makeMissile} = require('../entities/projectile');

import type {State, GameState, Action} from '../types';

const fireReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'FIRE_LASER': {
      const {playerID} = action;
      const {projectiles, ships} = state;
      let shipPosition = ships[playerID].position;
      let shipTheta = ships[playerID].theta;
      const projectile = makeLaser(playerID, shipPosition, shipTheta);
      queueAdd(projectiles, projectile, config.maxs);
      return {
        ...state,
        projectiles,
      };
    }
    case 'FIRE_MISSILE': {
      const {playerID, target, id} = action;
      const {projectiles, ships} = state;
      let shipPosition = ships[playerID].position;
      let shipTheta = ships[playerID].theta;
      let shipVelocity = ships[playerID].velocity;

      const projectile = makeMissile(
        playerID,
        shipPosition,
        shipTheta,
        shipVelocity,
        // target,
      );

      queueAdd(projectiles, projectile, config.maxProjectiles);
      return {
        ...state,
        projectiles,
      };
    }
  }

  return state;
};

module.exports = {fireReducer};
