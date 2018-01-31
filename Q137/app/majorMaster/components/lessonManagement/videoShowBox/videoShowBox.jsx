import React, { Component } from 'react';
import './videoShowBox.css';
import { _showStage } from '../../../util/methods.js';

/*
* 视频预览弹框组件
* css样式引用了课程目标guidanceImportBox.css的样式
* 修改的样式在videoShowBox.css里面
* */
export default class VideoShowBox extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        let cc_address = this.props.cc_address;
        cc_address = cc_address.replace(/height=490/,"height=365");
        console.log(cc_address);
        let script = window.document.createElement("script");
        script.src = cc_address;
        let videoNode = document.getElementById("videoShowBox_node");
        videoNode.insertBefore(script, videoNode.firstChild);
    }

    onCloseBox() {
        this.props.onCloseBox();
    }

    render() {
        return (
            <div className="guidanceImportBox-container">
                <div className="guidanceImportBox-wrap">
                    <div className="guidanceImportBox-title">
                        <span className="guidanceImportBox-title-title-msg">预览课时目标</span>
                        <span className="iconfont icon-guanbi guidanceImportBox-title-title-close" onClick={this.onCloseBox.bind(this)}></span>
                    </div>
                    <div className="videoShowBox-box">
                        <div className="guidanceImportBox-content-msg videoShowBox-msg">
                            <span>所属课程：{this.props.name}</span>
                            <span>所属阶段：{_showStage(this.props.stageIndex)}</span>
                            <span>所属课时：{this.props.lessonName}</span>
                        </div>
                        <div className="videoShowBox-videoContent">
                            <div className="videoShowBox-node" id="videoShowBox_node">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}