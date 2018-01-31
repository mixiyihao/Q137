import React, { Component } from 'react';
import $ from 'jquery';
import url from '../../../../controller/url.js';
import { Link, hashHistory } from 'react-router';
import '../../../../teacherComponents/exerciseManagement/exerciseManagement.css';
import BombBox from '../../../../components/public/bombBox/bombBox.js'
import TriodeLinkage from '../../../../teacherComponents/editExercise/threeLevel/threeLevel.js';

export default class PublicExercisesComp extends Component {
    constructor() {
        super();
        this.state = {
            spanID: -1,
            selectID: -1,
            spanShow: -1,
            showAnswerID: -1,
            isHidden: true, // 弹框显示消失阀门
            bombBoxMsg: [], // 弹出框警告信息
            deleteID: [],
            imgBoxShow: false,
            colorFlag: false,
            page: 1,
            total: 1,
            count: 0,
            userJudge: sessionStorage.getItem("userJudge"),
            isRenderFlag: false,
            lesson_id: "",
            majorid: '',
            courseid: '',
            lessonid: ''
        }
    }
    componentWillMount() {
        this.setState({
            page: this.props.page,
            total: this.props.total,
            count: this.props.count
        });
        let _This = this;
        let getId = function (id) {
            return document.getElementById(id);
        };
        let addEvent = function (id, event, fn) {
            let el = getId(id) || document;
            if (el.addEventListener) {
                el.addEventListener(event, fn, false);
            } else if (el.attachEvent) {
                el.attachEvent('on' + event, fn);
            }
        };
        addEvent(getId('practiceBigImg'),'keydown',function(e){
            if(e.keyCode === 27){
                $('html').css('overflow','auto');
                _This.setState({
                    imgBoxShow: false
                })
            }
        })
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            page: nextProps.page,
            total: nextProps.total,
            count: nextProps.count
        });
    }
    //点击已阅显示详细解答
    showAnswer(id, key) {
        this.setState({
            showAnswerID: id
        });
    }
    colorShow(id) {
        $(".practicThinkingRead").eq(id).css({
            color: "#469db8",
            border: "1px solid #469db8"
        });
    }
    colorHide(id) {
        $(".practicThinkingRead").eq(id).css({
            color: "#71706e",
            border: "1px solid #71706e"
        });
    }
    //点击展开显示解题思路
    showPractice(id, key, msg) {
        this.setState({
            selectID: id,
        });
    }
    //点击收起解题思路
    hidePractice(id, key, msg) {
        this.setState({
            selectID: -1,
        });
    }
    onSpanShow(id,key) {
        this.setState({
            spanID: id,
            spanShow: -1
        });
    }
    onSpanHide(id,key) {
        if ($(".practiceShow").eq(id).css('display') == 'block') {
            this.setState({
                spanID: id,
                spanShow: key
            });
        } else {
            this.setState({
                spanID: id,
                spanShow: -1
            });
        }
    }
    // 删除私有练习
    onPracticeDelete(id) {
        this.setState({
            isHidden: !this.state.isHidden,
            bombBoxMsg: "确认删除?",
            deleteID: id,
        });
    }
    onPracticeModify(id) {
        hashHistory.push({
            pathname: "/editExerciseMain",
            query: {
                i: Base64.encodeURI(id)
            }
        })
    }
    showImgLoad(id) {
        $(".practiceShowImg").eq(id).prop('src', require('../../../../images/public/errorImg.png'));
    }
    onShowBigImg(url) {
        $('html').css('overflow','hidden');
        this.setState({
            imgBoxShow: true,
            imgURL: url
        });
    }
    _showPracticeBox() {
        return this.props.selectPracticeData.map((value,key) => {
            let IconStyle = null;
            let practiceCaptionIcon = {
                position: "absolute",
                left: "0",
                top: "9px",
                fontSize: "40px"
            };
            if (value.permission == 1) {
                IconStyle = 'iconfont icon-gongyou';
                practiceCaptionIcon.color = '#aaddea';
            } else if (value.permission == 2) {
                IconStyle = 'iconfont icon-sizhuangong';
                practiceCaptionIcon.color = '#eaaaaa';
            } else {
                IconStyle = '';
                practiceCaptionIcon.color = '#eaaaaa';
            }
            return (
                <div onMouseEnter={this.onSpanShow.bind(this, key, value.id)} onMouseLeave={this.state.spanShow != value.id ? this.onSpanHide.bind(this, key, value.id) : null} className={this.state.selectID != key ? "exerciseManagement_content" : "exerciseManagement_content2"} key={key}>
                    <div className="exerciseManagement_caption">
                        <i className={IconStyle + "exerciseManagement_captionIcon"}></i>
                        <span className="exerciseManagement_captionNu">{key + 1}.</span>
                        <div className="exerciseManagement_captionTextarea">{value.question}</div>
                        <div className="y_practiceTransform exerciseManagement_captionToolBox">
                            {
                                value.permission == 2 ?
                                    <div>
                                        <span title="修改" className={"iconfont icon-yijianfankui exerciseManagement_modify"} onClick={this.onPracticeModify.bind(this,value.id)}></span>
                                        <span title="删除" className={"iconfont icon-SHANCHU- exerciseManagement_delete"} onClick={this.onPracticeDelete.bind(this,value.id)}></span>
                                    </div>
                                    :
                                    null
                            }
                            <span title="展开" className="showPractice exerciseManagement_practiceStop" onClick={this.state.selectID != key ? this.showPractice.bind(this, key, value.id, "展开") : this.hidePractice.bind(this, key, value.id, "收起")}>{this.state.selectID == key ? "收起解题思路" : "展开解题思路"}<i className={this.state.selectID == key ? "iconfont icon-zhankai-2 exerciseManagement_captionI" : "iconfont icon-shouqi- exerciseManagement_captionI"}></i></span>
                        </div>
                    </div>
                    <div className={this.state.selectID == key ? "practiceShow exerciseManagement_practiceShow" : "practiceShow exerciseManagement_practiceHide"}>
                        <img className={value.picurl == null || value.picurl == "" ? "practiceShowImg exerciseManagement_imageHide" : "practiceShowImg exerciseManagement_image"} onDoubleClick={this.onShowBigImg.bind(this,value.picurl == null ? "" : url.WEBURL + value.picurl)} onError={this.showImgLoad.bind(this, key)} src={value.picurl == null ? "" : url.WEBURL + value.picurl}>

                        </img>
                        <div className={value.answer1 == null || value.answer1 == "" ? "exerciseManagement_practiceCenter" : ""}>
                            <div className="exerciseManagement_practiceTitle">
                                <i className="iconfont icon-jietisilu exerciseManagement_triangleRight">

                                </i>
                                <span className="exerciseManagement_practiceSpan">解题思路</span>
                                <div className="exerciseManagement_practiceLine">

                                </div>
                                <div className="exerciseManagement_practiceMsg">*阅读完解题思路才能查看完全解析</div>
                            </div>
                            <div className="exerciseManagement_practicThinking">
                                <div className="exerciseManagement_practicThinkingCenter">
                                    <textarea disabled="disabled" className="exerciseManagement_practicThinkingCenterText" defaultValue={value.answer1}>

                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className={this.state.showAnswerID == key || value.answer1 == null || value.answer1 == "" ? "exerciseManagement_practiceTitleClick2" : "exerciseManagement_practiceTitleClick commonButton button"} onClick={this.showAnswer.bind(this, key, value.id)}>
                            <i className="iconfont icon-wanquanjiexi exerciseManagement_practiceTriangleRight2">

                            </i>
                            <span className="exerciseManagement_practiceSpan2">完全解析</span>
                            <div className="exerciseManagement_practiceLine">

                            </div>
                        </div>
                        <div className={this.state.showAnswerID == key || value.answer1 == null || value.answer1 == "" ? "practicThinking2 exerciseManagement_practicThinking2Show" : "practicThinking2 exerciseManagement_practicThinking2Hide"}>
                            <div className="exerciseManagement_practicThinkingCenter2">
                                <textarea disabled="disabled" className="practicAnswerShow exerciseManagement_practicThinkingCenterText" defaultValue={value.answer2}>

                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }
    // 点击切换添加练习组件
    onAddPractice() {
        this.props.onPracticeShow();
    }
    // 弹出框取消
    hideClick() {
        this.setState({
            isHidden: !this.state.isHidden
        });
    }
    enterClick () {
        $.llsajax({
            url: "lesson/deletePractice",
            type: "POST",
            data: {
                id: this.state.deleteID
            },
            success: deletePractice => {
                this.props.getSelectPractice();
                this.setState({
                    isHidden: !this.state.isHidden
                });
            }
        });
    }
    closeMask() {
        $('html').css('overflow','auto');
        this.setState({
            imgBoxShow: false
        });
    }
    onColorShow() {
        this.setState({
            colorFlag: true
        });
    }
    onColorHide() {
        this.setState({
            colorFlag: false
        });
    }
    showPre() {
        if (this.state.page > 1) {
            this.setState({
                page: --this.state.page,
            });
            this.props.getSelectPractice(this.state.page,this.state.majorid,this.state.courseid,this.state.lessonid);
        }
    }
    showNext() {
        if (this.state.total === this.state.page) {
            return false;
        } else {
            this.setState({
                page: ++this.state.page,
            });
            this.props.getSelectPractice(this.state.page,this.state.majorid,this.state.courseid,this.state.lessonid);
        }
    }
    TriodeLink(value) {
        this.props.getSelectPractice(1,value.majorValue,value.courseValue,value.lessonValue);
        this.setState({
            majorid: value.majorValue,
            courseid: value.courseValue,
            lessonid: value.lessonValue
        });
    }
    render() {
        return (
            <div className="exerciseManagement_box">
                <div className="exerciseManagement_wrap">
                    {
                        this.state.userJudge == "TM" ?
                            <h2>公有练习题库</h2>
                            :
                            <h2>我的练习题</h2>
                    }
                    <Link to="/editExerciseMain" className="exerciseManagement_linkTo commonButton button">添加练习题</Link>
                    <div className="exerciseManagement_select">
                        <TriodeLinkage
                            TriodeLink={this.TriodeLink.bind(this)}
                            lesson_id={this.state.lesson_id}
                            isRenderFlag={this.state.isRenderFlag}
                            optional={true}
                        />
                    </div>
                    <div className="exerciseManagement_wrapCen">
                        {this._showPracticeBox()}
                        <div className={this._showPracticeBox().length === 0 ? "exerciseManagement_wrapCenBg" : "exerciseManagement_wrapCenBgHide"}></div>
                    </div>
                    <div className={this.state.count <= 10 ? "exerciseManagement_pageHide" : "exerciseManagement_page"}>
                        <div className="exerciseManagement_pageNum">共<i>{this.state.total}</i>页&nbsp;&nbsp;&nbsp;&nbsp;第<span>{this.state.page}</span>页</div>
                        <button className={this.state.page === 1 ? "exerciseManagement_page1" : ""} id="exerciseManagement_pageid1" onClick={this.showPre.bind(this)}>上一页</button>
                        <button className={this.state.page === this.state.total ? "exerciseManagement_page1" : ""} onClick={this.showNext.bind(this)}>下一页</button>
                    </div>
                </div>
                <div id="practiceBigImg" className={this.state.imgBoxShow ? "exerciseManagement_practiceBigImgShow" : "exerciseManagement_practiceBigImgHide"}>
                    <a onMouseEnter={this.onColorShow.bind(this)} onMouseLeave={this.onColorHide.bind(this)} className={this.state.colorFlag ? "iconfont icon-guanbi exerciseManagement_practiceBigImgA2" : "iconfont icon-guanbi exerciseManagement_practiceBigImgA"} onClick={this.closeMask.bind(this)}> </a>
                    <img className="exerciseManagement_practiceBigImg" src={this.state.imgURL} alt=""/>
                </div>
                <BombBox
                    hideClick={this.hideClick.bind(this)}
                    enterClick={this.enterClick.bind(this)}
                    isHidden={this.state.isHidden}
                    bombBoxMsg={this.state.bombBoxMsg}
                />
            </div>
        );
    }
}