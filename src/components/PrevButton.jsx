import PropTypes from "prop-types";

const PrevButton = ({ onClick }) => (
  <button
    className="bg-zinc-100 dark:bg-zinc-800 rounded-full p-3"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  </button>
);

PrevButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default PrevButton;
