import React, { Component } from 'react';
import ShowEvaluationItem from './showEvaluationItem.jsx';

export default class ShowEvaluationComponents extends Component {
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
        let props = this.props;
        let {componentIndex} = props;
        let styles = {
            threeSpanBg: {
                background: props.color,
                color: props.fontStyle,
            },
            oneTitleBg: {
                background: props.bg,
            },
            oneTitleIBg: {
                borderLeftColor: props.bg,
            }
        }
        return (
            <div className="classEvaluation_wrap_box">
                <div className="classEvaluation_wrap_oneTitleBox">
                    <div className="classEvaluation_wrap_oneTitle" style={styles.oneTitleBg}>
                        <i style={styles.oneTitleIBg}></i>
                        <span className="classEvaluation_wrap_oneSpan">{props.title}</span>
                        <span className="classEvaluation_wrap_twoSpan">评价对象：{componentIndex == 0 ? props.lestor[0] : props.obj}</span>
                        <span className="classEvaluation_wrap_threeSpan" style={styles.threeSpanBg}>{props.label}</span>
                    </div>
                </div>
                {this.props.list.map((value,index) => {
                    return <ShowEvaluationItem key={index} index={index} componentIndex={componentIndex} value={value} _updateData = {this._updateData.bind(this)} option={props.option}/>
                })}
                <div className="classEvaluation_wrap_textarea">
                    <span>5.其它评价：</span>
                    <div className="classEvaluation_wrap_text">
                        <i className={this.state.isShow ? "" : "classEvaluation_wrap_iShow"}>输入评价字数为200个汉字以内</i>
                        <textarea disabled value={props.detail[componentIndex]} onChange={this.onTextareaChange.bind(this)} onFocus={this.onShowMsg.bind(this)} onBlur={this.onHideMsg.bind(this)}></textarea>
                    </div>
                    
                </div>
            </div>
        );
    }
} 