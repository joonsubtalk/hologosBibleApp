import React, {Component} from 'react';
import {differenceInHours, format} from 'date-fns';
import Loader from '../Loader/Loader';
import { connect } from 'react-redux';
import _ from 'lodash';
import {SIMPLE_BIBLE} from '../../configs/constants';
import * as actions from '../../actions';
import { groupBy } from '../../../../../../../Library/Caches/typescript/3.5/node_modules/rxjs/internal/operators/groupBy';
import reducers from '../../reducers';

class Group extends Component {

  groupByLocal = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

  render() {
    const {title, report} = this.props;

    const groupingReport = this.groupByLocal(report, chapter => chapter.id)

    let currentUser = null;
    let modifiedReport = [];
    for (let idx = 0; idx < report.length; idx++) {
      if (report[idx].id === currentUser) continue; // skip if already visisted
      currentUser = report[idx].id;
      const usersReadGroup = groupingReport.get(currentUser);
      const sortedReadGroup = _.sortBy(usersReadGroup, ["bid","chapters"])
      let chapterStart = null;
      sortedReadGroup.forEach((group, groupIdx) => {
        // can this current group be part of an increment?
        if (groupIdx+1 < sortedReadGroup.length) {
          // let's check if it's same book and an increment chapter coming next
          if (group.bid === sortedReadGroup[groupIdx+1].bid &&
            group.chapter+1 === sortedReadGroup[groupIdx+1].chapter) {
              if (chapterStart === null) {
                // we don't have a chapterStart
                chapterStart = group.chapter;
              }
          } else {
            if (chapterStart !== null) {
              // const previousChapter = sortedReadGroup[groupIdx - 1];
              modifiedReport.push(Object.assign({}, group, {chapter:`${chapterStart}-${group.chapter}`}))
              chapterStart = null;
            } else {
              modifiedReport.push(group)
            }
          }
        }
        else {
          // we reach the end,
          if (chapterStart !== null) {
            modifiedReport.push(Object.assign({}, group, {chapter:`${chapterStart}-${group.chapter}`}))
          } else {
            modifiedReport.push(group);
          }
        }
      });
      chapterStart = null;
    }

    modifiedReport = _.sortBy(modifiedReport, "timestamp")

    return (
      <div className="group">
        <div className="group__container">
          <div className="group__content">
            { report &&
              modifiedReport.map((blurb, idx) => {
                var date = format(
                  new Date(blurb.timestamp),
                  'MMMM DD'
                )

                return <div key={`${blurb.timestamp}${idx}`} className={`group__card ${blurb.chapter ? '' : 'group--book'}`}>
                  {
                    blurb &&
                    blurb.chapter
                    ? <div className="group__ribbon">Chapter Read</div>
                    : <div className="group__ribbon">Book Completed</div>
                  }
                  <div className="group__header">{SIMPLE_BIBLE.meta[blurb.bid].book} {blurb.chapter}</div>
                  <div className="group__user">by {blurb.name}</div>
                  <div className="group__tribe">{blurb.tribe}</div>
                  <div className="group__date">{date}</div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    )
  }
}


// const mapStateToProps = ({ auth, profile, group }) => {
//   return {
//     auth,
//     profile,
//     group,
//   };
// };

export default connect(null, actions)(Group);
