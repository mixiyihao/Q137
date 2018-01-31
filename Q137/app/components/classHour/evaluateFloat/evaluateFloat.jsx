import React, { Component } from 'react';
import './evaluateFloat.css';

export default class EvaluateFloat extends Component{
    constructor() {
        super();
        this.state = {
            isShow: false,
            msg: ["真实的评价有助于我们为你提供服务","感谢您的评价"],
            button: ["立即评价","我的评价"],
            animation: false,
        }
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.floatHide) {
            this.setState({
                isShow: false,
                animation: false
            });
        }
    }
    onCircleEnter() {
        this.setState({
            isShow: !this.state.isShow
        });
        let _this = this;
        this.timer = setTimeout(()=>{
            _this.setState({
                animation: true
            });
        },200);
        if (this.props.onShowFloat) {
            this.props.onShowFloat();
        }
        if (this.props.onHideWork) {
            this.props.onHideWork(true);
        }
    }
    onCenterLeave() {
        this.setState({
            isShow: false,
            animation: false
        });
    } 
    evaluationShow() {
        this.props.onshowContent(7);
    }
    evaluationShowView() {
        this.props.onshowContent(8);
    }
    render() {
        return (
            <div className="evaluateFloat_box" style={this.props.style}>
                {
                    this.state.isShow ? 
                        <span id="evaluateFloat_circle" className="evaluateFloat_circle iconfont icon-pingjiaguanbi" onClick={this.onCircleEnter.bind(this)}>
                            
                        </span> : 
                        <span id="evaluateFloat_circle" className="evaluateFloat_circle" onClick={this.onCircleEnter.bind(this)}>
                            评价
                            <i></i>
                        </span>
                }
                <div className={this.state.isShow ? "evaluateFloat_center Active" : "evaluateFloat_center"} id="evaluateFloat_center" onMouseLeave={this.onCenterLeave.bind(this)}>
                    <div className="evaluateFloat_child">
                        <div className="evaluateFloat_left">
                            <span className="iconfont icon-manyidupingjia"></span>
                        </div>
                        <div className="evaluateFloat_right">
                            <p>{this.props.degree == 0 ? this.state.msg[0] : this.state.msg[1]}</p>
                            <span className={this.state.animation ? "fade" : ""} onClick={this.props.degree == 0 ? this.evaluationShow.bind(this) : this.evaluationShowView.bind(this)}>{this.props.degree == 0 ? this.state.button[0] : this.state.button[1]}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}