import React, { Component } from 'react'

class Modal extends Component {
  state = {
    groupTitle: '',
    isPrivate: false,
  }

  changeHandler = (evt) => {
    this.setState({groupTitle: evt.target.value})
  }

  render() {
    const {closeHandler, createHandler} = this.props;
    const {groupTitle} = this.state;
    return (
    <div className="modal">
      <div className="modal__container">
        <div className="modal__card">
          <div className="modal__header">
            <div className="modal__title">
            Create Group
            </div>
          </div>
          <div className="modal__content">
            <div className="modal__description">
              <form>
                <label htmlFor="groupName">Group Name:</label>
                <input type="text" id="groupName" name="groupName" onChange={this.changeHandler} value={groupTitle}/>
                <br />
                <label htmlFor="groupPrivacy">Is this a private group?</label>
                <input type="checkbox" id="groupPrivacy" name="groupPrivacy" checked={true}/>
              </form>
            </div>
            <div className="modal__cta">
              <div className="modal__cancel" onClick={()=>{closeHandler()}}>Close</div>
              <div className="modal__create" onClick={()=>{createHandler(groupTitle)}}>Create</div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal__backdrop"></div>
    </div>
  )}
}

export default Modal
