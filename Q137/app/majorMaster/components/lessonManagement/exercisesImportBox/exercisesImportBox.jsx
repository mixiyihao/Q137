import React, { Component } from 'react';
import $ from 'jquery';
import url from '../../../../controller/url.js';
import './exercisesImportBox.css';
import { _showStage } from '../../../util/methods.js';

/*
* 课堂练习添加弹框组件
* css样式引用了课程目标guidanceImportBox.css的样式
* 修改的样式在exercisesImportBox.css里面
* */
export default class ExercisesImportBox extends Component {
    constructor() {
        super();
        this.state = {
            // isHidden: true,
            info: '',
            errormsg: '',
            isImg: false, // 是否有图片
            practiceDetail: [], // 明细
            imgData: '', // 图片信息
            isEdit: false, // 是否编辑
            question: '', // 问题
            answer1: '', // 解题思路
            answer2: '', // 完全解析
            ordernum: '', // 所在顺序
            flags: '',
        }
    }

    onCloseBox() {
        this.props.onCloseBox();
    }

    // 问题输入
    onQuestionChange(e) {
        this.setState({
            question: e.target.value
        });
        // document.getElementById("exercisesImportBox_question").value = e.target.value;
    }

    // 图片上传
    onImageChange(e) {
        document.getElementById("exercisesImportBox_file").click();
    }

    loadTextValue() {
        let filetypes = ["jpg", "jpeg","gif","png"];
        let fileName = this.refs.file.files[0].name.split(".")[this.refs.file.files[0].name.split(".").length - 1];
        let _this = this;
        if (filetypes.indexOf(fileName) > -1) {
            if (this.refs.file.files[0].size < 4194304) {
                let file = this.refs.file.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    let addPracticeUploadThumbnail = document.getElementById('addPracticeUploadThumbnail');
                    // if (document.getElementById("uploadImgShow") != null) {
                    //     let imgNode2 = document.getElementById("uploadImgShow");
                    //     addPracticeUploadThumbnail.removeChild(imgNode2);
                    // }
                    // let imgNode = document.createElement('img');
                    // imgNode.setAttribute("id","uploadImgShow")
                    // addPracticeUploadThumbnail.appendChild(imgNode);
                    document.getElementById("exercisesImportBox_img").src = this.result;
                    _this.setState({
                        isImg: true,
                        flags: ''
                    });
                    // _this.refs.flags.value = null;
                };
            } else {
                this.refs.file.value = "";
                // this.setState({
                //     isHidden: false,
                //     bombBoxMsg: "您上传的图片大小超过4M",
                // });
            }
        } else {
            this.refs.file.value = "";
            // this.setState({
            //     isHidden: false,
            //     bombBoxMsg: "请上传图片",
            // });
        }
    }

    // 解题思路输入
    onThinkingChange(e) {
        this.setState({
            answer1: e.target.value
        });
        // document.getElementById("exercisesImportBox_thinking").value = e.target.value;
    }

    // 完全解析输入
    onAnalysisChange(e) {
        this.setState({
            answer2: e.target.value
        });
        // document.getElementById("exercisesImportBox_analysis").value = e.target.value;
    }

    // 输入顺序
    onOrderNumChange(e) {
        let val = e.target.value;
        let _this = this;
        if (isNaN(val)) {
            e.target.value = '';
            this.setState({info: "*只能输入数字!"});
            setTimeout(function () {
                _this.setState({info: ""});
            }.bind(this), 1000);
        } else {
            this.setState({
                ordernum: Number(val)
            });
            // document.getElementById("exercisesImportBox_ordernum").value = Number(val);
        }
    }

    // 删除图片
    onRemoveImg() {
        document.getElementById("exercisesImportBox_img").src = '';
        this.refs.file.value = "";
        this.setState({
            isImg: false,
            flags: 1
        });
    }

    _showDetails() {
        return this.state.practiceDetail.map((value,index) => {
            return (
                <div className="guidanceImportBox-detailed-card exercisesImportBox-detailed-card" key={index}>
                    <p title={value.question}>名称：{value.question}</p>
                    <p title={value.answer1}>解题思路：{value.answer1}</p>
                    <p title={value.answer2}>完全解析：{value.answer2}</p>
                    <p>所在顺序：{value.ordernum}</p>
                    <div className="guidanceImportBox-detailed-button">
                        <span className="commonButton button" onClick={this.editTargetDetail.bind(this,index,value)}><i className="iconfont icon-bianji"></i>编辑</span>
                        <span className="commonButton button" onClick={this.onTargetDetail.bind(this, index, value.id)}>
                            <i className="iconfont icon-SHANCHU-"></i>
                            删除
                        </span>
                    </div>
                </div>
            );
        });
    }

    editTargetDetail(index, value) {
        document.getElementById("question_change").value = value.question;
        document.getElementById("important_change").value = value.answer1;
        document.getElementById("completely_change").value = value.answer2;
        document.getElementById("ordernum_change").value = value.ordernum;
        document.getElementById("exercisesImportBox_img").src = value.imgData;
        // 放到form中
        this.setState({
            question: value.question,
            answer1: value.answer1,
            answer2: value.answer2,
            ordernum: value.ordernum,
        });
        document.getElementById("exercisesImportBox_file").src = value.imgData;
        document.getElementById("exercisesImportBox_id").value = value.id;
        if (value.imgData !== '') {
            this.setState({
                isImg: true,
            });
        }
        this.setState({
            isEdit: true,
            editSerialNumber: index
        });
    }

    onTargetDetail(index, id) {
        this.state.practiceDetail.splice(index, 1);
        this.setState({
            practiceDetail: this.state.practiceDetail
        });
        this.props.onDeletePractice(id);
    }

    addPracticeAjax(formData,flag) {
        $.llsajaxupload({
            url: "lessonDate/addPractice",
            type: "POST",
            cache: false,
            processData: false,
            contentType: false,
            data: formData,
            success: addPracticeData => {
                // true 点击继续添加触发的事件
                if (flag) {
                    let practiceDetail = {
                        id: addPracticeData.practiceid,
                        question: addPracticeData.practice.question,
                        answer1: addPracticeData.practice.answer1,
                        answer2: addPracticeData.practice.answer2,
                        ordernum: addPracticeData.practice.ordernum,
                        imgData: addPracticeData.practice.picurl === null ? '' : url.WEBURL + addPracticeData.practice.picurl
                    };
                    this.state.practiceDetail.push(practiceDetail);
                    this.setState({
                        practiceDetail: this.state.practiceDetail,
                        isImg: false,
                        question: '',
                        answer1: '',
                        answer2: '',
                        ordernum: '',
                    });
                    // 清空输入的数据
                    document.getElementById("question_change").value = '';
                    document.getElementById("important_change").value = '';
                    document.getElementById("completely_change").value = '';
                    document.getElementById("ordernum_change").value = '';
                    document.getElementById("exercisesImportBox_img").src = '';
                    document.getElementById("form_reset").click();
                } else {
                    this.props.onCloseBox();
                    this.props.findLessonDataPageAjax(this.props.lessonID, 1);
                }
            },
            error: err => {

            }
        });
    }

    editPracticeAjax(formData) {
        $.llsajaxupload({
            url: "lessonDate/editPractice",
            type: "POST",
            cache: false,
            processData: false,
            contentType: false,
            data: formData,
            success: addPracticeData => {
                let editArr = this.state.practiceDetail.slice(0);
                editArr.map((value,index) => {
                    if (this.state.editSerialNumber === index) {
                       value.id = addPracticeData.practice.id;
                       value.question = addPracticeData.practice.question;
                       value.answer1 = addPracticeData.practice.answer1;
                       value.answer2 = addPracticeData.practice.answer2;
                       value.ordernum = addPracticeData.practice.ordernum;
                       value.imgData = addPracticeData.practice.picurl === null ? '' : url.WEBURL + addPracticeData.practice.picurl;
                    }
                });
                this.setState({
                    practiceDetail: editArr,
                    isImg: false,
                    isEdit: false,
                    question: '',
                    answer1: '',
                    answer2: '',
                    ordernum: '',
                });
                // 清空输入的数据
                document.getElementById("question_change").value = '';
                document.getElementById("important_change").value = '';
                document.getElementById("completely_change").value = '';
                document.getElementById("ordernum_change").value = '';
                document.getElementById("exercisesImportBox_img").src = '';
                document.getElementById("form_reset").click();
            },
            error: err => {

            }
        });
    }

    // 继续添加
    onNextAdd() {
        let formData = new FormData($('#exercisesImportBox_uploadForm')[0]);
        if (this.state.isEdit) {
            this.editPracticeAjax(formData,true);
        } else {
            // 判断是否有输入，没有则不添加
            if (this.state.question !== '' && this.state.answer1 !== '' && this.state.answer2 !== '' && this.state.ordernum !== '') {
                this.addPracticeAjax(formData,true);
            }
        }
    }

    // 保存按钮
    onSaveData() {
        let _this = this;
        if (this.state.question === '' && this.state.answer1 === '' && this.state.answer2 === '' && this.state.ordernum === '') {
            this.props.findLessonDataPageAjax(this.props.lessonID, 1);
            this.props.onCloseBox();
        } else {
            if (this.state.question !== '' && this.state.answer1 !== '' && this.state.answer2 !== '' && this.state.ordernum !== '') {
                let formData = new FormData($('#exercisesImportBox_uploadForm')[0]);
                this.addPracticeAjax(formData,false);
            } else {
                this.setState({errormsg: "*请填写完整必填项!"});
                setTimeout(function () {
                    _this.setState({errormsg: ""});
                }.bind(this), 2000);
            }
        }
    }

    render() {
        return (
            <div className="guidanceImportBox-container">
                <div className="guidanceImportBox-wrap">
                    <div className="guidanceImportBox-title">
                        <span className="guidanceImportBox-title-title-msg">新增练习题</span>
                        <span className="iconfont icon-guanbi guidanceImportBox-title-title-close" onClick={this.onCloseBox.bind(this)}></span>
                    </div>
                    <div className="guidanceImportBox-content exercisesImportBox-content">
                        <div className="guidanceImportBox-content-left">
                            <div className="guidanceImportBox-content-msg">
                                <span>所属课程：{this.props.name}</span>
                                <span>所属阶段：{_showStage(this.props.stageIndex)}</span>
                                <span>所属课时：{this.props.lessonName}</span>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>问题</p>
                                <textarea className="guidanceImportBox-target-textarea exercisesImportBox-textarea-diff" id="question_change" onChange={this.onQuestionChange.bind(this)}></textarea>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label">问题补充</p>
                                <span className="commonButton button exercisesImportBox-upload" onClick={this.onImageChange.bind(this)}><i className="iconfont icon-shangchuan"></i>选择文件</span>
                                <span className="exercisesImportBox-prompt"><i className="guidanceImportBox-important">*</i>文件格式支持JPG、JPEG、GIF、PNG等格式，大小不超过4MB</span>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <div className="exercisesImportBox-upload-img">
                                    {
                                        this.state.isImg ?
                                            <span className="iconfont icon-jian" onClick={this.onRemoveImg.bind(this)}></span>
                                            :
                                            null
                                    }
                                    <img src="" id="exercisesImportBox_img" alt=""/>
                                </div>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>解题思路</p>
                                <textarea className="guidanceImportBox-target-textarea exercisesImportBox-textarea-diff" id="important_change" onChange={this.onThinkingChange.bind(this)}></textarea>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>完全解析</p>
                                <textarea className="guidanceImportBox-target-textarea exercisesImportBox-textarea-diff" id="completely_change" onChange={this.onAnalysisChange.bind(this)}></textarea>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>所在顺序</p>
                                <input type="text" className="guidanceImportBox-order" id="ordernum_change" onChange={this.onOrderNumChange.bind(this)}/>
                                <span className="guidanceImportBox-error-msg">{this.state.info}</span>
                            </div>
                            <div className="guidanceImportBox-addNew exercisesImportBox-addNew" onClick={this.onNextAdd.bind(this)}>
                                <i className="iconfont icon-jia"></i>
                                继续添加
                            </div>
                        </div>
                        <div className="guidanceImportBox-content-right">
                            <h4>添加明细</h4>
                            <div className="guidanceImportBox-detailed-content">
                                {this._showDetails()}
                            </div>
                        </div>
                        <form action="" id="exercisesImportBox_uploadForm" className="exercisesImportBox-form">
                            <input name="uploadfile" type="file" ref="file" accept="image/jpeg,image/gif,image/png" id="exercisesImportBox_file" onChange={this.loadTextValue.bind(this)}/>
                            <input name="lesson_id" defaultValue={this.props.lessonID} ref="lesson_id" type="text"/>
                            <textarea value={this.state.question} name="question" id="exercisesImportBox_question"></textarea>
                            <textarea value={this.state.answer1} name="answer1" id="exercisesImportBox_thinking"></textarea>
                            <textarea value={this.state.answer2} name="answer2" id="exercisesImportBox_analysis"></textarea>
                            <input type="text" value={this.state.ordernum} name="ordernum" id="exercisesImportBox_ordernum"/>
                            <input type="text" name="id" id="exercisesImportBox_id"/>
                            <input value={this.state.flags} type="text" ref="flags" id="flag" name="flag"/>
                            <input type="reset" id="form_reset"/>
                        </form>
                    </div>
                    <div className="guidanceImportBox-button">
                        <span className="guidanceImportBox-button-cancel" onClick={this.onCloseBox.bind(this)}>取消</span>
                        <span className="commonButton button guidanceImportBox-button-next" onClick={this.onSaveData.bind(this)}>保存</span>
                        <i className="guidanceImportBox-error-msg">{this.state.errormsg}</i>
                    </div>
                </div>
            </div>
        );
    }
}