import React from 'react';
import $ from 'jquery';
import HeadMasterTitle from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Title from '../../teacherComponents/teacherPublic/teacherComp.js';
import Footer from '../../components/public/footer/footer.js';
import ListKid from '../../teacherComponents/tquizzpubliclist/tquizzpubliclistkid.js';
import '../../teacherComponents/tfinalpubliclist/tfinalpubliclist.css';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';

export default class teacherquizzlist extends React.Component {
    constructor() {
        super();
        this.state = {
            //专业数据
            majors: [],
            //课程数据
            SproCourseData: [],
            defaultInfotitle: "小测验考试管理",
            sproVimajor: "全部专业",
            majorid: "-1",
            Sprocoursename: "全部课程",
            courseid: "-1",
            Spropigainame: "全部",
            type: "-1",
            examname: "",
            mockInitData: [],
            listconfig: [
                "4", "20", "18", "6", "12", "5", "6", "6", "23"
            ],
            idsto: [],
            pages: 1,
            page: 1,
            spro_pagestate2: false,
            spro_pagestate1: true,
            spro_noinfo: false,
            userJudge: sessionStorage.getItem("userJudge")
        }
    }

    AllClose() {
        //console.log(this.state.UlClickStatepigai);
        if (this.state.UlClickStatepigai == true) {
            this.setState({
                UlClickStatepigai: false
            })
        }
        else if (this.state.UlClickStatemajor == true) {
            this.setState({
                UlClickStatemajor: false
            })
        }
        else if (this.state.UlClickStateCou == true) {
            this.setState({
                UlClickStateCou: false
            })
        }
        else {
            return false;
        }
    }

    ChooseStatepigai() {
        if (this.state.UlClickStatepigai) {
            this.setState({
                UlClickStatepigai: false
            })
        }
        else {
            this.setState({
                UlClickStatepigai: true,
            })
        }
    }

    handleTypeTabpigai(e) {
        //console.log(e.target.getAttribute("data-key"));
        if (e.target.title != this.state.Spropigainame) {
            this.setState({
                UlClickStatepigai: false,
                Spropigainame: e.target.title,
                type: e.target.getAttribute("data-key"),
            })
            this.Sprofinallistajax(this.state.majorid, this.state.courseid,
                e.target.getAttribute("data-key"), this.state.examname, 1);
        } else {
            this.setState({
                UlClickStatepigai: false
            })
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

//
    handleTypeTabmajor(event) {
        if (event.target.getAttribute("data-flag") == "major") {
            this.setState({
                UlClickStatemajor: false,
                UlClickStateCou: false,
                //处理e.target.value的值 同步setState 到伪select 框
                sproVimajor: event.target.title,
                majorid: event.target.getAttribute("data-id"),
                Sprocoursename: "全部课程",
                courseid: -1
            })
            if (event.target.getAttribute("data-key") != "allM") {
                //SproCourseData:this.state.majors[event.target.getAttribute("data-key")].
                this.setState({
                    SproCourseData: this.state.majors[event.target.getAttribute("data-key")].courseList
                })
                this.Sprofinallistajax(event.target.getAttribute("data-id"), this.state.courseid, this.state.type, this.state.examname, 1);
            } else {
                this.setState({
                    SproCourseData: [],

                })
                this.Sprofinallistajax(event.target.getAttribute("data-id"), -1, this.state.type, this.state.examname, 1);
            }
            //请求major数据
            //console.log(event.target.title);


        } else {
            this.setState({
                UlClickStateCou: false,
                //处理e.target.value的值 同步setState 到伪select 框

                Sprocoursename: event.target.title,
                courseid: event.target.getAttribute("data-id"),
            })
            //请求course数据
            this.Sprofinallistajax(this.state.majorid, event.target.getAttribute("data-id"), this.state.type, this.state.examname, 1);

        }
    }

    limajor() {
        return this.state.majors.map((Sprovalue, key) => {
            return (
                <li key={key} data-key={key} onClick={this.handleTypeTabmajor.bind(this)} data-flag="major"
                    data-id={Sprovalue.id} title={Sprovalue.name}>{Sprovalue.name}</li>
            )
        })

    }

    liCou() {
        if (this.state.SproCourseData.length != 0) {
            return this.state.SproCourseData.map((Sprovalue, key) => {
                return (
                    <li key={key} data-key={key} onClick={this.handleTypeTabmajor.bind(this)} data-flag="Cou"
                        data-id={Sprovalue.id} title={Sprovalue.name}>{Sprovalue.name}</li>
                )
            })
        }
        else {
            return false;
        }
    }

    Sprofinallistajax(majorid, courseid, type, examname, page) {

        $.llsajax({
            url: "exam/list",
            type: "POST",
            data: {
                majorid: majorid != "-1" ? majorid : "",
                courseid: courseid != "-1" ? courseid : "",
                type: type != "-1" ? type : "",
                examname: examname,
                page: page,
                flag: "2"
            },
            success: SerData => {
                this.setState({
                    mockInitData: SerData.list.rows,
                    pages: SerData.list.total,
                    page: SerData.list.page
                })
                if (SerData.list.total <= 1 && SerData.list.count <= 10) {
                    this.setState({
                        spro_noinfo: true
                    })
                    //最后一页
                } else if (this.state.pages == page) {
                    this.setState({
                        spro_pagestate2: true,
                        spro_pagestate1: false,
                        spro_noinfo: false,
                    })
                }
                //首页
                else if (SerData.list.page == 1 && SerData.list.total > 1) {
                    this.setState({
                        spro_pagestate1: true,
                        spro_pagestate2: false,
                        spro_noinfo: false,
                    })
                }
                //等于三页或以上当前页不是第一页也不是最后一页
                else {
                    this.setState({
                        spro_pagestate2: false,
                        spro_pagestate1: false,
                        spro_noinfo: false,
                    })
                }
            }
        })
    }

    //专业和课程获取数据
    Twotabpublic() {
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
        //console.log(compData.majors);
    }

    //初始化数据
    InitData() {
        let mockData = this.state.mockData;
        $.llsajax({
            url: "exam/list",
            type: "POST",
            data: {
                majorid: "",
                courseid: "",
                type: "",
                examname: "",
                classids: "",
                page: 1,
                flag: "2",
            },
            success: InitData => {
                this.setState({
                    mockInitData: InitData.list.rows,
                    pages: InitData.list.total,
                    page: InitData.list.page
                })
                if (InitData.list.total <= 1 && InitData.list.count <= 10) {
                    this.setState({
                        spro_noinfo: true
                    })
                    //最后一页
                } else if (InitData.list.total == InitData.list.page) {
                    this.setState({
                        spro_pagestate2: true,
                        spro_pagestate1: false,
                        spro_noinfo: false,

                    })
                }
                //首页
                else if (InitData.list.page == 1 && InitData.list.total > 1) {
                    this.setState({
                        spro_pagestate1: true,
                        spro_pagestate2: false,
                        spro_noinfo: false,
                    })
                }
                //等于三页或以上当前页不是第一页也不是最后一页
                else {
                    this.setState({
                        spro_pagestate2: false,
                        spro_noinfo: false,

                    })
                }

            }
        })
    }

    componentWillMount() {
        this.Twotabpublic();
        this.InitData();
    }

    onShowMajor() {
    }

    onCourseShow() {
    }

    onLessonShow() {
    }

    componentDidMount() {
        $("html").css("overflow-y", "auto");
    }

    Changeexamname(e) {
        //console.log(e.target.value);
        if (e.target.value != "") {
            this.setState({
                examname: e.target.value,
            })
        } else {
            this.setState({
                examname: "",
            })
        }
    }

    Clickexamname() {
        this.Sprofinallistajax(this.state.majorid, this.state.courseid, this.state.type, this.state.examname, 1)
    }

    finallisthead() {
        const listConfig = this.state.listconfig;
        return (
            <ul>
                <li style={{width: listConfig[0] + "%"}}>序号</li>
                <li style={{width: listConfig[1] + "%"}}>考试名称</li>
                <li style={{width: listConfig[2] + "%"}}>班级</li>
                <li style={{width: listConfig[3] + "%"}}>参考人数</li>
                <li style={{width: listConfig[4] + "%"}}>开考时间</li>
                <li style={{width: listConfig[5] + "%"}}>时长</li>
                <li style={{width: listConfig[6] + "%"}}>考试状态</li>
                <li style={{width: listConfig[7] + "%"}}>批改状态</li>
                <li style={{width: listConfig[8] + "%"}} className="finallistcaozuo">操作

                </li>
            </ul>
        )
    }

    showNext() {
        if (this.state.pages == this.state.page) {
            return false;
        } else {

            this.setState({
                page: ++this.state.page,
            })
            this.Sprofinallistajax(this.state.majorid, this.state.courseid, this.state.type, this.setState.examname, this.state.page);

        }

    }

    showPre() {
        if (this.state.page >= 2) {
            this.setState({
                page: --this.state.page,

            })
            this.Sprofinallistajax(this.state.majorid, this.state.courseid, this.state.type, this.setState.examname, this.state.page);
        } else {
            return false;
        }

    }
    // 删除方法
    closeprevs() {
        $(".spro_delete").css("display", "none");
    }
    onDelete(ids, whe) {
        
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
                        url: "exam/delExam",
                        type: "post",
                        data: {
                            examid: this.state.idsto,
                        },
                        success: bodyques => {
        
                            this.InitData()
                        }
                    })
                    $(".spro_delete").css("display", "none");
                }
            }
    backto() {
        history.go(-1);
    }

    render() {
        // 公用二级专业课程分割线
        let UlClickStatemajor = this.state.UlClickStatemajor;
        let ulStylemajor = {
            display: UlClickStatemajor ? "block" : "none"
        }
        let spanStylemajor = {
            border: UlClickStatemajor ? "1px solid #4ac0e0" : ""
        }
        let UlClickStateCou = this.state.UlClickStateCou;
        let ulStyleCou = {
            display: UlClickStateCou ? "block" : "none",
            height: this.state.SproCourseData.length > 9 ? "308px" : "",
            overflowY: this.state.SproCourseData.length > 9 ? "scroll" : "auto",
        }
        let spanStyleCou = {
            border: UlClickStateCou ? "1px solid #4ac0e0" : ""
        }
        // **********************
        let UlClickStatepigai = this.state.UlClickStatepigai;
        let ulStylepigai = {
            display: UlClickStatepigai ? "block" : "none"
        }
        let spanStylepigai = {
            border: UlClickStatepigai ? "1px solid #4ac0e0" : ""
        }
        //console.log(this.state.mockInitData);
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
        let spro_noinfoStyle = {
            display: this.state.spro_noinfo ? "none" : "block"
        }
        let message = {
            display: this.state.mockInitData.length == 0 ? "block" : "none"
        }
        let styles = {
            title: {
                backgroundColor: "#6cc4ce",
                backgroundImage: "linear-gradient(60deg, #6cc4ce, #65f1ce)",
            }
        };
        return (
            <div>
                <Title majors={this.state.majors} onShowMajor={this.onShowMajor.bind(this)}
                       onCourseShow={this.onCourseShow.bind(this)} onLessonShow={this.onLessonShow.bind(this)}
                />
                <HeadMasterTitle
                    style={styles.title}
                    title={"考试管理"}
                    msg={"贴合知识点 自动判卷 多维度统计"}
                />
                <div className="spro_questionBody" onClick={this.AllClose.bind(this)}>
                    <div className="spro_thQuBody">
                        <div className="spro_questitle">
                            <span className="spro_cubiud"></span><span
                            className="spro_information">{this.state.defaultInfotitle}</span>
                            {/* <a className="spro_publicback" onClick={this.backto.bind(this)} >返回
                            <i className="iconfont icon-back Sproiconback"></i>
                            </a> */}
                        </div>
                        <div className="finallisthead">
                            <div className="flkid">
                                <div className="sprosatPublicleftselect flkidinnerdivone">所属专业 :
                                    <span onClick={this.ChooseStatemajor.bind(this, "major")}
                                          style={spanStylemajor}>{this.state.sproVimajor}</span>
                                    <ul style={ulStylemajor} className="SprothQuestion Sprogfinalul">
                                        <li title="全部专业" data-key="allM" data-flag="major"
                                            onClick={this.handleTypeTabmajor.bind(this)}>全部专业
                                        </li>
                                        {this.limajor()}
                                    </ul>
                                </div>
                                <div className="sprosatPublicleftselect flkidinnerdivtwo">所属课程 :
                                    <span onClick={this.ChooseStatemajor.bind(this, "Cou")}
                                          style={spanStyleCou}>{this.state.Sprocoursename}</span>
                                    <ul style={ulStyleCou} className="SprothQuestion Sprogfinalul">
                                        <li title="全部课程" data-key="allC" data-flag="Cou"
                                            onClick={this.handleTypeTabmajor.bind(this)}>全部课程
                                        </li>
                                        {this.liCou()}
                                    </ul>
                                </div>
                                <div className="sprosatPublicleftselect flkidinnerdivthr">批改状态 :
                                    <span onClick={this.ChooseStatepigai.bind(this)}
                                          style={spanStylepigai}>{this.state.Spropigainame}</span>
                                    <ul style={ulStylepigai} className="SprothQuestion">
                                        <li title="全部" data-key="-1" data-flag="pigai"
                                            onClick={this.handleTypeTabpigai.bind(this)}>全部
                                        </li>
                                        <li title="未批改" data-key="0" data-flag="pigai"
                                            onClick={this.handleTypeTabpigai.bind(this)}>未批改
                                        </li>
                                        <li title="已批改" data-key="1" data-flag="pigai"
                                            onClick={this.handleTypeTabpigai.bind(this)}>已批改
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flkid ">
                                <div className="flkidinner_ser">搜索考试 :
                                    <input onChange={this.Changeexamname.bind(this)}
                                    placeholder="按考试名称进行检索"/><span
                                        onClick={this.Clickexamname.bind(this)}>搜索</span>
                                </div>
                            </div>
                            <div className="flkid flkidthr">
                                {this.finallisthead()}
                            </div>
                        </div>
                        <div className="finallistBody">
                            {
                                this.state.mockInitData.map((Svalue, Skey) => {
                                    return (
                                        <ListKid key={Skey} Skey={Skey} {...Svalue} listconfig={this.state.listconfig}
                                                 page={this.state.page}
                                                 userJudge={this.state.userJudge}
                                                 onDelete={this.onDelete.bind(this)}/>
                                    )
                                })
                            }
                            <p style={message} className="spro-finallistP">
                                <span className="spro-nomessageStyle dib"></span>
                                暂无测验考试信息
                            </p>
                        </div>
                        <div className="spro_page" style={spro_noinfoStyle}>
                            <div className="spro_pageinner finallistpageStyle">
                                <div className="exspro_styleteadivfinal">
                                    <span className="exspro_styletealistspanfinal">共<i
                                        style={styleI}>{this.state.pages}</i>页</span>
                                    <span className="exspro_styletealistspanfinal">第<b
                                        className="exspro_styletealistbfinal"
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
                        <div className="spro_delete">
                        <div className="spro_deletes">
                            <div className="spro_preheads">
                                <span className="fl spro_deletprev1">删除</span>
                                <span className="fr spro_deletprevs iconfont icon-guanbi" onClick={this.closeprevs.bind(this)}></span>

                            </div>
                            <p className="spro_deletitle"><span>确认删除该考试吗？</span><span>删除后学生端考试也将自动删除</span></p>
                            <div className="spro_prevbtns">
                            <button className="spro_prevbtns1" onClick={this.onDelete.bind(this, this.state.idsto, 2)}>取消</button>
                            <button className="spro_prevbtns2" onClick={this.onDelete.bind(this, this.state.idsto, 3)}>确定</button>
                            </div>
                         </div>
                    </div>
                    </div> 
                </div>
                {
                    sessionStorage.getItem("userJudge") == "S" ? null : <TeacherWork/>
                }
                <Footer/>
            </div>
        );
    }
}
