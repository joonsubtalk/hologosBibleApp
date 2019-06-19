import React, { Component } from 'react';
import {format} from 'date-fns';

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
    this.setState({startDate: selectedDate <= this.state.today ? selectedDate : this.state.today});
  }

  render() {
    const {saveDateHandler} = this.props;
    const {isShowingMoreInformation, startDate, today} = this.state;
    return (
      <div className="setup__wrapper">
        <div className="setup__header">Select your start date</div>
        <div className="setup__subheader">In the beginning...</div>

        { !isShowingMoreInformation &&
          <div>
            Would you like to start a new plan?
            <div className="setup__actionable-column">
              <button onClick={(evt)=>{saveDateHandler(evt, {date:today, skip: true })}} className="setup__primary">Start today</button>
              <button onClick={this.toggleShowMoreInfo} className="setup__secondary">I've already started</button>
            </div>
          </div>
        }
        { isShowingMoreInformation &&
          <div className="setup__datepicker">
            When did you start?
            <input type="date" className="setup__date"
              onChange={this.dateChangeHandler}
              value={startDate}
              max={today} />
          </div>
        }
      </div>
    )
  }
}

export default DateSelection
