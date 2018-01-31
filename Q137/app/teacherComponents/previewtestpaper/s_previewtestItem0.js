import React from 'react';
import $ from 'jquery';
import MHeight from '../../components/finalExam/MHeight.js';
export default class S_previewtestItem0 extends React.Component {
  constructor() {
    super();
    this.state = {

      styleText: false,
      title: ["A", "B", "C", "D"],
      objectDangnian: [],
      styleText: false,
      A_style: false,
      B_style: false,
      C_style: false,
      D_style: false,
      stemHeight:2,
    }
  }
  componentWillMount() {
    if (Number(this.props.zcindex) < 9) {
      this.setState({
        styleText: true
      })
    } else {
      this.setState({
        styleText: false
      })
    }
    var ChatItem = this.props.answer;
    this.Item(ChatItem);
    // 题干的长度
    let stemHeight=MHeight(this.props.stem,104);
    this.setState({
      stemHeight:stemHeight
    })
  }
  Item(expression) {
    switch (expression) {
      case "A":
        this.setState({
          A_style: true
        })
        break;
      case "B":
        this.setState({
          B_style: true
        })
        break;
      case "C":
        this.setState({
          C_style: true
        })
        break;
      case "D":
        this.setState({
          D_style: true
        })
        break;
      default:
    }

  }

  render() {
    let oa=this.props.option_a!=null?this.props.option_a.replace(/\s+/g,""):"";
    let ob=this.props.option_b!=null?this.props.option_b.replace(/\s+/g,""):"";
    let oc=this.props.option_c!=null?this.props.option_c.replace(/\s+/g,""):"";
    let od=this.props.option_d!=null?this.props.option_d.replace(/\s+/g,""):"";
    let styleoptiona = {
    
       display:oa==""?"none":"block"
    }
    let styleoptionb = {
     
       display:ob==""?"none":"block"
    }
    let styleoptionc = {
   
       display:oc==""?"none":"block"
    }
    let styleoptiond = {
     
       display:od==""?"none":"block"
    }
    this.props.shierdian();
    let styles = {
      display: this.state.styleText ? "inline-block" : "none"
    }
    let hei={
      height:(this.state.stemHeight*33)+"px"
    }
    return (
      <div className="radioExam">
        <div className="s_previewdiv">
          <p className="spre_p s_previewp"><b className="spre_previewtestItemb"><i className="iii" style={styles}>0</i>{this.props.zcindex+1}<i className="ii">{this.props.exLength<10?"/0"+this.props.exLength:"/"+this.props.exLength}</i></b>
          <textarea className="s_preitem0area" style={hei} value={this.props.stem}></textarea></p>
          <div className="sproPublishradiocheck styleblock  paddinglefti" style={styleoptiona}><input type="radio" name="type"  id={this.props.zcindex+'test1'} disabled/><label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+"test1"} className={!this.state.A_style ? "Spre-checkY" : "Spre-checkX" }>
            <span className="answerItem PreChanswerItem">A</span>
            <b className="spro-bspreview">{this.props.option_a}</b></label></div>
          <div className="sproPublishradiocheck styleblock  paddinglefti" style={styleoptionb}><input type="radio" name="type"  id={this.props.zcindex+'test2'} disabled/>
              <label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+"test2"} className={!this.state.B_style ? "Spre-checkY" : "Spre-checkX" }>
              <span className="answerItem PreChanswerItem">B</span>
              <b className="spro-bspreview">{this.props.option_b}</b></label></div>
          <div className="sproPublishradiocheck styleblock  paddinglefti" style={styleoptionc}><input type="radio" name="type"  id={this.props.zcindex+'test3'} disabled/>
              <label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+"test3"} className={!this.state.C_style ? "Spre-checkY" : "Spre-checkX" }>
              <span className="answerItem PreChanswerItem">C</span>
              <b className="spro-bspreview">{this.props.option_c}</b></label></div>
          <div className="sproPublishradiocheck styleblock  paddinglefti" style={styleoptiond}>
              <input type="radio" name="type"  id={this.props.zcindex+'test4'} disabled/>
              <label className="spre_Item Chspre_Item" htmlFor={this.props.zcindex+"test4"} className={!this.state.D_style ? "Spre-checkY" : "Spre-checkX" }>
              <span className="answerItem PreChanswerItem">D</span>
              <b className="spro-bspreview">{this.props.option_d}</b></label></div>   
          <div className="rightItem"><span className="s_preanswerspan">正确答案:<i id="i" className="Spreviewansi">{this.props.answer}</i></span></div>
        </div>
      </div>
    )
  }
}