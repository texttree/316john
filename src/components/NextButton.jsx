import PropTypes from "prop-types";

const NextButton = ({ onClick, className }) => (
  <button
    className={`bg-zinc-100 dark:bg-[#1D1F34] rounded-full p-3  ${className}`}
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-full h-full"
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
  className: PropTypes.string.isRequired,
};

NextButton.defaultProps = {
  onClick: () => {},
  className: "w-12 h-12",
};

export default NextButton;
