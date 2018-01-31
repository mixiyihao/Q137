import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import './linTab.css';

export default class LineTab extends Component {
    constructor() {
        super();
        this.state = {
            colorKey: -1,
        }
    }
    componentWillMount() {
        let isFirefox = navigator.userAgent.toUpperCase().indexOf("FIREFOX") ? true : false;
        if (!isFirefox) {
            let browser = navigator.appName;
            let b_version = navigator.appVersion;
            let version = b_version.split(";");
            let trim_Version = version[1].replace(/[ ]/g,"");
            if(browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") { 
                this.setState({
                    ie: true
                });
            } else {
                this.setState({
                    ie: false
                });
            }
        }
    }
    componentDidMount() {
        if (this.props.color != null && this.props.color.length != 0) {
            let color = this.props.color.split(",");
            if (this.state.ie == true) {
                $('.z-nav').css({
                    background: '#' + color[0]
                })
            } else {
                $('.z-nav').css({
                    background: 'linear-gradient(60deg,#' + color[0] + ',#' + color[1] + ')'
                })
            }
        } else {
            if (this.state.ie == true) {
                $('.z-nav').css({
                    background: '#f54379'
                })
            } else {
                $('.z-nav').css({
                    background: 'linear-gradient(60deg,#f54379,#fab391)'
                })
            }
        }
        if (this.props.nextId == null) {
            $(".lineTab_nextBoxNext").css({
                color: "#d1d1d1"
            });
        } else if (this.props.lastId == null) {
            $(".lineTab_nextBoxPreAni").css({
                color: "#d1d1d1"
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.nextId == null) {
            $(".lineTab_nextBoxNext").css({
                color: "#d1d1d1"
            });
        }
        if (nextProps.lastId == null) {
            $(".lineTab_nextBoxPreAni").css({
                color: "#d1d1d1"
            });
        } 
        if (nextProps.nextId != null) {
            $(".lineTab_nextBoxNext").css({
                color: "#606060"
            });
        } 
        if (nextProps.lastId != null) {
            $(".lineTab_nextBoxPreAni").css({
                color: "#606060"
            });
        }
        if (nextProps.color == null || nextProps.color.length == 0) {
        } else {
            let color = nextProps.color.split(",");
            if (this.state.ie == true) {
                $('.z-nav').css({
                    background: '#' + color[0]
                })
            } else {
                $('.z-nav').css({
                    background: 'linear-gradient(60deg,#' + color[0] + ',#' + color[1] + ')'
                })
            }
        }

    }
    nextBoxPre() {
        if (this.props.lastId !== null) {
            if (this.props.flag === "teacher") {
                hashHistory.push("/teacherLesson?id=" + Base64.encodeURI(this.props.lastId));
            } else {
                hashHistory.push("/classhours?id=" + Base64.encodeURI(this.props.lastId));
            }
            this.props.onNextClass(this.props.lastId);
        }
    }
    nextBoxNext() {
        if (this.props.nextId !== null) {
            if (this.props.flag === "teacher") {
                hashHistory.push("/teacherLesson?id=" + Base64.encodeURI(this.props.nextId));
            } else {
                hashHistory.push("/classhours?id=" + Base64.encodeURI(this.props.nextId));
            }
            this.props.onNextClass(this.props.nextId);
        }
    }
    onLinkToBack(id) {
        if (this.props.flag === "teacher") {
            if (this.props.userJudge === 'MM' || this.props.userJudge === 'PM') {
                hashHistory.push({
                    pathname: "/courseManagement",
                    query: {
                        id: Base64.encodeURI(id)
                    }
                });
            } else {
                hashHistory.push({
                    pathname: "/teacherCourse",
                    query: {
                        id: Base64.encodeURI(id)
                    }
                });
            }

        } else {
            hashHistory.push({
                pathname: "/lesson",
                query: {
                    id: Base64.encodeURI(id)
                }
            });
        }

    }
    onSpanEnter(key) {
        if (key === 1) {
            if (this.props.nextId !== null) {
                $(".lineTab_nextBoxNext").css({
                    color: "#1380f9",
                    border: "1px solid #1380f9"
                });
            }
        }
        if (key === 0) {
            if (this.props.lastId !== null) {
                $(".lineTab_nextBoxPreAni").css({
                    color: "#1380f9",
                    border: "1px solid #1380f9"
                });
            }
        }
    }
    onSpanLeave(key) {
        if (this.props.nextId === null && key === 1) {
            $(".lineTab_nextBoxNext").css({
                color: "rgb(209, 209, 209)",
                border: "1px solid #d1d1d1"
            });
        } else if (key === 1) {
            $(".lineTab_nextBoxNext").css({
                color: "#606060",
                border: "1px solid #d1d1d1"
            });
        }
        if (this.props.lastId === null && key === 0) {
            $(".lineTab_nextBoxPreAni").css({
                color: "rgb(209, 209, 209)",
                border: "1px solid #d1d1d1"
            });
        } else if ( key === 0) {
            $(".lineTab_nextBoxPreAni").css({
                color: "#606060",
                border: "1px solid #d1d1d1"
            });
        }
    }
    render() {
        let props = this.props;
        return (
            <div className={props.isFixed ? "class_lineTab top" : "class_lineTab"} style={props.isFixed ? props.style.top : null}>
                <div className="lineTab_Wrap" style={props.style.lineTabStyle}>
                    <div className="lineTabP_box">
                        <p className="lineTabP" style={props.style.linePadding}>{props.coursename} — {props.pValue + " " + props.name}</p>
                    </div>
                    <a style={props.style.right} className="lineTabP_back" onClick={this.onLinkToBack.bind(this,props.course_id)}>返回<i className="iconfont icon-back"></i></a>
                    <div className="lineTab_nextBox">
                        <div onMouseEnter={this.onSpanEnter.bind(this,0)} onMouseLeave={this.onSpanLeave.bind(this,0)} onClick={this.nextBoxPre.bind(this)} className={props.isNextShow ? "lineTab_nextBoxPreAni" : "lineTab_nextBoxPre"}><i> &lt; </i><span>上一课时</span></div>
                        <div onMouseEnter={this.onSpanEnter.bind(this,1)} onMouseLeave={this.onSpanLeave.bind(this,1)} onClick={this.nextBoxNext.bind(this)} className={"lineTab_nextBoxNext"}><span>下一课时</span><i className=""> &gt; </i></div>
                    </div>
                </div>
            </div>
        );
    }
}