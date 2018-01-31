import React from 'react';
import ReactDOM from 'react-dom'
import { Link, hashHistory } from 'react-router';
import $ from 'jquery';
import './evaBody.css'
import url from '../../controller/url.js';

import Mask from './mask/mask.jsx';
import BombBox from '../../components/public/bombBox/bombBox.js'

export default class EvaBody extends React.Component {
    constructor() {
        super();
        this.state = {
            openFile: false,//遮罩层控制
            classArr: [],
            tabID: 0,//班级切换控制
            term: 5,//学期数
            termNow: '',//当前学期
            termArr: [],//学期
            termName: '',
            t: 0,//选择的学期
            throne: '',//教师身份 C / T
            courseList: [],//课程列表
            commetFlag: '',//评价状态
            courseId: '',//选择课程id
            classId: '',//选择的班级
            classes: '',
            inputVal: '',
            course:'',
            /*
                保存数据数组和展示数据数组
                1.保存初始数据
                2.用于搜索和筛选
            */
            initArr: [],
            searchArr: [],

            list: [],//生成展示列表

            /**搜索条件
             * keyword :关键字
             * flag: 评价状态
             * course: 课程
             */
            searchKeyWord: '',
            searchCourse: '',
            searchFlag: '',
            // 编辑
            edit: 3,
            objs: {},
            // 无数据
            noData: false,
            // bumbbox
            isHidden: true,
            bombBoxMsg: '确认删除该条评价？',
            bumbid: '',

            // 班级index
            classIndex: 0,
            arrData: [],//所有数据
            tabspan: 0,//距离计算基本单位
            left: false,//左右按钮是否可以点击
            right: false,//左右按钮是否可以点击

            major: [],//专业数据
            classItem: [],//单个班级
        }
    }

    componentWillMount() {
        var throne = sessionStorage.getItem('userJudge');
        var termSS = sessionStorage.getItem('Ynt')
        var tabIndex = sessionStorage.getItem('Yci')
        this.getMajorAjax();
        // //console.log(tabIndex)
        if (termSS != 'off' && tabIndex != 'off' && tabIndex != null && termSS != null) {
            // //console.log(tabIndex)
            $.llsajax({
                url: 'degree/findList ',
                type: "POST",
                // async:false,
                data: {
                    term: termSS,
                },
                async: false,
                success: data => {
                    // console.log(data)
                    // //console.log(termSS)
                    var len = data.obj.length;
                    if (len > 0) {
                        var arr = [];
                        var term = 0;
                        var termNow = 0;
                        var id = '';
                        var initArr = [];
                        var classes = '';
                        for (var i = 0; i < len; i++) {
                            if (throne == 'T') {
                                if (data.obj[i].flag == 0) {

                                    continue;
                                }
                            } else {

                                arr.push(data.obj[i]);
                            }
                            // //console.log(data.obj)
                            // //console.log(tabIndex)
                            // term = data.obj[tabIndex].termNum;
                            termNow = data.obj[tabIndex].nowTerm;
                            id = data.obj[tabIndex].id
                            initArr = data.obj[tabIndex].degrees;
                            classes = data.obj[tabIndex].name;
                        }
                        var classItem = [];
                        classItem.push(arr[0])
                        // //console.log(termNow)
                        this.setState({
                            classArr: arr,
                            // term: term,
                            classItem: classItem,
                            termNow: termNow,
                            t: termSS,
                            initArr: initArr,
                            searchArr: initArr,
                            classes: classes,
                            classId: id,
                            stunum: data.obj[tabIndex].stunum,
                            arrData: data.obj,
                            left: arr.length > 4 ? true : false,
                        })
                        // //console.log(initArr)
                        this.createTerm(5, termNow)
                        this.createCourse(arr, id, termSS)
                        this.createCommet(initArr, data.obj[tabIndex].stunum)
                    }
                },
            })
        } else {
            $.llsajax({
                url: 'degree/findList ',
                type: "POST",
                async: false,
                success: data => {
                    // console.log(data)
                    var len = data.obj.length;
                    if (len > 0) {
                        var arr = [];
                        var term = 0;
                        var termNow = 0;
                        var id = '';
                        var initArr = [];
                        var classes = '';
                        for (var i = 0; i < len; i++) {
                            if (throne == 'T') {
                                if (data.obj[i].flag == 0) {
                                    continue;
                                }
                            } else {

                                arr.push(data.obj[i]);
                            }
                            term = data.obj[0].termNum;
                            termNow = data.obj[0].nowTerm;
                            id = data.obj[0].id
                            initArr = data.obj[0].degrees;
                            classes = data.obj[0].name;
                        }
                        // //console.log(termNow)
                        var classItem = [];
                        classItem.push(arr[0])
                        this.setState({
                            classArr: arr,
                            classItem: classItem,
                            term: term,
                            termNow: termNow,
                            t: termNow,
                            initArr: initArr,
                            searchArr: initArr,
                            classes: classes,
                            classId: id,
                            stunum: data.obj[0].stunum,
                            arrData: data.obj,
                            left: arr.length > 4 ? true : false,
                        })
                        this.createTerm(5, termNow)
                        this.createCourse(arr, id, termNow)
                        this.createCommet(initArr, data.obj[0].stunum)
                    }
                },
            })
        }
        this.setState({
            throne: throne
        })
    }

    render() {
        let noData = {
            display: this.state.noData == false ? 'none' : 'block',
        }
        let judgeT = {
            display: this.state.throne == 'T' ? 'none' : 'block'
        }
        return (<div className="evaBody">
            <div className="evaBodyInner">
                <h2>反馈管理</h2>
                <div className="evaBodySelect">
                    学期：
                    <select name="" id="evaBodySelect" onChange={this.changeHandle.bind(this)}>
                        {this.state.termArr}
                    </select>
                </div>
                <div className="evaTabClass">
                    <div className="evaTabContainer">
                        <div className="evaTabBox" id="changePosition">
                            {this.createClass()}
                        </div>
                    </div>
                    <i className={this.state.left == true ? "evaFrontBtn iconfont icon-icon-test3" : "evaFrontBtn iconfont icon-icon-test3 noUse"}
                        onClick={this.goFront.bind(this)}></i>
                    <i className={this.state.right == true ? "evaEndBtn iconfont icon-icon-test2" : "evaEndBtn iconfont icon-icon-test2 noUse"}
                        onClick={this.goEnd.bind(this)}></i>

                </div>
                <div className="evaFilter">
                    <span>
                        选择课程：
                        <select name="" id="evaCourse" onChange={this.changeCourse.bind(this)}>
                            <option value="">&nbsp;全部课程</option>
                            {this.state.courseList}
                        </select>
                    </span>
                    <span>
                        评价状态：
                        <select name="" id="evaFlag" onChange={this.changeFlag.bind(this)}>
                            <option value="">&nbsp;全部</option>
                            <option value="0">&nbsp;未进行</option>
                            <option value="1">&nbsp;进行中</option>
                            <option value="2">&nbsp;已结束</option>
                        </select>
                    </span>
                    <span className="searchKeyWordEva">
                        搜索：
                        <input type="text"
                            onChange={this.searchKeyWordHandle.bind(this)}
                            value={this.state.searchKeyWord}
                            placeholder="按评价名称搜索"
                        />
                        <i>搜索</i>
                    </span>
                </div>
                {/*<div className="showEvaEle">*/}
                {/*{this.state.list}*/}
                {/*</div>*/}
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
                <a className="openFile commonButton button" style={judgeT}
                    onClick={this.clickHandle.bind(this)}>开启调查</a>
                <a className="linkToBtn commonButton button" style={judgeT}
                    onClick={this.clickToPath.bind(this)}>预览课程调查问卷</a>
               <Mask closeFile={this.closeFile.bind(this)}
                    displayFlag={this.state.openFile}
                    course={this.state.courseList}
                    // nameOfClass={this.state.classes}
                    id={this.state.course}
                    classId={this.state.classId}
                    t={this.state.t}
                    getData={this.getDataAjax.bind(this)}
                    edit={this.state.edit}
                    objs={this.state.objs}
                    editFun={this.changeEdit.bind(this)}
                    initArr={this.state.initArr}
                    classArr={this.state.edit == 0 ? this.state.classItem : this.state.classArr}
                    arrData={this.state.arrData}
                    major={this.state.major}
                />
                <BombBox
                    hideClick={this.hideClick.bind(this)}
                    enterClick={this.enterClick.bind(this)}
                    isHidden={this.state.isHidden}
                    bombBoxMsg={this.state.bombBoxMsg}
                />
                <div style={noData} className="evaNoData">
                    <i>当前无满意度评价记录</i></div>
            </div>
        </div>)
    }

    // 左右切换
    goFront() {
        // console.log('front')
        var arr = this.state.classArr;
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

        var arr = this.state.classArr;
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

    // 生成班级切换
    createClass() {
        var arr = this.state.classArr;
        return arr.map((value, index) => {
            return (
                <span key={index} data-id={value.id} data-index={index}
                    className={this.state.tabID == index ? "tab_Active" : ""}
                    onClick={this.onTabClick.bind(this)}>{value.name}<i></i></span>
            );
        });

    }

    onTabClick(e) {
        var key = e.target.getAttribute('data-index')
        var id = e.target.getAttribute('data-id')
        // 修改保存数据数组和展示数据数组
        var Arr = this.state.classArr;
        var t = this.state.t
        var initArr = []
        initArr = Arr[key].degrees;
        // 获取选中的班级名称
        var classes = '';
        var classItem = [];
        if (Arr[key].id == id) {
            classes = Arr[key].name;
            // classItem.push(Arr[k])
            this.setState({
                classItem: classItem,
            })
        }
        // console.log(Arr[key])
        this.setState({
            tabID: key,
            classId: id,
            initArr: initArr,
            searchArr: initArr,
            classes: classes,
            stunum: Arr[key].stunum,
            classIndex: key,
            searchKeyWord: '',
            searchCourse: '',
            searchFlag: '',
        })
        var stunum = Arr[key].stunum;
        this.createCourse(Arr, id, t)
        this.createCommet(initArr, stunum);
        this.createTerm(5, Arr[key].nowTerm || 1);
        document.getElementById("evaBodySelect").selectedIndex = !!Arr[key].nowTerm ? Arr[key].nowTerm - 1 : 0
        document.getElementById("evaFlag").selectedIndex = 0;
        document.getElementById("evaCourse").selectedIndex = 0;
        // 同步学期进行一次搜索
        $.llsajax({
            url: 'degree/findList ',
            data: {
                term: Arr[key].nowTerm || 1,
            },
            type: "POST",
            success: data => {
                var index = this.state.tabID;
                var len = data.obj.length;
                if (len > 0) {
                    var arr = [];
                    var term = 0;
                    var termNow = 0;
                    var id = '';
                    var initArr = [];
                    var classes = '';
                    for (var i = 0; i < len; i++) {


                        arr.push(data.obj[i]);

                        // term = data.obj[index].termNum;
                        termNow = data.obj[index].nowTerm;
                        id = data.obj[index].id
                        initArr = data.obj[index].degrees;
                        classes = data.obj[index].name;
                    }

                    this.setState({
                        classArr: arr,

                        // term: term,
                        termNow: termNow,
                        t: t,
                        initArr: initArr,
                        searchArr: initArr,
                        classes: classes,
                        classId: id,
                        stunum: data.obj[index].stunum,
                        searchKeyWord: '',
                        searchCourse: '',
                        searchFlag: '',
                        // edit:3,
                    })
                    this.createCommet(initArr)
                    var id = this.state.classId;
                    this.createCourse(arr || [], id, t)
                }
            },
        })
    }

    /*生成学期
        num1 为总学期数 num2 为当前学期
    */
    createTerm(num1, num2) {
        var termArr = [];
        switch (num1) {
            case 5:
                termArr.push(<option data='5' key={'r5'} value="5">&nbsp;{num2 == 5 ? '第五学期（本学期）' : '第五学期'}</option>)
            case 4:
                termArr.push(<option data='4' key={'r4'} value="4">&nbsp;{num2 == 4 ? '第四学期（本学期）' : '第四学期'}</option>)
            case 3:
                termArr.push(<option data='3' key={'r3'} value="3">&nbsp;{num2 == 3 ? '第三学期（本学期）' : '第三学期'}</option>)
            case 2:
                termArr.push(<option data='2' key={'r2'} value="2">&nbsp;{num2 == 2 ? '第二学期（本学期）' : '第二学期'}</option>)
            case 1:
                termArr.push(<option data='1' key={'r1'} value="1">&nbsp;{num2 == 1 ? '第一学期（本学期）' : '第一学期'}</option>)
        }

        this.setState({
            termArr: termArr.reverse(),
        })
    }

    changeHandle(e) {
        var value = e.target.value;
        var t = value;
        $.llsajax({
            url: 'degree/findList ',
            data: {
                term: t,
            },
            type: "POST",
            success: data => {
                var index = this.state.tabID;
                var len = data.obj.length;
                if (len > 0) {
                    var arr = [];
                    var term = 0;
                    var termNow = 0;
                    var id = '';
                    var initArr = [];
                    var classes = '';
                    for (var i = 0; i < len; i++) {
                        arr.push(data.obj[i]);
                        termNow = data.obj[index].nowTerm;
                        id = data.obj[index].id
                        initArr = data.obj[index].degrees;
                        classes = data.obj[index].name;
                    }
                    this.setState({
                        classArr: arr,
                        termNow: termNow,
                        t: t,
                        initArr: initArr,
                        searchArr: initArr,
                        classes: classes,
                        classId: id,
                        stunum: data.obj[index].stunum,
                        searchKeyWord: '',
                        searchCourse: '',
                        searchFlag: '',
                    })
                    this.createCommet(initArr)
                    var id = this.state.classId;
                    this.createCourse(arr || [], id, t)
                }
            },
        })

        document.getElementById("evaFlag").selectedIndex = 0;
        document.getElementById("evaCourse").selectedIndex = 0;
        this.setState({
            termName: value,
            t: t,
            inputVal: ''
        })
    }

    // mask控制
    clickHandle() {
        if (this.state.throne == 'T') {
            return false;
        }
        this.setState({
            openFile: true,
            objs: {},
        })
    }

    closeFile() {
        this.setState({
            openFile: false,
        })
    }

    /* 课程切换
        传参 id 为班级id
            t 为选择的学期
    */
    createCourse(arr, id, t) {
        var arr = arr
        var len = arr.length;
        var courseArr = [];
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                if (arr[i].id == id) {
                    courseArr = arr[i].courses || []
                }
            }
        }
        var len2 = courseArr.length;
        var courseName = []
        if (len2 > 0) {
            for (var j = 0; j < len2; j++) {
                courseName.push(
                    <option key={'o' + j} value={courseArr[j].id}>
                        &nbsp;{courseArr[j].name}
                    </option>
                )
            }
        }
        this.setState({
            courseList: courseName
        })
    }

    // 选择课程
    changeCourse(e) {
        var value = e.target.value;
        this.setState({
            courseId: value
        })
        var arr = this.state.initArr;
        this.searchCourseHandle(value, arr)
    }

    /*评价状态切换
    参数 flag:0:未进行，1：进行中，2：已结束

    未进行："C"权限可以进行删除，且"T"权限不可查看
    进行中和已结束："C"权限不可删除，"T"权限可以查看
    */

    // 修改评价状态
    changeFlag(e) {
        var value = e.target.value;
        this.setState({
            commetFlag: value
        })
        var arr = this.state.initArr;
        this.searchFlagHandle(value, arr)
    }

    // 搜索 :根据评价名称进行搜索
    searchKeyWordHandle(e) {
        var arr = this.state.initArr;
        var str = e.target.value;
        str = str.replace(/\s/g, '')
        if (e.target.value != '') {


            var arr2 = this.funKey(arr, str);
            if (arr2.length > 0) {
                var flag = this.state.searchFlag;
                if (flag == '') {
                    var course = this.state.searchCourse;
                    if (course == '') {
                        this.createCommet(arr2)
                    } else {
                        var arr4 = this.funCourse(arr2, course)
                        this.createCommet(arr4)
                    }
                } else {
                    var arr3 = this.funFlag(arr2, flag)
                    var course = this.state.searchCourse;
                    if (course == '') {
                        this.createCommet(arr3)
                    } else {
                        var arr5 = this.funCourse(arr3, course);
                        this.createCommet(arr5)
                    }
                }
            } else {
                this.createCommet(arr2)
            }
        } else {
            var flag = this.state.searchFlag;
            if (flag == '') {
                var course = this.state.searchCourse;
                if (course == '') {
                    this.createCommet(arr)
                } else {
                    var arr4 = this.funCourse(arr, course)
                    this.createCommet(arr4)
                }
            } else {
                var arr3 = this.funFlag(arr, flag)
                var course = this.state.searchCourse;
                if (course == '') {
                    this.createCommet(arr3)
                } else {
                    var arr5 = this.funCourse(arr3, course);
                    this.createCommet(arr5)
                }
            }
        }
        this.setState({
            searchKeyWord: e.target.value.replace(/\s/g, ''),
        })
    }

    // 搜索:根据课程名称进行搜索
    searchCourseHandle(value, arr) {
        var arr = arr;
        var value = value;
        if (value == '') {
            var flag = this.state.searchFlag;
            if (flag == '') {
                var str = this.state.searchKeyWord;
                if (str == '') {
                    this.createCommet(arr)
                } else {
                    var arr4 = this.funKey(arr, str)
                    this.createCommet(arr4)
                }
            } else {
                var arr3 = this.funFlag(arr, flag)
                var str = this.state.searchKeyWord;
                if (str == '') {
                    this.createCommet(arr3)
                } else {
                    var arr5 = this.funKey(arr3, str);
                    this.createCommet(arr5)
                }
            }
        } else {
            var arr2 = this.funCourse(arr, value);
            if (arr2.length > 0) {
                var flag = this.state.searchFlag;
                if (flag == '') {
                    var str = this.state.searchKeyWord;
                    if (str == '') {
                        this.createCommet(arr2)
                    } else {
                        var arr4 = this.funKey(arr2, str)
                        this.createCommet(arr4)
                    }
                } else {
                    var arr3 = this.funFlag(arr2, flag)
                    var str = this.state.searchKeyWord;
                    if (str == '') {
                        this.createCommet(arr3)
                    } else {
                        var arr5 = this.funKey(arr3, str);
                        this.createCommet(arr5)
                    }
                }
            } else {
                this.createCommet(arr2)
            }
        }
        // var str = this.state.searchKeyWord;
        this.setState({
            searchCourse: value,
        })
    }

    // 搜索:根据状态进行搜索
    searchFlagHandle(flag, arr) {
        var arr = arr;
        var flag = flag;
        if (flag == '') {
            var course = this.state.searchCourse;
            if (course == '') {
                var str = this.state.searchKeyWord;
                if (str == '') {
                    this.createCommet(arr)
                } else {
                    var arr4 = this.funKey(arr, str)
                    this.createCommet(arr4)
                }
            } else {
                var arr3 = this.funCourse(arr, course)
                var str = this.state.searchKeyWord;
                if (str == '') {
                    this.createCommet(arr3)
                } else {
                    var arr5 = this.funKey(arr3, str);
                    this.createCommet(arr5)
                }
            }
        } else {
            var arr2 = this.funFlag(arr, flag);
            if (arr2.length > 0) {
                var course = this.state.searchCourse;
                if (course == '') {
                    var str = this.state.searchKeyWord;
                    if (str == '') {
                        this.createCommet(arr2)
                    } else {
                        var arr4 = this.funKey(arr2, str)
                        this.createCommet(arr4)
                    }
                } else {
                    var arr3 = this.funCourse(arr2, course)
                    var str = this.state.searchKeyWord;
                    if (str == '') {
                        this.createCommet(arr3)
                    } else {
                        var arr5 = this.funKey(arr3, str);
                        this.createCommet(arr5)
                    }
                }
            } else {
                this.createCommet(arr2)
            }
        }
        this.setState({
            searchFlag: flag,
        })
    }

    /**
     * 筛选函数
     * 参数arr统一为筛选的数组
     * funFlag(arr,flag):筛选状态  flag:状态
     * funCourse(arr,course):筛选课程 course:课程
     * funKey(arr,key):筛选关键字 key:关键字
     */
    funFlag(arr, flag) {
        var len = arr.length
        var arr2 = [];
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                if (arr[i].flag == flag) {
                    arr2.push(arr[i])
                }
            }
        }
        return arr2
    }

    funCourse(arr, course) {
        var len = arr.length
        var arr2 = [];
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                if (arr[i].courseid == course) {
                    arr2.push(arr[i])
                }
            }
        }
        return arr2
    }

    funKey(arr, key) {
        var len = arr.length
        var arr2 = [];
        if (len > 0) {

            for (let i = 0; i < len; i++) {
                if (arr[i].dgname.indexOf(key) >= 0) {
                    arr2.push(arr[i])
                }
            }
        }
        return arr2
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


    // <div className="C-evaEle" key={'list' + i}>
    //
    // <h3 title={arr[i].dgname || '--'}>{arr[i].dgname || '--'}</h3>
    // <p>所属课程：{arr[i].coursename || '--'}</p>
    // <p><span>评价时间：</span><i>
    // {this.transIntoDate(arr[i].sdate) + '-' + this.transIntoDate(arr[i].edate)}
    // </i></p>
    // <p>总评人数：{numbers}</p>
    // <p className="evaCmtNum">
    // <span>已评：{arr[i].degreednum}</span>
    // <span>未评：{numbers - arr[i].degreednum}</span>
    // </p>
    // <a onClick={this.clickToDoSth.bind(this, arr[i].flag, arr[i])}>{arr[i].flag == 0 ? '修改' : '查看详情'}</a>
    // <i className={this.commetClass(arr[i].flag) + ' ' + "evaCmtFlag"}>{this.commetState(arr[i].flag)}</i>
    // <i className={arr[i].flag == 0 ? "iconfont closeShow icon-icon-test1" : "iconfont icon-icon-test1"}
    // onClick={this.deleteHandle.bind(this)} data={arr[i].id}></i>
    //
    // </div>
    // 生成评价的元素
    createCommet(arr, num) {
        // console.log(arr)
        var len = arr.length;
        // //console.log(this.state.stunum)
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
                            <span onClick={this.clickToDoSth.bind(this, arr[i].flag, arr[i])}><i className={arr[i].flag == 0 ? "iconfont icon-bianji" : "iconfont icon-yulan"}></i>{arr[i].flag == 0 ? '修改' : '查看详情'}</span>
                            <span style={arr[i].flag == 0 ? null : {display: "none"}} onClick={this.deleteHandle.bind(this)} data={arr[i].id}><i className="iconfont icon-SHANCHU-"></i>删除</span>
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

    // 更新评价列表
    refrashList() {

    }

    // 点击查看详情或修改按钮
    clickToDoSth(flag, obj) {
        // console.log(obj)
        // if(1==1){
        //     return false;
        // }
        if (flag == 0) {
            // console.log(obj)
            console.log(this.state.classes)
            this.setState({
                course:obj.courseid,
                openFile: true,
                edit: flag,
                objs: obj,
            })
        } else {
            var classes = this.state.classes//班级名称 
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

    // 删除评价
    deleteHandle(e) {
        var id = e.target.getAttribute('data')
        this.setState({
            bumbid: id,
            isHidden: false,
        })

    }

    // 数据更新
    getDataAjax(t) {
        var index = this.state.tabID;
        var flag = this.state.flag;
        var course = this.state.courseId;
        // //console.log(t)
        if (t) {
            $.llsajax({
                url: 'degree/findList ',
                type: "POST",
                data: {
                    term: t
                },
                success: data => {

                    var len = data.obj.length;
                    if (len > 0) {
                        var arr = [];
                        var term = 0;
                        var termNow = 0;
                        var id = '';
                        var initArr = [];
                        var classes = '';
                        for (var i = 0; i < len; i++) {
                            if (this.state.throne == 'T') {
                                if (data.obj[index].flag == 0) {
                                    continue;
                                }
                            } else {
                                arr.push(data.obj[i]);
                            }
                            // term = data.obj[index].termNum;
                            termNow = data.obj[index].nowTerm;
                            id = data.obj[index].id
                            initArr = data.obj[index].degrees;
                            classes = data.obj[index].name;
                        }
                        this.setState({
                            classArr: arr || [],
                            termNow: termNow,
                            initArr: initArr,
                            searchArr: initArr,
                            classes: classes,
                            classId: id,
                            stunum: data.obj[index].stunum,
                            arrData: data.obj,
                            // edit:3,
                        })
                        var flag = this.state.flag;
                        var course = this.state.courseId;
                        if (!!flag && !!course) {
                            this.createCommet(initArr)
                        } else {
                            this.setState({
                                searchKeyWord: '',
                            })
                            this.searchCourseHandle(course, initArr)
                        }
                        // this.createCommet(initArr)
                    }
                },
            })
            document.getElementById("evaBodySelect").selectedIndex = t - 1;
        } else {
            $.llsajax({
                url: 'degree/findList ',
                type: "POST",
                success: data => {
                    var len = data.obj.length;
                    if (len > 0) {
                        var arr = [];
                        var term = 0;
                        var termNow = 0;
                        var id = '';
                        var initArr = [];
                        var classes = '';
                        for (var i = 0; i < len; i++) {
                            if (this.state.throne == 'T') {
                                if (data.obj[index].flag == 0) {
                                    continue;
                                }
                            } else {

                                arr.push(data.obj[i]);
                            }
                            termNow = data.obj[index].nowTerm;
                            id = data.obj[index].id
                            initArr = data.obj[index].degrees;
                            classes = data.obj[index].name;
                        }
                        this.setState({
                            classArr: arr || [],
                            termNow: termNow,
                            initArr: initArr,
                            searchArr: initArr,
                            classes: classes,
                            classId: id,
                            stunum: data.obj[index].stunum,
                            arrData: data.obj
                        })
                        var flag = this.state.flag;
                        var course = this.state.courseId;
                        if (flag == null && course == null) {
                            this.createCommet(initArr)
                        } else {
                            this.setState({
                                searchKeyWord: '',
                            })
                            this.searchCourseHandle(course, initArr)
                        }
                        // this.createCommet(initArr)
                    }
                },
            })
        }

    }

    changeEdit() {
        this.setState({
            edit: 3
        })
    }

    // bumbbox
    hideClick() {
        this.setState({
            isHidden: true,
        })
    }

    enterClick() {
        // //console.log(this.state.t)
        var id = this.state.bumbid
        $.llsajax({
            url: 'degree/deleteDegree ',
            data: {
                id: id
            },
            type: "POST",
            success: data => {
                this.getDataAjax(this.state.t)
                this.setState({
                    isHidden: true
                })
            },
        })
    }

    componentDidMount() {
        // //console.log(this.state.termNow)
        var term = sessionStorage.getItem('Ynt')
        if (term != 'off' && term) {
            document.getElementById("evaBodySelect").selectedIndex = term - 1;
        } else {
            document.getElementById("evaBodySelect").selectedIndex = Number(this.state.termNow) - 1;
        }
        sessionStorage.setItem('Ynt', 'off');
        sessionStorage.setItem('Yci', 'off')
    }

    clickToPath() {
        hashHistory.push({
            pathname: '/evaluatingtemplate',

        })
    }

    getMajorAjax() {
        $.llsajax({
            url: "major/findMajor",
            type: "POST",
            success: data => {
                // console.log(data)
                this.setState({
                    major: data.majors,
                })
            }
        })
    }
}