import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Link } from 'react-router';
import './performanceBody.css';
import SchoolGrades from './schoolGrades/schoolGrades.jsx';
import SchoolAssessment from './schoolAssessment/schoolAssessment.jsx';
import LenovoGrades from './lenovoGrades/lenovoGrades.jsx';
import Quiz from './quiz/quiz.jsx';
import PhaseTest from './phaseTest/phaseTest.jsx';

export default class PerformanceBody extends React.Component{
    constructor() {
        super();
        this.state = {
            termArr: ['第一学期','第二学期','第三学期','第四学期','第五学期'],
            classMaster: [], // 班级数据
            nowTerm: 0, // 当前学期
            term: 0, // 选择的学期
            classTabID: 0, // 班级切换索引
            termTabID: 0, // 学期切换索引
            schoolName: '', // 学校名字
            majorName: '', // 专业名字
            className: '', // 班级名字
            classID: 0, // 班级ID
            termcount: 4, // 班级总学期
            toolID: 0, // 成绩切换索引
            stunum: 0, // 班级总人数
            tool: ['联想期末成绩','小测验','阶段测验','学校综合评价','学校成绩',],
            tabScrollLen: 0, // tab滑动
            prewFlag: false, // 向左图标显示阀门
            nextFlag: false, // 向右图标显示阀门
        }
    }
    componentWillMount() {
        $.llsajax({
            url: 'classmaster/statistics',
            type: "POST",
            async: false,
            success: statisticsData => {
                this.setState({
                    classMaster: statisticsData.classMaster
                });
                if (statisticsData.classMaster.length !== 0) {
                    this.setState({
                        nowTerm: Number(statisticsData.classMaster[0].term),
                        term: Number(statisticsData.classMaster[0].term),
                        termTabID: Number(statisticsData.classMaster[0].term - 1),
                        schoolName: statisticsData.classMaster[0].schoolname,
                        majorName: statisticsData.classMaster[0].majorname,
                        className: statisticsData.classMaster[0].name,
                        classID: statisticsData.classMaster[0].id,
                        termcount: statisticsData.classMaster[0].termcount,
                        stunum: statisticsData.classMaster[0].stunum
                    });
                }
                if (statisticsData.classMaster.length >= 4) {
                    this.setState({
                        prewFlag: false, // 向左图标显示阀门
                        nextFlag: true, // 向右图标显示阀门
                    });
                } else {
                    this.setState({
                        prewFlag: false, // 向左图标显示阀门
                        nextFlag: false, // 向右图标显示阀门
                    });
                }
            }
        });
    }
    componentDidMount() {
        let classNode = document.getElementById("performanceBody_titleBar");
        $(window).scroll(function () {
            if ($(window).scrollTop() > 144) {
                classNode.style.position = 'fixed';
                classNode.style.top = "37px";
                classNode.style.left = "0px";
                classNode.style.zIndex = "50";
                classNode.style.boxShadow = "rgba(0, 0, 0, 0.072392) 0px 2px 5px";
                classNode.style.webkitBoxShadow = "rgba(0, 0, 0, 0.072392) 0px 2px 5px";
                classNode.style.msBoxShadow = "rgba(0, 0, 0, 0.072392) 0px 2px 5px";
            } else {
                classNode.style.position = '';
                classNode.style.boxShadow = '';
            }
        });
        if (window.location.hash.indexOf('?') > -1) {
            let classID = 0;
            if (this.state.classMaster.length > 0) {
                classID = this.state.classMaster[location.hash.split("a=")[1].split("&")[0]].id;
                this.setState({
                    classID: classID
                });
            }
            let term = Number(location.hash.split("s=")[1].split("&")[0]);
            this.setState({
                termTabID: term - 1,
                classTabID: Number(location.hash.split("a=")[1].split("&")[0]),
                toolID: Number(location.hash.split("t=")[1].split("&")[0]),
                term: Number(location.hash.split("s=")[1].split("&")[0])
            });
            this.onRenderDom(Number(location.hash.split("t=")[1].split("&")[0]),term,classID,Number(location.hash.split("a=")[1].split("&")[0]));
        }
    }
    _showClassName() {
        return this.state.classMaster.map((value,index) => {
            return (
                <span style={this.state.classMaster.length === 1 ? {width: "550"} : {width: "255"}} key={index} className={this.state.classTabID === index ? "Active" : ""} onClick={this.onClassClick.bind(this,index,value.id)}>{value.name}</span>
            );
        });
    }
    onClassClick(index,classID) {
        this.setState({
            classTabID: index,
            classID: classID
        });
        if (this.state.classTabID !== index) {
            this.onRenderDom(this.state.toolID,this.state.term,classID,index);
            if (history.pushState) {
                history.replaceState(null, '', location.href.split("?")[0] + '?a=' + index + '&s=' + this.state.term  + '&t=' + this.state.toolID);
            }
            this.setState({
                nowTerm: Number(this.state.classMaster[index].term),
                schoolName: this.state.classMaster[index].schoolname,
                majorName: this.state.classMaster[index].majorname,
                className: this.state.classMaster[index].name,
                termcount: this.state.classMaster[index].termcount,
                stunum: this.state.classMaster[index].stunum
            });
        }
    }
    // term
    _showTermData() {
        return this.state.termArr.map((value,index) => {
            if (index + 1 <= this.state.nowTerm) {
                return (
                    <span key={index} className={this.state.termTabID === index  ? "Active" : ""} onClick={this.onTermClick.bind(this,index)}>{this.state.nowTerm === index + 1 ? value + "(本学期)" : value}</span>
                );
            }
        });
    }
    onTermClick(index) {
        this.setState({
            termTabID: index,
            term: index + 1
        });
        if (this.state.termTabID !== index) {
            this.onRenderDom(this.state.toolID,index + 1,this.state.classID,this.state.classTabID);
            if (history.pushState) {
                history.replaceState(null, '', location.href.split("?")[0] + '?a=' + this.state.classTabID + '&s=' + (index + 1)  + '&t=' + this.state.toolID);
            }
        }
    }
    onSelectToolShow() {
        return this.state.tool.map((value,index) => {
            return (
                <span onClick={this.onSelectTool.bind(this,index)} key={index} className={this.state.toolID === index ? "Active" : ""}>{value}</span>
            );
        });
    }
    // tool event
    onSelectTool(key) {
        this.setState({
            toolID: key,
        });
        this.onRenderDom(key,this.state.term,this.state.classID,this.state.classTabID);
        if (history.pushState) {
            history.replaceState(null, '', location.href.split("?")[0] + '?a=' + this.state.classTabID + '&s=' + this.state.term + '&t=' + key);
        }
    }
    onRenderDom(key,term,classid,tabID) {
        let SproclsName = this.state.className;
        let SprostuCount = this.state.stunum;
        // if (key === this.state.toolID) {
        //     return false;
        // }
        switch(key) {
            case 0:
                ReactDOM.unmountComponentAtNode(document.getElementById("performanceBody_Center"));
                ReactDOM.render(
                    <LenovoGrades
                        classID={classid}
                        term={term}
                        schoolname={this.state.schoolName}
                        majorname={this.state.majorName}
                        tabID={tabID}
                        toolID={key}
                        clsName={SproclsName}
                        stuCount={SprostuCount}
                    />,
                    document.getElementById("performanceBody_Center")
                );
                break;
            case 3:
                ReactDOM.unmountComponentAtNode(document.getElementById("performanceBody_Center"));
                ReactDOM.render(
                    <SchoolAssessment
                        classID={classid}
                        term={term}
                        schoolname={this.state.schoolName}
                        majorname={this.state.majorName}
                        tabID={tabID}
                        toolID={key}
                        clsName={SproclsName}
                        stuCount={SprostuCount}
                    />,
                    document.getElementById("performanceBody_Center")
                );
                break;
            case 4:
                ReactDOM.unmountComponentAtNode(document.getElementById("performanceBody_Center"));
                ReactDOM.render(
                    <SchoolGrades
                        classID={classid}
                        term={term}
                        schoolname={this.state.schoolName}
                        majorname={this.state.majorName}
                        tabID={tabID}
                        toolID={key}
                        clsName={SproclsName}
                        stuCount={SprostuCount}
                    />,
                    document.getElementById("performanceBody_Center")
                );
                break;
            case 1:
                ReactDOM.unmountComponentAtNode(document.getElementById("performanceBody_Center"));
                ReactDOM.render(
                    <Quiz
                        classID={classid}
                        term={term}
                        schoolname={this.state.schoolName}
                        majorname={this.state.majorName}
                        tabID={tabID}
                        toolID={key}
                        clsName={SproclsName}
                        stuCount={SprostuCount}
                    />,
                    document.getElementById("performanceBody_Center")
                );
                break;
            case 2:
                ReactDOM.unmountComponentAtNode(document.getElementById("performanceBody_Center"));
                ReactDOM.render(
                    <PhaseTest
                        classID={classid}
                        term={term}
                        schoolname={this.state.schoolName}
                        majorname={this.state.majorName}
                        tabID={tabID}
                        toolID={key}
                        clsName={SproclsName}
                        stuCount={SprostuCount}
                    />,
                    document.getElementById("performanceBody_Center")
                );
                break;
        }
    }
    // 标签左滑动
    onTabPrew () {
        // let classLen = this.state.classMaster.length;
        // if (classLen <= 4 || this.state.prewFlag === false) {
        //     return false;
        // }
        // let classNum = this.state.tabScrollLen;
        // let nums = Number(classNum) + 2;
        // if (nums > 1) {
        //     this.setState({
        //         nextFlag: true,
        //     });
        // }
        // if (nums > classLen - 4) {
        //     nums = classLen - 4;
        //     this.setState({
        //         prewFlag: false,
        //     });
        // }
        // let dis = -1 * nums * 255;
        // this.refs.performanceBody_titleWrap_scroll.style.transform = "translate3d(" + dis + "px, 0px, 0px)";
        // this.setState({
        //     tabScrollLen: nums
        // })
        let classLen = this.state.classMaster.length;
        if (classLen <= 4 || this.state.prewFlag === false) {
            return false;
        }
        let classNum = this.state.tabScrollLen;
        let nums = classNum - 2;
        if (nums < classNum && nums >= 0) {
            this.setState({
                nextFlag: true,
            });
        }
        if (nums <= 0) {
            nums = 0;
            this.setState({
                prewFlag: false,
            });
        }
        let dis = -1 * nums * 255;
        this.refs.performanceBody_titleWrap_scroll.style.transform = "translate3d(" + dis + "px, 0px, 0px)";
        this.setState({
            tabScrollLen: nums
        })
    }
    // 标签右滑动
    onTabNext () {
        // let classLen = this.state.classMaster.length;
        // if (classLen <= 4 || this.state.nextFlag === false) {
        //     return false;
        // }
        // let classNum = this.state.tabScrollLen;
        // let nums = classNum - 2;
        // if (nums < classNum) {
        //     this.setState({
        //         prewFlag: true,
        //     });
        // }
        // if (nums <= 0) {
        //     nums = 0;
        //     this.setState({
        //         nextFlag: false,
        //     });
        // }
        // let dis = -1 * nums * 255;
        // this.refs.performanceBody_titleWrap_scroll.style.transform = "translate3d(" + dis + "px, 0px, 0px)";
        // this.setState({
        //     tabScrollLen: nums
        // })
        let classLen = this.state.classMaster.length;
        if (classLen <= 4 || this.state.nextFlag === false) {
            return false;
        }
        let classNum = this.state.tabScrollLen;
        let nums = Number(classNum) + 2;
        if (nums > 1) {
            this.setState({
                prewFlag: true,
            });
        }
        if (nums > classLen - 4) {
            nums = classLen - 4;
            this.setState({
                nextFlag: false,
            });
        }
        let dis = -1 * nums * 255;
        this.refs.performanceBody_titleWrap_scroll.style.transform = "translate3d(" + dis + "px, 0px, 0px)";
        this.setState({
            tabScrollLen: nums
        })
    }
    render() {
        return (
            <div className="performanceBody_box">
                <div className="performanceBody_titleBox">
                    <div className="performanceBody_titleBar" id="performanceBody_titleBar">
                        <div className="performanceBody_titleWrap">
                            <div className="performanceBody_titleContainer">
                                <div className="performanceBody_titleWrap_scrollCen">
                                    <div className="performanceBody_titleWrap_scroll" ref="performanceBody_titleWrap_scroll">
                                        {this._showClassName()}
                                    </div>
                                </div>
                                <span className={this.state.prewFlag ? "performanceBody_prew performanceBody_tabSpan iconfont icon-icon-test3" : "performanceBody_prew performanceBody_tabSpan iconfont icon-icon-test3 performanceBody_prewNone"} onClick={this.onTabPrew.bind(this)}>

                                </span>
                                <span className={this.state.nextFlag ? "performanceBody_next performanceBody_tabSpan iconfont icon-icon-test2" : "performanceBody_next performanceBody_tabSpan iconfont icon-icon-test2 performanceBody_nextNone"} onClick={this.onTabNext.bind(this)}>

                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="performanceBody_wrap">
                    <h2>学员成绩</h2>
                    <div className="performanceBody_top">
                        <i className="iconfont icon-dingwei">

                        </i>
                        <span className="performanceBody_topSchoolTop">学校：{this.state.schoolName || '--'}</span>
                        <span className="performanceBody_topMajorTop">专业：{this.state.majorName || '--'}</span>
                        <span className="performanceBody_topClassTop">班级：{this.state.className || '--'}</span>
                        <span className="performanceBody_topClassTop">共({this.state.stunum})人</span>
                    </div>
                    <div className="performanceBody_term">
                        {this._showTermData()}
                    </div>
                    <div className="performanceBody_tool">
                        {this.onSelectToolShow()}
                    </div>
                    <div id="performanceBody_Center">
                        <LenovoGrades
                            classID={this.state.classID}
                            term={this.state.term}
                            schoolname={this.state.schoolName}
                            majorname={this.state.majorName}
                            tabID={this.state.classTabID}
                            toolID={this.state.toolID}
                            clsName={this.state.className}
                            stuCount={this.state.stunum}
                        />
                    </div>
                </div>
            </div>
        );
    }
    componentWillUnmount() {
        $(window).off('scroll');
    }
}
