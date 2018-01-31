/**
 * Created by YH on 2017/1/11.
 */

import React from 'react';
import { hashHistory } from 'react-router';
import './styleTopMessage.css'
export default class topMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userJudge: sessionStorage.getItem("userJudge"),
            color: ["f54379","fab391"],
            ie: false,
        }
    }
    componentWillMount() {
        var isFirefox = navigator.userAgent.toUpperCase().indexOf("FIREFOX") ? true : false;
        if (!isFirefox) {
            var browser = navigator.appName;
            var b_version = navigator.appVersion;
            var version = b_version.split(";"); 
            //console.log(version);
            var trim_Version = version[1].replace(/[ ]/g,""); 
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
            $(".nextBoxNext").css({
                borderColor: "#fff",
                opacity: 0.5
            });
        } else if (this.props.lastId == null) {
            $(".nextBoxPre").css({
                borderColor: "#fff",
                opacity: 0.5
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.nextId == null) {
            $(".nextBoxNext").css({
                borderColor: "#fff",
                opacity: 0.5
            });
        }
        if (nextProps.lastId == null) {
            $(".nextBoxPre").css({
                borderColor: "#fff",
                opacity: 0.5
            });
        } 
        if (nextProps.nextId != null) {
            $(".nextBoxNext").css({
                borderColor: "#fff",
                opacity: 1
            });
        } 
        if (nextProps.lastId != null) {
            $(".nextBoxPre").css({
                borderColor: "#fff",
                opacity: 1
            });
        }
        // let color = null;
        if (nextProps.color == null || nextProps.color.length == 0) {
            // color = nextProps.color
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
        if (this.props.lastId != null) {
            if (this.state.userJudge != "S") {
                hashHistory.push("/teacherLesson?id=" + Base64.encodeURI(this.props.lastId));
            } else {
                hashHistory.push("/classhours?id=" + Base64.encodeURI(this.props.lastId));
            }
            this.props.onNextClass(this.props.lastId);
        }
    }
    nextBoxNext() {
        if (this.props.nextId != null) {
            if (this.state.userJudge != "S") {
                hashHistory.push("/teacherLesson?id=" + Base64.encodeURI(this.props.nextId));
            } else {
                hashHistory.push("/classhours?id=" + Base64.encodeURI(this.props.nextId));
            }
            this.props.onNextClass(this.props.nextId);
        }
    }
    render() {
        let styles = {
            nav1: {
                left: "55%"
            }
        };
        return (
            <div className="z-nav">
                <div className="z-navn">
                    <div className="z-nav1" style={this.state.userJudge == "S" ? styles.nav1 : null}>
                        <p>{this.props.pValue} <span className="z-nav1Span">{this.props.name}</span></p>
                    </div>
                    <div className="banenr_showMsg" style={this.state.userJudge == "S" ? styles.nav1 : null}>
                        <p>{this.props.pValue} <span>{this.props.name}</span></p>
                    </div>
                    <div className="banenr_showButton" style={this.state.userJudge == "S" ? styles.nav1 : null}>
                        <div onClick={this.nextBoxPre.bind(this)} className="nextBoxPre">
                            <i> &lt; </i>
                            <span>上一课时</span>
                        </div>
                        <div onClick={this.nextBoxNext.bind(this)} className="nextBoxNext">
                            <span>下一课时</span>
                            <i className=""> &gt; </i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
