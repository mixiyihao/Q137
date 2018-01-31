import React, { Component } from 'react';
import $ from 'jquery';
import { hashHistory } from 'react-router';
import './courseManagementBody.css';
import TeacherGuidance from '../../../teacherComponents/teacherCourseTab/teacherGuidance/teacherGuidance.jsx';
import CourseChapter from './courseChapter/courseChapter.jsx';
import LessonBox from './lessonBox/lessonBox.jsx';
import EditLessonBox from './editLessonBox/editLessonBox.jsx';
import EditLesTestBox from './editLesTestBox/editLesTestBox.jsx';
import BombBox from '../../../components/public/bombBox/bombBox.js';
import Sproquiz from '../../../components/quizzes/Sproquiz.js';

/**
 * @功能 课程管理、课程章节组件
 */
export default class CourseManagementBody extends Component {
    constructor() {
        super();
        this.state = {
            targetList: [], // 教学指导数据
            lessonClickID: -1, // 选中的课程ID
            lessonClickID2: -1, // 选中的课程ID
            bombBoxMsg: '', // 弹框文案
            isHidden: true, // 确定弹框是否显示
            isLessonBoxHidden: true, // 新增课时弹框控制
            isSproquizShow: false, // 试卷弹层控制
            examID: 0, // 试卷ID
            isLesson: true, // 是否删除课时
            lesTestid: 0, // 阶段测试ID
            isEditLessonBoxHidden: true, // 编辑课时弹框控制
            isEditLesTestBoxHidden: true, // 编辑课时弹框控制
            editLesTest: [], // 编辑试卷的信息
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        if (this.props.lessons.length !== 0) {
            this.setState({
                lessonClickID: this.props.lessons[0].id,
                targetList: this.props.lessons[0].targetList || [],
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.lessons.length !== 0) {
            this.setState({
                lessonClickID: nextProps.lessons[0].id
            });
        }
    }

    onLessonInputClick(id) {
        if (id !== this.state.lessonClickID) {
            this.setState({
                lessonClickID: id,
            });
        }
        if (id !== this.state.lessonClickID2) {
            this.setState({
                lessonClickID2: id,
            });
        }
    }

    // 编辑课程
    onEditCLesson(id) {
        this.setState({
            isEditLessonBoxHidden: false
        });
    }

    // 编辑阶段测试
    onEditExam(value) {
        this.setState({
            isEditLesTestBoxHidden: false,
            editLesTest: value

        });
    }

    // 删除课程
    onDeleteLesson(id) {
        this.setState({
            isHidden: false,
            bombBoxMsg: '是否删除此课时？',
            isLesson: true,
        });
    }

    // 弹框确定
    enterClick() {
        if (this.state.isLesson) {
            $.llsajax({
                url: "lesson/deleteLessonById",
                type: "POST",
                async: true,
                data: {
                    courseid: this.props.courseID,
                    lessonid: this.state.lessonClickID
                },
                success: deleteLessonByIdData => {
                    this.props.getCourseindex(this.props.courseID);
                    this.setState({
                        isHidden: true,
                    });
                    this.clearRadioCheck();
                }
            })
        } else {
            $.llsajax({
                url: "lestest/deleteLesTest",
                type: "POST",
                async: true,
                data: {
                    lesTestid: this.state.lesTestid
                },
                success: deleteLesTestData => {
                    this.props.getCourseindex(this.props.courseID);
                    this.setState({
                        isHidden: true,
                    });
                }
            })
        }
    }

    // 删除试卷
    onDeleteExam(lesTestid) {
        this.setState({
            isHidden: false,
            bombBoxMsg: '是否删除此试卷？',
            isLesson: false,
            lesTestid: lesTestid
        });

    }

    // 清除选中状态
    clearRadioCheck() {
        let inputNode = document.getElementsByClassName("courseChapter-lessonBox-input")
        for (let i = 0, len = inputNode.length; i < len; i++) {
            inputNode[i].checked = false;
        }
        this.setState({
            lessonClickID: this.props.lessons[0].id,
            lessonClickID2: -1,
        });
    }

    // 弹框取消
    hideClick() {
        this.setState({
            isHidden: true
        });
    }

    // 打开添加课时弹框
    onOpenBox() {
        this.setState({
            isLessonBoxHidden: false
        });
    }

    // 关闭添加课时弹框
    onCloseBox() {
        this.setState({
            isLessonBoxHidden: true,
            isEditLessonBoxHidden: true,
            isEditLesTestBoxHidden: true,
        });
    }

    // 查看试卷
    onShowExam(id) {
        this.setState({
            isSproquizShow: true,
            examID: id,
        });
    }

    // 关闭查看试卷
    onHideExam() {
        this.setState({
            isSproquizShow: false,
        });
    }

    onLinkToLesson() {
        hashHistory.push({
            pathname: "/lessonManagement",
            query: {
                id: Base64.encodeURI(this.state.lessonClickID),
                couId: Base64.encodeURI(this.props.courseID)
            }
        });
    }

    // 刷新课程
    onRefreshCourse() {
        this.props.getCourseindex(this.props.courseID);
    }

    ontargetShow(index) {
        this.setState({
            targetList: this.props.lessons[index].targetList || [],
        });
    }

    render() {
        let data = {
            exam_id: this.state.examID,
            userid: 0
        };
        return (
            <div className="courseManagementBody-container clearfix" id="courseTab_center">
                <div className="courseManagementBody-wrap clearfix">
                    <TeacherGuidance
                        targetList={this.state.targetList}
                    />
                    <div className="courseManagementBody-center">
                        <span className="warningTit">说明：点击课时下的单选按钮能对该课时进行编辑、删除、课件管理；不点击单选按钮时，点击课件管理默认展示第一课时的课件管理</span>
                        {
                            this.props.content == '' ? 
                                null 
                                :
                                <div className="courseManagementBody-captionBox">
                                    <h2>课程介绍</h2>
                                    <div className="courseManagementBody-caption-content">{this.props.content}</div>
                                </div>
                        }
                        <div className="courseManagementBody-title">
                            <h2>课程章节</h2>
                            <div className="courseManagementBody-tool">
                                <span className="course-control commonButton button" onClick={this.onOpenBox.bind(this)}>
                                    <i className="iconfont icon-tianjiadaoshijuan">

                                    </i>
                                    新增课时
                                </span>
                                <span className={this.state.lessonClickID2 !== -1 ? "course-control commonButton button" : "course-control-gray"} onClick={this.state.lessonClickID2 !== -1 ? this.onEditCLesson.bind(this,this.state.lessonClickID) : null}>
                                    <i className="iconfont icon-bianji">

                                    </i>
                                    编辑课时
                                </span>
                                <span className={this.state.lessonClickID2 !== -1 ? "course-control commonButton button" : "course-control-gray"} onClick={this.state.lessonClickID2 !== -1 ? this.onDeleteLesson.bind(this,this.state.lessonClickID) : null}>
                                    <i className="iconfont icon-SHANCHU-">

                                    </i>
                                    删除课时
                                </span>
                                <span className={this.state.lessonClickID !== -1 ? "course-control commonButton button" : "course-control-gray"} onClick={this.state.lessonClickID !== -1 ? this.onLinkToLesson.bind(this) : null}>
                                    <i className="iconfont icon-kejianguanli">

                                    </i>
                                    课件管理
                                </span>
                                <span className="course-refresh commonButton button" onClick={this.onRefreshCourse.bind(this)}>
                                    <i className="iconfont icon-shuaxin">

                                    </i>
                                </span>
                            </div>
                        </div>
                        <CourseChapter
                            lessons={this.props.lessons}
                            onLessonInputClick={this.onLessonInputClick.bind(this)}
                            onShowExam={this.onShowExam.bind(this)}
                            onDeleteExam={this.onDeleteExam.bind(this)}
                            onEditExam={this.onEditExam.bind(this)}
                            ontargetShow={this.ontargetShow.bind(this)}
                        />
                    </div>
                </div>
                {
                    this.state.isSproquizShow ? <Sproquiz data={data} onHideExam={this.onHideExam.bind(this)}/> : null
                }
                {
                    this.state.isLessonBoxHidden ?
                        null
                        :
                        <LessonBox
                            onCloseBox={this.onCloseBox.bind(this)}
                            courseID={this.props.courseID}
                            getCourseindex={this.props.getCourseindex}
                            clearRadioCheck={this.clearRadioCheck.bind(this)}
                            lessons={this.props.lessons}
                        />
                }
                {
                    this.state.isEditLessonBoxHidden ?
                        null
                        :
                        <EditLessonBox
                            onCloseBox={this.onCloseBox.bind(this)}
                            courseID={this.props.courseID}
                            getCourseindex={this.props.getCourseindex}
                            clearRadioCheck={this.clearRadioCheck.bind(this)}
                            lessonClickID={this.state.lessonClickID}
                            lessons={this.props.lessons}
                        />
                }
                {
                    this.state.isEditLesTestBoxHidden ?
                        null
                        :
                        <EditLesTestBox
                            onCloseBox={this.onCloseBox.bind(this)}
                            courseID={this.props.courseID}
                            getCourseindex={this.props.getCourseindex}
                            clearRadioCheck={this.clearRadioCheck.bind(this)}
                            lessons={this.props.lessons}
                            editLesTest={this.state.editLesTest}
                        />
                }
                <BombBox
                    enterClick={this.enterClick.bind(this)}
                    hideClick={this.hideClick.bind(this)}
                    bombBoxMsg={this.state.bombBoxMsg}
                    isHidden={this.state.isHidden}
                />
            </div>
        );
    }
}