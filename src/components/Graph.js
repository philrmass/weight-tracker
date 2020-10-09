import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles/Graph.module.css';
import { render } from '../utilities/graph';

function getDays(count) {
  const oneDay = 1000 * 60 * 60 * 24;
  return count * oneDay;
}

function Graph({
  items,
}) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const [atMin, setAtMin] = useState(items[0]?.at - getDays(284));
  const [atMax, setAtMax] = useState(items[0]?.at);

  window.onresize = () => {
    const ctx = canvas.current.getContext('2d');
    ctx.canvas.width = wrap.current.clientWidth;
    ctx.canvas.height = wrap.current.clientHeight;
    render(ctx, items, atMin, atMax);
  };

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.canvas.width = wrap.current.clientWidth;
    ctx.canvas.height = wrap.current.clientHeight;
    render(ctx, items, atMin, atMax);
  }, [items, atMin, atMax]);

  //??? remove after testing
  /*
  */
  const [days, setDays] = useState(1);
  useEffect(() => {
    setAtMin(items[0]?.at - getDays(days));
    setAtMax(items[0]?.at - getDays(days / 3));
    setTimeout(() => {
      if (days > 425) {
        setDays(0);
      } else {
        setDays(days + 1);
      }
    }, 100);
  }, [days]);

  return (
    <main className={styles.main}>
      <div className={styles.wrap} ref={wrap}>
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
