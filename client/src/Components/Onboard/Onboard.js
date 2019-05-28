import React from 'react'

const Onboard = props => {
  const {title, description, src} = props;
  return (
    <div className="onboard">
      <div className="onboard__container">
        <div className="onboard__illustration">
          <img className="onboard__img" src={src} alt='img' />
        </div>
        <div className="onboard__bottom">
          <div className="onboard__header">
            {title}
          </div>
          <div className="onboard__description">
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboard
