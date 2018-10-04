import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Menu.scss'

const handleMenuItemClick = (item, onItemSelected) => event => {
  if (event) {
    onItemSelected(item, event)
  }
}

const Menu = ({ items, label, onItemSelected }) => (
  <div className={classNames(styles.menu, 'menu')}>
    <header>
      <h2>{label}</h2>
    </header>
    <ul className={classNames(styles.menuItems, 'menu-items')}>
      {items.map(item => (
        <li
          className={classNames(styles.menuItem, 'menu-item')}
          key={item.key}
          onClick={handleMenuItemClick(item, onItemSelected)}
          role="presentation"
        >
          {item.label}
        </li>
      ))}
    </ul>
  </div>
)

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  label: PropTypes.string,
  onItemSelected: PropTypes.func,
}

Menu.defaultProps = {
  label: '',
  onItemSelected: () => {},
}

export default Menu
