/**
 * Created by YH on 2017/1/11.
 */

import React from 'react';
import $ from 'jquery';
import TeacherComp from '../../public/teacherPublic/teacherComp.js';
import TopMessage from '../../../components/public/lessonTopMessage/topMessage.js';
import TeacherCourseTab from '../../../teacherComponents/teacherCourseTab/teacherCourseTab.js';
import Footer from '../../public/footer/footer.js';
import Sproquiz from '../../public/exam/quizz/Sproquiz.js';

export default class TeacherCourse extends React.Component {
    constructor() {
        super();
        this.state = {
            courseIndexData: [],
            name: [], //课程名字
            lessons: [], //课程章节
            lessonnum: [],
            content: [],
            lessonID: Base64.decode(location.hash.split("id=")[1].split("&")[0]),
            term: 1,
            majorId: [],
            renderFlag: false,
            lessonFlag: null,
            isSproquizShow: false,
            examID: 0,
            userJudge: sessionStorage.getItem("userJudge")
        }
    }
    componentWillMount() {
        if (location.hash.indexOf('les=') > 0) {
            this.setState({
                lessonFlag: Base64.decode(location.hash.split("les=")[1].split("&")[0])
            });
        }
        this.getCourseindex(this.state.lessonID)
    }
    getCourseindex(lessonID) {
        $.llsajax({
            url: "course/courseindex/" + lessonID,
            type: "POST",
            async: false,
            success: courseIndexData => {
                this.setState({
                    lessonnum: courseIndexData.lessonnum,
                    courseIndexData: courseIndexData,
                    name: courseIndexData.course.name,
                    lessons: courseIndexData.course.lessons,
                    content: courseIndexData.course.content,
                    term: courseIndexData.course.term,
                    majorId: courseIndexData.course.majorId,
                })
            }
        })
    }
    onCourseShow(lessonID) {
        this.getCourseindex(lessonID);
        this.setState({
            renderFlag: true,
            lessonFlag: null,
        });
    }
    onRenderFlag() {
        this.setState({
            renderFlag: false,
        });
    }

    // 显示试卷
    onShowExam(id) {
        this.setState({
            isSproquizShow: true,
            examID: id,
        });
    }
    // 关闭试卷
    onHideExam() {
        this.setState({
            isSproquizShow: false,
        });
    }
    sproPropsRouterFlag(RF){}
    onShowMajor() {}
    onLessonShow() { }
    onClickMessage1() {}
    render() {
        let data = {
            exam_id: this.state.examID,
            userid: 0
        };
        return (
            <div>
                <TeacherComp
                    sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                    onCourseShow={this.onCourseShow.bind(this)}
                    onShowMajor={this.onShowMajor.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                    onClickMessage1={this.onClickMessage1.bind(this)}
                />
                <TopMessage
                    name={this.state.name}
                    lessonnum={this.state.lessonnum}
                    term={this.state.term}
                    majorId={this.state.majorId}
                    flag={"teacher"}
                />
                <TeacherCourseTab
                    content={this.state.content}
                    lessons={this.state.lessons}
                    renderFlag={this.state.renderFlag}
                    onRenderFlag={this.onRenderFlag.bind(this)}
                    lessonFlag={this.state.lessonFlag}
                    onShowExam={this.onShowExam.bind(this)}
                    userJudge={this.state.userJudge}
                />
                {
                    this.state.isSproquizShow ? <Sproquiz data={data} onHideExam={this.onHideExam.bind(this)}/> : null
                }
                <Footer />
            </div>
        );
    }
}