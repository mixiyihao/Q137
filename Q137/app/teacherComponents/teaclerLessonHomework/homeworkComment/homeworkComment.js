/**
 * Created by YH on 2017/2/24.
 */

import React from 'react';
import $ from 'jquery';
import styles from './styleHomeworkComment';

export default class HomeworkComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stydentScore: 5, //得分
            stydentIntegral: 2, //积分
            closeFlag: true,
            isBorder: false
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            stydentScore: nextProps.score,
            stydentIntegral: nextProps.integral
        });
    }
    componentDidMount() {
    }
    // 确定添加评语及积分，得分状况
    messageEnter() {
        this.props.acknowledgedTrue({ stydentScore: this.state.stydentScore, stydentIntegral: this.state.stydentIntegral, comment: this.refs.y_homeworkCommentTextarea.value });
        this.setState({
            closeFlag: true
        });
    }
    // 不添加信息，关闭窗口
    messageHide() {
        this.props.acknowledgedTrue2();
        this.setState({
            closeFlag: true
        });
    }
    // 获取得分
    onScore(e) {
        this.setState({
            stydentScore: e.target.value
        });
    }
    // 获取积分
    onIntegral(e) {
        this.setState({
            stydentIntegral: e.target.value
        });
    }
    // 限制输入框字符长度
    textareaLength(e) {
        let textLength = e.target.value.length;
        if (textLength > 60) {
            e.target.value = e.target.value.substring(0, 60)
        }
    }
    enterClose() {
        this.setState({
            closeFlag: !this.state.closeFlag
        });
    }
    enterClose() {
        this.setState({
            closeFlag: !this.state.closeFlag
        });
    }
    onTextareaStyle() {
        this.setState({
            isBorder: true
        });
    }

    hideTextareaStyle() {
        this.setState({
            isBorder: false
        });
    }
    render() {
        return this.props.isSuccess ? null : (
            <div>
                <div style={styles.y_homeworkCommentBox}></div>
                <div style={styles.y_homeworkCommentCenter} className="y_nowbombBoxCenter">
                    <div style={styles.y_homeworkCommentTitle}>
                        <span style={styles.y_homeworkCommentTitleMsg}>添加</span>
                        <span className="iconfont icon-guanbi" style={this.state.closeFlag ? styles.y_homeworkCommentTitleClose : styles.y_homeworkCommentTitleClose2} onClick={this.messageHide.bind(this)} onMouseEnter={this.enterClose.bind(this)} onMouseLeave={this.enterClose.bind(this)}></span>
                    </div>
                    <p style={styles.y_homeworkCommentStydent}>To学生一：</p>
                    <div style={styles.y_homeworkCommentSelect}>
                        <div style={styles.y_homeworkCommentSelect1}>
                            <span style={styles.y_homeworkCommentSelect1Span}>成绩：</span>
                            {this.props.flag ? <span style={styles.y_homeworkCommentScoreSpan}>{this.state.stydentScore + "分"}</span> : <select ref="y_homeworkCommentSelect1Select" id="homeworkCommentSelect1Select" style={styles.y_homeworkCommentSelect1Select} onChange={this.onScore.bind(this)}>
                                <option value="5">&nbsp;5</option>
                                <option value="4">&nbsp;4</option>
                                <option value="3">&nbsp;3</option>
                                <option value="2">&nbsp;2</option>
                                <option value="1">&nbsp;1</option>
                            </select>}
                            {this.props.flag ? null : <span style={styles.y_homeworkCommentSelect1Span2}>分</span>}
                        </div>
                        {/*<div style={styles.y_homeworkCommentSelect2}>*/}
                            {/*<span style={styles.y_homeworkCommentSelect2Span}>积分：</span>*/}
                            {/*{this.props.flag ? <span style={styles.y_homeworkCommentScoreSpan}>{this.state.stydentIntegral + "分"}</span> : <select id="homeworkCommentSelect2Select" style={styles.y_homeworkCommentSelect2Select} onChange={this.onIntegral.bind(this)}>*/}
                                {/*<option value="2">&nbsp;2</option>*/}
                                {/*<option value="1">&nbsp;1</option>*/}
                                {/*<option value="0">&nbsp;0</option>*/}
                            {/*</select>}*/}
                            {/*{this.props.flag ? null : <span style={styles.y_homeworkCommentSelect2Span2}>分</span>}*/}
                        {/*</div>*/}
                    </div>
                    <div style={styles.y_homeworkCommentTextareaBox}>
                        <span style={styles.y_homeworkCommentTextareaTitle}>教师评语：</span>
                        <div style={styles.y_homeworkCommentTextareaDiv}>
                            <textarea onChange={this.textareaLength.bind(this)} ref="y_homeworkCommentTextarea" style={this.state.isBorder ? styles.y_homeworkCommentTextarea2 : styles.y_homeworkCommentTextarea} defaultValue={this.props.commentValue} onMouseEnter={this.onTextareaStyle.bind(this)} onMouseLeave={this.hideTextareaStyle.bind(this)}></textarea>
                            <div style={styles.y_homeworkCommentTextareaMsg}>
                                <span style={styles.y_homeworkCommentTextareaMsgSpan}>最多输入120个字符</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span style={styles.y_homeworkCommentEnter} onClick={this.messageHide.bind(this)}>取消</span>
                        <span style={styles.y_homeworkCommentHide} onClick={this.messageEnter.bind(this)}>提交</span>
                    </div>
                </div>
            </div>
        );
    }
}
