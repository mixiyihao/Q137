import React, { Component } from 'react';
import $ from 'jquery';
import AssistantSupComp from '../../public/teacherPublic/teacherComp.js';
import Title from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import PublicExercisesComp from './publicExercisesComp/publicExercisesComp.jsx';
import Footer from '../../../components/public/footer/footer.js';

export default class PublicExercises extends Component {
    constructor() {
        super();
        this.state = {
            selectPracticeData: [],
            total: 0,
            page: 1,
            count: 0,
        }
    }
    componentWillMount() {
        this.getSelectPractice(1);
    }
    getSelectPractice(page,majorid,courseid,lessonid) {
        $.llsajax({
            url: "lesson/selectPractice",
            type: "POST",
            async: true,
            data: {
                page: page,
                majorid: majorid,
                courseid: courseid,
                lessonid: lessonid
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
    onLessonShow() {}
    onShowMajor() {}
    onCourseShow() {}
    onClickMessage1() {}
    sproPropsRouterFlag() {}
    render() {
        let styles = {
            title: {
                backgroundColor: "#6cc4ce",
                backgroundImage: "linear-gradient(60deg, #6cc4ce, #65f1ce)",
            },
        };
        return (
            <div>
                <AssistantSupComp sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)} onLessonShow={this.onLessonShow.bind(this)} onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)}/>
                <Title style={styles.title} title={"考试管理"} msg={"贴合知识点 自动判卷 多维度统计"}/>
                <PublicExercisesComp
                    selectPracticeData={this.state.selectPracticeData}
                    getSelectPractice={this.getSelectPractice.bind(this)}
                    total={this.state.total}
                    page={this.state.page}
                    count={this.state.count}
                />
                <Footer />
            </div>
        );
    }
}