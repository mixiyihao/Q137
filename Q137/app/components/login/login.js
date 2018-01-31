/**
 * Created by heshuai on 2017/1/11.
 */

import React from 'react';
import $ from 'jquery';
import { Link, Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import './login.css';
import url from '../../controller/url.js';

export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logins: 12,
            viewNum: [],
            check: true,
            disabledBtn: false,//不禁用
        }
    }

    componentWillMount() {
        if (localStorage.getItem('isIn') != 'false') {
            $.llsajax({
                url: "Luser/meansLuser",
                type: "POST",
                async: false,
                success: data => {
                    sessionStorage.setItem('termNow', data.user.term);
                    if (data.user.type == 'T') {
                        hashHistory.push({
                            pathname: '/teacherCourse',
                            query: {
                                id: sessionStorage.getItem("tCid"),
                                les: sessionStorage.getItem("tCles"),
                            }
                        });
                        sessionStorage.setItem("userJudge", "T");
                    } else if (data.user.type == 'S') {
                        hashHistory.push('/profession');
                        sessionStorage.setItem("userJudge", "S");
                    } else if (data.user.type == 'C') {
                        hashHistory.push('/masStudentManagement')
                        sessionStorage.setItem("userJudge", "C");
                    } else if (data.user.type == "TM") {
                        sessionStorage.setItem("userJudge", "TM");
                        sessionStorage.setItem("displayFlag", "5");
                    } else if (data.user.type == "CM") {
                        sessionStorage.setItem("userJudge", "CM");
                    }
                },
                error: e => {
                }
            })
        }
    }

    componentDidMount() {
    }

    btndisable(time) { //这是设置定时器的函数
        $("#h-entry").attr("disabled", true);
        var timer = setTimeout(function () {
            $("#h-entry").attr("disabled", false);
        }, time);
    }

    getMajorID() {
        $.llsajax({
            url: "major/findMajor",
            type: "POST",
            async: false,
            success: data => {
                sessionStorage.setItem("viewNum", data.major[0].id);
                this.setState({
                    viewNum: data.major[0].id
                });
                sessionStorage.setItem("teacherComp", JSON.stringify(data));
                hashHistory.push("/teacherProfession?id=" + Base64.encodeURI(data.major[0].id));
            }
        })
    }

    loginto() { //这是登录发送ajax的函数
        sessionStorage.setItem("displayFlag", "3");
        $.llsajax({
            url: 'Luser/login',
            data: {
                loginname: $("#loginname").val(),
                password: $("#password").val(),
                code: $(".h-yanz").val()
            },
            async: false,
            type: "POST",
            success: data => {
                if (data.msg != 1) {
                    this.setState({
                        disabledBtn: false,
                    })
                }
                var loginnames = $("#loginname").val();
                if (data.msg == 1) {
                    localStorage.setItem("loginname", loginnames);
                    localStorage.setItem('isIn', true);
                    this.jurisdictionLink(data);
                    localStorage.setItem("msg", data.msg);

                } else if (data.msg == 2) {
                    $(".h-point>span").removeClass("h-clear");
                    $(".h-point .h-prompt").html(" 用户名密码错误");
                    this.btndisable(1000);
                    if (data.msg == 3 || data.num >= 3) {
                        $("#h-clear1").removeClass("h-clear");
                    }
                } else if (data.msg == 0) {
                    $(".h-point>span").removeClass("h-clear");
                    $(".h-point .h-prompt").html(" 用户名密码错误");
                    this.btndisable(1000);
                } else if (data.msg == 3) {
                    $(".h-point>span").removeClass("h-clear");
                    $("#h-clear1").removeClass("h-clear");
                    $(".h-point .h-prompt").html(" 验证码错误");
                    this.btndisable(1000);
                    if ($("#password").val() == "") {
                        $(".h-point .h-prompt").html(" 密码不能为空");
                    }
                    localStorage.setItem("msg", data.msg);
                    $('#codeImage').attr('src', url.WEBURL + 'Luser/code.html?abc=' + Math.random());
                } else if (data.msg == 4) {
                    $(".h-point>span").removeClass("h-clear");
                    $(".h-point .h-prompt").html("用户已过期");
                    this.btndisable(1000);
                    if (data.msg == 3 || data.num >= 3) {
                        $("#h-clear1").removeClass("h-clear");
                    }
                }
            },
        });
    }

    // 权限跳转
    jurisdictionLink(data) {
        if (data.type == "S") {
            sessionStorage.setItem("classItem", false);
            sessionStorage.setItem("userJudge", "S");
            sessionStorage.setItem("leftNavBar", "");
            $("#app").css("height", "");
            if (data.courseid === null) {
                hashHistory.push({
                    pathname: '/profession',
                });
            } else {
                hashHistory.push({
                    pathname: '/lesson',
                    query: {
                        id: Base64.encodeURI(data.courseid),
                        les: Base64.encodeURI(data.lessonid),
                    }
                });
            }
        } else if (data.type == "T") {
            sessionStorage.setItem("_WORK_S_FLAG", 1);
            sessionStorage.setItem("userJudge", "T");
            sessionStorage.setItem("teacherComp", "");
            sessionStorage.setItem("tCid", Base64.encodeURI(data.courseid))
            sessionStorage.setItem("tCles", Base64.encodeURI(data.lessonid))
            $("#app").css("height", "");
            if (data.courseid === null) {
                this.getMajorID();
            } else {
                hashHistory.push({
                    pathname: '/teacherCourse',
                    query: {
                        id: Base64.encodeURI(data.courseid),
                        les: Base64.encodeURI(data.lessonid),
                    }
                });
            }
        } else if (data.type == 'C') {
            sessionStorage.setItem("_WORK_S_FLAG", 1);
            sessionStorage.setItem("userJudge", "C");
            sessionStorage.setItem("displayFlag", "2");
            sessionStorage.setItem("teacherComp", "");
            hashHistory.push("/masStudentManagement");
        } else if (data.type == 'TM') {
            sessionStorage.setItem("userJudge", "TM");
            sessionStorage.setItem("teacherComp", "");
            sessionStorage.setItem("tCid", Base64.encodeURI(data.courseid))
            sessionStorage.setItem("tCles", Base64.encodeURI(data.lessonid))
            sessionStorage.setItem("displayFlag", "5");
            // 生产
            window.location.href = './assistantSup.html'
        } else if (data.type == 'CM') {
            sessionStorage.setItem("userJudge", "CM");
            sessionStorage.setItem("displayFlag", "2");
            window.location.href = './classAdviser.html'
        } else if (data.type == 'MM') {
            sessionStorage.setItem("userJudge", "MM");
            sessionStorage.setItem("displayFlag", "2");
            sessionStorage.setItem("teacherComp", "");
            window.location.href = './majorMaster.html'
        } else if (data.type == 'EM') {
            sessionStorage.setItem("userJudge", "EM");
            sessionStorage.setItem("teacherComp", "");
            window.location.href = './assistantSup.html'
        } else if (data.type == 'HM') {
            sessionStorage.setItem("userJudge", "HM");
            sessionStorage.setItem("teacherComp", "");
            window.location.href = './headMaster.html'
        } else if (data.type == 'PM') {
            sessionStorage.setItem("userJudge", "PM");
            sessionStorage.setItem("teacherComp", "");
            window.location.href = './headMaster.html'
        }
    }

    logintoo(event) { //这是监听键盘事件的函数
        if (event.keyCode == 13) {
            this.loginto();
        }
    }

    chageCode() {
        $('#codeImage').attr('src', url.WEBURL + 'Luser/code.html?abc=' + Math.random());//链接后添加Math.random，确保每次产生新的验证码，避免缓存问题。
    }

    toColor() {
        this.setState({
            disabledBtn: true,
        })
        if (this.state.disabledBtn == true) {
            return false;
        }
        this.loginto();
    }

    render() {
        let positi = {
            "position": "relative"
        }

        return (
            <div className="h-content">
                <p className="warningBox">
                    建议使用
                    <a href="http://rj.baidu.com/soft/detail/14744.html?ald" target="_blank">Chrome</a>
                    浏览器
                </p>
                <div className="h-setting">
                    {/*<!--顶部行-->*/}
                    <div className="h-tnav">
                        <div className="h-logo">
                            <div className="h-beij"></div>
                            <p>培养能力&nbsp;&nbsp;塑造人才</p>
                        </div>
                    </div>
                    {/*<!--中间内容-->*/}
                    <div className="h-section">
                        <div className="h-login">
                            <p className="h-numbe">账号登录</p>
                            <div className="h-point" id="h-clear">
                                <span className="h-prompt h-clear">* 用户名密码错误</span>
                            </div>
                            <div id="h-form" htmlFor="user">
                                <div className="h-user">
                                    <span className="h-colour iconfont icon-yonghuming"></span>
                                    <input type="text" htmlFor="loginname" id="loginname" autoComplete='off'
                                        onKeyDown={this.logintoo.bind(this)} placeholder="邮箱/用户名" />
                                </div>
                                <div className="h-user2">
                                    <span className="h-colour iconfont icon-mima"></span>
                                    <input type="password" htmlFor="password" id="password" autoComplete='off'
                                        onKeyDown={this.logintoo.bind(this)} placeholder="密码" />
                                </div>
                                <div className="h-user1">
                                    <div className="h-test h-clear" id="h-clear1">
                                        <input className="h-yanz" htmlFor="foryanz" onKeyDown={this.logintoo.bind(this)}
                                            autoComplete="off" placeholder="点击图片替换验证码"></input>
                                        <img src={url.WEBURL + "Luser/code.html"} onClick={this.chageCode.bind(this)}
                                            id="codeImage" alt="验证码" />
                                    </div>
                                </div>
                                <button
                                    className={this.state.disabledBtn == false ? "h-entry button commonButton" : "disabledEntry"}
                                    onClick={this.toColor.bind(this)} id="h-entry">马上登录
                                </button>
                            </div>
                            <div className="h-retrieve">
                                <p className="fr h-retrieves">忘记密码?&nbsp;<a href={url.WEBURL + "Luser/reving"}>立即找回</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/*<!--底部内容-->*/}
                    <div className="h-foot">
                        <p className="h-inter">
                            <a href="./contact/contact.html" target="_blank">联系我们</a>
                            <a href="./teacherStyle/teacherStyle.html" target="_blank">名师风采</a>
                        </p>
                        <p>Copyright 2017 联想（北京）有限公司 京ICP备11035381 | 京公网安备110108007970号</p>
                    </div>

                </div>
            </div>
        )
    }

    changeCheck() {
        if (this.state.check === true) {
            this.setState({
                check: false
            })
        } else {
            this.setState({
                check: true,
            })
        }
    }
}
