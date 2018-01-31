import React, { Component } from 'react';
import $ from 'jquery';
import TeacherComp from '../../public/teacherPublic/teacherComp.js'; // 专业负责人头部组件
import PMTeacherComp from "../../../assistantSup/public/teacherPublic/teacherComp";
import TopMessage from '../../../components/public/lessonTopMessage/topMessage.js'; // banner
import LessonManagementTab from './lessonManagementTab/lessonManagementTab.jsx'; // tab切换组件
import GuidanceImport from './guidanceImport/guidanceImport.jsx'; // 课时目标组件
import VideoImport from './videoImport/videoImport.jsx'; // 视频组件
import ClassDataImport from './classDataImport/classDataImport.jsx'; // 资料组件
import HandbookImport from './handbookImport/handbookImport.jsx'; // 手册组件
import ExercisesImport from './exercisesImport/exercisesImport.jsx'; // 课堂练习组件
import HomeWorkImport from './homeWorkImport/homeWorkImport.jsx'; // 课堂练习组件
import Footer from '../../../components/public/footer/footer.js'; // 底部组件

export default class LessonManagement extends Component {
    constructor() {
        super();
        this.state = {
            tabID: 0, // tab切换索引
            lessonID: 0, // 课时ID
            courseID: 0, // 课程ID
            term: 0, // 当前学期
            courseName: '', // 课程名字
            lessons: [], // 课时信息
            userJudge: sessionStorage.getItem("userJudge"),
        }
    }
        
    componentWillMount() {
        let lessonID = Base64.decode(window.location.hash.split("id=")[1].split("&")[0]);
        let courseID = Base64.decode(window.location.hash.split("couId=")[1].split("&")[0]);
        this.setState({
            lessonID: lessonID,
            courseID: courseID
        });
        this.getCourseindex(courseID)
    }

    // 获取课程信息
    getCourseindex(courseID) {
        $.llsajax({
            url: "course/courseindex/" + courseID,
            type: "POST",
            async: false,
            success: courseIndexData => {
                this.setState({
                    lessons: courseIndexData.course.lessons,
                    term: courseIndexData.course.term,
                    courseName: courseIndexData.course.name
                })
            }
        })
    }

    // 选项卡切换
    onTabClick(tabID) {
        this.setState({
            tabID: tabID
        });
    }

    saveLessonID(id) {
        this.setState({
            lessonID: id
        });
    }

    // tab组件切换
    getComponents(tabID) {
        switch (tabID) {
            case 0:
                return <GuidanceImport
                    lessons={this.state.lessons}
                    lessonID={this.state.lessonID}
                    name={this.state.courseName}
                    courseID={this.state.courseID}
                    saveLessonID={this.saveLessonID.bind(this)}
                />;
            case 1:
                return <VideoImport
                    lessons={this.state.lessons}
                    lessonID={this.state.lessonID}
                    name={this.state.courseName}
                    courseID={this.state.courseID}
                    saveLessonID={this.saveLessonID.bind(this)}
                />;
            case 2:
                return <ClassDataImport
                    lessons={this.state.lessons}
                    lessonID={this.state.lessonID}
                    name={this.state.courseName}
                    courseID={this.state.courseID}
                    saveLessonID={this.saveLessonID.bind(this)}
                />;
            case 3:
                return <HandbookImport
                    lessons={this.state.lessons}
                    lessonID={this.state.lessonID}
                    name={this.state.courseName}
                    courseID={this.state.courseID}
                    saveLessonID={this.saveLessonID.bind(this)}
                />;
            case 4:
                return <ExercisesImport
                    lessons={this.state.lessons}
                    lessonID={this.state.lessonID}
                    name={this.state.courseName}
                    courseID={this.state.courseID}
                    saveLessonID={this.saveLessonID.bind(this)}
                />;
            case 5:
                return <HomeWorkImport
                    lessons={this.state.lessons}
                    lessonID={this.state.lessonID}
                    name={this.state.courseName}
                    courseID={this.state.courseID}
                    saveLessonID={this.saveLessonID.bind(this)}
                />;
            default:
                return <GuidanceImport
                    lessons={this.state.lessons}
                    lessonID={this.state.lessonID}
                    name={this.state.courseName}
                    courseID={this.state.courseID}
                    saveLessonID={this.saveLessonID.bind(this)}
                />;
        }
    }

    onShowMajor() {}

    onCourseShow() {}

    onLessonShow() {}

    onClickMessage1() {}

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
        let styles = {
            contentStyle: {
                width: "100%",
                background: "#f4f4f6",
                height: "100%"
            }
        };
        return (
            <div>
                {
                    this._showHead()
                }
                <TopMessage
                    course_id={this.state.courseID}
                    name={this.state.courseName}
                    term={this.state.term}
                    flag={"teacher"}
                    isLesson={true}
                />
                <LessonManagementTab
                    onTabClick={this.onTabClick.bind(this)}
                />
                <div id="lessonManagement_content" className="clearfix" style={styles.contentStyle}>
                    {this.getComponents(this.state.tabID)}
                </div>
                <Footer />
            </div>
        );
    }
}