import React, { Component } from 'react';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import HeadMasterTitle from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import StudentManagement from '../../teacherComponents/studentManagement/studentManagement.jsx';
import Footer from '../../components/public/footer/footer.js';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';

export default class TeaStudentManagement extends Component {
    constructor() {
        super();
    }

    onShowMajor() { }
    onCourseShow() { }
    onLessonShow() { }
    onClickMessage1() {}
    render() {
        let styles = {
            title: {
                backgroundColor: "#ee526c",
                backgroundImage: "linear-gradient(45deg, #ee526c 0%, #ee526c 1%, #f36a80 100%)",
            }
        };
        return (
            <div>
                <TeacherComp onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onLessonShow={this.onLessonShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)}/>
                <HeadMasterTitle style={styles.title} title={"学员管理"} msg={"真实客观统计学员数据  贴近学员生活学习 记录学生成长"}/>
                <StudentManagement
                    flag={"teacher"}
                />
                <TeacherWork />
                <Footer />
            </div>
        );
    }
}