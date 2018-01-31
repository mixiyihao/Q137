import React from 'react';
import $ from 'jquery';
import styles from './ExResBodycss.js';
import './ExResBody.css';
import {
  Link,
  Router,
  Route,
  hashHistory,
  IndexRoute,
  IndexRedirect,
  browserHistory
} from 'react-router';
export default class examresultmainbody extends React.Component {
  constructor() {
    super();
    this.state = {
      id: location.hash.split("?")[1].split("=")[1],
      studentData: [],
      studentDatalist: [],
      value: [],
      x: false,
      flag: false,
      studentSearch: true,
      propsstudentSearch: true,
      studentState: [],
      ecst: [],
      table: [],
    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    this.setState({
      studentState: this.props.studentState,
      studentData: this.props.studentData,
      studentDatalist: this.props.studentDatalist,
    })
  }
  searchStudent() {
    let stuvalue = this.refs.myTextInput.value;

    let studentDatalist0 = [];

    var studentDatalist = this.props.studentDatalist;
    studentDatalist.map((value, key) => {
      if (value.name.indexOf(stuvalue) != -1) {
        studentDatalist0.push(value);
      } else {

      }
    })
    if (this.props.studentDatalist == 0) {
      this.setState({
        propsstudentSearch: false
      })
    } else {
      this.setState({
        propsstudentSearch: true
      })
    }
    if (studentDatalist0.length == 0) {
      this.setState({
        studentSearch: false
      })
    } else {
      this.setState({
        studentSearch: true
      })
    }
    if (stuvalue) {
      this.setState({
        studentDatalist: studentDatalist0
      })
    } else if (stuvalue.length == 0) {
      this.setState({
        studentDatalist: this.props.studentDatalist
      })
    }
  }
  scoreSort(x) {

    var studentDatalist = this.state.studentDatalist.length != 0 ? this.state.studentDatalist : this.props.studentDatalist;
    let studentvalue = [];
    let studentDatalist2 = [];
    var stuRepeat = [];
    var temp;
    var unusual = [];
    var usual = [];
    for (var i = 0; i < studentDatalist.length; i++) {
      if (studentDatalist[i].score == null) {
        unusual.push(studentDatalist[i]);
      } else {
        usual.push(studentDatalist[i]);
      }
    }

    if (!x) {
      for (var i = 0; i < usual.length; i++) { //比较趟数
        for (var j = 0; j < usual.length - i; j++) {

          if (usual[j + 1] != undefined) {
            if (usual[j].score < usual[j + 1].score) {
              var temp = usual[j + 1];
              usual[j + 1] = usual[j];
              usual[j] = temp
            }
          }

        }
      }
    } else {
      for (var i = 0; i < usual.length; i++) { //比较趟数
        for (var j = 0; j < usual.length - i; j++) {
          if (usual[j + 1] != undefined) {
            if (usual[j].score > usual[j + 1].score) {
              var temp = usual[j + 1];
              usual[j + 1] = usual[j];
              usual[j] = temp;
            }
          }

        }
      }
    }
    for (var i = 0; i < unusual.length; i++) {
      usual.push(unusual[i])
    }
    this.setState({
      studentDatalist: usual,
      x: !x
    })
  }
  errorSort(x) {
    var studentDatalist = this.state.studentDatalist.length != 0 ? this.state.studentDatalist : this.props.studentDatalist;
    let studentvalue = [];
    let studentDatalist2 = [];
    var stuRepeat = [];
    var temp;
    var unusual = [];
    var usual = [];
    for (var i = 0; i < studentDatalist.length; i++) {
      if (studentDatalist[i].error_num == null) {

        unusual.push(studentDatalist[i]);

      } else {
        usual.push(studentDatalist[i]);
      }
    }
    if (!x) {
      for (var i = 0; i < usual.length; i++) { //比较趟数
        for (var j = 0; j < usual.length - i; j++) {
          if (usual[j + 1] != undefined) {
            if (usual[j].error_num < usual[j + 1].error_num) {
              var temp = usual[j + 1];
              usual[j + 1] = usual[j];
              usual[j] = temp
            }
          }
        }
      }
    } else {
      for (var i = 0; i < usual.length; i++) { //比较趟数
        for (var j = 0; j < usual.length - i; j++) {
          if (usual[j + 1] != undefined) {
            if (usual[j].error_num > usual[j + 1].error_num) {
              var temp = usual[j + 1];
              usual[j + 1] = usual[j];
              usual[j] = temp
            }
          }
        }
      }
    }
    for (var i = 0; i < unusual.length; i++) {
      usual.push(unusual[i])
    }

    this.setState({
      studentDatalist: usual,
      x: !x
    })
  }
  handleEnter(event) {
    if (event.keyCode === 13) {
      this.searchStudent();
    }
  }
  spro_TabL1() {
    // let studentDataliststyle = {
    //   display: this.state.studentDatalist != null ? "block" : "none"
    // }
    let studentSearchstyle = {
      display: this.state.studentSearch ? "block" : "none"
    }
    var studentDatalisting = [];
    if (this.state.studentDatalist.length != 0) {
      studentDatalisting = this.state.studentDatalist;
    } else {
      studentDatalisting = this.props.studentDatalist;
    }
    return studentDatalisting.map((value, key) => {
      if (key < 9) {
        key = "0" + Number(key + 1);
      } else {
        key = Number(key + 1);
      }
      var valuescore = "";
      var valueerror_num = "";
      var actionTime = "";
      if (this.state.studentState == 1) {
        valuescore = value.score != null ? value.score : "缺考";
        valueerror_num = value.error_num != null ? value.error_num : "--";
      } else {
        valuescore = value.score != null ? value.score : "--";
        valueerror_num = value.error_num != null && value.error_num != "-1" ? value.error_num : "--";
      }
      if (value.actionDuration == null) {
        actionTime = "--";
      } else {
        actionTime = value.actionDuration + "分钟"
      }
      let valuecate = value.cdate ? value.cdate.slice(0, 19) : "--";
      return (
        <div className="spro_TabL1" key={key} style={studentSearchstyle}>
          <ul style={styles.spro_examResul}>
            <li style={styles.spro_examResL1}>{key}</li>
            <li style={styles.spro_examResL2}>{value.idcard}</li>
            <li style={styles.spro_examResL3}>{value.name}</li>
            <li style={styles.spro_examResL4}>{valuecate}</li>
            <li style={styles.spro_examResL5}>{actionTime}</li>
            <li style={styles.spro_examResL6}>{valuescore}</li>
            <li style={styles.spro_examResL7}>{valueerror_num}</li>
          </ul>
        </div>
      )
    })
  }
  backtoshang() {
    hashHistory.push({
      pathname: '/teachertestlist'
    })
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
  render() {
    let studentDataliststyle = {
      display: this.state.studentSearch ? "none" : "block"
    }



    return (
      <div>
        <div style={styles.spro_exam1200auto}  ref="myRef">
          <div style={styles.spro_examResbody}>
            <div style={styles.spro_examMainbody}>
              <div style={styles.spro_examRessearch} className="spro_examRessearch">
                <span>学生姓名:</span><input onChange={this.searchStudent.bind(this)} type="text" placeholder="按学生姓名搜索" ref="myTextInput"
                onKeyUp={this.handleEnter.bind(this)}/><b onClick={this.searchStudent.bind(this)} className="staticb">搜索</b>
                <ol className="spro_examResol">
                  <li>序号</li>
                  <li>学号</li>
                  <li>姓名</li>
                  <li>提交时间</li>
                  <li>答题时长</li>
                  <li>成绩<span onClick={this.scoreSort.bind(this, this.state.x)}><i className="iconfont icon-paixu_jiang shang"></i><i className="iconfont icon-paixu_sheng xia"></i></span></li>
                  <li>错题数<span onClick={this.errorSort.bind(this, this.state.x)}><i className="iconfont icon-paixu_jiang  shang shangClass"></i><i className="iconfont icon-paixu_sheng xia"></i></span></li>
                </ol>
              </div>
              {this.spro_TabL1()}
              <div className="h-bodytiwen1" style={studentDataliststyle}>
                  <span className="h-sugpoint"></span>
                  <span className="h-sugpoint1">当前没有符合条件的学生</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}