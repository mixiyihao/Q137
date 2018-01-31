import React, { Component } from 'react';
import url from '../../../../controller/url.js';
import $ from 'jquery';
import './showExerciesBox.css';

export default class ShowExerciesBox extends Component {
    constructor() {
        super();
        this.state = {
            question: '',
            answer1: '',
            answer2: '',
            imgSrc: ''
        }
    }

    onCloseBox() {
        this.props.onCloseBox();
    }

    componentDidMount() {
        this.findPracticeByIdAjax(this.props.practicesID);
    }

    findPracticeByIdAjax(id) {
        $.llsajax({
            url: "lesson/findPracticeById",
            type: "POST",
            async: true,
            data: {
                id: id
            },
            success: findPracticeByIdData => {
                this.setState({
                    question: findPracticeByIdData.practice.question,
                    answer1: findPracticeByIdData.practice.answer1,
                    answer2: findPracticeByIdData.practice.answer2,
                    imgSrc: findPracticeByIdData.practice.picurl
                });
            }
        })
    }

    render() {
        return (
            <div className="showExerciesBox-container">
                <div className="showExerciesBox-wrap">
                    <div className="showExerciesBox-title">
                        <span className="showExerciesBox-title-msg">预览练习题</span>
                        <span className="iconfont icon-guanbi showExerciesBox-title-close" onClick={this.onCloseBox.bind(this)}></span>
                    </div>
                    <div className="showExerciesBox-content">
                        <div className="showExerciesBox-content-title">
                            <div>{this.state.question}</div>
                        </div>
                        <div className="showExerciesBox-content-message clearfix">
                            {
                                this.state.imgSrc === null ?
                                    null
                                    :
                                    <img src={url.WEBURL + this.state.imgSrc} alt=""/>
                            }
                            <div className="showExerciesBox-content-tab">
                                <i className="showExerciesBox-content-icon iconfont icon-jietisilu"></i>
                                <span className="showExerciesBox-content-msg">解题思路</span>
                                <div className="showExerciesBox-content-line"></div>
                            </div>
                            <div className="showExerciesBox-content-text">
                                <div>
                                    <textarea value={this.state.answer1} readOnly="readOnly"></textarea>
                                </div>
                            </div>
                            <div className="showExerciesBox-content-tab">
                                <i className="showExerciesBox-content-icon iconfont icon-wanquanjiexi"></i>
                                <span className="showExerciesBox-content-msg">完全解析</span>
                                <div className="showExerciesBox-content-line"></div>
                            </div>
                            <div className="showExerciesBox-content-text">
                                <div>
                                    <textarea value={this.state.answer2} readOnly="readOnly"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}