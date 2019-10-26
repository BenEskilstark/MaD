// @flow

const {makeEntity} = require('./entity');
const {config} = require('../config');
const {makeVector, add} = require('../utils/vectors');
const {getBallisticAngle} = require('../utils/ballistics');
const {getPlayerColor} = require('../selectors/selectors');
const {max, round, sqrt} = Math;

import type {Radians, PlayerID, Vector, Projectile, Missile} from '../types';

const makeMissile = (
  position: Vector,
  target: Vector,
): Missile => {
  const theta = getBallisticAngle(position, target, config.missile.speed, config.g);
  const projectile = {
    ...makeEntity(
      'missile',
      config.missile.radius,
      position,
      {x: 0, y: 0}, // velocity not needed for missiles
      Math.PI / 2, // initial theta is up
    ),
    initialPosition: {...position},
    initialTheta: theta,
    speed: config.missile.speed,
    target,
  };
  return projectile;
}


const makeLaser = (
  position: Vector,
  theta: Radians,
): Projectile => {
  const velocity = makeVector(theta, config.laserSpeed);
  return {
    ...makeEntity('laser', 0 /* radius */, position, velocity, theta),
  };
};

const renderMissile = (state, ctx, missile): void => {
  // history goes first so it renders underneath
  ctx.save();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'blue';
  ctx.beginPath();
  let i = 0;
  for (const pastMissile of missile.history) {
    if (i == 0) {
      ctx.moveTo(pastMissile.position.x, pastMissile.position.y);
      i = 1;
    } else {
      ctx.lineTo(pastMissile.position.x, pastMissile.position.y);
    }
  }
  if (missile.history.length > 0) {
    ctx.lineTo(missile.position.x, missile.position.y);
  }
  ctx.stroke();
  ctx.restore();

  // missile itself
  ctx.save();
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.translate(missile.position.x, missile.position.y);
  ctx.rotate(missile.theta);

  ctx.moveTo(missile.radius, 0);

  ctx.lineTo(-1 * missile.radius / 2, -1 * missile.radius / 2);
  ctx.lineTo(-1 * missile.radius / 2, missile.radius / 2);
  ctx.closePath();
  ctx.fill();
  // ctx.stroke();

  // flames
  ctx.fillStyle = 'orange';
  ctx.beginPath();
  ctx.moveTo(-1 * missile.radius / 1.25, 0);
  ctx.lineTo(-1 * missile.radius / 2, -1 * missile.radius / 3);
  ctx.lineTo(-1 * missile.radius / 2, missile.radius / 3);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
};

module.exports = {
  makeLaser,
  makeMissile,
  renderMissile,
};
