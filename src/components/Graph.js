import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/Graph.module.css';
import {
  calcAtView,
  getAtLimits,
  adjustAtView,
  render,
} from '../utilities/graph';
import { getDays } from '../utilities/times';

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

function Graph({
  items,
}) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const [atView, setAtView] = useState(calcAtView(items, getDays(56)));
  const [touches, setTouches] = useState([]);

  window.onresize = () => {
    const ctx = canvas.current.getContext('2d');
    ctx.canvas.width = wrap.current.clientWidth;
    ctx.canvas.height = wrap.current.clientHeight;
    render(ctx, items, atView);
  };

  function handleStart(e) {
    setTouches(getTouches(e));
  }

  function handleMove(e) {
    const nows = getTouches(e);
    const moveX = getMoveX(touches, nows);
    const [scaleX, centerX] = getScaleX(touches, nows);
    setTouches(nows);

    const atLimits = getAtLimits(items, getDays(90));
    setAtView(adjustAtView(atView, atLimits, -moveX, scaleX, centerX));
  }

  useEffect(() => {
    setAtView(calcAtView(items, getDays(56)));
  }, [items.length]);

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.canvas.width = wrap.current.clientWidth;
    ctx.canvas.height = wrap.current.clientHeight;
    render(ctx, items, atView);
  }, [items, atView]);

  return (
    <main className={styles.main}>
      <div
        className={styles.wrap}
        ref={wrap}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
      >
        <canvas className={styles.canvas} ref={canvas}></canvas>
      </div>
    </main>
  );
}

const mapState = (state) => ({
  items: state.weights.all,
});

Graph.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapState)(Graph);
