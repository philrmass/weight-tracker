import { useEffect, useRef, useState } from 'preact/hooks';
import {
  calcAtView,
  getAtLimits,
  adjustAtView,
  render,
} from '../utilities/graph';
import { getDays } from '../utilities/time';
import { getMoveRatios, getScaleRatios, getTouches } from 'utilities/touch';
import styles from './Graph.module.css';

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
