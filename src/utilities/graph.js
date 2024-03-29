import {
  getDayStart,
  getWeekStart,
  getMonthStart,
  getYearStart,
  getWeek,
  getMonth,
  getYear,
} from './time';

export function calcAtView(items, atRange) {
  if (items?.length > 0) {
    const atStart = items[0]?.at - atRange;
    const atEnd = items[0]?.at;

    return [atStart, atEnd];
  }

  return 0;
}

export function getAtLimits(items, rangeMin) {
  const max = items[0]?.at;
  const min = items[items.length - 1]?.at;
  const range = max - min;

  if (range < rangeMin) {
    return [max - rangeMin, max];
  }
  return [min, max];
}

export function adjustAtView(view, limits, moveRatio, scaleRatio, centerRatio) {
  const moved = applyMove(view, limits, moveRatio);
  return applyScale(moved, limits, scaleRatio, centerRatio);
}

function applyMove([start, end], [min, max], moveRatio) {
  const range = end - start;
  const move = moveRatio * range;

  if (start + move < min) {
    return [min, min + range];
  }
  if (end + move > max) {
    return [max - range, max];
  }
  return [start + move, end + move];
}

function applyScale([start, end], [min, max], scaleRatio, centerRatio) {
  const range = end - start;
  const center = start + centerRatio * range;
  const left = center - start;
  const right = end - center;

  const scaledStart = center - left / scaleRatio;
  const scaledEnd = center + right / scaleRatio;

  const limitedStart = scaledStart < min ? min : scaledStart;
  const limitedEnd = scaledEnd > max ? max : scaledEnd;

  return [limitedStart, limitedEnd];
}

export function render(ctx, items, atView) {
  if (items?.length > 0) {
    const view = calcView(items, atView);
    const viewItems = selectViewItems(items, atView);
    const coord = calcCoord(ctx, view);

    renderTimeLines(ctx, coord, view);
    renderWeightLines(ctx, coord, view);
    renderWeightLabels(ctx, coord, view);
    renderWeights(ctx, coord, viewItems);
  }
}

function calcView(items, [atStart, atEnd]) {
  const wMax = items.reduce((max, item) => item.weight > max ? item.weight : max, 0);
  const wMin = items.reduce((min, item) => item.weight < min ? item.weight : min, wMax);
  const wRange = wMax - wMin;

  const space = 0.05;
  const wSpace = space * wRange;
  const weightStart = wMin - wSpace;
  const weightEnd = wMax + wSpace;

  return {
    atStart,
    atEnd,
    weightStart,
    weightEnd,
  };
}

function selectViewItems(items, [atStart, atEnd]) {
  const indexLast = items.length - 1;
  const indexMin = items.findIndex((item) => item.at <= atEnd);
  const indexMax = indexLast - items.slice(0).reverse().findIndex((item) => item.at >= atStart);

  const first = indexMin >= 1 ? indexMin - 1 : 0;
  const last = indexMax < indexLast ? indexMax + 1 : indexLast;

  return items.slice(first, last + 1);
}

function calcCoord(ctx, view) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  return {
    x: (at) => w * ((at - view.atStart) / (view.atEnd - view.atStart)),
    y: (weight) => h - h * ((weight - view.weightStart) / (view.weightEnd - view.weightStart)),
  };
}

function renderTimeLines(ctx, coord, view) {
  const dayMs = 1000 * 60 * 60 * 24;
  const daysWide = (view.atEnd - view.atStart) / dayMs;

  if (daysWide < 60) {
    renderDayLines(ctx, coord, view, 0);
    renderWeekLines(ctx, coord, view, 1);
    renderWeekLabels(ctx, coord, view);
  } else if (daysWide < 250) {
    renderWeekLines(ctx, coord, view, 0);
    renderMonthLines(ctx, coord, view, 1);
    renderMonthLabels(ctx, coord, view);
  } else {
    renderMonthLines(ctx, coord, view, 0);
    renderYearLines(ctx, coord, view, 1);
    renderYearLabels(ctx, coord, view);
  }
}

function renderDayLines(ctx, coord, view, type) {
  const dayMs = 1000 * 60 * 60 * 24;
  const dayMin = getDayStart(view.atStart) + dayMs;
  const dayMax = getDayStart(view.atEnd) + dayMs;

  setLineStyle(ctx, type);

  ctx.beginPath();
  for (let i = dayMin; i <= dayMax; i+= dayMs) {
    const x = coord.x(i);

    ctx.moveTo(x, 0);
    ctx.lineTo(x, ctx.canvas.height);
  }
  ctx.stroke();
}

function renderWeekLines(ctx, coord, view, type) {
  const weekMs = 1000 * 60 * 60 * 24 * 7;
  const weekMin = getWeekStart(view.atStart) + weekMs;
  const weekMax = getWeekStart(view.atEnd) + weekMs;

  setLineStyle(ctx, type);

  ctx.beginPath();
  for (let i = weekMin; i <= weekMax; i+= weekMs) {
    const x = coord.x(i);

    ctx.moveTo(x, 0);
    ctx.lineTo(x, ctx.canvas.height);
  }
  ctx.stroke();
}

function renderMonthLines(ctx, coord, view, type) {
  const monthMax = getMonthStart(view.atEnd);

  setLineStyle(ctx, type);

  ctx.beginPath();
  let offset = 1;
  let i = getMonthStart(view.atStart, offset);
  while (i <= monthMax) {
    const x = coord.x(i);

    ctx.moveTo(x, 0);
    ctx.lineTo(x, ctx.canvas.height);

    offset++;
    i = getMonthStart(view.atStart, offset);
  }
  ctx.stroke();
}

function renderYearLines(ctx, coord, view, type) {
  const yearMax = getYearStart(view.atEnd);

  setLineStyle(ctx, type);

  ctx.beginPath();
  let offset = 1;
  let i = getYearStart(view.atStart, offset);
  while (i <= yearMax) {
    const x = coord.x(i);

    ctx.moveTo(x, 0);
    ctx.lineTo(x, ctx.canvas.height);

    offset++;
    i = getYearStart(view.atStart, offset);
  }
  ctx.stroke();
}

function renderWeightLines(ctx, coord, view) {
  const div = 5;
  const min5 = Math.ceil(view.weightStart / 5);
  const max5 = Math.floor(view.weightEnd / 5);

  setLineStyle(ctx, 1);

  ctx.beginPath();
  for (let i = min5; i <= max5; i++) {
    const weight = div * i;
    const y = coord.y(weight);

    ctx.moveTo(0, y);
    ctx.lineTo(ctx.canvas.width, y);
  }
  ctx.stroke();

  const min = Math.ceil(view.weightStart);
  const max = Math.floor(view.weightEnd);

  setLineStyle(ctx, 0);

  ctx.beginPath();
  for (let i = min; i <= max; i++) {
    const y = coord.y(i);
    const not5 = i % 5 !== 0;

    if (not5) {
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
    }
  }
  ctx.stroke();
}

function renderWeekLabels(ctx, coord, view) {
  const weekMs = 1000 * 60 * 60 * 24 * 7;
  const weekMin = getWeekStart(view.atStart) + weekMs;
  const weekMax = getWeekStart(view.atEnd) + weekMs;

  setTextStyle(ctx);

  for (let i = weekMin; i <= weekMax; i+= weekMs) {
    const x = coord.x(i);

    renderLabel(ctx, getWeek(i, ''), 90, x);
  }
}

function renderMonthLabels(ctx, coord, view) {
  const monthMax = getMonthStart(view.atEnd);

  setTextStyle(ctx);

  let offset = 1;
  let i = getMonthStart(view.atStart, offset);
  while (i <= monthMax) {
    const x = coord.x(i);

    renderLabel(ctx, getMonth(i, true), 90, x);

    offset++;
    i = getMonthStart(view.atStart, offset);
  }
}

function renderYearLabels(ctx, coord, view) {
  const yearMax = getYearStart(view.atEnd);

  setTextStyle(ctx);

  let offset = 1;
  let i = getYearStart(view.atStart, offset);
  while (i <= yearMax) {
    const x = coord.x(i);

    renderLabel(ctx, getYear(i), 90, x);

    offset++;
    i = getYearStart(view.atStart, offset);
  }
}

function renderWeightLabels(ctx, coord, view) {
  const div = 5;
  const min5 = Math.ceil(view.weightStart / 5);
  const max5 = Math.floor(view.weightEnd / 5);

  setTextStyle(ctx);

  for (let i = min5; i <= max5; i++) {
    const weight = div * i;
    const y = coord.y(weight);

    renderLabel(ctx, `${weight}`, 0, 0, y);
  }
}

function renderLabel(ctx, text, deg = 0, x = 0, y = 0) {
  const radians = deg * Math.PI / 180;
  const gap = 5;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(radians);
  ctx.fillText(text, 2 * gap, -gap);
  ctx.restore();
}

function renderWeights(ctx, coord, items) {
  setLineStyle(ctx, 3);

  ctx.beginPath();
  ctx.moveTo(coord.x(items[0].at), coord.y(items[0].weight));

  for (const item of items) {
    ctx.lineTo(coord.x(item.at), coord.y(item.weight));
  }

  ctx.stroke();
}

const red = '#ff2105';
const green = '#12d025';
const blue = '#8080ef';
const gray = '#a8a8a8';

function setLineStyle(ctx, type) {
  switch(type) {
    case 0:
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = gray;
      break;
    case 1:
      ctx.lineWidth = 1;
      ctx.strokeStyle = blue;
      break;
    case 2:
      ctx.lineWidth = 2;
      ctx.strokeStyle = green;
      break;
    case 3:
      ctx.lineWidth = 1;
      ctx.strokeStyle = red;
      break;
  }
}

function setTextStyle(ctx) {
  ctx.font = '11px Arial';
  ctx.fillStyle = blue;
}
