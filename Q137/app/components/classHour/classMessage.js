
import React from 'react';
import $ from 'jquery';
import styles from './styleClassMessage.js';

export default class lessonMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            isTriangleShow: false,
            index: 0,
        }
    }
    componentDidMount() { }
    componentWillMount() { }
    componentWillReceiveProps(nextProps) {
        var $li = $("#classBoxUl li").eq(nextProps.tabID);
        if (nextProps.tabID == 7) {
            $("#classBoxUl li").css({
                borderRightColor: "transparent",
                borderLeftColor: "transparent",
                borderBottom: "1px solid #eee",
                borderTopColor: "transparent",
                background: "rgb(255, 255, 255)",
                color: "rgb(186, 186, 186)"
            })
        } else {
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
    }
    addStyle(value) {
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
        this.props.onshowContent(value);
        this.props.onScrollHour();
        this.setState({
            addStyleKey: value
        });
    }
    onGetTrajectorylog(key) {
        if (this.props.flag !== 'teacher') {
            let coursename = null;
            let lessonname = null;
            let lessonID = null;
            if (window.location.hash.indexOf("&") > 0) {
                lessonID = Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]);
            } else {
                lessonID = Base64.decode(window.location.hash.split("?")[1].split("=")[1]);
            }
            let leftNavData = JSON.parse(sessionStorage.getItem("leftNavBar")).major.courseList;
            leftNavData.map((courseListData, index) => {
                courseListData.lessons.map((lessonData, index) => {
                    if (lessonData.id == lessonID) {
                        lessonname = lessonData.name;
                        coursename = courseListData.name;
                    }
                });
            });
            $.llsajax({
                url: 'trajectorylog/insert',
                type: "POST",
                async: true,
                data: {
                    type: key,
                    coursename: coursename,
                    lessonname: lessonname
                },
                success: trajectorylogData => {}
            })
        }
    }
    onLog(key) {
        this.onGetTrajectorylog(key);
    }
    onHideStudentView() {
        $('html,body').animate({ scrollTop: 130 });
        this.props.onHideStudentView();
    }
    render() {
        return (
            <div className='y-classBox'>
                <div id="classBoxDIV" className="stu_classBoxDIV" style={styles.classBoxTab}>
                    <div style={styles.classBoxTabWrap}>
                        <ul id="classBoxUl" style={styles.classBoxUl}>
                            <li title="课时大纲—服务于学生课前预习、课后复习、考前准备" id="classBoxLi" style={styles.classBoxLiFirstShow}>
                                <span onMouseDown={this.addStyle.bind(this, 0)} onClick={this.onLog.bind(this, 5)} style={styles.classBoxLiFirstShowSpan}>课堂资料</span>
                            </li>
                            <li title="图文资料—对本课时视频内容的一种图文展示" id="classBoxLi" style={this.props.markdown.length !== 0 ? styles.classBoxLiShow : styles.classBoxLiHide}>
                                <span style={styles.classBoxLiFirstShowSpan} onMouseDown={this.addStyle.bind(this, 1)} onClick={this.onLog.bind(this, 6)}>学习手册</span>
                            </li>
                            <li title="重点知识点随堂练习题" id="classBoxLi" style={this.props.practiceListListLength ? styles.classBoxLiShow : styles.classBoxLiHide}>
                                <span style={styles.classBoxLiFirstShowSpan} onMouseDown={this.addStyle.bind(this, 2)} onClick={this.onLog.bind(this, 4)}>课堂练习</span>
                            </li>
                            <li title="录播的课程知识点和习题精讲回放" id="classBoxLi" style={this.props.lessonresourceListLength ? styles.classBoxLiShow : styles.classBoxLiHide}>
                                <span style={styles.classBoxLiFirstShowSpan} onMouseDown={this.addStyle.bind(this, 3)}>视频回顾</span>
                            </li>
                            <li title="线上作业题目以及线上提交作业" id="classBoxLi" style={this.props.homeworkListLength !== 0 ? styles.classBoxLiShow : styles.classBoxLiHide}>
                                <span style={styles.classBoxLiFirstShowSpan} onMouseDown={this.addStyle.bind(this, 4)}>课后作业</span>
                            </li>
                        </ul>
                        <span style={this.props.flag === "teacher" ? styles.addStyleLiRight : styles.addStyleLiRightHide} className="commonButton button" onClick={this.onHideStudentView.bind(this)}>返回助教界面</span>
                    </div>
                    
                </div>
            </div>
        );
    }
}
