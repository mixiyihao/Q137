import React, { Component } from 'react';
import $ from 'jquery';
import url from '../../controller/url.js';
import { Link, hashHistory } from 'react-router';
import TriodeLinkage from './threeLevel/threeLevel.js';
import BombBox from '../../teacherComponents/bombBox/bombBox.js'
import './editExercise.css';

export default class EditExercise extends Component {
    constructor() {
        super();
        this.state = {
            picurl: [],
            imgShowFlag: false,
            isHidden: true, // 弹框显示消失阀门
            bombBoxMsg: [], // 弹出框警告信息
            lesson_id: "",
            isRenderFlag: true,
        }
    }
    componentDidMount() {
        if (window.location.hash.indexOf("?") > 0) {
            let practiceID = Base64.decode(window.location.hash.split("?")[1].split("=")[1]);
            this.refs.lesson_id.value = practiceID;
            this.onModifyPractice(practiceID);
        }
    }
    // 点击确定提交练习
    onAddPractice() {
        let formData = new FormData($('#editExercise_uploadForm')[0]);
        if (this.refs.lesson_id.value !== "") {
            if (this.refs.question.value != "" && this.refs.answer2.value != "") {
                $.llsajaxupload({
                    url: "lesson/addOrEditPractice",
                    type: "POST",
                    cache: false,
                    processData: false,
                    contentType: false,
                    data: formData,
                    success: deletePractice => {
                        hashHistory.push("/exerciseManagementMain");
                    },
                    error: err => {}
                });
            } else {
                this.setState({
                    isHidden: false,
                    bombBoxMsg: "请填写完题目或者完全解析",
                    isRenderFlag: false,
                });
            }
        } else {
            this.setState({
                isHidden: false,
                bombBoxMsg: "请选择课时",
                isRenderFlag: false,
            });
        }

    }
    onModifyPractice(id) {
        $.llsajax({
            url: "lesson/findPracticeById",
            type: "POST",
            data: {
                id: id
            },
            async: true,
            success: PracticeByIdData => {
                //console.log(PracticeByIdData);
                this.setState({
                    lesson_id: PracticeByIdData.practice.lesson_id,
                    picurl: PracticeByIdData.practice.picurl === null || PracticeByIdData.practice.picurl == "" ? [] : PracticeByIdData.practice.picurl
                });
                let question = PracticeByIdData.practice.question === null ? "" : PracticeByIdData.practice.question;
                let answer1 = PracticeByIdData.practice.answer1 === null ? "" : PracticeByIdData.practice.answer1;
                let answer2 = PracticeByIdData.practice.answer2 === null ? "" : PracticeByIdData.practice.answer2;
                document.getElementById("lesson_id").value = PracticeByIdData.practice.lesson_id;
                if (PracticeByIdData.practice.picurl != null && PracticeByIdData.practice.picurl != "") {
                    this.setState({
                        imgShowFlag: true
                    });
                }
                this.refs.id.value = id;
                this.refs.question.value = question;
                this.refs.answer1.value = answer1;
                this.refs.answer2.value = answer2;
                this.refs.editExercise_MsgNameTitle.value = question;
                this.refs.editExercise_answer1Ref.value = answer1;
                this.refs.editExercise_answer2Ref.value = answer2;
                this.refs.flags.value = null;
            }
        });
    }
    addPracticeUpload() {
        document.getElementById("editExercise_UploadInput").click();
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
        let fileName = this.refs.file.files[0].name.split(".")[this.refs.file.files[0].name.split(".").length - 1];
        let _this = this;
        if (filetypes.indexOf(fileName) > -1) {
            if (this.refs.file.files[0].size < 4194304) {
                let file = this.refs.file.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    let addPracticeUploadThumbnail = document.getElementById('editExercise_UploadThumbnail');
                    if (document.getElementById("editExercise_uploadImgShow") !== null) {
                        let imgNode2 = document.getElementById("editExercise_uploadImgShow");
                        addPracticeUploadThumbnail.removeChild(imgNode2);
                    }
                    let imgNode = document.createElement('img');
                    imgNode.setAttribute("id","editExercise_uploadImgShow");
                    addPracticeUploadThumbnail.appendChild(imgNode);
                    document.getElementById("editExercise_uploadImgShow").src = this.result;
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
        document.getElementById("editExercise_question").value = e.target.value;
    }
    onTextareaAnswer1Change(e) {
        document.getElementById("editExercise_answer1").value = e.target.value;
    }
    onTextareaAnswer2Change(e) {
        document.getElementById("editExercise_answer2").value = e.target.value;
    }
    onDeleteImg() {
        let imgNode = document.getElementById("editExercise_uploadImgShow");
        let addPracticeUploadThumbnail = document.getElementById('editExercise_UploadThumbnail');
        addPracticeUploadThumbnail.removeChild(imgNode);
        this.refs.file.value = "";
        this.setState({
            imgShowFlag: false,
            isRenderFlag: false,
        });
        if (window.location.hash.indexOf("?") > 0) {
            this.refs.flags.value = 1;
        } else {
            this.refs.flags.value = null;
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
        return (
            <div className="editExercise_box">
                <div className="editExercise_wrap">
                    <h2>添加练习题</h2>
                    <Link to="/exerciseManagementMain" className="editExercise_linkTo commonButton button">前往练习题库</Link>
                    <div className="editExercise_select">
                        <TriodeLinkage
                            TriodeLink={this.TriodeLink.bind(this)}
                            lesson_id={this.state.lesson_id}
                            isRenderFlag={this.state.isRenderFlag}
                        />
                    </div>
                    <div className="editExercise_MsgName">
                        <span className="editExercise_MsgNameTitle"><i className="editExercise_MsgMust">*</i>习题名称:</span>
                        <textarea ref="editExercise_MsgNameTitle" onChange={this.onTextareaNameChange.bind(this)} className="editExercise_MsgNameTextarea">

                        </textarea>
                    </div>
                    <div className={this.state.imgShowFlag ? "editExercise_Upload" : "editExercise_Upload2"} onClick={this.addPracticeUpload.bind(this)}>
                        <span className="editExercise_UploadButton">
                            <form id="editExercise_uploadForm">
                                <input ref="file" name="uploadfile" type="file" id="editExercise_UploadInput" accept="image/jpeg,image/gif,image/png" onChange={this.loadTextValue.bind(this)}/>
                                <input type="text" ref="lesson_id" id="lesson_id" name="lesson_id"/>
                                <textarea className="editExercise_questionTextarea" type="text" ref="answer1" id="editExercise_answer1" name="answer1">

                                </textarea>
                                <textarea className="editExercise_questionTextarea" type="text" ref="answer2" id="editExercise_answer2" name="answer2">

                                </textarea>
                                <textarea className="editExercise_questionTextarea" ref="question" id="editExercise_question" name="question" >

                                </textarea>
                                <input type="text" ref="id" id="editExercise_id" name="id"/>
                                <input type="text" ref="flags" id="editExercise_flag" name="flag"/>
                            </form>
                            <div>
                                <i className="action iconfont icon-icon-test">

                                </i>
                                <div className="editExercise_UploadText">Upload</div>
                            </div>
                        </span>
                    </div>
                    <div className={this.state.imgShowFlag ? "editExercise_UploadDone" : "editExercise_UploadDone2"} >
                        <div className="editExercise_UploadInfo">
                            <span>
                                <a className="editExercise_UploadThumbnail" id="editExercise_UploadThumbnail">
                                    <img src={this.state.picurl.length == 0 ? "" : url.WEBURL + this.state.picurl} alt="" id="editExercise_uploadImgShow"/>
                                </a>
                            </span>
                        </div>
                        <span className="editExercise_UploadActions">
                            <i className="editExercise_UploadActionsDelete iconfont icon-SHANCHU-" onClick={this.onDeleteImg.bind(this)}>

                            </i>
                        </span>
                    </div>
                    <div className="editExercise_Thinking">
                        <span className="editExercise_ThinkingTitle">解题思路:</span>
                        <textarea ref="editExercise_answer1Ref" onChange={this.onTextareaAnswer1Change.bind(this)} className="editExercise_ThinkingTextarea">

                        </textarea>
                    </div>
                    <div className="editExercise_Thinking">
                        <span className="editExercise_ThinkingTitle"><i className="editExercise_MsgMust">*</i>完全解析:</span>
                        <textarea ref="editExercise_answer2Ref" onChange={this.onTextareaAnswer2Change.bind(this)} className="editExercise_ThinkingTextarea">

                        </textarea>
                    </div>
                    <div className="editExercise_Button">
                        {/*<span className="addPracticeButtonCancel" onClick={this.onBackTo.bind(this)}>取消</span>*/}
                        <span className="editExercise_ButtonCancel editExercise_ButtonEnter commonButton button" onClick={this.onAddPractice.bind(this)}>提交</span>
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