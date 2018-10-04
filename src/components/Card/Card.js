import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Card.scss'

const Card = ({ id, value, selected }) => (
  <div
    id={id}
    className={classNames(styles.card, {
      [styles.selected]: selected,
      [styles.patternBradyBunch]: !selected,
    })}
  >
    {selected && <span className="value">{value}</span>}
  </div>
)

Card.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  selected: PropTypes.bool,
}

Card.defaultProps = {
  selected: false,
}

export default Card
