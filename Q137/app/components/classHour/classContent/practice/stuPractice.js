
import React from 'react';
import $ from 'jquery';
import url from '../../../../controller/url.js';
import styles from './stylePractice.js';
import './practice.css';

//课堂练习组件
export default class practice extends React.Component {
    constructor() {
        super();
        this.state = {
            spanID: -1,
            selectID: -1,
            spanShow: -1,
            showAnswerID: -1,
            imgBoxShow: false,
            imgURL: [],
        }
    }
    componentWillMount() {
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
        addEvent(getId('practiceBigImg2'),'keydown',function(e){
            if(e.keyCode === 27){
                $('html').css('overflow','auto');
                _This.setState({
                    imgBoxShow: false
                })
            }
        })
    }
    //点击已阅显示详细解答
    showAnswer(id, key) {
        this.setState({
            showAnswerID: id
        });
        if (window.location.hash.indexOf("&") > 0) {
            this.getLessonByAjaxAnswer(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]),key);
        } else {
            this.getLessonByAjaxAnswer(Base64.decode(window.location.hash.split("?")[1].split("=")[1]),key);
        }
    }
    getLessonByAjaxAnswer(lessonid,key) {
        $.llsajax({
            url: "lesson/practicelog",
            type: "POST",
            data: {
                lessonid: lessonid,
                type: 0,
                practiceid: key,
            },
            success: practicelogData => {}
        });
    }
    // colorShow(id) {
    //     $(".practicThinkingRead").eq(id).css({
    //         color: "#469db8",
    //         border: "1px solid #469db8"
    //     });
    // }
    // colorHide(id) {
    //     $(".practicThinkingRead").eq(id).css({
    //         color: "#71706e",
    //         border: "1px solid #71706e"
    //     });
    // }
    //点击展开显示解题思路
    showPractice(id, key, msg) {
        this.setState({
            selectID: id,
        });
        if (window.location.hash.indexOf("&") > 0) {
            this.getLessonByAjaxPractice(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]), key);
        } else {
            this.getLessonByAjaxPractice(Base64.decode(window.location.hash.split("?")[1].split("=")[1]), key);
        }
    }
    //点击收起解题思路
    hidePractice(id, key, msg) {
        this.setState({
            selectID: -1,
        });
        if (window.location.hash.indexOf("&") > 0) {
            this.getLessonByAjaxPractice(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]), key);
        } else {
            this.getLessonByAjaxPractice(Base64.decode(window.location.hash.split("?")[1].split("=")[1]), key);
        }
    }
    getLessonByAjaxPractice(lessonid, key) {
        $.llsajax({
            url: "lesson/practicelog",
            type: "POST",
            data: {
                lessonid: lessonid,
                type: 1,
                practiceid: key
            },
            success: practicelogData => {}
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
    showImgLoad(id) {
        $(".practiceShowImg").eq(id).prop('src', require('../../../../images/public/errorImg.png'));
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
    onShowBigImg(url) {
        $('html').css('overflow','hidden');
        this.setState({
            imgBoxShow: true,
            imgURL: url
        });
    }
    _showPracticeBox() {
        return this.props.practiceListList.map((value, key) => {
            return (
                <div onMouseEnter={this.onSpanShow.bind(this, key, value.id)} onMouseLeave={this.state.spanShow != value.id ? this.onSpanHide.bind(this, key, value.id) : null} className="practiceContent" style={this.state.selectID != key ? styles.practiceContentStudent : styles.practiceContentStudent2} key={key}>
                    <div style={this.state.selectID != key ? styles.practiceCaption : styles.practiceCaption2}>
                        <span style={styles.practiceCaptionNumbre}>{key + 1}.</span>
                        <div style={styles.practiceCaptionTextarea}>{value.question}</div>
                        <span className="showPractice y_practiceTransform" onClick={this.state.selectID != key ? this.showPractice.bind(this, key, value.id, "展开") : this.hidePractice.bind(this, key, value.id, "收起")} style={styles.practiceStop}>
                            {this.state.selectID == key ? "收起解题思路" : "展开解题思路"}
                            <i className={this.state.selectID == key ? "iconfont icon-zhankai-2" : "iconfont icon-shouqi-"} style={styles.practiceCaptionI}>

                            </i>
                        </span>
                    </div>
                    <div style={this.state.selectID == key ? styles.practiceShow : styles.practiceHide} className="practiceShow">
                        <img className="practiceShowImg" onDoubleClick={this.onShowBigImg.bind(this,value.picurl == null ? "" : url.WEBURL + value.picurl)} onError={this.showImgLoad.bind(this, key)} style={value.picurl == null || value.picurl == "" ? styles.practiceImagehide : styles.practiceImage} src={value.picurl == null ? "" : url.WEBURL + value.picurl}>

                        </img>
                        <div style={value.answer1 == null || value.answer1 == "" ? styles.practiceCenter : null}>
                            <div style={styles.practiceTitle}>
                                <i style={styles.practiceTriangleRight} className="iconfont icon-jietisilu">

                                </i>
                                <span style={styles.practiceSpan}>解题思路</span>
                                <div style={styles.practiceLine}>

                                </div>
                                <div style={styles.practiceMsg}>*阅读完解题思路才能查看完全解析</div>
                            </div>
                            <div style={styles.practicThinking}>
                                <div style={styles.practicThinkingCenter}>
                                    <textarea readOnly="readOnly" style={styles.practicThinkingCenterText} defaultValue={value.answer1}>

                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div style={this.state.showAnswerID == key || value.answer1 == null || value.answer1 == "" ? styles.practiceTitleClick : styles.practiceTitle2} className={this.state.showAnswerID == key || value.answer1 == null || value.answer1 == "" ? "" : "commonButton button"} onClick={this.showAnswer.bind(this, key, value.id)}>
                            <i className="iconfont icon-wanquanjiexi" style={styles.practiceTriangleRight2}>

                            </i>
                            <span style={styles.practiceSpan2}>完全解析</span>
                            <div style={styles.practiceLine}>

                            </div>
                        </div>
                        <div style={this.state.showAnswerID == key || value.answer1 == null || value.answer1 == "" ? styles.practicThinking2Show : styles.practicThinking2Hide} className="practicThinking2">
                            <div style={styles.practicThinkingCenter}>
                                <textarea readOnly="readOnly" style={styles.practicThinkingCenterText} className="practicAnswerShow" defaultValue={value.answer2}>

                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
    }
    render() {
        return (
            <div style={styles.practiceBoxNone}>
                <div style={this.props.StuPracticeStyle ? this.props.StuPracticeStyle : styles.practiceBox}>
                    {/*<div style={styles.classroomCaption}>课堂练习</div>*/}
                    {this._showPracticeBox()}
                </div>
                <div id="practiceBigImg2" style={this.state.imgBoxShow ? styles.practiceBigImgShow : styles.practiceBigImgHide}>
                    <a onMouseEnter={this.onColorShow.bind(this)} onMouseLeave={this.onColorHide.bind(this)} style={this.state.colorFlag ? styles.practiceBigImgA2 :styles.practiceBigImgA} className="iconfont icon-guanbi" onClick={this.closeMask.bind(this)}></a>
                    <img style={styles.practiceBigImg} className="y_practiceTransform2" src={this.state.imgURL} alt=""/>
                </div>
            </div>
        );
    }
}
