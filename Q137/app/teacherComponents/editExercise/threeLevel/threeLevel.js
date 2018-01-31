/**
 * Created by heshuai on 2017/3/2.
 */

import React from 'react';
import styles from './styleThreeLevel.js';

export default class SelectMajor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            major: [], //这是获取所需要的数据值
            courses: [],
            lessonAll: [],
            coursesAll: [],
            lessonMore: [],
            majorID: [], // 专业索引
            majorValue: [],
            courseID: [],
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        // if (this.props.isRun) {
            let compData = JSON.parse(sessionStorage.getItem("teacherComp"));
            let major = []; // 存入专业名字
            let courses = []; // 存入课程名字
            let lessonAll = []; //存入课时名字
            let coursesAll = []; //显示全部时用到
            let lessonMore = []; //显示全部时用到
            compData.majors.map((majorValue) => {
                let lessons = [];
                let course = []; //几个专业存几次
                major.push({ majorValue: majorValue.name, id: majorValue.id });
                majorValue.courseList.map((courseValue) => {
                    let lesson = []; //几个课程存几次
                    course.push({ courseValue: courseValue.name, id: courseValue.id });
                    coursesAll.push({ courseValue: courseValue.name, id: courseValue.id }); //显示全部时用到
                    courseValue.lessons.map((lessonValue) => {
                        lesson.push({ lessonValue: lessonValue.name, id: lessonValue.id });
                    });
                    lessons.push(lesson);
                    lessonMore.push(lesson); //显示全部时用到
                });
                courses.push(course);
                lessonAll.push(lessons);

            });
            let majorID = null;
            let majorid = null;
            let courseid = null;
            let lessonid = null;
            if (this.props.lesson_id !== "") {
                compData.majors.map((majorValue) => {
                    majorValue.courseList.map((courseValue) => {
                        courseValue.lessons.map((lessonValue) => {
                            if (lessonValue.id === this.props.lesson_id) {
                                lessonid = lessonValue.id;
                                courseid = courseValue.id;
                                majorid = majorValue.id;
                            }
                        });
                    });
                });
                major.map((item,index) => {
                    if (item.id === majorid) {
                        this.setState({
                            majorID: index + 1
                        });
                        majorID  = majorID + 1;
                    }
                });
                courses[majorID - 1].map((value,key)=>{
                    if(value.id === courseid){
                        this.setState({
                            courseID : key + 1
                        })
                    }
                });
            }
            this.setState({
                major: major,
                courses: courses,
                lessonAll: lessonAll,
                coursesAll: coursesAll,
                lessonMore: lessonMore,
            });
            if (this.props.isRenderFlag) {
                if (this.props.lesson_id === "") {
                    document.getElementById("courseSelect").value = 0;
                    document.getElementById("selectone").value = 0;
                    document.getElementById("lessonSelect").value = 0;
                } else {
                    this.timer = setTimeout(()=>{
                        document.getElementById("selectone").value = majorid;
                        document.getElementById("courseSelect").value = courseid;
                        document.getElementById("lessonSelect").value = lessonid;
                    },10);
                }
            }
        // }
    }
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        let compData = JSON.parse(sessionStorage.getItem("teacherComp"));
        let major = []; // 存入专业名字
        let courses = []; // 存入课程名字
        let lessonAll = []; //存入课时名字
        let coursesAll = []; //显示全部时用到
        let lessonMore = []; //显示全部时用到
        compData.majors.map((majorValue) => {
            let lessons = [];
            let course = []; //几个专业存几次
            major.push({ majorValue: majorValue.name, id: majorValue.id });
            majorValue.courseList.map((courseValue) => {
                let lesson = []; //几个课程存几次
                course.push({ courseValue: courseValue.name, id: courseValue.id });
                coursesAll.push({ courseValue: courseValue.name, id: courseValue.id }); //显示全部时用到
                courseValue.lessons.map((lessonValue) => {
                    lesson.push({ lessonValue: lessonValue.name, id: lessonValue.id });
                });
                lessons.push(lesson);
                lessonMore.push(lesson); //显示全部时用到
            });
            courses.push(course);
            lessonAll.push(lessons);

        });
        let majorID = null;
        let majorid = null;
        let courseid = null;
        let lessonid = null;
        if (nextProps.lesson_id !== "") {
            compData.majors.map((majorValue) => {
                majorValue.courseList.map((courseValue) => {
                    courseValue.lessons.map((lessonValue) => {
                        if (lessonValue.id === nextProps.lesson_id) {
                            lessonid = lessonValue.id;
                            courseid = courseValue.id;
                            majorid = majorValue.id;
                        }
                    });
                });
            });
            major.map((item,index) => {
                if (item.id === majorid) {
                    this.setState({
                        majorID: index + 1
                    });
                    majorID  = majorID + 1;
                }
            });
            courses[majorID - 1].map((value,key)=>{
                if(value.id === courseid){
                    this.setState({
                        courseID : key + 1
                    })
                }
            });
        }
        this.setState({
            major: major,
            courses: courses,
            lessonAll: lessonAll,
            coursesAll: coursesAll,
            lessonMore: lessonMore,
        });
        if (nextProps.isRenderFlag) {
            if (nextProps.lesson_id === "") {
                document.getElementById("courseSelect").value = 0;
                document.getElementById("selectone").value = 0;
                document.getElementById("lessonSelect").value = 0;
            } else {
                this.timer = setTimeout(()=>{
                    document.getElementById("selectone").value = majorid;
                    document.getElementById("courseSelect").value = courseid;
                    document.getElementById("lessonSelect").value = lessonid;
                },10);

            }
        }
    }
    // 选中标签事件  第一个下拉框的onchange事件
    majorChange(e) {
        let majorValue = e.target.value;
        let majorIDs = e.target.selectedIndex;
        if (majorIDs == 0) {
            majorValue = ""
        }
        this.setState({
            majorID: majorIDs,
            majorValue: majorValue
        });
        document.getElementById("courseSelect").value = 0;
        document.getElementById("lessonSelect").value = 0;
        this.majorValue({ majorValue: majorValue, courseValue: "", lessonValue: "" });

    }
    courseChange(e, value) { //这是第二个下拉框点击的效果
        let courseValue = e.target.value;
        let courseID = e.target.selectedIndex;
        if (courseID == 0) {
            courseValue = "";
        }
        this.setState({
            courseID: courseID,
            courseValue: courseValue
        });
        document.getElementById("lessonSelect").value = 0;
        this.majorValue({ majorValue: this.state.majorValue, courseValue: courseValue, lessonValue: "" });
    }
    lessonChange(e) {  //这是第三个下拉框点击的效果
        let lessonValue = e.target.value;
        let courseID = e.target.selectedIndex;
        if (courseID == 0) {
            lessonValue = ""
        }
        this.majorValue({ majorValue: this.state.majorValue, courseValue: this.state.courseValue, lessonValue: lessonValue });

    }
    // option内容 这是第一个专业需要的值
    _showOption1() {
        return this.state.major.map((majorValue, majorKey) => {
            return (
                <option value={majorValue.id} key={majorKey}>&nbsp;{majorValue.majorValue}</option>
            );
        });
    }
    _showOption2() { // 这是第二个专业需要的值
        // 判断是单个还是点击显示全部
        let courses = this.state.majorID == 0 ? [] : this.state.courses[this.state.majorID - 1];
        return courses.map((courseValue, courseKey) => {
            return (
                <option value={courseValue.id} key={courseKey}>&nbsp;{courseValue.courseValue}</option>
            );
        });
    }
    // option内容  这是第三个下拉框的内容
    _showOption3() {
        // 判断是单个还是点击显示全部
        let lessons = this.state.majorID == 0 ? [] : this.state.lessonAll[this.state.majorID - 1][this.state.courseID - 1]
        lessons = lessons || [];
        return lessons.map((lessonsValue, lessonsKey) => {
            return (
                <option value={lessonsValue.id} key={lessonsKey}>&nbsp;{lessonsValue.lessonValue}</option>
            );
        });
    }
    majorValue(courseValue) {
        this.changeValue({ majorValue: courseValue.majorValue, courseValue: courseValue.courseValue, lessonValue: courseValue.lessonValue });
    }
    changeValue(value) {
        this.props.TriodeLink(value);
    }
    render() {
        return (
            <div style={styles.threeLevelBox}>
                <div style={this.props.isRun === true ? this.props.marginLeft : styles.selectMajorBox}>
                    <span style={styles.selectMajorSpan}>{this.props.TriodeLinkagename === true ? "专业" : "专业名称"}:</span>
                    <select className="selectMajor-select-style" style={styles.selectMajorSelect} name="选择专业" onChange={this.majorChange.bind(this)} id="selectone">
                        <option value="0">&nbsp;选择专业{this.props.optional === true ? "" : "(必选)"}</option>
                        {this._showOption1()}
                    </select>
                </div>
                <div style={this.props.isRun === true ? this.props.marginLeft : styles.selectCourseBox}>
                    <span style={styles.selectCourseSpan}>{this.props.TriodeLinkagename === true ? "课程" : "课程名称"}:</span>
                    <select className="selectMajor-select-style" style={this.props.isRun === true ? this.props.courseWidth : styles.selectCourseSelect} name="选择课程" onChange={this.courseChange.bind(this)} id="courseSelect">
                        <option value="0">&nbsp;选择课程{this.props.optional === true ? "" : "(必选)"}</option>
                        {this._showOption2()}
                    </select>
                </div>
                <div style={this.props.isRun === true ? this.props.marginLeft : styles.selectLessonBox}>
                    <span style={styles.selectLessonSpan}>{this.props.TriodeLinkagename === true ? "课时" : "课时名称"}:</span>
                    <select className="selectMajor-select-style" style={this.props.isRun === true ? this.props.lessonWidth : styles.selectLessonSelect} onChange={this.lessonChange.bind(this)} id="lessonSelect">
                        <option value="0">&nbsp;选择课时{this.props.optional === true ? "" : "(必选)"}</option>
                        {this._showOption3()}
                    </select>
                </div>
            </div>
        );
    }
}
