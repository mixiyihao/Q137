import React, { Component } from 'react';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import AssistantSupComp from '../../assistantSup/public/teacherPublic/teacherComp.js';
import Title1 from '../../majorMaster/public/teacherPublic/teacherComp.js'
import Title from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import EditExercise from '../../teacherComponents/editExercise/editExercise.js';
import Footer from '../../components/public/footer/footer.js';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';

export default class EditExerciseMain extends Component {
    constructor() {
        super();
        this.state = {
            userJudge: sessionStorage.getItem("userJudge")
        }
    }
    onLessonShow() { }
    onShowMajor() { }
    onCourseShow() { }
    onClickMessage1() { }
    sproPropsRouterFlag() { }
    render() {
        let styles = {
            title: {
                backgroundColor: "#6cc4ce",
                backgroundImage: "linear-gradient(60deg, #6cc4ce, #65f1ce)",
            },
        };
        return (
            <div>
                {
                    this.state.userJudge == "T" ?
                        <TeacherComp sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)} onLessonShow={this.onLessonShow.bind(this)} onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)} />
                        :
                        sessionStorage.getItem('userJudge') == "MM" ?
                            <Title1
                                majors={this.state.majors}
                                onShowMajor={this.onShowMajor.bind(this)}
                                onCourseShow={this.onCourseShow.bind(this)}
                                onClickMessage1={this.onClickMessage1.bind(this)}
                                onLessonShow={this.onLessonShow.bind(this)}
                            /> :
                            <AssistantSupComp sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)} onLessonShow={this.onLessonShow.bind(this)} onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)} />
                }

                <Title style={styles.title} title={"考试管理"} msg={"贴合知识点 自动判卷 多维度统计"} />
                <EditExercise />
                {
                    this.state.userJudge == "T" ?
                        <TeacherWork />
                        :
                        null
                }
                <Footer />
            </div>
        );
    }
}