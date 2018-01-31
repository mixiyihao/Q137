/**
 * Created by YH on 2017/1/11.
 */

import React from 'react';
import './styleTopMessage.css'
import $ from 'jquery';
import {hashHistory} from 'react-router';

export default class topMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userJudge: sessionStorage.getItem("userJudge"),
            nowTerm: 0,
            isFixed: false,
        }
    }

    componentDidMount() {
        if (!this.props.isLesson) {
            let _this = this;
            $(window).scroll(function () {
                if (_this.state.userJudge === "S") {
                    if ($(window).scrollTop() > 144) {
                        $('.y_teacherTitle_LineTab').addClass("top");
                    } else {
                        $('.y_teacherTitle_LineTab').removeClass("top");
                    }
                } else {
                    if ($(window).scrollTop() > 144) {
                        $('.y_teacherTitle_LineTab').addClass("topTea");
                    } else {
                        $('.y_teacherTitle_LineTab').removeClass("topTea");
                    }
                }
            });
        }
        if (this.state.userJudge === "S") {
            let majorData = JSON.parse(sessionStorage.getItem("leftNavBar")).nowTerm;
            this.setState({
                nowTerm: majorData
            });
        }
    }

    handleSproPE() {
        sessionStorage.setItem("displayFlag", 4);
        hashHistory.push({
            pathname: "/teacherteststorefinal"
        });

    }

    onLinkToBack(id) {
        hashHistory.push({
            pathname: "/courseManagement",
            query: {
                id: Base64.encodeURI(id)
            }
        });
    }

    render() {
        let styles = {
            teacherWrap: {
                width: "1100px",
                margin: "0 auto"
            },
            nav1: {
                left: "58%"
            },
            y_teacherTitle_LineP: {
                width: "1280px",
                paddingLeft: "90px"
            }
        };
        let term = "";
        switch (this.props.term) {
            case 1:
                term = "一";
                break;
            case 2:
                term = "二";
                break;
            case 3:
                term = "三";
                break;
            case 4:
                term = "四";
                break;
            case 5:
                term = "五";
                break;
        }
        return (
            <div className="y_topMessageBox">
                <div className="y_topMessageBoxBg">
                    <div className="y_topMessageNav" style={styles.teacherWrap}>
                        <div className="teacherTitle_MSg" style={this.state.userJudge !== "S" ? null : styles.nav1}>
                            <p>{this.props.name || '--'}</p>
                        </div>
                        <div className="teacherTitle_MSg2" style={this.state.userJudge !== "S" ? null : styles.nav1}>
                            <p>
                                <span className="iconfont icon-kecheng">
                                </span>
                                {this.props.name || '--'}
                            </p>
                        </div>
                    </div>
                    {
                        !this.props.isLesson ?
                            <div className="y_teacherTitle_LineTab">
                                <p style={this.state.userJudge === "S" ? styles.y_teacherTitle_LineP : null}>
                                    <span className={this.props.flag === "teacher" ? "y_teacherTitle_LineTabTitle" : "y_teacherTitle_LineTabTitleHide"}>教学指导</span>
                                    <span className={this.props.flag === "teacher" ? "y_teacherTitle_LineTabSpan" : "y_teacherTitle_LineTabSpan2"}>第{term || "--"}学期{this.state.nowTerm == this.props.term ? "（本学期）" : ""}
                                        — {this.props.name || "--"}</span>
                                    <span className={this.state.userJudge === "T" ? "SproPE commonButton button" : "SproPEHide"}
                                          onClick={this.handleSproPE.bind(this)}>发起期末考试</span>
                                </p>
                            </div>
                            :
                            <div className="y_teacherTitle_LineTab">
                                <p>
                                    <span className="y_teacherTitle_LineTabSpan">
                                        第{term || "--"}学期{this.state.nowTerm == this.props.term ? "（本学期）" : ""} — {this.props.name || "--"}
                                    </span>
                                    <a className="lineTabP_back" onClick={this.onLinkToBack.bind(this,this.props.course_id)}>
                                        返回
                                        <i className="iconfont icon-back"></i>
                                    </a>
                                </p>
                            </div>
                    }
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        $(window).off('scroll');
    }
}
