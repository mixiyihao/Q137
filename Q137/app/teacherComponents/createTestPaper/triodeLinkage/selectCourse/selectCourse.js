import React from 'react';
import SelectLesson from '../selectLesson/selectLesson.js';
import styles from '../styleTriodeLinkage.js';
export default class SelectCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseID: [], //课程索引
            courseValue: [],
            pd: [],
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            pd: document.getElementById("courseSelect").selectedIndex,
        });
        if (document.getElementById("courseSelect").selectedIndex == this.state.pd && nextProps.majorID != this.props.majorID) {
            document.getElementById("courseSelect").selectedIndex = 0;
        }
    }
    // option内容
    _showOption() {
        // 判断是单个还是点击显示全部
        let courses = this.props.majorID == 0 ? [] : this.props.courses[this.props.majorID - 1]
        return courses.map((courseValue, courseKey) => {
            return (
                <option value={courseValue.id} key={courseKey}>&nbsp;{courseValue.courseValue}</option>
            );
        });
    }
    // 选中标签事件
    courseChange(e, value) {
        let courseValue = e.target.value
        let courseID = e.target.selectedIndex;
        if (courseID == 0) {
            courseValue = "";
        }
        this.setState({
            courseID: courseID,
            courseValue: courseValue
        });
        this.props.majorValue({ courseValue: courseValue, lessonValue: "" });
    }
    courseValue(lessonValue) {
        this.props.majorValue({ courseValue: this.state.courseValue, lessonValue: lessonValue });
    }
    render() {
        let props = this.props;
        return (
            <div>
                <div style={styles.selectCourseBox}>
                    <span style={styles.selectCourseSpan}>课程名称:</span>
                    <select className="teacherSelect_paper" style={styles.selectCourseSelect} name="选择课程" onChange={this.courseChange.bind(this)} id="courseSelect">
                        <option value="0">&nbsp;选择课程(必填)</option>
                        {this._showOption()}
                    </select>
                </div>
                <SelectLesson
                    courseID={this.state.courseID}
                    majorID={props.majorID}
                    lessonAll={props.lessonAll}
                    lessonMore={props.lessonMore}
                    courseValue={this.courseValue.bind(this)}
                />
            </div>
        );
    }
}
