'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../config'),
    config = _require.config;

var _require2 = require('../utils/queue'),
    queueAdd = _require2.queueAdd;

var _require3 = require('../utils/vectors'),
    makeVector = _require3.makeVector;

var _require4 = require('../entities/projectile'),
    makeLaser = _require4.makeLaser,
    makeMissile = _require4.makeMissile;

var fireReducer = function fireReducer(state, action) {
  switch (action.type) {
    case 'FIRE_LASER':
      {
        var playerID = action.playerID;
        var projectiles = state.projectiles,
            ships = state.ships;

        var shipPosition = ships[playerID].position;
        var shipTheta = ships[playerID].theta;
        var projectile = makeLaser(playerID, shipPosition, shipTheta);
        queueAdd(projectiles, projectile, config.maxs);
        return _extends({}, state, {
          projectiles: projectiles
        });
      }
    case 'FIRE_MISSILE':
      {
        var _playerID = action.playerID,
            target = action.target,
            id = action.id;
        var _projectiles = state.projectiles,
            _ships = state.ships;

        var _shipPosition = _ships[_playerID].position;
        var _shipTheta = _ships[_playerID].theta;
        var shipVelocity = _ships[_playerID].velocity;

        var _projectile = makeMissile(_playerID, _shipPosition, _shipTheta, shipVelocity
        // target,
        );

        queueAdd(_projectiles, _projectile, config.maxProjectiles);
        return _extends({}, state, {
          projectiles: _projectiles
        });
      }
  }

  return state;
};

module.exports = { fireReducer: fireReducer };