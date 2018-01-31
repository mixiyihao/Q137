import React, { Component } from 'react';
import $ from 'jquery';
import './videoImportBox.css';
import { _showStage } from '../../../util/methods.js';

/*
* 视频上传弹框组件
* css样式引用了课程目标guidanceImportBox.css的样式
* 修改的样式在videoImportBox.css里面
* */
export default class VideoImportBox extends Component {
    constructor() {
        super();
        this.state = {
            file_name: '', // 文件名字
            videoid: 0, // 视频ID
            status: '', // 状态
            videoList: [], // 视频上传列表
            ordernum: 1,
        }
    }

    componentWillMount() {
        this.setState({
            ordernum: this.props.count + 1
        });
    }

    componentDidMount() {
        if (this.props.videoValue.length !== 0) {
            let video = {
                title: this.props.videoValue[0].name,
                videoid: this.props.videoValue[0].id,
                status: 'OK',
                progress: 0,
            }
            this.setState(({ videoList }) => ({
                videoList: [...videoList, video],
            }));
        }        
        let _this = this;
        let ordernum = this.props.videoValue.length === 0 ? this.state.ordernum : this.props.videoValue[0].ordernum;
        // 创建上传flash控件
        let nodeEl = '<embed type="application/x-shockwave-flash" src="http://union.bokecc.com/flash/api/uploader.swf" width="100%" height="158" id="uploadswf" name="uploadswf" quality="high" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" flashvars="progress_interval=1&amp;notify_url=http://edusys.lenovo.com/lls-web/checkview/uploadresult?ordernum=' + this.props.lessonID + 'aa' + this.props.userID + '"/>'
        let uploadEl = document.getElementById("videoImportBox_flashUpload");
        uploadEl.innerHTML = nodeEl;
        /**
         * cc 视频外部函数
         * @param {*} file_name 文件名
         * @param {*} file_size 文件大小
         */
        window.on_spark_selected_file = function on_spark_selected_file(file_name, file_size) {
            _this.setState({
                file_name: file_name
            });
            document.getElementById('uploadswf').start_upload(_this.genMd5Ajax(''));
        }

        /**
         * 验证上传是否正常进行函数
         * @param {*} status 验证结果
         * @param {*} videoid 视频 id
         */
        window.on_spark_upload_validated = function on_spark_upload_validated(status, videoid) {
            _this.setState({
                videoid: videoid,
                status: status,
            });
            let video = {
                title: _this.state.file_name,
                videoid: videoid,
                status: status,
                progress: 0,
            }
            if (_this.props.videoValue.length !== 0) {
                _this.setState(({ videoList }) => ({
                    videoList: [video],
                }));
            } else {
                _this.setState(({ videoList }) => ({
                    videoList: [...videoList, video],
                }));
            }
        }

        /**
         * 
         * @param {*} progress progress: 上传进度。正确时，0~100 之间的整数，包括 0 和 100;错误时，返回-1.
         */
        window.on_spark_upload_progress = function on_spark_upload_progress(progress) {
            _this.state.videoList.map((value) => {
                if (value.videoid === _this.state.videoid) {
                    value.progress = progress;
                }
            });
            if (progress === 100) {
                _this.setState(({ ordernum }) => ({
                    ordernum: ordernum + 1,
                }));
                if (_this.props.videoValue.length !== 0) {
                    $.llsajax({
                        url: "lessonDate/deleteVideo",
                        type: "POST",
                        async: false,
                        data: {
                            vid: _this.props.videoValue[0].id,
                            lessonid: _this.props.lessonID
                        },
                        success: deleteVideo => {
                            console.log(deleteVideo);
                            this.props.onCloseBox('1');
                        }
                    })
                }
            }
            _this.setState({
                videoList: _this.state.videoList
            });
        }
    }

    genMd5Ajax(title) {
        let genMd5Str = '';
        $.llsajax({
            url: "checkview/genMd5",
            type: "POST",
            async: false,
            data: {
                title: title,
                tag: '',
                description: ''
            },
            success: genMd5 => {
                genMd5Str = genMd5.md5str
            }
        })
        return genMd5Str;
    }

    onCloseBox() {
        this.props.onCloseBox();
    }

    _showVideoList() {
        return this.state.videoList.map((value, index) => {
            let styles = {
                height: '2px',
                width: (value.progress || 0) + '%'
            }
            return (
                <div key={index} className={value.status !== 'OK' ? "videoImportBox-upload-list-item videoImportBox-upload-list-item-error" : "videoImportBox-upload-list-item"}>
                    <div className="videoImportBox-upload-list-info">
                        <span>
                            <i className="videoImportBox-upload-clip iconfont icon-fujian"></i>
                            <span className="videoImportBox-upload-list-name">{value.title}</span>
                        </span>
                    </div>
                    <i className="videoImportBox-upload-list-remove iconfont icon-guanbi"></i>
                    {
                        value.progress === 100 || value.progress == 0 ?
                            null
                            :
                            <div className="videoImportBox-upload-list-item-progress">
                                <div className="videoImportBox-progress-line">
                                    <div>
                                        <div className="videoImportBox-progress-outer">
                                            <div className="videoImportBox-progress-inner">
                                                <div className="videoImportBox-progress-bg" style={styles}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            );
        });
    }

    render() {
        return (
            <div className="guidanceImportBox-container">
                <div className="guidanceImportBox-wrap">
                    <div className="guidanceImportBox-title">
                        <span className="guidanceImportBox-title-title-msg">新增视频</span>
                        <span className="iconfont icon-guanbi guidanceImportBox-title-title-close" onClick={this.onCloseBox.bind(this)}></span>
                    </div>
                    <div className="guidanceImportBox-content videoImportBox-content">
                        <div className="videoImportBox-content-diff">
                            <div className="guidanceImportBox-content-msg">
                                <span>所属课程：{this.props.name}</span>
                                <span>所属阶段：{_showStage(this.props.stageIndex)}</span>
                                <span>所属课时：{this.props.lessonName}</span>
                            </div>
                            <div className="videoImportBox-upload" id="videoImportBox_upload">
                                <div className="videoImportBox-flashUpload" id="videoImportBox_flashUpload"></div>
                                <span className="videoImportBox-upload-btn">
                                    <div className="videoImportBox-upload-container">
                                        <p className="videoImportBox-upload-icon">
                                            <i className="iconfont icon-box-hezi"></i>
                                        </p>
                                        <p className="videoImportBox-upload-text">点击区域内上传</p>
                                        <p className="videoImportBox-upload-hint">支持单个或批量上载。</p>
                                    </div>
                                </span>
                            </div>
                            <div className="videoImportBox-upload-list clearfix">
                                {this._showVideoList()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}