import React, { Component } from 'react'
import throttle from 'lodash/throttle';
import NavbarItem from '../NavbarItem/NavbarItem';

export default class Navbar extends Component {

  state = {
    showMenu: false,
    menuItems: [
      { label: 'home', link: '/home'},
      { label: 'social', link: '/social'},
      { label: 'badges', link: '/badges'},
      { label: 'settings', link: '/settings'},
    ]
  }

  constructor(props) {
    super(props);
    this.throttledScroll = throttle(this.throttledScroll.bind(this), 200);
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({showMenu: true})
    }, 100)

    window.addEventListener('scroll', this.throttledScroll, false);
  }

  componentWillUnmount() {
    this.clearTimer();
    window.removeEventListener('scroll', this.throttledScroll, false);
  }

  getBrowserHeight = () => {
    const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    return Math.max(
      x,
      y
    );
  }

  throttledScroll = (evt) => {
    this.clearTimer();
    this.setTimer();
  }

  setTimer = () => {
    if (this.timerHandle) {
      return;
    }
    this.setState({showMenu: false});
    this.timerHandle = setTimeout(()=>{
      this.setState({error: true, showMenu: true});
      this.timerHandle = 0;
    }, 500);
  }

  clearTimer = () => {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  render() {
    const { showMenu, menuItems, currentPath } = this.state;
    const modifiedClass = showMenu
    ? `navbar navbar--appear`
    : `navbar`

    const {pathname} = this.props.location;

    if (this.props.location.pathname === '/') return null;

    return (
      <nav className={modifiedClass}>
        <div className="navbar__container">
          <ul className="navbar__items">
            {
              menuItems.map((item) => {
                const {label, link} = item;
                const isActive = !!(pathname === link);
                return (
                  <NavbarItem key={label} label={label} link={link} isActive={isActive} alerts={null} />
                )
              })
            }
          </ul>
        </div>
      </nav>
    )
  }
}
