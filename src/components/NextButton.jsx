import PropTypes from "prop-types";
import Next from "../next.svg?react";

const NextButton = ({ onClick, className }) => (
  <button
    className={`bg-zinc-100 dark:bg-widget rounded-full p-3 ${className}`}
    onClick={onClick}
  >
    <Next />
  </button>
);

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

NextButton.defaultProps = {
  onClick: () => {},
  className:
    "w-12 h-12 bg-zinc-100 dark:bg-widget hover:bg-zinc-200 active:bg-zinc-300  dark:hover:bg-zinc-700 dark:active:bg-zinc-600",
};

export default NextButton;
