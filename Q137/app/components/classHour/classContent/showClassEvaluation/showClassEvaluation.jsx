import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import $ from 'jquery';
import '../classEvaluation/classEvaluation.css';
import { evaluationData } from '../classEvaluation/evaluationData.js';
import ShowEvaluationComponents from './evaluationComponents/showEvaluationComponents.jsx';

export default class ClassEvaluation extends Component {
    constructor() {
        super();
        this.state = {
            userFreeDegreeView: [],
            detail: [],
            option: [[],[]],
            lestor: []
        }
    }
    componentWillMount() {
        $.llsajax({
            url: "forcedegree/userFreeDegreeView",
            data: {
                lessonid: this.props.lessionID
            },
            type: "POST",
            async: true,
            success: userFreeDegreeView => {
                let detailarr = [userFreeDegreeView.obj.detailC,userFreeDegreeView.obj.detailD];
                let optionArr = [[userFreeDegreeView.obj.optionC1,userFreeDegreeView.obj.optionC2,userFreeDegreeView.obj.optionC3,userFreeDegreeView.obj.optionC4],[userFreeDegreeView.obj.optionD1,userFreeDegreeView.obj.optionD2,userFreeDegreeView.obj.optionD3,userFreeDegreeView.obj.optionD4]];
                this.setState({
                    userFreeDegreeView: userFreeDegreeView.obj,
                    detail: detailarr,
                    option: optionArr
                });
            }
        });
        this.getClassMtl();
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
    componentDidMount() {
        if (this.props.tabID !== undefined) {
            $(document).ready(function () {
                $('html,body').animate({
                    scrollTop: 170
                });
            });
        }
    }
    // 评价页面消失
    evaluationHide() {
        if (this.props.onshowContent !== undefined) {
            this.props.onshowContent(0);
        } else {
            hashHistory.push("/stuEvaluate?v=" + location.hash.split("&v=")[1].split("&")[0] + "&tm=" + location.hash.split("&tm=")[1].split("&")[0]);
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
        return (
            <div style={this.props.background}>
                <div className="classEvaluation_box" style={this.props.style}>
                    <div className="classEvaluation_title" style={this.props.margin}>{this.props.title || "查看评价"}</div>
                    <a className="classEvaluation_back" style={this.props.position} onClick={this.evaluationHide.bind(this)}>返回<i className="iconfont icon-back"></i></a>
                    <div className="classEvaluation_wrap" style={this.props.styles}>
                        {evaluationData.map((value,index) => {
                            return <ShowEvaluationComponents
                                key={index} 
                                componentIndex={index}
                                title={value.title} 
                                obj={value.obj} 
                                label={value.label} 
                                list={value.list}
                                color={value.color}
                                fontStyle={value.fontStyle}
                                bg={value.bg}
                                detail={this.state.detail}
                                option={this.state.option}
                                lestor={this.state.lestor}
                            />
                        })}
                    </div>
                </div>
            </div>
        );
    }
}