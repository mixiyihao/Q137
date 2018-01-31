import React, { Component } from 'react';
import $ from 'jquery';
import { Link, hashHistory } from 'react-router';
import './evaluatePage.css';
import ruData from '../../headMasterComponents/ruData.js';
import { evaluationDataMore } from '../classHour/classContent/classEvaluation/evaluationData.js';
import EvaluationComponents from './evaluationComponents/evaluationComponents.jsx';
import BombBox from '../public/bombBox/bombBox.js';
import ErrorBox from '../../teacherComponents/bombBox/bombBox.js';

export default class EvaluatePage extends Component {
    constructor() {
        super();
        this.state = {
            forcedegreeData: {optionA: "0-0-0-0", detailA: "",optionB: "0-0-0-0", detailB: "",optionC: "0-0-0-0", detailC: "",optionD: "0-0-0-0", detailD: ""},
            optionA: [0,0,0,0],
            optionB: [0,0,0,0],
            optionC: [0,0,0,0],
            optionD: [0,0,0,0],
            isHidden: true,
            bombBoxMsg: "是否提交该评价？提交后不可修改",
            degreeId: null,
            lestor: [],
            isHiddenError: true,
            bombBoxMsgError: "至少选择一颗星星",
            getClassMtlData: [],
            term: ['第一学期','第二学期','第三学期','第四学期','第五学期'],
        }
    }
    componentWillMount() {
        if (location.hash.indexOf('i=') > -1) {
            this.setState({
                degreeId: Base64.decode(location.hash.split("i=")[1].split("&")[0]),
            });
        }
    }
    getClassMtl() {
        $.llsajax({
            url: "classes/getClassMtl",
            type: "POST",
            async: false,
            data: {
                lessonid: 0,
                degreeid: this.state.degreeId == null ? "" : this.state.degreeId,
            },
            success: getClassMtlData => {
                this.setState({
                    getClassMtlData: getClassMtlData.map,
                    lestor: [getClassMtlData.map.teacher,getClassMtlData.map.master,getClassMtlData.map.lector],
                    sDate: ruData(getClassMtlData.map.sdate).substr(0,16),
                    eDate: ruData(getClassMtlData.map.eddate).substr(0,16),
                });
            }
        });
    }
    componentDidMount() {
        $("html").css("overflow-y","auto");
        this.getClassMtl();
    }
    getAddforcedegree(data) {
        const {optionA, detailA, optionB, detailB, optionC, detailC, optionD, detailD} = data;
        $.llsajax({
            url: "forcedegree/addforcedegree",
            type: "POST",
            async: false,
            data: {
                degreeid: this.state.degreeId == null ? "" : this.state.degreeId,
                optionA: optionA,
                detailA: detailA,
                optionB: optionB,
                detailB: detailB,
                optionC: optionC,
                detailC: detailC,
                optionD: optionD,
                detailD: detailD,
                teacher: this.state.lestor[0],
                master: this.state.lestor[1],
                lector: this.state.lestor[2],
            },
            success: lessonMessage => {
                if (lessonMessage.result == 200) {
                    hashHistory.push("/stuEvaluate");
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
        if (this.state.forcedegreeData.optionA.indexOf('0') > -1 || this.state.forcedegreeData.optionB.indexOf('0') > -1 || this.state.forcedegreeData.optionC.indexOf('0') > -1 || this.state.forcedegreeData.optionD.indexOf('0') > -1) {
            this.setState({
                isHiddenError: !this.state.isHiddenError
            });
        } else {
            this.setState({
                isHidden: false
            });
        }
    }
    hideClickError() {
        this.setState({
            isHiddenError: !this.state.isHiddenError
        });
    }
    _updateDataTextarea(areaData) {
        const {value, componentIndex} = areaData;
        if (componentIndex == 1) {
            this.state.forcedegreeData.detailA = value;
            this.setState({
                forcedegreeData: this.state.forcedegreeData
            });
        } else if (componentIndex == 2) {
            this.state.forcedegreeData.detailB = value;
            this.setState({
                forcedegreeData: this.state.forcedegreeData
            });
        } else if (componentIndex == 3) {
            this.state.forcedegreeData.detailC = value;
            this.setState({
                forcedegreeData: this.state.forcedegreeData
            });
        } else if (componentIndex == 4) {
            this.state.forcedegreeData.detailD = value;
            this.setState({
                forcedegreeData: this.state.forcedegreeData
            });
        }   
    }
    _updateData(data) {
        const {num, componentIndex, index} = data;
        if (componentIndex == 1) {
            this.state.optionA[index - 1] = num;
            this.state.forcedegreeData.optionA = this.state.optionA.join("-");
            this.setState({
                forcedegreeData: this.state.forcedegreeData,
                optionA: this.state.optionA
            });         
        } else if (componentIndex == 2) {
            this.state.optionB[index - 1] = num;
            this.state.forcedegreeData.optionB = this.state.optionB.join("-");
            this.setState({
                forcedegreeData: this.state.forcedegreeData,
                optionB: this.state.optionB
            });
        } else if (componentIndex == 3) {
            this.state.optionC[index - 1] = num;
            this.state.forcedegreeData.optionC = this.state.optionC.join("-");
            this.setState({
                forcedegreeData: this.state.forcedegreeData,
                optionC: this.state.optionC
            });
        } else if (componentIndex == 4) {
            this.state.optionD[index - 1] = num;
            this.state.forcedegreeData.optionD = this.state.optionD.join("-");
            this.setState({
                forcedegreeData: this.state.forcedegreeData,
                optionD: this.state.optionD
            });
        }   
    }
    onBackTo() {
        if (location.hash.indexOf("tm=") > -1) {
            hashHistory.push("/stuEvaluate?tm=" + location.hash.split("tm=")[1].split("&")[0]);
        } else {
            hashHistory.push("/stuEvaluate");
        }
    }
    render() {
        return (
            <div className="evaluatePage_box" style={this.props.box}>
                <div className="evaluatePage_title">老师评价问卷</div>
                <a onClick={this.onBackTo.bind(this)} className="evaluatePage_back">返回<i className="iconfont icon-back"></i></a>
                <div className="evaluatePage_msg">
                    <div className="evaluatePage_time">
                        <span className="evaluatePage_time_name">{this.state.getClassMtlData.dname}</span>
                        <i className="evaluatePage_time_date">
                            <b>{this.state.sDate}</b> - <b>{this.state.eDate}</b>
                        </i>
                    </div>
                    <div className="evaluatePage_lesson">
                        <span className="evaluatePage_lesson_term">
                            <i>学期：</i>
                            <i>{this.state.term[this.state.getClassMtlData.term == null ? 0 : this.state.getClassMtlData.term - 1]}</i>
                        </span>
                        <span className="evaluatePage_lesson_term">
                            <i>课程名称：</i>
                            <i>{this.state.getClassMtlData.coursename}</i>
                        </span>
                        <span className="evaluatePage_lesson_term">
                            <i>班级名称：</i>
                            <i>{this.state.getClassMtlData.name}</i>
                        </span>
                    </div>
                </div>
                <div className="evaluatePage_wrap" style={this.props.width}>
                    {evaluationDataMore.map((value,index) => {
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
                    <div className="evaluatePage_button">
                        <span onClick={this.onBackTo.bind(this)}>取消</span>
                        <span className="commonButton button" onClick={this.onAddDegree.bind(this)}>提交</span>
                    </div>
                </div>
                <BombBox 
                    hideClick={this.hideClick.bind(this)}
                    enterClick={this.enterClick.bind(this)}
                    isHidden={this.state.isHidden}
                    bombBoxMsg={this.state.bombBoxMsg}
                />
                <ErrorBox 
                    hideClick={this.hideClickError.bind(this)}
                    isHidden={this.state.isHiddenError}
                    bombBoxMsg={this.state.bombBoxMsgError}
                />
            </div>
        );
    }
}