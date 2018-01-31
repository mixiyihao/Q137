/**
 * Created by heshuai on 2017/1/23.
 */

'use strict';
import React from 'react';
// import '../../information/mainBody/styleMainBody.css';
import '../newSuggesBody/styleNewSuggesBody.css';
import { Link } from 'react-router';
import $ from 'jquery';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';

export default class newSuggesBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: [],
            option1: [],
            UlClickState: false,
            sproVi: "用户体验",
        };

    }

    componentWillMount() {
        // var lessonID = window.location.hash.split("Ad=")[1].split("&")[0];
        $.llsajax({
            url: "opinion/opinion",
            type: "post",
            data: {
                opinionid: this.props.rid

            },
            success: zhankai => {
                this.setState({
                    option: zhankai.opinion.opinion,
                    option1: zhankai.opinion.detail,
                    sproVi: zhankai.opinion.label
                })
                // this.refs.titles.value == this.state.option;
                var reviseSugVal = this.state.option;
                $("#h-revisSug").val(reviseSugVal);
                var detailVal = this.state.option1;
                $("#h-detail").val(detailVal);


            }
        })
    }

    textNumChange(e) {
        let textLength = e.target.value.length;
        if (textLength > 60) {
            e.target.value = e.target.value.substring(0, 60)
        }
    }

    textareaNumChange(e) {
        let textLength = e.target.value.length;
        if (textLength > 500) {
            e.target.value = e.target.value.substring(0, 500)
        }
    }

    handleSubmit(event) {
        console.log("******")
        var lessonID = window.location.hash.split("Ad=")[1].split("&")[0];
        event.preventDefault();
        let title = this.refs.titles.value,
            text = this.refs.text.value,
            option = this.state.sproVi;
        if (title != "") {
            // alert(11);
            $.llsajax({
                url: "opinion/updateopinion",
                type: "post",
                data: {
                    opinion: title,
                    detail: text,
                    label: option,
                    id: lessonID
                },
                success: zhankai => {
                    if (sessionStorage.getItem("userJudge") == "S") {
                        hashHistory.push("/stuEvaluate?vccxuaduking")
                    } else if (sessionStorage.getItem("userJudge") == "TM" || sessionStorage.getItem("userJudge") == "CM") {
                        hashHistory.push("/assinformations?SproState=3ugnik")
                    } else {
                        hashHistory.push("/tinformations?SproState=3ugnik")
                        //  history.go(-1);
                    }
                }
            })
        }
    }

    SproRouter() {
        if (sessionStorage.getItem("userJudge") == "S") {
            hashHistory.push("/stuEvaluate?vccxuaduking")
        } else if (sessionStorage.getItem("userJudge") == "T" || sessionStorage.getItem("userJudge") == "C") {
            hashHistory.push("/tinformations?SproState=3ugnik")
        } else {
            hashHistory.push("/assinformations?SproState=3ugnik")
        }
    }
    ChooseState() {
        if (this.state.UlClickState) {
            this.setState({
                UlClickState: false
            })
        }
        else {
            this.setState({
                UlClickState: true,
            })
        }
    }
    ChooseState1() {
        if (this.state.UlClickState) {
            this.setState({
                UlClickState: false
            })
        }
    }
    nshandleTypeTab(e) {

        // //console.log(e.target.title);
        this.setState({
            UlClickState: false,
            sproVi: e.target.title
        })
    }

    render() {
        let UlClickState = this.state.UlClickState;
        let ulStyle = {
            display: UlClickState ? "block" : "none"
        }
        let spanStyle = {
            border: UlClickState ? "1px solid #4ac0e0" : ""
        }
        let colorred = {
            color: "#fb4f45"
        }
        let userState = sessionStorage.getItem("userJudge");
        let SpronewTitltStyle = {
            marginRight: userState != "S" ? "0px" : "0px"
        }
        let SprostuformStyle = {
            width: userState != "S" ? "1006px" : "1006px",
            marginLeft: userState != "S" ? "0px" : "19px"
        }
        let newSuggesBodyWarpStyle = {
            width: userState != "S" ? "1069px" : "1046px",
            paddingLeft: userState != "S" ? "0px" : "17px",
            margin: userState != "S" ? "0 auto" : ""
        }
        return (
            <div className="h-landing">
                <div className="h-navsSugg">
                    <div className="h-stepSugg">
                        <div className="h-stepSuggWrap">
                            {/*<p className="h-reset">意见反馈</p>*/}
                            <div className="h-agree">
                                <ul>
                                    <li>
                                        <span className="h-agree1">我的意见<s
                                            className="suggessumStyle">{this.props.sugges.sum}</s>条</span>
                                    </li>
                                    <li>
                                        <span className="h-agree1">已回复<s
                                            className="suggesYreplyStyle">{this.props.sugges.Yreply}</s>条</span>
                                    </li>
                                    <li>
                                        <span className="h-agree1">未回复<s
                                            className="suggesNreplyStyle">{this.props.sugges.Nreply}</s>条</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-newSuggesBody" onClick={this.ChooseState1.bind(this)}>
                    <div className="h-newSuggesBodyWarp" style={newSuggesBodyWarpStyle}>
                        <div className="h-titlnewSugges">
                            <span className="h-cubiud"></span><span className="h-information">编辑意见</span>
                            <div className="h-new-built h-revi-built" style={SpronewTitltStyle}>
                                <a className="spro-suggesBody commonButton button spro-mysuggesbody"
                                    onClick={this.SproRouter.bind(this)}>我的意见&nbsp;<span
                                        className="iconfont icon-yonghuming-"></span></a>
                            </div>
                        </div>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="h-classify">
                                <p className="dib"><span style={colorred}>*</span>问题分类</p><i className="dib">:</i>
                                <div className="sprosatPublicleftselect SpronewSu">
                                    <span onClick={this.ChooseState.bind(this)}
                                        style={spanStyle}>{this.state.sproVi}</span>
                                    <ul style={ulStyle}>
                                        <li title="用户体验" onClick={this.nshandleTypeTab.bind(this)}>用户体验</li>
                                        <li title="产品bug" onClick={this.nshandleTypeTab.bind(this)}>产品bug</li>
                                        <li title="功能建议" onClick={this.nshandleTypeTab.bind(this)}>功能建议</li>
                                        <li title="问卷建议" onClick={this.nshandleTypeTab.bind(this)}>问卷建议</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="h-newpropose">
                                <p className="dib"><span style={colorred}>*</span>意见</p><i className="dib">:</i>
                                <input type="text" id="h-revisSug" ref="titles" className="dib" placeholder="请在这里输入你的问题 (60个字符内)"
                                    onChange={this.textNumChange.bind(this)} />
                            </div>
                            <div className="h-detail">
                                <p className="dib">问题说明</p><i className="dib">:</i>
                                <textarea className="dib" name="detail" ref="text" id="h-detail" rows="10" placeholder="问题背景、条件等详细信息"
                                    onChange={this.textareaNumChange.bind(this)}></textarea>
                            </div>

                            <div className="h-subfeed">
                                <a onClick={this.SproRouter.bind(this)} className="h-callsub fl">取消</a>
                                <button className="h-subfeedback fl" type="submit">提交</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
