import React, { Component } from 'react'
import { WITTY_LOADER } from '../../configs/loading';
import { shuffle } from '../../configs/utils';

export default class Loader extends Component {

  state = {
    wittyTexts : [],
    selectedWit : 0,
    wittyInterval : null,
    refreshing : true,
    witAwait : 875
  }

  componentDidMount() {
    this.setState({wittyTexts : shuffle(WITTY_LOADER)});
    const wittyGenerator = setInterval(this.newWit, this.state.witAwait);
    this.setState({wittyInterval : wittyGenerator})
  }

  componentWillUnmount() {
    clearInterval(this.state.wittyInterval);
  }

  newWit = () => {
    this.setState({refreshing : true});
    if (this.state.selectedWit + 1 < this.state.wittyTexts.length)
      this.setState((prevState, props) => ({
        selectedWit: prevState.selectedWit + 1
      }));
    else
      this.setState({selectedWit : 0});
  }

  handleAnimationEnd = () => {
    this.setState({refreshing : false});
  }

  uppercase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const {selectedWit, wittyTexts, refreshing} = this.state;
    if (wittyTexts.length === 0) return <div>Loading</div>;
    const text = this.uppercase(wittyTexts[selectedWit]);
    const additionalClasses = refreshing
      ? 'o-loader--animated'
      : '';
    return (
      <div className={`o-loader ${additionalClasses}`} onAnimationEnd={this.handleAnimationEnd}>
        <div className="o-loader__text">
          {text}
        </div>
      </div>
    )
  }
}
