import React from 'react';

export default class SelectLesson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pd: []
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            pd: document.querySelector(".lessonSelect").selectedIndex
        });
        if (document.querySelector(".lessonSelect").selectedIndex == this.state.pd && nextProps.courseID != this.props.courseID) {
            document.querySelector(".lessonSelect").selectedIndex = 0;
        }
    }
    // option内容
    _showOption() {
        // 判断是单个还是点击显示全部
        let lessons = this.props.majorID == 0 ? [] : this.props.lessonAll[this.props.majorID - 1][this.props.courseID - 1]
        lessons = lessons || [];
        return lessons.map((lessonsValue, lessonsKey) => {
            return (
                <option value={lessonsValue.id} key={lessonsKey}>&nbsp;{lessonsValue.lessonValue}</option>
            );
        });
    }
    lessonChange(e) {
        let lessonValue = e.target.value;
        let courseID = e.target.selectedIndex;
        if (courseID == 0) {
            lessonValue = ""
        }

        this.props.courseValue(lessonValue);
    }
    render() {
        return (
            <div className="h-thSet3">
                <span>课时名称:</span>
                <select onChange={this.lessonChange.bind(this)} className="lessonSelect">
                    <option>&nbsp;选择课时</option>
                    {this._showOption()}
                </select>

            </div>
        );
    }
}
