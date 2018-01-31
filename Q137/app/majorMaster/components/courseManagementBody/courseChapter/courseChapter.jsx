import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import './courseChapter.css';

/**
 * @功能 课程章节组件
 */
export default class CourseChapter extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    // 查看试卷
    onStartExam(examID) {
        this.props.onShowExam(examID);
    }

    // 删除试卷
    onDeleteExam(lesTestid) {
        this.props.onDeleteExam(lesTestid);
    }

    // 编辑试卷
    onEditExam(value) {
        this.props.onEditExam(value);
    }

    ontargetShow(index) {
        this.props.ontargetShow(index);
    }

    // stage 阶段、显示每个阶段中的课时
    _showLesson(stage) {
        let a = 1, b = 1, c = 1, d = 1, e = 1;
        let arr = [];
        this.props.lessons.map((value,index) => {
            if (value.stage_ordernum === stage) {
                let labelNum = 0;
                if (value.homework !== 1) {
                    labelNum++;
                }
                if (value.practice !== 1) {
                    labelNum++;
                }
                if (value.mk !== 1) {
                    labelNum++;
                }
                if (value.date !== 1) {
                    labelNum++;
                }
                if (value.video !== 1) {
                    labelNum++;
                }
                arr.push(
                    <div key={index}>
                        <div className="courseChapter-lessonBox" onMouseEnter={this.ontargetShow.bind(this,index)}>
                            <input onClick={this.onLessonInputClick.bind(this,value.id)} defaultChecked={false} type="radio" name="radios" id="" className="courseChapter-lessonBox-input"/>
                            <Link to={{ pathname: '/teacherLesson', query: { id: Base64.encodeURI(value.id) } }} style={{width: 250 + (90 * labelNum)}}>{value.stage_ordernum}.{a++}{value.name}</Link>
                            <span className={value.homework === 1 ? "courseChapter-lesson-label" : "courseChapter-lesson-label-hide"} onClick={this.onLinkToLesson.bind(this,4,value.id)}><i className="iconfont icon-kehouzuoye"></i>课后作业</span>
                            <span className={value.practice === 1 ? "courseChapter-lesson-label" : "courseChapter-lesson-label-hide"} onClick={this.onLinkToLesson.bind(this,3,value.id)}><i className="iconfont icon-ketanglianxi"></i>添加练习</span>
                            <span className={value.mk === 1 ? "courseChapter-lesson-label" : "courseChapter-lesson-label-hide"} onClick={this.onLinkToLesson.bind(this,2,value.id)}><i className="iconfont icon-xuexishouce"></i>学习手册</span>
                            <span className={value.date === 1 ? "courseChapter-lesson-label" : "courseChapter-lesson-label-hide"} onClick={this.onLinkToLesson.bind(this,1,value.id)}><i className="iconfont icon-ketangziliao"></i>课堂资料</span>
                            <span className={value.video === 1 ? "courseChapter-lesson-label" : "courseChapter-lesson-label-hide"} onClick={this.onLinkToLesson.bind(this,0,value.id)}><i className="iconfont icon-shipinhuigu"></i>视频回顾</span>
                        </div>
                        {
                            value.lessonTestList.length === 0 ? null :
                                <div className={value.lessontest === 4 ? "courseChapter-lesson-examGray" : "courseChapter-lesson-exam"}>
                                    <p>[阶段测试]试卷名称：{value.lessonTestList[0].paperName}</p>
                                    <span className="courseChapter-lesson-exam-see" onClick={value.lessontest === 4 ? null : this.onDeleteExam.bind(this,value.lessonTestList[0].id)}><i className="iconfont icon-SHANCHU-"></i>删除试卷</span>
                                    <span className="courseChapter-lesson-exam-see" onClick={value.lessontest === 4 ? null : this.onEditExam.bind(this,value.lessonTestList[0])}><i className="iconfont icon-bianji"></i>编辑试卷</span>
                                    <span className="courseChapter-lesson-exam-see" onClick={value.lessontest === 4 ? null : this.onStartExam.bind(this,value.lessonTestList[0].id)}><i className="iconfont icon-yulan"></i>查看试卷</span>
                                </div>
                        }
                    </div>
                );
            }
        });
        return arr;
    }

    onLinkToLesson(value,id) {
        hashHistory.push({
            pathname: "/teacherLesson",
            query: {
                id : Base64.encodeURI(id),
                value: Base64.encodeURI(value)
            }
        });
    }

    onLessonInputClick(id) {
        this.props.onLessonInputClick(id);
    }

    render() {
        return (
            <div className="courseChapter-container">
                <ul>
                    {
                        this._showLesson(1).length === 0 ?
                            null
                            :
                            <li className={""}>
                                <p className="course-stage">第一阶段<span></span></p>
                                {this._showLesson(1)}
                            </li>
                    }
                    {
                        this._showLesson(2).length === 0 ?
                            null
                            :
                            <li className={""}>
                                <p className="course-stage">第二阶段<span></span></p>
                                {this._showLesson(2)}
                            </li>
                    }
                    {
                        this._showLesson(3).length === 0 ?
                            null
                            :
                            <li className={""}>
                                <p className="course-stage">第三阶段<span></span></p>
                                {this._showLesson(3)}
                            </li>
                    }
                    {
                        this._showLesson(4).length === 0 ?
                            null
                            :
                            <li className={""}>
                                <p className="course-stage">第四阶段<span></span></p>
                                {this._showLesson(4)}
                            </li>
                    }
                    {
                        this._showLesson(5).length === 0 ?
                            null
                            :
                            <li className={""}>
                                <p className="course-stage">第五阶段<span></span></p>
                                {this._showLesson(5)}
                            </li>
                    }
                </ul>
                <div className="courseChapter-container-line"></div>
                <div className="courseChapter-container-none"></div>
            </div>
        );
    }
}