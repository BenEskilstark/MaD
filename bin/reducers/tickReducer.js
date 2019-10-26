'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../utils/queue'),
    queueAdd = _require.queueAdd;

var _require2 = require('../utils/vectors'),
    subtract = _require2.subtract,
    distance = _require2.distance;

var _require3 = require('../utils/updateEntities'),
    updateEntity = _require3.updateEntity;

var _require4 = require('../config'),
    config = _require4.config;

var sin = Math.sin,
    cos = Math.cos,
    abs = Math.abs,
    sqrt = Math.sqrt;

var _require5 = require('./gameReducer'),
    gameReducer = _require5.gameReducer;

var _require6 = require('../utils/errors'),
    invariant = _require6.invariant;

var _require7 = require('../selectors/selectors'),
    getEntityByID = _require7.getEntityByID;

var tickReducer = function tickReducer(state, action) {
  switch (action.type) {
    case 'START_TICK':
      if (state.game != null && state.game.tickInterval != null) {
        return state;
      }
      return _extends({}, state, {
        tickInterval: setInterval(
        // HACK: store is only available via window
        function () {
          return store.dispatch({ type: 'TICK' });
        }, config.msPerTick)
      });
    case 'STOP_TICK':
      clearInterval(state.tickInterval);
      state.tickInterval = null;
      return state;
    case 'TICK':
      return handleTick(state);
  }
  return state;
};

var handleTick = function handleTick(state) {

  // update entities
  var nextEntities = [];
  for (var i = 0; i < state.entities.length; i++) {
    nextEntities.push(updateEntity(state, state.entities[i]));
  }

  return _extends({}, state, {
    time: state.time + 1,
    entities: nextEntities
  });
};

module.exports = { tickReducer: tickReducer };