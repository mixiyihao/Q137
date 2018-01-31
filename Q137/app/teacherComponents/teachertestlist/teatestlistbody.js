import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import styles from './teachertestlistbodycss.js';
import './spro_teatestcard.css';
import {
    Link,
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect,
    browserHistory
} from 'react-router';
import TestcardItem from './TestcardItem.js'
export default class teatestlistbody extends React.Component {
    constructor() {
        super();
        this.state = {
            Testclass: [],
            // page: sessionStorage.getItem("thispages") ? sessionStorage.getItem("thispages") : 1,
            page:1,
            Testcards: [],
            pages: [],
            type: null,
            classid: null,
            sty: false,
            idsto: [],
            exam_id: [],
            spro_styleteapage: false,
            spro_pagestate2: false,
            spro_pagestate1: false,
            spro_noinfo: false,
            paper_name: [],
        };
        $.llsajax({
            url: "exam/listclass",
            type: 'POST',
            success: data => {
                this.setState({
                    Testclass: data.list
                })
            }
        })
    }
    Option() {
        return this.state.Testclass.map((value, key) => {
            return (
                <option key={key} value={value.class_id}>&nbsp;&nbsp;{value.class_name}</option>
            )
        })
    }
    count() {
        let winWidth = 0;
        let winHeight = 0;
        let obj = {}
        if (window.innerWidth)
            winWidth = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            winWidth = document.body.clientWidth;
        //获取窗口高度
        if (window.innerHeight)
            winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
        return obj = {
            Width: winWidth,
            Height: winHeight
        }
    }
    showPre() { //这是点击上一页执行的函数
        if (this.state.page > 2) {
            this.setState({
                page: --this.state.page,
                Testcards: this.state.Testcards
            })
            this.cometoques(this.state.page);
        } else if (this.state.page == 2) {
            this.setState({
                page: --this.state.page,
                Testcards: this.state.Testcards
            })
            this.cometoques(this.state.page);
        } else {
            // this.componentDidMount("zero");
        }
    }
    showNext() { //这是点击下一页执行的函数
        if (this.state.pages - 1 == this.state.page) {
            this.setState({
                page: ++this.state.page,
                Testcards: this.state.Testcards
            })
            this.cometoques(this.state.page);
        } else if (this.state.pages == this.state.page) {
            // this.componentDidMount("one");
        } else {
            this.setState({
                page: ++this.state.page,
                Testcards: this.state.Testcards
            })
            this.cometoques(this.state.page);
        }
    }
    compare(propertyName) {
        return function(object2, object1) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            if (value2 < value1) {
                return -1;
            } else if (value2 > value1) {
                return 1;
            } else {
                return 0;
            }
        }
    }
    paixu(obj) {
        return obj.sort(this.compare(obj.s_date / 1000));
    }

    handleSubmit(page, classid, type, paper_name) {
        $.llsajax({
            url: "exam/list",
            type: "post",
            data: {
                page: page,
                classid: classid,
                type: type,
                keyword: paper_name,
            },
            success: Teatestcards => {

                this.setState({
                    Testcards: this.paixu(Teatestcards.list.rows),
                    page: 1,
                    //总页数
                    pages: Teatestcards.list.total
                })
                if (Teatestcards.list.count == 0) {
                    this.setState({
                        spro_noinfo: true,
                        spro_styleteapage: true
                    })
                } else {
                    this.setState({
                        spro_noinfo: false
                    })
                }
                //页数为1 数目不足9
                if (Teatestcards.list.total == 1 && Teatestcards.list.count <= 9) {

                    this.setState({
                        spro_styleteapage: true
                    })
                } //最后一页
                else if (this.state.pages == this.state.page) {

                    this.setState({
                        spro_pagestate2: true,
                        spro_styleteapage: false
                    })
                }
                //首页
                else if (this.state.page == 1 && Teatestcards.list.total > 1) {

                    this.setState({
                        spro_pagestate1: true,
                        spro_pagestate2: false,
                        spro_styleteapage: false
                    })
                }
                //等于三页或以上当前页不是第一页也不是最后一页
                else {
                   
                    this.setState({

                        spro_pagestate2: false,
                        spro_pagestate1: false,
                    })
                }
            }
        })

    }


    cometoques(page) {
        $.llsajax({
            url: "exam/list",
            type: 'POST',
            data: {
                page: page,
                classid: this.state.classid,
                type: this.state.type,
                keyword: this.state.paper_name,
            },
            success: data2 => {
                this.setState({
                    Testcards: this.paixu(data2.list.rows),
                    pages: data2.list.total
                })
                if (this.state.Testcards.length == 0) {
                    var obj = this.count();
                    $(".spro_teatestpages").css("display", "none");
                    $(".spro_testlistTitle").css("display", "none");
                    $(".spro_list").css("display", "block");
                    $(".spro_list").css("height", "500px");
                    $("html").css("overflow", "auto")
                } else {
                    $("html").css("overflow", "auto")
                    $(".spro_list").css("display", "none");
                    $(".spro_teatestpages").css("display", "block");
                    $(".spro_testlistTitle").css("display", "block");
                }
                //页数为1 数目不足9
                if (data2.list.total <= 1 && data2.list.count <= 9) {
                    this.setState({
                            spro_styleteapage: true
                        })
                        //最后一页
                } else if (this.state.pages == this.state.page) {
                    this.setState({
                        spro_pagestate2: true,
                        spro_pagestate1: false
                    })
                }
                //首页
                else if (this.state.page == 1 && data2.list.total > 1) {
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
    componentWillMount() {
        this.cometoques(this.state.page);
    }
    componentDidMount(a) {
       
        $(".spro_teliTitle1").mouseenter(function() {
            $(this).css("border", "1px solid #4ac0e0");
        })
        $(".spro_teliTitle1").mouseleave(function() {
            $(this).css("border", "1px solid #b0b0b0");
        })
        $(".spro_teliTitle2").mouseenter(function() {
            $(this).css("border", "1px solid #4ac0e0");
        })
        $(".spro_teliTitle2").mouseleave(function() {
            $(this).css("border", "1px solid #b0b0b0");
        })
    }
    papapa(e) {
        this.setState({
            classid: e.target.value
        })
        this.handleSubmit(1, e.target.value, this.state.type, this.state.paper_name);
    }
    bibibi(e) {
        this.setState({
            type: e.target.value
        })
        this.handleSubmit(1, this.state.classid, e.target.value, this.state.paper_name);
    }
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

                    this.cometoques(this.state.page);
                }
            })
            $(".spro_delete").css("display", "none");
        }
    }
    spro_publishExam(flag) {
        var obj = this.count();
        if (flag == 1) {
            $(".spro_publishExam").css("display", "none");
            $(".spro_publishExamX").css("display", "none");
            $("html").css("overflow-y", "auto")
        } else if (flag == 0) {
            $(".spro_publishExam").css("display", "block");
            $(".spro_publishExam").css("height", obj.Height);
            $(".spro_publishExamX").css("display", "block");
            $("html").css("overflow-y", "visible")
        } else if (flag == 3) {
            // $("html").css("overflow","auto");visible
            $("html").css("overflow", "visible");
        } else {
            $("html").css("overflow", "auto");
        }
    }
    count() {
        let winWidth = 0;
        let winHeight = 0;
        let obj = {}
        if (window.innerWidth)
            winWidth = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            winWidth = document.body.clientWidth;
        //获取窗口高度
        if (window.innerHeight)
            winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
        return obj = {
            Width: winWidth,
            Height: winHeight
        }
    }
    onpageChange(majorname, coursename, lessonname) {
        // sessionStorage.setItem("thispages", thispages);
        sessionStorage.setItem("majorName", majorname);
        sessionStorage.setItem("courseName", coursename);
        sessionStorage.setItem("lessonName", lessonname);
    }
    handleChangeKeyword(e) {
        this.setState({
            paper_name: e.target.value
        })
        this.handleSubmit(1, this.state.classid,this.state.type,e.target.value);
    }
    render() {
        let props = {
            Testcards: this.state.Testcards,
            page: this.state.page,
        }
        let spro_styleteapage = {
            display: this.state.spro_styleteapage ? "none" : "block"
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
        let spro_noinfo = {
            display: this.state.spro_noinfo ? "block" : "none"
        }
        let styleI = {
            display:"inline-block",
            width:"60px",
            textAlign:"center",
        }
        return (
            <div>
                <div style={styles.spro_body}>
                    <div style={styles.spro_exam1200auto} className="spro_exam1200auto">
                        <div>
                            <span style={styles.spro_examResspan}></span>
                            <h1 style={styles.spro_examResHeaderh1}>考试管理</h1>
                            <Link className="commonButton button" style={styles.spro_examResback} onClick={this.spro_publishExam.bind(this, 0)}>发布试卷</Link>
                        </div>
                        <div style={styles.spro_testlistTitle} className="spro_testlistTitle">
                            <div style={styles.spro_teliTitle1}>班级:
                                <select onChange={this.papapa.bind(this)} className="spro_teliTitle1">
                                    <option value="">&nbsp;&nbsp;请选择</option>
                                    {this.Option()}
                                </select>
                            </div>
                            <div style={styles.spro_teliTitle2}>考试类型:
                                <select onChange={this.bibibi.bind(this)} className="spro_teliTitle2" >
                                    <option value="">&nbsp;&nbsp;全部</option>
                                    <option value="1">&nbsp;&nbsp;期末考试</option>
                                    <option value="0">&nbsp;&nbsp;随堂测验</option>
                                </select>
                            </div>
                            <div style={styles.spro_teliTitle3}>搜索试卷:
                                <input type="text" placeholder="关键字搜索" style={styles.spro_Title3Input} id="woc" onChange={this.handleChangeKeyword.bind(this)} maxLength="10" />
                                <button style={styles.spro_Title3search} onClick={this.handleSubmit.bind(this, 1, this.state.classid, this.state.type, this.state.paper_name)}><i style={styles.spro_Title3searchi}>搜索</i></button>
                            </div>
                        </div>

                        <div style={styles.spro_teatestcards} className="spro_teatestcards">
                          <div className="spro_list">
                              <div className="spro_listimage">
                                  <i className="spro_pppimagespan">
                                      当前无考试 可点击右上角进行发布
                                  </i>
                              </div>
                          </div>
                            {
                                this.state.Testcards.map((todo, index) => {
                                    return <TestcardItem key={index} {...todo} index={index} {...this.props}
                                        onDelete={this.onDelete.bind(this)}
                                        onpageChange={this.onpageChange.bind(this)}
                                    />
                                })
                            }
                        </div>
                        <div className="spro_teatestpages" style={spro_styleteapage}>
                            <div style={styles.spro_styleteadiv}>
                                <span style={styles.spro_styletealistspan}>共<i style={styleI}>{this.state.pages}</i>页</span>
                                <span style={styles.spro_styletealistspan}>第<b style={styles.spro_styletealistb}>{this.state.page}</b>页</span>
                            </div>
                            <button className={this.state.spro_pagestate2 ? "forbid" : "starts"} onClick={this.showNext.bind(this)}>下一页</button>
                            <button className={this.state.spro_pagestate1 ? "forbid" : "starts"} onClick={this.showPre.bind(this)}>上一页</button>

                        </div>
                         <div style={spro_noinfo} className="spro_ppp0">
                         <div className="spro_listppp">
                        <div className="spro_pppimage1">
                            <i className="spro_pppimagespan1">
                                没有符合该条件的考试
                            </i>
                        </div>
                    </div>
                </div>



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
                <div className="spro_publishExam">

                </div>
                <div className="spro_publishExamX">
                    <div className="spro_publishExamXtitle">
                        <span className="spro_publishExamXspan1">发布试卷</span>
                        <span className="iconfont icon-guanbi spro_publishExamXspanX" onClick={this.spro_publishExam.bind(this, 1)}></span>
                    </div>
                    <Link className="spro_publishExamcardcreateexam" to={"/createTestPaper?id="} onClick={this.spro_publishExam.bind(this, 2)}>NEW
                  <span className="spro_publishExamcardspan0">创建试卷</span>
                    </Link>
                    <Link className="spro_publishExamcardchooseexam" to={"/teacherteststore"} onClick={this.spro_publishExam.bind(this, 3)}>OLD
                  <span className="spro_publishExamcardspan1">选择已有试卷</span>
                    </Link>
                </div>


            </div>
        )
    }
}
