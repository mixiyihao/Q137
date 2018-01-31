import React, { Component } from 'react';
import $ from 'jquery';
import url from '../../../../controller/url.js';
import './exercisesEditBox.css';
import { _showStage } from '../../../util/methods.js';

/*
* 课堂练习编辑弹框组件
* css样式引用了课程目标guidanceImportBox.css的样式
* 修改的样式在exercisesEditBox.css里面
* */
export default class ExercisesEditBox extends Component {
    constructor() {
        super();
        this.state = {
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
            defaultQuestion: '',
            defaultAnswer1: '',
            defaultAnswer2: '',
            defaultOrdernum: '',
            imgSrc: '',
            flags: '',
        }
    }

    componentWillMount() {
        this.findPracticeByIdAjax(this.props.practicesID);
    }

    componentDidMount() {

    }

    findPracticeByIdAjax(id) {
        $.llsajax({
            url: "lesson/findPracticeById",
            type: "POST",
            async: false,
            data: {
                id: id
            },
            success: findPracticeByIdData => {
                this.setState({
                    question: findPracticeByIdData.practice.question,
                    answer1: findPracticeByIdData.practice.answer1,
                    answer2: findPracticeByIdData.practice.answer2,
                    imgSrc: findPracticeByIdData.practice.picurl || '',
                    ordernum: findPracticeByIdData.practice.ordernum,
                    defaultQuestion: findPracticeByIdData.practice.question,
                    defaultAnswer1: findPracticeByIdData.practice.answer1,
                    defaultAnswer2: findPracticeByIdData.practice.answer2,
                    defaultOrdernum: findPracticeByIdData.practice.ordernum,
                });
                if (findPracticeByIdData.practice.picurl !== null && findPracticeByIdData.practice.picurl,length !== 0) {
                    this.setState({
                        isImg: true,
                    });
                }
            }
        })
    }

    onCloseBox() {
        this.props.onCloseBox();
    }

    onQuestionChange(e) {
        this.setState({
            question: e.target.value
        });
    }

    onImageChange() {
        document.getElementById("exercisesImportBox_file").click();
    }

    onRemoveImg() {
        document.getElementById("exercisesEditBox_img").src = '';
        this.refs.file.value = "";
        this.setState({
            isImg: false,
            flags: 1
        });
    }

    onThinkingChange(e) {
        this.setState({
            answer1: e.target.value
        });
    }

    onAnalysisChange(e) {
        this.setState({
            answer2: e.target.value
        });
    }

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
                    document.getElementById("exercisesEditBox_img").src = this.result;
                    _this.setState({
                        isImg: true,
                        flags: ''
                    });
                };
            } else {
                // this.refs.file.value = "";
                // this.setState({
                //     isHidden: false,
                //     bombBoxMsg: "您上传的图片大小超过4M",
                //     isRenderFlag: false,
                // });
            }
        } else {
            // this.refs.file.value = "";
            // this.setState({
            //     isHidden: false,
            //     bombBoxMsg: "请上传图片",
            //     isRenderFlag: false,
            // });
        }
    }

    onSaveData() {
        let _this = this;
        if (this.state.question !== '' && this.state.answer1 !== '' && this.state.answer2 !== '' && this.state.ordernum !== '') {
            let formData = new FormData($('#exercisesImportBox_uploadForm')[0]);
            this.addPracticeAjax(formData);
        } else {
            this.setState({errormsg: "*请填写完整必填项!"});
            setTimeout(function () {
                _this.setState({errormsg: ""});
            }.bind(this), 2000);
        }
    }

    addPracticeAjax(formData) {
        $.llsajaxupload({
            url: "lessonDate/editPractice",
            type: "POST",
            cache: false,
            processData: false,
            contentType: false,
            data: formData,
            success: editPracticeData => {
                this.props.onCloseBox();
                this.props.findLessonDataPageAjax(this.props.lessonID, 1);
            },
            error: err => {

            }
        });
    }

    render() {
        return (
            <div className="guidanceImportBox-container">
                <div className="guidanceImportBox-wrap">
                    <div className="guidanceImportBox-title">
                        <span className="guidanceImportBox-title-title-msg">编辑练习题</span>
                        <span className="iconfont icon-guanbi guidanceImportBox-title-title-close" onClick={this.onCloseBox.bind(this)}></span>
                    </div>
                    <div className="guidanceImportBox-content exercisesImportBox-content">
                        {/*<div className="">*/}
                            <div className="guidanceImportBox-content-msg">
                                <span>所属课程：{this.props.name}</span>
                                <span>所属阶段：{_showStage(this.props.stageIndex)}</span>
                                <span>所属课时：{this.props.lessonName}</span>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>问题</p>
                                <textarea defaultValue={this.state.defaultQuestion} className="exercisesEditBox-target-textarea exercisesImportBox-textarea-diff" id="question_change" onChange={this.onQuestionChange.bind(this)}></textarea>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label">问题补充</p>
                                <span className="commonButton button exercisesImportBox-upload" onClick={this.onImageChange.bind(this)}><i className="iconfont icon-shangchuan"></i>选择文件</span>
                                <span className="exercisesImportBox-prompt exercisesEditBox-important-diff"><i className="guidanceImportBox-important">*</i>文件格式支持JPG、JPEG、GIF、PNG等格式，大小不超过4MB</span>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <div className="exercisesImportBox-upload-img">
                                    {
                                        this.state.isImg ?
                                            <span className="iconfont icon-jian" onClick={this.onRemoveImg.bind(this)}></span>
                                            :
                                            null
                                    }
                                    <img src={this.state.imgSrc.length === 0 ? '' : url.WEBURL + this.state.imgSrc} id="exercisesEditBox_img" alt=""/>
                                </div>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>解题思路</p>
                                <textarea defaultValue={this.state.defaultAnswer1} className="exercisesEditBox-target-textarea exercisesImportBox-textarea-diff" id="important_change" onChange={this.onThinkingChange.bind(this)}></textarea>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>完全解析</p>
                                <textarea defaultValue={this.state.defaultAnswer2} className="exercisesEditBox-target-textarea exercisesImportBox-textarea-diff" id="completely_change" onChange={this.onAnalysisChange.bind(this)}></textarea>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>所在顺序</p>
                                <input type="text" defaultValue={this.state.defaultOrdernum} className="guidanceImportBox-order" id="ordernum_change" onChange={this.onOrderNumChange.bind(this)}/>
                                <span className="guidanceImportBox-error-msg">{this.state.info}</span>
                            </div>
                        </div>
                        <form action="" id="exercisesImportBox_uploadForm" className="exercisesImportBox-form">
                            <input name="uploadfile" type="file" ref="file" accept="image/jpeg,image/gif,image/png" id="exercisesImportBox_file" onChange={this.loadTextValue.bind(this)}/>
                            <input defaultValue={this.props.lessonID} name="lesson_id" ref="lesson_id" type="text"/>
                            <textarea value={this.state.question} name="question" id="exercisesImportBox_question"></textarea>
                            <textarea value={this.state.answer1} name="answer1" id="exercisesImportBox_thinking"></textarea>
                            <textarea value={this.state.answer2} name="answer2" id="exercisesImportBox_analysis"></textarea>
                            <input value={this.state.ordernum} type="text" name="ordernum" id="exercisesImportBox_ordernum"/>
                            <input value={this.props.practicesID} type="text" name="id" id="exercisesImportBox_id"/>
                            <input value={this.state.flags} type="text" ref="flags" id="flag" name="flag"/>
                            <input type="reset" id="form_reset"/>
                        </form>
                    {/*</div>*/}
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