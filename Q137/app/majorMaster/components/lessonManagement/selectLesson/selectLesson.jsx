import React, { Component } from 'react';
import { hashHistory } from 'react-router';

// 引用了guidanceImport.css的样式
export default class SelectLesson extends Component {
    constructor() {
        super();
        this.state = {
            stageIndex: 1,// 选择的阶段
            stageArr: [],// 阶段数组
            _showLesson: [],
            lessonID: 0,
        }
    }

    componentWillMount() {
        let stageArr = [];
        let lessonID = Number(Base64.decode(window.location.hash.split("id=")[1].split("&")[0]));
        this.props.lessons.map((value) => {
            stageArr.push(value.stage_ordernum);
            if (value.id === lessonID) {
                this.setState({
                    stageIndex: value.stage_ordernum,
                });
                this._showLesson(value.stage_ordernum);
            }
        });
        this.setState({
            stageArr: this.transformArr(stageArr),
            lessonID: lessonID
        });
    }

    componentDidMount() {
        document.getElementById("guidanceImport_tool_stageSelect").value = this.state.stageIndex;
        document.getElementById("guidanceImport_tool_lessonSelect").value = this.state.lessonID;
    }

    // 数组去重
    unique(arr) {
        let result = [];
        for(let i=0, len = arr.length; i < len; i++){
            if(result.indexOf(arr[i]) === -1){
                result.push(arr[i])
            }
        }
        return result;
    }

    // 数组中的转换陈汉字
    transformArr(arr) {
        let resultChinese = [];
        for (let j = 0, len = this.unique(arr).length; j < len; j++) {
            resultChinese.push(this.transformStage(this.unique(arr)[j]));
        }
        return resultChinese;
    }

    // 阶段转换汉字
    transformStage(stage) {
        let stageChin = '';
        switch (stage) {
            case 1:
                stageChin = '第一阶段';
                break;
            case 2:
                stageChin = '第二阶段';
                break;
            case 3:
                stageChin = '第三阶段';
                break;
            case 4:
                stageChin = '第四阶段';
                break;
            case 5:
                stageChin = '第五阶段';
                break;
        }
        return stageChin;
    }

    // 显示阶段
    _showStage() {
        return this.state.stageArr.map((value,index) => {
            return (
                <option key={index} value={index + 1}>&nbsp;{value}</option>
            );
        });
    }

    // 阶段选择
    stageChange(e) {
        let stageID = Number(e.target.value);
        this._showLesson(stageID);
        // 获取当前阶段的所有课时，取第一个作为默认
        let arr = [];
        this.props.lessons.map((value) => {
            if (value.stage_ordernum === stageID) {
                arr.push(value.id);
            }
        });
        if (arr.length !== 0) {
            this.setState({
                stageIndex: stageID
            });
            this.props.onLessonChange(arr[0],stageID);
            hashHistory.push({
                pathname: '/lessonManagement',
                query: {
                    id: Base64.encodeURI(arr[0]),
                    couId: Base64.encodeURI(this.props.courseID),
                }
            });
        }
    }

    // 显示课时
    _showLesson(stageID) {
        this.state._showLesson = [];
        this.props.lessons.map((value,index) => {
            if (value.stage_ordernum === stageID) {
                this.state._showLesson.push(
                    <option value={value.id} key={index}>&nbsp;{value.name}</option>
                );
            }
        });
        this.setState({
            _showLesson: this.state._showLesson
        });
    }

    // 课时选择
    lessonChange(e) {
        let lessonID = Number(e.target.value);
        this.props.onLessonChange(lessonID,this.state.stageIndex);
        hashHistory.push({
            pathname: '/lessonManagement',
            query: {
                id: Base64.encodeURI(lessonID),
                couId: Base64.encodeURI(this.props.courseID),
            }
        });
    }

    render() {
        return (
            <div>
                <div className="guidanceImport-tool-div">
                    <span>所属阶段：</span>
                    <select name="" id="guidanceImport_tool_stageSelect" onChange={this.stageChange.bind(this)}>
                        {this._showStage()}
                    </select>
                </div>
                <div className="guidanceImport-tool-div" style={{marginLeft: "30px"}}>
                    <span>所属课时：</span>
                    <select name="" id="guidanceImport_tool_lessonSelect" onChange={this.lessonChange.bind(this)}>
                        {this.state._showLesson}
                    </select>
                </div>
            </div>
        );
    }
}