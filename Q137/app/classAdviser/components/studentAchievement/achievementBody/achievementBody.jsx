import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Link } from 'react-router';
import './achievementBody.css';
import '../../../../headMasterComponents/performanceBody/performanceBody.css';
import SchoolGrades from '../../../../headMasterComponents/performanceBody/schoolGrades/schoolGrades.jsx';
import SchoolSynthesis from '../schoolSynthesis/schoolSynthesis.jsx';
import LenovoGrades from '../../../../headMasterComponents/performanceBody/lenovoGrades/lenovoGrades.jsx';
import Quiz from '../../../../headMasterComponents/performanceBody/quiz/quiz.jsx';
import PhaseTest from '../../../../headMasterComponents/performanceBody/phaseTest/phaseTest.jsx';
import LabelSwitching from '../../../../assistantSup/public/labelSwitching/labelSwitching.jsx';
import TermSelect from '../../../../assistantSup/public/termSelect/termSelect.jsx';

export default class AchievementBody extends React.Component{
    constructor() {
        super();
        this.state = {
            listAllSchool: [], // 学校数据
            schoolID: 0, // 学校ID
            schoolName: '', // 学校名字
            schoolTabID: 0, // 班级切换索引
            schoolTeacherName: [], // 学校教师名称
            schoolTDetail: [], // 学校老师数据
            majorVoList: [], // 当前老师的专业集合
            classVoList: [], // 当前老师的班级集合
            prewFlag: false, // 向左图标显示阀门
            nextFlag: false, // 向右图标显示阀门
            nowTerm: 0, // 当前学期
            term: 0, // 选择的学期
            majorName: '', // 专业名字
            className: '', // 班级名字
            classID: 0, // 班级ID
            teacherID: 0, // 老师的ID
            teacherTabID: 0, // 教师切换索引
            classMaster: [], // 班级数据
            classTabID: 0, // 班级切换索引
            termTabID: 0, // 学期切换索引
            termcount: 4, // 班级总学期
            toolID: 0, // 成绩切换索引
            stunum: 0, // 班级总人数
            tool: ['联想期末成绩','小测验','阶段测验','学校综合评价','学校成绩',],
            tabScrollLen: 0, // tab滑动
            userJudge: sessionStorage.getItem("userJudge")
        }
    }
    componentWillMount() {
        $.llsajax({
            url: 'teachManage/listAllSchool',
            type: "POST",
            async: false,
            success: listAllSchool => {
                if (listAllSchool.list.length !== 0) {
                    this.getSchoolTDetailAjax(listAllSchool.list[0].id,false);
                    this.setState({
                        schoolName: listAllSchool.list[0].name,
                    });
                }
                this.setState({
                    listAllSchool: listAllSchool.list,
                });
                if (listAllSchool.list.length >= 4) {
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
        // if (window.location.hash.indexOf('?') > -1) {
        //     let classID = 0;
        //     if (this.state.classMaster.length > 0) {
        //         classID = this.state.classMaster[location.hash.split("a=")[1].split("&")[0]].id;
        //         this.setState({
        //             classID: classID
        //         });
        //     }
        //     let term = Number(location.hash.split("s=")[1].split("&")[0]);
        //     this.setState({
        //         termTabID: term - 1,
        //         classTabID: Number(location.hash.split("a=")[1].split("&")[0]),
        //         toolID: Number(location.hash.split("t=")[1].split("&")[0]),
        //         term: Number(location.hash.split("s=")[1].split("&")[0])
        //     });
        //     this.onRenderDom(Number(location.hash.split("t=")[1].split("&")[0]),term,classID,Number(location.hash.split("a=")[1].split("&")[0]));
        // }
    }
    // 获取学校教师详情
    getSchoolTDetailAjax(schoolID,flag) {
        $.llsajax({
            url: 'teachManage/schoolTDetail',
            type: "POST",
            async: false,
            data: {
                schoolid: schoolID
            },
            success: schoolTDetail => {
                let schoolTeacherName = [];
                if (schoolTDetail.list.length > 0) {
                    schoolTDetail.list.forEach((value, index) => {
                        schoolTeacherName.push(value.name);
                    });
                    this.setState({
                        schoolTDetail: schoolTDetail.list,
                        majorVoList: schoolTDetail.list[0].majorVoList,
                        classVoList: schoolTDetail.list[0].majorVoList[0].classVoList,
                        classID: schoolTDetail.list[0].majorVoList[0].classVoList[0].classId,
                        teacherID: schoolTDetail.list[0].id,
                        nowTerm: schoolTDetail.list[0].majorVoList[0].classVoList[0].termNow,
                        term: schoolTDetail.list[0].majorVoList[0].classVoList[0].termNow,
                        className: schoolTDetail.list[0].majorVoList[0].classVoList[0].className,
                        majorName: schoolTDetail.list[0].majorVoList[0].majorname,
                        stunum: schoolTDetail.list[0].majorVoList[0].classVoList[0].stucount
                    });
                    if (flag) {
                        this.onRenderDom(this.state.toolID,schoolTDetail.list[0].majorVoList[0].classVoList[0].termNow,schoolTDetail.list[0].majorVoList[0].classVoList[0].classId,this.state.schoolTabID);
                        if (this.state.userJudge !== "MM") {
                            ReactDOM.unmountComponentAtNode(document.getElementById("performanceBody_LabelSwitching"));
                            ReactDOM.render(
                                <LabelSwitching
                                    tabArr={schoolTeacherName}
                                    onTabClick={this.onTabClick.bind(this)}
                                />,
                                document.getElementById("performanceBody_LabelSwitching")
                            );
                        }
                    }
                } else {
                    this.setState({
                        schoolTDetail: schoolTDetail.list,
                        majorVoList: [],
                        classVoList: [],
                        classID: 0,
                        teacherID: 0,
                        nowTerm: 0,
                        term: 0,
                    });
                }
                this.setState({
                    schoolTeacherName: schoolTeacherName
                });
            }
        });
    }
    _showSchoolName() {
        return this.state.listAllSchool.map((value,index) => {
            return (
                <span style={this.state.classMaster.length === 1 ? {width: "550"} : {width: "255"}} key={index} className={this.state.schoolTabID === index ? "Active" : ""} onClick={this.onSchoolClick.bind(this,index,value.id,value.name)}>{value.name}</span>
            );
        });
    }
    onSchoolClick(index,schoolID,schoolName) {
        if (this.state.schoolTabID !== index) {
            this.state.schoolTabID = index;
            this.setState({
                schoolTabID: this.state.schoolTabID,
                schoolID: schoolID,
                schoolName: schoolName
            });
            this.getSchoolTDetailAjax(schoolID,true);
            // if (history.pushState) {
            //     history.replaceState(null, '', location.href.split("?")[0] + '?a=' + index + '&s=' + this.state.term  + '&t=' + this.state.toolID);
            // }
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
        // if (history.pushState) {
        //     history.replaceState(null, '', location.href.split("?")[0] + '?a=' + this.state.classTabID + '&s=' + this.state.term + '&t=' + key);
        // }
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
                    <SchoolSynthesis
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
                        flag={"CM"}
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

    // 选择学期
    onTermClick(term) {
        this.setState({
            term: term + 1
        });
        this.onRenderDom(this.state.toolID,term + 1,this.state.classID,this.state.schoolTabID);
    }
    // 标签左滑动
    onTabPrew () {
        let schoolLen = this.state.listAllSchool.length;
        if (schoolLen <= 4 || this.state.prewFlag === false) {
            return false;
        }
        let schoolNum = this.state.tabScrollLen;
        let nums = schoolNum - 2;
        if (nums < schoolNum && nums >= 0) {
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
        let schoolLen = this.state.listAllSchool.length;
        if (schoolLen <= 4 || this.state.nextFlag === false) {
            return false;
        }
        let schoolNum = this.state.tabScrollLen;
        let nums = Number(schoolNum) + 2;
        if (nums > 1) {
            this.setState({
                prewFlag: true,
            });
        }
        if (nums >= schoolLen - 4) {
            nums = schoolLen - 4;
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
    // 标签点击事件 切换教师
    onTabClick(key) {
        if (this.state.teacherTabID !== key) {
            this.setState({
                majorVoList: this.state.schoolTDetail[key].majorVoList,
                teacherID: this.state.schoolTDetail[key].id,
                classVoList: this.state.schoolTDetail[key].majorVoList[0].classVoList,
                nowTerm: this.state.schoolTDetail[key].majorVoList[0].classVoList[0].termNow,
                term: this.state.schoolTDetail[key].majorVoList[0].classVoList[0].termNow,
                classID: this.state.schoolTDetail[key].majorVoList[0].classVoList[0].classId,
                className: this.state.schoolTDetail[key].majorVoList[0].classVoList[0].className,
                majorName: this.state.schoolTDetail[key].majorVoList[0].majorname,
                teacherTabID: key,
                stunum: this.state.schoolTDetail[key].majorVoList[0].classVoList[0].stucount
            });
            this.onRenderDom(this.state.toolID,this.state.schoolTDetail[key].majorVoList[0].classVoList[0].termNow,this.state.schoolTDetail[key].majorVoList[0].classVoList[0].classId,this.state.schoolTabID);
        }
    }

    // 显示专业
    _majorOption() {
        return this.state.majorVoList.map((value,index) => {
            return (
                <option key={index} value={value.majorid} data-name={value.majorname}>&nbsp;{value.majorname}</option>
            )
        })
    }

    // 显示班级
    _classOption() {
        return this.state.classVoList.map((value,index) => {
            return (
                <option key={index} value={value.classId}>&nbsp;{value.className}</option>
            )
        })
    }

    // 切换专业
    selectMajorChange(e) {
        let majorID = Number(e.target.value);
        let classVoList = [];
        let majorName = '';
        this.state.majorVoList.map((value) => {
            if (value.majorid === majorID) {
                classVoList = value.classVoList;
                majorName = value.majorname
            }
        });
        this.setState({
            majorID: majorID,
            classVoList: classVoList,
            classID: classVoList[0].classId,
            nowTerm: classVoList[0].termNow,
            className: classVoList[0].className,
            majorName: majorName,
            stunum: classVoList[0].stucount
        });
        this.onRenderDom(this.state.toolID,classVoList[0].termNow,classVoList[0].classId,this.state.schoolTabID);
    }

    // 切换班级
    selectClassChange(e) {
        let classID = Number(e.target.value);
        let termNow = 0;
        let className = '';
        let stunum = 0;
        this.state.classVoList.map((value) => {
            if (value.classId === classID) {
                termNow = value.termNow;
                className = value.className,
                stunum = value.stucount
            }
        });
        this.setState({
            nowTerm: termNow,
            className: className,
            classID: classID,
            stunum: stunum
        });
        this.onRenderDom(this.state.toolID,termNow,classID,this.state.schoolTabID);
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
                                        {this._showSchoolName()}
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
                    {
                        this.state.userJudge === "MM" ?
                            null
                            :
                            <div id="performanceBody_LabelSwitching">
                                <LabelSwitching
                                    tabArr={this.state.schoolTeacherName}
                                    onTabClick={this.onTabClick.bind(this)}
                                />
                            </div>
                    }
                    <div className="performanceBody_msg_box">
                        <div className="performanceBody_msg_select">
                            <span className="performanceBody_msg_span">选择专业:</span>
                            <select name="" id="performanceBody_msg_selectMajor" className="performanceBody_paper" onChange={this.selectMajorChange.bind(this)}>
                                {this._majorOption()}
                            </select>
                            <span className="performanceBody_msg_span performanceBody_msg_span_diff">选择班级:</span>
                            <select name="" id="performanceBody_msg_selectClass" className="performanceBody_paper" onChange={this.selectClassChange.bind(this)}>
                                {this._classOption()}
                            </select>
                        </div>
                    </div>
                    {/* <div className="performanceBody_top">
                        <i className="iconfont icon-dingwei">

                        </i>
                        <span className="performanceBody_topSchoolTop">学校：{this.state.schoolName || '--'}</span>
                        <span className="performanceBody_topMajorTop">专业：{this.state.majorName || '--'}</span>
                        <span className="performanceBody_topClassTop">班级：{this.state.className || '--'}</span>
                        <span className="performanceBody_topClassTop">共（{this.state.stunum}）人</span>
                    </div> */}
                    <div className="performanceBody_term">
                        <TermSelect
                            nowTerm={this.state.nowTerm}
                            term={this.state.term}
                            onTermClick={this.onTermClick.bind(this)}
                        />
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
