
import React from 'react';
import SelectCourse from '../selectCourse/selectCourse.js';

export default class SelectMajor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            majorID: 0, // 专业索引
            majorValue: [],
            majorIDA: 0,
        }
    }
    // option内容
    _showOption() {
        return this.props.major.map((majorValue, majorKey) => {
            return (
                <option value={majorValue.id} key={majorKey}>&nbsp;{majorValue.majorValue}</option>
            );
        });
    }
    // 选中标签事件
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
        this.props.changeValue({ majorValue: majorValue, courseValue: "", lessonValue: "" });
    }

    majorValue(courseValue) {
        this.props.changeValue({ majorValue: this.state.majorValue, courseValue: courseValue.courseValue, lessonValue: courseValue.lessonValue });
    }
    render() {
        let props = this.props;
        return (
            <div>
                <div className="h-thSet1">
                    <span>专业名称:</span>
                    <select name="选择专业" onChange={this.majorChange.bind(this)} id="addToPaperMajor">
                        <option>&nbsp;选择专业(必填)</option>
                        {this._showOption()}
                    </select>

                </div>

                <SelectCourse
                    isSuccess={this.props.isSuccess}
                    triodeLink={this.props.triodeLink}
                    majorID={this.state.majorID}
                    courses={props.courses}
                    lessonAll={props.lessonAll}
                    lessonMore={props.lessonMore}
                    coursesAll={props.coursesAll}
                    majorValue={this.majorValue.bind(this)}
                />
            </div>
        );
    }
    componentWillReceiveProps(props){
        if (props.isSuccess == false) {
            // //console.log(this.props)
            var mark = props.triodeLink.majorValue
            var arr = props.major;
            var len = arr.length
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    if (arr[i].id == mark) {
                       
                        this.setState({
                            majorID: i + 1,
                        });
                        break;
                    }
                }
            }
        }
    }
    componentDidUpdate() {
        if (this.props.isSuccess == false) {
            // //console.log(this.props)
            var mark = this.props.triodeLink.majorValue
            var arr = this.props.major;
            var len = arr.length
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    if (arr[i].id == mark) {
                        document.getElementById("addToPaperMajor").value = i + 1;
                        // this.setState({
                        //     majorID: i + 1,
                        // });
                        break;
                    }
                }
            }
        }
    }
}
