'use strict';

import React from 'react';
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
import $ from 'jquery'
import BombBox from '../../../../assistantSup/public/bombBox/bombBox.js'

export default class RbdNavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            datainfor: [],
            newMessFlag: false,
            msgNumCount: '',
            numCountShow: false,
            fourMsgArr: [],
            dataStyle: [],
            jugeFlag: false,//是否是班主任端false不是true是
            isHidden: true,
            bombBoxMsg: '是否退出登录',
            dataArr: [],//课程数据
        }
    }
    isRead(e) {
        const _this = this
        // console.log(_this);

        var reqId = e.target.getAttribute('data-id')
        $.llsajax({
            url: "message/messagesToRead",
            type: "post",
            async: false,
            data: {
                messids: reqId
            },
            success: data => {
                $.llsajax({
                    url: "message/findnoreadmessagecount",
                    type: "post",
                    async: false,
                    success: data => {
                        if (data.num != 0 || data.num != null) {
                            if (data.num > 9) {
                                _this.setState({
                                    numCountShow: true,
                                    msgNumCount: '9+',
                                    dataStyle: true
                                })
                            } else if (data.num > 0 && data.num <= 9) {
                                _this.setState({
                                    numCountShow: true,
                                    msgNumCount: data.num,
                                    dataStyle: false
                                })
                            }
                        }
                        if (data.num == 0) {
                            _this.setState({
                                numCountShow: false,
                                msgNumCount: data.num,
                                dataStyle: false
                            })
                        }

                    }
                })
                // four message
                $.llsajax({
                    url: "message/findnoreadliststop4",
                    type: "post",
                    async: false,
                    success: data => {
                        var sessionData = JSON.parse(sessionStorage.getItem("teacherComp"));
                        if (sessionData != null) {

                            var idLen = sessionData.majors.length;
                            if (idLen) {

                                // //console.log(idLen)
                                for (var i = 0; i < idLen; i++) {
                                    // 筛选courseList != []
                                    if (sessionData.majors[i].courseList.length != 0) {
                                        for (var j = 0; j < sessionData.majors[i].courseList.length; j++) {
                                            // 筛选lessions != []
                                            if (sessionData.majors[i].courseList[j].lessons.length != 0) {
                                                // //console.log(sessionData.majors[i].courseList[j].lessons[0].id);
                                                var pathId = sessionData.majors[i].courseList[j].lessons[0].id
                                                break;
                                            }
                                        }
                                        break;
                                    }

                                }
                            }
                        }
                        // var pathId = JSON.parse(sessionStorage.getItem('teacherComp')).majors[0].id
                        var pathUrl = '';
                        if (data.list == [] || data.list == undefined) { } else {
                            if (data.list != '' && data.list != undefined) {
                                var value = data.list[0].url.replace('/classhours?id=0', '')

                                if (data.list[0].url == '/sugges') {
                                    pathUrl = '/sugges'
                                } else {
                                    pathUrl = '/teacherLesson?id=' + pathId + value
                                }
                            }
                        }
                        const markUrl = sessionStorage.getItem('userJudge');
                        var teacherUrl = []
                        // console.log(data.list);
                        data.list.map((value, item) => {
                            if (markUrl == 'T') {
                                if (value.url.indexOf('classhour') > -1) {
                                    teacherUrl.push(<p key={item + 'msg'}><i>{value.message}</i><Link to={pathUrl.indexOf("/informat?SproState=3p") != -1 ? "/tinformations?SproState=3ugnik" : pathUrl} onClick={this.isRead.bind(this)} data-id={value.id}>立即跳转</Link></p>)
                                } else {

                                    // //console.log(value.url.replace('classhour','teacherLesson'))
                                    teacherUrl.push(<p key={item + 'msg'}><i>{value.message}</i><Link to={value.url.indexOf("/informat?SproState=3p") != -1 ? "/tinformations?SproState=3ugnik" : value.url} onClick={this.isRead.bind(this)} data-id={value.id}>立即跳转</Link></p>)
                                }
                            }
                        })

                        _this.setState({
                            fourMsgArr: teacherUrl
                        })
                    }
                })
            }
        })

    }
    componentWillMount() {
        if (!!sessionStorage.getItem("teacherComp")) {
            var datas = JSON.parse(sessionStorage.getItem("teacherComp"));
            this.setState({
                dataArr: datas,
            })
        }
        $.llsajax({
            url: "Luser/meansLuser",
            type: "post",
            success: datainfor => {
                sessionStorage.setItem('termNow', datainfor.user.term)
                sessionStorage.setItem('cUserNm', datainfor.user.name)
                this.setState({
                    datainfor: datainfor.user.name
                })
            }
        })

        // message num
        $.llsajax({
            url: "message/findnoreadmessagecount",
            type: "post",
            success: data => {
                if (data.num != 0 || data.num != null) {
                    if (data.num > 9) {
                        this.setState({
                            numCountShow: true,
                            msgNumCount: '9+',
                            dataStyle: true
                        })
                    } else if (data.num > 0 && data.num <= 9) {
                        this.setState({
                            numCountShow: true,
                            msgNumCount: data.num,
                            dataStyle: false
                        })
                    }
                } else {
                    if (data.num == 0) {
                        this.setState({
                            numCountShow: false,
                            dataStyle: false
                        })
                    }
                }
            }
        })
        // four message
        $.llsajax({
            url: "message/findnoreadliststop4",
            type: "post",
            success: data => {
                if (sessionStorage.getItem("teacherComp") != '') {
                    var sessionData = JSON.parse(sessionStorage.getItem("teacherComp"));
                    if (sessionData != null) {
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
                    }
                }
                // var pathId = JSON.parse(sessionStorage.getItem('teacherComp')).majors[0].id
                var pathUrl = '';
                // if (data.list == [] || data.list == undefined) {

                // } else {
                //     if (data.list != '' && data.list != undefined) {
                        
                //         var value = data.list[0].url.replace('/classhours?id=0', '')
                //         if (data.list[0].url == '/sugges') {
                //             // console.log(data.list[0].url)
                //             pathUrl = '/sugges'
                //         } else {
                //             pathUrl = '/teacherLesson?id=' + pathId + value
                //         }
                //     }
                // }
                const markUrl = sessionStorage.getItem('userJudge');
                var teacherUrl = []
                data.list.map((value, item) => {
                    teacherUrl.push(<p key={item + 'msg'}><i>{value.message}</i><Link to={value.url} onClick={this.isRead.bind(this)} data-id={value.id}>立即跳转</Link></p>)
                    // if (markUrl == 'MT') {

                    //     if (value.url.indexOf('teaSearchMain') > -1) {
                    //         teacherUrl.push(<p key={item + 'msg'}><i>{value.message}</i><Link to={pathUrl.indexOf("/informat?SproState=3p") != -1 ? "/tinformations?SproState=3ugnik" : pathUrl} onClick={this.isRead.bind(this)} data-id={value.id}>立即跳转</Link></p>)
                    //     } else {
                    //         // //console.log(value.url.replace('classhour','teacherLesson'))
                    //         teacherUrl.push(<p key={item + 'msg'}><i>{value.message}</i><Link to={value.url.indexOf("/informat?SproState=3p") != -1 ? "/tinformations?SproState=3ugnik" : value.url} onClick={this.isRead.bind(this)} data-id={value.id}>立即跳转</Link></p>)
                    //     }
                    // }
                })
                this.setState({
                    fourMsgArr: teacherUrl
                })
            }
        })


    }



    // 这是退出登录的js
    exteds() {
        this.setState({
            isHidden: false,
        })
    }
    enterClick() {
        $.llsajax({
            url: "Luser/breakLogin",
            type: "post",
            success: extendName => {
                if (extendName.result == 200) {

                    // 生产
                    window.location.href = './index.html'
                    // 测试
                    //  window.location.href='../index.html'
                    // sessionStorage.setItem("teacherComp", "");
                    // sessionStorage.removeItem("_WORK_S_FLAG")
                }
            }
        })
    }
    hideClick() {
        this.setState({
            isHidden: true,
        })
    }
    onLinkToMessage() {
        hashHistory.push({
            pathname: '/assmessage',
        })
    }
    render() {
        // console.log(this.state.fourMsgArr)
        var styleDot = {
            display: this.state.newMessFlag == true ? "block" : "none"
        }
        var styles = {
            msgDot: {
                display: this.state.numCountShow == true ? "block" : "none"
            },
            msgBox: {
                display: this.state.numCountShow == true ? "none" : "block"
            }
        }
        let dataStyle = {
            display: this.state.numCountShow == true ? "block" : "none"
        }
        return (
            <div className="rbd-header">
                <div className="rbdInner">
                    <div className="jumpToIndex">
                        <Link to={"/"}><i className={sessionStorage.getItem('userJudge') == 'MM' ? "majorMaster" : "iconfont"}></i></Link>
                    </div>
                    <div className="rbdContent">
                        <span className="initSpan InitEle"></span>
                        <span className={this.props.ActiveBuff == 2 ? "R-showBox R-active" : "R-showBox"}>专业</span>
                        <span className={this.props.ActiveBuff == 3 ? "R-showBox R-active" : "R-showBox"}>课程管理</span>
                        <span className={this.props.ActiveBuff == 4 ? "R-showBox R-active" : "R-showBox"}>考试管理</span>
                        <span className={this.props.ActiveBuff == 5 ? "R-active Initstatis" : " Initstatis"}><Link to="/">学员成绩</Link></span>
                        {/*<span className={this.props.ActiveBuff == 6 ? "R-showBox R-active" : "R-showBox"}>助教管理</span>*/}
                        <span className={this.props.ActiveBuff == 7 ? "R-active Initevaluate" : "Initevaluate"}><Link to="/assResourceCenter">资源中心</Link></span>
                    </div>

                    <div className="rbdmsgBox">
                        <span onClick={this.onLinkToMessage.bind(this)} className="iconfont icon-xiaoxizhongxin- jungleMsg">
                            <i className="msgNumCount" style={dataStyle}>
                                <i>{this.state.msgNumCount}</i>
                            </i>
                        </span>
                        <div className="showMsgbox">
                            <i className="rbdtriangle"><i></i></i>
                            {this.state.fourMsgArr}
                            <div className="noMessageToread" style={styles.msgBox}>
                                <i></i>
                                <span>当前无新消息</span>
                            </div>
                            <Link to="/assmessage" className="checkAllBtn">查看全部</Link>
                        </div>
                    </div>
                    <div className="rbdcontrol">
                        <Link to="/assinformations" className="rbdUser">
                            {/*<i className="Rd-dot iconfont icon-new" style={styleDot}></i>*/}
                            <span>{this.state.datainfor}</span>
                        </Link>
                        <Link to='/teaSearchMain' className="onLineQuestion commonButton"><i className="iconfont icon-zaixianwenda-"></i> 在线提问</Link>
                        <span onClick={this.exteds.bind(this)} className="rbdUserExit iconfont icon-tuichu1"></span>
                    </div>
                    <BombBox
                        hideClick={this.hideClick.bind(this)}
                        enterClick={this.enterClick.bind(this)}
                        isHidden={this.state.isHidden}
                        bombBoxMsg={this.state.bombBoxMsg}
                    />
                </div>
            </div>
        )
    }
    componentDidMount() {

        $('.jumpToIndex').on('click', function () {
            sessionStorage.setItem('displayFlag', 2)
        })
        $('.rbdUser').on('mouseenter', function () {
            $('.rbdUserBox').css("display", "block")
        })
        $('.rbdcontrol').on('mouseleave', function () {
            $('.rbdUserBox').css("display", "none")
        })
        $('.rbdContent span:not(:first),.Initstatis').on('mouseenter', function () {
            $(this).addClass('ckFlags').siblings().removeClass('ckFlags')
        })
        $('.jungleMsg').on('mouseenter', function () {
            $('.showMsgbox').addClass('showItemmsg')
        })
        $('.showMsgbox').on('mouseleave', function () {
            $('.showMsgbox').removeClass('showItemmsg')
        })
        $('.rbdmsgBox').on('mouseleave', function () {
            $('.showMsgbox').removeClass('showItemmsg')
        })
    }
    componentDidUpdata() {

        $('.showMsgbox').on('mouseleave', function () {
            $('.showMsgbox').removeClass('showItemmsg')
        })
        $('.rbdmsgBox').on('mouseleave', function () {
            $('.showMsgbox').removeClass('showItemmsg')
        })

    }
}