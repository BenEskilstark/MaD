'use strict';

var nextID = 0;

var makeEntity = function makeEntity(type, radius, position, velocity, theta, spriteSet) {
  return {
    id: nextID++,
    type: type,
    radius: radius,
    age: 0,

    position: position,
    velocity: velocity || { x: 0, y: 0 },
    accel: { x: 0, y: 0 },

    theta: theta || 0,
    thetaSpeed: 0,

    history: [],

    frameIndex: 0,
    maxFrames: spriteSet && spriteSet.length ? spriteSet.length : 1,
    spriteSet: spriteSet
  };
};

module.exports = { makeEntity: makeEntity };