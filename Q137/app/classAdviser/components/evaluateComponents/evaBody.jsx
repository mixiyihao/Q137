import React from 'react';
import ReactDOM from 'react-dom'
import { Link, hashHistory } from 'react-router';
import $ from 'jquery';
import './evaBody.css'
import url from '../../../controller/url.js';
import LabelSwitching from '../../../assistantSup/public/labelSwitching/labelSwitching.jsx';

export default class EvaBody extends React.Component {
    constructor() {
        super();
        this.state = {
            classArr: [],
            term: 5,//学期数
            termNow: 0,//当前学期

            major: [],//专业数据
            classItem: [],//单个班级

            // 学校
            arrData: [],//所有数据
            tabspan: 0,//距离计算基本单位
            left: false,//左右按钮是否可以点击
            right: false,//左右按钮是否可以点击
            schoolArr: [],//学校数组
            schoolIndex: 0,
            // schoolId:null,
            tabID: 0,//学校切换控制
            // 切换班主任
            tabArr: [],

            // 学期
            // termList:[],
            spCur: 1,
            // 数据类
            majors: [],//专业
            teachClass: [],//班级
            /*
               保存数据数组和展示数据数组
               1.保存初始数据
               2.用于搜索和筛选
           */
            initArr: [],//初始评价数据
            searchArr: [],//筛选数组
            list: [],//生成展示列表
            // 无数据
            noData: false,
            // 筛选id
            scId: '',//学校id
            teaId: '',//老师id
            majorId: '',//专业id
            classId: '',//班级id
            tpId: '',//状态id
            termId: '',//学期id

            tData: [],//老师数据
            teacherIndex: 0,//老师的下标
            cosMajor: [],//专业下拉
            cosClass: [],//班级下拉

            classes: '--',
        }
    }

    componentWillMount() {
        var throne = sessionStorage.getItem('userJudge');
        var termSS = sessionStorage.getItem('Ynt')
        var tabIndex = sessionStorage.getItem('Yci')
        $.llsajax({
            url: 'teachManage/listAllSchool',
            type: "POST",
            async: false,
            success: data => {
                //    console.log(data)
                this.setState({
                    schoolArr: data.list,
                    left: data.list.length > 4 ? true : false,
                    scId: data.list.length > 0 ? data.list[0].id : null,
                })
                var arr = data.list
                if (!!arr && arr.length > 0) {
                    var id = data.list[0].id
                    this.getCaData(id, 0)
                }
            }
        });
    }

    render() {
        let noData = {
            display: this.state.noData == false ? 'none' : 'block',
        }
        return (<div className="evaBody">
            <div className="evaBodyInner">
                <h2>反馈管理</h2>
                <div className="evaTabClass">
                    <div className="evaTabContainer">
                        <div className="evaTabBox" id="changePosition">
                            {this.createSchool()}
                        </div>
                    </div>
                    <i className={this.state.right == true ? "evaFrontBtn iconfont icon-icon-test3" : "evaFrontBtn iconfont icon-icon-test3 noUse"}
                        onClick={this.goEnd.bind(this)}></i>
                    <i className={this.state.left == true ? "evaEndBtn iconfont icon-icon-test2" : "evaEndBtn iconfont icon-icon-test2 noUse"}
                        onClick={this.goFront.bind(this)}></i>
                </div>
                <div id='labelswitch'>
                    <LabelSwitching
                        tabArr={this.state.tabArr}
                        onTabClick={this.onTabClickTeacher.bind(this)}
                    />
                </div>
                <div className="evaBodySelect">
                    专业：
                    <select name="" id="majorSelect" onChange={this.changeMajor.bind(this)}>
                        {this.state.cosMajor}
                    </select>
                    班级：
                    <select name="" id="classSelect" onChange={this.changeClass.bind(this)}>
                        {this.state.cosClass}
                    </select>
                    状态：
                    <select name="" id="typeSelect" onChange={this.changeType.bind(this)}>
                        <option value="">&nbsp;全部</option>
                        <option value="0">&nbsp;未进行</option>
                        <option value="1">&nbsp;进行中</option>
                        <option value="2">&nbsp;已结束</option>
                    </select>
                </div>
                <div className="changeTermList">
                    <i>选择学期:</i>
                    {this.createTerm(this.state.termNow, this.state.termNow)}
                </div>

                <table className="evaBody_table" width="1040px">
                    <thead>
                        <tr>
                            <th width="200px">评价名称</th>
                            <th width="240px">所属课程</th>
                            <th width="315px">评价时间</th>
                            <th width="65px">参评人数</th>
                            <th width="105px">评价状态</th>
                            <th width="110px">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.list}
                    </tbody>
                </table>

                <a className="linkToBtn commonButton button"
                    onClick={this.clickToPath.bind(this)}>预览课程调查问卷</a>
                <div style={noData} className="evaNoData">
                    <i>当前无满意度评价记录</i></div>
            </div>
        </div>)
    }

    // 左右切换
    goFront() {
        // console.log('front')
        var arr = this.state.schoolArr;
        var len = arr.length;
        if (len <= 4) {
            return false;
        }
        var num = this.state.tabspan;
        this.setState({
            right: true,
            // left: false,
        })
        var nums = Number(num) + 2;
        if (nums >= len - 4) {
            nums = len - 4
            this.setState({
                right: true,
                left: false,
            })
        }
        // console.log(nums)
        var dis = -1 * nums * 239
        // var width = len*236;
        $('#changePosition').animate({ left: dis + 'px' }, 600)
        this.setState({
            tabspan: nums
        })
    }

    goEnd() {
        // console.log('end')

        var arr = this.state.schoolArr;
        var len = arr.length;
        if (len <= 4) {
            return false;
        }

        var num = this.state.tabspan;
        var nums = num - 2;
        this.setState({
            left: true,
            // right: false,
        })
        if (nums <= 0) {
            nums = 0;
            this.setState({
                left: true,
                right: false,
            })
        }
        var dis = -1 * nums * 239
        // var width = len*236;
        $('#changePosition').animate({ left: dis + 'px' }, 600)
        // var width = len*236;
        this.setState({
            tabspan: nums
        })
    }
    // 获取班主任信息
    getCaData(id, key) {
        // key用来取第某个数据的值
        $.llsajax({
            url: 'teachManage/schoolTDetail',
            type: "POST",
            async: false,
            data: {
                schoolid: id
            },
            success: data => {
                //    console.log(data)
                var arr = [];
                if (data.list.length > 0) {
                    var len = data.list.length
                    for (var i = 0; i < len; i++) {
                        arr.push(data.list[i].name)
                    }
                }
                this.setState({
                    tabArr: arr,
                    tData: data.list,
                    // initArr:data.list[key]
                })
                var dataArr = data.list
                this.crtMajor(dataArr, key)
                var clsA = [];
                if (dataArr != null && dataArr.length > 0) {
                    // console.log(dataArr[key])
                    if (typeof (dataArr[key]) != 'undefined' && typeof (dataArr[key].majorVoList) != 'undefined') {

                        var cA = dataArr[key].majorVoList
                        if (dataArr[key].majorVoList != null && dataArr[key].majorVoList.length > 0) {
                            if (dataArr[key].majorVoList[0].classVoList != null && dataArr[key].majorVoList[0].classVoList.length > 0) {
                                clsA = dataArr[key].majorVoList[0].classVoList
                                var c = dataArr[key].majorVoList[0].classVoList[0].classId;
                                var t = dataArr[key].majorVoList[0].classVoList[0].termNow;
                                this.getDataAjax(c, t)
                                this.setState({
                                    classId: c,
                                    term: dataArr[key].majorVoList[0].classVoList[0].termcount,
                                    termNow: dataArr[key].majorVoList[0].classVoList[0].termNow,
                                    spCur: dataArr[key].majorVoList[0].classVoList[0].termNow,
                                    classes: dataArr[key].majorVoList[0].classVoList[0].className,
                                })
                            }
                        }
                    } else {
                        this.setState({
                            list: [],
                            noData: true,
                        })
                    }

                } else {
                    // var c = dataArr[key].majorVoList[0].classVoList[0].classId;
                    // var t = dataArr[key].majorVoList[0].classVoList[0].termNow;
                    // this.getDataAjax(c, t)
                    this.setState({
                        list: [],
                        noData: true,
                    })
                }
                this.crtClass(clsA, 0)
                if(key!=0){

                    ReactDOM.unmountComponentAtNode(document.getElementById("labelswitch"));
                    ReactDOM.render(
                        <LabelSwitching
                            tabArr={arr}
                            onTabClick={this.onTabClickTeacher.bind(this)}
                        />,
                        document.getElementById("labelswitch")
                    );
                }
            }
        });

    }
    onTabClick(e) {
        var key = e.target.getAttribute('data-index')
        var id = e.target.getAttribute('data-id')
        this.setState({
            tabID: key,
            schoolIndex: key,
            scId: id,
            teacherIndex: 0,
        })
        this.getCaData(id, key)

        // this.onTabClickTeacher(0);
    }
    createSchool() {
        var arr = this.state.schoolArr;
        return arr.map((value, index) => {
            return (
                <span key={index} data-id={value.id} data-index={index}
                    className={this.state.tabID == index ? "tab_Active" : ""}
                    onClick={this.onTabClick.bind(this)}>{value.name}<i></i></span>
            );
        });
    }

    // 切换班主任
    onTabClickTeacher(key) {
        // console.log(key+':0')
        var dataArr = this.state.tData;
        this.crtMajor(dataArr, key)
        var clsA = [];
        var cA = dataArr[key].majorVoList
        if (dataArr[key].majorVoList != null && dataArr[key].majorVoList.length > 0) {
            // console.log(key+':1')
            if (dataArr[key].majorVoList[0].classVoList != null && dataArr[key].majorVoList[0].classVoList.length > 0) {
                // console.log(key+':2')
                clsA = dataArr[key].majorVoList[0].classVoList
                var c = dataArr[key].majorVoList[0].classVoList[0].classId;
                var t = dataArr[key].majorVoList[0].classVoList[0].termNow;
                this.getDataAjax(c, t)
                this.setState({
                    classId: c,
                    term: dataArr[key].majorVoList[0].classVoList[0].termcount,
                    termNow: dataArr[key].majorVoList[0].classVoList[0].termNow,
                    spCur: dataArr[key].majorVoList[0].classVoList[0].termNow,
                })
            } else {
                // console.log(key+':3')
                this.setState({
                    list: [],
                    noData: true,
                })
            }
        } else {
            // console.log(key+':4')
            this.setState({
                list: [],
                noData: true,
            })
        }
        this.crtClass(clsA, 0)
        this.setState({
            teacherIndex: key,
        })
        // console.log(document.getElementById("majorSelect"))
        document.getElementById("majorSelect").selectedIndex = 1;
        // document.getElementById("classSelect").selectedIndex = 0;
        document.getElementById("typeSelect").selectedIndex = 0;

    }
    // 生成专业
    crtMajor(arr, key) {
        var len = arr.length;
        var mArr = [];//专业
        // console.log(typeof(arr[key]))
        if (len > 0 && typeof (arr[key]) != 'undefined' && typeof (arr[key].majorVoList) != 'undefined') {

            var majorLst = arr[key].majorVoList ? arr[key].majorVoList : [];
            var mlen = majorLst.length;
            if (mlen > 0) {
                for (var i = 0; i < mlen; i++) {
                    mArr.push(<option key={majorLst[i].majorid} value={majorLst[i].majorid}>&nbsp;{majorLst[i].majorname}</option>)
                }
            }


        } else {
            mArr.push(<option key={'mjnull'}>&nbsp;{'没有数据'}</option>)
        }
        this.setState({
            cosMajor: mArr,
        })
    }
    // 生成班级
    crtClass(arr, key) {
        // console.log(arr)
        var len = arr.length;
        var cArr = [];//班级
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                cArr.push(<option key={arr[i].classId} value={arr[i].classId}>&nbsp;{arr[i].className}</option>)
            }
        } else {
            cArr.push(<option key={'clsull'}>&nbsp;{'没有数据'}</option>)
        }
        this.setState({
            cosClass: cArr,
        })
    }
    /*生成学期
        num1 为总学期数 num2 为当前学期
    */
    createTerm(num1, num2) {
        var termArr = [];
        switch (num1) {
            case 5:
                termArr.push(<span key={'r5'} className={this.state.spCur == 5 ? 'current' : ''} onClick={this.clickTerm.bind(this, '5')}>&nbsp;{num2 == 5 ? '第五学期（本学期）' : '第五学期'}</span>)
            case 4:
                termArr.push(<span key={'r4'} className={this.state.spCur == 4 ? 'current' : ''} onClick={this.clickTerm.bind(this, '4')}>&nbsp;{num2 == 4 ? '第四学期（本学期）' : '第四学期'}</span>)
            case 3:
                termArr.push(<span key={'r3'} className={this.state.spCur == 3 ? 'current' : ''} onClick={this.clickTerm.bind(this, '3')}>&nbsp;{num2 == 3 ? '第三学期（本学期）' : '第三学期'}</span>)
            case 2:
                termArr.push(<span key={'r2'} className={this.state.spCur == 2 ? 'current' : ''} onClick={this.clickTerm.bind(this, '2')}>&nbsp;{num2 == 2 ? '第二学期（本学期）' : '第二学期'}</span>)
            case 1:
                termArr.push(<span key={'r1'} className={this.state.spCur == 1 ? 'current fst' : 'fst'} onClick={this.clickTerm.bind(this, '1')}>&nbsp;{num2 == 1 ? '第一学期（本学期）' : '第一学期'}</span>)
        }
        return termArr.reverse()
    }

    // 转译时间戳
    transIntoDate(date) {
        var now = new Date(date)
        var year = now.getFullYear();
        var month = (now.getMonth() + 1 + '').length < 2 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1);
        var date = (now.getDate() + '').length < 2 ? '0' + now.getDate() : now.getDate();
        var hour = now.getHours();
        var minute = ('' + now.getMinutes()).length < 2 ? '0' + now.getMinutes() : now.getMinutes();
        var second = now.getSeconds();
        return year + "/" + month + "/" + date + " " + hour + ":" + minute;
    }

    // 生成评价的元素
    createCommet(arr, num) {
        // console.log(arr)
        var len = arr.length;
        var numbers;
        if (num) {
            numbers = num
        } else {
            numbers = this.state.stunum
        }
        if (len > 0) {
            this.setState({
                noData: false,
            })
            var list = [];
            let state = '';
            for (var i = 0; i < len; i++) {
                list.push(
                    <tr key={i}>
                        <td>{arr[i].dgname || '--'}</td>
                        <td>{arr[i].coursename || '--'}</td>
                        <td>{this.transIntoDate(arr[i].sdate) + '-' + this.transIntoDate(arr[i].edate)}</td>
                        <td>{arr[i].degreednum}/{numbers}</td>
                        <td>{this.commetState(arr[i].flag)}</td>
                        <td className="evaBody_tool">
                            <span onClick={this.clickToDoSth.bind(this, arr[i].flag, arr[i])} className={arr[i].flag == 0 ? 'nouse' : ''}><i className={arr[i].flag == 0 ? "iconfont icon-yulan" : "iconfont icon-yulan"}></i>{'查看详情'}</span>
                        </td>

                    </tr>
                )
            }
            this.setState({
                list: list,
            })
        } else {
            this.setState({
                list: [],
                noData: true,
            })
        }

    }

    // 评价状态
    commetState(flag) {
        var str = '--'
        switch (flag) {
            case 0:
                str = '未进行';
                break;
            case 1:
                str = '进行中';
                break;
            case 2:
                str = '已结束';
                break;
            default:
                str = '--'

        }
        return str
    }

    commetClass(flag) {
        var str = '--'
        switch (flag) {

            case 1:
                str = 'evaGoing';
                break;
            case 0:
                str = 'evaNot';
                break;
        }
        return str
    }

    // 点击查看详情或修改按钮
    clickToDoSth(flag, obj) {
        if (flag == 0) {
            // console.log(obj)
            this.setState({
                course: obj.courseid,
                openFile: true,
                edit: flag,
                objs: obj,
            })
        } else {
            var classes = this.state.classes//班级名称 
            // console.log(classes)
            // if(1==1){
            //     return false;
            // }
            var sTime = obj.sdate//开始时间
            var eTime = obj.edate//结束时间
            var nowTerm = this.state.termNow//当前学期
            var evaName = obj.dgname//评价名称
            var courseName = obj.coursename//课程名称
            var classId = this.state.classId//班级id
            var degreeId = obj.id//评价id

            hashHistory.push({
                pathname: '/Satisfaction',
                query: {
                    cls: Base64.encodeURI(classes),
                    st: sTime,
                    et: eTime,
                    nt: nowTerm,
                    en: Base64.encodeURI(evaName),
                    cn: Base64.encodeURI(courseName),
                    ci: classId,
                    di: degreeId,
                    ct: this.state.t,
                    classIndex: this.state.classIndex,

                },
            })
        }
    }

    // 数据更新
    getDataAjax(c, t) {
        $.llsajax({
            url: 'degree/findMasterList',
            type: "POST",
            data: {
                term: t,
                classid: c,
            },
            success: data => {

                // console.log(data)
                var arr = data.obj.degreeList
                var num = data.obj.stunum
                this.createCommet(arr, num)
                this.setState({
                    initArr: arr,
                })
            },
        })
        //     document.getElementById("evaBodySelect").selectedIndex = t - 1;


    }

    componentDidMount() {
        document.getElementById("majorSelect").selectedIndex = 0;
        document.getElementById("classSelect").selectedIndex = 0;
        document.getElementById("typeSelect").selectedIndex = 0;
    }

    clickToPath() {
        hashHistory.push({
            pathname: '/evaluatingtemplate',
        })
    }
    changeMajor(e) {
        var mark = e.target.value;
        var data = this.state.tData;
        var tmark = this.state.teacherIndex;
        var mjData = data[tmark].majorVoList;
        var arr = [];
        var len = mjData.length;
        if (len > 0) {
            var c = '';
            var t = '';
            for (var i = 0; i < len; i++) {
                if (mark == mjData[i].majorid) {
                    arr = mjData[i].classVoList;
                    if (arr.length > 0) {
                        c = arr[0].classId
                        t = arr[0].termNow
                        this.setState({
                            term: arr[0].termcount,
                            termNow: t,
                            spCur: t,
                        })
                    }
                    break;
                }
            }
            if (c != '' && t != '') {
                this.getDataAjax(c, t)
            }
        }
        this.crtClass(arr, 0);
        //  document.getElementById("majorSelect").selectedIndex = 0;
        // document.getElementById("classSelect").selectedIndex = 0;
        document.getElementById("typeSelect").selectedIndex = 0;
    }
    changeClass(e) {
        var id = e.target.value;
        var data = this.state.tData;
        var tmark = this.state.teacherIndex;
        var mjData = data[tmark].majorVoList;//专业数组
        // var arr = [];//
        var len = mjData.length;
        // console.log(mjData)
        if (len > 0) {
            var c = '';
            var t = '';
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < mjData[i].classVoList.length; j++) {
                    if (id == mjData[i].classVoList[j].classId) {
                        c = id;
                        t = mjData[i].classVoList[j].termNow
                        this.setState({
                            term: mjData[i].classVoList[j].termcount,
                            termNow: t,
                            spCur: t,
                            classes: mjData[i].classVoList[j].className
                        })
                        break;
                    }
                }
            }
            if (c != '' && t != '') {
                this.getDataAjax(c, t)
            }
        }
        //  document.getElementById("majorSelect").selectedIndex = 0;
        // document.getElementById("classSelect").selectedIndex = 0;
        document.getElementById("typeSelect").selectedIndex = 0;
    }
    changeType(e) {
        var value = e.target.value;
        var arr = this.state.initArr;
        if (arr.length > 0) {
            if (value == '' || value.length < 1) {
                this.createCommet(arr)
            } else {
                var arr1 = this.funKey(arr, value)
                // console.log(arr1)
                this.createCommet(arr1)
            }

        }
    }
    clickTerm(s) {
        this.setState({
            spCur: s,
        })
        var c = this.state.classId;
        var t = s;
        this.getDataAjax(c, t)
    }
    //根据评价状态进行筛选
    funKey(arr, key) {
        var key = key || '';
        var len = arr.length
        var arr2 = [];
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                if (arr[i].flag == key) {
                    arr2.push(arr[i])
                }
            }
        }
        return arr2
    }
}