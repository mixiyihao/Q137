import React, { Component } from 'react';

export default class SliderDots extends Component {
  constructor(props) {
    super(props);
  }

  handleDotClick(i) {
    var option = i - this.props.nowLocal;
    this.props.turn(option);
    this.props.OKOKOKO(i);
  }

  render() {
    let dotNodes = [];

    let { count, nowLocal } = this.props;
    for(let i = 0; i < count-1; i++) {
      dotNodes[i] = (
        <span
          key={'dot' + i}
          className={"slider-dot" + (i === this.props.nowLocal||i==(this.props.nowLocal-(this.props.count-1))?" slider-dot-selected":"")}
          onClick={(i == this.props.nowLocal||i==(this.props.nowLocal-(this.props.count-1)))?null:this.handleDotClick.bind(this, i)}>
        </span>
      );
    }
    return (
      <div className="slider-dots-wrap">
        {dotNodes}
      </div>
    );
  }
}
