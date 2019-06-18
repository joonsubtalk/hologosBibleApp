import React, { Component } from 'react'

class DateSelection extends Component {

  state = {
    isShowingMoreInformation : false,
  }

  render() {
    const {date, today, dateChangeHandler, saveDateHandler} = this.props;
    const {isShowingMoreInformation} = this.state;
    return (
      <div className="setup__wrapper">
        <div className="setup__header">Select your start date</div>
        <div className="setup__subheader">In the beginning...</div>

        Would you like to start a new plan?
        <div className="setup__actionable-column">
          <button className="setup__primary">Start today</button>
          <button className="setup__secondary">I've already started</button>
        </div>

        { isShowingMoreInformation &&
          <div>
            Start Date
            <input type="date" className="settings__date"
              onChange={dateChangeHandler}
              value={date}
              max={today} />
            <button onClick={saveDateHandler}>Save Date?</button>
          </div>
        }
      </div>
    )
  }
}

export default DateSelection
