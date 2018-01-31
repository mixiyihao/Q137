import React from 'react';
import './styleNewSuggesBody.css';
import $ from 'jquery';
import {Link, Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory} from 'react-router';

export default class newSuggesBody extends React.Component {
    constructor() {
        super();
        this.state = {
            UlClickState: false,
            sproVi: location.hash.indexOf("i=Ne") != -1 ? "问卷建议" : "用户体验",
            userJudge: sessionStorage.getItem("userJudge") // 权限控制
        }
    }

    componentWillMount() {
        $(document).ready(function () {
            $(".h-popup").on("click", ".h-closs", function () {
                $(".h-popup").css("display", "none");
            });
            $(".h-popup").on("click", ".h-compgo", function () {
                $(".h-popup").css("display", "none");
            });
        })

    }

    nshandleTypeTab(e) {


        this.setState({
            UlClickState: false,
            sproVi: e.target.title
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

    hashnewSuggesBody() {
        //hashHistory.push("/informat?SproState=3");
        if (this.state.userJudge == "S") {
            hashHistory.push("/stuEvaluate?vccxuaduking")
        } else if (this.state.userJudge == "T" || this.state.userJudge == "C") {
            hashHistory.push("/tinformations?SproState=3ugnik")
        } else {
            // this.state.userJudge == "TM" || this.state.userJudge == "CM" || this.state.userJudge == "CM"
            hashHistory.push("/assinformations?SproState=3ugnik")
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let title = this.refs.titles.value,
            text = this.refs.text.value,
            option = this.state.sproVi;

        if (title != "") {
            $.llsajax({
                url: "opinion/addopinion",
                type: "post",
                data: {
                    opinion: title,
                    detail: text,
                    label: option
                },
                success: zhankai => {
                    this.hashnewSuggesBody();
                }
            })
        }
    }

    tanchu(arr) {
        return (
            <div>
                {arr}
            </div>
        )
    }

    AllClose() {
        if (this.state.UlClickState) {
            this.setState({
                UlClickState: false
            })
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

    render() {
        let UlClickState = this.state.UlClickState;
        let ulStyle = {
            display: UlClickState ? "block" : "none"
        }
        let spanStyle = {
            border: UlClickState ? "1px solid #1280fb" : ""
        }
        let userState = sessionStorage.getItem("userJudge");
        let SpronewTitltStyle = {
            marginRight: userState != "S" ? "0px" : "0px"
        }
        if (location.hash.indexOf("stuEvaluate") != -1) {
            SpronewTitltStyle = {
                marginRight: userState != "S" ? "0px" : "19px",

            }
        }
        let stuEvaluate_formstyle = {}
        if (location.hash.indexOf("stuEvaluate") != -1) {
            stuEvaluate_formstyle = {
                marginRight: userState != "S" ? "0px" : "19px",

            }
        }
        let newSuggesBodyCenterStyle = {
            width: userState != "S" ? "1069px" : "1065px",
            paddingLeft: userState != "S" ? "0px" : "17px",
        }
        let colorred = {
            color: "#fb4f45"
        }
        let Inputwidth = {
            width: userState != "S" ? "960px" : "920px"
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
                <div className="h-newSuggesBody" onClick={this.AllClose.bind(this)}>
                    <div className="h-newSuggesBodyCenter" style={newSuggesBodyCenterStyle}>
                        {this.tanchu()}
                        <div className="h-titlnewSugges">
                            <span className="h-cubiud"></span><span className="h-information">意见反馈</span>
                            <div className="h-new-built h-revi-built" style={SpronewTitltStyle}>
                                <span onClick={this.hashnewSuggesBody.bind(this)}
                                      className="spro-suggesBody commonButton button spro-mysuggesbody">我的意见<span
                                    className="iconfont icon-yonghuming-"></span></span>
                            </div>
                        </div>
                        <form onSubmit={this.handleSubmit.bind(this)} style={stuEvaluate_formstyle}>
                            <div className="h-classify">
                                <p className="dib"><span style={colorred}>*</span>问题分类</p><i className="dib">:</i>
                                {/*<select name="cars" ref="optio" onChange={this.Sprooption.bind(this)}>
                                    <option>&nbsp;用户体验</option>
                                    <option>&nbsp;产品bug</option>
                                    <option>&nbsp;功能建议</option>
                                </select>*/}
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
                                <input type="text" ref="titles" placeholder="请在这里输入你的问题 (60个字符内)"
                                       onChange={this.textNumChange.bind(this)}
                                       style={Inputwidth}/>
                            </div>
                            <div className="h-detail">
                                <p className="dib">问题说明</p><i className="dib">:</i>
                                <textarea
                                    style={Inputwidth} name="detail" ref="text" id="h-detail" rows="10"
                                    placeholder="问题背景、条件等详细信息" onChange={this.textareaNumChange.bind(this)}></textarea>
                            </div>

                            <div className="h-subfeed">
                                <button className="h-subfeedback fl commonButton button" type="submit">提交反馈</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
