import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {format} from 'date-fns';
import Loader from '../Loader/Loader';

class Badges extends Component {

  state = {
    reportArr : [],
    MONTH_OFFSET: 32
  }

  componentDidMount() {
    this.props.fetchBookChapterRead(this.props.auth.uid);
    this.calculateBadgeReport();
  }

  componentDidUpdate(prevProps) {
    if (this.props.read !== prevProps.read) {
      this.calculateBadgeReport();
    }
  }

  calculateBadgeReport = () => {
    const {read} = this.props;
    const MONTH_OFFSET = 32;
    const reportArr = new Array(415)
    for(let a = 0, value = 0, size = 415; a < size; a++) reportArr[a] = value;

    for (let key in read) {
      if (read.hasOwnProperty(key)) {
        read[key].forEach((chapter)=>{
          if (chapter) {
            const readDate = format(new Date(read[key][1].timestamp), 'MMDD');
            const idx = MONTH_OFFSET * readDate.substring(0,2) + Number.parseInt(readDate.substring(2));

            if (reportArr[idx] === 0)
              reportArr[idx] = 1;
            else
              reportArr[idx] += 1;
          }
        })
      }
    }
    this.setState({report : reportArr});
  }

  __renderWeeklyReport = () => {
    const {report} = this.state;
    const today = format(new Date(), 'MMDD');
    const MONTH_OFFSET = 32;
    const idx = MONTH_OFFSET * Number.parseInt(today.substring(0,2)) + Number.parseInt(today.substring(2))
    const weekReport = report.slice(idx-7,idx);

    console.log(weekReport);

    return (<div>hi</div>)
  }

  __badgeRender = () => {
    const {read} = this.props;
    return (
      <div>
        <div>
          { !read ? <Loader /> : this.__renderWeeklyReport() }
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

    const { report } = this.state;

    return (
      <div className="badges">
        Badges galore
        {
          !report
          ? <Loader />
          : this.__badgeRender()
        }
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
