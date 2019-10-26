// @flow

const {queueAdd} = require('../utils/queue');
const {config} = require('../config');
const {getBallisticPosAtTime} = require('../utils/ballistics');
const {subtract, vectorTheta} = require('../utils/vectors');

import type {GameState, Entity} from '../types';

const updateEntity = (
  state: GameState,
  entity: Entity,
): Entity => {
  const nextEntity = physicsStepEntity(entity);
  // entity-specific updates
  switch (entity.type) {
    case 'missile': {
      const prevPos = {...entity.position};
      // missile overrides typical physics update by computing next position
      // based on its ballistic trajectory
      nextEntity.position = getBallisticPosAtTime(
        entity.initialPosition,
        entity.speed,
        entity.initialTheta,
        entity.age,
        config.g,
      );
      nextEntity.theta = vectorTheta(subtract(nextEntity.position, prevPos));
      if (nextEntity.age == 1) {
        nextEntity.theta = Math.PI / 2;
      }
    }
    default:
  };

  return nextEntity;
};

const physicsStepEntity = (entity: Entity): Entity => {
  queueAdd(entity.history, entity, config.maxHistorySize)
  const nextEntity = {
    ...entity,
    history: entity.history,
    age: entity.age + 1,
    velocity: {
      x: entity.velocity.x + entity.accel.x,
      y: entity.velocity.y + entity.accel.y,
    },
    position: {
      x: entity.accel.x + entity.velocity.x + entity.position.x,
      y: entity.accel.y + entity.velocity.y + entity.position.y,
    },
    theta: entity.theta + entity.thetaSpeed,
    frameIndex: (entity.frameIndex + 1) % entity.maxFrames,
  };
  return nextEntity;
};

module.exports = {
  updateEntity,
};
