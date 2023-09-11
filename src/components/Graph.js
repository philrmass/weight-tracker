import { useEffect, useRef, useState } from 'preact/hooks';
import {
  calcAtView,
  getAtLimits,
  adjustAtView,
  render,
} from '../utilities/graph';
import { getDays } from '../utilities/time';
import { getMoveRatios, getTouches } from 'utilities/touch';
import styles from './Graph.module.css';

// ??? update to utility
/*
function getTouches(e) {
  const w = e.target.clientWidth;
  return Array.from(e.touches).map((touch) => ({
    id: touch.identifier,
    x: touch.clientX,
    w,
  }));
}

function getMoveX(lasts, nows) {
  const w = nows[0].w;
  const diffs = getDiffs(lasts, nows);
  const dx = getAverage(diffs);

  return (dx / w);
}

function getDiffs(lasts, nows) {
  return nows.reduce((diffs, now) => {
    const match = lasts.find((last) => last.id === now.id);
    if (match) {
      const diff = now.x - match.x;
      return [...diffs, diff];
    }
    return diffs;
  }, []);
}

function getAverage(diffs) {
  if (diffs.length > 0) {
    const sum = diffs.reduce((sum, diff) => sum + diff, 0);
    return sum / diffs.length;
  }
  return 0;
}
*/

/*
function getScaleX(lasts, nows) {
  const w = nows[0].w;
  const lastIds = lasts.map((last) => last.id);
  const matched = nows.filter((now) => lastIds.includes(now.id));

  if (matched.length >= 2) {
    const nowMax = matched.reduce((max, item) => item.x > max.x ? item : max, matched[0]);
    const nowMin = matched.reduce((min, item) => item.x < min.x ? item : min, matched[0]);
    const nowDist = nowMax.x - nowMin.x;

    const lastMax = lasts.find((last) => last.id === nowMax.id);
    const lastMin = lasts.find((last) => last.id === nowMin.id);
    const lastDist = lastMax.x - lastMin.x;

    if (lastDist > 0) {
      const scale = nowDist / lastDist;
      const nowCenter = (nowMin.x + nowMax.x) / 2;

      return [scale, nowCenter / w];
    }
  }
  return [1.0, 0.5];
}
*/

function renderCanvas(canvas, wrap, weights, atView) {
  if (canvas.current) {
    const ctx = canvas.current.getContext('2d');
    ctx.canvas.width = wrap.current.clientWidth;
    ctx.canvas.height = wrap.current.clientHeight;
    render(ctx, weights, atView);
  }
}

export default function Graph({ weights }) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const [touches, setTouches] = useState([]);
  const [atView, setAtView] = useState(calcAtView(weights, getDays(56)));

  window.onresize = () => {
    renderCanvas(canvas, wrap, weights, atView);
  };

  const handleStart = (e) => {
    // e.preventDefault();

    setTouches(getTouches(e));
  };

  const handleMove = (e) => {
    e.preventDefault();

    const nextTouches = getTouches(e);
    const move = getMoveRatios(touches, nextTouches);
    // const [scaleX, centerX] = getScaleX(touches, nows);
    const scaleX = 1;
    const centerX = 0;
    setTouches(nextTouches);
    console.log('move', move);
    // setLch(adjustColor(lch, move, xAxis, yAxis));

    const atLimits = getAtLimits(weights, getDays(90));
    //setAtView(adjustAtView(atView, atLimits, -moveX, scaleX, centerX));
    setAtView(adjustAtView(atView, atLimits, -move.x, scaleX, centerX));
  };

  useEffect(() => {
    setAtView(calcAtView(weights, getDays(56)));
  }, [weights]);

  useEffect(() => {
    renderCanvas(canvas, wrap, weights, atView);
  }, [weights, atView]);

  return (
    <div
      className={styles.wrap}
      ref={wrap}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
    >
      <canvas ref={canvas} onClick={() => console.log('YO')} />
    </div>
  );
}
