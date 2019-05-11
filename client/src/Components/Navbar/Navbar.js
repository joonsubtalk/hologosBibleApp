import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import throttle from 'lodash/throttle';

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

    // check if user has passed the halfway mark
    if (window.scrollY > this.getBrowserHeight()/2) {
      this.setState({hasPassedFold: true});
    }
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
    const { showMenu, menuItems } = this.state;
    const modifiedClass = showMenu
    ? `navbar navbar--appear`
    : `navbar`

    const {pathname} = this.props.location;

    return (
      <nav className={modifiedClass}>
        <div className="navbar__container">
          <ul className="navbar__items">
            {
              menuItems.map((item) => {
                const {label, link} = item;
                return (
                  <li className="navbar__item">
                    <Link className="navbar__link" to={link}>
                      <div className="navbar__title">
                        {label}
                      </div>
                    </Link>

                  </li>
                )
              })
            }
          </ul>
        </div>
      </nav>
    )
  }
}
