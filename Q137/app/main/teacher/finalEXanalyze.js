import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Title from '../../teacherComponents/teacherPublic/teacherComp.js';
//助教总监头部
import TeacherHead from '../../assistantSup/public/teacherPublic/teacherComp.js';
// 专业负责人头部
import MajorMasterHead from '../../majorMaster/public/teacherPublic/teacherComp.js';
import HeadMasterTitle from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
// new
import StatisticEntry from '../../teacherComponents/teacherfinalExSta/statisticEntry.js';
import Footer from '../../components/public/footer/footer.js';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';

export default class finalEXanalyze extends React.Component {
    constructor() {
        super();
        this.state = {
            majors: [],
            Exowner: 0,
            userJudge: sessionStorage.getItem("userJudge")
        }
    }

    componentWillMount() {
        if (sessionStorage.getItem("teacherComp") == "") {
            $.llsajax({
                url: "major/findMajor",
                type: "POST",
                async: false,
                success: compData => {
                    sessionStorage.setItem("teacherComp", JSON.stringify(compData));
                }
            })
        }
        // 从session中获取数据
        let compData = JSON.parse(sessionStorage.getItem("teacherComp"));
        this.setState({ majors: compData.majors })
    }

    onClickMessage1() {
    }

    onLessonShow() {
    }

    onCourseShow() {
    }

    _showHead() {
        switch (this.state.userJudge) {
            case 'T':
                return (
                    <Title
                        majors={this.state.majors}
                        onClickMessage1={this.onClickMessage1.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)}
                        onCourseShow={this.onCourseShow.bind(this)}
                    />
                )
            case 'TM':
                return (
                    <TeacherHead
                        majors={this.state.majors}
                        onClickMessage1={this.onClickMessage1.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)}
                        onCourseShow={this.onCourseShow.bind(this)}
                    />
                )
            case 'MM':
                return (
                    <MajorMasterHead
                        majors={this.state.majors}
                        onClickMessage1={this.onClickMessage1.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)}
                        onCourseShow={this.onCourseShow.bind(this)}
                    />
                )
        }
    }

    render() {
        let styles = {
            title: {
                backgroundColor: "#6cc4ce",
                backgroundImage: "linear-gradient(60deg, #6cc4ce, #65f1ce)",
            }
        };
        return (
            <div>
                {this._showHead()}
                <HeadMasterTitle
                    style={styles.title}
                    title={"考试管理"}
                    msg={"贴合知识点 自动判卷 多维度统计"}
                />
                <StatisticEntry />
                <TeacherWork />
                <Footer />
            </div>
        )
    }
}
