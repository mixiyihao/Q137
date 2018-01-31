import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import './evaluatePopBox.css';

export default class EvaluatePopBox extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
        };
    }
    componentWillMount() {
        $("html").css("overflow-y","hidden");
    }
    componentWillUnmount() {
        $("html").css("overflow-y","auto");
    }
    componentDidMount() {
        let _this = this;
        this.timer = setTimeout(()=>{
            let name = Base64.decode(sessionStorage.getItem('n'));
            _this.setState({
                name: name
            });
        },100);
        
    }
    onLinkTo() {
        hashHistory.push({
            pathname: "/evaluatePageMain",
            query: {
                i: Base64.encodeURI(this.props.degree)
            }
        });
    }
    render() {
        return (
            <div className="evaluatePopBox_box">
                <p className="evaluatePopBox_title">课程评价</p>
                <p className="evaluatePopBox_msg">说明：课程评价必须在规定的时间内填写</p>
                <div className="evaluatePopBox_center">
                    <span className="evaluatePopBox_icon iconfont icon-manyidupingjia"></span>
                    <div className="evaluatePopBox_message">
                        <p>{this.state.name}，你好！</p>
                        <p>您有待提交的满意度评价，请优先去进行评价</p>
                    </div>
                </div>
                <div className="evaluatePopBox_button" onClick={this.onLinkTo.bind(this)}>立即评价</div>
            </div>
        );
    }
}