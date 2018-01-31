import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import './spro_Teacarddelate.css';
import styles from './teachertestlistbodycss.js';
import {
  Link,
  Router,
  Route,
  hashHistory,
  IndexRoute,
  IndexRedirect,
  browserHistory
} from 'react-router';
export default class TestcardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Nokeyword: [],
      sty: [],
      stys: [],
      styx: []
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
  onLinkTo(exam_id, id, m, c, l, t, classname, mintue, classid) {
    sessionStorage.setItem("majorid", m != null ? m : "--");
    sessionStorage.setItem("courseid", c != null ? c : "--");
    sessionStorage.setItem("lessonid", l != null ? l : "--");
    sessionStorage.setItem("examType", t != null ? t : "--");
    sessionStorage.setItem("sproclassName", classname);
    sessionStorage.setItem("sproclassId", this.props.class_id);
    sessionStorage.setItem("classstr", true);
    sessionStorage.setItem("examinationTime", mintue);
    hashHistory.push({
      pathname: '/teacherPublishedpapers',
      query: {
        exam_id: exam_id,
        id: id,
        zlassState: "1",
        I:this.props.questionsNumber?Base64.encodeURI(this.props.questionsNumber):"卡片页接口未完",
        S:Base64.encodeURI(this.props.totalscore),
      },
    })
  }
  render() {
    var ruData = this.ruData2(this.props.s_date);
    let propsname = "";
    if (this.props.name.length > 9) {
      propsname = this.props.name.substring(0, 10) + "...";
    } else {
      propsname = this.props.name;
    }
    let Nokeyword = ""
    let sty = "";
    let stys = "";
    let styx = "";
    if (this.props.permission == 0) {
      Nokeyword = "未开始";
      sty = {
          background: "#80edac",
          color: "#fff"
        },
        stys = {
          display: "none"
        },
        styx = {
          display: "block"
        }
    } else if (this.props.permission == 1) {
      Nokeyword = "进行中";
      sty = {
          background: "#b5e5f6",
          color: "#fff"
        },
        stys = {
          display: "block"
        },
        styx = {
          display: "none"
        }
    } else if (this.props.permission == 2) {
      Nokeyword = "已结束";
      sty = {
          background: "#e3e3e3",
          color: "#606060"
        },
        stys = {
          display: "block"
        },
        styx = {
          display: "none"
        }
    }
    let styles = {
      editShow: {
        display: "block"
      },
      editHide: {
        display: "none"
      }
    }
    let coursename = String(this.props.coursename);
    let coursename_pro = coursename.length > 6 ? coursename.substring(0, 6) + "..." : this.props.coursename
    return (

      <div style={styles.spro_teatestcard} className="spro_teatestcard">
        <strong className="card_X iconfont icon-icon-test1" style={styx}
          onClick={this.props.onDelete.bind(this, this.props.id, 1)}></strong>
        <h1 style={styles.spro_teatestcardh1} title={this.props.name}><p>{propsname}</p></h1>
        <div className="spro_teatestcardstate" style={sty}>{Nokeyword}</div>
        <p className="spro_testcardp1"><b className="spro_testb">考试时间:</b><span className="spro_testspanTime1">{ruData}</span><span className="editSpan"
        onClick={this.props.permission == 0 ? this.onLinkTo.bind(this,this.props.id, this.props.paper_id,this.props.majorid,
          this.props.courseid,this.props.lessonid,this.props.type,this.props.classname,this.props.mintue) : null} style={this.props.permission == 0 ? null : styles.editHide}>
        修改
        </span></p>
        <p className="spro_testcardp2">所属课程:<span className="spro_testspanTime">{coursename_pro}</span><i className="spro_testspanTimei">课时:{this.props.lessonname}</i></p>
        <p className="spro_testcardp3">发送班级:<span className="spro_testspanTime">{this.props.classname}</span><i></i></p>
        <span className="spro_testcardspan1">已交:{this.props.ysub}</span><span className="spro_testcardspan2">未交:{this.props.nsub}</span>
        <b className="spro_testcardb1" style={stys} >
          <Link to={{ pathname: "/teacherExamResultstatistics", query: { id: this.props.id,paper_id:this.props.paper_id} }}
            onClick={this.props.onpageChange.bind(this)}
          >统计</Link>
        </b>
        <b className="spro_testcardb1" style={this.props.permission != 0 || this.props.result != 1 ? styles.editHide : styles.editShow}>
          <Link to={{ pathname: "/editTestPaper", query: { exam_id: this.props.id, id: this.props.paper_id } }}
            onClick={this.props.onpageChange.bind(this, this.props.majorname,this.props.coursename,this.props.lessonname)}
          >编辑</Link>
        </b>
        {/*<b className="spro_testcardb1" style={styx}
          onClick={this.props.onDelete.bind(this, this.props.id, 1)}
        >
          删除
           </b>*/}
      </div>
    )
  }
}
