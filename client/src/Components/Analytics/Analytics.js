import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {format, differenceInDays, addDays} from 'date-fns';
import {OT_CHAPTERS,
  NT_CHAPTERS,
  LAST_OT_BOOK_ID} from '../../configs/constants';
import AnalyticsComponent from './AnalyticsComponent';
import Loader from '../Loader/Loader';

class Analytics extends Component {

  state = {
    revealOverview : false,
    revealOT: false,
    revealNT: false,
  }

  toggleHeader = (evt) => {
    const header = evt.target.dataset.header;
    let type = '';
    switch(header) {
      case 'overview':
        type = 'revealOverview';
        break;
      case 'nt':
        type = 'revealNT';
        break;
      case 'ot':
        type = 'revealOT';
        break;
      default:
        break;
    }

    this.setState(prevState => ({
      [type]: !prevState[type]
    }));
  }

  percentify = (top, bottom) => {
    const percent = `${(((top)/(bottom)) * 100).toFixed(2)}`;
    if ((top/bottom * 100) % 1 !== 0)
      return `${percent}%`;
    else
    return `${percent.substring(0,percent.length - 3)}%`;
  }

  wholeNumberify = (top, bottom) => {
    const percent = `${((top)/(bottom)).toFixed(2)}`;
    if ((top/bottom * 100) % 1 !== 0)
      return `${percent}`;
    else
    return `${percent.substring(0,percent.length - 3)}`;
  }

  render() {
    const { read } = this.props;
    const {revealOverview, revealOT, revealNT} = this.state;
    var d = new Date();
    const fakeDate = d.setDate(d.getDate() - 2);

    if (read !== null) {
      let otChaptersRead = 0;
      let ntChaptersRead = 0;

      Object.keys(read).map(book => {
        if (book <= LAST_OT_BOOK_ID) {
          Object.keys(read[book]).map(va => {
            otChaptersRead++;
          })
        } else {
          Object.keys(read[book]).map(va => {
            ntChaptersRead++;
          })
        }
      });

      const otChaptersLeft = OT_CHAPTERS - otChaptersRead;
      const ntChaptersLeft = NT_CHAPTERS - ntChaptersRead;
      const otPercentRead = this.percentify(otChaptersRead, OT_CHAPTERS);
      const ntPercentRead = this.percentify(ntChaptersRead, NT_CHAPTERS);

      const totalChaptersRead = otChaptersRead + ntChaptersRead;
      const totalChaptersLeft = (NT_CHAPTERS + OT_CHAPTERS) - totalChaptersRead;

      const currentDate = format(new Date(), 'YYYY-MM-DD');
      const daysDiff = Math.abs(differenceInDays(
        currentDate,
        new Date(fakeDate)
      )); // todo: should there be a +1?

      const averageChaptersRead = this.wholeNumberify(totalChaptersRead, daysDiff+1);
      let daysRequired = ((totalChaptersLeft)/(totalChaptersRead/(daysDiff+1))).toFixed(2);
      const showProjectedDate = isFinite(Math.floor(totalChaptersLeft/averageChaptersRead));
      const optimizedDaysRequired = showProjectedDate
        ? Math.round(daysRequired)
        : '--';
      const projectedDate = showProjectedDate
        ? format(addDays(currentDate, Math.floor(totalChaptersLeft/averageChaptersRead)), 'D, MMM YYYY')
        : '--';

      const modifiedClassName = `analytics ${revealOverview ? 'analytics--showOverview' : ''} ${revealOT ? 'analytics--showOT' : ''} ${revealNT ? 'analytics--showNT' : ''}`

      return (
        <div className={modifiedClassName}>
          <div className="analytics__container">
            <div className="analytics__card">
              <div className="analytics__header" onClick={this.toggleHeader} data-header="overview">Bible Reading Overview</div>
              <div className="analytics__wrapper">
                <AnalyticsComponent title="Total Chapters Read" number={totalChaptersRead} />
                <AnalyticsComponent title="Total Chapters Left" number={totalChaptersLeft} />
                <AnalyticsComponent title="Days since plan started" number={daysDiff} />
                <AnalyticsComponent title="Average Chapters read per day" number={averageChaptersRead} />
                <AnalyticsComponent title="Required Days" number={optimizedDaysRequired} />
                <AnalyticsComponent title="Projected date to Finish" number={projectedDate} />
              </div>
              <div className="analytics__bg"></div>
            </div>
            <div className="analytics__card">
              <div className="analytics__header" onClick={this.toggleHeader} data-header="ot">Old Testament</div>
              <div className="analytics__wrapper">
                  <AnalyticsComponent title="Chapters Read" number={otChaptersRead} />
                  <AnalyticsComponent title="Chapters Left" number={otChaptersLeft} />
                  <AnalyticsComponent title="Percent" number={otPercentRead} />
              </div>
              <div className="analytics__bg"></div>
            </div>
            <div className="analytics__card">
              <div className="analytics__header" onClick={this.toggleHeader} data-header="nt">New Testament</div>
              <div className="analytics__wrapper">
                  <AnalyticsComponent title="Chapters Read" number={ntChaptersRead} />
                  <AnalyticsComponent title="Chapters Left" number={ntChaptersLeft} />
                  <AnalyticsComponent title="Percent" number={ntPercentRead} />
              </div>
              <div className="analytics__bg"></div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="analytics">
        <div className="analytics__container">
          <Loader />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ data, auth, read }) => {
  return {
    data,
    auth,
    read,
  };
};

export default connect(mapStateToProps, actions)(Analytics);
