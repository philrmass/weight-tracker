import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/Graph.module.css';
import { render } from '../utilities/graph';
//import { useInterval } from '../utilities/hooks';
import { getDays } from '../utilities/times';

//??? move to graph utils
function calcAtView(items, atRange) {
  const atStart = items[0]?.at - atRange;
  const atEnd = items[0]?.at;

  return [atStart, atEnd];
}

//??? move to graph utils
//??? getAtLimits(), move to utils/graph
function getAtLimits(items, rangeMin) {
  const max = items[0]?.at;
  const min = items[items.length - 1]?.at;
  const range = max - min;

  if (range < rangeMin) {
    return [max - rangeMin, max];
  }
  return [min, max];
}

//??? adjustAtView
function adjustRange(range, limits, moveRatio, _scaleRatio) {
  const [start, end] = range;
  const [min, max] = limits;
  const view = end - start;
  const move = moveRatio * view;

  if (start + move < min) {
    return [min, min + view];
  }
  if (end + move > max) {
    return [max - view, max];
  }
  return [start + move, end + move];
}

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

  return 1.0;
}

function Graph({
  items,
}) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  //??? range -> atView
  const [range, setRange] = useState(calcAtView(items, getDays(56)));
  const [touches, setTouches] = useState([]);
  //??? remove after testing
  //const [text, setText] = useState('');

  window.onresize = () => {
    const ctx = canvas.current.getContext('2d');
    ctx.canvas.width = wrap.current.clientWidth;
    ctx.canvas.height = wrap.current.clientHeight;
    render(ctx, items, range);
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
    const scaleX = getScaleX(touches, nows);
    setTouches(nows);

    const atLimits = getAtLimits(items, getDays(90));
    setRange(adjustRange(range, atLimits, -moveX, scaleX));
  }

  useEffect(() => {
    setRange(calcAtView(items, getDays(56)));
  }, [items.length]);

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.canvas.width = wrap.current.clientWidth;
    ctx.canvas.height = wrap.current.clientHeight;
    render(ctx, items, range);
  }, [items, range]);

  //??? remove after testing
  /*
  useInterval(() => {
    const move = -0.003;
    const atLimits = getAtLimits(items, getDays(90));
    setRange(adjustRange(range, atLimits, move, 1.0));
  }, 100);

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
