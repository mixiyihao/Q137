import React from 'react';
import './styleAccessStatistics.css';
import $ from "jquery";
import WEBurl from "../../controller/url.js";
import {
  Link
} from 'react-router';
import {
  DatePicker
} from 'antd';
import {
  TimePicker
} from 'antd';
import moment from 'moment';
export default class AccessStatistics extends React.Component {
  constructor() {
    super();
    this.state = {
      olddataTime: new Date("2017-01-01"),
      newdataTime: new Date(),
      stuArr: [],
      stuNum: 0,
      clickIndex: 0,
      saveData: [],
      inputvalue: [],
      classData: [],
      name: [],
      Browser: [],
      dataObj0: [],
      dataObj1: [],
      dataObj2: [],
      dataObj3: [],

    }
  }
  onGool() {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      this.setState({
        Browser: 1
      });
    } else if (isEdge) {
      this.setState({
        Browser: 1
      });
    } else {
      this.setState({
        Browser: 2
      });
    }
  }
  accDownloadall() {
    // $.llsajax({
    //   url: "userlog/exportLoginlog",
    //   type: "get",
    //   data: {
    //     classid: this.state.classData[this.state.clickIndex].id,
    //     classname: this.state.classData[this.state.clickIndex].name
    //   },
    //   success: dataobj => {
    //     //console.log(dataobj);
    //   }
    // })
    window.open(WEBurl.WEBURL+'userlog/exportLoginlog?classid=' + this.state.classData[this.state.clickIndex].id + "&browser=" + this.state.Browser);
  }
  range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  magicsort(iV, oT, nT, flag) {
    // $.ajax({
    if (flag == "no") {
      var arr = [];
      var dataObj = this.state.saveData
      var len = dataObj.length;
      if (len > 0) {
        for (var i = 0; i < len; i++) {
          // var maxDate = new Date(list[i].maxDate.substring(0, 10)).getTime();
          var Name = dataObj[i].name != null ? dataObj[i].name : "--";
          var studentNo = dataObj[i].studentNo;
          var Sstudentid = studentNo != null ? studentNo.toString() : "--";
          if (Name.indexOf(iV) >= 0 || Sstudentid.indexOf(iV) >= 0) {
            arr.push(<tr key = {i}>
                   <td>{Name}</td>
                   <td>{Sstudentid}</td>
                   <td>{dataObj[i].loginNum}</td>
                   <td>{dataObj[i].maxDate!=null?dataObj[i].maxDate.substring(0,10):"--"}</td>
                 </tr>);
          }
        }
      }
      this.setState({
        saveData: dataObj,
        stuArr: arr,
        stuNum: arr.length
      })
    } else {
      $.llsajax({
        url: "userlog/findTlog",
        type: "post",
        data: {
          classid: this.state.classData[this.state.clickIndex].id,
          olddataTime: this.ruData2(oT),
          newdataTime: this.ruData2(nT),
        },
        success: listobj => {
          var dataObj = listobj.obj;
          var prr = [];
          var len = dataObj.length;
          if (len > 0) {
            for (var i = 0; i < len; i++) {
              // var maxDate = new Date(list[i].maxDate.substring(0, 10)).getTime();
              var Name = dataObj[i].name != null ? dataObj[i].name : "--";
              var studentNo = dataObj[i].studentNo;
              var Sstudentid = studentNo != null ? studentNo.toString() : "--";
              if (Name.indexOf(iV) >= 0 || Sstudentid.indexOf(iV) >= 0) {
                prr.push(<tr key = {i}>
                   <td>{Name}</td>
                   <td>{Sstudentid}</td>
                   <td>{dataObj[i].loginNum}</td>
                   <td>{dataObj[i].maxDate!=null?dataObj[i].maxDate.substring(0,10):"--"}</td>
                 </tr>);
              }
            }
          }
          this.setState({
            saveData: dataObj,
            stuArr: prr,
            stuNum: prr.length
          })
        }
      })
    }
  }
  ruData2(s_date) {
    var date = s_date;
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
    var ruData = Y + "-" + M + "-" + T + " " + S + ":" + m + ":" + s;
    return ruData;
  }
  accchangeTabHandle(event) {
    var stuArrItem = [];
    var title = event.target.getAttribute('data-key');
    if (title != this.state.clickIndex) {
      $(".accchange").val("");
      // this.refs.accinputvalue.value = "";/
    }
    $.llsajax({
      url: "userlog/findTlog",
      type: "post",
      data: {
        classid: this.state.classData[title].id,
        olddataTime: "1970-01-01",
        newdataTime: this.ruData2(new Date()),
      },
      success: dataClass => {
        // this.setState({
        //   dataObj + [title]: dataClass.obj;
        // })
        var dataobj = dataClass.obj;
        if (dataobj != null) {
          var len = dataobj.length;
          if (len > 0) {
            for (var i = 0; i < len; i++) {
              var studentNo = dataobj[i].studentNo;
              var Sstudentid = studentNo != null ? studentNo.toString() : "--";
              stuArrItem.push(<tr key={i}>
                  <td>{dataobj[i].name!=null?dataobj[i].name:"--"}</td> <td> 
                  {Sstudentid}</td> 
                  <td>{dataobj[i].loginNum}</td> 
                  <td>{dataobj[i].maxDate!=null?dataobj[i].maxDate.substring(0,10):"--"}</td></tr>)
            }
          }
          this.setState({
            clickIndex: title,
            saveData: dataobj,
            stuArr: stuArrItem,
            stuNum: len
          })
        }
      }
    })
  }
  dataonChange2(date, dateString) {
    if (date) {
      var dataTime = new Date(date._d);
      //var list = this.state.saveData;
      var inputvalue = this.state.inputvalue;
      // if(!(list instanceof Array)){
      //   return;
      // }
      var olddataTime = this.state.olddataTime;
      this.setState({
        newdataTime: dataTime
      })
      this.magicsort(inputvalue, olddataTime, dataTime, "q");
    }
    var dateStringmac = dateString.replace(/-/g, '/');
  }
  dataonChange(date, dateString) {
    if (date) {
      var dataTime = new Date(date._d);
      //var list = this.state.saveData;

      var inputvalue = this.state.inputvalue;
      // if(!(list instanceof Array)){
      //   return;
      // }
      var newdataTime = this.state.newdataTime;
      // //console.log(newdataTime);
      this.setState({
        olddataTime: dataTime
      })
      this.magicsort(inputvalue, dataTime, newdataTime, "q");
    }
  }
  disabledDate(current) {
    // can not select days before today and today
    /*
      这里取得是毫秒值 Date.now()当前时间的毫秒值
    */
    return current && current.valueOf() > Date.now();
  }
  disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  searchHandle(e) {
    var str = e.target.value;
    var olddataTime = this.state.olddataTime;
    var newdataTime = this.state.newdataTime;
    this.setState({
      inputvalue: str
    })
    this.magicsort(str, olddataTime, newdataTime, "no");
  }
  componentWillMount() {
    $.llsajax({
        // $.ajax({
        url: "statistics/learningStatistics",
        type: "post",
        success: data => {
          var ls = data.ls;
          this.onGool();
          this.setState({
            classData: data.ls
          })
          $.llsajax({
              url: "userlog/findTlog",
              type: "post",
              data: {
                classid: data.ls[0].id,
                olddataTime: "1970-01-01 12:00:00",
                newdataTime: this.ruData2(new Date()),
              },
              success: dataClass => {
                //console.log(dataClass);
                var stuArrItem = [];
                var dataobj = dataClass.obj;
                if (dataobj != null) {
                  var len = dataobj.length;
                  if (len > 0) {
                    for (var i = 0; i < len; i++) {
                      var studentNo = dataobj[i].studentNo;
                      var Sstudentid = studentNo != null ? studentNo.toString() : "--";
                      stuArrItem.push( < tr key = {
                          i
                        } >
                        <td>{dataobj[i].name!=null?dataobj[i].name:"--"}</td> < td > {
                          Sstudentid
                        } < /td> < td > {
                        dataobj[i].loginNum
                      } < /td> < td > {
                      dataobj[i].maxDate != null ? dataobj[i].maxDate.substring(0, 10) : "--"
                    } < /td> < /tr > )
                }
              }
              this.setState({
                saveData: dataobj,
                stuArr: stuArrItem,
                stuNum: len
              })
            }
          }
        })
      //    for (var i = 1; i < ls.length; i++) {
      //   $.llsajax({
      //     url: "userlog/findTlog",
      //     type: "post",
      //     data: {
      //       classid: ls[i].id,
      //       olddataTime: "1970-01-01 12:00:00",
      //       newdataTime: this.ruData2(new Date()),
      //     },
      //     success: dataClass => {
      //       this.setState({
      //         "dataObj" + i: dataClass
      //       })
      //     }
      //   })
      // }
    }
  })
}
render() {
  var data = this.state.classData;
  if (data != null) {
    var classArr = [];
    var len = data.length;
    if (len > 0) {
      data.map((item, index) => {
        classArr.push(<span key={index} className={this.state.clickIndex == index ? 'defaultClick' : ''} onClick={this.accchangeTabHandle.bind(this)} data-key={index}>{item.name}</span>)
      })
    }
  }
  let showTr = {
    display: this.state.stuArr.length == 0 ? "block" : "none"
  }
  return (
    <div className="acsStatis">
                <div className="acsStatisInner">
                    <h2>访问统计</h2>
                    <div className="thStatisTab acsthStatisTab">
                       {classArr}
                    </div>
                    <div className="thStatisList acsthStatisList">
                           <div className="accDownloadoutter">
                           <div className="accDownloadall iconfont icon-daochuchengji" onClick={this.accDownloadall.bind(this)} >导出全部</div>
                           </div>
    <div className="thStaSearch acsStaSearch">搜索学生:<input type="text" className="accchange" placeholder="按学生姓名或学号搜索" onKeyUp={this.searchHandle.bind(this)}/>
                          <div className="acsStatisSearchtime">
                          <span className="acctimespan">时间段:</span>
                          <DatePicker defaultValue={moment(this.state.olddataTime, 'YYYY/MM/DD')}
                          disabledDate={this.disabledDate}
                          className="shijiankongjianacc" onChange={this.dataonChange.bind(this)} />
                          <span className="acctimespantwo">至</span>
                          <DatePicker defaultValue={moment(this.state.newdataTime, 'YYYY/MM/DD')}
                          disabledDate={this.disabledDate} disabledTime={this.disabledDateTime}
                          className="shijiankongjianacc" onChange={this.dataonChange2.bind(this)} />
                          <div className="accqueding">确定</div>
                          </div>
                        </div>
                         <div className="thStaMany accthStaMany">共<i>{this.state.stuNum}</i>条信息</div>
                        
                         <table className="accthStaTable thStaTable">
                          <tr>
                            <td width="280px">姓名</td>
                            <td width="400px">学号</td>
                            <td width="310px">访问次数</td>
                            <td width="169px">最后登录时间</td>
                          </tr>
                          <tbody className="accthbody">
                             {this.state.stuArr}
                          </tbody>
                         </table>
                         <div style={showTr} className="noAnswer">
                            没有查询结果
                         </div>
                         
                    </div>
                </div>
            </div>
  );
}
}