'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../config'),
    config = _require.config;

var _require2 = require('./fireProjectileReducer'),
    fireProjectileReducer = _require2.fireProjectileReducer;

var gameReducer = function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_TURN':
      {
        return state;
      }
    case 'SET_THRUST':
      {
        return state;
      }
    case 'FIRE_MISSILE':
    case 'FIRE_LASER':
      return fireProjectileReducer(state, action);
    case 'MAKE_EXPLOSION':
      {
        return state;
      }
    case 'SHIFT_TARGET':
      {
        return state;
      }
    case 'DESTROY_ENTITY':
      {
        var id = action.id;

        var nextEntities = state.entities.filter(function (entity) {
          return entity.id != id;
        });
        return _extends({}, state, {
          entities: nextEntities
        });
      }

  }

  return state;
};

module.exports = { gameReducer: gameReducer };