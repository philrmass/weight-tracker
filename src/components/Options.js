import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {/* importWeights, */setOptionsOpen } from '../redux/weights/actions';

function Options({
  setOptionsOpen,
}) {
  console.log('OPT', typeof setOptionsOpen);

  return (
    <div>
      <div>OPTIONS</div>
      <button
        onClick={() => {}}
      >
        Cancel
      </button>
    </div>
  );
}

Options.propTypes = {
  setOptionsOpen: PropTypes.func.isRequired,
};

const mapDispatch = {
  setOptionsOpen,
};

export default connect(null, mapDispatch)(Options);
