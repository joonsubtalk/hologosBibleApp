import React from 'react'
import { Link } from 'react-router-dom'

const NavbarItem = (props) => {
  const {link, label, isActive} = props;
  const modifiedClassName = isActive
    ? 'navbarItem navbarItem--active'
    : 'navbarItem';
  return (
    <li className={modifiedClassName}>
      <Link className="navbarItem__link" to={link}>
        <div className="navbarItem__title">
          {label}
        </div>
        <div className="navbarItem__indicator"></div>
      </Link>
    </li>
  )
}

export default NavbarItem;
