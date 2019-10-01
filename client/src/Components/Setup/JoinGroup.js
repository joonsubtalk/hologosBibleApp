import React from 'react'

const JoinGroup = ({joinGroupHandler, groupInputHandler, groupId, successGroupTitle, errorGroupTitle}) => {
  return (
    <div className="setup__wrapper">
      <div className="setup__header">Join a Community!</div>
      <div className="setup__subheader">"Two are better than one because they have a good return for their labor:
    If either of them falls down, one can help the other up."</div>

      <label htmlFor="group" className="setup__label">
        Group Code
      </label>
      <input id="group" className="setup__input" onChange={groupInputHandler} value={groupId} />

      <div className="setup__actionable-column">
        <button className="setup__primary" onClick={joinGroupHandler}>Join Private Group</button>
      </div>
      { successGroupTitle &&
        <div className="setup__success"> You're in {successGroupTitle}!</div>
        }
        { errorGroupTitle &&
        <div className="setup__fail"> {errorGroupTitle}</div>
        }
    </div>
  )
}

export default JoinGroup
