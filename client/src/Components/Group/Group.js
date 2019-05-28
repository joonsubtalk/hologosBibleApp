import React from 'react';
import {differenceInHours, format} from 'date-fns';
import Loader from '../Loader/Loader';
import _ from 'lodash';
import {SIMPLE_BIBLE} from '../../configs/constants';

const Group = props => {

  const {title, report} = props;
  return (
    <div className="group">
      <div className="group__container">
        <div className="group__content">
          { report &&
            report.map((day) => {
              var result = format(
                new Date(day.timestamp),
                'MM/DD/YYYY'
              )
              return <div key={day.timestamp} className="group__card">
            {result} someone read {SIMPLE_BIBLE.meta[day.bid].book} {day.chapter}
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Group;
