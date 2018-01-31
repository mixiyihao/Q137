/**
 * Created by heshuai on 2017/3/2.
 */

import React from 'react';

import $ from 'jquery';
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
            majorIDA: 0,
            bodymajorId: [],  //这是第一个下拉列表的ID
            pd1: [], //这是判断点击的索引
            pd2: [],
            pd3: [],
            boduque: [],
            bodycourseId: [],
            bodylessonId: [],
            courseID: [],
            courseIndex: [], //这是测试用的第二个值的索引
        }
    }
    componentWillMount() {
        let compData = JSON.parse(sessionStorage.getItem("teacherComp"));
        let major = []; // 存入专业名字
        let courses = []; // 存入课程名字
        let lessonAll = []; //存入课时名字
        let coursesAll = []; //显示全部时用到
        let lessonMore = []; //显示全部时用到
        compData.majors.map((majorValue) => {
            let lessons = []
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
        this.setState({
            major: major,
            courses: courses,
            lessonAll: lessonAll,
            coursesAll: coursesAll,
            lessonMore: lessonMore
        });
        var lessonID = window.location.hash.split("?")[1].split("=")[1];

        $.llsajax({
            url: "questionBank/selectQuestionsById",
            type: "post",
            async: false,
            data: {
                id: lessonID
            },
            success: boduque => {
                let majorID = null;
                major.map((item, index) => {
                    if (item.id == boduque.examInationQuestions.majorId) {
                        this.setState({
                            majorID: index + 1
                        });
                        majorID = majorID + 1;
                    }
                });
                courses[majorID - 1].map((value, key) => {
                    if (value.id == boduque.examInationQuestions.courseId) {
                        this.setState({
                            courseID: key + 1
                        })
                    }
                })
                this.setState({
                    majorValue: boduque.examInationQuestions.majorId,
                    boduque: boduque.examInationQuestions,
                    majorID: majorID,
                    bodycourseId: boduque.examInationQuestions.courseId,
                    bodylessonId: boduque.examInationQuestions.lessonId,
                })

            }
        })
    }
    componentDidMount() {
       

        var lessonID = window.location.hash.split("?")[1].split("=")[1];
      
        var boduque = this.state.boduque
        // //console.log(boduque)
        let majorID = 0;
        //console.log(this.state.major)
        this.state.major.map((item, index) => {
            if (item.id == boduque.majorId) {
                // this.setState({
                //     majorID: index + 1
                // });
                majorID = Number(index)+1;
            }
        });
        // document.getElementById("selectone").selectedIndex = majorID
         document.getElementById("selectone").value = boduque.majorId
        // if (boduque.majorId == "") {
        //     document.getElementById("selectone").value = 0
        // } else {
        //     //console.log(boduque.majorId)
        //     document.getElementById("selectone").value = boduque.majorId
        //     document.getElementById("selectone").selectedIndex = majorID
        // }
        if (boduque.courseId == null) {
            document.getElementById("courseSelect").value = 0;
        } else {
            document.getElementById("courseSelect").value = boduque.courseId;
        }
        if (boduque.lessonId == null) {
            document.getElementById("lessonSelect").value = 0;
        } else {
            document.getElementById("lessonSelect").value = boduque.lessonId;
        }
  
}
// 选中标签事件  第一个下拉框的onchange事件
majorChange1(e) {
    // //console.log('majorChange1')
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
courseChange2(e, value) { //这是第二个下拉框点击的效果
    // //console.log('courseChange2')
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
    // alert(courseID)
}
lessonChange3(e) {  //这是第三个下拉框点击的效果
    // //console.log('lessonChange3')
    let lessonValue = e.target.value;
    let courseID = e.target.selectedIndex;
    if (courseID == 0) {
        lessonValue = ""
    }
    this.majorValue({ majorValue: this.state.majorValue, courseValue: this.props.cousele2, lessonValue });

}
// option内容 这是第一个专业需要的值
_showOption1() {
    // //console.log('_showOption1')
    return this.state.major.map((majorValue, majorKey) => {
        return (
            <option value={majorValue.id} key={majorKey}>&nbsp;{majorValue.majorValue}</option>
        );
    });
}
_showOption2() { // 这是第二个专业需要的值
    // //console.log('_showOption2')
    // 判断是单个还是点击显示全部
    let courses = this.state.majorID == 0 ? [] : this.state.courses[this.state.majorID - 1]
    return courses.map((courseValue, courseKey) => {
        return (
            <option value={courseValue.id} key={courseKey}>&nbsp;{courseValue.courseValue}</option>
        );
    });
}
// option内容  这是第三个下拉框的内容
_showOption3() {
    // //console.log('_showOption3')
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
    // //console.log('majorValue')
    // //console.log(courseValue.majorValue)
    this.changeValue({ majorValue: courseValue.majorValue, courseValue: courseValue.courseValue, lessonValue: courseValue.lessonValue });
}
changeValue(value) {
    // //console.log('changeValue')
    this.props.onBody(value);
}
render() {
    return (
        <div>
            <div className="h-thSet1">
                <span>专业名称:</span>
                <select name="选择专业" onChange={this.majorChange1.bind(this)} id="selectone">
                    <option value="0">&nbsp;选择专业(必填)</option>
                    {this._showOption1()}
                </select>
            </div>
            <div className="h-thSet2">
                <span>课程名称:</span>
                <select name="选择课程" onChange={this.courseChange2.bind(this)} id="courseSelect">
                    <option value="0">&nbsp;选择课程(必填)</option>
                    {this._showOption2()}
                </select>
            </div>
            <div className="h-thSet3">
                <span>课时名称:</span>
                <select onChange={this.lessonChange3.bind(this)} id="lessonSelect">
                    <option value="0">&nbsp;选择课时(选填)</option>
                    {this._showOption3()}
                </select>
            </div>
        </div>
    );
}
}
