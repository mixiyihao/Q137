import React, { Component } from 'react';
import $ from 'jquery';
import './replyBox.css';

export default class ReplyBox extends Component {
    constructor() {
        super();
        this.state = {
            answer: '',
            labelArr: [],
            oq: [],
            askertype: ''
        }
    }
    componentDidMount() {
        $("html").css("overflow-y","hidden");
        $.llsajax({
            url: "onlineqa/findQuestionid",
            type: "post",
            data: {
                questionid: this.props.replyQuestionID
            },
            async: true,
            success: findQuestionidData => {
                console.log(findQuestionidData);
                let arr = findQuestionidData.oq.label.split(",");
                for(var i = 0; i < arr.length; i++) {
                    if(arr[i] == "") {
                        arr.splice(i,1);
                        i = i - 1;
                    }
                }
                this.setState({
                    oq: findQuestionidData.oq,
                    labelArr: arr,
                    askertype: findQuestionidData.askertype
                });
            }
        })
    }
    labelNode() {
        return this.state.labelArr.map((value,index) => {
            return (
                <span className="replyBox-question-label-node" key={index}>{value}</span>
            );
        })
    }
    onHideReply() {
        this.props.onHideReply();
    }
    onEnterSaveQuestion() {
        if ( this.state.answer.length === 0 ) {
            return false;
        }
        $.llsajax({
            url: "onlineqa/edit",
            type: "post",
            data: {
                id: this.props.replyQuestionID,
                answer: this.state.answer,
            },
            async: true,
            success: editData => {
                this.props.onHideReply();
                this.props.getNoAnswerQuestionAjax(1);
                this.props.getComent(1);
                console.log(editData);
            }
        })
    }
    onChangeAnswer(e) {
        let answerValue = e.target.value;
        if (answerValue.length > 200) {
            e.target.value = e.target.value.substring(0, 200);
            return false;
        }
        this.setState({
            answer: answerValue
        })
    }
    _askertypeShow(value) {
        let askertype = '';
        switch (value) {
            case "S" :
                askertype = '学生';
                break;
            case "T" :
                askertype = '助教';
                break;
            case "C" :
                askertype = '班主任';
                break;
            case "TM" :
                askertype = '助教总监';
                break;
            case "CM" :
                askertype = '班主任总监';
                break;
            default:
                askertype = '';
        }
        return askertype;
    }
    render() {
        console.log(this.state.answer.length);
        return (
            <div className="replyBox-container">
                <div className="replyBox-wrap">
                    <div className="replyBox-title">
                        <span className="replyBox-title-msg">回复在线提问</span>
                        <span className="replyBox-title-close iconfont icon-guanbi" onClick={this.onHideReply.bind(this)}></span>
                    </div>
                    <div className="replyBox-scroll">
                        <div className="replyBox-question-title">
                            <span className="replyBox-question-title-msg">问题：</span>
                            <p title="">{this.state.oq.question}</p>
                        </div>
                        <div className="replyBox-question-msg">
                            <span>问题说明：</span>
                            <div className="replyBox-question-detail" dangerouslySetInnerHTML={{ __html: this.state.oq.detailtext }} />
                        </div>
                        <div className="replyBox-question-people">
                            <div className="replyBox-question-people-name">
                                <span className="replyBox-question-people-span">提问人：</span>
                                <span className="prople-name">{this.state.oq.username} - {this._askertypeShow(this.state.askertype)}</span>
                            </div>
                            <div className="replyBox-question-people-time">
                                <span className="replyBox-question-people-span">提问时间：</span>
                                <span className="people-time">{this.state.oq.length === 0 ? "" : this.state.oq.subtime.substr(0,19)}</span>
                            </div>
                        </div>
                        <div className={this.state.labelArr.length === 0 ? "replyBox-question-label-none" : "replyBox-question-label"}>
                            <span className="replyBox-question-label-title">问题标签：</span>
                            <div className="replyBox-question-label-box">
                                {this.labelNode()}
                            </div>
                        </div>
                        <div className="replyBox-question-answer">
                            <span className="replyBox-question-answer-title">回复答案：</span>
                            <textarea onChange={this.onChangeAnswer.bind(this)}></textarea>
                        </div>
                        <div className="replyBox-question-button">
                            <span className="replyBox-question-button-cancel" onClick={this.onHideReply.bind(this)}>取消</span>
                            <span className={this.state.answer.length === 0 ? "replyBox-question-button-none" : "replyBox-question-button-enter button commonButton"} onClick={this.onEnterSaveQuestion.bind(this)}>提交</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentWillUnmount() {
        $("html").css("overflow-y","auto");
    }
}