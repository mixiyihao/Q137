
import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import './courseEvaluationBody.css';

export default class CourseEvaluationBosy extends React.Component {
    constructor() {
        super();
        this.state = {
            tabID: 0,
            stuArr: [],
            saveData: [],
            initData: [],
            stuNum: 0,
            semester: [' 第一学期',' 第二学期',' 第三学期',' 第四学期','第五学期'],
            semesterArr: [],
            school: [],
            major: [],
            absence: 0,
            average: 0,
            averageLenovo: 0,
            averageSchool: 0,
            classID: [],
            //用户点击选择的学期
            term: 0,
            sortFlag1: false,
            sortFlag2: false,
            sortFlag3: false,
            //截止到用户的学期
            temptermnowCount:4,
        }
    }
    componentWillMount() {
        let data = this.props.classMaster;
        if (data != null && data != 0) {
            if (!(window.location.hash.indexOf('?') > -1)) {
                // this.setState({
                //     term:this.props.classMaster2[0].term
                // })
               
                this.setState({
                    temptermnowCount:this.props.classMaster2[0].term
                });
                this.selectSemester(this.props.classMaster2[0].term,this.props.classMaster2[0].term);
                return ;
            }
            if (window.location.hash.indexOf('?') > -1) {
                //  this.setState({
                //     term:this.props.classMaster2[location.hash.split("a=")[1].split("&")[0]].term
                // })
            
                this.setState({
                    temptermnowCount:this.props.classMaster2[location.hash.split("a=")[1].split("&")[0]].term
                });
                this.selectSemester(this.props.classMaster2[location.hash.split("a=")[1].split("&")[0]].term,this.props.classMaster2[location.hash.split("a=")[1].split("&")[0]].term);
                return ;
            }
        }
    }
    componentDidMount() {
        this.autoScroll();
        let data = this.props.classMaster;
        let stuArrItem = [];
        if (this.props.classMaster.userList != null && this.props.classMaster.userList.length != 0) {
            if (location.hash.indexOf("?") > -1) {
                this.setState({
                    tabID: location.hash.split("a=")[1].split("&")[0]
                });
                document.getElementById("CourseEvaluationBody_select").selectedIndex = Number(location.hash.split("s=")[1].split("&")[0]) - 1;
            }
            if (!(window.location.hash.indexOf('?') > -1)) {
                let len = data.userList.length;
                if (len > 0) {
                    let data_id = null;
                    let n = '';
                    let s = '';
                    let id = '';
                    let c = Base64.encodeURI(this.props.classMaster2[0].name); // 班级
                    let ci = Base64.encodeURI(this.props.classMaster2[0].id); // 班级ID
                    let t = Base64.encodeURI(this.props.classMaster2[0].term); // 当前学期
                    let tc = Base64.encodeURI(this.props.classMaster2[0].termcount); // 总学期
                    let sc = Base64.encodeURI(this.props.classMaster2[0].schoolname); // 学校
                    let m = Base64.encodeURI(this.props.classMaster2[0].majorname); // 专业
                    let tab = Base64.encodeURI(this.state.tabID);
                    let st = this.props.classMaster2[0].term;
                    for (var i = 0; i < len; i++) {
                        data_id = Base64.encodeURI(data.userList[i].id);
                        n = Base64.encodeURI(data.userList[i].name);
                        s = Base64.encodeURI(data.userList[i].studentNo);
                        id = Base64.encodeURI(data.userList[i].id);
                        stuArrItem.push(
                            <tr key={i}>
                                <td width="82px">{data.userList[i].name || '--'}</td>
                                <td width="162px">{data.userList[i].studentNo || '--'}</td>
                                <td width="71px">{data.userList[i].average || '--'}</td>
                                <td width="69px">{data.userList[i].averageLenovo || '--'}</td>
                                <td width="69px">{data.userList[i].averageSchool || '--'}</td>
                                <td width="70px">{data.userList[i].absencescore || '--'}</td>
                                <td width="73x">{data.userList[i].rewardscore || '--'}</td>
                                <td width="73px">{data.userList[i].losework || '--'}</td>
                                <td width="73px">{data.userList[i].interview || '--'}</td>
                                <td width="300px">
                                    <span className="space"></span>
                                    <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 1, tc: tc, n: n, s: s,sc: sc, m: m, ci: ci, id: id, tab: tab, st: st } }}><i className="iconfont icon-kaoqin"></i>考勤</Link>
                                    <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 2, tc: tc, n: n, s: s,sc: sc, m: m, ci: ci, id: id, tab: tab, st: st } }}><i className="iconfont icon-fangtan"></i>访谈</Link>
                                    <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 3, tc: tc, n: n, s: s,sc: sc, m: m, ci: ci, id: id, tab: tab, st: st } }}><i className="iconfont icon-jiangcheng"></i>奖罚</Link>
                                    <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 4, tc: tc, n: n, s: s,sc: sc, m: m, ci: ci, id: id, tab: tab, st: st } }}><i className="iconfont icon-gerenzonglan"></i>个人总览</Link>
                                </td>
                            </tr>
                        )
                    }
                    this.setState({
                        initData: data,
                        saveData: stuArrItem,
                        stuArr: stuArrItem,
                        stuNum: data.stunum,
                        school: sc,
                        major: m,
                        absence: data.absence == null ? 0 : data.absence,
                        average: data.average == null ? 0 : data.average,
                        averageLenovo: data.averageLenovo == null ? 0 : data.averageLenovo,
                        averageSchool: data.averageSchool == null ? 0 : data.averageSchool,
                        classID: this.props.classMaster2[0].id,
                        term: this.props.classMaster2[0].term
                    })
                    if (history.pushState) {
                        history.pushState(null, '', location.href + '?a=0&s=' + this.props.classMaster2[0].term);
                    }
                }
                return;
            }
            if (window.location.hash.indexOf('?') > -1) {
                let len = data.userList.length;
                if (len > 0) {
                    let data_id = null;
                    let n = '';
                    let s = '';
                    let id = '';
                    let c = Base64.encodeURI(this.props.classMaster2[location.hash.split("a=")[1].split("&")[0]].name); // 班级
                    let ci = Base64.encodeURI(this.props.classMaster2[location.hash.split("a=")[1].split("&")[0]].id); // 班级ID
                    let t = Base64.encodeURI(this.props.classMaster2[location.hash.split("a=")[1].split("&")[0]].term); // 当前学期
                    let tc = Base64.encodeURI(this.props.classMaster2[location.hash.split("a=")[1].split("&")[0]].termcount); // 总学期
                    let sc = Base64.encodeURI(this.props.classMaster2[location.hash.split("a=")[1].split("&")[0]].schoolname); // 学校
                    let m = Base64.encodeURI(this.props.classMaster2[location.hash.split("a=")[1].split("&")[0]].majorname); // 专业
                    let tab = Base64.encodeURI(location.hash.split("a=")[1].split("&")[0]);
                    let st = location.hash.split("s=")[1].split("&")[0]
                    for (var i = 0; i < len; i++) {
                        data_id = Base64.encodeURI(data.userList[i].id);
                        n = Base64.encodeURI(data.userList[i].name);
                        s = Base64.encodeURI(data.userList[i].studentNo);
                        id = Base64.encodeURI(data.userList[i].id);
                        stuArrItem.push(
                            <tr key={i}>
                                <td width="82px">{data.userList[i].name || '--'}</td>
                                <td width="162px">{data.userList[i].studentNo || '--'}</td>
                                <td width="71px">{data.userList[i].average || '--'}</td>
                                <td width="69px">{data.userList[i].averageLenovo || '--'}</td>
                                <td width="69px">{data.userList[i].averageSchool || '--'}</td>
                                <td width="70px">{data.userList[i].absencescore || '--'}</td>
                                <td width="73px">{data.userList[i].rewardscore || '--'}</td>
                                <td width="73px">{data.userList[i].losework || '--'}</td>
                                <td width="73px">{data.userList[i].interview || '--'}</td>
                                <td width="300px">
                                    <span className="space"></span>
                                    <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 1, tc: tc, n: n, s: s,sc: sc, m: m, ci: ci, id: id, tab: tab, st: st } }}><i className="iconfont icon-kaoqin"></i>考勤</Link>
                                    <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 2, tc: tc, n: n, s: s,sc: sc, m: m, ci: ci, id: id, tab: tab, st: st } }}><i className="iconfont icon-fangtan"></i>访谈</Link>
                                    <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 3, tc: tc, n: n, s: s,sc: sc, m: m, ci: ci, id: id, tab: tab, st: st } }}><i className="iconfont icon-jiangcheng"></i>奖罚</Link>
                                    <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 4, tc: tc, n: n, s: s,sc: sc, m: m, ci: ci, id: id, tab: tab, st: st } }}><i className="iconfont icon-gerenzonglan"></i>个人总览</Link>
                                </td>
                            </tr>
                        )
                    }
                    this.setState({
                        initData: data,
                        saveData: stuArrItem,
                        stuArr: stuArrItem,
                        stuNum: data.stunum,
                        school: sc,
                        major: m,
                        absence: data.absence == null ? 0 : data.absence,
                        average: data.average == null ? 0 : data.average,
                        averageLenovo: data.averageLenovo == null ? 0 : data.averageLenovo,
                        averageSchool: data.averageSchool == null ? 0 : data.averageSchool,
                        classID: this.props.classMaster2[location.hash.split("a=")[1].split("&")[0]].id,
                        term: this.props.classMaster2[location.hash.split("a=")[1].split("&")[0]].term
                    })
                }
            }
        }
    }
    autoScroll() {
        let _this = this;
        window.canAutoScroll = true;
        //只要滚动事件发生，就停止自动滚动定位方法的执行
        var timeout = null;
        var panel = $(window);
        panel.scroll(function(){
            if(timeout != null){
                window.clearTimeout(timeout);
            }
            window.canAutoScroll = false;
            //500ms后，假定认为停止滚动
            timeout = window.setTimeout(function(){
                window.canAutoScroll = true;
            },100);
        });
        this.timer = setInterval(
            () => {
                var scrollNum = $(window).scrollTop();
                if (scrollNum > 500) {
                    if (window.canAutoScroll) {
                        $(".CourseEvaluationBody_TopToCenter").fadeIn(1500);
                    } else {
                        $(".CourseEvaluationBody_TopToCenter").css({
                            display: "none"
                        });
                    }
                } else {
                    $(".CourseEvaluationBody_TopToCenter").css({
                        display: "none",
                    });
                }
            },
            100
        );
    }
    classTab() {
        return this.props.classMaster2.map((value, index) => {
            let Nowterm=value.term;
            if(this.state.term!=0){
                Nowterm=this.state.term
            }
            return (
                <span key={index} onClick={this.onClassTab.bind(this, index, Nowterm,value.term, value.termcount, value.id,value.schoolname, value.majorname)} className={this.state.tabID == index ? "Active" : ""}>{value.name}</span>
            );
        });
    }
    onClassTab(key,term,Initerm,termcount,id,schoolname,majorname) {
        this.getStudentlist(term,id,key);
        this.setState({
            tabID: key,
            classID: id,
            school: Base64.encodeURI(schoolname),
            major: Base64.encodeURI(majorname)
        });
        this.selectSemester(this.state.temptermnowCount,Initerm);
        if (history.pushState) {
            history.replaceState(null, '', location.href.split("?")[0] + '?a=' + key + '&s=' + term);
        }
    }
    getStudentlist(term,id,key) {
        let stuArrItem = [];
        $.llsajax({
            url: 'classmaster/studentlist',
            type: "POST",
            async: false,
            data: {
                classid: id,
                term: term
            },
            success: studentlistData => {
                let data = studentlistData.classMaster;
                if (studentlistData.classMaster.userList != null && studentlistData.classMaster.userList.length != 0) {
                    let len = data.userList.length;
                    if (len > 0) {
                        let c = Base64.encodeURI(data.name); // 班级
                        let ci = Base64.encodeURI(data.id); // 班级ID
                        let sc = Base64.encodeURI(data.schoolname); // 学校
                        let m = Base64.encodeURI(data.majorname); // 专业
                        let t = Base64.encodeURI(this.state.term); // 当前学期
                        let tc = Base64.encodeURI(data.termcount); // 总学期
                        let tab = Base64.encodeURI(key);
                        let st = term; // 当前学期
                        let data_id = null;
                        let n = '';
                        let s = '';
                        let id = '';
                        for (var i = 0; i < len; i++) {
                            data_id = Base64.encodeURI(data.userList[i].id);
                            n = Base64.encodeURI(data.userList[i].name);
                            s = Base64.encodeURI(data.userList[i].studentNo);
                            id = Base64.encodeURI(data.userList[i].id);
                            stuArrItem.push(
                                <tr key={i}>
                                    <td width="82px">{data.userList[i].name || '--'}</td>
                                    <td width="162px">{data.userList[i].studentNo || '--'}</td>
                                    <td width="71px">{data.userList[i].average || '--'}</td>
                                    <td width="69px">{data.userList[i].averageLenovo || '--'}</td>
                                    <td width="69px">{data.userList[i].averageSchool || '--'}</td>
                                    <td width="70px">{data.userList[i].absencescore || '--'}</td>
                                    <td width="73px">{data.userList[i].rewardscore || '--'}</td>
                                    <td width="73px">{data.userList[i].losework || '--'}</td>
                                    <td width="73px">{data.userList[i].interview || '--'}</td>
                                    <td width="300px">
                                        <span className="space"></span>
                                        <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 1, tc: tc, n: n, s: s,sc: sc, m: m, ci: ci, id: id, tab: tab, st: st  } }}><i className="iconfont icon-kaoqin"></i>考勤</Link>
                                        <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 2, tc: tc, n: n, s: s,sc: sc, m: m, ci: ci, id: id, tab: tab, st: st  } }}><i className="iconfont icon-fangtan"></i>访谈</Link>
                                        <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 3, tc: tc, n: n, s: s,sc: sc, m: m, ci: ci, id: id, tab: tab, st: st  } }}><i className="iconfont icon-jiangcheng"></i>奖罚</Link>
                                        <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 4, tc: tc, n: n, s: s,sc: sc, m: m, ci: ci, id: id, tab: tab, st: st  } }}><i className="iconfont icon-gerenzonglan"></i>个人总览</Link>
                                    </td>
                                </tr>
                            )
                        }
                        this.setState({
                            saveData: stuArrItem,
                            stuArr: stuArrItem,
                            stuNum: data.stunum,
                            school: sc,
                            major: m,
                            absence: data.absence == null ? 0 : data.absence,
                            average: data.average == null ? 0 : data.average,
                            averageLenovo: data.averageLenovo == null ? 0 : data.averageLenovo,
                            averageSchool: data.averageSchool == null ? 0 : data.averageSchool,
                            term: term
                        });
                    } 
                    document.getElementById('CourseEvaluationBody_input').value = ''
                } else {
                    this.setState({
                        saveData: [],
                        stuArr: [],
                        stuNum: 0,
                        school: "",
                        major: "",
                        absence: 0,
                        average: 0,
                        averageLenovo: 0,
                        averageSchool: 0,
                        term: term
                    });
                }
            }
        });
        document.getElementById("CourseEvaluationBody_select").selectedIndex = term - 1;
    }
    changeSelected(e) {
      
        this.getStudentlist(e.target.value,this.state.classID,this.state.tabID);
        if (history.pushState) {
            history.replaceState(null, '', location.href.split("?")[0] + '?a=' + this.state.tabID + '&s=' + e.target.value);
        }
    }
    searchHandle(e) {
        let list = this.state.saveData;
        if (!(list instanceof Array)) {
            return;
        }
        let len = list.length;
        let arr = [];
        let str = e.target.value;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                //如果字符串中不包含目标字符会返回-1
                if (list[i].props.children[0].props.children.indexOf(str) >= 0 || list[i].props.children[1].props.children.indexOf(str) >= 0) {
                    arr.push(list[i]);
                }
            }
        }
        this.setState({
            stuArr: arr,
        });
    }
    sortHandle(key,flag) {
        if (flag == false) {
            let list = this.state.saveData;
            if (!(list instanceof Array)) {
                return;
            }
            let len = list.length;
            let zeroarr = [];
            let numberarr = [];
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    if (list[i].props.children[key].props.children == "--") {
                        zeroarr.push(list[i])
                    } else {
                        numberarr.push(list[i])
                    }
                }
                let nlen = numberarr.length;
                for (var i = 0; i < nlen; i++) {//趟数
                    for (var j = 0; j < nlen - i; j++) {//每趟比较的次数
                        if (numberarr[j + 1] != undefined) {
                            if (numberarr[j].props.children[key].props.children < numberarr[j + 1].props.children[key].props.children) {
                                var temp = numberarr[j + 1];//定义一个变量保存小值
                                numberarr[j + 1] = numberarr[j];
                                numberarr[j] = temp;
                            }
                        }
                    }
                }
                for (var i = 0; i < zeroarr.length; i++) {
                    numberarr.push(zeroarr[i])
                }
            }
            this.setState({
                stuArr: numberarr,
                sortFlag1: true,
            })
        } else {
            let list = this.state.saveData;
            if (!(list instanceof Array)) {
                return;
            }
            let len = list.length;
            let zeroarr = [];
            let numberarr = [];
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    if (list[i].props.children[key].props.children == "--") {
                        zeroarr.push(list[i])
                    } else {
                        numberarr.push(list[i])
                    }
                }
                let nlen = numberarr.length;
                for (var i = 1; i < nlen; i++) {//趟数
                    for (var j = 0; j < nlen - i; j++) {//每趟比较的次数
                        if (numberarr[j + 1] != undefined) {
                            if (numberarr[j].props.children[key].props.children > numberarr[j + 1].props.children[key].props.children) {
                                var temp = numberarr[j + 1];//定义一个变量保存小值
                                numberarr[j + 1] = numberarr[j];
                                numberarr[j] = temp;
                            }
                        }
                    }
                }
                for (var i = 0; i < zeroarr.length; i++) {
                    numberarr.push(zeroarr[i])
                }
            }
            this.setState({
                stuArr: numberarr,
                sortFlag1: false,
            })
        }
    }
    sortHandleName(key,flag) {
        let list = this.state.saveData;
        if (flag === false) {
            if (!(list instanceof Array)) {
                return;
            }
            if (list.length > 0) {
                list.sort(function(a,b){
                    if(a.props.children[0].props.children === b.props.children[0].props.children){
                        return 0;
                    }else if (a.props.children[0].props.children > b.props.children[0].props.children) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            }
            this.setState({
                stuArr: list,
                sortFlag2: true,
            })
        } else {
            if (!(list instanceof Array)) {
                return;
            }
            if (list.length > 0) {
                list.sort(function(a,b){
                    if(a.props.children[0].props.children === b.props.children[0].props.children){
                        return 0;
                    }else if (a.props.children[0].props.children > b.props.children[0].props.children) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            }
            list.reverse();
            this.setState({
                stuArr: list,
                sortFlag2: false,
            })
        }
    }
    sortHandleStu(key, flag) {
        let list = this.state.saveData;
        if (flag === false) {
            if (!(list instanceof Array)) {
                return;
            }
            if (list.length > 0) {
                list.sort(function(a,b){
                    if(a.props.children[1].props.children === b.props.children[1].props.children){
                        return 0;
                    }else if (a.props.children[1].props.children > b.props.children[1].props.children) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            }
            this.setState({
                stuArr: list,
                sortFlag3: true,
            })
        } else {
            if (!(list instanceof Array)) {
                return;
            }
            if (list.length > 0) {
                list.sort(function(a,b){
                    if(a.props.children[1].props.children === b.props.children[1].props.children){
                        return 0;
                    }else if (a.props.children[1].props.children > b.props.children[1].props.children) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            }
            list.reverse();
            this.setState({
                stuArr: list,
                sortFlag3: false,
            })
        }
    }
    // compareFunc(param1,param2){
    //     //如果两个参数均为字符串类型
    //     if(typeof param1 == "string" && typeof param2 == "string"){
    //         return param1.localeCompare(param2);
    //     }
    //     //如果参数1为数字，参数2为字符串
    //     if(typeof param1 == "number" && typeof param2 == "string"){
    //         return -1;
    //     }
    //     //如果参数1为字符串，参数2为数字
    //     if(typeof param1 == "string" && typeof param2 == "number"){
    //         return 1;
    //     }
    //     //如果两个参数均为数字
    //     if(typeof param1 == "number" && typeof param2 == "number"){
    //         if(param1 > param2) return 1;
    //         if(param1 == param2) return 0;
    //         if(param1 < param2) return -1;
    //     }
    // }
    selectSemester(term,Initerm) {
        let semesterArr = [];
        this.state.semester.map((value,index) => {
            if (index + 1 <= term) {
                semesterArr.push(
                    <option value={index + 1} selected={term == index + 1 ? "selected" : "" } key={index}>&nbsp;{value}{Initerm == index + 1 ? "（本学期）" : ""}</option>
                );
            }
        });
        this.setState({
            semesterArr: semesterArr
        });
    }
    onTopTo() {
        $('html,body').animate({ scrollTop: 0 }, '600');
    }
    render() {
       
        return (
            <div className="CourseEvaluationBody_box">
                <div className="CourseEvaluationBody_boxC">
                    <div className="CourseEvaluationBody_wrap">
                        <div>
                            <h2>学员管理</h2>
                            <div className="CourseEvaluationBody_selectSemester">
                                    学期：
                                    <select name="" id="CourseEvaluationBody_select" onChange={this.changeSelected.bind(this)}>
                                        {this.state.semesterArr}
                                    </select>
                                
                            </div>
                        </div>
                        <div className="CourseEvaluationBody_tab">
                            {this.classTab()}
                        
                        </div>
                        <div className="CourseEvaluationBody_top">
                            <i className="iconfont icon-dingwei"></i>
                            <span className="CourseEvaluationBody_topSchool">学校：{Base64.decode(this.state.school) || "--"}</span>
                            <span className="CourseEvaluationBody_topMajor">专业：{Base64.decode(this.state.major) || "--"}</span>
                        </div>
                        <div className="CourseEvaluationBody_totalMsg">
                            <div className="CourseEvaluationBody_classNum">
                                <span><i>{this.state.stuNum}</i>人</span>
                                <p>班级人数</p>
                            </div>
                            <div className="CourseEvaluationBody_absenteeism">
                                <span><i>{this.state.absence}</i>次</span>
                                <p>总缺勤数</p>
                            </div>
                            <div className="CourseEvaluationBody_classAverage">
                                <span><i>{this.state.average}</i>分</span>
                                <p>综合成绩平均分</p>
                            </div>
                            <div className="CourseEvaluationBody_classLenovoAverage">
                                <span><i>{this.state.averageLenovo}</i>分</span>
                                <p>联想成绩平均分</p>
                            </div>
                            <div className="CourseEvaluationBody_classSchoolAverage">
                                <span><i>{this.state.averageSchool}</i>分</span>
                                <p>学校成绩平均分</p>
                            </div>
                        </div>
                        <div className="CourseEvaluationBody_center">
                            <div className="CourseEvaluationBody_msg">
                                <span className="CourseEvaluationBody_msgNum">该班当前共<i>{this.state.stuNum}</i>名学生</span>
                                <Link to={{ pathname: '/batchAttendance', query: { sc: this.state.school, m: this.state.major, a: this.state.tabID, s: this.state.term } }} className="CourseEvaluationBody_msgTool commonButton button"><i className="iconfont icon-lurukaoqin"></i>批量录入考勤</Link>
                            </div>
                            <div className="CourseEvaluationBody_tool">
                                <span>搜索学生:</span>
                                <input id="CourseEvaluationBody_input" className="CourseEvaluationBody_input" type="text" placeholder="按学生姓名学号搜素" onKeyUp={this.searchHandle.bind(this)} />
                            </div>
                            <table className="CourseEvaluationBody_table" width="100%">
                                <tr className="CourseEvaluationBody_title">
                                    <th width="82px">姓名<i className="CourseEvaluationBody_icon" onClick={this.sortHandleName.bind(this, 1,this.state.sortFlag2,)}><i className="iconfont icon-paixu_sheng"></i><i className="iconfont icon-paixu_jiang"></i></i></th>
                                    <th width="162px">学号<i className="CourseEvaluationBody_icon" onClick={this.sortHandleStu.bind(this, 1,this.state.sortFlag3,)}><i className="iconfont icon-paixu_sheng"></i><i className="iconfont icon-paixu_jiang"></i></i></th>
                                    <th width="71px">综合成绩<i className="CourseEvaluationBody_icon" onClick={this.sortHandle.bind(this, 2,this.state.sortFlag1)}><i className="iconfont icon-paixu_sheng"></i><i className="iconfont icon-paixu_jiang"></i></i></th>
                                    <th width="69px">联想成绩平均分</th>
                                    <th width="69px">学校成绩平均分</th>
                                    <th width="70px">考勤成绩</th>
                                    <th width="73px">奖罚得分</th>
                                    <th width="73px">缺勤次数</th>
                                    <th width="73px">访谈次数</th>
                                    <th width="300px">操作</th>
                                </tr>
                                <tbody>
                                    {this.state.stuArr}
                                    <div className={this.state.stuArr.length == 0 ? "CourseEvaluationBody_noAnswer" : "CourseEvaluationBody_noAnswerHide"}>当前没有符合该条件的数据</div>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="CourseEvaluationBody_topTo">
                        <span className="CourseEvaluationBody_TopToCenter" onClick={this.onTopTo.bind(this)}></span>
                    </div>
                </div>
            </div>
        );
    }
}