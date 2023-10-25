import PropTypes from 'prop-types'
import Prev from '../prev.svg?react'

const PrevButton = ({ onClick, className }) => (
  <button
    className={`bg-zinc-100 dark:bg-widget rounded-full p-3 ${className}`}
    onClick={onClick}
  >
    <Prev className="w-full h-full" />
  </button>
)

PrevButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
}

PrevButton.defaultProps = {
  onClick: () => {},
  className:
    'w-12 h-12 hover:bg-zinc-200 active:bg-zinc-300 dark:hover:bg-hover dark:active:bg-zinc-600',
}

export default PrevButton
