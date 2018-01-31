/**
 * Created by YikaJ on 15/6/17.
 */
'use strict';
import React from 'react';
import $ from 'jquery';
import {
    Link
} from 'react-router';
export default class mainItem extends React.Component {
    constructor() {
        super();
        this.state = {
            mess: [],
            date: []
        }
    }
    componentDidMount() {
        Date.prototype.pattern = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
                "H+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            var week = {
                "0": "/u65e5",
                "1": "/u4e00",
                "2": "/u4e8c",
                "3": "/u4e09",
                "4": "/u56db",
                "5": "/u4e94",
                "6": "/u516d"
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            if (/(E+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }
        let date = this.props.c_date;
        let Dates = new Date(date);
        let DATEs = Dates.pattern("yyyy-MM-dd HH:mm:ss")
        this.setState({
            date: DATEs
        })
    }
    handlerChange() {
        let isDone = !this.props.isDone;
        this.props.changeTodoState(this.props.index, isDone);
    }
    handleClick(id) {

        $.llsajax({
            url: "message/readMessage/" + id,
            type: "POST",
            success: data => { }
        })
    }
    ok() {
        // var pathId = JSON.parse(sessionStorage.getItem('teacherComp')).majors[0].id
        var sessionData = JSON.parse(sessionStorage.getItem("teacherComp"));
        var idLen = sessionData.majors.length;
        for (var i = 0; i < idLen; i++) {
            // 筛选courseList != []
            if (sessionData.majors[i].courseList.length != 0) {
                for (var j = 0; j < sessionData.majors[i].courseList.length; j++) {
                    // 筛选lessions != []
                    if (sessionData.majors[i].courseList[j].lessons.length != 0) {
                        var pathId = sessionData.majors[i].courseList[j].lessons[0].id
                        break;
                    }
                }
                break;
            }

        }
        var pathUrl = '';
        if (this.props.list == [] || this.props.list == undefined) {
        } else {
            if (this.props.list != '' && this.props.list != undefined) {
                if (this.props.list[0].url == '/sugges') {
                    pathUrl = '/sugges'
                } else {
                    pathUrl = 'teacherLesson?id=' + Base64.encodeURI(pathId)
                }
            }
        }
        const markUrl = sessionStorage.getItem('userJudge');
        var teacherUrl = [];
        this.props.list.map((value, item) => {
            if (markUrl == 'T') {
                if (value.url.indexOf('classhour') > -1) {
                    // teacherUrl.push(value.url.replace('classhour','teacherLesson'))
                    teacherUrl.push(<p key={item + 'msg'}><i>{value.message}</i><Link to={pathUrl} onClick={this.isRead} data-id={value.id}>立即跳转</Link></p>)
                } else {
                    teacherUrl.push(<p key={item + 'msg'}><i>{value.message}</i><Link to={value.url} onClick={this.isRead} data-id={value.id}>立即跳转</Link></p>)
                }
            }
        })
    }
    componentWillMount() {
        const markUrl = sessionStorage.getItem('userJudge');
        if (markUrl == "T") {
            // var pathId = JSON.parse(sessionStorage.getItem('teacherComp')).majors[0].id;
            var sessionData = JSON.parse(sessionStorage.getItem("teacherComp"));
            var idLen = sessionData.majors.length;
            for (var i = 0; i < idLen; i++) {
                // 筛选courseList != []
                if (sessionData.majors[i].courseList.length != 0) {
                    for (var j = 0; j < sessionData.majors[i].courseList.length; j++) {
                        // 筛选lessions != []
                        if (sessionData.majors[i].courseList[j].lessons.length != 0) {
                            var pathId = sessionData.majors[i].courseList[j].lessons[0].id
                            break;
                        }
                    }
                    break;
                }

            }
            if (this.props.url.indexOf("value=") > 0) {
                let valueT = this.props.url.split("value=")[1];
                var sn = this.props.handleurlTab();
                var a = "/teacherLesson?id=" + Base64.encodeURI(pathId) + "&value=" + valueT;
                this.setState({
                    url: a
                })
            } else if (this.props.url.indexOf("teaSearchMain") > 0) {
                this.setState({
                    url: this.props.url + "?AM=Q",
                })
            } else if (this.props.url.indexOf("informat?SproState=3p") != -1) {
                this.setState({
                    url: "tinformations?SproState=3u",
                })
            } else {
                this.setState({
                    url: this.props.url,
                })
            }
        } else if (markUrl == "TM") {
            // var pathId = JSON.parse(sessionStorage.getItem('teacherComp')).majors[0].id;
            var sessionData = JSON.parse(sessionStorage.getItem("teacherComp"));
            var idLen = sessionData.majors.length;
            for (var i = 0; i < idLen; i++) {
                // 筛选courseList != []
                if (sessionData.majors[i].courseList.length != 0) {
                    for (var j = 0; j < sessionData.majors[i].courseList.length; j++) {
                        // 筛选lessions != []
                        if (sessionData.majors[i].courseList[j].lessons.length != 0) {
                            var pathId = sessionData.majors[i].courseList[j].lessons[0].id
                            break;
                        }
                    }
                    break;
                }

            }
            if (this.props.url.indexOf("informat?SproState=3p") != -1) {
                this.setState({
                    url: "assinformations?SproState=3u",
                })
            } else {
                this.setState({
                    url: this.props.url,
                })
            }
        } else if (markUrl == "S") {
            if (this.props.url.indexOf("value=") > 0) {
                var sn = this.props.handleurlTab();
                var a = "/classhours?id=" + Base64.encodeURI(sn) + "&value=" + this.props.url.split("value=")[1];
                this.setState({
                    url: a
                })
            } else if (this.props.url.indexOf("teaSearchMain") > 0) {
                this.setState({
                    url: '/searchMain' + "?AM=Q",
                })
            } else if (this.props.url.indexOf("informat?SproState=3p") != -1) {
                this.setState({
                    url: "stuEvaluate?realking",
                })
            } else {
                this.setState({
                    url: this.props.url,
                })
            }
        } else {
            if (this.props.url.indexOf("value=") > 0) {
                var sn = this.props.handleurlTab();

                var a = "/classhours?id=" + Base64.encodeURI(sn) + "&value=" + this.props.url.split("value=")[1];
                this.setState({
                    url: a
                })
            } else if (this.props.url.indexOf("searchMain") > 0) {
                this.setState({
                    url: this.props.url + "?AM=Q",
                })
            } else if (this.props.url.indexOf("informat?SproState=3p") != -1) {
                this.setState({
                    url: "stuEvaluate?realking",
                })
            }
            else {

                this.setState({
                    url: this.props.url,
                })
            }
        }
    }
    render() {
        let styleinput = {
            display: this.props.styleinput ? "none" : "inline-block"
        }
        return (
            <li className="mainItemOne">
                <input id={"mainItem" + this.props.index} type="checkbox" value="" checked={this.props.isDone} onChange={this.handlerChange.bind(this)} style={styleinput} />
                <label htmlFor={"mainItem" + this.props.index}></label>
                {/*<i onClick={this.handleClick.bind(this, this.props.id)}>{this.props.message}</i><span>{this.state.date}</span>*/}
                <Link to={this.state.url} onClick={this.handleClick.bind(this, this.props.id)}>{this.props.message}
                </Link>
                <i><Link to={this.state.url} onClick={this.handleClick.bind(this, this.props.id)}>立即跳转</Link></i>
                <span>{this.state.date}</span>
            </li>
        )
    }
}
