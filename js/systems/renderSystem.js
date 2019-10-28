const {config} = require('../config');
const {getPlayerColor, getEntityByID} = require('../selectors/selectors');
const {renderMissile} = require('../entities/projectile');
const d3 = require('d3');
const topojson = require('topojson-client');

import type {Store, Game} from '../types';

/**
 * Render things into the canvas
 */
const initRenderSystem = (store: Store): void => {

  let time = store.getState().game.time;
  let canvas = null;
  let ctx = null;
  let svg = null;
  store.subscribe(() => {
    const state = store.getState();
    // only check on a new tick
    if (state.game.time == time && state.game.tickInterval != null) {
      return;
    }
    // important to track time this way so this only happens once per tick
    time = state.game.time;

    if (!canvas) {
      canvas = document.getElementById('canvas');
      if (!canvas) return; // don't break
      ctx = canvas.getContext('2d');
      svg = d3.select('body').append('svg');
    }

    // clear
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, config.canvasWidth, config.canvasHeight);

    render(state, ctx);
  });
}

const renderD3 = (state: State, svg: any): void => {
  const projection = d3.geoOrthographic()
    .scale(config.canvasWidth / 2)
    .translate(config.canvasWidth / 2, config.canvasHeight / 2)
    .clipAngle(90)
    .precision(0);

  const path = d3.geoPath().projection(projection);
  d3.json('../world_110m.json', (error, world) => {
    if (error) throw error;
    svg.selectAll('path')
      .data(topojson.feature(world, world.objects.countries).features)
      .enter().append('path')
      .attr('d', path);
  });
}

const render = (state: State, ctx: any): void => {
  const {game} = state;

  // scale world to the canvas
  ctx.save();
  // set the origin to the bottom left instead of top right
  ctx.translate(0, config.canvasHeight);
  ctx.scale(1, -1);
  ctx.scale(
    config.canvasWidth / config.width,
    config.canvasHeight / config.height,
  );

  for (const entity of game.entities) {
    renderEntity(state, ctx, entity);
  }

  ctx.restore();
}

const renderEntity = (state: State, ctx: any, entity: Entity): void => {
  if (entity.type == 'missile') {
    renderMissile(state, ctx, entity);
  }
}

module.exports = {initRenderSystem};
