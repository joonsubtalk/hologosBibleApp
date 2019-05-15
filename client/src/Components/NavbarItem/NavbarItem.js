import React from 'react'
import { Link } from 'react-router-dom'

const NavbarItem = (props) => {
  const {link, label, isActive, alerts} = props;
  const modifiedClassName = isActive
    ? 'navbarItem navbarItem--active'
    : 'navbarItem';
  return (
    <li className={modifiedClassName}>
      {alerts &&
      <div className="navbarItem__indicator">{alerts}</div>}
      <Link className="navbarItem__link" to={link}>
        <div className="navbarItem__title">
          {label}
        </div>
      </Link>
    </li>
  )
}

export default NavbarItem;
