import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import $ from 'jquery';
import url from '../../../controller/url.js';
import './styleAddPractice.css';
import BombBox from '../../bombBox/bombBox.js';
import TriodeLinkage from '../../editExercise/threeLevel/threeLevel.js';

export default class AddPractice extends React.Component{
    constructor() {
        super();
        this.state = {
            picurl: [],
            imgShowFlag: false,
            isHidden: true, // 弹框显示消失阀门
            bombBoxMsg: [], // 弹出框警告信息
            isRenderFlag: true,
            lesson_id: Number(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1])),
        }
    }
    onBackTo() {
        this.props.onAddPracticeShow();
    }
    componentDidMount() {
        if (window.location.hash.indexOf("&") > 0) {
            this.refs.lesson_id.value = Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]);
        } else {
            this.refs.lesson_id.value = Base64.decode(window.location.hash.split("?")[1].split("=")[1]);
        }
        if (this.props.id != undefined) {
            this.onModifyPractice(this.props.id);
        }
        $('html,body').animate({ scrollTop: 170 });
    }
    // 点击确定提交练习
    onAddPractice() {
        let formData = new FormData($('#uploadForm')[0]);
        // if (this.refs.file.files[0] != undefined) {
        //     let filetypes = ["jpg", "jpeg","gif","png","bmp","svg","psd"];
        //     let fileName = this.refs.file.files[0].name.split(".")[this.refs.file.files[0].name.split(".").length - 1];
        //     if (filetypes.indexOf(fileName) > -1) {
        //         if (this.refs.file.files[0].size < 4194304) {
        //             $.llsajaxupload({
        //                 url: "lesson/addOrEditPractice",
        //                 type: "POST",
        //                 cache: false,
        //                 processData: false,
        //                 contentType: false,
        //                 data: formData,
        //                 success: deletePractice => {
        //                     this.props.onAddPracticeShow();
        //                     this.props.onPracticeRefs();
        //                 }
        //             });
        //         }
        //     }
        // } else {
        if (this.refs.question.value != "" && this.refs.answer2.value != "") {
            $.llsajaxupload({
                url: "lesson/addOrEditPractice",
                type: "POST",
                cache: false,
                processData: false,
                contentType: false,
                data: formData,
                success: deletePractice => {
                    this.props.onAddPracticeShow();
                    this.props.onPracticeRefs();
                },
                error: err => {

                }
            });
        } else {
            this.setState({
                isHidden: false,
                bombBoxMsg: "请填写完题目或者完全解析",
                isRenderFlag: false,
            });
        }
        // }
    }
    onModifyPractice(id) {
        $.llsajax({
            url: "lesson/findPracticeById",
            type: "POST",
            data: {
                id: id
            },
            success: PracticeByIdData => {
                this.setState({
                    picurl: PracticeByIdData.practice.picurl == null || PracticeByIdData.practice.picurl == "" ? [] : PracticeByIdData.practice.picurl,
                    lesson_id: PracticeByIdData.practice.lesson_id,
                });
                let question = PracticeByIdData.practice.question == null ? "" : PracticeByIdData.practice.question;
                let answer1 = PracticeByIdData.practice.answer1 == null ? "" : PracticeByIdData.practice.answer1;
                let answer2 = PracticeByIdData.practice.answer2 == null ? "" : PracticeByIdData.practice.answer2;
                if (window.location.hash.indexOf("&") > 0) {
                    document.getElementById("lesson_id").value = Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]);
                } else {
                    document.getElementById("lesson_id").value = Base64.decode(window.location.hash.split("?")[1].split("=")[1]);
                }
                if (PracticeByIdData.practice.picurl != null && PracticeByIdData.practice.picurl != "") {
                    this.setState({
                        imgShowFlag: true
                    });
                }
                this.refs.id.value = id;
                this.refs.question.value = question;
                this.refs.answer1.value = answer1;
                this.refs.answer2.value = answer2;
                this.refs.addPracticeMsgNameTitle.value = question;
                this.refs.answer1Ref.value = answer1;
                this.refs.answer2Ref.value = answer2;
                this.refs.flags.value = null; 
            }
        });
    }
    addPracticeUpload() {
        document.getElementById("addPracticeUploadInput").click();
    }
    
    loadTextValue() {
        let filetypes = ["jpg", "jpeg","gif","png"];
        // var fileEle = document.getElementById('addPracticeUploadInput');
        // let fileObj = null;
        // if(fileEle.files){
        //     fileObj = fileEle.files[0];
        // }else{
        //     var fso = new ActiveXObject("Scripting.FileSystemObject");
        //     fileEle.select();
        //     fileEle.blur();
        //     var filePath = document.selection.createRange().text;
        //     if(fso.FileExists(filePath)){
        //         fileObj = fso.GetFile(filePath);
        //     }
        // }
        // //console.info(fileObj);
        let fileName = this.refs.file.files[0].name.split(".")[this.refs.file.files[0].name.split(".").length - 1];
        let _this = this;
        if (filetypes.indexOf(fileName) > -1) {
            if (this.refs.file.files[0].size < 4194304) {
                var file = this.refs.file.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    let addPracticeUploadThumbnail = document.getElementById('addPracticeUploadThumbnail');
                    if (document.getElementById("uploadImgShow") != null) {
                        let imgNode2 = document.getElementById("uploadImgShow");
                        addPracticeUploadThumbnail.removeChild(imgNode2);
                    }
                    let imgNode = document.createElement('img');
                    imgNode.setAttribute("id","uploadImgShow")
                    addPracticeUploadThumbnail.appendChild(imgNode);
                    document.getElementById("uploadImgShow").src = this.result;
                    _this.setState({
                        imgShowFlag: true
                    });
                    _this.refs.flags.value = null;
                };
            } else {
                this.refs.file.value = "";
                this.setState({
                    isHidden: false,
                    bombBoxMsg: "您上传的图片大小超过4M",
                    isRenderFlag: false,
                });
            }
        } else {
            this.refs.file.value = "";
            this.setState({
                isHidden: false,
                bombBoxMsg: "请上传图片",
                isRenderFlag: false,
            });
        }
    }
    onTextareaNameChange(e) {
        document.getElementById("question").value = e.target.value;
    }
    onTextareaAnswer1Change(e) {
        document.getElementById("answer1").value = e.target.value;
    }
    onTextareaAnswer2Change(e) {
        document.getElementById("answer2").value = e.target.value;    
    }
    onDeleteImg() {
        let imgNode = document.getElementById("uploadImgShow");
        let addPracticeUploadThumbnail = document.getElementById('addPracticeUploadThumbnail');
        addPracticeUploadThumbnail.removeChild(imgNode);
        this.refs.file.value = "";
        this.setState({
            imgShowFlag: false,
            isRenderFlag: false,
        });
        if (this.props.id == undefined) {
            this.refs.flags.value = null;
        } else {
            this.refs.flags.value = 1;
        }
    }
    hideClick() {
        this.setState({
            isHidden: !this.state.isHidden,
            isRenderFlag: false,
        });
    }
    TriodeLink(value) {
        this.refs.lesson_id.value = value.lessonValue;
    }
    render() {
        let styles = {
            courseWidth: {
                height: "28px",
                border: "1px solid #b0b0b0",
                color: "#666666",
                width: "230px",
                lineHeight: "28px",
            },
            lessonWidth: {
                height: "28px",
                border: "1px solid #b0b0b0",
                color: "#666666",
                width: "230px",
                lineHeight: "28px",
            },
            marginLeft: {
                left: "6px",
                float: "left"
            }
        };
        return (
            <div className="addPracticeBox">
                <div className="addPracticeBoxTeacher">
                    <div className="addPracticeBoxCaption">添加课堂练习</div>
                    <div className="addPracticeBoxBack" onClick={this.onBackTo.bind(this)}>
                        <span className="addPracticeBoxBackMsg">返回</span>
                        <i className="iconfont icon-back addPracticeBoxBackIcon"></i>
                    </div>
                    <div className="editExercise_select">
                        <TriodeLinkage
                            TriodeLink={this.TriodeLink.bind(this)}
                            lesson_id={this.state.lesson_id}
                            isRenderFlag={this.state.isRenderFlag}
                            isRun={true}
                            courseWidth={styles.courseWidth}
                            lessonWidth={styles.lessonWidth}
                            marginLeft={styles.marginLeft}
                            TriodeLinkagename={true}
                        />
                    </div>
                    <div className="addPracticeMsgName">
                        <span className="addPracticeMsgNameTitle"><i className="addPracticeMsgMust">*</i>习题名称:</span>
                        <textarea ref="addPracticeMsgNameTitle" onChange={this.onTextareaNameChange.bind(this)} className="addPracticeMsgNameTextarea"></textarea>
                    </div>
                    <div className={this.state.imgShowFlag ? "addPracticeUpload" : "addPracticeUpload2"} onClick={this.addPracticeUpload.bind(this)}>
                        <span className="addPracticeUploadButton">
                            <form id="uploadForm">
                                <input ref="file" name="uploadfile" type="file" id="addPracticeUploadInput" accept="image/jpeg,image/gif,image/png" onChange={this.loadTextValue.bind(this)}/> 
                                <input type="text" ref="lesson_id" id="lesson_id" name="lesson_id"/>
                                <textarea className="questionTextarea" type="text" ref="answer1" id="answer1" name="answer1"></textarea>
                                <textarea className="questionTextarea" type="text" ref="answer2" id="answer2" name="answer2"></textarea>
                                <textarea className="questionTextarea" ref="question" id="question" name="question"></textarea>
                                <input type="text" ref="id" id="id" name="id"/>
                                <input type="text" ref="flags" id="flag" name="flag"/>
                            </form>
                            <div>
                                <i className="action iconfont icon-icon-test"></i>
                                <div className="addPracticeUploadText">Upload</div>
                            </div>
                        </span>
                    </div>
                    <div className={this.state.imgShowFlag ? "addPracticeUploadDone" : "addPracticeUploadDone2"} >
                        <div className="addPracticeUploadInfo">
                            <span>
                                <a className="addPracticeUploadThumbnail" id="addPracticeUploadThumbnail">
                                    <img src={this.state.picurl.length == 0 ? "" : url.WEBURL + this.state.picurl} alt="" id="uploadImgShow"/>
                                </a>
                            </span>
                        </div>
                        <span className="addPracticeUploadActions">
                            <i className="addPracticeUploadActionsDelete iconfont icon-SHANCHU-" onClick={this.onDeleteImg.bind(this)}></i>
                        </span>
                    </div>
                    <div className="addPracticeThinking">
                        <span className="addPracticeThinkingTitle">解题思路:</span>
                        <textarea ref="answer1Ref" onChange={this.onTextareaAnswer1Change.bind(this)} className="addPracticeThinkingTextarea"></textarea>
                    </div>
                    <div className="addPracticeThinking">
                        <span className="addPracticeThinkingTitle"><i className="addPracticeMsgMust">*</i>完全解析:</span>
                        <textarea ref="answer2Ref" onChange={this.onTextareaAnswer2Change.bind(this)} className="addPracticeThinkingTextarea"></textarea>
                    </div>
                    <div className="addPracticeButton">
                        <span className="addPracticeButtonCancel" onClick={this.onBackTo.bind(this)}>取消</span>
                        <span className="addPracticeButtonCancel addPracticeButtonEnter commonButton button" onClick={this.onAddPractice.bind(this)}>确定</span>
                    </div>
                </div>
                <BombBox
                    hideClick={this.hideClick.bind(this)}
                    isHidden={this.state.isHidden}
                    bombBoxMsg={this.state.bombBoxMsg}
                />
            </div>
        );
    }
}