
import React from 'react';
import $ from 'jquery';
import styles from './styleTeacherLessonTab.js';

export default class lessonMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabID: 0,
            examControlFlag: false,
            examControlFlag2: false,
            classesList: [],
            lessonname: [],
            coursename: [],
        }
    }
    componentDidMount() {
        let $li = $("#classBoxUl1 li").eq(this.props.tabID);
        $li.css({
            borderRightColor: "#eee",
            borderLeftColor: "#eee",
            borderBottom: "1px solid transparent",
            borderTopColor: "#49c0e0",
            background: "#f4f4f5",
            color: "#616161"
        }).siblings().css({
            borderRightColor: "transparent",
            borderLeftColor: "transparent",
            borderBottom: "1px solid #eee",
            borderTopColor: "transparent",
            background: "rgb(255, 255, 255)",
            color: "rgb(186, 186, 186)"
        });
        let coursename = null;
        let lessonname = null;
        let lessonID = null;
        if (window.location.hash.indexOf("&") > 0) {
            lessonID = Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]);
        } else {
            lessonID = Base64.decode(window.location.hash.split("?")[1].split("=")[1]);
        }
        let majors = JSON.parse(sessionStorage.getItem("teacherComp")).majors;
        majors.map((majorValue,majorIndex) => {
            majorValue.courseList.map((courseValue,courseIndex) => {
                courseValue.lessons.map((lessonValue, lessonIndex) => {
                    if (lessonValue.id == lessonID) {
                        lessonname = lessonValue.name;
                        coursename = courseValue.name;
                    }
                });
            });
        });
        this.setState({
            classesList: this.props.classesList,
            lessonname: lessonname,
            coursename: coursename
        });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            tabID: nextProps.tabID,
        });
        let $li = $("#classBoxUl1 li").eq(nextProps.tabID);
        $li.css({
            borderRightColor: "#eee",
            borderLeftColor: "#eee",
            borderBottom: "1px solid transparent",
            borderTopColor: "#49c0e0",
            background: "#f4f4f5",
            color: "#616161"
        }).siblings().css({
            borderRightColor: "transparent",
            borderLeftColor: "transparent",
            borderBottom: "1px solid #eee",
            borderTopColor: "transparent",
            background: "rgb(255, 255, 255)",
            color: "rgb(186, 186, 186)"
        });
    }
    // 点击切换导航颜色
    addStyle(value) {
        this.setState({
            tabID: value
        });
        let $li = $("#classBoxUl li").eq(value);
        $li.css({
            borderRightColor: "#eee",
            borderLeftColor: "#eee",
            borderBottom: "1px solid transparent",
            borderTopColor: "#49c0e0",
            background: "#f4f4f5",
            color: "#616161"
        }).siblings().css({
            borderRightColor: "transparent",
            borderLeftColor: "transparent",
            borderBottom: "1px solid #eee",
            borderTopColor: "transparent",
            background: "rgb(255, 255, 255)",
            color: "rgb(186, 186, 186)"
        });
    }
    // 点击切换内容区
    onTabClick(value,key) {
        this.props.onshowContent(value);
        this.props.onScrollHour();
        if (key !== 0 ) {
            this.onGetTrajectorylog(key);
        }
    }
    // 记录日志
    onGetTrajectorylog(key) {
        $.llsajax({
            url: 'trajectorylog/insert',
            type: "POST",
            async: true,
            data: {
                type: key,
                coursename: this.state.coursename,
                lessonname: this.state.lessonname
            },
            success: trajectorylogData => {}
        })
    }
    onShowStudentView() {
        this.props.onShowStuView();
    }
    onExamRightsHide() {
        if (!this.state.examControlFlag2) {
            return false;
        }
        this.setState({
            examControlFlag: false,
            examControlFlag2: false,
        });
    }
    onExamRightsShow(e) {
        e.preventDefault();
        this.setState({
            examControlFlag: true,
            examControlFlag2: true,
        });
    }
    examRightsListBox() {
        this.state.examControlFlag2 = false;
    }
    examRightsListBoxHide() {
        this.state.examControlFlag2 = true;
    }
    _showClassesList() {
        return this.state.classesList.map((value,item) => {
            return (
                <div key={item} style={styles.classItem}>
                    <p style={styles.classItemTitle}>{value.name}</p>
                    <div style={styles.classItemControll}>
                        <span className={value.type1 === 1 ? "classItemControllIcon classItemControllIcon-checked" : "classItemControllIcon"} onClick={value.type1 === 1 ? this.onControllerHide.bind(this,0,value.id) : this.onControllerShow.bind(this,1,value.id)}>

                        </span>
                        <span style={styles.classItemControllMsg}>{value.type1 === 1 ? "开启测试" : "关闭测试"}</span>
                    </div>
                </div>
            );
        });
    }
    getLessonTestControlAjax(flag,class_id,lesson_id) {
        $.llsajax({
            url: "lesson/lessonTestControl",
            type: "POST",
            async: false,
            data: {
                flag: flag,
                class_id: class_id,
                lesson_id: lesson_id
            },
            success: courseIndexData => {

            }
        })
    }
    onControllerHide(flag,class_id) {
        this.state.examControlFlag2 = false;
        let lesson_id = null;
        if (window.location.hash.indexOf("&") > 0) {
            lesson_id = Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1])
        } else {
            lesson_id = Base64.decode(window.location.hash.split("?")[1].split("=")[1]);
        }
        this.getLessonTestControlAjax(flag,class_id,lesson_id);
        this.onRefershClass();
    }
    onControllerShow(flag,class_id) {
        this.state.examControlFlag2 = false;
        let lesson_id = null;
        if (window.location.hash.indexOf("&") > 0) {
            lesson_id = Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1])
        } else {
            lesson_id = Base64.decode(window.location.hash.split("?")[1].split("=")[1]);
        }
        this.getLessonTestControlAjax(flag,class_id,lesson_id);
        this.onRefershClass();
    }
    getFindClassByLessonAjax(LessonID) {
        // 获取班级信息
        $.llsajax({
            url: "homework/findClassByLesson/" + LessonID,
            type: "POST",
            async: false,
            success: classesData => {
                this.setState({
                    classesList: classesData.list
                });
            }
        });
    }
    onRefershClass() {
        if (window.location.hash.indexOf("&") > 0) {
            this.getFindClassByLessonAjax(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]));
        } else {
            this.getFindClassByLessonAjax(Base64.decode(window.location.hash.split("?")[1].split("=")[1]));
        }
    }
    render() {
        return (
            <div className='y-classBox' style={styles.classBoxCenter} onClick={this.onExamRightsHide.bind(this)}>
                <div id="classBoxDIV1" style={styles.classBoxTab}>
                    <div style={styles.classBoxUlCenter}>
                        <div style={styles.classBoxUlCenterTitle}>教学指导</div>
                        <ul id="classBoxUl1" style={styles.classBoxUl}>
                            <li title="录播的课程知识点和习题精讲回放" id="classBoxLi" style={this.props.lesson.lessonresourceList.length !== 0 ? styles.addStyleLi : styles.classBoxLiHide1} onMouseDown={this.addStyle.bind(this, 0)} onClick={this.onTabClick.bind(this, 0, 0)}>{this.props.userJudge == "TM" || this.props.userJudge == "MM" ? "视频回顾" : "我要上课"}</li>
                            <li title="课时大纲—服务于学生课前预习、课后复习、考前准备" id="classBoxLi" style={styles.addStyleLi} onMouseDown={this.addStyle.bind(this, 1)} onClick={this.onTabClick.bind(this, 1, 5)}>{this.props.userJudge == "TM" || this.props.userJudge == "MM" ? "课堂资料" : "查看教案"}</li>
                            <li title="图文资料—对本课时视频内容的一种图文展示" id="classBoxLi" style={styles.addStyleLi} onMouseDown={this.addStyle.bind(this, 2)} onClick={this.onTabClick.bind(this, 2, 6)}>{this.props.userJudge == "TM" || this.props.userJudge == "MM" ? "学习手册" : "我要备课"}</li>
                            <li title="重点知识点随堂练习题" id="classBoxLi" style={styles.addStyleLi} onMouseDown={this.addStyle.bind(this, 3)} onClick={this.onTabClick.bind(this, 3, 4)}>添加习题</li>
                            <li title="线上作业题目" id="classBoxLi" style={this.props.lesson.homeworkList.length !== 0 ? styles.addStyleLi : styles.classBoxLiHide1} onMouseDown={this.addStyle.bind(this, 4)} onClick={this.onTabClick.bind(this, 4, 0)}>{this.props.userJudge == "TM" || this.props.userJudge == "MM" ? "课后作业" : "批改作业"}</li>
                        </ul>
                        <span style={styles.addStyleLiRight} className="commonButton button" onClick={this.onShowStudentView.bind(this)}>显示学生界面</span>
                        {
                            this.props.userJudge == "T" ?
                                <div style={this.state.examControlFlag ? styles.examRights2 : styles.examRights} id="examRights">
                                    <div style={this.props.lessonTestList.length === 0 ? styles.examRightsIconBoxG : styles.examRightsIconBox} className="examRightsIconBox" onClick={this.props.lessonTestList.length === 0 ? null : this.onExamRightsShow.bind(this)}>
                                        <i className="iconfont icon-shezhi" style={this.props.lessonTestList.length === 0 ? styles.examRightsIconG : styles.examRightsIcon}>

                                        </i>
                                        <span style={this.props.lessonTestList.length === 0 ? styles.examRightsMsgG : styles.examRightsMsg} >阶段测验</span>
                                    </div>
                                    <div className="examRightsListBox" onMouseEnter={this.examRightsListBox.bind(this)} onMouseLeave={this.examRightsListBoxHide.bind(this)} style={this.state.examControlFlag ? styles.examRightsListBoxShow : styles.examRightsListBoxHide}>
                                        <i style={styles.examRightsListBoTriangle}></i>
                                        <div style={styles.examRightsList}>
                                            {this._showClassesList()}
                                        </div>
                                    </div>
                                </div>
                                : null
                        }

                    </div>
                </div>
            </div>
        );
    }
}
