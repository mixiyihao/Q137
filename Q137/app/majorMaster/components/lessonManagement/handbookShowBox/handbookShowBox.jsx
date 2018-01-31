import React, { Component } from 'react';
import './handbookShowBox.css';
import url from '../../../../controller/url.js'

/*
* 学习手册预览弹框组件
* css样式引用了课程目标guidanceImportBox.css的样式
* 修改的样式在handbookImportShow.css里面
* */
export default class HandbookShowBox extends Component {
    constructor() {
        super();
    }

    onCloseBox() {
        this.props.onCloseBox(1);
    }

    SetCwinHeight() {
        let iframeid = document.getElementById("homeworkIframe"); //iframe id
        iframeid.height = $("#homeworkIframe").contents().find("body").height() + 100;
    }

    render() {
        return (
            <div className="guidanceImportBox-container">
                <div className="guidanceImportBox-wrap">
                    <div className="guidanceImportBox-title">
                        <span className="guidanceImportBox-title-title-msg">预览学习手册</span>
                        <span className="iconfont icon-guanbi guidanceImportBox-title-title-close" onClick={this.onCloseBox.bind(this)}></span>
                    </div>
                    <div className="handbookShowBox-scroll">
                        <iframe onLoad={this.SetCwinHeight.bind(this)} height="1" id="homeworkIframe" scrolling="no" frameBorder="0" width="100%" src={url.WEBURL + this.props.handBookUrl}></iframe>
                    </div>
                </div>
            </div>
        );
    }
}