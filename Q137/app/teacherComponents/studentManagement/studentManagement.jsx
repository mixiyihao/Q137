import React, { Component } from 'react';
import $ from 'jquery';
import { hashHistory, Link } from 'react-router';
import './studentManagement.css';
import ThCmt from './teacherCommet/thCmt.jsx'
import ApplayProportion from './applayProportion/applayProportion.jsx';

export default class StudentManagement extends Component {
    constructor() {
        super();
        this.state = {
            classMaster: [], // 班级数据
            termArr: ['第一学期','第二学期','第三学期','第四学期','第五学期'],
            nowTerm: 0, // 当前学期
            term: 0, // 选择的学期
            classTabID: 0, // 班级切换索引
            termTabID: 0, // 学期切换索引
            schoolName: '', // 学校名字
            majorName: '', // 专业名字
            className: '', // 班级名字
            classID: 0, // 班级ID
            termcount: 5, // 班级总学期
            obj: [],
            saveData: [],
            stuArr: [],
            sortFlag1: false, // 名字排序标志位
            sortFlag2: false, // 学号排序标志位
            sortFlag3: false, // 综合成绩排序标志位
            sortFlag4: false, // 奖罚得分排序标志位
            sortFlag5: false, // 联想期末平均分排序标志位
            sortFlag6: false, // 学校成绩平均分排序标志位
            sortFlag7: false, // 考勤成绩排序标志位
            sortFlag8: false, // 缺勤次数	排序标志位
            sortFlag9: false, // 访谈次数排序标志位
            rewardSum: 0, // 奖罚总数
            isShow: false, // 申请成绩比重弹层控制
            checkwork: 0,
            examscore: 0,
            reward: 0,
            schooleval: 0,
            schoolscore: 0,
            tabScrollLen: 0, // tab滑动
            prewFlag: false, // 向左图标显示阀门
            nextFlag: false, // 向右图标显示阀门
        }
    }
    componentWillMount() {
        $.llsajax({
            url: 'classmaster/statistics',
            type: "POST",
            async: false,
            success: statisticsData => {
                this.setState({
                    classMaster: statisticsData.classMaster
                });
                if (statisticsData.classMaster.length !== 0) {
                    this.setState({
                        nowTerm: Number(statisticsData.classMaster[0].term),
                        termTabID: Number(statisticsData.classMaster[0].term - 1),
                        term: Number(statisticsData.classMaster[0].term),
                        schoolName: statisticsData.classMaster[0].schoolname,
                        majorName: statisticsData.classMaster[0].majorname,
                        className: statisticsData.classMaster[0].name,
                        classID: statisticsData.classMaster[0].id,
                        termcount: statisticsData.classMaster[0].termcount,
                        checkwork: statisticsData.classMaster[0].checkwork || 0,
                        examscore: statisticsData.classMaster[0].examscore || 0,
                        reward: statisticsData.classMaster[0].reward || 0,
                        schooleval: statisticsData.classMaster[0].schooleval || 0,
                        schoolscore: statisticsData.classMaster[0].schoolscore || 0,
                    });
                    if (statisticsData.classMaster.length >= 4) {
                        this.setState({
                            prewFlag: false, // 向左图标显示阀门
                            nextFlag: true, // 向右图标显示阀门
                        });
                    } else {
                        this.setState({
                            prewFlag: false, // 向左图标显示阀门
                            nextFlag: false, // 向右图标显示阀门
                        });
                    }
                }
            }
        });
    }
    componentDidMount() {
        this.autoScroll();
        let classNode = document.getElementById("studentManagement_title");
        $(window).scroll(function () {
            if ($(window).scrollTop() > 144) {
                classNode.style.position = 'fixed';
                classNode.style.top = "37px";
                classNode.style.left = "0px";
                classNode.style.zIndex = "50";
                classNode.style.boxShadow = "rgba(0, 0, 0, 0.072392) 0px 2px 5px";
                classNode.style.webkitBoxShadow = "rgba(0, 0, 0, 0.072392) 0px 2px 5px";
                classNode.style.msBoxShadow = "rgba(0, 0, 0, 0.072392) 0px 2px 5px";
            } else {
                classNode.style.position = '';
                classNode.style.boxShadow = '';
            }
        });
        if (window.location.hash.indexOf('?') > -1) {
            let classID = 0;
            if (this.state.classMaster.length > 0) {
                let classTabID = location.hash.split("a=")[1].split("&")[0];
                classID = this.state.classMaster[classTabID].id;
                this.setState({
                    checkwork: this.state.classMaster[classTabID].checkwork || 0,
                    examscore: this.state.classMaster[classTabID].examscore || 0,
                    reward: this.state.classMaster[classTabID].reward || 0,
                    schooleval: this.state.classMaster[classTabID].schooleval || 0,
                    schoolscore: this.state.classMaster[classTabID].schoolscore || 0,
                    classID: classID,
                    className: this.state.classMaster[classTabID].name,
                });
            }
            let term = Number(location.hash.split("s=")[1].split("&")[0]);
            this.getStudentInValScoreAjax(classID,term);
            this.setState({
                term: Number(location.hash.split("s=")[1].split("&")[0]),
                termTabID: term - 1,
                classTabID: Number(location.hash.split("a=")[1].split("&")[0]),
            });
        } else {
            this.getStudentInValScoreAjax(this.state.classID,this.state.nowTerm);
        }
    }
    autoScroll() {
        window.canAutoScroll = true;
        //只要滚动事件发生，就停止自动滚动定位方法的执行
        let timeout = null;
        let panel = $(window);
        panel.scroll(function(){
            if(timeout !== null){
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
                let scrollNum = $(window).scrollTop();
                if (scrollNum > 500) {
                    if (window.canAutoScroll) {
                        $(".studentManagement_topToCenter").fadeIn(1000);
                    } else {
                        $(".studentManagement_topToCenter").css({
                            display: "none"
                        });
                    }
                } else {
                    $(".studentManagement_topToCenter").css({
                        display: "none",
                    });
                }
            },
            100
        );
    }
    getStudentInValScoreAjax(id,term) {
        $.llsajax({
            url: 'integratedEva/studentInValScore',
            type: "POST",
            async: true,
            data: {
                classid: id,
                term: term
            },
            success: studentInValScoreData => {
                this.setState({
                    obj: studentInValScoreData.obj,
                });
                this._showData(studentInValScoreData.obj.list);
            }
        });
    }
    //
    _showData(data) {
        let len = data.length;
        if (len > 0) {
            let stuArrItem = [];
            let n = ''; // 学生姓名
            let s = ''; // 学生学号
            let id = ''; // 学生ID
            let c = Base64.encodeURI(this.state.className); // 班级
            let ci = Base64.encodeURI(this.state.classID); // 班级ID
            let t = Base64.encodeURI(this.state.nowTerm); // 当前学期
            let tc = Base64.encodeURI(this.state.termcount); // 总学期
            let sc = Base64.encodeURI(this.state.schoolName); // 学校
            let m = Base64.encodeURI(this.state.majorName); // 专业
            let tab = Base64.encodeURI(this.state.classTabID); // 班级切换索引
            let st = this.state.term; // 学期切换索引
            let rewardSum = 0;
            for (let i = 0; i < len; i++) {
                rewardSum = rewardSum + (data[i].reward !== null ? data[i].reward : 0);
                n = Base64.encodeURI(data[i].name);
                s = Base64.encodeURI(data[i].studentNo);
                id = Base64.encodeURI(data[i].userid);
                stuArrItem.push(
                    <tr key={i}>
                        <td className="studentManagement_tdNone">{data[i].shortname || '--'}</td>
                        <td>{data[i].name || '--'}</td>
                        <td>{data[i].studentNo || '--'}</td>
                        <td>{data[i].examscore !== null ? data[i].examscore : '--'}</td>
                        <td>{data[i].reward !== null ? data[i].reward : '--'}</td>
                        <td>{data[i].schoolscore !== null ? data[i].schoolscore : '--'}</td>
                        <td>{data[i].score !== null ? data[i].score : '--'}</td>
                        <td>{data[i].checkwork !== null ? data[i].checkwork : '--'}</td>
                        <td>{data[i].checkcount !== null ? data[i].checkcount : '--'}</td>
                        <td>{data[i].intercount !== null ? data[i].intercount : '--'}</td>
                        <td className={this.props.flag === "teacher" ? "studentManagement_teacher_td" : ""}>
                            <Link title="学员情况" to={{ pathname: '/managePage', query: { c: c, t: t, b: 4, tc: tc, n: n, s: s,sc: sc, m: m, ci: ci, id: id, tab: tab, st: st } }}>
                                <i className="iconfont icon-gerenzonglan">

                                </i>
                                学员情况
                            </Link>
                            <Link title="考勤" to={{ pathname: '/managePage', query: { c: c, t: t, b: 1, tc: tc, n: n, s: s,sc: sc, m: m, ci: ci, id: id, tab: tab, st: st } }} style={this.props.flag === "teacher" ? {display: "none"} : null}>
                                <i className="iconfont icon-kaoqin">

                                </i>
                                考勤
                            </Link>
                            <Link title="访谈" to={{ pathname: '/managePage', query: { c: c, t: t, b: 2, tc: tc, n: n, s: s,sc: sc, m: m, ci: ci, id: id, tab: tab, st: st } }}>
                                <i className="iconfont icon-fangtan">

                                </i>
                                访谈
                            </Link>
                            <Link title="奖罚" to={{ pathname: '/managePage', query: { c: c, t: t, b: 3, tc: tc, n: n, s: s,sc: sc, m: m, ci: ci, id: id, tab: tab, st: st } }}>
                                <i className="iconfont icon-jiangcheng">

                                </i>
                                奖罚
                            </Link>
                            <ThCmt id={data[i].userid} term={this.state.term} name={data[i].name || '--'} stuNo={data[i].studentNo || '--'} stuName={data[i].name || '--'}/>
                        </td>
                    </tr>
                )
            }
            rewardSum = Number(rewardSum / (this.state.obj.classcount || 0)).toFixed(2) === 0 ? 0 : Number(rewardSum / (this.state.obj.classcount || 0)).toFixed(2);
            this.setState({
                saveData: stuArrItem,
                stuArr: stuArrItem,
                rewardSum: rewardSum
            });
        } else {
            this.setState({
                saveData: [],
                stuArr: [],
                rewardSum: 0
            });
        }
    }
    _showClassName() {
        return this.state.classMaster.map((value,index) => {
            return (
                <span style={this.state.classMaster.length <= 2 ? {width: "550px"} : {width: "255px"}} key={index} className={this.state.classTabID === index ? "Active studentManagement_titleWrap_span" : "studentManagement_titleWrap_span"} onClick={this.onClassClick.bind(this,index,value.id)}>{value.name}</span>
            );
        });
    }
    onClassClick(index,classID) {
        this.setState({
            classTabID: index,
            classID: classID
        });
        if (this.state.classTabID !== index) {
            document.getElementById("studentManagement_search").value = "";
            this.getStudentInValScoreAjax(classID,this.state.term);
            if (history.pushState) {
                history.replaceState(null, '', location.href.split("?")[0] + '?a=' + index + '&s=' + this.state.term);
            }
            this.setState({
                nowTerm: Number(this.state.classMaster[index].term),
                schoolName: this.state.classMaster[index].schoolname,
                majorName: this.state.classMaster[index].majorname,
                className: this.state.classMaster[index].name,
                termcount: this.state.classMaster[index].termcount,
                checkwork: this.state.classMaster[index].checkwork,
                examscore: this.state.classMaster[index].examscore,
                reward: this.state.classMaster[index].reward,
                schooleval: this.state.classMaster[index].schooleval,
                schoolscore: this.state.classMaster[index].schoolscore,
            });
        }
    }
    _showTermData() {
        return this.state.termArr.map((value,index) => {
            if (this.state.nowTerm === null) {
                return (
                    <span key={index} className={this.state.termTabID === index  ? "Active" : ""} onClick={this.onTermClick.bind(this,index)}>{this.state.nowTerm === index + 1 ? value + "(本学期)" : value}</span>
                );
            } else {
                if (index + 1 <= this.state.nowTerm) {
                    return (
                        <span key={index} className={this.state.termTabID === index  ? "Active" : ""} onClick={this.onTermClick.bind(this,index)}>{this.state.nowTerm === index + 1 ? value + "(本学期)" : value}</span>
                    );
                }
            }
        });
    }
    onTermClick(index) {
        this.setState({
            termTabID: index,
            term: index + 1
        });
        if (this.state.termTabID !== index) {
            document.getElementById("studentManagement_search").value = "";
            this.getStudentInValScoreAjax(this.state.classID,index + 1);
            if (history.pushState) {
                history.replaceState(null, '', location.href.split("?")[0] + '?a=' + this.state.classTabID + '&s=' + (index + 1));
            }
        }
    }
    // 姓名、学号排序
    sortHandleName(key,flag) {
        let list = this.state.saveData;
        if (flag === false) {
            if (!(list instanceof Array)) {
                return;
            }
            if (list.length > 0) {
                list.sort(function(a,b){
                    if(a.props.children[key].props.children === b.props.children[key].props.children){
                        return 0;
                    }else if (a.props.children[key].props.children > b.props.children[key].props.children) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            }
            this.setState({
                stuArr: list,
            });
            if (key === 0) {
                this.setState({
                    sortFlag1: true,
                });
            } else {
                this.setState({
                    sortFlag2: true,
                });
            }
        } else {
            if (!(list instanceof Array)) {
                return;
            }
            if (list.length > 0) {
                list.sort(function(a,b){
                    if(a.props.children[key].props.children === b.props.children[key].props.children){
                        return 0;
                    }else if (a.props.children[key].props.children > b.props.children[key].props.children) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            }
            list.reverse();
            this.setState({
                stuArr: list,
            });
            if (key === 0) {
                this.setState({
                    sortFlag1: false,
                });
            } else {
                this.setState({
                    sortFlag2: false,
                });
            }
        }
    }
    // 成绩排序
    sortHandle(key,flag) {
        if (flag === false) {
            let list = this.state.saveData;
            if (!(list instanceof Array)) {
                return;
            }
            let len = list.length;
            let zeroarr = [];
            let numberarr = [];
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    if (list[i].props.children[key].props.children === "--") {
                        zeroarr.push(list[i])
                    } else {
                        numberarr.push(list[i])
                    }
                }
                let nlen = numberarr.length;
                for (let i = 0; i < nlen; i++) {//趟数
                    for (let j = 0; j < nlen - i; j++) {//每趟比较的次数
                        if (numberarr[j + 1] !== undefined) {
                            if (numberarr[j].props.children[key].props.children < numberarr[j + 1].props.children[key].props.children) {
                                let temp = numberarr[j + 1];//定义一个变量保存小值
                                numberarr[j + 1] = numberarr[j];
                                numberarr[j] = temp;
                            }
                        }
                    }
                }
                for (let i = 0; i < zeroarr.length; i++) {
                    numberarr.push(zeroarr[i])
                }
            }
            if (key === 3) {
                this.setState({
                    sortFlag3: true,
                })
            } else if (key === 4) {
                this.setState({
                    sortFlag4: true,
                })
            } else if (key === 5) {
                this.setState({
                    sortFlag5: true,
                })
            } else if (key === 6) {
                this.setState({
                    sortFlag6: true,
                })
            } else if (key === 7) {
                this.setState({
                    sortFlag7: true,
                })
            } else if (key === 8) {
                this.setState({
                    sortFlag8: true,
                })
            } else if (key === 9) {
                this.setState({
                    sortFlag9: true,
                })
            }
            this.setState({
                stuArr: numberarr,
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
                for (let i = 0; i < len; i++) {
                    if (list[i].props.children[key].props.children === "--") {
                        zeroarr.push(list[i])
                    } else {
                        numberarr.push(list[i])
                    }
                }
                let nlen = numberarr.length;
                for (let i = 1; i < nlen; i++) {//趟数
                    for (let j = 0; j < nlen - i; j++) {//每趟比较的次数
                        if (numberarr[j + 1] !== undefined) {
                            if (numberarr[j].props.children[key].props.children > numberarr[j + 1].props.children[key].props.children) {
                                let temp = numberarr[j + 1];//定义一个变量保存小值
                                numberarr[j + 1] = numberarr[j];
                                numberarr[j] = temp;
                            }
                        }
                    }
                }
                for (let i = 0; i < zeroarr.length; i++) {
                    numberarr.push(zeroarr[i])
                }
            }
            if (key === 3) {
                this.setState({
                    sortFlag3: false,
                })
            } else if (key === 4) {
                this.setState({
                    sortFlag4: false,
                })
            } else if (key === 5) {
                this.setState({
                    sortFlag5: false,
                })
            } else if (key === 6) {
                this.setState({
                    sortFlag6: false,
                })
            } else if (key === 7) {
                this.setState({
                    sortFlag7: false,
                })
            } else if (key === 8) {
                this.setState({
                    sortFlag8: false,
                })
            } else if (key === 9) {
                this.setState({
                    sortFlag9: false,
                })
            }
            this.setState({
                stuArr: numberarr,
            })
        }
    }
    // 搜索功能
    searchHandle(e) {
        let list = this.state.saveData;
        if (!(list instanceof Array)) {
            return;
        }
        let len = list.length;
        let arr = [];
        let str = e.target.value;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                //如果字符串中不包含目标字符会返回-1
                if (list[i].props.children[1].props.children.indexOf(str) >= 0 || list[i].props.children[2].props.children.indexOf(str) >= 0) {
                    arr.push(list[i]);
                }
            }
        }
        this.setState({
            stuArr: arr,
        });
    }
    // 跳转到批量录入奖罚
    onLinkToImport(path) {
        if (path === '/ImportReward') {
            hashHistory.push({
                pathname: path,
                query: {
                    t: Base64.encodeURI(this.state.term), // 选择的学期
                    c: Base64.encodeURI(this.state.classID), // 选择的班级ID
                    tab: Base64.encodeURI(this.state.classTabID) // 班级切换索引
                }
            });
        } else if (path === '/batchAttendance') {
            console.log(this.state.classID);
            hashHistory.push({
                pathname: path,
                query: {
                    s: this.state.term, // 选择的学期
                    a: this.state.classTabID, // 选择的班级
                    sc: Base64.encodeURI(this.state.schoolName), // 学校名字
                    m: Base64.encodeURI(this.state.majorName), // 专业名字,
                    c: Base64.encodeURI(this.state.classID), // 选择的班级ID
                    cn: Base64.encodeURI(this.state.className), // 班级名字
                    nt: Base64.encodeURI(this.state.nowTerm), // 当前学期
                }
            });
        } else if (path === '/batchCommentMain') {
            hashHistory.push({
                pathname: path,
                query: {
                    s: this.state.term, // 选择的学期
                    a: this.state.classTabID, // 选择的班级
                    c: Base64.encodeURI(this.state.classID), // 选择的班级ID
                    sc: Base64.encodeURI(this.state.schoolName), // 学校名字
                    m: Base64.encodeURI(this.state.majorName), // 专业名字,
                    cn: Base64.encodeURI(this.state.className), // 班级名字
                }
            });
        }
    }
    // 比重弹层显示
    onApplayShow() {
        this.setState({
            isShow: true,
        });
    }
    onApplayHide() {
        this.setState({
            isShow: false,
        });
    }
    // 回到顶部
    onTopTo() {
        $('html,body').animate({ scrollTop: 0 }, '600');
    }
    // 标签左滑动
    onTabPrew () {
        // let classLen = this.state.classMaster.length;
        // if (classLen <= 4 || this.state.prewFlag === false) {
        //     return false;
        // }
        // let classNum = this.state.tabScrollLen;
        // let nums = Number(classNum) + 2;
        // if (nums < classNum && nums !== 0) {
        //     this.setState({
        //         nextFlag: true,
        //     });
        // }
        // if (nums <= 0) {
        //     nums = 0;
        //     this.setState({
        //         prewFlag: false,
        //     });
        // }
        // let dis = -1 * nums * 255;
        // this.refs.studentManagement_titleWrap_scroll.style.transform = "translate3d(" + dis + "px, 0px, 0px)";
        // this.setState({
        //     tabScrollLen: nums
        // })
        let classLen = this.state.classMaster.length;
        if (classLen <= 4 || this.state.prewFlag === false) {
            return false;
        }
        let classNum = this.state.tabScrollLen;
        let nums = classNum - 2;
        if (nums < classNum && nums >= 0) {
            this.setState({
                nextFlag: true,
            });
        }
        if (nums <= 0) {
            nums = 0;
            this.setState({
                prewFlag: false,
            });
        }
        let dis = -1 * nums * 255;
        this.refs.studentManagement_titleWrap_scroll.style.transform = "translate3d(" + dis + "px, 0px, 0px)";
        this.setState({
            tabScrollLen: nums
        })
    }
    // 标签右滑动
    onTabNext () {
        // let classLen = this.state.classMaster.length;
        // if (classLen <= 4 || this.state.nextFlag === false) {
        //     return false;
        // }
        // let classNum = this.state.tabScrollLen;
        // let nums = classNum - 2;
        // if (nums > 1) {
        //     this.setState({
        //         prewFlag: true,
        //     });
        // }
        // if (nums > classLen - 4) {
        //     nums = classLen - 4;
        //     this.setState({
        //         nextFlag: false,
        //     });
        // }
        // let dis = -1 * nums * 255;
        // this.refs.studentManagement_titleWrap_scroll.style.transform = "translate3d(" + dis + "px, 0px, 0px)";
        // this.setState({
        //     tabScrollLen: nums
        // })
        let classLen = this.state.classMaster.length;
        if (classLen <= 4 || this.state.nextFlag === false) {
            return false;
        }
        let classNum = this.state.tabScrollLen;
        let nums = Number(classNum) + 2;
        if (nums > 1) {
            this.setState({
                prewFlag: true,
            });
        }
        if (nums > classLen - 4) {
            nums = classLen - 4;
            this.setState({
                nextFlag: false,
            });
        }
        let dis = -1 * nums * 255;
        this.refs.studentManagement_titleWrap_scroll.style.transform = "translate3d(" + dis + "px, 0px, 0px)";
        this.setState({
            tabScrollLen: nums
        })
    }
    render() {
        return (
            <div className="studentManagement_box">
                <div className="studentManagement_titleBox">
                    <div className="studentManagement_title" id="studentManagement_title">
                        <div className="studentManagement_titleWrap">
                            <div className="studentManagement_titleContainer">
                                <div className="studentManagement_titleWrap_scrollCen" ref="studentManagement_titleWrap_scrollCen">
                                    <div className="studentManagement_titleWrap_scroll" ref="studentManagement_titleWrap_scroll">
                                        {this._showClassName()}
                                    </div>
                                </div>
                                <span className={this.state.prewFlag ? "studentManagement_prew studentManagement_tabSpan iconfont icon-icon-test3" : "studentManagement_prew studentManagement_tabSpan iconfont icon-icon-test3 studentManagement_prewNone"} onClick={this.onTabPrew.bind(this)}>

                                </span>
                                <span className={this.state.nextFlag ? "studentManagement_next studentManagement_tabSpan iconfont icon-icon-test2" : "studentManagement_next studentManagement_tabSpan iconfont icon-icon-test2 studentManagement_nextNone"} onClick={this.onTabNext.bind(this)}>

                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="studentManagement_centerBox">
                    <div className="studentManagement_center">
                        <h2>学员管理</h2>
                        <div className={this.props.flag === 'master' ? "studentManagement_apply button commonButton" : "studentManagement_applyHide"} onClick={this.onApplayShow.bind(this)}>
                            <i className="studentManagement_apply_icon iconfont icon-fasong">

                            </i>
                            设置考核项目比重
                        </div>
                        <div className="studentManagement_top">
                            <i className="iconfont icon-dingwei">

                            </i>
                            <span className="studentManagement_topSchool">学校：{this.state.schoolName || '--'}</span>
                            <span className="studentManagement_topMajor">专业：{this.state.majorName || '--'}</span>
                            <span className="studentManagement_topClass">班级：{this.state.className || '--'}</span>
                        </div>
                        <div className={this.state.nowTerm !== 0 ? "studentManagement_term" : "studentManagement_termNone"}>
                            {this._showTermData()}
                        </div>
                        <div className="studentManagement_totalMsg">
                            <div className="studentManagement_classNum">
                                <span><i>{this.state.obj.length === 0 ? "--" : this.state.obj.classcount}</i>人</span>
                                <p>班级人数</p>
                            </div>
                            <div className="studentManagement_classLenovoAverage">
                                <span><i>{this.state.obj.lenovoavg === 0 ? "--" : this.state.obj.lenovoavg}</i>分</span>
                                <p>联想成绩平均分</p>
                            </div>
                            <div className="studentManagement_reward">
                                <span><i>{this.state.obj.rewardSum === 0 ? "--" : this.state.rewardSum}</i>分</span>
                                <p>奖罚成绩平均分</p>
                            </div>
                            <div className="studentManagement_classSchoolAverage">
                                <span><i>{this.state.obj.schoolavg === 0 ? "--" : this.state.obj.schoolavg}</i>分</span>
                                <p>学校成绩平均分</p>
                            </div>
                            <div className="studentManagement_classAverage">
                                <span><i>{this.state.obj.classavg === 0 ? "--" : this.state.obj.classavg}</i>分</span>
                                <p>综合成绩平均分</p>
                            </div>
                            <div className="studentManagement_absenteeism">
                                <span><i>{this.state.obj.checkcount === 0 ? "--" : this.state.obj.checkcount}</i>次</span>
                                <p>总缺勤数</p>
                            </div>
                        </div>
                        <div className="studentManagement_content">
                            <div className="studentManagement_msg">
                                <div className="studentManagement_searchBox">
                                    <span className="studentManagement_searchLabel">搜索：</span>
                                    <input type="text" id="studentManagement_search" className="studentManagement_search" placeholder="按学生姓名或学号搜索" onKeyUp={this.searchHandle.bind(this)}/>
                                    <span className="studentManagement_searchButton">搜索</span>
                                </div>
                                {
                                    this.props.flag === "teacher"
                                        ?
                                        <div>
                                            <a className="studentManagement_msgTool commonButton button" onClick={this.onLinkToImport.bind(this,'/ImportReward')}>
                                                <i className="iconfont icon-lurukaoqin">

                                                </i>
                                                批量录入奖罚
                                            </a>
                                            <a className="studentManagement_msgTool commonButton button" onClick={this.onLinkToImport.bind(this,'/batchCommentMain')}>
                                                <i className="iconfont icon-pingjia">

                                                </i>
                                                批量录入评语
                                            </a>
                                        </div>

                                        :
                                        <div>
                                            <a className="studentManagement_msgTool commonButton button" onClick={this.onLinkToImport.bind(this,'/batchAttendance')}>
                                                <i className="iconfont icon-lurukaoqin">

                                                </i>
                                                批量录入考勤
                                            </a>
                                            <a className="studentManagement_msgTool commonButton button" onClick={this.onLinkToImport.bind(this,'/ImportReward')}>
                                                <i className="iconfont icon-jiangcheng">

                                                </i>
                                                批量录入奖罚
                                            </a>
                                            <a className="studentManagement_msgTool commonButton button" onClick={this.onLinkToImport.bind(this,'/batchCommentMain')}>
                                                <i className="iconfont icon-pingjia">

                                                </i>
                                                批量录入评语
                                            </a>
                                        </div>
                                }

                            </div>
                            <table className="studentManagement_table" width="100%">
                                <thead>
                                    <tr className="studentManagement_titleTb">
                                        <th width="82px">
                                            姓名
                                            <i className="studentManagement_icon" onClick={this.sortHandleName.bind(this, 0,this.state.sortFlag1,)}>
                                                <i className="iconfont icon-paixu_sheng">

                                                </i>
                                                <i className="iconfont icon-paixu_jiang">

                                                </i>
                                            </i>
                                        </th>
                                        <th width="162px">
                                            学号
                                            <i className="studentManagement_icon" onClick={this.sortHandleName.bind(this, 2,this.state.sortFlag2,)}>
                                                <i className="iconfont icon-paixu_sheng">

                                                </i>
                                                <i className="iconfont icon-paixu_jiang">

                                                </i>
                                            </i>
                                        </th>
                                        <th width="81px">
                                            <span className="lenovo">联想成绩平均分</span>
                                            <i className="studentManagement_icon comprehensive" onClick={this.sortHandle.bind(this, 3,this.state.sortFlag3)}>
                                                <i className="iconfont icon-paixu_sheng">

                                                </i>
                                                <i className="iconfont icon-paixu_jiang">

                                                </i>
                                            </i>
                                        </th>
                                        <th width="66px">
                                            <span className="comprehensive">奖罚得分</span>
                                            <i className="studentManagement_icon comprehensive" onClick={this.sortHandle.bind(this, 4,this.state.sortFlag4)}>
                                                <i className="iconfont icon-paixu_sheng">

                                                </i>
                                                <i className="iconfont icon-paixu_jiang">

                                                </i>
                                            </i>
                                        </th>
                                        <th width="81px">
                                            <span className="lenovo">学校成绩平均分</span>
                                            <i className="studentManagement_icon comprehensive" onClick={this.sortHandle.bind(this, 5,this.state.sortFlag5)}>
                                                <i className="iconfont icon-paixu_sheng">

                                                </i>
                                                <i className="iconfont icon-paixu_jiang">

                                                </i>
                                            </i>
                                        </th>
                                        <th width="66px">
                                            <span className="comprehensive">综合成绩</span>
                                            <i className="studentManagement_icon comprehensive" onClick={this.sortHandle.bind(this, 6,this.state.sortFlag6)}>
                                                <i className="iconfont icon-paixu_sheng">

                                                </i>
                                                <i className="iconfont icon-paixu_jiang">

                                                </i>
                                            </i>
                                        </th>
                                        <th width="66px">
                                            <span className="comprehensive">考勤成绩</span>
                                            <i className="studentManagement_icon comprehensive" onClick={this.sortHandle.bind(this, 7,this.state.sortFlag7)}>
                                                <i className="iconfont icon-paixu_sheng">

                                                </i>
                                                <i className="iconfont icon-paixu_jiang">

                                                </i>
                                            </i>
                                        </th>
                                        <th width="66px">
                                            <span className="comprehensive">缺勤次数</span>
                                            <i className="studentManagement_icon comprehensive" onClick={this.sortHandle.bind(this, 8,this.state.sortFlag8)}>
                                                <i className="iconfont icon-paixu_sheng">

                                                </i>
                                                <i className="iconfont icon-paixu_jiang">

                                                </i>
                                            </i>
                                        </th>
                                        <th width="66px">
                                            <span className="comprehensive">访谈次数</span>
                                            <i className="studentManagement_icon comprehensive" onClick={this.sortHandle.bind(this, 9,this.state.sortFlag9)}>
                                                <i className="iconfont icon-paixu_sheng">

                                                </i>
                                                <i className="iconfont icon-paixu_jiang">

                                                </i>
                                            </i>
                                        </th>
                                        <th width="306px">操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.stuArr}
                                </tbody>
                            </table>
                            <div className={this.state.stuArr.length === 0 ? "studentManagement_noAnswer" : "studentManagement_noAnswerHide"}>当前没有符合该条件的数据</div>
                        </div>
                    </div>
                    <div className="studentManagement_topTo">
                        <span className="studentManagement_topToCenter" onClick={this.onTopTo.bind(this)}>

                        </span>
                    </div>
                </div>
                {
                    this.state.isShow
                        ?
                        <ApplayProportion
                            schoolName={this.state.schoolName}
                            majorName={this.state.majorName}
                            className={this.state.className}
                            onApplayHide={this.onApplayHide.bind(this)}
                            classID={this.state.classID}
                            checkwork={this.state.checkwork}
                            examscore={this.state.examscore}
                            reward={this.state.reward}
                            schooleval={this.state.schooleval}
                            schoolscore={this.state.schoolscore}
                        />
                        :
                        null
                }

            </div>
        );
    }
    componentWillUnmount() {
        $(window).off('scroll');
    }
}