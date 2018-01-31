import React from 'react';
import SelectLesson from '../selectLesson/selectLesson1.js';

export default class SelectCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseID: 1, //课程索引
            courseValue: [],
            pd: []
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            pd: document.querySelector(".courseSelect").selectedIndex
        });
        if (document.querySelector(".courseSelect").selectedIndex == this.state.pd && nextProps.majorID != this.props.majorID) {
            document.querySelector(".courseSelect").selectedIndex = 0;
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
                <div className="h-thSet2">
                    <span>课程名称:</span>
                    <select name="选择课程" onChange={this.courseChange.bind(this)} className="courseSelect">
                        <option>&nbsp;选择课程</option>
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
