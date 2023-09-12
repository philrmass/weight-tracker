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

function getScaleRatios(lastTouches, touches) {
  const w = touches[0].w;
  // const h = touches[0].h;
  const lastIds = lastTouches.map((last) => last.id);
  const matched = touches.filter((touch) => lastIds.includes(touch.id));

  // ??? functionalize
  // [x, xCenter] = getScale(lastTouches, matched, 'x');
  if (matched.length >= 2) {
    const min = matched.reduce((min, item) => item.x < min.x ? item : min, matched[0]);
    const max = matched.reduce((max, item) => item.x > max.x ? item : max, matched[0]);
    const dist = max.x - min.x;

    const lastMax = lastTouches.find((last) => last.id === max.id);
    const lastMin = lastTouches.find((last) => last.id === min.id);
    const lastDist = lastMax.x - lastMin.x;

    if (lastDist > 0) {
      const scale = dist / lastDist;
      const center = (min.x + max.x) / 2;
      // ??? return [scale, center];

      return {
        x: scale,
        xCenter: center / w,
        y: 1.0,
        yCenter: 0.5,
      };
    }
  }

  return {
    x: 1.0,
    xCenter: 0.5,
    y: 1.0,
    yCenter: 0.5,
  };
}

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
    setTouches(getTouches(e));
  };

  const handleMove = (e) => {
    e.preventDefault();

    const nextTouches = getTouches(e);
    const move = getMoveRatios(touches, nextTouches);
    const scale = getScaleRatios(touches, nextTouches);
    setTouches(nextTouches);

    const atLimits = getAtLimits(weights, getDays(90));
    setAtView(adjustAtView(atView, atLimits, -move.x, scale.x, scale.xCenter));
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
      <canvas ref={canvas} />
    </div>
  );
}
