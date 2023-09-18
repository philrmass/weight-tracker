import { getWeekStart, getMonthStart } from './time';

export function calculateWeeks(all) {
  const byWeek = getByTerm(all, getWeekStart);
  return getTerms(byWeek, getWeekStart);
}

export function calculateMonths(all) {
  const byMonth = getByTerm(all, getMonthStart);
  return getTerms(byMonth, getMonthStart);
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

function getTerms(byTerm, getStart) {
  return Object.entries(byTerm).map(([at, items]) => {
    const average = computeAverage(items);
    const stdDev = computeStdDev(items, average);
    const atStart = Number(at);
    const atEnd = getStart(atStart, 1);

    return {
      atStart,
      atEnd,
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
