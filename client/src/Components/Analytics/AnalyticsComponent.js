import React from 'react'

const AnalyticsComponent = (props) => {
  const {title, number} = props;

  return (
    <div className="analytics__section">
      <div className="analytics__title">{title}</div>
      <div className="analytics__number">{number !== null ? number : '---'}</div>
    </div>
  )
}

export default AnalyticsComponent;
