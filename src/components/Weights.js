// ???
/*
import { getDate, getTime } from '../utilities/time';
import { removeWeight } from '../redux/weights/actions';
import Icon from './Icon';
*/
import styles from './Weights.module.css';

export default function Weights({
  weights,
  removeWeight,
}) {
  console.log('WEIGHTS', weights.length, typeof removeWeight);
  // ???
  /*
  function buildWeight(value) {
    return (
      <li
        key={value.at}
        className={styles.item}
      >
        <div className={styles.weight}>
          {value.weight.toFixed(1)}
        </div>
        <div className={styles.time}>
          <div>
            {getDate(value.at)}
          </div>
          <div>
            {getTime(value.at)}
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={() => removeWeight(value.at)}>
            <Icon name='close' color='currentColor' />
          </button>
        </div>
      </li>
    );
  }
  */

  return (
    <ul className={styles.weights}>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      <li>YO</li>
      {/*
        {weights.map((value) => buildWeight(value))}
        */}
    </ul>
  );
}

/*
Weights.propTypes = {
  weights: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeWeight: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  weights: state.weights.all,
});

const mapDispatch = {
  removeWeight,
};

export default connect(mapState, mapDispatch)(Weights);
*/
