
import React from 'react';
import './styleMyQuestion.css';
import $ from 'jquery';
import zan from '../../../images/search/asasa.jpg';
import zan2 from '../../../images/search/qwewewewe.jpg';
import BombBox from '../bombBox/bombBox.js'

//我的提问模块 YH
export default class MyQuestion extends React.Component {
    constructor() {
        super();
        this.state = {
            dataQuestion: [],
            page: 1,
            bodytiwen: [],
            count: 1,
            flag: [],
            userJudge: sessionStorage.getItem("userJudge"), // 从session中获取是教师还是学生
            pKey: -1,
            isHidden: true, // 弹框显示消失阀门
            bombBoxMsg: [], // 弹出框警告信息
            questionKey: [],
            questionEqkey: []
        }
    }
    componentWillMount() {}
    componentDidMount() {
        this.getComent(this.state.page);
        $('html,body').animate({
            scrollTop: 0
        });
    }
    // 获取数据的ajax
    getComent(pages) {
        $.llsajax({
            url: "onlineqa/myquestion",
            data: {
                perpage: 10,
                pageno: pages
            },
            type: "POST",
            async: true,
            success: questionData => {
                if (questionData.list == undefined) {
                    this.setState({
                        dataQuestion: [],
                        count: 0,
                    });
                } else {
                    this.setState({
                        dataQuestion: questionData.list,
                        count: questionData.count,
                    });
                }
            }
        });
    }
    // 展开全部和收起功能 YH
    questionLeftDrop(id) {
        this.setState({
            pKey: id
        });
    }
    questionLeftUp(id) {
        this.setState({
            pKey: -1
        });
    }
    // 未解答问题删除功能 YH
    questionLeftDelete(key, eqkey) {
        this.setState({
            isHidden: !this.state.isHidden,
            bombBoxMsg: "是否删除这一条问题",
            questionKey: key,
            questionEqkey: eqkey
        });
    }
    enterClick() {
        $.llsajax({
            url: "onlineqa/delQuestion",
            type: "post",
            data: {
                questionid: this.state.questionKey
            },
            async: true,
            success: deleteData => {
                if (this.state.dataQuestion.length <= 1) {
                    $(".y-questionMsg").eq(this.state.questionEqkey).remove();
                }
                this.getComent(this.state.page);
                this.setState({
                    isHidden: !this.state.isHidden
                });
            }
        })
    }
    //为回答问题修改
    questionLeftRes(key) {
        let _thisQuestion = null;
        this.state.dataQuestion.map((value) => {
            if (key == value.id) {
                _thisQuestion = value
            }
        });
        $('html,body').animate({
            scrollTop: 0
        });
        this.props.onQuestionLeftRes({ id: _thisQuestion.id, question: _thisQuestion.question, detailtext: _thisQuestion.detailtext, label: _thisQuestion.label, marks: 1 });
    }
    //点赞
    ValuateFabulous(key) {
        $.llsajax({
            url: "onlineqa/thumbsup",
            type: "post",
            data: {
                questionid: key
            },
            async: true,
            success: deleteData => {
                this.setState({
                    flag: deleteData.flag
                });
                this.getComent(this.state.page);
            }
        })

    }
    _myQuestionData() {
        let styles = {
            answerShow: {
                display: "block"
            },
            answerHide: {
                display: "none"
            },
            myQuestionDivStudent: {
                width: "86px"
            }
        };
        return this.state.dataQuestion.map((value, key) => {
            let styleText = {
                display: parseInt(value.complete) ? 'none' : 'block'
            };
            let showDrop = {
                display: parseInt(value.complete) ? 'block' : 'none'
            };
            function createMarkup() {
                return {
                    __html: value.detailtext
                };
            }
            return (
                // 遍历我的提问数据，进行展示 YH
                <div key={key} id={value.id} className="y-questionMsgDiv">
                    <li className="y-questionMsg">
                        <div className="y-questionContent">
                            <div className="y-questionLeft">
                                <p className="y-questionLeftP2" title={value.question}>{value.question}</p>
                            </div>
                            <div className="y-questionCenter">{value.subtime.substr(0, 10)}</div>
                            <div className="y-questionRight" style={this.state.userJudge !== "S" ? null : styles.myQuestionDivStudent}>{parseInt(value.complete) ? '已解答' : '未解答'}</div>
                            <div className="y-questionRightTool">
                                <span className="y-questionLeftDelete" onClick={this.questionLeftDelete.bind(this, value.id, key)} style={styleText}>
                                    <i className="iconfont icon-SHANCHU-">

                                    </i>
                                    删除
                                </span>
                                <span className="y-questionLeftRes" onClick={this.questionLeftRes.bind(this, value.id)} style={styleText}>
                                    <i className="iconfont icon-yijianfankui">

                                    </i>
                                    编辑
                                </span>
                                <i className={"y-questionLeftDrop"} onClick={this.state.pKey == key ? this.questionLeftUp.bind(this, key) : this.questionLeftDrop.bind(this, key)} style={showDrop}>
                                    {this.state.pKey == key ? "收起问题" : "展开问题"}
                                    <i className={this.state.pKey == key ? "iconfont icon-zhankai-2" : "iconfont icon-shouqi-"}>

                                    </i>
                                </i>
                            </div>
                        </div>
                        <div className="y-lecturerAnswer" style={this.state.pKey == key ? styles.answerShow : styles.answerHide}>
                            <div className="y-lecturerAnswerLeft">
                                <div>
                                    <h4>问题说明：</h4>
                                    <div className="y-lecturerQuestion" dangerouslySetInnerHTML={createMarkup()} />
                                </div>
                                <div className="y-lecturerAnswerLeftTea">
                                    <h4>讲师答案：</h4>
                                    <p>{value.answer}</p>
                                    <div className="y-answereValuateFabulous" onClick={parseInt(value.evaluatenum) ? null : this.ValuateFabulous.bind(this, value.id)}>
                                        <img src={parseInt(value.evaluatenum) ? zan : zan2} />
                                        <span ref="thembsum" className="y-answereValuateFabulousSpan">{value.evaluatesum}</span>
                                    </div>
                                    <div className="y-lecturerAnswerCenter">{value.answertime == null ? value.answertime : value.answertime.substr(0, 10)}</div>
                                </div>
                            </div>
                        </div>
                    </li>
                </div>
            )
        });
    }
    //这是点击上一页执行的函数
    showPre() {
        if (this.state.page > 1) {
            this.setState({
                page: --this.state.page,
                pKey: -1
            });
            this.getComent(this.state.page);
        }
    }
    //这是点击下一页执行的函数
    showNext() {
        if (this.state.count == this.state.page) {
            return;
        } else {
            this.setState({
                page: ++this.state.page,
                pKey: -1
            });
            this.getComent(this.state.page);
        }
    }
    // 弹出框取消
    hideClick() {
        this.setState({
            isHidden: !this.state.isHidden
        });
    }
    render() {
        let qusetionText = {
            caption: "我的提问"
        };
        let forbid = {
            backgroundColor: "rgb(211, 211, 211)",
            color: "rgb(255, 255, 255)",
            borderColor: "rgb(211, 211, 211)",
        };
        let starts = {
            backgroundColor: "rgb(255, 255, 255)",
            color: "rgb(50, 50, 50)",
            borderColor: "rgb(211, 211, 211)",
        };
        let styles = {
            warningShow: {
                display: "block"
            },
            warningHide: {
                display: "none"
            },
            myQuestionTeacher: {
                background: "#fff",
                width: "955px",
                margin: "auto",
                padding: "0px"
            },
            myQuestionStudent: {
                margin: "0px 0 0 277px",
                width: "949px"
            },
            buttonShow: {
                display: "block",
                overflow: "hidden"
            },
            buttonHide: {
                display: "none"
            },
            teacherQuestion: {
                width: "1000px",
                margin: "0 auto"
            },
            teacherPage: {
                right: "17px"
            },
            myQuestionUlStudent: {
                width: "909px"
            },
            myQuestionDivStudent: {
                width: "86px"
            }
        }
        let forbidcls = this.state.page == 1 ? forbid : starts;
        if (this.state.dataQuestion == undefined) {

        } else {
            if (this.state.dataQuestion.length) {
                var listlen = forbid;
            } else {
                var listlen = this.state.dataQuestion.length < 5 ? forbid : starts;
            }
        }
        let listlens = this.state.page == this.state.count ? forbid : starts;
        return (
            <div className="y-myQuestionBox" style={this.state.userJudge !== "S" ? styles.teacherQuestion : null}>
                <div className="y-myQuestion" style={this.state.userJudge !== "S" ? styles.myQuestionTeacher : styles.myQuestionStudent}>
                    <div className="y-caption">{qusetionText.caption}</div>
                    <div className="y-myQuestionUlBox">
                        <ul className="y-myQuestionUl" style={this.state.userJudge !== "S" ? null : styles.myQuestionUlStudent}>
                            <li className="y-questionTitle">
                                <div>问题</div>
                                <div>发起时间</div>
                                <div style={this.state.userJudge !== "S" ? null : styles.myQuestionDivStudent}>状态</div>
                                <div>操作</div>
                            </li>
                            <div className="y-questionWarning" style={this.state.dataQuestion.length == 0 ? styles.warningShow : styles.warningHide}>
                                <i></i>
                                <span>当前无提问数据</span>
                            </div>
                            {this._myQuestionData()}
                        </ul>
                    </div>
                    <div style={this.state.count <= 1 ? styles.buttonHide : styles.buttonShow}>
                        <div className="y-page" style={this.state.userJudge !== "S" ? styles.teacherPage : null}>
                            <div className="y-pageNum">共<i>{this.state.count}</i>页&nbsp;&nbsp;&nbsp;&nbsp;第<span>{this.state.page}</span>页</div>
                            <button className="y-page1" id="y-pageid1" style={forbidcls} onClick={this.showPre.bind(this)}>上一页</button>
                            <button className="y-page2" style={listlens} onClick={this.showNext.bind(this)}>下一页</button>
                        </div>
                    </div>
                </div>
                <BombBox
                    hideClick={this.hideClick.bind(this)}
                    enterClick={this.enterClick.bind(this)}
                    isHidden={this.state.isHidden}
                    bombBoxMsg={this.state.bombBoxMsg}
                />
            </div >
        );
    }
}
