import React, { Component } from 'react';

export default class BatchCommentItem extends Component {
    constructor() {
        super();
        this.state = {
            wordNum1: 0,
            wordNum2: 0,
        }
    }
    handlerChange() {
        let isDone = !this.props.isDone;
        this.props.changeTodoState(this.props.index, isDone);
    }
    ccommChange(e) {
        console.log(e.target.value.length);
        if(e.target.value.length > 300){
            e.target.value = e.target.value.substring(0, 300);
            return false;
        }
        this.props.userJudge == "C" ? this.props.ccommChange(this.props.index,e.target.value) : this.props.tcommChange(this.props.index,e.target.value);
        this.setState({
            wordNum1: e.target.value.length
        });
    }
    cscommChange(e) {
        if(e.target.value.length > 300){
            e.target.value = e.target.value.substring(0, 300);
            return false;
        }
        this.props.userJudge == "C" ? this.props.cscommChange(this.props.index,e.target.value) : this.props.tscommChange(this.props.index,e.target.value);
        this.setState({
            wordNum2: e.target.value.length
        });
    }
    render() {
        let props = this.props;
        let length1 = props.userJudge == "C" ? (props.ccomm == null ? 0 : props.ccomm.length) : (props.tcomm == null ? 0 : props.tcomm.length);
        let length2 = props.userJudge == "C" ? (props.cscomm == null ? 0 : props.cscomm.length) : (props.tscomm == null ? 0 : props.tscomm.length);
        return (
            <tr>
                <td className="batchComment_table_input">
                    <input id={"batchComment_table_input" + props.index} checked={props.isDone} onChange={this.handlerChange.bind(this)} type="checkbox"/>
                    <label htmlFor={"batchComment_table_input" + props.index}></label>
                </td>
                <td className="batchComment_table_name">{props.studentname || '--'}</td>
                <td className="batchComment_table_stuNo">{props.studentno || '--'}</td>
                <td>
                    <div className="batchComment_textarea_box">
                        <i className="batchComment_table_wordNum">已录入{this.state.wordNum1 === 0 ? length1 : this.state.wordNum1}个字</i>
                        <textarea placeholder="请输入公开评语" className="batchComment_textarea" defaultValue={props.userJudge == "C" ? props.ccomm : props.tcomm} onChange={this.ccommChange.bind(this)}>
                        </textarea>
                    </div>
                </td>
                <td>
                    <div className="batchComment_textarea_box">
                        <i className="batchComment_table_wordNum">已录入{this.state.wordNum2 === 0 ? length2 : this.state.wordNum2}个字</i>
                        <textarea placeholder="请输入非公开评语" className="batchComment_textarea" defaultValue={props.userJudge == "C" ? props.cscomm : props.tscomm} onChange={this.cscommChange.bind(this)}>

                        </textarea>
                    </div>
                </td>
            </tr>
        );
    }
}