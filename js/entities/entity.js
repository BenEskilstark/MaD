// @flow

import type {Radians, Vector, Size, Entity} from '../types';

let nextID = 0;

const makeEntity = (
  type: string,
  radius: Size,
  position: Vector,
  velocity?: Vector,
  theta?: Radians,

  spriteSet?: Array<any>,
): Entity => {
  return {
    id: nextID++,
    type,
    radius,
    age: 0,

    position,
    velocity: velocity || {x: 0, y: 0},
    accel: {x: 0, y: 0},

    theta: theta || 0,
    thetaSpeed: 0,

    history: [],

    frameIndex: 0,
    maxFrames: spriteSet && spriteSet.length ? spriteSet.length : 1,
    spriteSet,
  };
};

module.exports = {makeEntity};
