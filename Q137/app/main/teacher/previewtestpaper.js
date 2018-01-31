import React from 'react';
import $ from 'jquery';
import Title from '../../teacherComponents/teacherPublic/teacherComp.js';
// 助教总监头部
import TeacherHead from '../../assistantSup/public/teacherPublic/teacherComp';
import Title1 from '../../majorMaster/public/teacherPublic/teacherComp.js'
import HeadMasterTitle from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import MainBody from '../../teacherComponents/previewtestpaper/s_previewtestpaper.js';
import Footer from '../../components/public/footer/footer.js';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';

export default class previewtestpaper extends React.Component {
    constructor() {
        super();
        this.state = {
            majors: [],
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
        this.setState({
            majors: compData.majors,
        })
    }

    onShowMajor() {
    }

    onCourseShow() {
    }

    onLessonShow() {
    }

    onClickMessage1() {
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
                {
                    this.state.userJudge == "T" ?
                        <Title majors={this.state.majors} onShowMajor={this.onShowMajor.bind(this)}
                            onCourseShow={this.onCourseShow.bind(this)}
                            onLessonShow={this.onLessonShow.bind(this)} />
                        :
                        sessionStorage.getItem('userJudge') == "MM" ?
                            <Title1
                                majors={this.state.majors}
                                onShowMajor={this.onShowMajor.bind(this)}
                                onCourseShow={this.onCourseShow.bind(this)}
                                onLessonShow={this.onLessonShow.bind(this)}
                            /> :

                            <TeacherHead onShowMajor={this.onShowMajor.bind(this)}
                                onCourseShow={this.onCourseShow.bind(this)}
                                onLessonShow={this.onLessonShow.bind(this)}
                                onClickMessage1={this.onClickMessage1.bind(this)} />
                }
                <HeadMasterTitle
                    style={styles.title}
                    title={"考试管理"}
                    msg={"贴合知识点 自动判卷 多维度统计"}
                />
                <MainBody />
                {
                    this.state.userJudge == "EM" ?
                        null
                        :
                        <TeacherWork />
                }
                <Footer />
            </div>
        );
    }
}
