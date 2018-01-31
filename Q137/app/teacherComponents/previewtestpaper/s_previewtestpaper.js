import React from 'react';
import $ from 'jquery';
import '../../components/classHour/classContent/examination/s_radiocheckbutton.css';
import './s_previewtestpaper.css';
import S_previewtestItem0 from './s_previewtestItem0.js';
import S_previewtestItem1 from './s_previewtestItem1.js';
import S_previewtestItem2 from './s_previewtestItem2.js';
import {
    Link,
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect,
    browserHistory
} from 'react-router';

export default class s_previewtestpaper extends React.Component {
    constructor() {
        super();
        this.state = {
            id: Base64.decode(location.hash.split("?id=")[1].split("&")[0]),
            data: [],
            exList0: [],
            exList1: [],
            exList2: [],
            score0: [],
            score1: [],
            score2: [],
            exLength: [],
            ex0Length: [],
            ex1Length: [],
            createName: location.hash.indexOf("&zf=f") != -1 ? "联想试卷组" : "--",
            toTalSocre: [],
            paper_name: []
        }
        //  this.Pajax();
    }

    shierdian() {
        var arrayList = this.state.answer;
        var fatherindex = this.state.zcindex;
    }

    componentWillMount() {
        this.Pajax()
    }

    Pajax() {
        $.llsajax({
            url: "examInationPaper/paperPreview",
            type: "post",
            cache: true,
            async: true,
            data: {
                id: this.state.id
            },
            success: bodyques => {

                let List0 = [];
                let List1 = [];
                let List2 = [];
                this.setState({
                    data: bodyques.questions != null ? bodyques.questions : [],
                    exLength: bodyques.questions.length,
                    createName: bodyques.paper.createrName ? bodyques.paper.createrName : "联想试卷组",
                    toTalSocre: bodyques.paper.toTalSocre,
                    paper_name: bodyques.paper.paper_name

                })

                this.state.data.map((index, key) => {
                    if (index.type == 1) {
                        List0.push(index);
                        this.setState({
                            score0: index.score
                        })
                    } else if (index.type == 2) {
                        List1.push(index);
                        this.setState({
                            score1: index.score
                        })
                    } else if (index.type == 3) {
                        List2.push(index);
                        this.setState({
                            score2: index.score
                        })
                    }
                    else {

                    }
                })
                this.setState({
                    exList0: List0,
                    ex0Length: List0.length,
                    exList1: List1,
                    ex1Length: List1.length,
                    exList2: List2,
                    ex2Length: List2.length,
                })
            }
        })

    }

    onTopTo() {
        $('html,body').animate({
            scrollTop: 0
        }, '600');
    }

    componentDidMount() {
        let _this = this;
        window.canAutoScroll = true;
        //只要滚动事件发生，就停止自动滚动定位方法的执行
        var timeout = null;
        var panel = $(window);
        panel.scroll(function () {
            if (timeout != null) {
                window.clearTimeout(timeout);
            }
            window.canAutoScroll = false;
            //500ms后，假定认为停止滚动
            timeout = window.setTimeout(function () {
                window.canAutoScroll = true;
            }, 100);
        });
        this.timer = setInterval(
            () => {
                var scrollNum = $(window).scrollTop();
                if (scrollNum > 800) {
                    if (window.canAutoScroll) {
                        $(".paperlearningLog_TopToCenter").fadeIn(2000);
                    } else {
                        $(".paperlearningLog_TopToCenter").css({
                            display: "none"
                        });
                    }
                } else {
                    $(".paperlearningLog_TopToCenter").css({
                        display: "none",
                    });
                }
            },
            100
        );

    }

    backto() {
        history.go(-1);
    }

    render() {

        let props = {
            exList0: this.state.exList0,
            exList1: this.state.exList1,
            exList2: this.state.exList2,
            ex0Length: this.state.ex0Length,
            ex1Length: this.state.ex1Length,
            ex2Length: this.state.ex2Length,
            exLength: this.state.exLength,

        }
        let exList0style = {
            display: this.state.exList0.length == 0 ? "none" : "block"
        }
        let exList1style = {
            display: this.state.exList1.length == 0 ? "none" : "block"
        }
        let exList2style = {
            display: this.state.exList2.length == 0 ? "none" : "block"
        }
        return (<div className="spre-questionBody">
            <div className="spre-thQuBody">
                <div className="spre-questitle">
                    <span className="spre-cubiud"> </span><span className="spre-information">预览试卷</span>
                    <a className="spreview_backto" onClick={this.backto.bind(this)}><span
                        className="backtoSpan">返回</span>
                        <span className="backtoicon iconfont icon-back Sproiconback"></span>
                    </a>
                </div>
                {/*这是下拉框的html*/}
                <div className="spre-thSelect">
                    <div className="spre-thselection1">

                    </div>
                    <div className="spre-thselection">

                        <div className="spre-thSelects3">
                            <h1>
                                {this.state.paper_name}
                            </h1>
                            {/*
                    <Link className = "spre_examResult" to={{pathname:"/teacherExamResultstatistics",query:{id:this.state.id}}}> 结果统计 < /Link>*/}
                            <div className="spre_message">
                                <span> <b> 创建人: </b><i> {this.state.createName}</i> </span>
                                <span> <b> 满分: </b><i> {this.state.toTalSocre != null ? this.state.toTalSocre : 0}分</i> </span>
                                <span> <b> 题量: </b><i> {this.state.exLength}道</i> </span></div>
                        </div>
                    </div>
                </div>
                {/*这是列表页的html*/} {/* 单选题样式*/}
                <div className="spre_danxuan" style={exList0style}><h2> 一、 单选题 </h2><span>(共{this.state.exList0.length}道,每题{this.state.score0}分)</span>
                </div>
                {
                    this.state.exList0.map((index, i) => {
                        return <S_previewtestItem0 key={i} {...index} zcindex={i} {...this.props}
                                                   exLength={this.state.exLength}
                                                   shierdian={this.shierdian.bind(this)}
                        />
                    })
                }
                <div className="spre_duoxuan" style={exList1style}><h2> 二、 多选题 </h2><span>(共{this.state.exList1.length}道,每题{this.state.score1}分)</span>
                </div>
                {this.state.exList1.map((index, i) => {
                    return <S_previewtestItem1 key={i} {...index} zcindex={i} {...this.props}
                                               exLength={this.state.exLength} Item={this.state.exList0.length}
                    />
                })
                }
                <div className="spre_duoxuan" style={exList2style}><h2> 三、 简答题 </h2><span>(共{this.state.exList2.length}道,每题{this.state.score2}分)</span>
                </div>
                {this.state.exList2.map((index, i) => {
                    return <S_previewtestItem2 key={i} {...index} zcindex={i} {...this.props}
                                               exLength={this.state.exLength}
                                               Item={this.state.exList0.length + this.state.exList1.length}
                    />
                })
                }
                <div className="paperlearningLog_TopTo">
                    <span className="paperlearningLog_TopToCenter SprosatTopto"
                          onClick={this.onTopTo.bind(this)}></span>
                </div>
            </div>

        </div>);
    }
}
