import React, { Component } from 'react';
import Swipe from 'react-easy-swipe';
import throttle from 'lodash/throttle';
import Login from '../Login/Login';
import Onboard from '../Onboard/Onboard';
import study from '../../img/study.jpg';
import together from '../../img/together.jpg';
import trainer from '../../img/trainer.jpg';
import hologos from '../../img/hologos.jpg';

export default class Welcome extends Component {

  state = {
    clientWidth: 0,
    startXPos: 0,
    activeId: 0,
    xPos: 0,
    startTouch: false,
  }

  constructor(props) {
    super(props);
    this.throttledSwipe = throttle(this.throttledSwipe.bind(this), 20)
    this.throttledResize = throttle(this.throttledResize.bind(this), 200);
  }

  componentDidMount() {
    this.setState({clientWidth: window.innerWidth});
    window.addEventListener('resize', this.throttledResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledResize, false);
  }

  throttledResize = (evt) => {
    this.setState({clientWidth: window.innerWidth});
  }

  setTimer = (evt) => {
    const self = this;
    if (this.timerHandle) {
      return;
    }
    this.onSwipeMove(evt);
    this.timerHandle = setTimeout(()=>{

      this.timerHandle = 0;
    }, 300);
  }

  clearTimer = () => {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  throttledSwipe = (evt) => {
    this.setState({xPos: 0, startTouch: true})
    this.onSwipeMove(evt);
    // this.setTimer(evt);
  }

  onSwipeStart = (evt) => {
    this.setState({listen: true, xPos: 0});
  }

  onSwipeMove = (position, evt) => {
    const {listen} = this.state;
    if (listen) this.setState({listen: false, startXPos: position.x});
    this.setState({xPos: position.x});
  }

  resolveSwipe = () => {
    const {startXPos, xPos, activeId, clientWidth} = this.state;
    const FINAL_ID = 4;
    let direction = 0;
    // User swiped greater than threshold
    if (Math.abs(startXPos - xPos) > clientWidth/5) {
      direction = startXPos - xPos > 0
        ? activeId+1 < FINAL_ID
          ? 1
          : 0
        : activeId > 0
          ? -1
          : 0;
    }
    this.setState({activeId: activeId + direction, xPos: 0})
  }

  onSwipeEnd = (evt) => {
    this.resolveSwipe();
    this.setState({xPos: 0, startTouch: false})
  }

  render() {
    const {clientWidth, startXPos, activeId, xPos} = this.state;
    return (
      <div className="welcome">
        <Swipe onSwipeStart={this.onSwipeStart}
        onSwipeMove={this.onSwipeMove}
        onSwipeEnd={this.onSwipeEnd}>
          <div className="welcome__container">
            <div className="welcome__wrapper" style={{width: clientWidth*4, left: (xPos + (-activeId * clientWidth))}}>
              <Onboard title="Welcome to Hologos" description="Hologos helps you finish your yearly reading goal." src={study}/>
              <Onboard title="Track your progress" description="Falling behind happens, but it shouldn't stop you." src={trainer}/>
              <Onboard title="Join the Community" description="Form groups and stay accountable." src={together}/>
              <Onboard title="Start reading" description="Stop waiting for a new year. Join the Hologos community and start reading!" src={hologos}/>
            </div>
          </div>
        </Swipe>
      </div>
    )
  }
}
