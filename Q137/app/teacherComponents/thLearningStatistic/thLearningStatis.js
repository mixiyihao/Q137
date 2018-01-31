import React from 'react';
import {
    Link, hashHistory
} from 'react-router';
import $ from 'jquery';
import './thLearningStatis.css'
import url from '../../controller/url.js';



export default class ThLearningStatis extends React.Component {
    constructor() {
        super();
        this.state = {
            initData: [],//初始数据
            saveData: [], //保存信息
            stuArr: [], //渲染数组
            tabActive: 0,
            stuNum: 0,
            Browser: -1,
            classID: -1,
            showhidecontrol: false,
            sucOrErr: false,//保存成功或失败
            disSucOrErr: false,//是否显示
            fsVal: '',
            cgScoreId: 0,
            maxSc: 0,//max
            minSc: 0,//min
            doNotSave: false,//值变化是否对保存产生影响
            type: 2,//是否超过允许输入的范围
            sortHandle: true,//正序为true 倒序为false
            nowTerm: '1',//当前学期
            createTerm: [],//生成学期
            terms: '',//选择的学期
            index: 0,//选择的班级index
            // tabId
            showDialog: false,
            majorname: '--',//当前班级的专业
            teacherName: '',
        }
    }
    searchHandle(e) {
        var list = this.state.saveData;
        if (!(list instanceof Array)) {
            return;
        }
        var len = list.length;
        var arr = [];
        var str = e.target.value;
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
        })
    }
    onGool() {
        let userAgent = navigator.userAgent;
        let isEdge = userAgent.indexOf("Edge") > -1;
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            this.setState({
                Browser: "1"
            });
        }
        else if (isEdge) {
            this.setState({
                Browser: "1"
            });
        }
        else {
            this.setState({
                Browser: "2"
            });
        }
    }
    changeTabHandle(e, index) {
        var index = e.target.getAttribute('data-key')
        this.setState({
            index: index,
        })
        var stuArrItem = []
        var data = this.state.initData;
        if (data != null) {
            this.setState({
                classID: data[index].id,
                nowTerm: data[index].nowTerm || '1'
            })
            var len = data[index].userList.length;
            if (len > 0) {
                let data_id = null;

                let n = ''
                let leval = '--'
                for (var i = 0; i < len; i++) {
                    data_id = Base64.encodeURI(data[index].userList[i].id);
                    n = Base64.encodeURI(data[index].userList[i].name)
                    let s = '';
                    // let id = '';
                    let c = Base64.encodeURI(data[index].name); // 班级
                    let ci = Base64.encodeURI(data[index].id); // 班级ID
                    let t = Base64.encodeURI(data[index].nowTerm); // 当前学期
                    let tc = Base64.encodeURI(data[index].termNum); // 总学期
                    let sc = Base64.encodeURI(data[index].schoolname); // 学校
                    let m = Base64.encodeURI(data[index].majorname); // 专业
                    let tab = Base64.encodeURI(this.state.index);
                    let st = this.state.terms;
                    stuArrItem.push(<tr key={index + 'tr' + Math.random()}><td data={data[index].userList[i].id}>{data[index].userList[i].name || '--'}</td>
                        <td >{data[index].userList[i].studentNo || '--'}</td>
                        {/*<td>{data[index].majorname != null ? data[index].majorname : '--'}</td>*/}
                        <td data={data[index].userList[i].compscore}>{this.translevalHandle(data[index].userList[i].compscore)}</td>
                        <td>{Number(data[index].userList[i].evaluate) + Number(data[index].userList[i].calpscore)}</td>
                        <td>
                            <div className="someAction">
                              
                                <a  onClick={this.linkTo.bind(this, c, t, 1, tc, n, s, sc, m, ci, data_id, tab, st)}>
                                    <i className="iconfont icon-kaoqin"></i>考勤
                                </a>
                                <a  onClick={this.linkTo.bind(this, c, t, 2, tc, n, s, sc, m, ci, data_id, tab, st)}>
                                    <i className="iconfont icon-fangtan"></i>访谈
                                </a>
                                <a  onClick={this.linkTo.bind(this, c, t, 3, tc, n, s, sc, m, ci, data_id, tab, st)}>
                                    <i className="iconfont icon-jiangcheng"></i>奖罚
                                </a>
                                <a  onClick={this.linkTo.bind(this, c, t, 4, tc, n, s, sc, m, ci, data_id, tab, st)}>
                                    <i className="iconfont icon-gerenzonglan"></i>个人总览
                                </a>
                                {/*<Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 1, tc: tc, n: n, s: s, sc: sc, m: m, ci: ci, id: data_id, tab: tab, st: st } }}><i className="iconfont icon-kaoqin"></i>考勤</Link>
                                <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 2, tc: tc, n: n, s: s, sc: sc, m: m, ci: ci, id: data_id, tab: tab, st: st } }}><i className="iconfont icon-fangtan"></i>访谈</Link>
                                <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 3, tc: tc, n: n, s: s, sc: sc, m: m, ci: ci, id: data_id, tab: tab, st: st } }}><i className="iconfont icon-jiangcheng"></i>奖罚</Link>
                                <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 4, tc: tc, n: n, s: s, sc: sc, m: m, ci: ci, id: data_id, tab: tab, st: st } }}><i className="iconfont icon-gerenzonglan"></i>个人总览</Link>*/}
                                {/*<Link to={{ pathname: '/StatisticsForm', query: { id: data_id, n: n, s: this.state.terms, t: data[index].nowTerm } }} data-id={data[index].userList[i].id}><i className="iconfont icon-xuexitongjichakanxiangqing"></i>查看详情</Link>*/}
                            </div>
                        </td></tr>)
                }
            }
            document.getElementById('thStaSearch').value = ''
        }
        this.setState({
            tabActive: index,
            saveData: stuArrItem,
            stuArr: stuArrItem,
            stuNum: data[index].stunum,
            majorname: data[index].majorname
        })
    }
    translevalHandle(num) {
        var leval = ''
        switch (num) {
            case 0:
                leval = '--';
                break;
            case 1:
                leval = 'A+';
                break;
            case 2:
                leval = 'A';
                break;
            case 3:
                leval = 'B';
                break;
            case 4:
                leval = 'C';
                break;
        }
        return leval;
    }
    componentWillMount() {
        this.onGool()
        var stuArrItem = []
        var data = this.props.ClData;

        $.llsajax({
            url: "/Luser/meansLuser",

            type: "post",
            async:false,
            success: datas => {
                //console.log(datas)
                this.setState({
                    teacherName: datas.user.name
                })
                var name = datas.user.name
                if (data != null) {
                    this.setState({
                        classID: data[0].id,
                        nowTerm: data[0].nowTerm || '1',
                        terms: data[0].nowTerm,
                    })
                    this.createTermHandle(data[0].nowTerm)
                    var nowT = data[0].nowTerm
                    var len = data[0].userList.length;
                    // //console.log(data)
                    if (len > 0) {
                        let data_id = null;
                        let n = ''
                        for (var i = 0; i < len; i++) {
                            data_id = Base64.encodeURI(data[0].userList[i].id);
                            n = Base64.encodeURI(data[0].userList[i].name)
                            let s = '';
                            // let id = '';
                            let c = Base64.encodeURI(data[0].name); // 班级
                            let ci = Base64.encodeURI(data[0].id); // 班级ID
                            let t = Base64.encodeURI(data[0].nowTerm); // 当前学期
                            let tc = Base64.encodeURI(data[0].termNum); // 总学期
                            let sc = Base64.encodeURI(data[0].schoolname); // 学校
                            let m = Base64.encodeURI(data[0].majorname); // 专业
                            let tab = Base64.encodeURI(this.state.index);
                            let st = data[0].nowTerm;
                            stuArrItem.push(<tr key={'tr' + Date() + Math.random(0, 1)}><td data={data[0].userList[i].id}>{data[0].userList[i].name || '--'}</td>
                                <td>{data[0].userList[i].studentNo || '--'}</td>
                                {/*<td>{data[0].majorname != null ? data[0].majorname : '--'}</td>*/}
                                <td data={data[0].userList[i].compscore} >{this.translevalHandle(data[0].userList[i].compscore)}</td>
                                <td>{Number(data[0].userList[i].evaluate) + Number(data[0].userList[i].calpscore)}</td>
                                <td>
                                    <div className="someAction">
                                    
                                        <a  onClick={this.linkTo.bind(this, c, t, 1, tc, n, s, sc, m, ci, data_id, tab, st)}>
                                            <i className="iconfont icon-kaoqin"></i>考勤
                                </a>
                                        <a  onClick={this.linkTo.bind(this, c, t, 2, tc, n, s, sc, m, ci, data_id, tab, st)}>
                                            <i className="iconfont icon-fangtan"></i>访谈
                                </a>
                                        <a  onClick={this.linkTo.bind(this, c, t, 3, tc, n, s, sc, m, ci, data_id, tab, st)}>
                                            <i className="iconfont icon-jiangcheng"></i>奖罚
                                </a>
                                        <a  onClick={this.linkTo.bind(this, c, t, 4, tc, n, s, sc, m, ci, data_id, tab, st)}>
                                            <i className="iconfont icon-gerenzonglan"></i>个人总览
                                </a>
                                        {/*<Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 1, tc: tc, n: n, s: s, sc: sc, m: m, ci: ci, id: data_id, tab: tab, st: st } }}><i className="iconfont icon-kaoqin"></i>考勤</Link>
                                <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 2, tc: tc, n: n, s: s, sc: sc, m: m, ci: ci, id: data_id, tab: tab, st: st } }}><i className="iconfont icon-fangtan"></i>访谈</Link>
                                <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 3, tc: tc, n: n, s: s, sc: sc, m: m, ci: ci, id: data_id, tab: tab, st: st } }}><i className="iconfont icon-jiangcheng"></i>奖罚</Link>
                                <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 4, tc: tc, n: n, s: s, sc: sc, m: m, ci: ci, id: data_id, tab: tab, st: st } }}><i className="iconfont icon-gerenzonglan"></i>个人总览</Link>*/}
                                        {/*<Link to={{ pathname: '/StatisticsForm', query: { id: data_id, n: n, t: nowT, st: nowT } }} data-id={data[0].userList[i].id}><i className="iconfont icon-xuexitongjichakanxiangqing"></i>查看详情</Link>*/}
                                    </div>
                                </td></tr>)
                        }
                    }
                    this.setState({
                        initData: data,
                        saveData: stuArrItem,
                        stuArr: stuArrItem,
                        stuNum: data[0].stunum,
                        majorname: data[0].majorname
                    })
                }
            }
        })
    }

    // sort
    sortUpHandle() {
        var list = this.state.saveData;
        if (!(list instanceof Array)) {
            return;
        }
        var len = list.length;
        var zeroarr = [];
        var numberarr = [];
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                if (list[i].props.children[3].props.data == 0) {
                    zeroarr.push(list[i])
                } else {
                    numberarr.push(list[i])
                }
            }
            var nlen = numberarr.length;
            for (var i = 1; i < nlen; i++) {//趟数
                for (var j = 0; j < nlen - i; j++) {//每趟比较的次数
                    if (numberarr[j + 1] != undefined) {
                        if (numberarr[j].props.children[3].props.data > numberarr[j + 1].props.children[3].props.data) {
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
        var sortHandle = this.state.sortHandle
        if (sortHandle == true) {
            this.setState({
                stuArr: numberarr,
                sortHandle: false,
            })
        } else if (sortHandle == false) {
            numberarr.reverse();
            this.setState({
                stuArr: numberarr,
                sortHandle: true,
            })
        }
    }

    handleType(val) {
        this.setState({ type: val });
        setTimeout(() => {
            this.setState({ type: 2 });
        }, 3000)
    }
    render() {
        var data = this.props.ClData;
        if (data != null) {
            var classArr = [];
            var len = data.length;
            if (len > 0) {
                data.map((item, index) => {
                    classArr.push(<span key={index} onClick={this.changeTabHandle.bind(this)} className={this.state.tabActive == index ? 'lenStatisActive' : ''} data-key={index}>{item.name}</span>)
                })
            }
        }
        let showTr = {
            display: this.state.stuArr.length == 0 ? "block" : "none"
        }
        let showHide = {
            display: this.state.showhidecontrol == true ? "block" : "none"
        }
        let showWarningIllegal = {
            display: this.state.type == 2 ? "none" : "block"
        }
        let styles = {
            margin: {
                marginLeft: "20px"
            }
        }
        return (
            <div className="lenStatis">
                <div className="lenStatisInner">
                    <h2>学员管理</h2>
                    <div className="thStatisTab">
                        {classArr}
                    </div>
                    <div className='thStatisSele'>
                        选择学期：
                        <select name="" id="thStatisSele" onChange={this.changeTermHandle.bind(this)}>
                            {this.state.createTerm}
                        </select>
                    </div>
                    <div className="thStatisList">

                        <div className="thStaMany">该班当前共<i>{this.state.stuNum}</i>名学生 <span>专业：{this.state.majorname}</span></div>
                        <div className="thStaSearch">搜索学生:<input type="text" placeholder="按学生姓名或学号搜索" onChange={this.searchHandle.bind(this)} id="thStaSearch" /></div>
                        <a href={this.state.stuNum == 0 ? null : url.WEBURL + 'statistics/downStatisticsLearning?classid=' + this.state.classID + "&browser=" + this.state.Browser + '&term=' + this.state.terms} className="thExport commonButton button"><i className="iconfont icon-daochuchengji"></i>导出全部</a>
                        <table className="thStaTable">
                            <tr>
                                <th width="150px">姓名</th>
                                <th width="300px">学号</th>
                                {/*<th width="250px">专业</th>*/}
                                <th width="175px">综合评价
                                    <i className="updownbtn">
                                        <i className="iconfont icon-paixu_sheng" onClick={this.sortUpHandle.bind(this)}></i>
                                        <i className="iconfont icon-paixu_jiang" onClick={this.sortUpHandle.bind(this)}></i>
                                    </i>
                                </th>
                                <th width="170px">综合成绩</th>
                                <th width="330px">操作</th>
                            </tr>
                            <tbody>
                                {this.state.stuArr}
                            </tbody>
                        </table>
                        <div style={showTr} className="noAnswer">
                            没有查询结果
                        </div>
                    </div>
                    <div className="fixedIt">
                        <div className="LearningStatis_TopTo">
                            <span className="LearningStatis_TopToCenter" onClick={this.onTopTo.bind(this)}></span>
                        </div>
                    </div>
                </div>
                {/*<Input Max={10} Min={1} Cur={12} handleType={this.handleType.bind(this)}/>*/}
                <div className='sucorerr' >
                    {/*<i className="iconfont icon-xiaoxizhongxin-"></i>*/}
                    <span className={this.state.disSucOrErr == true ? 'sOeShow' : 'sOeHide'}><i className="iconfont icon-xiaoxizhongxin-"></i>综合成绩保存成功</span>
                </div>

                <div className="overOrUnder" style={showWarningIllegal}>
                    <span className="ooUBlack">{this.state.type == 0 ? "保存失败，修改分数不可低于系统默认分数" : "保存失败，超出可修改的分数范围"}</span>
                </div>
            </div>
        );
    }
    // 回到顶部
    onTopTo() {
        $('html,body').animate({ scrollTop: 0 }, '600');
    }
    // 生成学期
    createTermHandle(index) {
        var arr = [];
        switch (index) {
            case 4:
                arr.push(
                    <option value='4'>&nbsp;{index == 4 ? '第四学期(本学期)' : '第四学期'}</option>
                )

            case 3:
                arr.push(
                    <option value='3'>&nbsp;{index == 3 ? '第三学期(本学期)' : '第三学期'}</option>
                )

            case 2:
                arr.push(
                    <option value='2'>&nbsp;{index == 2 ? '第二学期(本学期)' : '第二学期'}</option>
                )

            case 1:
                arr.push(
                    <option value='1'>&nbsp;{index == 1 ? '第一学期(本学期)' : '第一学期'}</option>
                )

        }
        this.setState({
            createTerm: arr.reverse(),
        })
    }
    // 切换学期
    changeTermHandle(e) {
        // //console.log(this.state.initData)
        // //console.log(e.target.value)
        this.setState({
            terms: e.target.value,
        })
        $.llsajax({
            url: "/statistics/learningStatistics",
            async: false,
            type: "post",
            data: {
                term: e.target.value,
            },
            success: data => {
                // //console.log(data.ls)
                this.setState({
                    initData: data.ls,
                })
                this.createList(data.ls, e.target.value)
            }
        })
    }
    createList(arr, tm) {
        // let n = '';
        // let s = '';
        // let id = '';
        // let c = Base64.encodeURI(this.props.classMaster2[0].name); // 班级
        // let ci = Base64.encodeURI(this.props.classMaster2[0].id); // 班级ID
        // let t = Base64.encodeURI(this.props.classMaster2[0].term); // 当前学期
        // let tc = Base64.encodeURI(this.props.classMaster2[0].termcount); // 总学期
        // let sc = Base64.encodeURI(this.props.classMaster2[0].schoolname); // 学校
        // let m = Base64.encodeURI(this.props.classMaster2[0].majorname); // 专业
        // let tab = Base64.encodeURI(this.state.index);
        // let st = this.props.classMaster2[0].term;
        var index = this.state.index;
        var stuArrItem = []
        var data = arr;
        if (data != null) {
            this.setState({
                classID: data[index].id,
                nowTerm: data[index].nowTerm,
            })
            var len = data[index].userList.length;
            if (len > 0) {
                let data_id = null;

                let n = ''
                let leval = '--'
                for (var i = 0; i < len; i++) {
                    data_id = Base64.encodeURI(data[index].userList[i].id);
                    n = Base64.encodeURI(data[index].userList[i].name)
                    let s = '';
                    // let id = '';
                    let c = Base64.encodeURI(data[index].name); // 班级
                    let ci = Base64.encodeURI(data[index].id); // 班级ID
                    let t = Base64.encodeURI(data[index].nowTerm); // 当前学期
                    let tc = Base64.encodeURI(data[index].termNum); // 总学期
                    let sc = Base64.encodeURI(data[index].schoolname); // 学校
                    let m = Base64.encodeURI(data[index].majorname); // 专业
                    let tab = Base64.encodeURI(this.state.index);
                    let st = this.state.terms;
                    stuArrItem.push(<tr key={index + 'tr' + Math.random()}><td data={data[index].userList[i].id}>{data[index].userList[i].name || '--'}</td>
                        <td >{data[index].userList[i].studentNo || '--'}</td>
                        {/*<td>{data[index].majorname != null ? data[index].majorname : '--'}</td>*/}
                        <td data={data[index].userList[i].compscore}>{this.translevalHandle(data[index].userList[i].compscore)}</td>
                        <td>{Number(data[index].userList[i].evaluate) + Number(data[index].userList[i].calpscore)}</td>
                        <td>
                            <div className="someAction">
                                
                                <a  onClick={this.linkTo.bind(this, c, t, 1, tc, n, s, sc, m, ci, data_id, tab, st)}>
                                    <i className="iconfont icon-kaoqin"></i>考勤
                                </a>
                                <a  onClick={this.linkTo.bind(this, c, t, 2, tc, n, s, sc, m, ci, data_id, tab, st)}>
                                    <i className="iconfont icon-fangtan"></i>访谈
                                </a>
                                <a  onClick={this.linkTo.bind(this, c, t, 3, tc, n, s, sc, m, ci, data_id, tab, st)}>
                                    <i className="iconfont icon-jiangcheng"></i>奖罚
                                </a>
                                <a  onClick={this.linkTo.bind(this, c, t, 4, tc, n, s, sc, m, ci, data_id, tab, st)}>
                                    <i className="iconfont icon-gerenzonglan"></i>个人总览
                                </a>
                                {/*<Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 1, tc: tc, n: n, s: s, sc: sc, m: m, ci: ci, id: data_id, tab: tab, st: st } }}><i className="iconfont icon-kaoqin"></i>考勤</Link>
                                <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 2, tc: tc, n: n, s: s, sc: sc, m: m, ci: ci, id: data_id, tab: tab, st: st } }}><i className="iconfont icon-fangtan"></i>访谈</Link>
                                <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 3, tc: tc, n: n, s: s, sc: sc, m: m, ci: ci, id: data_id, tab: tab, st: st } }}><i className="iconfont icon-jiangcheng"></i>奖罚</Link>
                                <Link to={{ pathname: '/managePage', query: { c: c, t: t, b: 4, tc: tc, n: n, s: s, sc: sc, m: m, ci: ci, id: data_id, tab: tab, st: st } }}><i className="iconfont icon-gerenzonglan"></i>个人总览</Link>*/}
                                {/*<Link to={{ pathname: '/StatisticsForm', query: { id: data_id, n: n, st: tm, t: data[index].nowTerm } }} data-id={data[index].userList[i].id}><i className="iconfont icon-xuexitongjichakanxiangqing"></i>查看详情</Link>*/}
                            </div>
                        </td></tr>)
                }
            }
            document.getElementById('thStaSearch').value = ''
        }
        this.setState({
            tabActive: index,
            saveData: stuArrItem,
            stuArr: stuArrItem,
            stuNum: data[index].stunum,
            majorname: data[index].majorname
        })
    }
    // componentDidUpdate(){
    //     //console.log(this.state.showDialog)
    // }
    // 显示浮框
    // showDialog(){
    //     // //console.log(111)
    //     this.setState({
    //         showDialog:true,
    //     })
    // }
    componentDidMount() {
        document.getElementById("thStatisSele").selectedIndex = Number(this.state.nowTerm) - 1;
        let _this = this;
        window.canAutoScroll = true;
        //只要滚动事件发生，就停止自动滚动定位方法的执行
        var timeout = null;
        var panel = $(window);
        panel.scroll(function () {
            if (timeout != null) {
                window.clearTimeout(timeout);
            }
            window.canAutoScroll = false;
            //500ms后，假定认为停止滚动
            timeout = window.setTimeout(function () {
                window.canAutoScroll = true;
            }, 100);
        });
        this.timer = setInterval(
            () => {
                var scrollNum = $(window).scrollTop();
                if (scrollNum > 800) {
                    if (window.canAutoScroll) {
                        $(".LearningStatis_TopToCenter").fadeIn(2000);
                    } else {
                        $(".LearningStatis_TopToCenter").css({
                            display: "none"
                        });
                    }
                } else {
                    $(".LearningStatis_TopToCenter").css({
                        display: "none",
                    });
                }
            },
            100
        );
    }
    // 路由跳转
    linkTo(c, t, b, tc, n, s, sc, m, ci, data_id, tab, st) {
        hashHistory.push({
            pathname: 'managePage',
            query: {
                c: c,
                t: t,
                b: b,
                tc: tc,
                n: n,
                s: s,
                sc: sc,
                m: m,
                ci: ci,
                id: data_id,
                tab: tab,
                st: st
            }
        })
    }
}