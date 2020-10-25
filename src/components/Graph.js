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
//import { useInterval } from '../utilities/hooks';
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

function getScaleX(_lasts, nows) {
  const _w = nows[0].w;
  //??? remove touches from now that don't match lasts
  //??? if length < 2, return 1.0
  //??? get x max index, get x min index
  //??? calc max to min of nows size
  //??? calc max to min of lasts size
  //??? clc ratio of size

  return [1.0, 0.5];
}

function Graph({
  items,
}) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const [atView, setAtView] = useState(calcAtView(items, getDays(56)));
  const [touches, setTouches] = useState([]);
  //??? remove after testing
  //const [text, setText] = useState('');

  window.onresize = () => {
    const ctx = canvas.current.getContext('2d');
    ctx.canvas.width = wrap.current.clientWidth;
    ctx.canvas.height = wrap.current.clientHeight;
    render(ctx, items, atView);
  };

  //??? remove after testing
  /*
  function log(value) {
    setText((t) => `${value}\n${t}`);
  }
  */

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

  //??? remove after testing
  /*
  useInterval(() => {
    const move = -0.003;
    const scale = 1.005;
    const center = 0.50;
    const atLimits = getAtLimits(items, getDays(90));
    setAtView(adjustAtView(atView, atLimits, move, scale, center));
  }, 100);
  */

  //??? remove after testing
  /*
  function buildLog() {
    return (
      <div className={styles.log}>
        {text}
      </div>
    );
  }
  */

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
      {/*buildLog()*/}
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
