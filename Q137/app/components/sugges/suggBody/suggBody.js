'use strict';
import React from 'react';
import './styleSuggBody.css';
import '../suggTitle/styleSuggTitle.css';
import $ from 'jquery';
import {
    Link,
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect,
    browserHistory
} from 'react-router';

export default class suggBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bodytiwen: [],
            page: 1,
            count: [],
            Nreply: [],
            Yreply: [],
            sum: [],
            deleteId: [],
            onoroffinfo: "展开问题",
            pkey: -1,
        };
    }

    getComent(pages) {
        $.llsajax({
            url: "opinion/myopinion",
            type: "post",
            data: {
                pageno: pages,
                perpage: 10
            },
            success: bodytiwen => {
                this.setState({
                    bodytiwen: bodytiwen.list,
                    count: bodytiwen.count,
                    Newreply: bodytiwen.Newreply,
                    Nreply: bodytiwen.Nreply,
                    Yreply: bodytiwen.Yreply,
                    sum: bodytiwen.sum
                })
                if (this.state.Newreply == "0") {
                    $(".h-round").css("display", "none");
                }
            }
        })
    }

    getComtitl() {
        $.llsajax({
            url: "opinion/myopinion",
            type: "post",
            data: {
                pageno: 1,
                perpage: 5
            },
            success: titltiwen => {
                if (titltiwen == "" || titltiwen == null) {
                }
                this.setState({
                    Nreply: titltiwen.Nreply,
                    Yreply: titltiwen.Yreply,
                    sum: titltiwen.sum
                })
            }
        })
    }

    componentWillMount() {
        this.getComent(this.state.page);
        $(".h-rfont").css("display", "none");

    }

    Cdate() {

    }

    open(keys, valrep, keyflag) {
        if (keyflag != this.state.pkey) {
            this.setState({
                pkey: keyflag
            })
        }
        else {
            this.setState({
                pkey: -1
            })
        }
        $(".h-xbox").eq(keyflag).toggle();

        if (valrep == "已回复") {
            return;
        } else {
            $.llsajax({
                url: "opinion/viewopinion",
                type: "post",
                data: {
                    opinionid: keys
                },
                success: zhankai => {
                    this.getComent(this.state.page);
                }
            })
        }
    }

    onDelete(ids, whe) {
        if (whe == 1) {
            this.setState({
                deleteId: ids
            })
            $(".h-delete").css("display", "block");
        }

        if (whe == 3) {
            $.llsajax({
                url: "opinion/delopinion",
                type: "post",
                data: {
                    opinionid: this.state.deleteId
                },
                success: zhankai => {
                    this.getComent(this.state.page);
                    // this.getComtitl();
                    $(".h-delete").css("display", "none");
                }

            })
        }
    }

    closeprevs() { // 这是点击关闭删除出现的提示弹窗
        $(".h-delete").css("display", "none");
    }

    delet(keys) {
        if (confirm("是否删除这一条反馈")) {
            $.llsajax({
                url: "opinion/delopinion",
                type: "post",
                data: {
                    opinionid: keys
                },
                success: zhankai => {
                    this.getComent(this.state.page);
                    // this.getComtitl();
                }
            })
        }
    }

    SproClickhash(indexid) {
        if (sessionStorage.getItem("userJudge") == "S") {
            hashHistory.push("/stuEvaluate?Ad=" + indexid);
        } else if (sessionStorage.getItem("userJudge") == "T" || sessionStorage.getItem("userJudge") == "C") {
            hashHistory.push("/tinformations?SproState=3u&Ad=" + indexid);
        } else {
            hashHistory.push("/assinformations?SproState=3u&Ad=" + indexid);
        }
        this.props.handleChooseTab("Re", indexid);
    }

    h_bodytiwen() {
        return this.state.bodytiwen.map((value, key) => {
            if (value.replyflag == 0) {
                value.replyflag = "未回复";
            } else if (value.replyflag == 1) {
                value.replyflag = "新回复";
            } else if (value.replyflag == 2) {
                value.replyflag = "已回复";
            }
            let styleText = {
                display: value.replyflag == "未回复" ? 'none' : 'inline-block'
            };
            let showDrop = {
                display: value.replyflag == "未回复" ? 'inline-block' : 'none'
            }
            let showRound = {
                display: value.replyflag == "新回复" ? 'inline-block' : 'none'
            }
            let replytim = value.replytime == null ? value.replytime : value.replytime.substr(0, 16);
            let showreplytext = {
                display: value.detail == "" ? 'none' : 'block'
            }
            let teacherTimeStyle = {
                marginLeft: "45px",
            }
            return (
                <div key={key} id={value.id} className="h-bodytiwen">
                    <div className="suggView">
                        <div className="h-box fl">
                            {value.opinion}
                        </div>
                        <div className="h-rbox">
                            <div className="h-rspan h-reply1 h-datafont fl">{value.subtime.substr(0, 16)}</div>
                            <div className="h-rspan h-reply fl">
                                {value.replyflag}
                                <span className="h-round" style={showRound}></span>
                            </div>
                            <div className="dib su_sanlianfa">
                                <div id={key} className="h-rfont iconfont   spro-wunai " style={styleText}
                                     onClick={this.open.bind(this, value.id, value.replyflag, key)}
                                     ref={key}>{this.state.pkey == key ? "收起问题" : "展开问题"}
                                    <i className={this.state.pkey == key ? "icon-zhankai-2" : "icon-shouqi-"}></i>
                                </div>
                                <div className="h-rfont fl iconfont icon-SHANCHU- gangbazi " style={showDrop}><a
                                    href="javascript:;" className="h-delets" id={key}
                                    onClick={this.onDelete.bind(this, value.id, 1)}>删除</a></div>
                                <div className="h-rfont fl iconfont icon-yijianfankui gangbazi " style={showDrop}><a
                                    onClick={this.SproClickhash.bind(this, value.id)}>编辑</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="h-xbox fl suggModel">
                        <p className="h-replytext h-repl" style={showreplytext}>意见说明:</p>
                        <div className="h-fubiaoti">{value.detail}</div>
                        <div className="h-lbox fl">
                            <p className="h-replytext">管理员回复:</p>
                            <p>{value.reply}</p>
                        </div>
                        <p style={sessionStorage.getItem("userJudge") !== "S" ? teacherTimeStyle : null}
                           className="h-databox h-reply h-datafont fl">{replytim}</p>
                    </div>
                </div>
            )
        })
    }

    showPre() { //这是点击上一页执行的函数
        if (this.state.page > 1) {
            this.setState({
                page: --this.state.page
            })

            $(".h-xbox").css("display", "none");
            this.getComent(this.state.page);
            if ($(".spro-wunai").hasClass("icon-zhankai-1")) {
                $(".spro-wunai").removeClass("icon-zhankai-1")
                $(".spro-wunai").addClass("icon-zhankai-")
            }
        }

    }

    hashSuggbody() {
        this.props.handleChooseTab("Ne");
    }

    showNext() { //这是点击下一页执行的函数
        if (this.state.count == this.state.page) {
            return;
        } else {
            this.setState({
                page: ++this.state.page
            })

            $(".h-xbox").css("display", "none");
            this.getComent(this.state.page);
            if ($(".spro-wunai").hasClass("icon-zhankai-1")) {
                $(".spro-wunai").removeClass("icon-zhankai-1")
                $(".spro-wunai").addClass("icon-zhankai-")
            }
        }


    }

    render() {
        var forbid = {
            backgroundColor: "#d3d3d3",
            color: "#ffffff",
            borderColor: "#d3d3d3"
        }
        var starts = {
            backgroundColor: "#ffffff",
            color: "#323232",
            borderColor: "#d3d3d3"
        }
        let forbidcls = this.state.page == 1 ? forbid : starts;
        let listlen = this.state.bodytiwen.length < 5 ? forbid : starts;
        let listlens = this.state.page == this.state.count ? forbid : starts;
        let userState = sessionStorage.getItem("userJudge");
        let paddleftStyle = {
            paddingLeft: userState == "S" ? "230px" : "0px",
            width: userState == "S" ? "1065px" : "1069px",
        }
        if (location.hash.indexOf("stuEvaluate") != -1) {
            paddleftStyle = {
                paddingLeft: userState == "S" ? "17px" : "0px"
            }
        }
        let SpronewTitltStyle = {
            marginRight: userState != "S" ? "0px" : "0px"
        }
        if (location.hash.indexOf("stuEvaluate") != -1) {
            SpronewTitltStyle = {
                marginRight: userState != "S" ? "44px" : "19px"
            }
        }
        let marginLeftStyle = {
            marginLeft: userState != "S" ? "0px" : "210px"
        }
        if (location.hash.indexOf("stuEvaluate") != -1) {
            marginLeftStyle = {
                marginLeft: "0px"
            }
        }
        let Sprosugbody = {}
        if (location.hash.indexOf("stuEvaluate") != -1) {
            Sprosugbody = {
                width: "1009px",
                marginLeft: "20px"
            }
        }
        let prevstyle = {
            display: this.state.count <= 1 ? "none" : "block",
        }

        let prevstyleTea = {
            display: this.state.count <= 1 ? "none" : "block",
            marginBottom: "20px",
            marginRight: "0px"
        }

        let suggesstyle = {
            display: this.state.bodytiwen.length == 0 ? "block" : "none"
        }
        let styleI = {
            display: "inline-block",
            width: "60px",
            textAlign: "center",
        }
        let styleS = {
            display: "inline-block",
            width: "60px",
            textAlign: "center",
        }
        if (this.state.bodytiwen.length == 0) {
            prevstyle = {
                display: "none"
            }
        }
        return (
            <div className="h-landing h-suggbody">
                {/*这是删除试题的弹出框*/}
                <div className="h-delete">
                    <div className="h-deletes">
                        <div className="h-preheads">
                            <span className="fl h-deletprev1">删除</span>
                            <span className="fr h-deletprevs iconfont icon-guanbi"
                                  onClick={this.closeprevs.bind(this)}></span>
                        </div>
                        <p className="h-deletitle">确认删除该意见反馈吗？</p>
                        <div className="h-prevbtns">
                            <button className="h-prevbtns1" onClick={this.closeprevs.bind(this)}>取消</button>
                            <button className="h-prevbtns2 commonButton button"
                                    onClick={this.onDelete.bind(this, "for", 3)}>确定
                            </button>
                        </div>
                    </div>
                </div>
                <div className="h-navsSugg">
                    <div className="h-stepSugg">
                        <div className="h-stepSuggWrap">
                            {/*<p className="h-reset">意见反馈</p>*/}
                            <div className="h-agree" style={marginLeftStyle}>
                                <ul>
                                    <li>
                                        <span className="h-agree1">我的意见<s
                                            className="suggessumStyle">{this.state.sum}</s>条</span>
                                    </li>
                                    <li>
                                        <span className="h-agree1">已回复<s
                                            className="suggesYreplyStyle">{this.state.Yreply}</s>条</span>
                                    </li>
                                    <li>
                                        <span className="h-agree1">未回复<s
                                            className="suggesNreplyStyle">{this.state.Nreply}</s>条</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-suggBox" style={paddleftStyle}>
                    <div className="h-titl">
                        <span className="h-cubiud"></span><span className="h-information">我的意见反馈</span>
                        <div className="h-new-built" style={SpronewTitltStyle}>
                            <span onClick={this.hashSuggbody.bind(this)}
                                  className="spro-suggesBody commonButton button">新建反馈<span
                                className="iconfont icon-yijianfankui"></span></span>
                        </div>
                    </div>
                    <div className="h-sugbody" style={Sprosugbody}>
                        <div className="h-headtiwen">
                            <div className="h-span fl">意见</div>
                            <div className="h-rspan fr">操作</div>
                            <div className="h-rspan fr">状态</div>
                            <div className="h-rspan h-rspan1 fr">发起时间</div>
                        </div>
                        <div className="h-headtiWrap">
                            {this.h_bodytiwen()}
                            <div className="h-bodytiwen1" style={suggesstyle}>
                                <span className="h-sugpoint"></span>
                                <span className="h-sugpoint1">当前没有意见反馈</span>
                            </div>
                        </div>

                        <div className="h-page h-sugpage"
                             style={sessionStorage.getItem("userJudge") != "S" ? prevstyleTea : prevstyle}>
                            <div className="h-page0">共<i style={styleI}>{this.state.count}</i>页&nbsp;&nbsp;&nbsp;&nbsp;第
                                <span style={styleS}>{this.state.page}</span>页
                            </div>
                            <button className="h-page1" id="h-pageid1" style={forbidcls}
                                    onClick={this.showPre.bind(this)}>上一页
                            </button>
                            <button className="h-page2" style={listlens} onClick={this.showNext.bind(this)}>下一页</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    componentDidUpdate() {
        $(".h-rfont").on('click', function () {
            // //console.log('update')
            $(this).parents('.h-bodytiwen').siblings().children(".h-xbox").css("display", "none");
            // //console.log($(this).parents('.h-bodytiwen').siblings().children(".h-rbox").children(".h-rfont"))
            $(this).parents('.h-bodytiwen').siblings().children(".h-rbox").children(".h-rfont").removeClass("icon-zhankai-1");
        })
    }

}