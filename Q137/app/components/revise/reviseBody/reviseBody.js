/**
 * Created by heshuai on 2017/1/17.
 */

"use strict";
import React from 'react';
import $ from 'jquery';
import './reviseBody.css';
import {
    Link
} from 'react-router';
import {
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect,
    browserHistory
} from 'react-router';

export default class reviseBody extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userJudge: sessionStorage.getItem("userJudge") // 权限控制
        }
    }
    componentDidMount() {
        var flag = false;
        var flag2 = false;
        var flag3 = false;
        let _this = this;
        $("#orderPassword").blur(function() { // 失去焦点时触发的时间
            if ($("#orderPassword").val() == "") {
                // $("#orderPassword").val("请在这里输入你的旧密码").attr("type","text").css("color","#d0d0d0");
                $(".h-tishi").css("display", "none");
                return;
            }
            var orderPassword = $("#orderPassword").val();

            $.llsajax({
                    url: "Luser/ifLuserpassword",
                    type: "post",
                    data: {
                        password: orderPassword
                    },
                    success: function(data) {
                        if (data.string == 0) {
                            $(".h-tishi").css("display", "block");
                            flag = false;
                        } else if (data.string == 1) {
                            $(".h-tishi").css("display", "none");
                            flag = true;
                        }
                    }

                })
                // }
        });
        $("#orderPassword").keyup(function() {
            if ($("#orderPassword").val() == "") {
                $(".h-tishi").css("display", "none");
            }
        })

        //这是新密码输入后的判断
        $("#newPassword").blur(function() { // 失去焦点时触发的时间
            function newPW(mail) {
                var pasdw = /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])).{8,20}$/;
                if (pasdw.test(mail)) return true;
                else {
                    return false;
                }
            }

            if (newPW($("#newPassword").val())) {
                $(".h-tishi2").css("display", "none");
                flag2 = true;

            } else {
                $(".h-tishi2").css("display", "block");
                flag2 = false;
                $(".h-tishi2 .h-baocuo").html(" 密码格式不正确");
            }
            if ($("#newPassword").val() == "") {
                $(".h-tishi2").css("display", "none");
            }

        })
        $("#newPassword").keyup(function() {
                if ($("#newPassword").val() == "") {
                    $(".h-tishi2").css("display", "none");
                }
            })
            //这是判断第二个新密码的
        $("#newPassword2").blur(function() {
            if ($("#newPassword2").val() == "") {
                $(".h-tishi3").css("display", "none");
                return;
            }
            if ($("#newPassword").val() == $("#newPassword2").val()) {
                $(".h-tishi3").css("display", "none");
                flag3 = true;
            } else {
                $(".h-tishi3").css("display", "block");
                $(".h-tishi3 .h-baocuo").html(" 密码不一致");
                flag3 = false;
            }
        })
        $("#newPassword2").keyup(function() {
            if ($("#newPassword2").val().length < $("#newPassword").val().length) {
                $(".h-tishi3").css("display", "none");
            }
            if ($("#newPassword").val().length <= $("#newPassword2").val().length) {
                if ($("#newPassword").val() == $("#newPassword2").val()) {
                    $(".h-tishi3").css("display", "none");
                    flag3 = true;
                } else {
                    $(".h-tishi3").css("display", "block");
                    $(".h-tishi3 .h-baocuo").html(" 密码不一致");
                    flag3 = false;
                }
            }
        })

        //这是最后提交的函数
        $("#h-submit").click(function() {

            var newPassword = $("#newPassword2").val();
            if (flag && flag2 && flag3) {

                $.llsajax({
                    url: "Luser/loginUserPassword",
                    type: "post",
                    data: {
                        password: newPassword,
                    },
                    success: function(data) {
                        if (data.string == 1) {
                            if(_this.state.userJudge == "S"){
                                hashHistory.push("/informat?SproState=2c");
                            } else if (_this.state.userJudge == "T" || _this.state.userJudge == "C") {
                                hashHistory.push("/tinformations?SproState=2c");
                            } else {
                                hashHistory.push("/assinformations?SproState=2c")
                            }
                        }
                    }
                })

            }
        })

    }
    passwordChange(e) {
        let textLength = e.target.value.length;
        if (textLength > 20) {
            e.target.value = e.target.value.substring(0, 20)
        }
    }
    render() {
        let userState=sessionStorage.getItem("userJudge");
        let userStyle={
            paddingLeft:userState=="S"?"210px":"0px"
        }
        let SproStyle={
            marginLeft:userState=="S"?"100px":"0px"
        }
        return (
            <div className="h-reviseBody">
                <div className="spro-newrevisetitle" style={userStyle}>
                   <div className="sproinnernewrevisetitle">
                    <strong className="c4ac0e0">---</strong>
                    <span className="dib ">
                      <i className="iconfont icon-mima dib c4ac0e0"></i>
                      <b className="dib c4ac0e0">修改密码</b>
                    </span>
                    <strong className="c4ac0e0">---</strong>
                    <strong className="spro-revisestrongtwo">---</strong>
                    <span className="dib ">
                      <i className="iconfont icon-wancheng dib spro-reviseitwo c-aeaeb0"></i>
                      <b className="dib c-aeaeb0 spro-revbtwo">完成</b>
                    </span>
                    <strong className="spro-revisestrongtwo">---</strong>
                  </div>
                </div>
                <div className="h-email">
                    <div className="h-input spro-reviseinputone" style={SproStyle}>
                        <div id="h-ajaxForm" className="h-ajaxForm">
                            <p>请输入你的原密码</p>
                            <div className="h-kipt">
                                <input className="h-ipt" id="orderPassword" type="password" onChange={this.passwordChange.bind(this)} placeholder="请在这里输入你的原密码"></input>
                                <span className="h-tishi"><s className="h-chacha">×</s><i className="h-baocuo">&nbsp;密码不正确</i></span>
                            </div>
                            <p>请输入你的新密码</p>
                            <div className="h-kipt">
                                <input className="h-ipt1" id="newPassword" type="password" onChange={this.passwordChange.bind(this)} placeholder="请在这里输入你的新密码"></input>
                                <span className="h-tishi2"><s className="h-chacha">×</s><i className="h-baocuo">&nbsp;请填写你的用户名</i></span>
                            </div>
                            <span><i style={{"color":"#fb4f45"}}>*</i>  密码为8-20位，必须使用大小写字母、数字与特殊符号的组合</span>
                            <div className="h-kipt">
                                <input className="h-ipt" id="newPassword2" type="password" onChange={this.passwordChange.bind(this)} placeholder="请在这里输入你的新密码"></input>
                                <span className="h-tishi3"><s className="h-chacha">×</s><i className="h-baocuo" id="h-gap">&nbsp;密码不一致</i></span>
                            </div>
                            <button className="h-revisebtn" id="h-submit">确认修改</button>
                            {/*<input type="submit" value="确认修改" className="h-revisebtn" id="h-submit"></input>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}