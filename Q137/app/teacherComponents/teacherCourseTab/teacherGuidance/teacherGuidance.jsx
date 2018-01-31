import React, { Component } from 'react';
import './teacherGuidance.css';
import $ from 'jquery';
export default class TeacherGuidance extends Component {
    constructor() {
        super();
        this.state = {
            boxHeight: 200,
        }
    }
    componentDidMount() {
        if (this.props.flag === "lesson") {
            this.timer = setTimeout(()=>{
                let LineTabTop = document.getElementsByClassName("lineTab_Wrap")[0].clientHeight;
                let documentClient = document.body.clientHeight;
                document.getElementById("teacherGuidance_box").style.height = documentClient - LineTabTop + "px";
                $(window).scroll(function () {
                    LineTabTop = document.getElementsByClassName("lineTab_Wrap")[0].clientHeight;
                    documentClient = document.body.clientHeight;
                    if (document.getElementById('teacherGuidance_box') && document.getElementById('classBoxDIV1')) {
                        if ($(document).height() - $(window).scrollTop() - documentClient > 159 && $(window).scrollTop() > 146) {
                            document.getElementById("teacherGuidance_box").style.height = documentClient - LineTabTop + "px";
                            document.getElementById("teacherGuidance_box").style.position = "fixed";
                            document.getElementById("teacherGuidance_box").style.top = "122px";
                            document.getElementById("teacherGuidance_box").style.bottom = "";
                            document.getElementById("teacherGuidance_scroll").style.height = documentClient - LineTabTop - 86 + "px";
                        } else if ($(document).height() - $(window).scrollTop() - documentClient < 159 && $(window).scrollTop() > 146 )  {
                            document.getElementById("teacherGuidance_box").style.position = "fixed";
                            document.getElementById("teacherGuidance_box").style.top = "122px";
                            document.getElementById("teacherGuidance_box").style.bottom = "";
                            document.getElementById("teacherGuidance_box").style.height = document.getElementById("footerA").offsetTop - $(window).scrollTop() - 122 + "px";
                        } else {
                            document.getElementById("teacherGuidance_box").style.height = documentClient - document.getElementById("classBoxDIV1").clientHeight - document.getElementsByClassName("lineTab_Wrap")[0].clientHeight + $(window).scrollTop() + "px";
                            document.getElementById("teacherGuidance_box").style.position = "";
                            document.getElementById("teacherGuidance_box").style.top = "";
                            document.getElementById("teacherGuidance_box").style.bottom = "";
                            document.getElementById("teacherGuidance_scroll").style.height = documentClient - document.getElementById("classBoxDIV1").clientHeight - document.getElementsByClassName("lineTab_Wrap")[0].clientHeight + $(window).scrollTop() - 86 + "px";
                        }
                    }
                });
            },10);
        } else {
            this.timer = setTimeout(()=>{
                let LineTabTop = document.getElementsByClassName("y_teacherTitle_LineTab")[0].clientHeight;
                let documentClient = document.body.clientHeight;
                document.getElementById("teacherGuidance_box").style.height = documentClient - LineTabTop + "px";
                document.getElementById("courseTab_center").style.minHeight = documentClient - LineTabTop + "px";
                $(window).scroll(function () {
                    LineTabTop = document.getElementsByClassName("y_teacherTitle_LineTab")[0].clientHeight;
                    documentClient = document.body.clientHeight;
                    if ($(document).height() - $(window).scrollTop() - documentClient > 133 && $(window).scrollTop() > 144) {
                        document.getElementById("teacherGuidance_box").style.height = documentClient - LineTabTop + "px";
                        document.getElementById("teacherGuidance_box").style.position = "fixed";
                        document.getElementById("teacherGuidance_box").style.top = LineTabTop + 37 + "px";
                        document.getElementById("teacherGuidance_box").style.bottom = "";
                        document.getElementById("teacherGuidance_scroll").style.height = documentClient - LineTabTop + "px";
                    } else if ($(document).height() - $(window).scrollTop() - documentClient < 133 && $(window).scrollTop() > 146 )  {
                        document.getElementById("teacherGuidance_box").style.position = "fixed";
                        document.getElementById("teacherGuidance_box").style.top = LineTabTop + 37 + "px";
                        document.getElementById("teacherGuidance_box").style.bottom = "";
                        document.getElementById("teacherGuidance_box").style.height = document.getElementById("footerA").offsetTop - $(window).scrollTop() - 64 + "px";
                        document.getElementById("teacherGuidance_scroll").style.height = document.getElementById("footerA").offsetTop - $(window).scrollTop() - 64 + "px";
                    } else {
                        document.getElementById("teacherGuidance_box").style.height = documentClient - 38 - document.getElementsByClassName("y_topMessageBox")[0].clientHeight + $(window).scrollTop() + "px";
                        document.getElementById("teacherGuidance_box").style.position = "";
                        document.getElementById("teacherGuidance_box").style.top = "";
                        document.getElementById("teacherGuidance_box").style.bottom = "";
                        document.getElementById("teacherGuidance_scroll").style.height = documentClient - 38 - document.getElementsByClassName("y_topMessageBox")[0].clientHeight + $(window).scrollTop() + "px";
                    }
                });
            },10);
        }
    }
    showGuidance() {
        return this.props.targetList.map((value, key) => {
            let num = '';
            switch(key) {
                case 0:
                    num = '一';
                    break;
                case 1:
                    num = '二';
                    break;
                case 2:
                    num = '三';
                    break;
                case 3:
                    num = '四';
                    break;
                case 4:
                    num = '五';
                    break;
                case 5:
                    num = '六';
                    break;
                case 6:
                    num = '七';
                    break;
                case 7:
                    num = '八';
                    break;
                case 8:
                    num = '九';
                    break;
                case 9:
                    num = '十';
                    break;
            }
            return (
                <div className="teacherGuidance_content" key={key}>
                    <h4>教学目标{num}：</h4>
                    <p>
                        <span className={value.ishard === 1 ? "teacherGuidance_label1" : "teacherGuidance_labelHide"}>重</span>
                        <span className={value.ispoint === 1 ? "teacherGuidance_label2" : "teacherGuidance_labelHide"}>难</span>
                        {value.target}
                    </p>
                    <h5>实施步骤</h5>
                    <ul>
                        {
                            value.teachguidances.map((value2,index) => {
                                return (
                                    <li key={index}>{value2.ordernum + " " + value2.step}{value2.way === 1 ? "" : "(" + value2.timelong + ")"}</li>
                                );
                            })
                        }
                    </ul>
                </div>
            );
        });
    }
    render() {
        return (
            <div className="teacherGuidance_left">
                <div className="teacherGuidance_box" id="teacherGuidance_box">
                    <div className="teacherGuidance_scroll" id="teacherGuidance_scroll">
                        {this.showGuidance()}
                    </div>
                </div>
            </div>
        );
    }
    componentWillUnmount() {
        $(window).off('scroll');
    }
}