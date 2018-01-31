import React, { Component } from 'react';
import $ from 'jquery';
import { Upload, Icon, message } from 'antd';
import url from '../../../../controller/url.js';
import './classDataImportBox.css';
import { _showStage } from '../../../util/methods.js';

const Dragger = Upload.Dragger;

/*
* 课堂资料上传弹框组件
* css样式引用了课程目标guidanceImportBox.css的样式
* 修改的样式在classDataImportBox.css里面
* */
export default class ClassDataImportBox extends Component {
    constructor() {
        super();
        this.state = {
            fileList: [],
            uploading: false,
        }
    }

    componentWillMount() {
        console.log(this.props.fileList.length);
        if (this.props.fileList.length !== 0) {
            let file = {
                uid: -1,
                name: this.props.fileList[0].name,
                status: 'done'
            }
            this.setState(({ fileList }) => ({
                fileList: [file],
            }));
        }
    }

    onCloseBox() {
        this.props.onCloseBox();
    }

    handleUpload() {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file,index) => {
            if (index === 0) {
                if (this.props.fileList.length !== 0) {
                    formData.append('id', this.props.fileList[0].id);
                }
                formData.append('lesson_id', this.props.lessonID);
            }
            formData.append('imageurl', file);
        });
        this.setState({
            uploading: true,
        });
        $.llsajaxupload({
            url: this.props.fileList.length !== 0 ? "lessonDate/updateData" : "lessonDate/addData",
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
                this.props.findLessonDataPageAjax(this.props.lessonID, 1);
            }
        });
    }

    render() {
        const props = {
            name: 'imageurl',
            multiple: this.props.fileList.length !== 0 ? false : true,
            withCredentials: true,
            action: this.props.fileList.length !== 0 ? (url.WEBURL + 'lessonDate/updateData') : (url.WEBURL + 'lessonDate/addData'),
            accept: "image/jpeg,image/gif,image/png",
            data: {
                lesson_id: this.props.lessonID,
                id: this.props.fileList.length !== 0 ? this.props.fileList[0].id : ''
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
                let flag = true;
                this.state.fileList.map((value) => {
                    if (value.name === file.name) {
                        flag = false
                    }
                });
                if (flag) {
                    this.setState(({ fileList }) => ({
                        fileList: [...fileList, file],
                    }));
                } else {
                    message.error(`${file.name} 名字重复`);
                }
                if (this.props.fileList.length !== 0) {
                    this.setState(({ fileList }) => ({
                        fileList: fileList.slice(-1)
                    }));
                }
                return false;
            },
            fileList: this.state.fileList,
        };
        return (
            <div className="guidanceImportBox-container">
                <div className="guidanceImportBox-wrap">
                    <div className="guidanceImportBox-title">
                        <span className="guidanceImportBox-title-title-msg">新增资料</span>
                        <span className="iconfont icon-guanbi guidanceImportBox-title-title-close" onClick={this.onCloseBox.bind(this)}></span>
                    </div>
                    <div className="guidanceImportBox-content classDataImportBox-content">
                        <div className="classDataImportBox-content-diff">
                            <div>
                                <span className="warningTit">课堂资料是按照图片的命名进行排序的。eg：1.jpg、2.jpg、3.jpg...</span>
                            </div>
                            <div className="guidanceImportBox-content-msg classDataImportBox-content-msg">
                                <span>所属课程：{this.props.name}</span>
                                <span>所属阶段：{_showStage(this.props.stageIndex)}</span>
                                <span>所属课时：{this.props.lessonName}</span>
                            </div>
                            <div className="classDataImportBox-uploadScroll">
                                <div className="classDataImportBox-uploadContainer">
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