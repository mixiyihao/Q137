import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery';
import './edit.css'
import { Link, hashHistory } from 'react-router';
import url from '../../../../controller/url.js';
import TeacherComp from '../../../../teacherComponents/teacherPublic/teacherComp.js';
import Footer from '../../../../components/public/footer/footer.js';
import TeacherWork from '../../../../teacherComponents/teacherWork/teacherWork.jsx';
import HeadMasterTitle from '../../../headMasterTitle/headMasterTitle.jsx';
export default class EditInterview extends React.Component {

    constructor() {
        super();
        this.state = {
            stuName: '',//学生姓名
            stuNo: '',//学号
            stuId: '',//学生id
            sc: '',//学校
            m: '',//专业
            noTerm: '',//当前学期
            class: '',//班级
            i: '',//编辑访谈的id
            timeStr: '',//当前时间字符串
            timeC: 0,//当前时间戳
            timeS: 0,//可修改日期下限
            timeE: 0,//可修改日期上限
            banLeft: false,
            banRight: true,
            redFork: false,
            redForkMsg: '修改访谈成功',
            textareaVals: '',
        }

    }
    componentWillMount() {
        var hash = window.location.hash;
        var id = '';
        if (hash.indexOf('?i=') > 0) {
            id = Base64.decode(hash.split('?i=')[1].split('&')[0]);
        }
        this.setState({
            i: id,
        })
        this.getAjax(id)
    }
    render() {
        let redFork = {
            display: this.state.redFork == true ? "inline-block" : "none"
        }
        return (
            <div>
                <TeacherComp sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                    onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)} />
                <HeadMasterTitle title={"学员管理"} />
                <div className="eD_manageBody">
                    <div className="eD_manageWrap" id="eD_manageWrap">
                        <div className="eD_interviewWrap">
                            <h2>修改访谈
                                <span className="goback" onClick={this.linkTo.bind(this)}>返回<i className="iconfont icon-back"></i></span>
                            </h2>
                            <p className="eD_interviewMessage">
                                <span className="eD_interviewName">{this.state.stuName}</span>
                                <span>{this.state.stuNo}</span>
                                <div>
                                    <span>学校：{this.state.sc}</span>
                                    <span>专业：{this.state.m}</span>
                                    <span>班级：{this.state.class}</span>
                                </div>
                            </p>
                            <div className="eD_interviewCommitBox">
                                <div className="eD_interviewTimePick">
                                    <i className="eD_interviewFixedIt">*</i>
                                    <i className="eD_intTime">访谈时间:</i>
                                    <p className="eD_findTime">
                                        <a className={this.state.banLeft == true ? "eD_goFrontDay iconfont icon-riqizuo eD_uselessBtn" : "eD_goFrontDay iconfont icon-riqizuo"} onClick={this.goFrontDay.bind(this)}></a>
                                        <a className={this.state.banRight == true ? "eD_goEndDay iconfont icon-riqiyou eD_uselessBtn" : "eD_goEndDay iconfont icon-riqiyou"} onClick={this.goEndDay.bind(this)}></a>
                                        <span>{this.state.timeStr}<i className="iconfont"></i></span>
                                    </p>
                                </div>
                                <div className="eD_interviewContent">
                                    <i className="eD_interwiewFixedIt">*</i>
                                    输入内容:
                                    <textarea name="" id="" placeholder="请输入访谈结果" onChange={this.changeText.bind(this)}
                                        value={this.state.textareaVals}></textarea>
                                </div>
                                <a className="eD_interviewSave commonButton button" onClick={this.saveHandle.bind(this)}>提交</a>
                                <span className="eD_tipErr" style={redFork}><i className="eD_redFork">×</i>{this.state.redForkMsg}</span>
                            </div>
                            <div className='sucorerr' >
                                <span className={this.state.disSucOrErr == true ? 'sOeShow' : 'sOeHide'}><i className="iconfont icon-xiaoxizhongxin-"></i>访谈数据保存成功</span>
                            </div>
                        </div>
                    </div>
                </div>
                <TeacherWork />
                <Footer />
            </div>
        )
    }
    changeText(e) {
        this.setState({
            textareaVals: e.target.value,
        })
    }
    getAjax(id) {
        $.llsajax({
            url: 'Luser/findInterviewById',
            type: "POST",
            data: {
                id: id
            },
            success: data => {
                var dataItem = data.map.interview
                this.setState({
                    stuName: data.map.studentname || '--',
                    stuNo: data.map.studentnum || '--',
                    stuId: dataItem.userId,
                    sc: data.map.schoolname,
                    m: data.map.majorname,
                    noTerm: dataItem.term,
                    class: data.map.classname,
                    textareaVals: dataItem.content,
                })
                var timeCurrent = Date.parse(new Date(dataItem.interdate));
                var timeItem = dataItem.createtime
                var timeEnd = Date.parse(new Date(timeItem))
                var timeStart = Date.parse(new Date(timeItem)) - 3 * 86400000;
                this.setState({
                    timeStr: dataItem.interdate.replace(/\//g, '-'),
                    timeE: timeEnd,
                    timeS: timeStart,
                    timeC: timeCurrent,
                })
                if (timeCurrent <= Number(timeStart) + 86400000) {
                    this.setState({
                        banLeft: true,
                        banRight: false,
                    })
                }
                if (timeCurrent >= timeEnd - 86400000) {
                    this.setState({
                        banLeft: false,
                        banRight: true,
                    })
                }
            }
        })
    }
    // 切换时间
    goFrontDay() {
        var startLine = this.state.timeS;
        var endLine = this.state.timeE;
        var current = this.state.timeC;
        var current = current - 86400000
        if (current <= Number(startLine)) {
            this.setState({
                banLeft: true,
            })
            return false;
        }
        var date = new Date(current);
        var y = date.getFullYear();
        var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var time2 = y + '-' + m + '-' + d
        this.setState({
            timeStr: time2,
            timeC: current,
            banRight: false,
        })
        if (current - 86400000 <= Number(startLine)) {
            this.setState({
                banLeft: true,
            })
        }
    }
    goEndDay() {
        var startLine = this.state.timeS;
        var endLine = this.state.timeE;
        var current = this.state.timeC;
        var current = Number(current) + 86400000
        if (current > endLine) {
            this.setState({
                banRight: true,
            })
            return false;
        }
        if (current == endLine) {
            this.setState({
                banRight: true,
            })
        }
        var date = new Date(current);
        var y = date.getFullYear();
        var m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var time2 = y + '-' + m + '-' + d
        this.setState({
            timeStr: time2,
            timeC: current,
        })
        if (current < Number(startLine) + 86400000) {
            this.setState({
                banLeft: true,
                banRight: false,
            })
        } else {
            this.setState({
                banLeft: false,
            })
        }
        if (current >= endLine - 86400000) {
            this.setState({
                banRight: true,
            })
        }
    }
    // 保存
    saveHandle() {
        var vals = this.state.textareaVals;
        if (vals == '') {
            this.setState({
                redFork: true,
                redForkMsg: '访谈内容不能为空'
            })
        } else {
            this.setState({
                redFork: false
            })
            $.llsajax({
                url: 'Luser/insertInterview',
                type: "POST",
                data: {
                    id: this.state.i,
                    userId: this.state.stuId,
                    interdate: this.state.timeStr.replace(/\//g, '-'),
                    content: vals,
                    term: this.state.noTerm,
                },
                success: date => {
                    this.setState({
                        disSucOrErr: true,
                    })
                    var _This = this;
                    setTimeout(function () {
                        _This.setState({
                            disSucOrErr: false
                        })
                        var hash = window.location.hash;
                        var str = '?b=' + hash.split('?i=')[1].split('&b=')[1]
                        hashHistory.push("/managePage" + str);
                    }, 2000)
                }
            });
        }
    }
    // 返回
    linkTo() {
        var hash = window.location.hash;
        var str = '?b=' + hash.split('?i=')[1].split('&b=')[1]
        hashHistory.push("/managePage" + str);
    }
    // 容错
    sproPropsRouterFlag() {
    }
    onShowMajor() {
    }
    onCourseShow() {
    }
    onLessonShow() {
    }
}