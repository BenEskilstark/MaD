// @flow

const {pow, max, cos, sin, tan, atan, atan2, sqrt, round} = Math;

import type {Vector, Radians, Degrees} from './vectors';

/**
 * Find the largest angle that will get a projectile from startPos to targetPos
 * at the given velocity and acceleration due to gravity
 * NOTE: will fail if the target is out of range!
 */
const getBallisticAngle = (
  startPos: Vector,
  targetPos: Vector,
  speed: number,
  g: number,
): Radians => {
  const x = targetPos.x - startPos.x;
  const y = targetPos.y - startPos.y;

  const rootComponent = sqrt(
    pow(speed, 4) - g * (g*pow(x, 2) + 2 * y * pow(speed, 2))
  );
  const pSolution1 = (pow(speed, 2) + rootComponent) / (g * x);
  const pSolution2 = (pow(speed, 2) - rootComponent) / (g * x);

  return max(atan(pSolution1), atan(pSolution2));
};

/**
 * get the position of a projectile on a ballistic trajectory at time t
 * given its initial velocity, theta, and the acceleration due to gravity
 */
const getBallisticPosAtTime = (
  initialPosition: Vector,
  initialSpeed: number,
  theta: Radians,
  t: number, // time step
  g: number
): Vector => {
  return {
    x: initialSpeed * t * cos(theta) + initialPosition.x,
    y: initialSpeed * t * sin(theta) - 0.5 * g * pow(t, 2) + initialPosition.y,
  };
};

module.exports = {
  getBallisticAngle,
  getBallisticPosAtTime,
};
