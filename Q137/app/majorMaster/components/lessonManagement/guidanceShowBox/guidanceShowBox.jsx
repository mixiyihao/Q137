import React, {Component} from 'react';
import $ from 'jquery';
import './guidanceShowBox.css';
import { _showStage } from '../../../util/methods.js';

/*
* 课时目标预览组件
* css样式引用了课程目标guidanceImportBox.css的样式
* 修改的样式在guidanceShowBox.css里面
* */
export default class GuidanceShowBox extends Component {
    constructor() {
        super();
        this.state = {
            echoTargetData: [],
            teachguidances: [],
        }
    }

    componentWillMount() {
        this.echoTargetAjax(this.props.targetID);
    }

    echoTargetAjax(id) {
        $.llsajax({
            url: "lessonDate/echoTarget",
            type: "POST",
            async: true,
            data: {
                targetid: id
            },
            success: echoTargetData => {
                this.setState({
                    echoTargetData: echoTargetData.target,
                    teachguidances: echoTargetData.target.teachguidances
                });
            }
        })
    }

    // 关闭弹框
    onCloseBox() {
        this.props.onCloseBox();
    }

    _showTeachguidances() {
        return this.state.teachguidances.map((value2,index) => {
            return (
                <li key={index}>{value2.ordernum + " " + value2.step}{value2.way === 1 ? "" : "(" + value2.timelong + ")"}</li>
            );
        })
    }

    render() {
        return (
            <div className="guidanceImportBox-container">
                <div className="guidanceImportBox-wrap">
                    <div className="guidanceImportBox-title">
                        <span className="guidanceImportBox-title-title-msg">预览课时目标</span>
                        <span className="iconfont icon-guanbi guidanceImportBox-title-title-close" onClick={this.onCloseBox.bind(this)}></span>
                    </div>
                    <div className="guidanceShowBox-box">
                        <div className="guidanceImportBox-content-msg guidanceShowBox-msg">
                            <span>所属课程：{this.props.name}</span>
                            <span>所属阶段：{_showStage(this.props.stageIndex)}</span>
                            <span>所属课时：{this.props.lessonName}</span>
                        </div>
                        <div className="guidanceShowBox-line">教学指导</div>
                        <div className="guidanceShowBox-content">
                            <div className="guidanceShowBox-card">
                                <h4>教学目标{this.state.echoTargetData.target}：</h4>
                                <p>
                                    <span className={this.state.echoTargetData.ispoint === 1 ? "guidanceShowBox-label1" : "guidanceShowBox-labelHide"}>重</span>
                                    <span className={this.state.echoTargetData.ishard === 1 ? "guidanceShowBox-label2" : "guidanceShowBox-labelHide"}>难</span>
                                    {this.state.echoTargetData.target}
                                </p>
                                <h5>实施步骤</h5>
                                <ul>
                                    {
                                        this._showTeachguidances()
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}