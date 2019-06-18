import React from 'react'

const JoinGroup = ({joinGroupHandler, groupInputHandler, groupId}) => {
  return (
    <div>
    Two are better than one,
        because they have a good return for their labor:
    If either of them falls down,
        one can help the other up.

    Join a Group?
      Private? Enter Code
      <input onChange={groupInputHandler} value={groupId} />
      <button onClick={joinGroupHandler}>Say it</button>
    </div>
  )
}

export default JoinGroup
