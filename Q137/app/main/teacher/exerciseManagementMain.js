import React, { Component } from 'react';
import $ from 'jquery';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import AssistantSupComp from '../../assistantSup/public/teacherPublic/teacherComp.js';
import Title1 from '../../majorMaster/public/teacherPublic/teacherComp.js'
import Title from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import ExerciseManagement from '../../teacherComponents/exerciseManagement/exerciseManagement.js';
import Footer from '../../components/public/footer/footer.js';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';

export default class ExerciseManagementMain extends Component {
    constructor() {
        super();
        this.state = {
            selectPracticeData: [],
            total: 0,
            page: 1,
            count: 0,
            userJudge: sessionStorage.getItem("userJudge")
        }
    }
    componentWillMount() {
        this.getSelectPractice(1);
    }
    getSelectPractice(page) {
        $.llsajax({
            url: "lesson/selectPractice",
            type: "POST",
            async: true,
            data: {
                page: page,
            },
            success: selectPracticeData => {
                this.setState({
                    selectPracticeData: selectPracticeData.obj.rows,
                    total: selectPracticeData.obj.total,
                    page: selectPracticeData.obj.page,
                    count: selectPracticeData.obj.count
                });
            }
        })
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
                        : sessionStorage.getItem('userJudge') == "MM" ?
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
                <ExerciseManagement
                    selectPracticeData={this.state.selectPracticeData}
                    getSelectPractice={this.getSelectPractice.bind(this)}
                    total={this.state.total}
                    page={this.state.page}
                    count={this.state.count}
                />
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