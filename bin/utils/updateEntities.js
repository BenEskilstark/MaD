'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../utils/queue'),
    queueAdd = _require.queueAdd;

var _require2 = require('../config'),
    config = _require2.config;

var _require3 = require('../utils/ballistics'),
    getBallisticPosAtTime = _require3.getBallisticPosAtTime;

var _require4 = require('../utils/vectors'),
    subtract = _require4.subtract,
    vectorTheta = _require4.vectorTheta;

var updateEntity = function updateEntity(state, entity) {
  var nextEntity = physicsStepEntity(entity);
  // entity-specific updates
  switch (entity.type) {
    case 'missile':
      {
        var prevPos = _extends({}, entity.position);
        // missile overrides typical physics update by computing next position
        // based on its ballistic trajectory
        nextEntity.position = getBallisticPosAtTime(entity.initialPosition, entity.speed, entity.initialTheta, entity.age, config.g);
        nextEntity.theta = vectorTheta(subtract(nextEntity.position, prevPos));
        if (nextEntity.age == 1) {
          nextEntity.theta = Math.PI / 2;
        }
      }
    default:
  };

  return nextEntity;
};

var physicsStepEntity = function physicsStepEntity(entity) {
  queueAdd(entity.history, entity, config.maxHistorySize);
  var nextEntity = _extends({}, entity, {
    history: entity.history,
    age: entity.age + 1,
    velocity: {
      x: entity.velocity.x + entity.accel.x,
      y: entity.velocity.y + entity.accel.y
    },
    position: {
      x: entity.accel.x + entity.velocity.x + entity.position.x,
      y: entity.accel.y + entity.velocity.y + entity.position.y
    },
    theta: entity.theta + entity.thetaSpeed,
    frameIndex: (entity.frameIndex + 1) % entity.maxFrames
  });
  return nextEntity;
};

module.exports = {
  updateEntity: updateEntity
};