'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('./entity'),
    makeEntity = _require.makeEntity;

var _require2 = require('../config'),
    config = _require2.config;

var _require3 = require('../utils/vectors'),
    makeVector = _require3.makeVector,
    add = _require3.add;

var _require4 = require('../utils/ballistics'),
    getBallisticAngle = _require4.getBallisticAngle;

var _require5 = require('../selectors/selectors'),
    getPlayerColor = _require5.getPlayerColor;

var max = Math.max,
    round = Math.round,
    sqrt = Math.sqrt;


var makeMissile = function makeMissile(position, target) {
  var theta = getBallisticAngle(position, target, config.missile.speed, config.g);
  var projectile = _extends({}, makeEntity('missile', config.missile.radius, position, { x: 0, y: 0 }, // velocity not needed for missiles
  Math.PI / 2 // initial theta is up
  ), {
    initialPosition: _extends({}, position),
    initialTheta: theta,
    speed: config.missile.speed,
    target: target
  });
  return projectile;
};

var makeLaser = function makeLaser(position, theta) {
  var velocity = makeVector(theta, config.laserSpeed);
  return _extends({}, makeEntity('laser', 0 /* radius */, position, velocity, theta));
};

var renderMissile = function renderMissile(state, ctx, missile) {
  // history goes first so it renders underneath
  ctx.save();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'blue';
  ctx.beginPath();
  var i = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = missile.history[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var pastMissile = _step.value;

      if (i == 0) {
        ctx.moveTo(pastMissile.position.x, pastMissile.position.y);
        i = 1;
      } else {
        ctx.lineTo(pastMissile.position.x, pastMissile.position.y);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
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
  makeLaser: makeLaser,
  makeMissile: makeMissile,
  renderMissile: renderMissile
};