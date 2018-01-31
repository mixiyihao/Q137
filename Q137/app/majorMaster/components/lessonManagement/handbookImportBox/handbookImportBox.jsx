import React, { Component } from 'react';
import $ from 'jquery';
import { Upload, Icon, message } from 'antd';
import './handbookImportBox.css';
import url from "../../../../controller/url";
import { _showStage } from '../../../util/methods.js';

const Dragger = Upload.Dragger;

/*
* 学习手册上传弹框组件
* css样式引用了课程目标guidanceImportBox.css的样式
* 修改的样式在handbookImportBox.css里面
* */
export default class HandbookImportBox extends Component {
    constructor() {
        super();
        this.state = {
            fileList: [],
            uploading: false,
        }
    }

    onCloseBox() {
        this.props.onCloseBox();
    }

    handleChange (info) {
        let fileList = info.fileList;
        fileList = fileList.map((file,index) => {
            if (file.response) {
                if (file.response.result === 200) {
                    file.status = 'success';
                } else {
                    file.status = 'error';
                }
            }
            return file;
        });
        this.setState({ fileList: fileList });
    }

    handleUpload() {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file,index) => {
            if (index === 0) {
                this.props.msg === "新增学生手册" ?
                    formData.append('lessonid', this.props.lessonID)
                    :
                    formData.append('lesson_id', this.props.lessonID)
            }
            formData.append('imageurl', file);
        });
        this.setState({
            uploading: true,
        });
        $.llsajaxupload({
            url: (this.props.msg === "新增学生手册" ? 'lessonDate/addMarkDown' : 'lessonDate/addHomeWork'),
            type: "POST",
            cache: false,
            processData: false,
            contentType: false,
            data: formData,
            success: addData => {
                this.setState({
                    fileList: [],
                    uploading: false,
                });
                this.props.onCloseBox();
            }
        });
    }
    
    render() {
        const props = {
            name: 'imageurl',
            multiple: true,
            withCredentials: true,
            action: url.WEBURL + (this.props.msg === "新增学生手册" ? 'lessonDate/addMarkDown' : 'lessonDate/addHomeWork'),
            accept: "image/jpeg,image/gif,image/png,text/html",
            data: this.props.msg === "新增学生手册" ? {
                lessonid: this.props.lessonID
            } : {
                lesson_id: this.props.lessonID
            },
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
        };
        return (
            <div className="guidanceImportBox-container">
                <div className="guidanceImportBox-wrap">
                    <div className="guidanceImportBox-title">
                        <span className="guidanceImportBox-title-title-msg">{this.props.msg}</span>
                        <span className="iconfont icon-guanbi guidanceImportBox-title-title-close" onClick={this.onCloseBox.bind(this)}></span>
                    </div>
                    <div className="guidanceImportBox-content handbookImportBox-content">
                        <div className="handbookImportBox-content-diff">
                            <div className="guidanceImportBox-content-msg">
                                <span>所属课程：{this.props.name}</span>
                                <span>所属阶段：{_showStage(this.props.stageIndex)}</span>
                                <span>所属课时：{this.props.lessonName}</span>
                            </div>
                            <div className="handbookImportBox-uploadScroll">
                                <div className="handbookImportBox-uploadContainer">
                                    <Dragger {...props}>
                                        <p className="ant-upload-drag-icon">
                                            <Icon type="inbox" />
                                        </p>
                                        <p className="ant-upload-text">点击或者拖动到区域内上传</p>
                                        <p className="ant-upload-hint">支持单个或批量上载。</p>
                                    </Dragger>
                                </div>
                            </div>
                            <div className="guidanceImportBox-button">
                                <span className="guidanceImportBox-button-cancel" onClick={this.onCloseBox.bind(this)}>取消</span>
                                <span className="commonButton button guidanceImportBox-button-next" onClick={this.handleUpload.bind(this)}>保存</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}