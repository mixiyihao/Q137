import React from 'react';
import ReactDOM from 'react-dom'
import { Link, hashHistory } from 'react-router';
import $ from 'jquery';
import './stuEva.css'
import url from '../../controller/url.js';

export default class StuEvaBody extends React.Component {
    constructor() {
        super();
        this.state = {
            courseList: [],//专业
            // stageList: [],//阶段
            classStu: '',//班级人数
            degreeArr: '',//评价数
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
            noData: false,
            t: '',
            initT: '',//当前学期
            mark: '1',//切换
            //课时
            lt: '',//课时学期
            lc: '',//课时专业
            ls: '',//课时阶段
            lf: '',//课时状态
            // 专业
            course: [],
            // 阶段
            stageArr: [],
            page: 1,
            total: 1,
            count: 0,
        }
    }
    componentWillMount() {
        var t = JSON.parse(sessionStorage.getItem('leftNavBar')).nowTerm
        var tm = t
        var hashStr = window.location.hash;
        if (hashStr.indexOf('v=') > 0) {
            var course = ''
            var stage = ''
            var state = ''
            var tm = Base64.decode(hashStr.split('&tm=')[1])
            this.getDataAjax2(tm, course, stage, state)
            $.llsajax({
                url: 'degree/findList ',
                data: {
                    term: tm
                },
                type: "POST",
                success: data => {
                    var data = data.obj
                    var courseData = data.courses;
                    var stuNum = data.stunum;
                    var degreeArr = data.degreeList;
                    var len = courseData.length

                    if (len > 0) {
                        var courseList = [];
                        for (var i = 0; i < len; i++) {
                            courseList.push(
                                <option key={'o' + i} value={courseData[i].id}>
                                    &nbsp;{courseData[i].name}
                                </option>
                            )
                        }
                        this.setState({
                            courseList: courseList
                        })
                    }
                    this.setState({
                        classStu: stuNum,
                        degreeArr: degreeArr,
                        initArr: degreeArr,
                        searchArr: degreeArr,
                        course: courseData
                    })
                    // this.createCommet(degreeArr, stuNum)
                },
            })
            this.setState({
                mark: Base64.decode(hashStr.split('v=')[1].split('&')[0]),
                lt: tm,
                initT: tm,
            })
        } else {
            if (hashStr.indexOf('tm=') > 0) {
                tm = Base64.decode(hashStr.split('tm=')[1].split('&')[0])
            }
            $.llsajax({
                url: 'degree/findList ',
                data: {
                    term: t
                },
                type: "POST",
                success: data => {
                    var data = data.obj
                    var courseData = data.courses;
                    var stuNum = data.stunum;
                    var degreeArr = data.degreeList;
                    var len = courseData.length

                    if (len > 0) {
                        var courseList = [];
                        for (var i = 0; i < len; i++) {
                            courseList.push(
                                <option key={'o' + i} value={courseData[i].id}>
                                    &nbsp;{courseData[i].name}
                                </option>
                            )
                        }
                        this.setState({
                            courseList: courseList
                        })
                    }
                    this.setState({
                        classStu: stuNum,
                        degreeArr: degreeArr,
                        initArr: degreeArr,
                        searchArr: degreeArr,
                        course: courseData
                    })
                    this.createCommet(degreeArr, stuNum)
                },
            })
            this.setState({
                initT: tm || t,
                lt: tm || t,
                t: tm || t,
            })
        }
        this.createTerm(t, t)
    }
    render() {
        let noData = {
            display: this.state.noData == false ? 'none' : 'block',
        }
        let eva2 = {
            display: this.state.mark == '1' ? 'none' : 'inline-block'
        }
        let page = {
            display: this.state.mark == '1' || this.state.total < 2 ? 'none' : 'block'
        }
        return (<div className="stuEvaBody">
            <h2>我的评价问卷</h2>
            <div className="stuEvaTabItem">
                <span
                    data-item='1'
                    onClick={this.changeTabHandle.bind(this)}
                    className={this.state.mark == '1' ? 'tabItem current' : 'tabItem'}
                >老师评价问卷</span>
                <span
                    data-item='2'
                    onClick={this.changeTabHandle.bind(this)}
                    className={this.state.mark == '2' ? 'tabItem current' : 'tabItem'}
                >课时评价问卷</span>
            </div>
            <div className={this.state.mark == '1' ? "stuEvaFilter" : "stuEvaFilter stuEvafilter2"}>
                <span>
                    选择学期：
                      <select name="" id="termSeleEva" onChange={this.state.mark == '1' ? this.changeHandle.bind(this) : this.changeHandle2.bind(this)}>
                        {this.state.termArr}
                    </select>
                </span>
                <span>
                    选择课程：
                        <select name="" id="stuEvaCourse" onChange={this.state.mark == '1' ? this.changeCourse.bind(this) : this.changeCourse2.bind(this)}>
                        <option value="">&nbsp;全部课程</option>
                        {this.state.courseList}
                    </select>
                </span>
                <span style={eva2}>
                    选择阶段：
                        <select name="" id="stuEvaStage" onChange={this.changeStage.bind(this)}>
                        <option value="">&nbsp;全部阶段</option>
                        {this.state.stageArr}
                    </select>
                </span>
                <span className="stuEvaFlag">
                    评价状态：
                        <select name="" id="stuEvaFlag" onChange={this.state.mark == '1' ? this.changeFlag.bind(this) : this.changeFlag2.bind(this)}>
                        {this.createOption(this.state.mark)}
                    </select>
                </span>

            </div>
            <table className="stuEvaTable">
                {this.createTh(this.state.mark)}
                <tbody>
                    {this.state.list}
                </tbody>
            </table>

            <div className="pageBtn" style={page}>
                <span>
                    共<i>{this.state.total}</i>页
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            第<i className="underLine">{this.state.page}</i>页
                        </span>
                <a className={this.state.page < 2 ? 'noUse' : ''} onClick={this.prevPage.bind(this)}>上一页</a>
                <a className={this.state.page >= this.state.total ? 'noUse' : ''} onClick={this.nextPage.bind(this)}>下一页</a>
            </div>
            <div style={noData} className="evaNoData">
                <i>当前无满意度评价记录</i></div>
        </div>)
    }
    changeTabHandle(e) {
        // console.log(e.target)
        var mark = e.target.getAttribute('data-item')
        var t = this.state.initT
        document.getElementById("stuEvaFlag").selectedIndex = 0;
        document.getElementById("stuEvaCourse").selectedIndex = 0;
        document.getElementById("termSeleEva").selectedIndex = Number(this.state.initT) - 1;
        if (mark == '1') {
            this.getDataAjax(t)
            document.getElementById("stuEvaFlag").selectedIndex = 3;
        } else {
            var course = ''
            var stage = ''
            var state = ''
            this.getDataAjax2(t, course, stage, state)
            this.setState({
                lt: this.state.initT,//课时学期
                lc: '',//课时专业
                ls: '',//课时阶段
                lf: '',//课时状态
                // 阶段
                stageArr: [],
            })
        }
        this.setState({
            mark: mark,
            searchKeyWord: '',
            searchCourse: '',
            searchFlag: '',
        })

    }
    // 修改学期
    createTerm(num1, num2) {
        var termArr = [];
        switch (num1) {
            case 5:
                termArr.push(<option data='5' key={'r5'} value='5'>&nbsp;{num2 == 5 ? '第五学期（本学期）' : '第五学期'}</option>)
            case 4:
                termArr.push(<option data='4' key={'r4'} value='4'>&nbsp;{num2 == 4 ? '第四学期（本学期）' : '第四学期'}</option>)
            case 3:
                termArr.push(<option data='3' key={'r3'} value='3'>&nbsp;{num2 == 3 ? '第三学期（本学期）' : '第三学期'}</option>)
            case 2:
                termArr.push(<option data='2' key={'r2'} value='2'>&nbsp;{num2 == 2 ? '第二学期（本学期）' : '第二学期'}</option>)
            case 1:
                termArr.push(<option data='1' key={'r1'} value='1'>&nbsp;{num2 == 1 ? '第一学期（本学期）' : '第一学期'}</option>)
        }
        this.setState({
            termArr: termArr.reverse(),
        })
    }
    changeHandle(e) {
        var value = e.target.value
        var t = value;
        this.getDataAjax(t)
        document.getElementById("stuEvaFlag").selectedIndex = 0;
        document.getElementById("stuEvaCourse").selectedIndex = 0;

        this.setState({
            termName: value,
            t: t,
            searchKeyWord: '',
            searchCourse: '',
            searchFlag: '',
        })
    }
    changeHandle2(e) {
        var t = e.target.value;
        var course = this.state.lc
        var stage = this.state.ls
        var state = this.state.lf
        $.llsajax({
            url: 'degree/findList ',
            data: {
                term: t,
            },
            type: "POST",
            success: data => {

                var data = data.obj
                var courseData = data.courses;
                var stuNum = data.stunum;
                var degreeArr = data.degreeList;
                var len = courseData.length

                if (len > 0) {
                    var courseList = [];
                    for (var i = 0; i < len; i++) {
                        courseList.push(
                            <option key={'o' + i} value={courseData[i].id}>
                                &nbsp;{courseData[i].name}
                            </option>
                        )
                    }
                    this.setState({
                        courseList: courseList,
                        course: courseData,
                    })
                }
            },
        })

        this.getDataAjax2(t, course, stage, state, 1)
        this.setState({
            lt: t
        })
    }
    // 课时评价修改课程
    changeCourse2(e) {
        var c = e.target.value;
        var t = this.state.lt;
        var stage = this.state.ls
        var state = this.state.lf
        var cs = this.state.course
        var stage = '';
        var len = cs.length;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                if (c == cs[i].id) {
                    stage = cs[i].stage;
                }
            }
        }

        this.createStageS(stage)
        var stages = this.state.ls
        this.getDataAjax2(t, c, stages, state, 1)
        this.setState({
            lc: c,
        })

    }
    // 可是评价修改状态
    changeFlag2(e) {
        var f = e.target.value;
        var c = this.state.lc
        var t = this.state.lt;
        var stage = this.state.ls

        this.getDataAjax2(t, c, stage, f, 1)
        this.setState({
            lf: f
        })
    }
    // 修改阶段
    changeStage(e) {
        var s = e.target.value;
        var c = this.state.lc
        var t = this.state.lt;
        var f = this.state.lf;
        this.getDataAjax2(t, c, s, f, 1)
        this.setState({
            ls: s
        })
    }
    // 选择课程
    changeCourse(e) {
        var value = e.target.value;
        this.setState({
            courseId: value
        })
        this.searchCourseHandle(value)
    }
    // 修改评价状态
    changeFlag(e) {
        var value = e.target.value;
        this.setState({
            commetFlag: value
        })
        this.searchFlagHandle(value)
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
            searchKeyWord: str,
        })
    }
    // 搜索:根据课程名称进行搜索
    searchCourseHandle(value) {
        var arr = this.state.initArr;
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
        this.setState({
            searchCourse: value,
        })
    }
    // 搜索:根据状态进行搜索
    searchFlagHandle(flag) {
        var arr = this.state.initArr;
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
    // 生成评价的元素
    createCommet(arr) {
        var len = arr.length;
        if (len > 0) {
            this.setState({
                noData: false,
            })
            var list = [];
            let state = '';
            if (this.state.mark == '1') {

                for (var i = 0; i < len; i++) {
                    if (arr[i].flag == 0) {
                        continue;
                    } else {

                        list.push(
                            <tr key={'list' + i}>
                                <td><div className='evaCmtTit'>{arr[i].dgname || '--'}</div></td>
                                <td><div className='evaCmtCor'>{arr[i].coursename || '--'}</div></td>
                                <td><div className='evaCmtTim'>{this.transIntoDate(arr[i].sdate) + '-' + this.transIntoDate(arr[i].edate)}</div></td>
                                <td><div className='evaCmtSta'>{this.commetState(arr[i].flag)}</div></td>
                                <td><div className='evaCmtHan' onClick={this.clickToDoSth.bind(this, arr[i].flag, arr[i])}>
                                    <i className={this.createClass(arr[i].flag)}></i>
                                    {this.commetWord(arr[i].flag)}</div></td>
                            </tr>

                        )
                    }
                }
            } else {
                for (var i = 0; i < len; i++) {
                    list.push(
                        <tr key={'list' + i}>
                            <td><div className='evaCmtLes'>{arr[i].name || '--'}</div></td>
                            <td><div className='evaCmtStg'>{this.createStage(arr[i])}</div></td>
                            <td><div className='evaCmtCor2'>{arr[i].coursename || '--'}</div></td>
                            <td><div className='evaCmtSta2'>{!arr[i].freedegreeid ? '未评价' : '已评价'}</div></td>
                            <td><div className='evaCmtHan2' onClick={this.clickToDoSth2.bind(this, arr[i])}>
                                <i className={!arr[i].freedegreeid ? 'iconfont icon-yijianfankui' : 'iconfont icon-yulan'}></i>
                                {!arr[i].freedegreeid ? '去评价' : '查看评价'}</div></td>
                        </tr>

                    )
                }
            }
            if (list.length < 1) {
                this.setState({
                    noData: true,
                })
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
    createClass(flag) {
        var flag = flag + ''
        var str = ''
        switch (flag) {
            case '1':
                str = 'iconfont icon-yijianfankui'
                break;

            case '3':
                str = 'iconfont icon-yulan'
                break;
        }
        return str
    }
    // 获取数据
    getDataAjax(t) {
        $.llsajax({
            url: 'degree/findList ',
            data: {
                term: t,
            },
            type: "POST",
            success: data => {

                var data = data.obj
                var courseData = data.courses;
                var stuNum = data.stunum;
                var degreeArr = data.degreeList;
                var len = courseData.length

                if (len > 0) {
                    var courseList = [];
                    for (var i = 0; i < len; i++) {
                        courseList.push(
                            <option key={'o' + i} value={courseData[i].id}>
                                &nbsp;{courseData[i].name}
                            </option>
                        )
                    }
                    this.setState({
                        courseList: courseList
                    })
                }
                this.setState({
                    classStu: stuNum,
                    degreeArr: degreeArr,
                    initArr: degreeArr,
                    searchArr: degreeArr,
                    course: courseData
                })
                this.createCommet(degreeArr, stuNum)

            },
        })

    }
    getDataAjax2(term, course, stage, state, page) {
        $.llsajax({
            url: 'degree/findLessonDegree ',
            data: {
                term: term,
                courseid: course,
                stage: stage,
                type: state,
                page: page,
            },
            type: "POST",
            success: data => {
                var arr = data.data.rows
                console.log(data)
                this.setState({
                    page: data.data.page,
                    total: data.data.total,
                    count: data.data.count,

                })
                this.createCommet(arr)
            },
        })
    }
    clickToDoSth(flag, obj) {
        if (flag == 2) {
            return false;
        }
        if (flag == 1) {
            var i = obj.id;
            hashHistory.push({
                pathname: '/evaluatePageMain',
                query: {
                    i: Base64.encodeURI(i),
                    tm: Base64.encodeURI(this.state.t)
                },
            })
        } else {
            var classes = this.state.classes
            var sTime = obj.sdate
            var eTime = obj.edate
            var nowTerm = obj.term
            var evaName = obj.dgname
            var courseName = obj.coursename
            var classId = this.state.classId
            var degreeId = obj.id
            var classname = obj.classname
            hashHistory.push({
                pathname: '/Seeevares',
                query: {
                    cls: Base64.encodeURI(classes),
                    st: sTime,
                    et: eTime,
                    nt: nowTerm,
                    en: Base64.encodeURI(evaName),
                    cn: Base64.encodeURI(courseName),
                    ci: classId,
                    di: degreeId,
                    csn: Base64.encodeURI(classname),
                    tm: Base64.encodeURI(this.state.mark == '1' ? this.state.t : this.state.lt)
                },
            })
        }
    }
    clickToDoSth2(obj) {
        var i = obj.id
        if (!obj.freedegreeid) {
            hashHistory.push({
                pathname: '/LessonEvaluate',
                query: {
                    id: Base64.encodeURI(i),
                    v: Base64.encodeURI(this.state.mark),
                    tm: Base64.encodeURI(this.state.lt)
                },
            })
        } else {
            hashHistory.push({
                pathname: '/showLessonEvaluate',
                query: {
                    id: Base64.encodeURI(i),
                    v: Base64.encodeURI(this.state.mark),
                    tm: Base64.encodeURI(this.state.lt)
                },
            })
        }
    }
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
            case 3:
                str = '已评价'
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
                str = 'isDoing';
                break;
            case 0:
                str = '';
                break;
            case 2:
                str = '';
                break;
            case 3:
                str = 'isFinish';
                break;
        }
        return str


    }
    commetWord(flag) {
        var str = '--'
        switch (flag) {

            case 1:
                str = '开始评价';
                break;
            case 0:
                str = '未进行';
                break;
            case 2:
                str = '--';
                break;
            case 3:
                str = '查看评价';
                break;
        }
        return str
    }
    componentDidMount() {
        document.getElementById("termSeleEva").selectedIndex = Number(this.state.initT) - 1;
    }
    createTh(type) {
        var type = type + ''
        var arr = [];
        switch (type) {
            case '1':
                arr.push(
                    <tr key='tr1'>
                        <th width='201px'>评价名称</th>
                        <th width='240px'>所属课程</th>
                        <th width='338px'>评价时间</th>
                        <th width='115px'>评价状态</th>
                        <th width='115px'>操作</th>
                    </tr>
                )
                break;
            case '2':
                arr.push(
                    <tr key='tr2'>
                        <th width='252px'>所属课时</th>
                        <th width='200px'>所属阶段</th>
                        <th width='327px'>所属课程</th>
                        <th width='115px'>评价状态</th>
                        <th width='115px'>操作</th>
                    </tr>
                )
                break;
        }
        return arr
    }
    createStageS(num) {
        // console.log(num)
        var num = num + ''
        var arr = []
        // console.log(num)
        switch (num) {
            case '5':
                arr.push(<option value="5" key={'stageK5'}>&nbsp;第五阶段</option>)
            case '4':
                arr.push(<option value="4" key={'stageK4'}>&nbsp;第四阶段</option>)
            case '3':
                arr.push(<option value="3" key={'stageK3'}>&nbsp;第三阶段</option>)
            case '2':
                arr.push(<option value="2" key={'stageK2'}>&nbsp;第二阶段</option>)
            case '1':
                arr.push(<option value="1" key={'stageK1'}>&nbsp;第一阶段</option>)
        }
        arr = arr.reverse();
        this.setState({
            stageArr: arr,
        })
        // return arr
    }
    createOption(type) {
        var type = type + ''
        var arr = []
        switch (type) {
            case '1':
                switch (4) {
                    case 4:
                        arr.push(<option key={'opt4'} value="">&nbsp;全部</option>)
                    case 3:
                        arr.push(<option key={'opt3'} value="1">&nbsp;进行中</option>)
                    case 2:
                        arr.push(<option key={'opt2'} value="2">&nbsp;已结束</option>)
                    case 1:
                        arr.push(<option key={'opt1'} value="3">&nbsp;已评价</option>)
                }
                break;
            case '2':
                switch (3) {
                    case 3:
                        arr.push(<option key={'opt3'} value="">&nbsp;全部</option>)
                    case 2:
                        arr.push(<option key={'opt2'} value="1">&nbsp;进行中</option>)
                    case 1:
                        arr.push(<option key={'opt1'} value="2">&nbsp;已结束</option>)
                }
                break;
        }
        return arr
    }
    nextPage() {
        // console.log(this.state.lt)
        var page = this.state.page
        var total = this.state.total;
        if (page >= total) {
            return false;
        } else {
            var s = this.state.ls;
            var c = this.state.lc
            var t = this.state.lt;
            var f = this.state.lf;
            // console.log(e.target.value)
            var p = Number(page) + 1
            this.getDataAjax2(t, c, s, f, p)
        }
    }
    prevPage() {
        var page = this.state.page
        var total = this.state.total;
        if (page < 2) {
            return false;
        } else {

            var s = this.state.ls;
            var c = this.state.lc
            var t = this.state.lt;
            var f = this.state.lf;
            var p = page - 1
            // console.log(e.target.value)
            this.getDataAjax2(t, c, s, f, p)
        }
    }
    // 将数字转换为中文
    intToChinese(str) {
        str = str + '';
        var len = str.length - 1;
        var idxs = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
        var num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        return str.replace(/([1-9]|0+)/g, function ($, $1, idx, full) {
            var pos = 0;
            if ($1[0] != '0') {
                pos = len - idx;
                if (idx == 0 && $1[0] == 1 && idxs[len - idx] == '十') {
                    return idxs[len - idx];
                }
                return num[$1[0]] + idxs[len - idx];
            } else {
                var left = len - idx;
                var right = len - idx + $1.length;
                if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
                    pos = left - left % 4;
                }
                if (pos) {
                    return idxs[pos] + num[$1[0]];
                } else if (idx + $1.length >= len) {
                    return '';
                } else {
                    return num[$1[0]]
                }
            }
        });
    }
    // 生成阶段名
    createStage(obj) {
        var str = ''
        var str1 = this.intToChinese(obj.stage_ordernum)
        str = '第' + str1 + '阶段'
        return str;
    }
}