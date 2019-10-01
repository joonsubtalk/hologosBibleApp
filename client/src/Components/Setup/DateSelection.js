import React, { Component } from 'react';
import {format} from 'date-fns';
import { Link } from "react-router-dom";

class DateSelection extends Component {

  state = {
    isShowingMoreInformation : false,
    startDate: format(new Date(), 'YYYY-MM-DD'),
    today: format(new Date(), 'YYYY-MM-DD'),
  }

  toggleShowMoreInfo = (evt) => {
    evt.preventDefault();
    this.setState(prevState => ({
      isShowingMoreInformation: !prevState.isShowingMoreInformation
    }));
  }

  dateChangeHandler = (evt) => {
    const selectedDate = evt.target.value;
    const date = selectedDate <= this.state.today
        ? selectedDate
        : this.state.today
    this.setState({startDate: date});
  }

  showMoreHandler = () => {
    this.props.history.push('/setup/4')
  }

  render() {
    const {saveDateHandler, showMore} = this.props;
    const {isShowingMoreInformation, startDate, today} = this.state;
    return (
      <div className="setup__wrapper">
        <div className="setup__header">Select your start date</div>
        <div className="setup__subheader">In the beginning...</div>

        { !showMore
            ? (<div>
                Would you like to start a new plan?
                <div className="setup__actionable-column">
                <button onClick={(evt)=>{saveDateHandler(evt, {date:today, skip: true })}} className="setup__primary">Start today</button>
                <Link to={{ pathname: '/setup/4' }}>
                    <button className="setup__secondary">I've already started</button>
                </Link>
                </div>
              </div>)
            : (
            <>
                <div className="setup__datepicker">
                    When did you start?
                    <input type="date" className="setup__date"
                    onChange={this.dateChangeHandler}
                    value={startDate}
                    max={today} />
                </div>
                <div className="setup__actionable">
                    <Link onClick={(evt)=>{saveDateHandler(evt, {date:startDate, skip: false })}} to={{ pathname: '/setup/5' }}>
                        <button className="setup__next">Use Start Date</button>
                    </Link>
                </div>
            </>
            )
        }
      </div>
    )
  }
}

export default DateSelection
