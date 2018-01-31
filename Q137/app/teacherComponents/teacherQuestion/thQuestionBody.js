/**
 * Created by heshuai on 2017/2/21.
 */


import React from 'react';
import './styleTeacherQuestion.css';
import styles from '../note/styleNote.js';
import $ from 'jquery';
import { Link } from 'react-router';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import CascadingMenu from '../cascadingMenu/cascadingMenu1.js';
import RankComp from '../../majorMaster/public/rank/rankComp/rankComp.jsx'
// import bombBox from '../bombBox'
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
            bodyqueId: [], //这是获取数据拿到列表的ID值
            bodyqueOwner: [], //这是放置公有私有的数据
            judge: [], //这是判断是单个删除还是多个删除试题
            bodutoId: [], //这是点击添加到试卷的ID
            isShow: false,
            answer: [],
            flag: 0,//题目类型
            supName: '--',//贡献人
            uid: null,
        }
    }
    componentWillMount() {
        //console.log(this.props)
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
        // //console.log(compData.majors);
        this.cometoques(this.state.page, this.state.cousele1, this.state.cousele2, this.state.cousele3, this.state.cousele4, this.state.cousele5, this.state.cousele6);
    }
    sendbtn() {  //这是点击提交下拉选择的函数
        this.state.page = 1;
        if (this.state.cousele1 == "" && this.state.cousele2 == "" && this.state.cousele3 == "" && this.state.cousele4 == "" && this.state.cousele5 == "" && this.state.cousele6 == 0) {

        } else {
            $('.h-thQutitle1 input').prop('checked', false);
            $('.h-thQutitbd1 input').prop('checked', false);
            this.state.bodyqueId = [];
            this.state.bodyqueOwner = [];
        }
        this.cometoques(this.state.page, this.state.cousele1, this.state.cousele2, this.state.cousele3, this.state.cousele4, this.state.cousele5, this.state.cousele6);
    }
    cometoques(pages, majorid, courseId, lessonId, type, level, owner) {
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
                    pages: bodyques.date.total,
                    uid: bodyques.questionBank.userId,
                })
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
        var bodyqueOwner = [];
        for (var i = 0; i < bodyque.length; i++) {
            for (var key in bodyque[i]) {
                bodyqueId.push(bodyque[i].id + "");
            }
        }
        for (var i = 0; i < bodyque.length; i++) {
            for (var key in bodyque[i]) {
                bodyqueOwner.push(bodyque[i].owner + "");
            }
        }
        var bodyqueOwner = this.unique3(bodyqueOwner);
        var bodyqueIds = this.unique3(bodyqueId);
        if (checked == false) {
            bodyqueIds = [];
            bodyqueOwner = [];
        }
        this.setState({
            bodyqueId: bodyqueIds,
            bodyqueOwner: bodyqueOwner
        })

    }
    thbodycheck(e) { //这是点击添加的序号列表
        let checkeds = e.target.checked;
        let iptvalue = e.target.value;
        let thbodyId = e.target.id;
        if (checkeds == true) {
            this.state.bodyqueId.push(thbodyId);
            this.state.bodyqueOwner.push(iptvalue);
            this.state.bodyqueOwner = this.unique3(this.state.bodyqueOwner);
        }

        if (checkeds == false) {
            this.removeByValue(this.state.bodyqueId, thbodyId);
            this.removeByValue(this.state.bodyqueOwner, iptvalue);

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
            this.cometoques(this.state.page, this.state.cousele1, this.state.cousele2, this.state.cousele3, this.state.cousele4, this.state.cousele5, this.state.cousele6);
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
            this.cometoques(this.state.page, this.state.cousele1, this.state.cousele2, this.state.cousele3, this.state.cousele4, this.state.cousele5, this.state.cousele6);
        }

    }
    onDelete(ids, owners, whe) { //这是删除弹出框和里面的判断

        if (whe == 1) {
            this.setState({
                idsto: ids + "",
                ownersto: owners,
                judge: "D"
            })
            $(".h-delete").css("display", "block");
        }
        if (whe == 4) {
            this.setState({
                judge: "P"
            })
            for (var i = 0; i < this.state.bodyqueOwner.length; i++) {
                if (this.state.bodyqueOwner[i] == 0) {

                    $(".h-unable").css("display", "block");
                    return;
                }
            }
            if (this.state.bodyqueId == "") {

            } else {
                $(".h-delete").css("display", "block");
            }
        }
        if (whe == 2) {
            $(".h-delete").css("display", "none");
        }

        if (whe == 3) {
            if (this.state.judge == "D") {
                $.llsajax({
                    url: "questionBank/deleteById",
                    type: "post",
                    data: {
                        id: this.state.idsto,
                    },
                    success: bodyques => {
                        this.cometoques(this.state.page, this.state.cousele1, this.state.cousele2, this.state.cousele3, this.state.cousele4, this.state.cousele5, this.state.cousele6);
                        this.setState({
                            isShow: true,
                        });
                        setTimeout(
                            () => {
                                this.setState({
                                    isShow: false
                                });
                            },
                            2000
                        );
                    }
                })
                $(".h-delete").css("display", "none");
                $('.h-thQutitle1 input').prop('checked', false);
                $('.h-thQutitbd1 input').prop('checked', false);
            } else if (this.state.judge == "P") {

                this.state.bodyqueId = this.state.bodyqueId.join(",");
                $.llsajax({
                    url: "questionBank/deleteByPrimaryKey",
                    type: "post",
                    data: {
                        ids: this.state.bodyqueId,
                    },
                    success: bodyques => {
                        this.cometoques(this.state.page, this.state.cousele1, this.state.cousele2, this.state.cousele3, this.state.cousele4, this.state.cousele5, this.state.cousele6);
                        this.state.bodyqueId = [];
                        this.setState({
                            isShow: true,
                        });
                        setTimeout(
                            () => {
                                this.setState({
                                    isShow: false
                                });
                            },
                            2000
                        );
                    }
                })
                $(".h-delete").css("display", "none");
                $('.h-thQutitle1 input').prop('checked', false);
                $('.h-thQutitbd1 input').prop('checked', false);
            }

        }
    }
    batchall() { //点击发送添加试卷发送过去ID
        if (this.state.bodyqueId.length != 0) {
            hashHistory.push("/createTestPaper?id=" + this.state.bodyqueId);
        }
    }
    closeUnab() { //这是点击关闭私有题库出现的弹框
        $(".h-unable").css("display", "none");
    }
    closeprevs() { // 这是点击关闭删除出现的提示弹窗
        $(".h-unable").css("display", "none");
        $(".h-delete").css("display", "none");
    }

    h_questionBody() { //这是渲染列表的js，将列表所有数据放进去
        return this.state.bodyques.map((value, key) => {
            if (value.level == 1) {
                value.level = "易"
            } else if (value.level == 2) {
                value.level = "中"
            } else if (value.level == 3) {
                value.level = "难"
            }
            if (value.type == 1) {
                value.type = "单选题"
            } else if (value.type == 2) {
                value.type = "多选题"
            } else if (value.type == 3) {
                value.type = "问答题"
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
            var ownersName = value.ownername
            if (sessionStorage.getItem('userJudge') == 'TM') {
                owners = '助教'
            }
            // button visibility state
            let showDrop = {
                visibility: value.owner == "0" || sessionStorage.getItem('userJudge') == 'TM' ? 'visible' : 'visible'
            }
            let majorName = value.majorName == null ? "--" : value.majorName;
            let courseName = value.courseName == null ? "--" : value.courseName;
            let lessonName = value.lessonName == null ? "--" : value.lessonName;
            let keys
            if (this.state.page == 1) {
                keys = key < 9 ? "0" : "";
            }
            return (
                <div className="h-thQuBodys" key={key}>
                    <div className="h-thQutitbd1">
                        <input type="checkbox" className="h-bodycheck" onChange={this.thbodycheck.bind(this)} id={value.id} value={value.owner} />
                    </div>
                    <div className="h-thQutitbd2">{keys}{key + 1 + (this.state.page - 1) * 10}</div>
                    <div className="h-thQutitbd3" title={value.stem}>{value.stem}</div>
                    <div className="h-thQutitbd11">{sessionStorage.getItem('userJudge') == 'TM' ? ownersName : owners}</div>
                    <div className="h-thQutitbd4">{value.type}</div>
                    <div className="h-thQutitbd5" title={value.majorName}>{majorName}</div>
                    <div className="h-thQutitbd6" title={value.courseName}>{courseName}</div>
                    <div className="h-thQutitbd7">{lessonName}</div>
                    <div className="h-thQutitbd8">{value.level}</div>
                    <div className="h-thQutitbd9">{ruData}</div>
                    <div className="h-thQutitbd10">
                        <Link to={{ pathname: '/createTestPaper', query: { id: value.id } }} title="添加至试卷" className="h-tianjione iconfont icon-tianjiadaoshijuan"></Link>
                        <a title="预览" onClick={this.showprev.bind(this, value.id)} className="iconfont icon-yulan"></a>
                        {/*<Link to={{ pathname: '/teacherReviceEdit', query: { id: value.id } }} title="编辑" style={showDrop} className={value.owner == 0 ||sessionStorage.getItem('userJudge')=='TM'? 'useless' + ' ' + "iconfont" + ' ' + "icon-bianji" : "iconfont" + ' ' + "icon-bianji"}></Link>*/}
                        <a title="编辑" style={showDrop} className={(value.owner == 0 || this.state.uid != value.owner)&&sessionStorage.getItem('userJudge')!='MM'||(sessionStorage.getItem('userJudge')=='MM'&&value.owner != 0) ? 'useless' + ' ' + "iconfont" + ' ' + "icon-bianji" : "iconfont" + ' ' + "icon-bianji"} onClick={(value.owner == 0 || this.state.uid != value.owner)&&sessionStorage.getItem('userJudge')!='MM'||(sessionStorage.getItem('userJudge')=='MM'&&value.owner != 0) ? function (e) { return false } : this.jpToEdit.bind(this, value.id)}></a>
                        <a title="删除" style={showDrop} className={(value.owner == 0 || this.state.uid != value.owner)&&sessionStorage.getItem('userJudge')!='MM'||(sessionStorage.getItem('userJudge')=='MM'&&value.owner != 0)? 'useless' + ' ' + "iconfont" + ' ' + "icon-SHANCHU-" : "iconfont" + ' ' + "icon-SHANCHU-"} onClick={(value.owner == 0 || this.state.uid != value.owner)&&sessionStorage.getItem('userJudge')!='MM'||(sessionStorage.getItem('userJudge')=='MM'&&value.owner != 0) ? function (e) { return false } : this.onDelete.bind(this, value.id, value.owner, 1)}></a>
                    </div>
                </div>
            )
        })
    }
    jpToEdit(id) {
        // console.log(id)
        if (sessionStorage.getItem('userJudge') == 'MM') {

            hashHistory.push({
                pathname: '/teacherReviceEdit',
                query: {
                    id: id
                }
            })
        } else {

            hashHistory.push({
                pathname: '/teacherReviceEdit',
                query: {
                    id: id
                }
            })
        }
    }
    onBody(value) { //三级联动的js
        this.setState({
            sendObj: value
        })

        this.setState({
            cousele1: value.majorValue,
            cousele2: value.lessonValue,
            cousele3: value.courseValue
        });
    }
    courseChange4(e) { //单选多选
        var cousele4 = e.target.selectedIndex;
        if (cousele4 == 0) {
            cousele4 = ""
        }
        this.setState({
            cousele4: cousele4
        })

    }
    courseChange5(e) {//难易度
        var cousele5 = e.target.selectedIndex;

        if (cousele5 == 0) {
            cousele5 = ""
        }
        this.setState({
            cousele5: cousele5
        })

    }
    courseChange6(e) { //公有私有
        var cousele6 = e.target.selectedIndex;
        var couseleid = e.target.value;

        this.setState({
            cousele6: couseleid
        })
    }

    // 这是点击预览试卷的js
    showprev(previd) {
        $(".h-preview").css("display", "block");
        var previds = previd + "";
        $.llsajax({
            url: "questionBank/selectQuestionsById",
            type: "post",
            data: {
                id: previds
            },
            success: boduque => {
                var flag = 0;
                if (boduque.examInationQuestions.level == 1) {
                    boduque.examInationQuestions.level = "易"
                } else if (boduque.examInationQuestions.level == 2) {
                    boduque.examInationQuestions.level = "中"
                } else if (boduque.examInationQuestions.level == 3) {
                    boduque.examInationQuestions.level = "难"
                }
                if (boduque.examInationQuestions.type == 1) {
                    boduque.examInationQuestions.type = "单选题"
                    this.setState({
                        answer: boduque.examInationQuestions.answer == null ? '' : boduque.examInationQuestions.answer.split("").sort(),
                    })
                } else if (boduque.examInationQuestions.type == 2) {
                    boduque.examInationQuestions.type = "多选题"
                    this.setState({
                        answer: boduque.examInationQuestions.answer == null ? '' : boduque.examInationQuestions.answer.split("").sort(),
                    })
                } else if (boduque.examInationQuestions.type == 3) {
                    flag = 3;
                    boduque.examInationQuestions.type = "问答题"
                    this.setState({
                        answer: boduque.examInationQuestions.answer == null ? '' : boduque.examInationQuestions.answer,
                    })
                }
                this.setState({
                    boduque: boduque.examInationQuestions,
                    bodylevel: boduque.examInationQuestions.level,
                    bodytype: boduque.examInationQuestions.type,
                    bodutoId: boduque.examInationQuestions.id,
                    supName: boduque.examInationQuestions.ownername,
                    flag: flag,
                })
            }
        })

    }
    closeprev() {
        $(".h-preview").css("display", "none");
    }
    getBrowser(getVersion) { //这个是判断是否为edge浏览器的函数
        var ua_str = navigator.userAgent.toLowerCase(), ie_Tridents, trident, match_str, ie_aer_rv, browser_chi_Type;
        if ("ActiveXObject" in self) {
            // ie_aer_rv:  指示IE 的版本.
            // It can be affected by the current document mode of IE.
            ie_aer_rv = (match_str = ua_str.match(/msie ([\d.]+)/)) ? match_str[1] :
                (match_str = ua_str.match(/rv:([\d.]+)/)) ? match_str[1] : 0;

            // ie: Indicate the really version of current IE browser.
            ie_Tridents = { "trident/7.0": 11, "trident/6.0": 10, "trident/5.0": 9, "trident/4.0": 8 };
            //匹配 ie8, ie11, edge
            trident = (match_str = ua_str.match(/(trident\/[\d.]+|edge\/[\d.]+)/)) ? match_str[1] : undefined;
            browser_chi_Type = (ie_Tridents[trident] || ie_aer_rv) > 0 ? "ie" : undefined;
        } else {
            //判断 windows edge 浏览器
            // match_str[1]: 返回浏览器及版本号,如: "edge/13.10586"
            // match_str[1]: 返回版本号,如: "edge"
            //若要返回 "edge" 请把下行的 "ie" 换成 "edge"。 注意引号及冒号是英文状态下输入的
            browser_chi_Type = (match_str = ua_str.match(/edge\/([\d.]+)/)) ? "ie" :
                //判断firefox 浏览器
                (match_str = ua_str.match(/firefox\/([\d.]+)/)) ? "firefox" :
                    //判断chrome 浏览器
                    (match_str = ua_str.match(/chrome\/([\d.]+)/)) ? "chrome" :
                        //判断opera 浏览器
                        (match_str = ua_str.match(/opera.([\d.]+)/)) ? "opera" :
                            //判断safari 浏览器
                            (match_str = ua_str.match(/version\/([\d.]+).*safari/)) ? "safari" : undefined;
        }
        //返回浏览器类型和版本号
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
        let shotAnsShow = {
            // display:this.state.flag == 3?'block':'none'
            minHeight: this.state.flag == 3 ? '100px' : '30px',
            marginTop: this.state.flag == 3 ? '20px' : '0',
        }
        let shotAnsHide = {
            display: this.state.flag != 3 ? 'block' : 'none'
        }
        let listlens = this.state.page == this.state.pages ? forbid : starts;
        if (this.state.bodyques.length < 10) {
            listlens = forbid
        }
        let showType = {
            display: this.state.bodytype == "多选题" ? 'block' : 'none'
        }
        let pageclass = {
            display: this.state.pages <= 1 ? "none" : "block"
        }
        let suggesstyle = {
            display: this.state.pages == 0 ? "block" : "none",
            borderLeft: "1px solid #f0f0f0",
            borderRight: "1px solid #f0f0f0",
            paddingLeft: "10px"
        }
        let seleIestyle = {
            marginLeft: this.getBrowser() == "ie" ? "4.9%" : "4.8%"
        }
        let sele2Iestyle = {
            marginLeft: this.getBrowser() == "ie" ? "0.62%" : "0.7%"
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
        let stylePos = {
            bottom: "3px",
        }
        let addonelist = {
            display: sessionStorage.getItem('userJudge') == 'TM' ? 'inlineBlock' : 'none'
        }
        let showUpload = {
            display: sessionStorage.getItem('userJudge') == 'MM' ? 'block' : 'none'
        }
        return (
            <div className="h-questionBody">
                <div style={styles.notificationBox}>
                    <div style={this.state.isShow ? styles.notificationCenter : styles.notificationCenterAnimate}>
                        <i style={styles.notificationCenterIcon} className="iconfont icon-xiaoxizhongxin-"></i>
                        <span style={styles.notificationCenterMsg}>试题删除成功</span>
                    </div>
                </div>
                {/*这是删除试题的弹出框*/}
                <div className="h-delete">
                    <div className="h-deletes">
                        <div className="h-preheads">
                            <span className="fl h-deletprev1">删除</span>
                            <span className="fr h-deletprevs iconfont icon-guanbi" onClick={this.closeprevs.bind(this)}></span>
                        </div>
                        <p className="h-deletitle"><p>确认删除该试题吗？</p><p>删除后试卷中的试题不受影响。</p></p>
                        <div className="h-prevbtns">
                            <button className="h-prevbtns1" onClick={this.closeprevs.bind(this)}>取消</button>
                            <button className="h-prevbtns2 commonButton button" onClick={this.onDelete.bind(this, "for", "for", 3)}>确定</button>
                        </div>
                    </div>
                </div>
                {/*这是删除试题时有公有时出现的弹框*/}
                <div className="h-unable">
                    <div className="h-deletes">
                        <div className="h-preheads">
                            <span className="fl h-deletprev1">删除</span>
                            <span className="fr h-deletprevs iconfont icon-guanbi" onClick={this.closeprevs.bind(this)}></span>
                        </div>
                        <p className="h-deletitle">因为您删除的试题中存在私有试题,无法删除!</p>
                        <div className="h-prevbtns">
                            <button className="h-prevbtns1" onClick={this.closeUnab.bind(this)}>取消</button>
                        </div>
                    </div>
                </div>
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
                            <span className="h-handupPerson">创建人 :</span>
                            <span className="h-hpName">{this.state.supName||'联想试卷组'}</span>
                        </div>
                        <div className="h-pretitl">
                            <span>{this.state.boduque.stem}</span>
                        </div>
                        <div className="h-subject" style={shotAnsHide}>
                            <p><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">A </span><span className="h-subspan1">{this.state.boduque.optionA}</span></p>
                            <p><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">B </span><span className="h-subspan1">{this.state.boduque.optionB}</span></p>
                            <p><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">C </span><span className="h-subspan1">{this.state.boduque.optionC}</span></p>
                            <p><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">D </span><span className="h-subspan1">{this.state.boduque.optionD}</span></p>
                            <p style={showType}><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">E </span><span className="h-subspan1">{this.state.boduque.optionE}</span></p>
                            <p style={showType}><input className="h-rdo" disabled="true" name="h-radi" type="radio" /> <span className="h-subspan">F </span><span className="h-subspan1">{this.state.boduque.optionF}</span></p>
                        </div>

                        <div className="h-answer" style={shotAnsShow}>
                            <span>正确答案 : </span>
                            {/*<span>{this.state.answer.indexOf("\n") >= 0?this.state.answer.replace("\\n", " \n "):this.state.answer}</span>*/}
                            <textarea name="" id="" disabled value={this.state.answer.indexOf("\n") >= 0 ? this.state.answer.replace("\n", " \n ") : this.state.answer}></textarea>
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
                            <a onClick={this.closeprev.bind(this)} className="h-prevbtn1">取消</a>
                            <Link to={{ pathname: '/createTestPaper', query: { id: this.state.bodutoId } }} style={stylePos} className="h-prevbtn2 commonButton button">添加至试卷</Link>
                        </div>
                    </div>
                </div>

                <div className="h-thQuBody">
                    <div className="h-questitle">
                        <span className="h-cubiud"></span><span className="h-information">题库</span>
                        <Link to="teacherEditexam" className="h-addexam button commonButton"><i className="iconfont icon-tianjiadaoshijuan"></i>添加试题</Link>
                        <a href="javascript:;" style={showUpload} className="h-addexamMany button commonButton" onClick={this.importMany.bind(this)}><i className="iconfont icon-daoruchengji"></i>批量导入试题</a>
                    </div>
                    
                    {sessionStorage.getItem('userJudge') == "MM"||sessionStorage.getItem('userJudge') == "T"||sessionStorage.getItem('userJudge') == "TM"||sessionStorage.getItem('userJudge') == "EM" ? <RankComp /> : ''}
                    {/*这是下拉框的html*/}
                    <div className="h-thSelect">
                        <div className="h-thselection1">
                            <CascadingMenu id="caseding" onBody={this.onBody.bind(this)} />
                        </div>
                        <div className="h-thselection">
                            <div className="h-thSelects" style={seleIestyle}>
                                <span>题型:</span>
                                <select name="题目" onChange={this.courseChange4.bind(this)}>
                                    <option>&nbsp;选择题型</option>
                                    <option>&nbsp;单选题</option>
                                    <option>&nbsp;多选题</option>
                                    <option>&nbsp;简答题</option>
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
                                    <option value="2">&nbsp;{sessionStorage.getItem('userJudge') != 'TM' ? '私有题库' : '私有题库'}</option>
                                </select>
                                <button className="commonButton button" onClick={this.sendbtn.bind(this)}>确定</button>

                            </div>
                        </div>

                    </div>
                    {/*这是列表页的html*/}
                    <div className={sessionStorage.getItem('userJudge') == "TM" ? "h-thQuhead addonelist" : "h-thQuhead"}>
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
                            {sessionStorage.getItem('userJudge') == 'TM' ? '创建人' : '来源'}
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
                    <div className="h-thQuContent">
                        {this.h_questionBody()}
                    </div>
                    <div className="h-bodytiwen1" style={suggesstyle}>
                        <span className="h-sugpoint"></span>
                        <span className="h-sugpoint1">没有符合条件的数据</span>
                    </div>
                    <div className="h-addbtn" style={this.h_questionBody().length == 0 ? styles.buttonHide : null}>
                        <button className="commonButton button spro-Questionbutton" onClick={this.batchall.bind(this)}>批量添加至试卷</button>
                        <button className="commonButton button spro-Questionbutton" onClick={this.onDelete.bind(this, "for", "for", 4)}>批量删除试题</button>
                    </div>
                    <div className="h-page" style={pageclass}>
                        <button className="h-page2" style={listlens} onClick={this.showNext.bind(this)}>下一页</button>
                        <button className="h-page1" id="h-pageid1" style={forbidcls} onClick={this.showPre.bind(this)}>上一页</button>
                        <div className="h-page0">共<i style={styleI}>{this.state.pages}</i>页&nbsp;&nbsp;&nbsp;&nbsp;第 <span style={styleS}>{this.state.page}</span>页</div>
                    </div>
                </div>

            </div>
        );
    }
    importMany() {
        hashHistory.push({
            pathname: '/uploadpage',
            query: {
                type: 'exercise'
            }
        })
    }
    componentDidMount() {
        $('.isTextarea').on('input propertychange', function () {
            var value = $(this).val()
            if (value.indexOf("\\n")) {
                $(this).css('height', '82px')
            }
        }).on('keydown', function (e) {
            var value = $(this).val()
            if (e.keyCode == 13) {
                $(this).css('height', '82px')
            }
            if (value == '') {
                $(this).css('height', '28px')
            }
        })
    }
}
