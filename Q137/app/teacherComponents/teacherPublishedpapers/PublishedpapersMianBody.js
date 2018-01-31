import React from "react";
import $ from 'jquery';
import {
  DatePicker
} from 'antd';
import {
  TimePicker
} from 'antd';
import moment from 'moment';
import '../../components/classHour/classContent/examination/spro_Publishedpaperscss.css';
import styles from './spro_Publishedpaperscss.js';
import {
  Link,
  Router,
  Route,
  hashHistory,
  IndexRoute,
  IndexRedirect,
  browserHistory
} from 'react-router';
export default class PublisdedpapersMianBody extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      dataClassId: [],
      dataClass: [],
      // 考试名称
      exam_name: [],
      info: [],
      _val: [],
      val: [],
      //班级列表
      classidStr: [],
      //考试类型
      type: 3,
      //考试开启时间
      s_date: [],
      //时长
      minute: [],
      dateStrings: [],
      timeStrings: [],
      RN: false,
      examna: [],
      publishedpaperForm: true,
      examname: true,
      classidStrs: [],
      examtype: false,
      styleclassidStrs: [],
      styleclassidStrsinfo: [],
      spro_submitinfospan: false,
      one: [],
      two: [],
      three: [],
      zlassState: [],
      flag: false,
      dataTime: [],
      hourTime: [],
      spro_Publishtime: [],
      spro_Publishdate: [],
      spro_Publishalldate: new Date(),
      majorid: [],
      courseid: [],
      lessonid: [],
      stateinfoTitle: "发布考试",
      examtypeinfoChinese:"小测验",
      SproScore:"--",
      //默认小测验
      jianyiInfo:"建议考试时长40分钟",
    }
  }
  range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  disabledDate(current) {
    // can not select days before today and today
    /*
      这里取得是毫秒值 Date.now()当前时间的毫秒值
    */
    return current && current.valueOf() < Date.now() - 24 * 60 * 60 * 1000;
  }
  disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  disabledRangeTime(_, type) {
    if (type === 'start') {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
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
    var s = date.getSeconds();
    if (s < 10) {
      s = "0" + s
    }
    var ruData = Y + "-" + M + "-" + T + " " + S + ":" + m;
    return ruData;
  }
  componentWillMount() {
    //console.log(location.hash.indexOf("zlassState") > 0);
    if (location.hash.indexOf("zlassState") > 0) {
      this.setState({
        stateinfoTitle: "编辑考试"
      })
    }
    if(location.hash.indexOf("zlassState")!=-1&&location.hash.split("zlassState=")[1].split("&")[0]=="2"){
      this.setState({
        classidStrs:Base64.decode(location.hash.split("cld=")[1].split("&")[0])
      })
    }
    if(location.hash.indexOf("Exam_type=")!=-1){
    let examtype=location.hash.split("Exam_type=")[1].split("&")[0];
    //console.log(examtype);
    if(examtype=="0"){

       //console.log(typeof examtype);
      this.setState({
        type:1,
        examtypeinfoChinese:"期末考试",
        stateinfoTitle:"发布期末考试",
        jianyiInfo:"建议考试时长60分钟"
      })
    }else if(examtype=="1"){
      this.setState({
        type:2,
        examtypeinfoChinese:"小测验",
        jianyiInfo:"建议考试时长40分钟",
      })
    }
  }
    let date = new Date();
    let dataTime = this.ruData2(date.getTime()).split(" ")[0];
    // 模拟dataTIme格式
    //console.log(dataTime);
    //console.log(this.ruData2(date.getTime()).split(" ")[1]);
    // ************************
    this.setState({
      zlassState: location.hash.indexOf("zlassState") > 0,
      dataTime: dataTime.replace(/-/g, '/'),
      hourTime: this.ruData2(date.getTime()).split(" ")[1]
    })
    var majorid = "";
    if (location.hash.split("exam_id=")[1].split("&")[0] != "") {
      $.llsajax({
        url: "exam/findbyidExam",
        data: {
          examid: Base64.decode(location.hash.split("exam_id=")[1].split("&")[0])
        },
        type: "post",
        async: false,
        success: findbyidExamdDta => {

          majorid = findbyidExamdDta.examInation.majorid;
          this.setState({
            examna: findbyidExamdDta.examInation != null ? findbyidExamdDta.examInation.name : "",
            type: findbyidExamdDta.examInation != null ? findbyidExamdDta.examInation.type : "",
            val: findbyidExamdDta.examInation != null ? findbyidExamdDta.examInation.minute : "",
            dataTime: findbyidExamdDta.examInation != null ? this.ruData2(findbyidExamdDta.examInation.s_date).split(" ")[0] : this.ruData2(date.getTime()).split(" ")[0],
            hourTime: findbyidExamdDta.examInation != null ? this.ruData2(findbyidExamdDta.examInation.s_date).split(" ")[1] : this.ruData2(date.getTime()).split(" ")[1],
            majorid: findbyidExamdDta.examInation.majorid,
            courseid: findbyidExamdDta.examInation.courseid,
            lessonid: findbyidExamdDta.examInation.lessonid,
          });

            $.llsajax({
              url: "classes/list",
              async: false,
              data: {
                majorid:majorid
              },
              type: "post",
              success: data => {

                this.setState({
                  dataClass: data.list,
                })
              }
            })

        }
      });
    } else {
      $.llsajax({
        url: "examInationPaper/paperPreview",
        type: "POST",
        async: false,
        data: {
          type: "1",
          id: location.hash.split("paper_id=")[1].split("&")[0]
        },
        success: exam => {
          majorid = exam.paper.majorid;
          this.setState({
            val: exam.paper.minute,
            examna: exam.paper.paper_name,
            majorid: exam.paper.major_id,
            courseid: exam.paper.course_id,
            lessonid: exam.paper.lesson_id,
            SproScore:exam.paper.toTalSocre,

          })
            $.llsajax({
              url: "classes/list",
              async: false,
              data: {
                majorid: exam.paper.major_id
              },
              type: "post",
              success: data => {
                this.setState({
                  dataClass: data.list,
                })
              }
            })

        }
      })
    }


}
  componentDidMount(){
    let one = null;
    let two = null;
    let three = null;
    let professionData = JSON.parse(sessionStorage.getItem("teacherComp"));
    professionData.majors.map((majorData) => {
      if (majorData.id == this.state.majorid) {
        one = majorData.name;
      }
      majorData.courseList.map((courseData) => {
        if (courseData.id == this.state.courseid) {
          two = courseData.name;
        }
        courseData.lessons.map((lessonData) => {
          if (lessonData.id == this.state.lessonid) {
            three = lessonData.name;
          }
        });
      });
    });
    this.setState({

      one: one != null ? one : "--",
      two: two != null ? two : "--",
      three: three != null ? three : "--",
    })
  }
  spro_Publishedclass() {
    let styles = {
      "display": this.state.zlassState ? "none" : "inline-block"
    }

    if (location.hash.indexOf("zlassState")!=-1&&location.hash.split("zlassState=")[1].split("&")[0]=="2") {

      return this.state.dataClass.map((value, key) => {
        return (
          <div className="Publishedclass" key={key}><label style={styles.spro_label}>

            <span style={styles.spro_label1} className="Publishedclassspan" >{Base64.decode(location.hash.split("cln=")[1].split("&")[0])}</span></label>
          </div>
        )
      })
    }else if(location.hash.indexOf("zlassState") > 0){
      return this.state.dataClass.map((value, key) => {
        return (
          <div className="Publishedclass" key={key}><label >
            <span  className="Publishedclassspan">{value.name}</span></label>
          </div>
        )
      })
    }
     else {
      return this.state.dataClass.map((value, key) => {
        return (
          <div className="Publishedclass" key={key}><label style={styles.spro_label}>
            <input style={styles} type="checkbox" title="false" onChange={this.checkboxinput.bind(this)} value={value.id} />
            <span style={styles.spro_label1} className="Publishedclassspan">{value.name}</span></label>
          </div>
        )
      })
    }
  }
  dataonChange(date, dateString) {
    var dateStringmac = dateString.replace(/-/g, '/');
    this.setState({
      dataTime: dateStringmac,
    })
  }
  timeonChange(time, timeString) {
    this.setState({
      hourTime: timeString,
    })
  }
  examtimelong(event) {
    var val = event.target.value;
    if (isNaN(val)) {
      val = this.state._val;
      this.setState({
        "info": "只能输入数字!"
      });
      setTimeout(function() {
        this.setState({
          "info": ""
        });
      }.bind(this), 1000);
    } else {
      this.setState({
        _val: val
      })
    }

    this.setState({
      val: val
    });
  }
  examname(event) {
    this.setState({
      examna: event.target.value,
      examname: event.target.value.length != 0 ? false : true
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
  checkboxinput(event) {
    Array.prototype.removeByValue = function(val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
          this.splice(i, 1);
          break;
        }
      }
    }
    this.state.classidStr.push(event.target.value);
    if (this.isRepeat(this.state.classidStr)) {
      var a = this.state.classidStr;
      a.removeByValue(event.target.value);
      a.removeByValue(event.target.value);
    }
    var b = this.state.classidStr;
    b = b.join(";");
    this.setState({
      classidStrs: b
    })
    if (b.length == 0) {
      this.setState({
        styleclassidStrsinfo: "请选择班级",
      })
    } else {
      this.setState({
        styleclassidStrsinfo: "",
      })
    }
  }
  PublishedpaperForm(event) {
    this.setState({
      publishedpaperForm: event.target.value.length == 0 ? true : false
    })
  }
  handleSubmit() {

    Date.prototype.format = function(fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      }
      return fmt;
    }
    if (this.state.publishedpaperForm && location.hash.indexOf("zlassState") <= 0) {
      this.setState({
        spro_submitinfospan: true,
      })
    } else if (this.refs.spro_PublishedpapersMianBodyexamname.value == "") {
      this.setState({
        examnameinfo: "考试名称不能为空,调用创建试卷时候填写的试卷名称",
      })
    }
    //  else if (this.state.type == 3) {
    //   this.setState({
    //     examtype: true,
    //     examtypeinfo: "请选择考试类型"
    //   })
    // }
     else if (this.state.classidStrs.length == 0 && location.hash.indexOf("zlassState") <= 0) {
      this.setState({
        styleclassidStrs: true,
        styleclassidStrsinfo: "请选择班级",
      })
    } else if (this.state.val == "") {
      this.setState({
        info: "请填写考试时长"
      })
    } else {
      let dateStringmac = this.state.dataTime.replace(/-/g, '/');
      $.llsajax({
        url: "examInationPaper/releasePaper",
        type: "POST",
        data: {
          classidStr: this.state.classidStrs.length != 0 ? this.state.classidStrs : ";",
          name: this.state.examna,
          paper_id: location.hash.split("paper_id=")[1].split("&")[0],
          type: this.state.type,
          remark: sessionStorage.getItem("@@History/" + location.hash.split("_k=")[1]),
          s_date: dateStringmac + " " + this.state.hourTime,
          minute: this.state.val,
          url: "examinationMain?type=2",
          id: Base64.decode(location.hash.split("exam_id=")[1].split("&")[0]),
        },
        success: datas => {
          if(this.state.examtypeinfoChinese=="期末考试"){
            hashHistory.push({
              pathname:"/teacherfinallist"
            })
          }
          else{
            hashHistory.push({
              pathname: '/teacherquizzlist'
            })
          }
        }
      })
    }
  }
  backtoshang() {
    history.back();
  }
  onBackStyle() {
    this.setState({
      flag: true
    });
  }
  leaveBackStyle() {
    this.setState({
      flag: false
    });
  }
  Onceback() {
    history.back();
    // if (sessionStorage.getItem("testpaperFlag") == "true") {
    //   hashHistory.push({
    //     pathname: '/teacherteststore'
    //   })
    // } else {
    //   history.back();
    // }

  }
  render() {
    let SproItems=Base64.decode(location.hash.split("I=")[1].split("&")[0])!="null"?Base64.decode(location.hash.split("I=")[1].split("&")[0]):"--";
    let SproScore=Base64.decode(location.hash.split("&S=")[1].split("&")[0])!="null"?Base64.decode(location.hash.split("&S=")[1].split("&")[0]):this.state.SproScore;

    let styleClass = {
      display: this.state.zlassState ? "block" : "none"
    }
    let styleclassidStrs = {
      display: this.state.styleclassidStrs ? "inline-block" : "none"
    }
    let examname = {
      display: this.state.examname ? "inline-block" : "none",
      color: "red"
    }
    let shichang = {
      display: this.state.shichanginfo ? "inline-block" : "none",
      color: "red"
    }
    let spro_submitinfospan = {
      display: this.state.spro_submitinfospan ? "inline-block" : 'none',
      position: "absolute",
      color: "red",
      left: "28%",
      top: "32%",
      height: "40px"
    }
    let spro_examtype = {
      display: this.state.examtype ? "inline-block" : "none",
      color: "red"
    }
    let styleType = this.state.type == 1 ? true : false;
    let styleType1 = this.state.type == 2 ? true : false;
    let ExkeshiStyle={
      display:this.state.examtypeinfoChinese=="期末考试"?"none":"inline-block",
      marginLeft:"10px",
    }
    let ExkeshibStyle={
      display:this.state.examtypeinfoChinese=="期末考试"?"none":"inline-block",
    }
    return (
      <div style={styles.spro_body}>
        <div style={styles.spro_Published1100auto}>
          <div style={styles.spro_PublishTitle}>
            <span style={styles.spro_Publishspan}></span><span className="PublishTitle">{this.state.stateinfoTitle}</span >
            <a className="spro_Publisha" style={this.state.flag ? styles.backto2 : styles.backto} onMouseDown={this.Onceback.bind(this)}
              onMouseEnter={this.onBackStyle.bind(this)} onMouseLeave={this.leaveBackStyle.bind(this)}>返回<span className="iconfont icon-back Sproiconback" > </span></a >
          </div>
          <div style={styles.spro_PublishMianbody} onChange={this.PublishedpaperForm.bind(this)}>
             <div style={styles.spro_Publishexamname0}>
              所属专业:<b style={styles.spro_examname} className="spro_PublishedpapersMianBodyexamname0">{this.state.one}</b>
              <span style={styles.spro_Publishexamname0span}>所属课程:</span><b style={styles.spro_examname} className="spro_PublishedpapersMianBodyexamname0" >{this.state.two}</b>
              <span style={ExkeshiStyle}>所属课时:</span><b style={ExkeshibStyle} className="spro_PublishedpapersMianBodyexamname0">{this.state.three}</b>
            </div>
            <div style={styles.spro_Publishexamname}>
              考试名称:<input style={styles.spro_examname} type="text" className="spro_PublishedpapersMianBodyexamname" ref="spro_PublishedpapersMianBodyexamname" onChange={this.examname.bind(this)} defaultValue={this.state.examna} />

              <span style={examname}>{this.state.examnameinfo}</span>
            </div>
            <div className="spro_Publishexamname">
              考试时间:<DatePicker defaultValue={moment(this.state.dataTime, 'YYYY/MM/DD')} disabledDate={this.disabledDate} disabledTime={this.disabledDateTime} style={styles.spro_PublishDatePicker} onChange={this.dataonChange.bind(this)} />
              <TimePicker defaultValue={moment(this.state.hourTime, 'HH:mm')} format="HH:mm"  disabledHours={this.disabledHours} disabledMinutes={this.disabledMinutes} hideDisabledOptions onChange={this.timeonChange.bind(this)} style={styles.spro_PublishDatePicker2} />
            </div>
            <div style={styles.spro_Publishexamname} >
              考试类型:
              <div className="sproPublishradiocheck2">{this.state.examtypeinfoChinese}</div>
              <div className="sproPublishradiocheck2">{"总分 :"+SproScore}</div>
              <div className="sproPublishradiocheck2">{"题量 :"+SproItems}</div>
                {/*<div className="sproPublishradiocheck"><input checked={styleType} type="radio" name="type" title="期末考试" id='test1' disabled/><label htmlFor="test1">期末考试</label></div>
              <div className="sproPublishradiocheck"><input checked={styleType1} type="radio" name="type" title="随堂测验" id='test2'  disabled/><label htmlFor="test2">随堂测验</label></div>*/}
              <span style={spro_examtype}>{this.state.examtypeinfo}</span>
            </div>

            <div style={styles.spro_Publishexamnameee}>
              考试时长:<input style={styles.spro_examname2} defaultValue={this.state.val} type="text" className="spro_PublishedpapersMianBodyexamname" onChange={this.examtimelong.bind(this)} />

              <i style={styles.spro_i}>分钟</i><i style={styles.spro_ii}><span
                style={styles.spro_spansmall}
              >*</span>{this.state.jianyiInfo}<span style={styles.spro_spaninfo}>{this.state.info}</span></i>
            </div>
            <div style={styles.spro_Publishexamname}>
              <div style={styles.spro_Publishedclassdiv0}>发布班级:</div>
              <div style={styles.spro_Publishclassdiv}>
                <div>
                    {this.spro_Publishedclass()}
                </div>
                <div style={styles.spro_Publishpromptdiv} className={styleclassidStrs}>{this.state.styleclassidStrsinfo}</div>
              </div>
            </div>
            <div style={styles.spro_Publishsubmit}>
              <a style={styles.spro_submitspan0} href="javascript:history.back();">取消</a><Link className="commonButton button" style={styles.spro_submitspan1} onClick={this.handleSubmit.bind(this)}>确定</Link>
              <span style={styles.spro_submitinfospan} style={spro_submitinfospan}><i style={styles.spro_submitinfoi}>×</i><i style={styles.spro_submitinfoi2}>当前页面信息不能为空</i></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
