import React from 'react'

export default function Avatar() {
  return (
    <div className="avatar">
      Some avatar creating thing?
      <div className="avatar__container">
        <div className="avatar__head"></div>
        <div className="avatar__face"></div>
        <div className="avatar__lefteye"></div>
        <div className="avatar__righteye"></div>
        {/* <div className="avatar__mouth"></div>
        <div className="avatar__lips"></div> */}
        <div className="avatar__eyebrow"></div>
        <div className="avatar__hair">
          <div className="avatar__hairleft"></div>
          <div className="avatar__hairright"></div>
        </div>
        <div className="avatar__extra"></div>
      </div>
    </div>
  )
}
