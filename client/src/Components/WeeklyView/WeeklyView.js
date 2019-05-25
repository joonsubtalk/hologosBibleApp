import React from 'react'

const WeeklyView = (props) => {
  const {dayOfTheWeek, dateNumber, chapterCount} = props;
  const isWorthy = chapterCount > 0;
  const modifiedClassName = isWorthy ? 'weeklyview--worthy' : '';
  return (
    <div className={`weeklyview ${modifiedClassName}`}>
      <div className="weeklyview__container">
        <div className="weeklyview__header">
          <div className="weeklyview__day">{dayOfTheWeek}</div>
          <div className="weeklyview__dateNumber">{dateNumber}</div>
        </div>
        <div className="weeklyview__content">
          <div className="weeklyview__chapter">{chapterCount}</div>
          <div className="weeklyview__description">chapters</div>
        </div>
      </div>
    </div>
  )
}

export default WeeklyView
