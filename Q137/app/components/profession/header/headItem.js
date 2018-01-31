import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import {
    Link,
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect,
    browserHistory
} from 'react-router';

export default class HeadItem extends React.Component {
    constructor() {
        super();
    }

    handleurlTab() {
        const markUrl = sessionStorage.getItem('userJudge');
        if (markUrl == "T") {

            var sessionData = JSON.parse(sessionStorage.getItem("teacherComp"));
            var idLen = sessionData.majors.length;
            for (var i = 0; i < idLen; i++) {
                // 筛选courseList != []
                if (sessionData.majors[i].courseList.length != 0) {
                    for (var j = 0; j < sessionData.majors[i].courseList.length; j++) {
                        // 筛选lessions != []
                        if (sessionData.majors[i].courseList[j].lessons.length != 0) {
                            var pathId = sessionData.majors[i].courseList[j].lessons[0].id;
                            return pathId;
                        }
                    }
                }
            }
        } else {
            let professionData = sessionStorage.getItem("leftNavBar") ? JSON.parse(sessionStorage.getItem("leftNavBar")) : [];
            let lessonID = []
            if (sessionStorage.getItem("leftNavBar")) {
                professionData.major.courseList.map((courseValue) => {
                    courseValue.lessons.map((lessonsValue) => {
                        lessonID.push(lessonsValue.id)
                    });
                });
            }
            var sn = lessonID ? lessonID.sort(this.sortNumber)[0] : sessionStorage.getItem("lessonID");
            sessionStorage.setItem("lessonID", sn);
            return sn;
        }
    }

    handlerClick(id, url) {
        console.log(url);
        $("#import").css("display", "none");
        const locationhash = "#" + url;
        const locationhashs = window.location.hash;
        if (url.indexOf("value") > 0) {
            hashHistory.push({
                pathname: url.split("?")[0],
                query: {
                    id: url.split("?id=")[1].split("&value")[0],
                    value: url.split("value=")[1]
                }
            })
        } else {
            if (url.indexOf("/examinationMain") != -1) {
                hashHistory.push({
                    pathname: url.split("?")[0],
                    type: url.split("?type=")[1]
                })
            } else {
                hashHistory.push(url)
            }
        }

        let userID = this.props.id;
        $.llsajax({
            url: 'message/messagesToRead?messids=' + userID,
            type: 'POST',
            success: data => {
                $.llsajax({
                    url: 'message/readMessage/' + userID,
                    type: 'POST',
                    success: data => {
                        this.props.xiaozhong();
                        this.props.onClickMessage();
                        if (locationhash == locationhashs) {
                            this.props.headItem()
                        }
                        this.props.top4handler();
                    }
                })
            }
        })
    }

    render() {
        var url = "";
        if (this.props.url.indexOf("value=") > 0) {
            var sn = this.handleurlTab();
            const markUrl = sessionStorage.getItem('userJudge');
            if (markUrl == "T") {
                url = "/teacherLesson?id=" + sn + "&value=" + this.props.url.split("value=")[1];
            } else {
                url = "/classhours?id=" + sn + "&value=" + this.props.url.split("value=")[1];
            }
        } else if (this.props.url.indexOf("informat?SproState=3p") != -1) {
            if (sessionStorage.getItem('userJudge') != "S") {
                url = "tinformations?SproState=3u"
            } else {
                url = "stuEvaluate?theBugofking"
            }
        }
        else {
            url = this.props.url;
        }
        let headItemdisplaystyle = {
            display: !this.props.styleText ? "block" : "none"
        }
        var UserMess = this.props.message.length > 15 ? this.props.message.substring(0, 15) + "..." : this.props.message;
        return (
            <li name={this.props.id} className="listyle" id="onlyhead" style={headItemdisplaystyle}>
                <span>{UserMess}</span>
                <a onClick={this.handlerClick.bind(this, this.props.id, url)}>立即跳转</a>
            </li>
        )
    }
}
