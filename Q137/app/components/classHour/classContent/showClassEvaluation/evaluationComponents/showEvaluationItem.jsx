import React, { Component } from 'react';

export default class ShowEvaluationItem extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let styles = {
            spanPointer: {
                cursor: "auto"
            }
        }
        let props = this.props;
        let { componentIndex, index,option } = props;
        return (
            <div>
                <div className="classEvaluation_wrap_msgTitle">{index + 1}.{props.value.msg}</div>
                <div className="classEvaluation_wrap_msgStar">
                    <div className="classEvaluation_wrap_msgStarBox">
                        <span style={styles.spanPointer} className={Number(option[componentIndex][index]) >= 1 ? "iconfont icon-star1" : "iconfont icon-star"}></span>
                        <span style={styles.spanPointer} className={Number(option[componentIndex][index]) >= 2 ? "iconfont icon-star1" : "iconfont icon-star"}></span>
                        <span style={styles.spanPointer} className={Number(option[componentIndex][index]) >= 3 ? "iconfont icon-star1" : "iconfont icon-star"}></span>
                        <span style={styles.spanPointer} className={Number(option[componentIndex][index]) >= 4 ? "iconfont icon-star1" : "iconfont icon-star"}></span>
                        <span style={styles.spanPointer} className={Number(option[componentIndex][index]) >= 5 ? "iconfont icon-star1" : "iconfont icon-star"}></span>
                    </div>
                    <i className={this.state.startNum == 0 ? "classEvaluation_wrap_msgScore" : ""}>{Number(option[componentIndex][index])}分</i>
                </div>
            </div>
        );
    }
}