
import React from 'react';
import $ from 'jquery';
import url from '../../../controller/url.js';
import styles from './stylePractice.js';
import BombBox from '../../../components/public/bombBox/bombBox.js'

//课堂练习组件
export default class practice extends React.Component {
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
            userJudge: sessionStorage.getItem('userJudge'), // 权限配置
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
            success: practicelogData => {
            }
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
            success: practicelogData => {
            }
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
        this.props.onPracticeShow(id);
    }
    showImgLoad(id) {
        $(".practiceShowImg").eq(id).prop('src', require('../../../images/public/errorImg.png'));
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
                <div onMouseEnter={this.onSpanShow.bind(this, key, value.id)} onMouseLeave={this.state.spanShow != value.id ? this.onSpanHide.bind(this, key, value.id) : null} className="practiceContent" style={this.state.selectID != key ? styles.practiceContent : styles.practiceContent2} key={key}>
                    <div style={styles.practiceCaption}>
                        {
                            this.state.userJudge === "MM" ?
                                null
                                :
                                <i className={IconStyle} style={practiceCaptionIcon}></i>
                        }
                        <span style={styles.practiceCaptionNu}>{key + 1}.</span>
                        <div style={styles.practiceCaptionTextarea}>{value.question}</div>
                        <div style={styles.practiceCaptionToolBox} className="y_practiceTransform">
                            <span title="修改" style={value.permission == 1 ? styles.practiceModify : styles.practiceModifyHide} className="iconfont icon-yijianfankui" onClick={this.onPracticeModify.bind(this,value.id)}></span>
                            <span title="删除" style={value.permission == 1 ? styles.practiceDelete : styles.practiceDeleteHide} className="iconfont icon-SHANCHU-" onClick={this.onPracticeDelete.bind(this,value.id)}></span>
                            <span title="展开" className="showPractice" onClick={this.state.selectID != key ? this.showPractice.bind(this, key, value.id, "展开") : this.hidePractice.bind(this, key, value.id, "收起")} style={styles.practiceStop}>{this.state.selectID == key ? "收起解题思路" : "展开解题思路"}<i className={this.state.selectID == key ? "iconfont icon-zhankai-2" : "iconfont icon-shouqi-"} style={styles.practiceCaptionI}></i></span>
                        </div>                             
                    </div>
                    <div style={this.state.selectID == key ? styles.practiceShow : styles.practiceHide} className="practiceShow">
                        <img className="practiceShowImg" onDoubleClick={this.onShowBigImg.bind(this,value.picurl == null ? "" : url.WEBURL + value.picurl)} onError={this.showImgLoad.bind(this, key)} style={value.picurl == null || value.picurl == "" ? styles.practiceImagehide : styles.practiceImage} src={value.picurl == null ? "" : url.WEBURL + value.picurl}></img>
                        <div style={value.answer1 == null || value.answer1 == "" ? styles.practiceCenter : null}>
                            <div style={styles.practiceTitle}>
                                <i style={styles.practiceTriangleRight} className="iconfont icon-jietisilu"></i>
                                <span style={styles.practiceSpan}>解题思路</span>   
                                <div style={styles.practiceLine}></div>
                                <div style={styles.practiceMsg}>*阅读完解题思路才能查看完全解析</div>
                            </div>
                            <div style={styles.practicThinking}>
                                <div style={styles.practicThinkingCenter}>
                                    <textarea readOnly="readOnly" style={styles.practicThinkingCenterText} defaultValue={value.answer1}></textarea>
                                </div>
                            </div>
                        </div>
                        <div style={this.state.showAnswerID == key || value.answer1 == null || value.answer1 == "" ? styles.practiceTitleClick : styles.practiceTitle2} onClick={this.showAnswer.bind(this, key, value.id)} className={this.state.showAnswerID == key || value.answer1 == null || value.answer1 == "" ? "" : "commonButton button"}>
                            <i className="iconfont icon-wanquanjiexi" style={styles.practiceTriangleRight2}></i>
                            <span style={styles.practiceSpan2}>完全解析</span>
                            <div style={styles.practiceLine}></div>
                        </div>
                        <div style={this.state.showAnswerID == key || value.answer1 == null || value.answer1 == "" ? styles.practicThinking2Show : styles.practicThinking2Hide} className="practicThinking2">
                            <div style={styles.practicThinkingCenter}>
                                <textarea readOnly="readOnly" style={styles.practicThinkingCenterText} className="practicAnswerShow" defaultValue={value.answer2}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            )
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
                this.props.onPracticeRefs();
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
    render() {
        return (
            <div style={styles.practiceBoxNoneT}>
                <div style={styles.practiceBoxTeacher}>
                    <div style={styles.classroomCaption}>添加习题</div>
                    <div style={styles.practiceAdd} className="commonButton button" onClick={this.onAddPractice.bind(this)}>添加课堂练习</div>
                    {this._showPracticeBox()}
                </div>
                <div id="practiceBigImg" style={this.state.imgBoxShow ? styles.practiceBigImgShow : styles.practiceBigImgHide}>
                    <a onMouseEnter={this.onColorShow.bind(this)} onMouseLeave={this.onColorHide.bind(this)} style={this.state.colorFlag ? styles.practiceBigImgA2 :styles.practiceBigImgA} className="iconfont icon-guanbi" onClick={this.closeMask.bind(this)}></a>
                    <img style={styles.practiceBigImg} className="y_practiceTransform2" src={this.state.imgURL} alt=""/>
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
