/**
 * Created by heshuai on 2017/2/21.
 */
import React from 'react';
import '../finalexamBodycss.css';
import $ from 'jquery';
import '../s_predelate.css';
import ReactDOM from 'react-dom';
import TestlistItem from './stagePaperItem.jsx';
import {
    Link,
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect,
    browserHistory
} from 'react-router';

export default class StagePaperBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultInfotitle: "阶段测试试卷库",
            // majors: [],
            bodyques: [],
            //当前页数
            page: 1,
            //条目信息
            rows: [],
            index: [],
            //总页数
            pages: [],
            pagesCount: [],
            styleText: false,
            idsto: [],
            temptitle: [],
            styleTextinput: [],
            spro_info: false,
            spro_noinfo: false,
            spro_noinfos: [],
            //當前縂頁數
            pageCount: [],
            thatKey: "",
            paper_name: [],
            spro_pagestate2: false,
            spro_pagestate1: false,
            changeValue: '',
            //试卷来源
            majors: [],
            SproCourseData: [],
            SproMajorname: "全部专业",
            SproMajorid: "",
            SproCoursname: "全部课程",
            SproCoursid: "",
            userJudge: sessionStorage.getItem("userJudge")

        }
        $("body").css("overflow", "visible");
    }

    componentWillMount() {
        if (sessionStorage.getItem("teacherComp") == "") {
            $.llsajax({
                url: "major/findMajor",
                type: "POST",
                async: false,
                success: compData => {
                    sessionStorage.setItem("teacherComp", JSON.stringify(compData));
                }
            })
        }
        // 从session中获取数据
        let compData = JSON.parse(sessionStorage.getItem("teacherComp"));
        this.setState({
            majors: compData.majors,

        })
        this.cometoques(1, this.state.SproMajorid, this.state.SproCoursid)
    }

    ruData2(s_date) {
        var d = s_date;
        var date = new Date(d);
        var Y = date.getFullYear();
        var M = date.getMonth() + 1;
        if (M < 10) {
            M = "0" + M
        }
        var T = date.getDate();
        if (T < 10) {
            T = "0" + T
        }
        var S = date.getHours();
        if (S < 10) {
            S = "0" + S
        }
        var m = date.getMinutes();
        if (m < 10) {
            m = "0" + m
        }
        var ruData = Y + "-" + M + "-" + T + " " + S + ":" + m;
        return ruData;
    }

    cometoques(page, p, c) {
        var total = 10;
        $.llsajax({
            //  $.ajax({
            //  url:"http://10.103.123.49:8081/lls-web/examInationPaper/list",
            url: "examInationPaper/list",
            type: "post",
            data: {
                page: page,
                rows: total,
                //期末
                type: 0,
                courseid: c,
                majorid: p,
            },
            success: bodyquesData => {
                this.setState({
                    page: page,
                    bodyques: bodyquesData.list.rows,
                    pages: bodyquesData.list.total
                })

                if (bodyquesData.list.count == 0) {
                    this.setState({
                        spro_info: true,
                        spro_noinfos: "没有符合该条件的试卷"
                    })
                } else {
                    this.setState({
                        spro_info: false,
                        spro_noinfo: false
                    })
                }
                if (bodyquesData.list.total <= 1 && bodyquesData.list.count <= 10) {
                    this.setState({
                        spro_noinfo: true
                    })
                    //最后一页
                } else if (this.state.pages == page) {
                    this.setState({
                        spro_pagestate2: true,
                        spro_pagestate1: false
                    })
                }
                //首页
                else if (page == 1 && bodyquesData.list.total > 1) {
                    this.setState({
                        spro_pagestate1: true,
                        spro_pagestate2: false
                    })
                }
                //等于三页或以上当前页不是第一页也不是最后一页
                else {
                    this.setState({
                        spro_pagestate2: false,
                        spro_pagestate1: false
                    })
                }

            }
        })
    }

    closeprevs() {
        $(".spro_delete").css("display", "none");
    }

    showPre() { //这是点击上一页执行的函数
        if (this.state.page >= 2) {
            this.setState({
                page: --this.state.page,

            })
            this.cometoques(this.state.page, this.state.SproMajorid, this.state.SproCoursid);
        } else {
            return;
        }
    }

    showNext() { //这是点击下一页执行的函数
        if (this.state.pages == this.state.page) {
            return;
        } else {
            this.setState({
                page: ++this.state.page,
            })
            this.cometoques(this.state.page, this.state.SproMajorid, this.state.SproCoursid);
        }
    }

    heiheihei(a, minute, c, l) {
        sessionStorage.setItem("majorid", a)
        sessionStorage.setItem("examinationTime", minute)
        sessionStorage.setItem("courseid", c);
        sessionStorage.setItem("lessonid", l);
    }

    onDelete(ids, owners, whe) {

        if (whe == 1) {
            this.setState({
                idsto: ids + ""
            })
        }

        $(".spro_delete").css("display", "block");
        if (whe == 2) {
            $(".spro_delete").css("display", "none");
        }
        if (whe == 3) {
            $.llsajax({
                url: "examInationPaper/delPaper",
                type: "post",
                data: {
                    id: this.state.idsto,
                },
                success: bodyques => {
                    this.cometoques(this.state.page, "", "");
                }
            })
            $(".spro_delete").css("display", "none");
        }
    }

    //选择专业
    ChooseStatemajor(Flag) {

        if (Flag == "major") {
            if (this.state.UlClickStatemajor) {
                this.setState({
                    UlClickStatemajor: false
                })
            }
            else {
                this.setState({
                    UlClickStatemajor: true,
                })
            }
        }
        else {
            if (this.state.UlClickStateCou) {
                this.setState({
                    UlClickStateCou: false
                })
            }
            else {
                this.setState({
                    UlClickStateCou: true,
                })
            }
        }
    }

    handleTypeTabmajor(event) {

        if (event.target.getAttribute("data-flag") == "major") {
            this.setState({
                UlClickStatemajor: false,
                UlClickStateCou: false,
            })

            //处理e.target.value的值 同步setState 到伪select 框

            if (this.state.SproMajorid != event.target.title) {

                this.setState({
                    SproMajorname: event.target.title,
                    SproMajorid: event.target.getAttribute("data-majorid"),
                    SproCoursname: "全部课程",
                    SproCoursid: "0"

                })
                if (event.target.getAttribute("data-key") != "allM") {

                    //SproCourseData:this.state.majors[event.target.getAttribute("data-key")].
                    this.setState({
                        SproCourseData: this.state.majors[event.target.getAttribute("data-key")].courseList
                    })
                } else {
                    this.setState({
                        SproCourseData: [],

                    })
                }
                this.cometoques(1, event.target.getAttribute("data-majorid"), "")
            }
        } else {
            this.setState({
                UlClickStateCou: false
            })

            //处理e.target.value的值 同步setState 到伪select 框
            if (this.state.SproCoursname != event.target.title) {
                this.setState({
                    SproCoursname: event.target.title,
                    SproCoursid: event.target.getAttribute("data-courseid"),
                })

                this.cometoques(1, this.state.SproMajorid, event.target.getAttribute("data-courseid"));
            }
        }
    }

    limajor() {
        return this.state.majors.map((Sprovalue, key) => {
            return (
                <li key={key} data-key={key} data-majorid={Sprovalue.id} onClick={this.handleTypeTabmajor.bind(this)}
                    data-flag="major" title={Sprovalue.name}>{Sprovalue.name}</li>
            )
        })

    }

    liCou() {
        if (this.state.SproCourseData.length != 0) {
            return this.state.SproCourseData.map((Sprovalue, key) => {
                return (
                    <li key={key} data-key={key} data-courseid={Sprovalue.id}
                        onClick={this.handleTypeTabmajor.bind(this)} data-flag="Cou"
                        title={Sprovalue.name}>{Sprovalue.name}</li>
                )
            })
        }
        else {
            return false;
        }
    }

    Onceback() {
        sessionStorage.setItem("testpaperFlag", "true")
    }

    changeHandle(e) {
        //对输入内容进行判断 输入空格 替换成空字符串
        var str = e.target.value;
        this.setState({
            changeValue: str.replace(/\s/g, ''),
        })
    }

    _classNameFinal() {
        let classStr = '';
        switch (this.state.userJudge) {
            case 'T':
                classStr = "spro_titkec";
                break;
            case 'MM':
                classStr = "spro_titkec_diff_mm";
                break;
            default:
                classStr = "spro_titkec_diff";
        }
        return classStr
    }

    _classNameFinalTool() {
        let classStr = '';
        switch (this.state.userJudge) {
            case 'T':
                classStr = "spro_titcaoz";
                break;
            case 'MM':
                classStr = "spro_titcaoz_diff_mm";
                break;
            default:
                classStr = "spro_titcaoz_diff";
        }
        return classStr
    }

    Finallisthtmltitle(EXflag) {
        return (
            <div className="spro_thQuhead">

                <div className="spro_titxuh">
                    序号
                </div>
                <div className="spro_titmingc">
                    试卷名称
                </div>
                <div className="spro_titzhuany">
                    专业
                </div>
                <div className={this._classNameFinal()}>
                    课程
                </div>
                {/*<div className="spro_titbeiz">
                            备注
                        </div>*/}
                <div className={this._classNameFinalTool()}>
                    操作
                </div>
            </div>
        )
    }

    Finallisthtmlbody() {
        return (this.state.bodyques.map((todo, index) => {
            return <TestlistItem key={index} {...todo} index={index} {...this.props}
                onDelete={this.onDelete.bind(this)}
                heiheihei={this.heiheihei.bind(this)}
                page={this.state.page}
                userJudge={this.state.userJudge}
            />
        })
        )
    }

    finalEXAllclose() {
        if (this.state.UlClickStatemajor) {
            this.setState({
                UlClickStatemajor: false,
            })
        } else if (this.state.UlClickStateCou) {
            this.setState({
                UlClickStateCou: false,
            })
        } else {
            return false;
        }
    }

    render() {

        let UlClickStatemajor = this.state.UlClickStatemajor;
        let ulStylemajor = {
            display: UlClickStatemajor ? "block" : "none"
        }
        let spanStylemajor = {
            border: UlClickStatemajor ? "1px solid #1280fb" : ""
        }
        let UlClickStateCou = this.state.UlClickStateCou;
        let ulStyleCou = {
            display: UlClickStateCou ? "block" : "none",
            overflowY: this.state.SproCourseData.length > 9 ? "scroll" : "auto",
            height: this.state.SproCourseData.length > 9 ? "308px" : ""
        }
        let spanStyleCou = {
            border: UlClickStateCou ? "1px solid #1280fb" : ""
        }
        let forbid = {
            backgroundColor: "#d3d3d3",
            color: "#ffffff",
            borderColor: "#d3d3d3"
        }
        let starts = {
            backgroundColor: "#ffffff",
            color: "#323232",
            borderColor: "#d3d3d3"
        }
        let SproCoursname = this.state.SproCoursname;
        let Coursestate = {
            display: location.hash.indexOf("?Spro") != -1 ? "inline-block" : "none",
            textAlign: "left",
            width: "auto",
            marginRight: "20px"
        }

        let noCourseStyle = {
            position: "absolute",
            display: location.hash.indexOf("?Spro") != -1 ? "none" : "inline-block",
            left: this.state.AtestFlag || this.state.quizFlag == "quiz" ? "204px" : "188px",
            top: "-4px",
        }
        let Courseinfo = location.hash.indexOf("?Spro") != -1 ? Base64.decode(location.hash.split("?Spro=")[1].split("&")[0]) : "--"
        //显隐无数据
        let spro_info = {
            display: this.state.spro_info ? "none" : "block"
        }
        //显隐无数据提示
        let spro_noinfo = {
            display: this.state.spro_info ? "block" : "none"
        }
        // let spro_styleteapage = {
        //         display: this.state.spro_styleteapage ? "none" : "block"
        // }
        //显隐分页
        var spro_noinfos = {
            visibility: !this.state.spro_noinfo ? "visible" : "hidden"
        }
        let forbidcls = this.state.page == 1 ? forbid : starts;
        // let listlen = this.state.bodyexams.length < 10 ? forbid : starts;
        let listlens = this.state.page == this.state.pages ? forbid : starts;
        let styles = {
            background: "#fdfffe"
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
        let showUpload = {
            display: sessionStorage.getItem('userJudge') == 'MM' ? 'block' : 'none'
        }
        return (
            <div className="spro_questionBody" onClick={this.finalEXAllclose.bind(this)}>
                <div className="spro_thQuBody">
                    <div className="spro_questitle">
                        <span className="spro_cubiud"></span>
                        <span className="spro_information">{this.state.defaultInfotitle}</span>
                        {/* <div><Link className="commonButton button" to={{pathname:"/createTestPaper",query:{id:""}}} onMouseDown={this.Onceback.bind(this)}>创建试卷</Link></div> */}
                        <a href="javascript:;" style={showUpload} className="h-addexamMany1_diff button commonButton" onClick={this.importMany.bind(this)}><i className="iconfont icon-daoruchengji"></i>导入试卷</a>
                        {
                            this.state.userJudge == "MM" ?
                                <Link to={{ pathname: "/createStagePaper", query: { id: '' } }} className="button commonButton h-addexamMany3"><i className="iconfont icon-tianjiadaoshijuan"></i>创建阶段测试试卷</Link>
                                :
                                null
                        }
                    </div>

                    {/*这是下拉框的html*/}
                    <div className="spro_selebody_final">
                        <div className="spro_thselection spro_select_finalExam">
                            <div className="sprosatPublicleftselect_final sele_fino">专业 :
                                <span onClick={this.ChooseStatemajor.bind(this, "major")}
                                    style={spanStylemajor}>{this.state.SproMajorname}</span>
                                <ul style={ulStylemajor} className="SprothQuestion">
                                    <li title="全部专业" data-key="allM" data-flag="major" data-majorid=""
                                        onClick={this.handleTypeTabmajor.bind(this)}>全部专业
                                    </li>
                                    {this.limajor()}
                                </ul>
                            </div>
                            <div className="sprosatPublicleftselect_final sele_fint">课程 :
                                <span onClick={this.ChooseStatemajor.bind(this, "Cou")}
                                    style={spanStyleCou}>{this.state.SproCoursname}</span>
                                <ul style={ulStyleCou} className="SprothQuestion">
                                    <li title="全部课程" data-key="allC" data-flag="Cou" data-courseid=""
                                        onClick={this.handleTypeTabmajor.bind(this)}>全部课程
                                    </li>
                                    {this.liCou()}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*这是列表页的html*/}
                    {this.Finallisthtmltitle()}
                    <div className="sproteastore-minheight" style={spro_info}>
                        {this.Finallisthtmlbody()}
                    </div>
                    <div style={spro_noinfo} className="spro_store">
                        <div className="spro_liststore">
                            <div className="spro_storeimage">
                                <i className="spro_storeimagespan">
                                    {this.state.spro_noinfos}
                                </i>
                            </div>
                        </div>
                    </div>
                    <div style={spro_noinfos} className="spro_page">
                        <div className="spro_pageinner">
                            <div className="exspro_styleteadivfinal">
                                <span className="exspro_styletealistspanfinal">共<i style={styleI}>{this.state.pages}</i>页</span>
                                <span className="exspro_styletealistspanfinal">第<b className="exspro_styletealistbfinal"
                                    style={styleS}>{this.state.page}</b>页</span>
                            </div>
                            <button className={this.state.spro_pagestate2 ? "forbid" : "starts"}
                                onClick={this.showNext.bind(this)}>下一页
                            </button>
                            <button className={this.state.spro_pagestate1 ? "forbid" : "starts"}
                                onClick={this.showPre.bind(this)}>上一页
                            </button>
                        </div>
                    </div>

                </div>
                <div className="spro_delete">
                    <div className="spro_deletes">
                        <div className="spro_preheads">
                            <span className="fl spro_deletprev1">删除</span>
                            <span className="fr spro_deletprevs iconfont icon-guanbi"
                                onClick={this.closeprevs.bind(this)}></span>

                        </div>
                        <p className="spro_deletitle"><span>确认删除该试卷吗？</span><span>删除后考试中的试卷也将自动删除</span></p>
                        <div className="spro_prevbtns">
                            <button className="spro_prevbtns1" onClick={this.onDelete.bind(this, "for", "for", 2)}>取消
                            </button>
                            <button className="spro_prevbtns2" onClick={this.onDelete.bind(this, "for", "for", 3)}>确定
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    importMany() {
        hashHistory.push({
            pathname: '/uploadpage',
            query: {
                type: 'test'
            }
        })
    }
}
