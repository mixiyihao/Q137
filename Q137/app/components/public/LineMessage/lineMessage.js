import React from 'react';
import { Link, hashHistory, } from 'react-router';
import $ from 'jquery';
import './styleLine.css';
export default class LineMessage extends React.Component {
  constructor() {
    super()
    this.state = {
      toggleShowItem: false,
      messageUrl: '',
      message: '',
      id: [],
      noreadmessageInfo:[],
      // classflag: false,
    }
  }
  componentWillMount() {
    var idLen = JSON.parse(sessionStorage.getItem("leftNavBar")).major.courseList.length;
    for (var i = 0; i < idLen; i++) {
      if (JSON.parse(sessionStorage.getItem("leftNavBar")).major.courseList[i].lessons.length != 0) {
        var idItems = JSON.parse(sessionStorage.getItem("leftNavBar")).major.courseList[i].lessons[0].id;
        break;
      }
    }
    // if(this.props.noreadmessageInfo!=null){
    // this.setState({
    //   noreadmessageInfo:this.props.noreadmessageInfo
    // })
    //   var countmtype = 0;
    //   //     // 有消息推送
    //   let data=this.state.noreadmessageInfo;
    //       if (data.mess != null) {
    //         if (data.mess.mtype == '0') {
    //           $.llsajax({
    //             url: 'Luser/getLastLesson',
    //             type: "POST",
    //             success: data => {
    //               if (data.lastlesson == null) {
    //                 // 没有课程则不显示
    //                 this.setState({
    //                   toggleShowItem: false
    //                 })
    //               } else {
    //                 // 否则显示课程内容
    //                 var lessionArr = [];
    //                 var nameOfClass = '';
    //                 var courseList = JSON.parse(sessionStorage.getItem("leftNavBar")).major.courseList;
    //                 for (var i = 0; i < courseList.length; i++) {
    //                   if (courseList[i].lessons != []) {
    //                     courseList[i].lessons.map((value, item) => {
    //                       lessionArr.push(value)
    //                     })
    //                   }
    //                 }
    //                 for (var j = 0; j < lessionArr.length; j++) {
    //                   if (lessionArr[j].id == data.lastlesson) {
    //                     nameOfClass = lessionArr[j].name;
    //                   }
    //                 }
    //                 this.setState({
    //                   toggleShowItem: true,
    //                   message: "您上次学习至" + nameOfClass + "课程",
    //                   messageUrl: "/classhours?id=" + Base64.encodeURI(data.lastlesson),
    //                   id: data.lastlesson,
    //                   // classflag:true,
    //                 })
    //               }
    //             }
    //           })
    //         }
    //         // 有强制消息
    //         if (data.mess.mtype == '1') {
    //           sessionStorage.setItem('constraintMessage', true)
  
    //           /* constraint message control 
    //            * if there are so many constraint message,when you click isread
    //            * first message will be marked 'read'
    //            * next message will be show in line-message components
    //            */
    //           sessionStorage.setItem('classItem', false)
  
  
    //           this.setState({
    //             toggleShowItem: true,
    //             messageUrl: '/examinationMain',
    //             message: data.mess.message,
    //             id: data.mess.id
    //           })
    //           // sessionStorage.setItem("classhoursTabvalue",5);
    //         }
    //         // mtype == null
    //         if (data.mess.mtype == null) {
    //           // //console.log('mtype=null')
    //           $.llsajax({
    //             url: 'Luser/getLastLesson',
    //             type: "POST",
    //             success: data => {
    //               if (data.lastlesson == null) {
    //                 // 没有课程则不显示
    //                 this.setState({
    //                   toggleShowItem: false
    //                 })
    //               } else {
    //                 // 否则显示课程内容
    //                 var lessionArr = [];
    //                 var nameOfClass = '';
    //                 var courseList = JSON.parse(sessionStorage.getItem("leftNavBar")).major.courseList;
    //                 for (var i = 0; i < courseList.length; i++) {
    //                   if (courseList[i].lessons != []) {
    //                     courseList[i].lessons.map((value, item) => {
    //                       lessionArr.push(value)
    //                     })
    //                   }
    //                 }
    //                 for (var j = 0; j < lessionArr.length; j++) {
    //                   if (lessionArr[j].id == data.lastlesson) {
    //                     nameOfClass = lessionArr[j].name;
    //                   }
    //                 }
    //                 this.setState({
    //                   toggleShowItem: true,
    //                   message: "您上次学习至" + nameOfClass + "课程",
    //                   messageUrl: "/classhours?id=" + Base64.encodeURI(data.lastlesson),
    //                   id: data.lastlesson,
    //                   // classflag:true,
    //                 })
    //               }
    //             }
    //           })
    //         }
    //       } else {
    //         // 没有消息推送
    //         // //console.log('mess=null')
    //         sessionStorage.setItem('constraintMessage', false)
    //         $.llsajax({
    //           url: 'Luser/getLastLesson',
    //           type: "POST",
    //           success: data => {
    //             if (data.lastlesson == null) {
    //               // 没有课程则不显示
    //               this.setState({
    //                 toggleShowItem: false
    //               })
    //             } else {
    //               // 否则显示课程内容
    //               var lessionArr = [];
    //               var nameOfClass = '';
    //               var courseList = JSON.parse(sessionStorage.getItem("leftNavBar")).major.courseList;
    //               for (var i = 0; i < courseList.length; i++) {
    //                 if (courseList[i].lessons != []) {
    //                   courseList[i].lessons.map((value, item) => {
    //                     lessionArr.push(value)
    //                   })
    //                 }
    //               }
    //               for (var j = 0; j < lessionArr.length; j++) {
    //                 if (lessionArr[j].id == data.lastlesson) {
    //                   nameOfClass = lessionArr[j].name;
    //                 }
    //               }
    //               this.setState({
    //                 toggleShowItem: true,
    //                 message: "您上次学习至" + nameOfClass + "课程",
    //                 messageUrl: "/classhours?id=" + Base64.encodeURI(data.lastlesson),
    //                 id: data.lastlesson,
    //               })
    //             }
    //           }
    //         })
    //       }
    // }
    $.llsajax({
      url: 'message/findnoreadmessagecount',
      type: 'POST',
      async: false,
      success: data => {
        
        this.props.findnoreadmessagecountAjaxInfo(data);
        var countmtype = 0;

        // 有消息推送
        if (data.mess != null) {
          if (data.mess.mtype == '0') {
            $.llsajax({
              url: 'Luser/getLastLesson',
              type: "POST",
              success: data => {
                if (data.lastlesson == null) {
                  // 没有课程则不显示
                  this.setState({
                    toggleShowItem: false
                  })
                } else {
                  // 否则显示课程内容
                  var lessionArr = [];
                  var nameOfClass = '';
                  var courseList = JSON.parse(sessionStorage.getItem("leftNavBar")).major.courseList;
                  for (var i = 0; i < courseList.length; i++) {
                    if (courseList[i].lessons != []) {
                      courseList[i].lessons.map((value, item) => {
                        lessionArr.push(value)
                      })
                    }
                  }
                  for (var j = 0; j < lessionArr.length; j++) {
                    if (lessionArr[j].id == data.lastlesson) {
                      nameOfClass = lessionArr[j].name;
                    }
                  }
                  this.setState({
                    toggleShowItem: true,
                    message: "您上次学习至" + nameOfClass + "课程",
                    messageUrl: "/classhours?id=" + Base64.encodeURI(data.lastlesson),
                    id: data.lastlesson,
                    // classflag:true,
                  })
                }
              }
            })
          }
          // 有强制消息
          if (data.mess.mtype == '1') {
            sessionStorage.setItem('constraintMessage', true)

            /* constraint message control 
             * if there are so many constraint message,when you click isread
             * first message will be marked 'read'
             * next message will be show in line-message components
             */
            sessionStorage.setItem('classItem', false)


            this.setState({
              toggleShowItem: true,
              messageUrl: data.mess.url,
              message: data.mess.message,
              id: data.mess.id
            })
            // sessionStorage.setItem("classhoursTabvalue",5);
          }
          // mtype == null
          if (data.mess.mtype == null) {
            // //console.log('mtype=null')
            $.llsajax({
              url: 'Luser/getLastLesson',
              type: "POST",
              success: data => {
                if (data.lastlesson == null) {
                  // 没有课程则不显示
                  this.setState({
                    toggleShowItem: false
                  })
                } else {
                  // 否则显示课程内容
                  var lessionArr = [];
                  var nameOfClass = '';
                  var courseList = JSON.parse(sessionStorage.getItem("leftNavBar")).major.courseList;
                  for (var i = 0; i < courseList.length; i++) {
                    if (courseList[i].lessons != []) {
                      courseList[i].lessons.map((value, item) => {
                        lessionArr.push(value)
                      })
                    }
                  }
                  for (var j = 0; j < lessionArr.length; j++) {
                    if (lessionArr[j].id == data.lastlesson) {
                      nameOfClass = lessionArr[j].name;
                    }
                  }
                  this.setState({
                    toggleShowItem: true,
                    message: "您上次学习至" + nameOfClass + "课程",
                    messageUrl: "/classhours?id=" + Base64.encodeURI(data.lastlesson),
                    id: data.lastlesson,
                    // classflag:true,
                  })
                }
              }
            })
          }
        } else {
          // 没有消息推送
          // //console.log('mess=null')
          sessionStorage.setItem('constraintMessage', false)
          $.llsajax({
            url: 'Luser/getLastLesson',
            type: "POST",
            success: data => {
              if (data.lastlesson == null) {
                // 没有课程则不显示
                this.setState({
                  toggleShowItem: false
                })
              } else {
                // 否则显示课程内容
                var lessionArr = [];
                var nameOfClass = '';
                var courseList = JSON.parse(sessionStorage.getItem("leftNavBar")).major.courseList;
                for (var i = 0; i < courseList.length; i++) {
                  if (courseList[i].lessons != []) {
                    courseList[i].lessons.map((value, item) => {
                      lessionArr.push(value)
                    })
                  }
                }
                for (var j = 0; j < lessionArr.length; j++) {
                  if (lessionArr[j].id == data.lastlesson) {
                    nameOfClass = lessionArr[j].name;
                  }
                }
                this.setState({
                  toggleShowItem: true,
                  message: "您上次学习至" + nameOfClass + "课程",
                  messageUrl: "/classhours?id=" + Base64.encodeURI(data.lastlesson),
                  id: data.lastlesson,
                })
              }
            }
          })
        }
      }
    })

  }

  handleClick(id) {
    $('#spro-lineMessage').css('display', 'none')
    sessionStorage.setItem("classItem", true)
    // true linemessage 不显示
    if (this.state.id != '') {
      $.llsajax({
        url: 'message/readMessage/' + id,
        type: "POST",
        success: data => {
          this.props.onLineMessage();
        }
      })
    }
    this.props.onRefestHead(id);
    // if (sessionStorage.getItem('constraintMessage') != 'true') {
    // if (sessionStorage.getItem('constraintMessage') != 'true') {


    // }
  }
  // line-message close button
  handlerLab(id) {
    // true linemessage 不显示
    if (this.state.id != '') {
      $.llsajax({
        url: 'message/readMessage/' + id,
        type: "POST",
        success: data => {
          // this.props.onLineMessage();
        }
      })
    }
    // this.props.onRefestHead();

    if (sessionStorage.getItem('constraintMessage') != 'true') {

      sessionStorage.setItem("classItem", true)
    }

    $('#spro-lineMessage').css('display', 'none')

  }
  render() {
    var styles = {
      display: this.state.toggleShowItem == true ? "block" : "none",
      display: sessionStorage.getItem('classItem') == 'true' ? "none" : "block",
      top: "158px"
    }
    return (
      <div className="lineMessage line-ease" style={styles} id="spro-lineMessage">
        <div className="lineMessageInnerdiv" >
          <i className="iconfont icon-gonggao"></i>
          <span className="lineMessagespan">{this.state.message}</span>
          <Link to={this.state.messageUrl} onClick={this.handleClick.bind(this, this.state.id)}>立即跳转</Link>
          <i className="spro_lineX-icon iconfont icon-guanbi" onClick={this.handlerLab.bind(this, this.state.id)}></i>
        </div>
      </div>
    )
  }
}