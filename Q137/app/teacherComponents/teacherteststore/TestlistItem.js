import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import {
  Link,
  Router,
  Route,
  hashHistory,
  IndexRoute,
  IndexRedirect,
  browserHistory
} from 'react-router';
export default class TestlistItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  }
  ruData2(s_date) {
    var date = s_date;
    var date = new Date(date);
    var Y = date.getFullYear();
    var M = date.getMonth() + 1;
    if (M < 10) {
      M = "0" + M
    }
    var T = date.getDate();
    if (T < 10) {
      T = "0" + T
    }
    var S = date.getHours();
    if (S < 10) {
      S = "0" + S
    }
    var m = date.getMinutes();
    if (m < 10) {
      m = "0" + m
    }
    var ruData = Y + "-" + M + "-" + T + " " + S + ":" + m;
    return ruData;
  }

  render() {
     var ruData = this.ruData2(this.props.c_date);
      var num = (this.props.page - 1) * 10;
      var index = num + Number(this.props.index) + 1;
      var valueowner ="";
      if(this.props.owner=="0"){
          valueowner ="期末"
      }else if(this.props.owner=="1"){
          valueowner ="公有"
      }else{
          valueowner="私有"
      }
      var majorName1 = this.props.majorName ? this.props.majorName : "--";
      var courseName1 = this.props.courseName ? this.props.courseName : "--";
      var lessonName1 = this.props.lessonName ? this.props.lessonName : "--";
      let styless = {
        cursor: "pointer",
        display:location.hash.indexOf("?Spro")!=-1?"none":"inline-block",
      }
      if (index < 10) {
        index = "0" + index;
      }
      let backAndTextColor = {
        visibility: "hidden",
        border: "1px solid #000000",
        backgroundColor: "#FFFFCC",
        fontSize: "12px",
        position: "absolute"
      }
      var majorName = majorName1.length > 5 ? majorName1.substring(0, 5) + "..." : majorName1;
      var paper_name = this.props.paper_name.length > 8 ? this.props.paper_name.substring(0, 8) + "..." : this.props.paper_name;
      var courseName = courseName1.length > 7 ? courseName1.substring(0, 7) + "..." : courseName1;

      var lessonName = lessonName1.length > 7 ? lessonName1.substring(0, 7) + "..." : lessonName1;

      return (
        <div>
        <div className="spro_thQuBodys">
                      <div className="spro_thQutitbd2">{index}</div>
                      <div className="spro_thQutitbd3" title={this.props.paper_name}
                      >{paper_name}</div>
                      <div className="spro_thQutitbd4">{this.props.questionsNumber}</div>
                      <div className="spro_thQutitbd8">{valueowner}</div>
                      <div className="spro_thQutitbd5" title={majorName1}>{majorName} </div>
                      <div  id={index+"title"} style={backAndTextColor}></div>
                      <div className="spro_thQutitbd6"   title={courseName1}>{courseName} </div>
                      <div className="spro_thQutitbd7"  title={lessonName1}>{lessonName} </div>
                      <div className="spro_thQutitbd9">{ruData}</div>
                      <div className="spro_thQutitbd10">
                          <Link to={{pathname:"/teacherPublishedpapers",state:this.props.remark,query:{exam_id:"",paper_id:this.props.id,Exam_type:this.props.owner,I:Base64.encodeURI(this.props.questionsNumber),S:Base64.encodeURI(this.props.toTalSocre)}}}  title="发布到考试"
                           onClick={this.props.heiheihei.bind(this,this.props.major_id,this.props.minute,this.props.course_id,this.props.lesson_id)} className="iconfont icon-fabukaoshi"></Link>
                          <Link to={{pathname:"/previewtestpaper",query:{id:Base64.encodeURI(this.props.id)}}} title="预览试卷" className="iconfont icon-yulan" ></Link>
                          <Link  to={{pathname:"/editTestPaper",query:{exam_id: "",id:this.props.id}}} title="编辑"
                             onClick={this.props.result==0?function(e){e.preventDefault?e.preventDefault():e.returnValue=false;}:
                          this.props.heiheihei.bind(this,this.props.major_id,this.props.minute,this.props.course_id,this.props.lesson_id)}
                           className={this.props.result==0?'spro_useless'+' '+"iconfont"+' '+ "icon-bianji":"iconfont"+' '+ "icon-bianji"}style={styless}></Link>
                          <a onClick={this.props.result==0?function(e){return false}:this.props.onDelete.bind(this,this.props.id,this.props.owner,1)} title="删除"
                           className={this.props.result==0?'spro_useless'+' '+"iconfont"+' '+ "icon-SHANCHU-":"iconfont"+' '+ "icon-SHANCHU-"}style={styless}></a>
                      </div>
                       
                  </div>
                  </div>
      )
          }
}
