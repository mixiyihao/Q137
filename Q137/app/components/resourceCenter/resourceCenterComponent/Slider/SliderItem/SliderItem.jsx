import React, { Component } from 'react';
import url from '../../../../../controller/url.js';
export default class SliderItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { count, item } = this.props;
    let width = 100 / count + '%';
    return (
      <li className="slider-item" style={{width: width}} onClick={this.props.liClickurl.bind(this,item.id,item.id)}>
        <img src={item.picture!=null?url.WEBURL+item.picture:""} alt={item.alt} />
        <span className="slider-iteminnerspan">{item.title!=null?item.title:""}</span>
      </li>
    );
  }
}
