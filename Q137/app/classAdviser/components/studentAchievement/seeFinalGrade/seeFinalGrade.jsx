import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import $ from 'jquery';
import './seeFinalGrade.css';
import TeacherComp from '../../../public/header/teacherComp.js';
import EMComp from '../../../../assistantSup/public/teacherPublic/teacherComp.js'; // 教管头部
import HeadMasterTitle from '../../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Footer from '../../../../components/public/footer/footer.js';

export default class SeeFinalGrade extends Component {
    constructor() {
        super();
        this.state = {
            defaultSchoolname: '', // 学校名字
            defaultMajorname: '', // 专业名字
            defaultCoursename: '', // 课程名字
            defaultClassName: '', // 班级名字
            dataArr: [],
            studentNum: 0, // 人数,
            userJudge: sessionStorage.getItem("userJudge")
        }
    }

    componentWillMount() {
        this.setState({
            defaultSchoolname: Base64.decode(location.hash.split("&s=")[1].split("&")[0]),
            defaultMajorname: Base64.decode(location.hash.split("&m=")[1].split("&")[0]),
            defaultCoursename: Base64.decode(location.hash.split("&e=")[1].split("&")[0]),
            defaultClassName: Base64.decode(location.hash.split("&clN=")[1].split("&")[0]),
        });
        let defaultClassId = Base64.decode(location.hash.split("&ci=")[1].split("&")[0]);
        let defaultTerm = Base64.decode(location.hash.split("&t=")[1]);
        this.getFindFinalExam(defaultClassId, defaultTerm, Base64.decode(location.hash.split("&e=")[1].split("&")[0]));
    }

    // 获取数据
    getFindFinalExam(classid, term, examname) {
        $.llsajax({
            url: 'schoolexam/findFinalExam',
            type: "POST",
            async: true,
            data: {
                classid: classid,
                term: term,
                examname: examname
            },
            success: findFinalExamDate => {
                let dataArr = [];
                findFinalExamDate.date.map((value, index) => {
                    dataArr.push(
                        <tr key={index}>
                            <td>{index + 1 < 9 ? "0" + (index + 1) : (index + 1)}</td>
                            <td>{value.username}</td>
                            <td>{value.studentno}</td>
                            <td>{value.score}</td>
                        </tr>
                    );
                });
                this.setState({
                    dataArr: dataArr,
                    studentNum: findFinalExamDate.date.length
                });
            }
        });
    }

    handleClick() {
        if (this.state.userJudge == "CM" || this.state.userJudge == "PM" || this.state.userJudge == "HM") {
            hashHistory.push({
                pathname: '/studentAchievement'
            })
        } else if (this.state.userJudge == "MM") {
            hashHistory.push({
                pathname: '/'
            })
        }
    }

    onShowMajor() { }
    onCourseShow() { }
    onLessonShow() { }
    onClickMessage1() { }

    _showHead() {
        switch (this.state.userJudge) {
            case 'CM':
                return (
                    <TeacherComp
                        onClickMessage1={this.onClickMessage1.bind(this)}
                    />
                );
            case 'EM':
            case 'PM':
            case 'HM':
                return (
                    <EMComp
                        onShowMajor={this.onShowMajor.bind(this)}
                        onCourseShow={this.onCourseShow.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)}
                        onClickMessage1={this.onClickMessage1.bind(this)}
                    />
                );
        }
    }

    render() {
        let styles = {
            title: {
                background: "#f9ae39",
            }
        }
        return (
            <div>
                {
                    this._showHead()
                }
                <HeadMasterTitle style={styles.title} title={"学员成绩"} msg={"全面的统计学员成绩   注重全面素质的提高"} />
                <div className="seeFinalGrade-container">
                    <div className="seeFinalGrade-wrap">
                        <h2>查看学校成绩</h2>
                        <a className="seeFinalGrade-back" onClick={this.handleClick.bind(this)}>
                            <span>返回</span><i className="iconfont icon-back"></i>
                        </a>
                        <div className="seeFinalGrade-title">
                            <span title={"学校：" + this.state.defaultSchoolname}>{"学校：" + this.state.defaultSchoolname}</span>
                            <span title={"专业：" + this.state.defaultMajorname}>{"专业：" + this.state.defaultMajorname}</span>
                            <span title={"班级：" + this.state.defaultClassName}>{"班级：" + this.state.defaultClassName}{"(共" + this.state.studentNum + "人)"}</span>
                            <span title={"课程：" + this.state.defaultCoursename}>{"课程：" + this.state.defaultCoursename}</span>
                        </div>
                        <table className="seeFinalGrade-table">
                            <thead>
                                <tr>
                                    <th className="two">序号</th>
                                    <th className="three">姓名</th>
                                    <th className="four">学号</th>
                                    <th className="five">成绩</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.dataArr}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Footer />
            </div>

        );
    }
}