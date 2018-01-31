import React from 'react';
export default class SprocheckboxItem extends React.Component {
  constructor() {
    super();
    this.state = {
      exmaxx: [],
      string: false,
      speed_a: [],
      speed_b: [],
      speed_c: [],
      speed_d: [],
      speed_e: [],
      speed_f: [],
      stemitem:2,
    }
  }
  componentWillMount() {
    var speeda = Math.ceil(this.props.option_a.length / 50);
    var speedb = Math.ceil(this.props.option_b.length / 50);
    var speedc = Math.ceil(this.props.option_c.length / 50);
    var speedd = Math.ceil(this.props.option_d.length / 50);
    var speede = Math.ceil(this.props.option_e.length / 50);
    var speedf = Math.ceil(this.props.option_f.length / 50);
    this.setState({
      speed_a: speeda,
      speed_b: speedb,
      speed_c: speedc,
      speed_d: speedd,
      speed_e: speede,
      speed_f: speedf,
    })
    if(this.props.EXLorW!="W"&&this.props.EXCoarray){
    this.props.EXCoarray.map((value)=>{
      if(value.split("!")[0]==this.props.id){
        this.setState({
          exmaxx:value.split("!")[1]
          })
        }
      })
    }
    let stemitem=this.props.MHeight(this.props.stem,80);
     this.setState({
       stemitem:stemitem
     })
  }

  xx(event) {
    let examxxx = this.state.exmaxx + event.target.id.substring(event.target.id.length - 1);
    if (this.isRepeat(examxxx)) {
      var examxx = this.state.exmaxx.replace(event.target.id.substring(event.target.id.length - 1), "");

    } else {
      var examxx = examxxx;
    }
    let examarray = [];
    for (var i = 0; i < examxx.length; i++) {
      examarray.push(examxx.charAt(i));
    }
    let examarraysort = examarray.sort();

    let examStringsort = examarraysort.join("");
    this.setState({
      exmaxx: examStringsort,
      string: examxx.length != 0 ? true : false
    })
  }
  isRepeat(arr) {
    var hash = {};
    for (var i in arr) {
      if (hash[arr[i]])
        return true;
      hash[arr[i]] = true;
    }
    return false;
  }
  render() {
    //console.log(this.state.examxx==this.props.answer);
     let exStyle={
      display:this.props.EXstate=="K"?"none":"block"
    }
    let oa=this.props.option_a!=null?this.props.option_a.replace(/\s+/g,""):"";
    let ob=this.props.option_b!=null?this.props.option_b.replace(/\s+/g,""):"";
    let oc=this.props.option_c!=null?this.props.option_c.replace(/\s+/g,""):"";
    let od=this.props.option_d!=null?this.props.option_d.replace(/\s+/g,""):"";
    let oe=this.props.option_e!=null?this.props.option_e.replace(/\s+/g,""):"";
    let oF=this.props.option_f!=null?this.props.option_f.replace(/\s+/g,""):"";
    let styleoptiona = {
      height: (30 * this.state.speed_a) + "px",
       display:oa==""?"none":"block"
    }
    let styleoptionb = {
      height: (30 * this.state.speed_b) + "px",
       display:ob==""?"none":"block"
    }
    let styleoptionc = {
      height: (30 * this.state.speed_c) + "px",
       display:oc==""?"none":"block"
    }
    let styleoptiond = {
      height: (30 * this.state.speed_d) + "px",
       display:od==""?"none":"block"
    }
    let styleoptione = {
      height: (30 * this.state.speed_e) + "px",
       display:oe==""?"none":"block"
    }
    let styleoptionf = {
      height: (30 * this.state.speed_f) + "px",
       display:oF==""?"none":"block"
    }
    let styles = {
      color: this.state.string ? "blue" : "black"
    }
   
    let tviewStyle={
      display:this.props.EXLorW=="L"?"none":"inline-block"
    }
    let stemHei={
      height:(this.state.stemitem*28+4)+"px",
      width:this.props.EXstate==="L"?"89%":"100%"
    }
    return (
      <div className="exItem spre_newexItem">
        <div className="radioExam">
          <div className="h-titlItem spre_newexamdiv">
            <p className="spre_p quizz_stem">
            <strong style={{display:this.props.EXLorW!="SL"?"none":"inline-block"}} className={this.state.exmaxx==this.props.answer?"iconfont icon-zhengque finalcflag":"iconfont icon-cuowu finalcflag"}></strong>
            <span className="radiorightScore"  style={{display:this.props.EXLorW!="SL"?"none":"block"}}>
                  <i>{this.state.exmaxx==this.props.answer?"得分 :  加"+this.props.checkboxscore+"分":"得分 :  加0分"}</i>
            </span>
            <b className="spre_previewtestItemb "><i className="iii">{Number(this.props.index+1+this.props.exl1length)<10?"0"+Number(this.props.index+1+this.props.exl1length):Number(this.props.index+1+this.props.exl1length)}</i><i className="ii">/{Number(this.props.examNums)<10?"0"+this.props.examNums:this.props.examNums}</i></b>
            <textarea className="spre_newexamspan" style={stemHei} value={this.props.stem} readOnly>
              </textarea><i className="spre_newi" style={tviewStyle}>已选<span className="xuanxiangstyle" id={this.props.id}>{this.state.exmaxx}</span>选项</i></p>
            <div className="c1 sproPublishradiocheck" style={styleoptiona}><input  type="checkbox" name={this.props.id} id={this.props.id + "A"} onChange={this.xx.bind(this)} /><label htmlFor={this.props.id+"A"}><span className="chooseItem1 spre_newchoosespan2">A</span><span className="answerItem1">{this.props.option_a}</span></label></div>
            <div className="c1 sproPublishradiocheck" style={styleoptionb}><input  type="checkbox" name={this.props.id} id={this.props.id + "B"} onChange={this.xx.bind(this)} /><label htmlFor={this.props.id+"B"}><span className="chooseItem1 spre_newchoosespan2">B</span><span className="answerItem1">{this.props.option_b}</span></label></div>
            <div className="c1 sproPublishradiocheck" style={styleoptionc}><input  type="checkbox" name={this.props.id} id={this.props.id + "C"} onChange={this.xx.bind(this)} /><label htmlFor={this.props.id+"C"}><span className="chooseItem1 spre_newchoosespan2">C</span><span className="answerItem1">{this.props.option_c}</span></label></div>
            <div className="c1 sproPublishradiocheck" style={styleoptiond}><input  type="checkbox" name={this.props.id} id={this.props.id + "D"} onChange={this.xx.bind(this)} /><label htmlFor={this.props.id+"D"}><span className="chooseItem1 spre_newchoosespan2">D</span><span className="answerItem1">{this.props.option_d}</span></label></div>
            <div className="c1 sproPublishradiocheck" style={styleoptione}><input  type="checkbox" name={this.props.id} id={this.props.id + "E"} onChange={this.xx.bind(this)} /><label htmlFor={this.props.id+"E"}><span className="chooseItem1 spre_newchoosespan2">E</span><span className="answerItem1">{this.props.option_e}</span></label></div>
            <div className="c1 sproPublishradiocheck" style={styleoptionf}><input  type="checkbox" name={this.props.id} id={this.props.id + "F"} onChange={this.xx.bind(this)} /><label htmlFor={this.props.id+"F"}><span className="chooseItem1 spre_newchoosespan2">F</span><span className="answerItem1">{this.props.option_f}</span></label></div>

          </div>
           <div style={exStyle} className="rightItem spre_newrightItem"><span className="radiospan_quizz">正确答案:<i id="i">{this.props.answer}</i></span></div>
        </div>
      </div>

    )
  }
}
