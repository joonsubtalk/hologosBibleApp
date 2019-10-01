import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {format, subDays, differenceInCalendarDays, startOfMonth, startOfWeek, endOfMonth, eachDay} from 'date-fns';
import Loader from '../Loader/Loader';
import WeeklyView from '../WeeklyView/WeeklyView';
import MonthlyView from '../MonthlyView/MonthlyView';
import Trophies from '../Trophies/Trophies';


const MONTH_OFFSET = 31;

class Badges extends Component {

  state = {
    reportArr: [],
    MONTH_OFFSET: MONTH_OFFSET,
  }

  componentDidMount() {
    if (this.props.read){
      this.calculateBadgeReport();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.read !== this.props.read) {
      if (this.props.read){
        this.calculateBadgeReport();
      }
    }
  }

  calculateBadgeReport = () => {
    const {read} = this.props;
    const newArr = new Array(MONTH_OFFSET * 12)
    for(let a = 0, value = 0, size = newArr.length; a < size; a++) newArr[a] = value;

    _.chain(read).map((readChapters, bid)=>{
      return _.chain(readChapters)
      .map(({...timestamp}, chapter) => {
        return {...timestamp, bid, chapter: Number.parseInt(chapter)}
      })
      .filter(obj => obj.timestamp)
      .values()
      .value()
    }).flatten()
    .value().forEach(chapter =>{
        const readDate = format(new Date(chapter.timestamp), 'MMDD');
        const idx = MONTH_OFFSET * readDate.substring(0,2) + Number.parseInt(readDate.substring(2));
        newArr[idx] = newArr[idx] === 0 ? 1 : newArr[idx] += 1;
    })

    this.setState({reportArr : newArr});
  }

  __renderWeeklyReport = () => {
    const {reportArr} = this.state;
    const today = format(new Date(), 'MMDD');
    const idx = MONTH_OFFSET * Number.parseInt(today.substring(0,2)) + Number.parseInt(today.substring(2))
    const weekReport = reportArr.slice(idx-6,idx+1);
    return (<div className="badges__weekreport">
      {
        weekReport.map((num, idx)=> {
          return (<WeeklyView
            key={format(subDays(new Date(), 6-idx), 'DD')}
            dayOfTheWeek={format(subDays(new Date(), 6-idx), 'ddd')}
            dateNumber={format(subDays(new Date(), 6-idx), 'DD')}
            chapterCount={num}/>
          );
        })
      }
    </div>)
  }

  __renderCalendar = () => {
    const today = new Date();
    const firstDayOfMonth = startOfMonth(today);
    const endDayOfMonth = endOfMonth(today);
    const monthArr = eachDay(firstDayOfMonth, endDayOfMonth)
    const offsetDays = differenceInCalendarDays(
      firstDayOfMonth,
      startOfWeek(firstDayOfMonth)
    )

    const offsetArr = [...Array(offsetDays)].map((d) => -1);
    const sundayAlignedArr = [...offsetArr, ...monthArr]

    return (
      <>
        <div className="badges__header">
          {format(today, 'MMMM')}
        </div>
        <div className="badges__calendar">
          {
            sundayAlignedArr.map((day,idx)=>{
              const date = day !== -1
                ? format(day, 'D')
                : ''
              return <div className="badges__date" key={idx}>
                {
                  date
                  ? <div className="badges__datewrapper">
                      <div className="badges__number">{date}</div>
                    </div>
                  : null
                }
              </div>
            })
          }
        </div>
      </>
    )
  }

  __badgeRender = () => {
    const {read} = this.props;
    return (
      <div className="badges__container">
        <div>
          { !read ? <Loader /> : this.__renderWeeklyReport()}
        </div>
        <ul>
          <li>Daily Achievements</li>
          <li>Weekly Achievements</li>
          <li>Specific Achievements</li>
          <li>Global/Group/Tribe Rankings</li>
          <li>Must be in a social group to participate for accountability</li>
        </ul>
      </div>)
  }

  render() {

    const { reportArr } = this.state;

    return (
      <div className="badges">
        Badges galore
        {
          reportArr
          ? this.__badgeRender()
          : <Loader />
        }
        <Trophies />
        <MonthlyView />
        <div className="badges__month">
          {
            reportArr ? this.__renderCalendar() : <Loader />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ read, auth }) => {
  return {
    read,
    auth,
  };
};

export default connect(mapStateToProps, actions)(Badges);
