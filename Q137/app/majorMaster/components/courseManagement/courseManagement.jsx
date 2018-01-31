import React, { Component } from "react";
import $ from "jquery";
import "./courseManagement.css";
import TeacherComp from "../../public/teacherPublic/teacherComp.js";
import PMTeacherComp from "../../../assistantSup/public/teacherPublic/teacherComp";
import TopMessage from "../../../components/public/lessonTopMessage/topMessage.js";
import CourseManagementBody from "../courseManagementBody/courseManagementBody.jsx";
import Footer from "../../../components/public/footer/footer.js";

export default class CourseManagement extends Component {
    constructor() {
        super();
        this.state = {
            courseID: 0, // 课程ID
            lessons: [], // 课时数据
            term: 4, // 学期
            name: "", // 课程名字
            renderFlag: false,
            content: '',
            userJudge: sessionStorage.getItem("userJudge"),
        };
    }

    componentWillMount() {
        let courseID = Base64.decode(window.location.hash.split("id=")[1].split("&")[0]);
        this.setState({
            courseID: courseID
        });
        this.getCourseindex(courseID);
    }

    getCourseindex(courseID) {
        $.llsajax({
            url: "course/courseindex/" + courseID,
            type: "POST",
            async: false,
            success: courseIndexData => {
                this.setState({
                    lessons: courseIndexData.course.lessons,
                    term: courseIndexData.course.term,
                    name: courseIndexData.course.name,
                    content: courseIndexData.course.content
                });
            }
        });
    }

    onShowMajor() { }

    onCourseShow(courseID) { 
        this.getCourseindex(courseID);
        this.setState({
            renderFlag: true,
            courseID: courseID
        });
    }

    onRenderFlag() {
        this.setState({
            renderFlag: false,
        });
    }

    onLessonShow() { }

    onClickMessage1() { }

    _showHead() {
        switch(this.state.userJudge) {
            case 'MM':
                return (
                    <TeacherComp
                        onShowMajor={this.onShowMajor.bind(this)}
                        onCourseShow={this.onCourseShow.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)}
                        onClickMessage1={this.onClickMessage1.bind(this)}
                    />
                );
            case 'PM':
                return (
                    <PMTeacherComp
                        onShowMajor={this.onShowMajor.bind(this)}
                        onCourseShow={this.onCourseShow.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)}
                        onClickMessage1={this.onClickMessage1.bind(this)}
                    />
                );
        }
    }

    render() {
        return (
            <div>
                {
                    this._showHead()
                }
                <TopMessage
                    name={this.state.name}
                    term={this.state.term}
                    flag={"teacher"}
                />
                <CourseManagementBody
                    lessons={this.state.lessons}
                    courseID={this.state.courseID}
                    getCourseindex={this.getCourseindex.bind(this)}
                    onRenderFlag={this.onRenderFlag.bind(this)}
                    renderFlag={this.state.renderFlag}
                    content={this.state.content}
                />
                <Footer />
            </div>
        );
    }
}
