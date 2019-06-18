import React from 'react'

const Username = ({username, nameHandler}) => {
  return (
    <div className="setup__wrapper">
      <div className="setup__header">What's your name?</div>
      <div className="setup__subheader">...so that it may be written in the app of Hologos</div>
      <label htmlFor="name" className="setup__label">
          Name
      </label>
      <input id="name" className="setup__input" onChange={nameHandler} value={username}/>
    </div>
  )
}

export default Username
