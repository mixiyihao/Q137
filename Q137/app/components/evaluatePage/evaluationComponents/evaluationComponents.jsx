import React, { Component } from 'react';
import EvaluationItem from './EvaluationItem.jsx';

export default class EvaluationComponents extends Component {
    constructor() {
        super();
        this.state = {
            isShow: false,
        }
    }
    _updateData(data) {
        const {num, componentIndex, index} = data;
        this.props._updateData({num: num, componentIndex: componentIndex, index: index});
    }
    onTextareaChange(e) {
        let textLength = e.target.value.length;
        if (textLength > 200) {
            e.target.value = e.target.value.substring(0, 200)
        } else {
            this.props._updateDataTextarea({value: e.target.value, componentIndex: this.props.componentIndex + 1});
        }
    }
    onShowMsg() {
        this.setState({
            isShow: true
        });
    }
    onHideMsg() {
        this.setState({
            isShow: false
        });
    }
    render() {
        let styles = {
            threeSpanBg: {
                background: this.props.color,
                color: this.props.fontStyle,
            },
            oneTitleBg: {
                background: this.props.bg,
            },
            oneTitleIBg: {
                borderLeftColor: this.props.bg,
            }
        }
        return (
            <div className="evaluatePage_wrap_box">
                <div className="evaluatePage_wrap_oneTitleBox">
                    <div className="evaluatePage_wrap_oneTitle" style={styles.oneTitleBg}>
                        <i style={styles.oneTitleIBg}></i>
                        <span className="evaluatePage_wrap_oneSpan">{this.props.title}</span>
                        <span className="evaluatePage_wrap_twoSpan">评价对象：{this.props.componentIndex != 3 ? this.props.lestor[this.props.componentIndex] : this.props.obj}</span>
                        <span className="evaluatePage_wrap_threeSpan" style={styles.threeSpanBg}>{this.props.label}</span>
                    </div>
                </div>
                {this.props.list.map((value,index) => {
                    return <EvaluationItem key={index} index={index} componentIndex={this.props.componentIndex} value={value} _updateData = {this._updateData.bind(this)}/>
                })}
                <div className="evaluatePage_wrap_textarea">
                    <span>5.其它评价：</span>
                    <div className="evaluatePage_wrap_text">
                        <i className={this.state.isShow ? "" : "evaluatePage_wrap_iShow"}>输入评价字数为200个汉字以内</i>
                        <textarea placeholder="请在这里填写评价" onChange={this.onTextareaChange.bind(this)} onFocus={this.onShowMsg.bind(this)} onBlur={this.onHideMsg.bind(this)}></textarea>
                    </div>
                </div>
            </div>
        );
    }
}