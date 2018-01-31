/**
 * Created by heshuai on 2017/2/21.
 */


import React from 'react';
import './styleTeacherQuestion.css';
import $ from 'jquery';
import { Link } from 'react-router';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import CascadingMenu from '../cascadingMenu/cascadingMenu.js'
export default class teacherComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            bodyques: [],
            // page: 1,
            pages: [],
            quesbdid: [],
            sendObj: [],
            cousele1: [], // 这些是下拉加载框用的
            cousele2: [],
            cousele3: [],
            cousele4: [],
            cousele5: [],
            cousele6: 0,
            idsto: [], // 这个是发送数据用的id
            ownersto: [], // 这是发送用的公有私有数据，暂时不用
            boduque: [],  //这是测试预览假数据用的
            bodylevel: [], //这是题目的难易度
            bodytype: [],
            discertion: [], //这是判断下一页数据是否要变灰的
            bodyqueId: [], //这是获取数据拿到列表所有项的值
            bodytoId: [], //这是点击预览时要发送过去的数据
            // bodyqueIds : [], //这是为了后面为了删除时又添加数据的值
        }
    }
    componentWillMount() {
        // //console.log(this.props)
        // 判断session中是否有数据，没有则添加
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
        // this.cometoques(this.state.page);
       
    }
    sendbtn() {  //这是点击提交下拉选择的函数
        if (this.state.cousele1 == "" && this.state.cousele2 == "" && this.state.cousele3 == "" && this.state.cousele4 == "" && this.state.cousele5 == "" && this.state.cousele6 == 0) {

        } else {
            $('.h-thQutitle1 input').prop('checked', false);
            $('.h-thQutitbd1 input').prop('checked', false);
            this.state.bodyqueId = [];
            this.state.bodyqueOwner = [];
        }
        this.state.page = 1;
        this.cometoques(this.state.page, this.state.cousele1, this.state.cousele2, this.state.cousele3, this.state.cousele4, this.state.cousele5, this.state.cousele6);

    }
    cometoques(pages, majorid, courseId, lessonId, type, level, owner) { //这是页面加载需要获取列表所有数据的js

        if (owner == undefined) {
            owner = 0
        }
        $.llsajax({
            url: "questionBank/findByPageQuestionBank",
            type: "post",
            data: {
                page: pages,
                rows: 10,
                majorId: majorid,
                courseId: lessonId,
                lessonId: courseId,
                type: type,
                level: level,
                owner: owner
            },
            success: bodyques => {
                this.setState({
                    bodyques: bodyques.date.rows,
                    // bodyqueIds : bodyques.date.rows,
                    pages: bodyques.date.total
                })
                // sessionStorage.setItem("bodyques", JSON.stringify(bodyques));
                if (this.state.bodyques < 10) {
                    this.setState({
                        discertion: "off"
                    })
                } else {
                    this.setState({
                        discertion: "too"
                    })
                }

            }
        })
    }
    theadcheck(e) { //这是点击执行全部选中还是不选中的js

        let checked = e.target.checked;
        $('.h-thQutitbd1 input').prop('checked', checked);
        var bodyque = this.state.bodyques;
        var bodyqueId = [];

        for (var i = 0; i < bodyque.length; i++) {
            for (var key in bodyque[i]) {
                bodyqueId.push(bodyque[i].id + "");
            }
        }
        var bodyqueIds = this.unique3(bodyqueId);
        if (checked == false) {
            bodyqueIds = [];
        }
        this.setState({
            bodyqueId: bodyqueIds
        })

    }
    thbodycheck(e) { //这是点击添加的序号列表
        let checkeds = e.target.checked;
        let thbodyId = e.target.id; // 获取的是点击那一个的ID
        // let bodyque = this.state.bodyqueId; //这是第一份添加的数据
        // let boduques = JSON.parse(sessionStorage.getItem("bodyques")).date.rows; //这是获取第二份删除后添加的数据
        if (checkeds == true) {
            // for (var i=0 ; i<boduques.length; i++) {
            //     if (boduques[i].id == thbodyId){
            //         // bodyque.splice(i, 1);
            //         // this.state.bodyqueId.push(boduques[i]);
            //     }
            // }
            this.state.bodyqueId.push(thbodyId);
        }

        if (checkeds == false) {
            this.removeByValue(this.state.bodyqueId, thbodyId);
            // for (var i=0 ; i<this.state.bodyqueId.length; i++) {
            //     if (this.state.bodyqueId[i].id == thbodyId){
            //         this.state.bodyqueId.splice(i, 1);
            //     }
            // }
            // this.removeByValue(this.state.bodyqueId,thbodyId);
            // this.cometoques(this.state.page, this.state.cousele1, this.state.cousele2, this.state.cousele3, this.state.cousele4, this.state.cousele5, this.state.cousele6);

        }

    }
    sentSubject(ids) {  // 这是点击按钮提交过去数据
        if (ids.length != 0) {
            var idto = [];
            if(typeof ids == "number"){
                idto.push(ids + "");
                this.props.onGetSubject(idto);
            }
            this.props.onGetSubject(ids);
            this.props.onIsHidden();
            this.state.bodyqueId = [];
            this.state.cousele1 = ""
            this.state.cousele2 = ""
            this.state.cousele3 = ""
            this.state.cousele4 = ""
            this.state.cousele5 = ""
            this.state.page = 1
            this.cometoques(this.state.page,this.state.cousele1,this.state.cousele2,this.state.cousele3,this.state.cousele4,this.state.cousele5,this.state.cousele6);
        }

    }
    unique3(aa) { //这是数组去重的函数
        aa.sort();
        var res = [aa[0]];
        for (var i = 1; i < aa.length; i++) {
            if (aa[i] !== res[res.length - 1]) {
                res.push(aa[i]);
            }
        }
        return res;
    }
    removeByValue(arr, val) { //这是删除数组中指定某一个数的函数
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    }
    showPre() { //这是点击上一页执行的函数
        if (this.state.page > 1) {
            this.setState({
                page: --this.state.page
            })
            $('.h-thQutitle1 input').prop('checked', false);
            $('.h-thQutitbd1 input').prop('checked', false);
            this.state.bodyqueId = [];
            this.cometoques(this.state.page, this.state.cousele1, this.state.cousele2, this.state.cousele3, this.state.cousele4, this.state.cousele5, this.state.cousele6);
            // this.cometoques(this.state.page, this.props.triodeLink.majorValue, this.props.triodeLink.lessonValue, this.props.triodeLink.courseValue, this.state.cousele4, this.state.cousele5, this.state.cousele6);
        }

    }
    showNext() {  //这是点击下一页执行的函数
        if (this.state.pages == this.state.page || this.state.discertion == "off") {
            return;
        } else {
            this.setState({
                page: ++this.state.page
            })
            $('.h-thQutitle1 input').prop('checked', false);
            $('.h-thQutitbd1 input').prop('checked', false);
            this.state.bodyqueId = [];
            // this.cometoques(this.state.page, this.props.triodeLink.majorValue, this.props.triodeLink.lessonValue, this.props.triodeLink.courseValue, this.state.cousele4, this.state.cousele5, this.state.cousele6);
            this.cometoques(this.state.page, this.state.cousele1, this.state.cousele2, this.state.cousele3, this.state.cousele4, this.state.cousele5, this.state.cousele6);
        }

    }
    onDelete(ids, owners, whe) {

        if (whe == 1) {
            this.setState({
                idsto: ids + "",
                ownersto: owners
            })
        }

        $(".h-delete").css("display", "block");
        if (whe == 2) {
            $(".h-delete").css("display", "none");
        }
        if (whe == 3) {

            $.llsajax({
                url: "questionBank/deleteById",
                type: "post",
                data: {
                    id: this.state.idsto,
                },
                success: bodyques => {
                    this.cometoques(this.state.page, this.state.cousele1, this.state.cousele2, this.state.cousele3, this.state.cousele4, this.state.cousele5, this.state.cousele6);


                }
            })
            $(".h-delete").css("display", "none");
        }

    }
    closeprevs() {
        $(".h-delete").css("display", "none");
    }

    h_questionBody() {
        return this.state.bodyques.map((value, key) => {
            var leves, selects
            if (value.level == 1) {
                leves = "易"
            } else if (value.level == 2) {
                leves = "中"
            } else if (value.level == 3) {
                leves = "难"
            }
            if (value.type == 1) {
                selects = "单选题"
            } else if (value.type == 2) {
                selects = "多选题"
            } else if (value.type == 3) {
                selects = "问答题"
            }
            var date = value.cDate;
            var date = new Date(date);
            var Y = date.getFullYear();
            var M = date.getMonth() + 1;
            if (M < 10) {
                M = "0" + M
            }
            var T = date.getDate();
            if (T < 10) {
                T = "0" + T
            }
            var ruData = Y + "/" + M + "/" + T;
            var owners = value.owner == "0" ? "公有" : "私有";
            if(sessionStorage.getItem('userJudge')=='TM'){
                owners = '助教'
            }
            // let stems = value.value.stem == null? "--": value.stem;
            let majorName = value.majorName == null ? "--" : value.majorName;
            let courseName = value.courseName == null ? "--" : value.courseName;
            let lessonName = value.lessonName == null ? "--" : value.lessonName;
            return (
                sessionStorage.getItem('userJudge')!='TM'?
                <div className="h-thQuBodys" key={key}>
                    <div className="h-thQutitbd1">
                        <input type="checkbox" className="h-bodycheck" onChange={this.thbodycheck.bind(this)} id={value.id} />
                    </div>
                    <div className="h-thQutitbd2">{key + 1 + (this.state.page - 1) * 10}</div>
                    <div className="h-thQutitbd3" title={value.stem}>{value.stem}</div>
                    <div className="h-thQutitbd11">{owners}</div>
                    <div className="h-thQutitbd4">{selects}</div>
                    <div className="h-thQutitbd5" title={value.majorName}>{majorName}</div>
                    <div className="h-thQutitbd6" title={value.courseName}>{courseName}</div>
                    <div className="h-thQutitbd7">{lessonName}</div>
                    <div className="h-thQutitbd8">{leves}</div>
                    <div className="h-thQutitbd9">{ruData}</div>
                    <div className="h-thQutitbd10">
                        <a  title="添加至试卷" onClick={this.sentSubject.bind(this, value.id)} className="iconfont icon-tianjiadaoshijuan"></a>
                        <a  title="预览" onClick={this.showprev.bind(this, value.id)} className="iconfont icon-yulan"></a>
                    </div>
                </div>:
                <div className="h-thQuBodys" key={key}>
                    <div className="h-thQutitbd1">
                        <input type="checkbox" className="h-bodycheck" onChange={this.thbodycheck.bind(this)} id={value.id} />
                    </div>
                    <div className="h-thQutitbd2">{key + 1 + (this.state.page - 1) * 10}</div>
                    <div className="h-thQutitbd3" title={value.stem}>{value.stem}</div>
                    <div className="h-thQutitbd11">{owners}</div>
                   
                    <div className="h-thQutitbd4">{selects}</div>
                    <div className="h-thQutitbd5" title={value.majorName}>{majorName}</div>
                    <div className="h-thQutitbd6" title={value.courseName}>{courseName}</div>
                    <div className="h-thQutitbd7">{lessonName}</div>
                    <div className="h-thQutitbd8">{leves}</div>
                    <div className="h-thQutitbd9">{ruData}</div>
                    <div className="h-thQutitbd10">
                        <a  title="添加至试卷" onClick={this.sentSubject.bind(this, value.id)} className="iconfont icon-tianjiadaoshijuan"></a>
                        <a  title="预览" onClick={this.showprev.bind(this, value.id)} className="iconfont icon-yulan"></a>
                    </div>
                </div>
            )
        })
    }

    onBody(value) { //获取上面三级联动的值的js
        this.setState({
            sendObj: value,
            cousele1: value.majorValue,
            cousele2: value.lessonValue,
            cousele3: value.courseValue
        });

    }
    courseChange4(e) { //获取单选多选的js
        var cousele4 = e.target.selectedIndex;
        if (cousele4 == 0) {
            cousele4 = ""
        }
        this.setState({
            cousele4: cousele4
        })

    }
    courseChange5(e) { //获取难易度的js
        var cousele5 = e.target.selectedIndex;

        if (cousele5 == 0) {
            cousele5 = ""
        }
        this.setState({
            cousele5: cousele5
        })

    }
    courseChange6(e) { //这是获取公有私有的js
        var cousele6 = e.target.selectedIndex;
        // var couseleid = e.target.value;

        this.setState({
            cousele6: cousele6
        })
    }
    // 这是点击预览试卷的js
    showprev(previd) {
        $(".h-preview").css("display", "block");
        this.setState({
            bodytoId: previd
        })
        var previds = previd + "";

        $.llsajax({
            url: "questionBank/selectQuestionsById",
            type: "post",
            data: {
                id: previds
            },
            success: boduque => {
                console.log(boduque)
                var degree, selects;
                if (boduque.examInationQuestions.level == 1) {
                    degree = "易"

                } else if (boduque.examInationQuestions.level == 2) {
                    degree = "中"
                } else if (boduque.examInationQuestions.level == 3) {
                    degree = "难"
                }
                if (boduque.examInationQuestions.type == 1) {
                    selects = "单选题"
                } else if (boduque.examInationQuestions.type == 2) {
                    selects = "多选题"
                }else if (boduque.examInationQuestions.type == 3) {
                    selects = "问答题"
                }
                this.setState({
                    boduque: boduque.examInationQuestions,
                    bodylevel: degree,
                    bodytype: selects
                })
            }
        })

    }
    closeprev() {
        $(".h-preview").css("display", "none");
    }
    // 点击返回浮层消失
    onBackTo() {
        this.props.onIsHidden()
        this.state.bodyqueId = [];
        this.state.cousele1 = ""
        this.state.cousele2 = ""
        this.state.cousele3 = ""
        this.state.cousele4 = ""
        this.state.cousele5 = ""
        this.state.page = 1
        this.cometoques(this.state.page, this.state.cousele1, this.state.cousele2, this.state.cousele3, this.state.cousele4, this.state.cousele5, this.state.cousele6);
    }
    getBrowser(getVersion) { //这个是判断是否为edge浏览器的函数
        //注意关键字大小写
        var ua_str = navigator.userAgent.toLowerCase(), ie_Tridents, trident, match_str, ie_aer_rv, browser_chi_Type;
        if ("ActiveXObject" in self) {
            ie_aer_rv = (match_str = ua_str.match(/msie ([\d.]+)/)) ? match_str[1] :
                (match_str = ua_str.match(/rv:([\d.]+)/)) ? match_str[1] : 0;

            ie_Tridents = { "trident/7.0": 11, "trident/6.0": 10, "trident/5.0": 9, "trident/4.0": 8 };
            trident = (match_str = ua_str.match(/(trident\/[\d.]+|edge\/[\d.]+)/)) ? match_str[1] : undefined;
            browser_chi_Type = (ie_Tridents[trident] || ie_aer_rv) > 0 ? "ie" : undefined;
        } else {

            browser_chi_Type = (match_str = ua_str.match(/edge\/([\d.]+)/)) ? "ie" :
                (match_str = ua_str.match(/firefox\/([\d.]+)/)) ? "firefox" :
                    (match_str = ua_str.match(/chrome\/([\d.]+)/)) ? "chrome" :
                        (match_str = ua_str.match(/opera.([\d.]+)/)) ? "opera" :
                            (match_str = ua_str.match(/version\/([\d.]+).*safari/)) ? "safari" : undefined;
        }
        var verNum, verStr;
        verNum = trident && ie_Tridents[trident] ? ie_Tridents[trident] : match_str[1];
        verStr = (getVersion != undefined) ? browser_chi_Type + "/" + verNum : browser_chi_Type;
        return verStr;
    }
    // 点击预览试卷js结束
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
        let listlens = this.state.page == this.state.pages ? forbid : starts;
        if (this.state.bodyques.length < 10) {
            listlens = forbid
        }
        let showType = {
            display: this.state.bodytype == "多选题"? 'block' : 'none'
        }
        let hideChoose = {
            display: this.state.bodytype == "问答题"? 'none' : 'block'
        }
        let felx = {
            position: "fixed",
            height: "100%",
            width: "100%",
            top: "0",
            zIndex: "1000",
            overflow: "auto",
            left: "0px",
            backgroundColor: "#f4f4f6"
        }
        let bodycss = {
            position: "absolute",
            top: "0px",
            width: "100%",
            left: "0px",

        }
        let btnclass = {
            float: "right",
            marginRight: "2.5%"
        }
        let suggesstyle = {
            display: this.state.bodyques.length == 0 ? "block" : "none",
            borderLeft: "1px solid #f0f0f0",
            borderRight: "1px solid #f0f0f0",
            paddingLeft: "10px"
        }
        let pageclass = {
            display: this.state.pages <= 1 ? "none" : "block"
        }
        let seleIestyle = {
            marginLeft: this.getBrowser() == "ie" ? "4.9%" : "4.8%"
        }
        let sele2Iestyle = {
            marginLeft: this.getBrowser() == "ie" ? "0.62%" : "0.7%"
        }
        let styleI={
            display:"inline-block",
            width:"60px",
            textAlign:"center"
        }
        let styleS={
            display:"inline-block",
            width:"60px",
            textAlign:"center"
        }
        return this.props.isSuccess ? null : (
            <div style={felx}>
                <div className="h-questionBody" style={bodycss}>
                    {/*这是预览试题的弹出框*/}
                    <div className="h-preview">
                        <div className="h-previews">
                            <div className="h-prehead">
                                <span className="fl">预览试题</span>
                                <span className="fr h-deletprev iconfont icon-guanbi" onClick={this.closeprev.bind(this)}></span>
                            </div>
                            <div className="h-pretitle">
                                <span className="h-spanpretitl">考试题型 : </span>
                                <span className="h-spanpretitls">{this.state.bodytype}</span>
                            </div>
                            <div className="h-pretitl">
                                <span>{this.state.boduque.stem}</span>
                            </div>
                            <div className="h-subject" style={hideChoose}>
                                <p><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">A </span><span className="h-subspan1">{this.state.boduque.optionA}</span></p>
                                <p><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">B </span><span className="h-subspan1">{this.state.boduque.optionB}</span></p>
                                <p><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">C </span><span className="h-subspan1">{this.state.boduque.optionC}</span></p>
                                <p><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">D </span><span className="h-subspan1">{this.state.boduque.optionD}</span></p>
                                <p style={showType}><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">E </span><span className="h-subspan1">{this.state.boduque.optionE}</span></p>
                                <p style={showType}><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">F </span><span className="h-subspan1">{this.state.boduque.optionF}</span></p>
                            </div>
                            <div className="h-answer">
                                <span>正确答案:</span>
                                <span>{this.state.boduque.answer}</span>
                            </div>
                            <div className="h-source">
                                <p className="h-sources">
                                    <span className="h-soansour">难易程度 : </span>
                                    <span className="h-soansours">{this.state.bodylevel}</span>
                                </p>
                                <p>
                                    <span className="h-soansour">试题归属 : </span>
                                    <span className="h-soansours">{this.state.boduque.majorName}<i>-</i>{this.state.boduque.courseName}<i>-</i>{this.state.boduque.lessonName}</span>
                                </p>
                            </div>
                            <div className="h-prevbtn">
                                <button onClick={this.closeprev.bind(this)} className="h-prevbtn1">取消</button>
                                <button className="h-prevbtn2 commonButton button" onClick={this.sentSubject.bind(this, this.state.bodytoId)}>添加至试卷</button>
                            </div>
                        </div>
                    </div>

                    <div className="h-thQuBody">
                        <div className="h-questitle">
                            <span className="h-cubiud"></span><span className="h-information">题库选题</span>
                            {/*<span className="h-infopoint">您还需添加<i>{this.props.radioButtonList - this.props.radioButtonListNum > 0 ? this.props.radioButtonList - this.props.radioButtonListNum : 0}</i>单选题,<i>{this.props.multiselect - this.props.multiselectNum > 0 ? this.props.multiselect - this.props.multiselectNum : 0}</i>多选题 </span>*/}
                            <div className="h-addexams" onClick={this.onBackTo.bind(this)}><span className="h-addexams2">返回</span><span className="iconfont icon-back h-addexams1"></span></div>
                        </div>
                        {/*这是下拉框的html*/}
                        <div className="h-thSelect">
                            <div className="h-thselection1">
                                <CascadingMenu id="caseding" onBody={this.onBody.bind(this)} isSuccess={this.props.isSuccess} triodeLink={this.props.triodeLink}/>
                            </div>
                            <div className="h-thselection">
                                <div className="h-thSelects" style={seleIestyle}>
                                    <span>题型:</span>

                                    <select name="题目" onChange={this.courseChange4.bind(this)}>
                                        <option>&nbsp;选择题型</option>
                                        <option>&nbsp;单选题</option>
                                        <option>&nbsp;多选题</option>
                                        <option>&nbsp;主观题</option>
                                    </select>
                                </div>
                                <div className="h-thSelects2" style={sele2Iestyle}>
                                    <span>难易度:</span>

                                    <select name="选择难易度" onChange={this.courseChange5.bind(this)}>
                                        <option>&nbsp;选择难易度</option>
                                        <option>&nbsp;易</option>
                                        <option>&nbsp;中</option>
                                        <option>&nbsp;难</option>
                                    </select>

                                </div>
                                <div className="h-thSelects3">
                                    <span>题库来源:</span>
                                    <select name="全部" onChange={this.courseChange6.bind(this)}>
                                        <option value="0">&nbsp;全部</option>
                                        <option value="1">&nbsp;公有题库</option>
                                        <option value="2">&nbsp;私有题库</option>
                                    </select>
                                    <button className="commonButton button" style={btnclass} onClick={this.sendbtn.bind(this)}>确定</button>

                                </div>
                            </div>

                        </div>
                        {/*这是列表页的html*/}
                        <div className={sessionStorage.getItem('userJudge')=="TM"?"h-thQuhead addonelist" :"h-thQuhead"}>
                            <div className="h-thQutitle1">
                                <input type="checkbox" id="h-theadcheck" onChange={this.theadcheck.bind(this)} />
                            </div>
                            <div className="h-thQutitle2">
                                序号
                            </div>
                            <div className="h-thQutitle3">
                                题目
                            </div>
                            <div className="h-thQutitle11">
                                来源
                            </div>
                            <div className="h-thQutitle4">
                                题型
                            </div>
                            <div className="h-thQutitle5">
                                所属专业
                            </div>
                            <div className="h-thQutitle6">
                                所属课程
                            </div>
                            <div className="h-thQutitle7">
                                所属课时
                            </div>
                            <div className="h-thQutitle8">
                                难易度
                            </div>
                            <div className="h-thQutitle9">
                                创建时间
                            </div>
                            <div className="h-thQutitle10">
                                操作
                            </div>

                        </div>
                        <div>
                            {this.h_questionBody()}
                            <div className="h-bodytiwen1" style={suggesstyle}>
                                <span className="h-sugpoint1">没有符合条件的数据</span>
                            </div>
                        </div>

                        <div className="h-addbtn">
                            <button className="commonButton button" onClick={this.sentSubject.bind(this, this.state.bodyqueId)}>批量添加至试卷</button>
                        </div>
                        <div className="h-page" style={pageclass}>
                            <button className="h-page2" style={listlens} onClick={this.showNext.bind(this)}>下一页</button>
                            <button className="h-page1" id="h-pageid1" style={forbidcls} onClick={this.showPre.bind(this)}>上一页</button>
                            <div className="h-page0">共<i style={styleI}>{this.state.pages}</i>页&nbsp;&nbsp;&nbsp;&nbsp;第 <span style={styleS}>{this.state.page}</span>页</div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
    componentWillReceiveProps(props){
        if(props.isSuccess == false){
            this.setState({
                cousele1: this.props.triodeLink.majorValue,
                cousele2: this.props.triodeLink.lessonValue,
                cousele3: this.props.triodeLink.courseValue
            })
            // //console.log(props)
            // pages, majorid, courseId, lessonId, type, level, owner
            this.cometoques(this.state.page, this.props.triodeLink.majorValue, this.props.triodeLink.lessonValue, this.props.triodeLink.courseValue, this.state.cousele4, this.state.cousele5, this.state.cousele6);
        }

    }
    componentDidUpdate(){
        if(this.props.isSuccess == false){
            // //console.log(this.props)
        }
    }
}

