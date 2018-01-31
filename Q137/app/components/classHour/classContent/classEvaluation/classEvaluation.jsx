import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import $ from 'jquery';
import './classEvaluation.css';
import { evaluationData } from './evaluationData.js';
import EvaluationComponents from './evaluationComponents/evaluationComponents.jsx';
import BombBox from '../../../public/bombBox/bombBox.js';

export default class ClassEvaluation extends Component {
    constructor() {
        super();
        this.state = {
            forcedegreeData: {optionC: "0-0-0-0", detailC: "",optionD: "0-0-0-0", detailD: ""},
            optionC: [0,0,0,0],
            optionD: [0,0,0,0],
            isHidden: true,
            bombBoxMsg: "是否提交该评价？提交后不可修改",
            lestor: [],
        }
    }
    componentWillMount() {
        this.getClassMtl();
    }
    componentDidMount() {
        if (this.props.getLessonByAjax !== undefined) {
            $(document).ready(function () {
                $('html,body').animate({
                    scrollTop: 170
                });
            });
        }
    }
    getClassMtl() {
        $.llsajax({
            url: "classes/getClassMtl",
            type: "POST",
            async: false,
            data: {
                lessonid: this.props.lessionID,
                degreeid: 0,
            },
            success: getClassMtlData => {
                this.setState({
                    lestor: [getClassMtlData.map.lector,getClassMtlData.map.master,getClassMtlData.map.teacher]
                });
            }
        });
    }
    getAddforcedegree(data) {
        const {optionC, detailC, optionD, detailD} = data;
        $.llsajax({
            url: "forcedegree/addfreedegree",
            type: "POST",
            async: false,
            data: {
                courseid: this.props.lessionID,
                optionC: optionC,
                detailC: detailC,
                optionD: optionD,
                detailD: detailD,
                teacher: this.state.lestor[2],
                master: this.state.lestor[1],
                lector: this.state.lestor[0],
            },
            success: lessonMessage => {
                if (lessonMessage.result === 200) {
                    if (this.props.getLessonByAjax !== undefined) {
                        this.props.onshowContent(0);
                        this.props.getLessonByAjax(this.props.lessionID,2);
                        $(document).ready(function () {
                            $('html,body').animate({
                                scrollTop: 170
                            });
                        });
                    } else {
                        hashHistory.push("/stuEvaluate?v=" + location.hash.split("&v=")[1].split("&")[0] + "&tm=" + location.hash.split("&tm=")[1].split("&")[0]);
                    }
                }
            }
        });
    }
    hideClick() {
        this.setState({
            isHidden: true
        });
    }
    enterClick() {
        this.getAddforcedegree(this.state.forcedegreeData);
        this.setState({
            isHidden: true
        });
    }
    onAddDegree() {
        if (this.state.forcedegreeData.optionC.indexOf('0') > -1 || this.state.forcedegreeData.optionD.indexOf('0') > -1) {
            this.props.onShowErrorBox();
        } else {
            this.setState({
                isHidden: false,
            });
        }
    }
    // 评价页面消失
    evaluationHide() {
        if (this.props.tabID !== undefined) {
            if (this.props.onshowContent !== undefined) {
                this.props.onshowContent(this.props.tabID);
            }
        } else {
            hashHistory.push("/stuEvaluate?v=" + location.hash.split("&v=")[1].split("&")[0] + "&tm=" + location.hash.split("&tm=")[1].split("&")[0]);
        }
    }
    _updateDataTextarea(areaData) {
        const {value, componentIndex} = areaData;
        if (componentIndex == 1) {
            this.state.forcedegreeData.detailC = value;
            this.setState({
                forcedegreeData: this.state.forcedegreeData
            });
        } else if (componentIndex == 2) {
            this.state.forcedegreeData.detailD = value;
            this.setState({
                forcedegreeData: this.state.forcedegreeData
            });
        }   
    }
    _updateData(data) {
        const {num, componentIndex, index} = data;
        if (componentIndex == 1) {
            this.state.optionC[index - 1] = num;
            this.state.forcedegreeData.optionC = this.state.optionC.join("-");
            this.setState({
                forcedegreeData: this.state.forcedegreeData,
                optionC: this.state.optionC
            });
        } else if (componentIndex == 2) {
            this.state.optionD[index - 1] = num;
            this.state.forcedegreeData.optionD = this.state.optionD.join("-");
            this.setState({
                forcedegreeData: this.state.forcedegreeData,
                optionD: this.state.optionD
            });
        }   
    }
    onBackTo() {
        if (this.props.onshowContent !== undefined) {
            this.props.onshowContent(0);
            $(document).ready(function () {
                $('html,body').animate({
                    scrollTop: 170
                });
            });
        } else {
            hashHistory.push("/stuEvaluate?v=" + location.hash.split("&v=")[1].split("&")[0] + "&tm=" + location.hash.split("&tm=")[1].split("&")[0]);
        }
    }
    render() {
        let props = this.props;
        return (
            <div style={props.background}>
                <div className="classEvaluation_box" style={props.style}>
                    <div className="classEvaluation_title" style={props.margin}>课时评价问卷</div>
                    <a className="classEvaluation_back" style={props.position} onClick={this.evaluationHide.bind(this)}>返回<i className="iconfont icon-back"></i></a>
                    <div className="classEvaluation_wrap" style={props.styles}>
                        {evaluationData.map((value,index) => {
                            return <EvaluationComponents
                                _updateData = {this._updateData.bind(this)}
                                _updateDataTextarea = {this._updateDataTextarea.bind(this)}
                                key={index} 
                                componentIndex={index}
                                title={value.title} 
                                obj={value.obj} 
                                label={value.label} 
                                list={value.list}
                                color={value.color}
                                fontStyle={value.fontStyle}
                                bg={value.bg}
                                lestor={this.state.lestor}
                            />
                        })}
                        <div className="classEvaluation_button" style={props.buttonStyle}>
                            <span onClick={this.onBackTo.bind(this)}>取消</span>
                            <span className="commonButton button" onClick={this.onAddDegree.bind(this)}>提交</span>
                        </div>
                    </div>
                </div>
                <BombBox 
                    hideClick={this.hideClick.bind(this)}
                    enterClick={this.enterClick.bind(this)}
                    isHidden={this.state.isHidden}
                    bombBoxMsg={this.state.bombBoxMsg}
                />
            </div>
        );
    }
}