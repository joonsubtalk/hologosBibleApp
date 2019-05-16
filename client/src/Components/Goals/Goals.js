import React, { Component } from 'react';
import {SIMPLE_BIBLE} from '../../configs/constants';

export default class Goals extends Component {

  state = {
    bible: [],
    hasWholeBiblePlan: true,
    hasNTBiblePlan: false,
  }

  componentDidMount() {
    this.loadBible(SIMPLE_BIBLE);
  }

  loadBible = (data) => {
    const {meta} = data;
    let bibleArr = [];
    meta.forEach((book) => {
      if (book) {
        bibleArr.push(
          {
            id: book.id,
            name: book.book,
            include: true,
          }
        )
      }
    })
    this.setState({bible: bibleArr});
  }

  checkboxHandler = (evt) => {
    console.log(evt.target.checked);
    const checkboxName = evt.target.name;
    const {hasNTBiblePlan, hasWholeBiblePlan} = this.state;

    switch( checkboxName ) {
      case 'wholeBible':
        this.setState(prevState => ({
          hasWholeBiblePlan: !hasWholeBiblePlan
        }));
        if (!hasWholeBiblePlan)
          this.setIncludes(67)
        break;
      case 'ntBible':
        this.setState(prevState => ({
          hasNTBiblePlan: !hasNTBiblePlan,
          hasWholeBiblePlan: hasNTBiblePlan === false ? false : hasWholeBiblePlan
        }));
        this.setIncludes(39)
        break;
      default:
        break;
    }
  }

  setIncludes = (num) => {
    const {bible} = this.state;
    let bookArr = [];
    bible.forEach((book)=>{
      const obj = {
        id: book.id,
        name: book.name,
        include: book.id > num ? true : false,
      }
      bookArr.push(obj)
    });
    this.setState({bible: bookArr});
  }

  toggleGoal = (evt) => {
    const {bible} = this.state;
    const bookId = Number.parseInt(evt.target.dataset.id);

    const newObj = {
      id: bible[bookId-1].id,
      name: bible[bookId-1].name,
      include: !bible[bookId-1].include
    }

    const beforeArr = bible.slice(0,bookId-1)
    const afterArr = bible.slice(bookId)

    this.setState(prevState => ({
      bible: [...beforeArr, newObj ,...afterArr]
    }));
  }

  render() {
    const {bible, hasWholeBiblePlan, hasNTBiblePlan} = this.state;
    return (
      <div className="goals">
        <div className="goals__container">
          <div className="goals__header">Goals</div>
          <div className="goals__quickActions">
            <form>
              <input type="checkbox" id="wholeBible" name="wholeBible" onChange={this.checkboxHandler} checked={hasWholeBiblePlan}/>
              <label htmlFor="wholeBible">Read whole Bible</label>

              <input type="checkbox" id="ntBible" name="ntBible" onChange={this.checkboxHandler} checked={hasNTBiblePlan}/>
              <label htmlFor="ntBible">Read NT</label>
            </form>
          </div>
          <div className="goals__area">
            <div className="goals__goals" >
              {
                bible.map((book) => {
                  if (book && book.include)
                  return <div className="goals__book" key={`${book.id}in`} data-id={book.id} onClick={this.toggleGoal}>{book.name}</div>
                })
              }
            </div>
            <div className="goals__exclude">
              {
                bible.map((book) => {
                  if (book && !book.include)
                  return <div className="goals__book" key={`${book.id}ex`} data-id={book.id} onClick={this.toggleGoal}>{book.name}</div>
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
