export function printSummary(ctx, lim) {
  const start = new Date(lim.atMin).toLocaleDateString();
  const end = new Date(lim.atMax).toLocaleDateString();
  console.log(
    `RENDER (${ctx.canvas.width}, ${ctx.canvas.height})\n` +
    `  [${start} - ${end}]\n` +
    `  [${lim.weightMin} - ${lim.weightMax}]`,
  );
}

export function printItem(scl, item) {
  const date = new Date(item.at).toLocaleDateString();
  const x = scl.x(item).toFixed(1);
  const y = scl.y(item).toFixed(1);
  console.log(`${date} ${item.weight} (${x}, ${y})`);
}

export function render(ctx, all, atMin, atMax) {
  if (all.length === 0) {
    return;
  }

  const items = selectItems(all, atMin, atMax);
  const lim = calcLimits(items, atMin, atMax);
  const scl = getScale(ctx, lim);

  renderWeights(ctx, scl, items);
}

function getScale(ctx, lim) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  return {
    x: (item) => w * ((item.at - lim.atMin) / (lim.atMax - lim.atMin)),
    y: (item) => h - h * ((item.weight - lim.weightMin) / (lim.weightMax - lim.weightMin)),
  };
}

function selectItems(all, atMin, atMax) {
  const items = all.slice(0);
  const indexRange = items.length - 1;
  const indexMin = items.findIndex((item) => item.at <= atMax);
  const indexMax = indexRange - items.reverse().findIndex((item) => item.at >= atMin);

  const first = indexMin >= 1 ? indexMin - 1 : 0;
  const last = indexMax < indexRange ? indexMax + 1 : indexRange;

  return all.slice(first, last + 1);
}

function calcLimits(items, atMin, atMax) {
  const space = 0.05;
  const wMax = items.reduce((max, item) => item.weight > max ? item.weight : max, 0);
  const wMin = items.reduce((min, item) => item.weight < min ? item.weight : min, wMax);
  const wRange = wMax - wMin;

  const wSpace = space * wRange;
  const weightMin = wMin - wSpace;
  const weightMax = wMax + wSpace;

  return {
    atMin,
    atMax,
    weightMin,
    weightMax,
  };
}

function renderWeights(ctx, scl, items) {
  setWeightLine(ctx);
  ctx.beginPath();
  ctx.moveTo(scl.x(items[0]), scl.y(items[0]));

  for (const item of items) {
    ctx.lineTo(scl.x(item), scl.y(item));
  }

  ctx.stroke();
}

function setWeightLine(ctx) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#ff2105';
}
