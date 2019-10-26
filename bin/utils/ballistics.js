'use strict';

var pow = Math.pow,
    max = Math.max,
    cos = Math.cos,
    sin = Math.sin,
    tan = Math.tan,
    atan = Math.atan,
    atan2 = Math.atan2,
    sqrt = Math.sqrt,
    round = Math.round;


/**
 * Find the largest angle that will get a projectile from startPos to targetPos
 * at the given velocity and acceleration due to gravity
 * NOTE: will fail if the target is out of range!
 */
var getBallisticAngle = function getBallisticAngle(startPos, targetPos, speed, g) {
  var x = targetPos.x - startPos.x;
  var y = targetPos.y - startPos.y;

  var rootComponent = sqrt(pow(speed, 4) - g * (g * pow(x, 2) + 2 * y * pow(speed, 2)));
  var pSolution1 = (pow(speed, 2) + rootComponent) / (g * x);
  var pSolution2 = (pow(speed, 2) - rootComponent) / (g * x);

  return max(atan(pSolution1), atan(pSolution2));
};

/**
 * get the position of a projectile on a ballistic trajectory at time t
 * given its initial velocity, theta, and the acceleration due to gravity
 */
var getBallisticPosAtTime = function getBallisticPosAtTime(initialPosition, initialSpeed, theta, t, g) {
  return {
    x: initialSpeed * t * cos(theta) + initialPosition.x,
    y: initialSpeed * t * sin(theta) - 0.5 * g * pow(t, 2) + initialPosition.y
  };
};

module.exports = {
  getBallisticAngle: getBallisticAngle,
  getBallisticPosAtTime: getBallisticPosAtTime
};