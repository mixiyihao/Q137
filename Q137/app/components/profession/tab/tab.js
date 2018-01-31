/**
 * Created by YH on 2017/1/11.
 */

import React from 'react';
import { Link } from 'react-router'
import $ from 'jquery';
import html2canvas from 'html2canvas';
import './styleTab.css'
export default class banner extends React.Component {
    constructor() {
        super();
        //导航栏置顶悬浮
        this.state = {
            xueqi: [
                '第一学期',
                '第二学期',
                '第三学期',
                '第四学期',
                '第五学期',
                '第六学期',

            ],
            nowTerm: [],
            Browser: [],
        }
    }
    componentWillMount() {
        let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            this.setState({
                Browser: "1"
            });
        } else if (isEdge) {
            this.setState({
                Browser: "1"
            });
        } else {
            this.setState({
                Browser: "2"
            });
        }
    }
    componentDidMount() {
        this.setState({
            nowTerm: this.props.nowTerm
        });
        var oli = [$('.ali').height(), $('.bli').height(), $('.cli').height(), $('.dli').height()];
        var maxInNumbers = Math.max.apply(Math, oli);
        $('.z-list li').css('height', maxInNumbers + 15);
        var bColor = $('.ali div').css('background-color');
        $('.z-list li').mouseenter(function () {
            //rgb转16进制
            function colorRGB2Hex(color) {
                var rgb = color.split(',');
                var r = parseInt(rgb[0].split('(')[1]);
                var g = parseInt(rgb[1]);
                var b = parseInt(rgb[2].split(')')[0]);
                var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                return hex;
            }
            var xColor = $(this).children().css('background-color');
            var sHexColor = colorRGB2Hex(xColor);
            $(this).css("border", "1px" + sHexColor + " solid");
        }).mouseleave(function () {
            $(this).css("border", "1px #fff solid");
        });
        html2canvas(document.querySelector("#scShotList")).then(function (canvas) {
            document.body.appendChild(canvas);
            canvas.setAttribute("class", "canvas");
            let type = 'png';
            let imgData = canvas.toDataURL(type);
            document.getElementById("canvasDownload").href = imgData;
        })
    }
    componentDidUpdate() {

    }
    onLessonStyle() {
        sessionStorage.setItem("colorIndex", 3);
        if (sessionStorage.getItem('constraintMessage') != 'true') {
            sessionStorage.setItem("classItem", true)
        }
    }

    //html2canvas
    // screenshotHandle() {
    //     html2canvas(document.querySelector("#scShotList")).then(function (canvas) {
    //         document.body.appendChild(canvas);
    //         canvas.setAttribute("class","canvas");
    //         let type = 'png';
    //         let imgData = canvas.toDataURL(type);
    //         console.log(imgData);
    //         document.getElementById("canvasDownloadA").href = imgData;
    //         document.getElementById("canvasDownloadA").click();
    //     })
    // }

    render() {
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var arr4 = [];
        var arr5 = [];
        this.props.courseList.map((value, key) => {
            if (value.term == 1) {
                arr1.push(<Link onClick={this.onLessonStyle.bind(this)} to={{ pathname: '/lesson', query: { id: Base64.encodeURI(value.id) } }} key={key}>{value.name}</Link>);
            } else if (value.term == 2) {
                arr2.push(<Link onClick={this.onLessonStyle.bind(this)} to={{ pathname: '/lesson', query: { id: Base64.encodeURI(value.id) } }} key={key}>{value.name}</Link>);
            } else if (value.term == 3) {
                arr3.push(<Link onClick={this.onLessonStyle.bind(this)} to={{ pathname: '/lesson', query: { id: Base64.encodeURI(value.id) } }} key={key}>{value.name}</Link>);
            } else if (value.term == 4) {
                arr4.push(<Link onClick={this.onLessonStyle.bind(this)} to={{ pathname: '/lesson', query: { id: Base64.encodeURI(value.id) } }} key={key}>{value.name}</Link>);
            } else if (value.term == 5) {
                arr5.push(<Link onClick={this.onLessonStyle.bind(this)} to={{ pathname: '/lesson', query: { id: Base64.encodeURI(value.id) } }} key={key}>{value.name}</Link>);
            }
        });
        let styleText = {
            listShow: {
                display: "block",
                width: "172px"
            },
            listHide: {
                display: "none"
            },
            listShow2: {
                display: "block",
            }
        };
        let styleColor = {
            wColor: {
                background: '#49c0e0',
                color: '#fff'
            },
            zColor: {
                background: '#ff6b01',
                color: '#fff'
            },
            yColor: {
                background: '#f5f5f5',
                color: '#606060'
            }
        };
        let styleCartoon = {
            Acartoon: {
                boxShadow: '4px 4px 4px #d5e5e6',
                animation: 'Scale .3s 1 forwards'
            },
            Bcartoon: {
                boxShadow: '0px 0px 0px #d5e5e6',
                animation: 'Scale .3s 0 forwards'
            },
            studentContent: {
                width: "1000px",
                margin: "0 auto"
            },
            zList: {
                // width: "1000px",
                margin: "0 auto"
            }
        };
        let styleName = {
            aname: "(正在进行)",
            bname: "(已修完)",
            cname: ""
        };
        let zb1;
        let zb2;
        let zb3;
        let zb4;
        let zb5;
        if (this.state.nowTerm == 1) {
            zb1 = styleColor.wColor;
            zb2 = styleColor.yColor;
            zb3 = styleColor.yColor;
            zb4 = styleColor.yColor;
            zb5 = styleColor.yColor;
        } else if (this.state.nowTerm == 2) {
            zb1 = styleColor.zColor;
            zb2 = styleColor.wColor;
            zb3 = styleColor.yColor;
            zb4 = styleColor.yColor;
            zb5 = styleColor.yColor;
        } else if (this.state.nowTerm == 3) {
            zb1 = styleColor.zColor;
            zb2 = styleColor.zColor;
            zb3 = styleColor.wColor;
            zb4 = styleColor.yColor;
            zb5 = styleColor.yColor;
        } else if (this.state.nowTerm == 4) {
            zb1 = styleColor.zColor;
            zb2 = styleColor.zColor;
            zb3 = styleColor.zColor;
            zb4 = styleColor.wColor;
            zb5 = styleColor.yColor;
        } else if (this.state.nowTerm == 5) {
            zb1 = styleColor.zColor;
            zb2 = styleColor.zColor;
            zb3 = styleColor.zColor;
            zb4 = styleColor.zColor;
            zb5 = styleColor.wColor;
        } else {
            zb1 = styleColor.zColor;
            zb2 = styleColor.zColor;
            zb3 = styleColor.zColor;
            zb4 = styleColor.zColor;
            zb5 = styleColor.zColor;
        }
        let name1;
        let name2;
        let name3;
        let name4;
        let name5;
        if (this.state.nowTerm == 1) {
            name1 = styleName.aname;
            name2 = styleName.cname;
            name3 = styleName.cname;
            name4 = styleName.cname;
            name5 = styleName.cname;
        } else if (this.state.nowTerm == 2) {
            name1 = styleName.bname;
            name2 = styleName.aname;
            name3 = styleName.cname;
            name4 = styleName.cname;
            name5 = styleName.cname;
        } else if (this.state.nowTerm == 3) {
            name1 = styleName.bname;
            name2 = styleName.bname;
            name3 = styleName.aname;
            name4 = styleName.cname;
            name5 = styleName.cname;
        } else if (this.state.nowTerm == 4) {
            name1 = styleName.bname;
            name2 = styleName.bname;
            name3 = styleName.bname;
            name4 = styleName.aname;
            name5 = styleName.cname;
        } else if (this.state.nowTerm == 5) {
            name1 = styleName.bname;
            name2 = styleName.bname;
            name3 = styleName.bname;
            name4 = styleName.bname;
            name5 = styleName.aname;
        } else {
            name1 = styleName.bname;
            name2 = styleName.bname;
            name3 = styleName.bname;
            name4 = styleName.bname;
            name5 = styleName.bname;
        }
        {/*<span style={this.state.Browser == "1" ? styleText.listHide : styleText.listShow2} title="保存" className="canvasDownload commonButton button" onClick={this.screenshotHandle.bind(this)}><i className="iconfont icon-xiazai"></i>下载课表</span>*/ }
        return (
            <div className='z-navBox'>
                <div className="z-banner">
                    <div className="z-banner1">
                        {
                            this.props.content == null || this.props.content == "" ?
                                null
                                :
                                <div className="z-caption" id="screens">专业介绍</div>
                        }
                        <div className='z-caption-content' style={sessionStorage.getItem("userJudge") == "S" ? styleCartoon.studentContent : null}>{this.props.content}</div>
                        <div className="z-caption" id="screens1">专业章节
                            <a id="canvasDownload" className="canvasDownload commonButton button" style={this.state.Browser == "1" ? styleText.listHide : styleText.listShow2} title="保存" download="课程.png" target="_blank">
                                <i className="iconfont icon-xiazai">

                                </i>
                                下载课表
                            </a>
                        </div>
                        {/*<canvas className="canvas"></canvas>*/}
                        <div className='z-list' id='scShotList' style={sessionStorage.getItem("userJudge") == "S" ? styleCartoon.zList : null}>
                            <ul>
                                <li className='ali' style={arr1.length == 0 ? styleText.listHide : styleText.listShow}>
                                    <div className='z-xueqi' id='1' style={zb1}>第一学期
                                      <span>{name1}</span>
                                    </div>
                                    {arr1}
                                </li>
                                <li className='bli' style={arr2.length == 0 ? styleText.listHide : styleText.listShow}>
                                    <div className='z-xueqi' id='2' style={zb2}>第二学期
                                      <span>{name2}</span>
                                        <div className='z-baffle' style={2 <= this.state.nowTerm || this.state.nowTerm == null ? styleText.listHide : styleText.listShow}></div>
                                    </div>
                                    {arr2}
                                </li>
                                <li className='cli' style={arr3.length == 0 ? styleText.listHide : styleText.listShow}>
                                    <div className='z-xueqi' id='3' style={zb3}>第三学期
                                      <span>{name3}</span>
                                        <div className='z-baffle' style={3 <= this.state.nowTerm || this.state.nowTerm == null ? styleText.listHide : styleText.listShow}></div>
                                    </div>
                                    {arr3}
                                </li>
                                <li className='dli' style={arr4.length == 0 ? styleText.listHide : styleText.listShow}>
                                    <div className='z-xueqi' id='4' style={zb4}>第四学期
                                      <span>{name4}</span>
                                        <div className='z-baffle' style={4 <= this.state.nowTerm || this.state.nowTerm == null ? styleText.listHide : styleText.listShow}></div>
                                    </div>
                                    {arr4}
                                </li>
                                <li className='dli' style={arr4.length == 0 ? styleText.listHide : styleText.listShow}>
                                    <div className='z-xueqi' id='4' style={zb5}>第五学期
                                      <span>{name5}</span>
                                        <div className='z-baffle' style={5 <= this.state.nowTerm || this.state.nowTerm == null ? styleText.listHide : styleText.listShow}></div>
                                    </div>
                                    {arr5}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
