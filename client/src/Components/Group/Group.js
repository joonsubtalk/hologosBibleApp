import React from 'react';
import {differenceInHours, format} from 'date-fns';
import Loader from '../Loader/Loader';
import _ from 'lodash';
import {SIMPLE_BIBLE} from '../../configs/constants';

const Group = props => {
  const {title, report} = props;
  const now = new Date();
  return (
    <div className="group">
      <div className="group__container">
        <div className="group__content">
          { report &&
            report.map(day => {
              var result = differenceInHours(
                now,
                new Date(day.timestamp)
              )
              result > 24
               ? result = `${format(day.timestamp, 'MMM Mo')}`
               : result = `${result} hrs`
              return <div className="group__card">
              {result} - {day.name} read the book of {SIMPLE_BIBLE.meta[day.bid].book} at chapter: {day.chapter}
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Group;
