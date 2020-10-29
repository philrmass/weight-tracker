import { getWeekStart, getMonthStart } from './time';

export function calculateWeeks(all) {
  const byWeek = getByTerm(all, getWeekStart);
  return getTerms(byWeek);
}

export function calculateMonths(all) {
  const byMonth = getByTerm(all, getMonthStart);
  return getTerms(byMonth);
}

function getByTerm(all, getStart) {
  return all.reduce((byTerm, item) => {
    const startAt = getStart(item.at);
    const month = byTerm[startAt] ?? [];

    return {
      ...byTerm,
      [startAt]: [...month, item],
    };
  }, {}); 
}

function getTerms(byTerm) {
  return Object.entries(byTerm).map(([at, items]) => {
    const average = computeAverage(items);
    const stdDev = computeStdDev(items, average);
    return {
      at: Number(at),
      items,
      average,
      stdDev,
    };
  });
}

function computeAverage(items) {
  const sum = items.reduce((sum, item) => sum + item.weight, 0);
  const average = sum / items.length;
  return toTenths(average);
}

function computeStdDev(items, average) {
  const diffSum = items.reduce((sum, item) => {
    const diff = item.weight - average;
    return sum + diff * diff;
  }, 0);
  const stdDev = Math.sqrt(diffSum / items.length);
  return toTenths(stdDev);
}

function toTenths(value) {
  return Math.round(value * 10) / 10;
}

export function getWeightAverage(items, days) {
  if (items.length === 0) {
    return 0;
  }

  const oneDay = 1000 * 60 * 60 * 24;
  const atFirst = items[0].at - days * oneDay;
  const indexMin = items.findIndex((item) => item.at <= atFirst);

  const selected = items.slice(0, indexMin);
  return computeAverage(selected);
}
