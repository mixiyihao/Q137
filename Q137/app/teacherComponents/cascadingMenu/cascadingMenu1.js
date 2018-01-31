
import React from 'react';
import SelectMajor from './selectMajor/selectMajor1.js';

export default class cascadingMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            major: [], //专业名字
            courses: [], // 课程名字
            lessonAll: [], //课时名字
            coursesAll: [], //显示全部时用到
            lessonMore: [], ////显示全部时用到
            boduque: []
        }

    }
    componentWillReceiveProps(nextProps){

    }

    componentWillMount() {
        // 从session中获取教师端信息
        let compData = JSON.parse(sessionStorage.getItem("teacherComp"));
        let major = []; // 存入专业名字
        let courses = []; // 存入课程名字
        let lessonAll = []; //存入课时名字
        let coursesAll = []; //显示全部时用到
        let lessonMore = []; //显示全部时用到
        compData.majors.map((majorValue) => {
            let lessons = []
            let course = []; //几个专业存几次
            major.push({majorValue:majorValue.name,id:majorValue.id});
            majorValue.courseList.map((courseValue) => {
                let lesson = []; //几个课程存几次
                course.push({courseValue:courseValue.name,id:courseValue.id});
                coursesAll.push({courseValue:courseValue.name,id:courseValue.id}); //显示全部时用到
                courseValue.lessons.map((lessonValue) => {
                    lesson.push({lessonValue:lessonValue.name,id:lessonValue.id});
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
    }

    changeValue(value) {
        this.props.onBody(value);
    }
    render () {
        return (
            <div>
                <SelectMajor
                    major={this.state.major}
                    courses={this.state.courses}
                    lessonAll={this.state.lessonAll}
                    lessonMore={this.state.lessonMore}
                    coursesAll={this.state.coursesAll}
                    changeValue = {this.changeValue.bind(this)}
                />
            </div>
        );
    }
}
