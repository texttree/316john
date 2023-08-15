import PropTypes from "prop-types";

const NextButton = ({ onClick }) => (
  <button
    className="bg-zinc-100 dark:bg-zinc-800  rounded-full p-3"
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
        d="M8.25 19.5L15.75 12l-7.5-7.5"
      />
    </svg>
  </button>
);

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default NextButton;
