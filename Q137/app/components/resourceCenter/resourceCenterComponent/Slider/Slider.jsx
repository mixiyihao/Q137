import React, { Component } from 'react';
require('./Slider.css');
import SliderItem from './SliderItem/SliderItem.jsx';
import SliderDots from './SliderDots/SliderDots.jsx';
import SliderArrows from './SliderArrows/SliderArrows.jsx';
export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowLocal: 0,
    
    };
  }
  // 向前向后多少
  turn(n) { 
   let _n=this.state.nowLocal+n;
    if(_n >=  this.props.items.length+1) {
       $("#banner").css("left","0") 
       if($("#banner").css("left")==="0px"){
          this.setState({nowLocal:1});
       }else{
            this.setState({nowLocal: _n});
       }
    }
    else{
        this.setState({nowLocal: _n});
    }
  }
  OKOKOKO(i){
    if(i==0){
      this.setState({
        nowLocal:0
      })
    }
    $( '#banner' ).animate({
        left: -100 * i + "%"
      });
  }
  // 开始自动轮播
  goPlay() {
    if(this.props.autoplay) {
      this.autoPlayFlag = setInterval(() => {
        this.turn(1);
         $( '#banner' ).animate({
        left: -100 * this.state.nowLocal + "%"
      },1000);
      }, 3000);
    }
  }

  // 暂停自动轮播
  pausePlay() {
    clearInterval(this.autoPlayFlag);
  }
  componentWillUnmount() {
      clearInterval(this.autoPlayFlag);
  }
  componentDidMount() {
    this.goPlay();
  }

  render() {
    let count = this.props.items.length+1;
    let itemInit=this.props.items;
    let itemInit2=new Array(count+1);
    let lastChild=itemInit[0];
    itemInit2=itemInit.concat(lastChild);
    let itemNodes= itemInit2.map((item, idx) => {
      if(item instanceof Object){
          return <SliderItem item={item} count={count} key={'item'+ idx} index={idx} liClickurl={this.props.liClickurl.bind(this)}/>;
        }
        });
    let arrowsNode = <SliderArrows turn={this.turn.bind(this)}/>;
    let dotsNode = <SliderDots 
    OKOKOKO={this.OKOKOKO.bind(this)}
    turn={this.turn.bind(this)} count={count} nowLocal={this.state.nowLocal} />;
    return (
      <div
        className="slider"
        onMouseOver={this.props.pause?this.pausePlay.bind(this):null} onMouseOut={this.props.pause?this.goPlay.bind(this):null}>
          <ul id="banner" style={{
              width:count* 100 + "%"
            }}>
              {itemNodes}
          </ul>
          {/*{this.props.arrows?arrowsNode:null}*/}
          {this.props.dots?dotsNode:null}
        </div>
      );
  }
}

Slider.defaultProps = {
  speed: 1,
  delay: 2,
  pause: true,
  autoplay: true,
  dots: true,
  arrows: true,
  items: [],
};
Slider.autoPlayFlag = null;
