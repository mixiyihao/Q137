import React, { Component } from 'react';

export default class EvaluationItem extends Component {
    constructor() {
        super();
        this.state = {
            startNum: 0,
            enterNum: 0,
            startFlag: false,
            outFlag: true
        }
    }
    onStartEnter(startNum) {
        this.setState({
            startNum: startNum,
            startFlag: true
        });
    }
    onStartLeave(startNum) {
        this.state.startNum = this.state.enterNum
        if (this.state.outFlag) {
            this.setState({
                startNum: this.state.startNum,
                startFlag: true,
            });
        }
        this.setState({
            startNum: this.state.startNum,
        });
    }
    onStartClick(startFlag,num,componentIndex,index) {
        this.state.outFlag = false;
        this.setState({
            startFlag: startFlag,
            outFlag: this.state.outFlag,
            enterNum: num,
        });
        this.props._updateData({num: num, componentIndex: componentIndex, index: index});
    }
    render() {
        return (
            <div>
                <div className="evaluatePage_wrap_msgTitle">{this.props.index + 1}.{this.props.value.msg}</div>
                <div className="evaluatePage_wrap_msgStar">
                    <div className="evaluatePage_wrap_msgStarBox" onMouseLeave={this.onStartLeave.bind(this,0)}>
                        <span className={this.state.startNum >= 1 && this.state.startFlag == true ? "iconfont icon-star1" : "iconfont icon-star"} onMouseEnter={this.onStartEnter.bind(this,1)} onClick={this.onStartClick.bind(this,true,1,this.props.componentIndex + 1,this.props.index + 1)}></span>
                        <span className={this.state.startNum >= 2 && this.state.startFlag == true ? "iconfont icon-star1" : "iconfont icon-star"} onMouseEnter={this.onStartEnter.bind(this,2)} onClick={this.onStartClick.bind(this,true,2,this.props.componentIndex + 1,this.props.index + 1)}></span>
                        <span className={this.state.startNum >= 3 && this.state.startFlag == true ? "iconfont icon-star1" : "iconfont icon-star"} onMouseEnter={this.onStartEnter.bind(this,3)} onClick={this.onStartClick.bind(this,true,3,this.props.componentIndex + 1,this.props.index + 1)}></span>
                        <span className={this.state.startNum >= 4 && this.state.startFlag == true ? "iconfont icon-star1" : "iconfont icon-star"} onMouseEnter={this.onStartEnter.bind(this,4)} onClick={this.onStartClick.bind(this,true,4,this.props.componentIndex + 1,this.props.index + 1)}></span>
                        <span className={this.state.startNum >= 5 && this.state.startFlag == true ? "iconfont icon-star1" : "iconfont icon-star"} onMouseEnter={this.onStartEnter.bind(this,5)} onClick={this.onStartClick.bind(this,true,5,this.props.componentIndex + 1,this.props.index + 1)}></span>
                    </div>
                    <i className={this.state.startNum == 0 ? "evaluatePage_wrap_msgScore" : ""}>{this.state.startNum}分</i>
                </div>
            </div>
        );
    }
}