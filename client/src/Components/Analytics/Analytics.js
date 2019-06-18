import React, { Component } from 'react'
import { connect } from 'react-redux';
import throttle from 'lodash/throttle';
import * as actions from '../../actions';
import {format, differenceInDays, addDays} from 'date-fns';
import {OT_CHAPTERS,
  NT_CHAPTERS,
  LAST_OT_BOOK_ID} from '../../configs/constants';
import AnalyticsComponent from './AnalyticsComponent';
import Loader from '../Loader/Loader';

class Analytics extends Component {

  constructor(props) {
    super(props);
    this.state = {
      revealOverview : false,
      revealOT: false,
      revealNT: false,
      isDetached: false
    }
    this.throttledScroll = throttle(this.throttledScroll.bind(this), 200);
  }

  componentDidMount(){
    window.addEventListener('scroll', this.throttledScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledScroll, false);
  }

  throttledScroll = (evt) => {
    const scrollTop = (window.pageYOffset !== undefined)
      ? window.pageYOffset
      : (document.documentElement
        || document.body.parentNode
        || document.body).scrollTop;
    this.setState({isDetached: scrollTop > 50})
  }

  toggleHeader = (evt) => {
    const header = evt.currentTarget.dataset.header;
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

    // case where user just started...
    if (bottom === 0) return top;

    const percent = `${((top)/(bottom)).toFixed(2)}`;
    if ((top/bottom * 100) % 1 !== 0)
      return `${percent}`;
    else
      return `${percent.substring(0,percent.length - 3)}`;
  }

  render() {
    const { read, profile } = this.props;
    if (!profile) return <Loader />
    const {revealOverview, revealOT, revealNT, isDetached} = this.state;
    const profileDate = profile && profile.planStartDate
      ?  profile.planStartDate
      : format(new Date(), 'YYYY-MM-DD');

    const fakeDate = profileDate;

    if (read !== null) {
      let otChaptersRead = 0;
      let ntChaptersRead = 0;

      Object.keys(read).forEach((book) => {
        if (book <= LAST_OT_BOOK_ID) {
          Object.keys(read[book]).forEach(va => {
            otChaptersRead++;
          })
        } else {
          Object.keys(read[book]).forEach(va => {
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
        fakeDate
      )); // todo: should there be a +1?

      const averageChaptersRead = this.wholeNumberify(totalChaptersRead, daysDiff);
      let daysRequired = ((totalChaptersLeft)/(totalChaptersRead/(daysDiff+1))).toFixed(2);
      const showProjectedDate = isFinite(Math.floor(totalChaptersLeft/averageChaptersRead));

      const optimizedDaysRequired = showProjectedDate
        ? Math.round(daysRequired)
        : '--';
      const projectedDate = showProjectedDate
        ? format(addDays(currentDate, Math.floor(totalChaptersLeft/averageChaptersRead)), 'D, MMM YYYY')
        : '--';

      const modifiedClassName = `analytics ${isDetached ? 'analytics--fixed' : ''} ${revealOverview ? 'analytics--showOverview' : ''} ${revealOT ? 'analytics--showOT' : ''} ${revealNT ? 'analytics--showNT' : ''}`

      return (
        <div className={modifiedClassName}>
          <div className="analytics__container">
            <div className="analytics__card" onClick={this.toggleHeader} data-header="overview">
              <div className="analytics__header">Bible Reading Overview</div>
              <div className="analytics__wrapper">
                <div className="analytics__double">
                  <AnalyticsComponent title="Chapters Read" number={totalChaptersRead} />
                  <AnalyticsComponent title="Chapters Left" number={totalChaptersLeft} />
                </div>
                <AnalyticsComponent title="Days since plan started" number={daysDiff} />
                <AnalyticsComponent title="Average Chapters read per day" number={averageChaptersRead} />
                <AnalyticsComponent title="Required Days" number={optimizedDaysRequired} />
                <AnalyticsComponent title="Projected date to Finish" number={projectedDate} />
              </div>
              <div className="analytics__bg"></div>
            </div>
            <div className="analytics__card" onClick={this.toggleHeader} data-header="ot">
              <div className="analytics__header">Old Testament</div>
              <div className="analytics__wrapper">
                <div className="analytics__double">
                  <AnalyticsComponent title="Chapters Read" number={otChaptersRead} />
                  <AnalyticsComponent title="Chapters Left" number={otChaptersLeft} />
                </div>
                <AnalyticsComponent title="Percent" number={otPercentRead} />
              </div>
              <div className="analytics__bg"></div>
            </div>
            <div className="analytics__card" onClick={this.toggleHeader} data-header="nt">
              <div className="analytics__header">New Testament</div>
              <div className="analytics__wrapper">
                <div className="analytics__double">
                  <AnalyticsComponent title="Chapters Read" number={ntChaptersRead} />
                  <AnalyticsComponent title="Chapters Left" number={ntChaptersLeft} />
                </div>
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
          Looks like you haven't read anything yet!
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ data, auth, profile, read }) => {
  return {
    data,
    auth,
    profile,
    read,
  };
};

export default connect(mapStateToProps, actions)(Analytics);
