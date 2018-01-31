import React from 'react';
import {
    Link, hashHistory
} from 'react-router';
import $ from 'jquery';
import url from '../../controller/url.js';

import './stuExMain.css';
import Sproquiz from '../quizzes/Sproquiz.js' //阶段
import Sprofinal from '../finalExam/Sprofinal.js' //期末与小测


export default class StuExamMain extends React.Component {
    constructor() {
        super();
        this.state = {
            titleName: '',//切换显示标题名称
            tabIndex: '0',//切换标签的index
            changeText: '我的期末考试',//切换tab改变title名称
            term: '5',//当前学期
            finalData: [],//期末考试数据
            classData: [],//随堂测验数据
            testData: [],//小测验数据
            testType: '',//测验类型
            testAction: '',//操作 预览/参加
            finalExamShow: false,//期末考试/小测试页是否显示
            testShow: false,//测试页面是否显示
            testId: '',//将参加或预览的考试的id
            total: 1,//小测验分页总页
            page: 1,//小测验分页当前页
            data: {},//考试数据
            schoolDataList: [],//学校成绩数据列表
            schoolAllData: [],//综合成绩数组
        }
    }

    falseAll() {
        this.setState({
            finalExamShow: false,//期末考试/小测试页是否显示
            testShow: false,//测试页面是否显示
        })
        var term = this.state.term;
        var index = this.state.tabIndex + ''
        // console.log(index)
        switch (index) {
            case '0':
                this.getAllDataAjax(term)
                break;
            case '1':
                this.getAllClassAjax(true)
                break;
            case '2':
                this.getAllTestAjax(1, true)
                break;
        }

        // this.changeTabHandle(index)
    }
    componentWillMount() {
        // //console.log(this.props)
        var type = window.location.hash
        var typeJudge = false;
        if (type.indexOf('type=') > 0) {
            var types = type.split('type=')[1]
            if ((types != '0' && types != '1' && types != 'null') || types == '2') {
                typeJudge = true
            }
        }
        var termNow = sessionStorage.getItem('termNow')
        this.setState({
            term: termNow,
        })


        // 请求数据
        this.getAllDataAjax(termNow)
        this.getAllClassAjax()
        this.getAllTestAjax(1, typeJudge)
        this.getSchoolData()
    }
    // 获取期末考试
    getAllDataAjax(term) {
        $.llsajax({
            url: "exam/getfinalexamlist",
            type: "post",
            async: false,
            success: data => {
                var arr = data.list || [];
                this.setState({
                    finalData: arr,
                })
                this.createTerm(term, 0, arr);
            }
        })

    }
    // 获取随堂测验
    getAllClassAjax(flag) {
        $.llsajax({
            url: "exam/getlestestlist",
            type: "post",
            async: false,
            success: data => {
                // console.log(data)
                this.setState({
                    classData: data.list || [],
                })
                if (!!flag == true) {
                    var term = this.state.term;
                    var i = this.state.tabIndex
                    var arr = data.list || []
                    this.createTerm(term, i, arr)
                }
            }
        })

    }
    // 获取小测验数据
    getAllTestAjax(page, flag) {
        $.llsajax({
            url: "exam/gettestlist",
            type: "post",
            data: {
                page: page
            },
            success: data => {
                this.setState({
                    testData: data.rows || [],
                    pageTotal: data.total,
                })
                if (!!flag == true) {
                    var arr = data.rows || []
                    this.createTestNameArray(arr)
                }
            }
        })
    }
    // 获取学校成绩数据
    getSchoolData() {
        $.llsajax({
            url: "exam/getSchoolExam",
            type: "post",
            success: data => {
                this.setState({
                    schoolDataList: data.schoolexam,
                    schoolAllData: data.schoolevaluate,
                })
            }
        })
    }
    render() {
        let showTit = {
            display: this.state.tabIndex == '2' ? 'block' : 'none'
        }
        let showTit2 = {
            display: this.state.tabIndex == '0' || this.state.tabIndex == '1' ? 'block' : 'none',
        }
        let showTit3 = {
            display: this.state.tabIndex == '3' ? 'block' : 'none',
        }
        let showLine = {
            display: this.state.tabIndex == '2' ? 'none' : 'block'
        }
        let pageShow = {
            display: this.state.pageTotal >= 2 &&this.state.tabIndex==2? 'block' : 'none'
        }
        return (<div className="stuExamMain">
            <div className="stuExamTab">
                <div className="stuExamTabWrap">
                    <div className="ExamTabs">
                        <span className={this.state.tabIndex == '0' ? "ExamTabsItem current" : "ExamTabsItem"} data-tab='0' onClick={this.changeTabHandle.bind(this)} title='联想课程的期末考试成绩'>期末考试</span>
                        <span className={this.state.tabIndex == '1' ? "ExamTabsItem current" : "ExamTabsItem"} data-tab='1' onClick={this.changeTabHandle.bind(this)} title='联想课程的阶段测试成绩'>阶段测试</span>
                        <span className={this.state.tabIndex == '2' ? "ExamTabsItem current" : "ExamTabsItem"} data-tab='2' onClick={this.changeTabHandle.bind(this)} title='助教老师不定期的测验'>小测验</span>
                        <span className={this.state.tabIndex == '3' ? "ExamTabsItem current" : "ExamTabsItem"} data-tab='3' onClick={this.changeTabHandle.bind(this)} title='学员在学校的课程成绩及综合表现'>学校成绩</span>
                    </div>
                </div>
            </div>
            <div className="stuExamMainWrapper">
                <div className="stuExamMainInner">
                    <h2>{this.state.changeText}</h2>
                    <div className="examTableTitle" style={showTit}>
                        <span className="examTableTitSpan01">{'课程名称'}</span>
                        <span className="examTableTitSpan02">考试名称</span>
                        <span className="examTableTitSpan03">详情</span>
                        <span className="examTableTitSpan04">操作</span>
                    </div>
                    <div className="finalAndStageTableTitle" style={showTit2}>
                        <span className="finalAndStageTableTitSpan01">{'课程名称'}</span>
                        <span className="finalAndStageTableTitSpan02">考试名称</span>
                        <span className="finalAndStageTableTitSpan03">详情</span>
                        <span className="finalAndStageTableTitSpan04">操作</span>
                    </div>
                    <div className="schoolScTableTitle" style={showTit3}>
                        <span className="schoolScTableTitSpan01">{'课程名称'}</span>
                        <span className="schoolScTableTitSpan02">考试名称</span>
                        <span className="schoolScTableTitSpan03">分数</span>
                    </div>
                    <div className="stuExamListBox">

                        <i className={this.state.tabIndex == 3 ? "borderLine tabI3" : 'borderLine'} style={showLine}></i>
                        {this.state.arrTerm}
                    </div>
                    <div className="pageBtn" style={pageShow}>
                        <span>
                            共<i>{this.state.pageTotal}</i>页
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            第<i className="underLine">{this.state.page}</i>页
                        </span>
                        <a className={this.state.page < 2 ? 'noUse' : ''} onClick={this.prevPage.bind(this)}>上一页<i className="iconfont icon-shangyiye"></i></a>
                        <a className={this.state.page >= this.state.pageTotal ? 'noUse' : ''} onClick={this.nextPage.bind(this)}>下一页<i className="iconfont icon-xiayiye"></i></a>
                    </div>
                </div>
            </div>
            {this.state.testShow ? <Sproquiz
                data={this.state.data}
                Sproexstate={this.state.testAction}
                onHideExam={this.falseAll.bind(this)}
                refreshPage = {this.refreshPage.bind(this)}
            /> : null}
            {this.state.finalExamShow ? <Sprofinal
                data={this.state.data}
                Sproexstate={this.state.testAction}
                onHideExam={this.falseAll.bind(this)}
                refreshPage = {this.refreshPage.bind(this)}
            /> : null}
        </div>)
    }
    // 切换tab操作
    changeTabHandle(e) {
        var term = this.state.term;
        var i = e.target.getAttribute('data-tab')

        this.setState({
            tabIndex: i,
            testType:i,
        })
        this.changeText(i);
        switch (i) {
            case '0':
                var arr = this.state.finalData;
                this.createTerm(term, i, arr)
                break;
            case '1':
                var arr = this.state.classData;
                var term = this.state.term;
                this.createTerm(term, i, arr)
                break;
            case '2':
                var arr = this.state.testData;
                this.createTestNameArray(arr)
                break;
            case '3':
                var arr1 = this.state.schoolAllData
                var arr2 = this.state.schoolDataList
                this.schoolScore(term, arr1, arr2)
                break;
        }

    }
    // 更改h2内容
    changeText(i) {
        var i = i + '';
        switch (i) {
            case '0':
                this.setState({
                    changeText: '我的期末考试'
                })
                break;
            case '1':
                this.setState({
                    changeText: '我的阶段测试'
                })
                break;
            case '2':
                this.setState({
                    changeText: '我的小测验'
                })
                break;
            case '3':
                this.setState({
                    changeText: '我的学校成绩'
                })
                break;
        }
    }
    componentDidMount() {
        var type = window.location.hash
        if (type.indexOf('type=') > 0) {
            var types = type.split('type=')[1]
            var typeJudge = ''
            if (types == '1') {
                typeJudge = '0'
            } else if (types == '0') {
                typeJudge = '1'
            } else if ((types != '0' && types != '1' && types != 'null') || types == '2') {
                typeJudge = '2'
            }
            // console.log(typeJudge)
            switch (typeJudge) {
                case '1':
                    var arr = this.state.classData;
                    // console.log(arr)
                    var term = this.state.term;
                    this.createTerm(term, 1, arr)
                    this.setState({
                        tabIndex: '1',
                        changeText: '我的阶段测试'
                    })
                    break;
                case '2':
                    var arr = this.state.testData;
                    this.createTestNameArray(arr)
                    this.setState({
                        tabIndex: '2',
                        changeText: '我的小测验'
                    })
                    break;
            }
        }
        let _this = this;
        $(window).scroll(function () {
            if ($(window).scrollTop() > 146) {
                $('.stuExamTab').addClass('onTheTop')
            }
            else {
                $('.stuExamTab').removeClass('onTheTop')
            }

        });
    }
    /**生成学期
     * num:当前学期
     * num1:测验类型 0:期末 1:随堂 2:小测 arr:所有数据
     */
    createTerm(num, num1, arr) {
        console.log(num1)
        var num = num + '';
        var num1 = num1 + '';
        var arrTerm = [];
        var arrData = arr;
        var arrT1 = [];
        var arrT2 = [];
        var arrT3 = [];
        var arrT4 = [];
        var arrT5 = [];
        var arrLength = arrData.length
        if (arrLength > 0) {
            for (var i = 0; i < arrLength; i++) {
                if (arrData[i].term == 1) {
                    arrT1.push(arrData[i])
                }
                if (arrData[i].term == 2) {
                    arrT2.push(arrData[i])
                }
                if (arrData[i].term == 3) {
                    arrT3.push(arrData[i])
                }
                if (arrData[i].term == 4) {
                    arrT4.push(arrData[i])
                }
                if (arrData[i].term == 5) {
                    arrT5.push(arrData[i])
                }
            }
        }
        switch (num) {
            case '5':
                switch (num1) {
                    case '0':
                        arrTerm.push(<div className="examTermWrap" key={'examTermWrap50'}>
                            <span className="examTermName">第五学期</span>
                            <div className="examTestList">
                                <i className="dotTop"></i>
                                {this.createTestList(arrT5, 0)}
                            </div>
                        </div>)
                        break;
                    case '1':
                        arrTerm.push(<div className="examTermWrap" key={'examTermWrap51'}>
                            <span className="examTermName">第五学期</span>
                            <div className="examTestList">
                                <i className="dotTop"></i>
                                {this.createTestList(arrT5, 1)}
                            </div>
                        </div>)
                        break;
                    case '2':
                        arrTerm.push(<div className="examTermWrap" key={'examTermWrap52'}>
                            <span className="examTermName">第五学期</span>
                            <div className="examTestList">
                                <i className="dotTop"></i>
                                {this.createTestList(arrT5, 2)}
                            </div>
                        </div>)
                        break;
                }
            case '4':
                switch (num1) {
                    case '0':
                        arrTerm.push(<div className="examTermWrap" key={'examTermWrap40'}>
                            <span className="examTermName">第四学期</span>
                            <div className="examTestList">
                                <i className="dotTop"></i>
                                {this.createTestList(arrT4, 0)}
                            </div>
                        </div>)
                        break;
                    case '1':
                        arrTerm.push(<div className="examTermWrap" key={'examTermWrap41'}>
                            <span className="examTermName">第四学期</span>
                            <div className="examTestList">
                                <i className="dotTop"></i>
                                {this.createTestList(arrT4, 1)}
                            </div>
                        </div>)
                        break;
                    case '2':
                        arrTerm.push(<div className="examTermWrap" key={'examTermWrap42'}>
                            <span className="examTermName">第四学期</span>
                            <div className="examTestList">
                                <i className="dotTop"></i>
                                {this.createTestList(arrT4, 2)}
                            </div>
                        </div>)
                        break;
                }
            case '3':
                switch (num1) {
                    case '0':
                        arrTerm.push(<div className="examTermWrap" key={'examTermWrap30'}>
                            <span className="examTermName">第三学期</span>
                            <div className="examTestList">
                                <i className="dotTop"></i>
                                {this.createTestList(arrT3, 0)}
                            </div>
                        </div>)
                        break;
                    case '1':
                        arrTerm.push(<div className="examTermWrap" key={'examTermWrap31'}>
                            <span className="examTermName">第三学期</span>
                            <div className="examTestList">
                                <i className="dotTop"></i>
                                {this.createTestList(arrT3, 1)}
                            </div>
                        </div>)
                        break;
                    case '2':
                        arrTerm.push(<div className="examTermWrap" key={'examTermWrap32'}>
                            <span className="examTermName">第三学期</span>
                            <div className="examTestList">
                                <i className="dotTop"></i>
                                {this.createTestList(arrT3, 2)}
                            </div>
                        </div>)
                        break;
                }
            case '2':
                switch (num1) {
                    case '0':
                        arrTerm.push(<div className="examTermWrap" key={'examTermWrap20'}>
                            <span className="examTermName">第二学期</span>
                            <div className="examTestList">
                                <i className="dotTop"></i>
                                {this.createTestList(arrT2, 0)}
                            </div>
                        </div>)
                        break;
                    case '1':
                        arrTerm.push(<div className="examTermWrap" key={'examTermWrap21'}>
                            <span className="examTermName">第二学期</span>
                            <div className="examTestList">
                                <i className="dotTop"></i>
                                {this.createTestList(arrT2, 1)}
                            </div>
                        </div>)
                        break;
                    case '2':
                        arrTerm.push(<div className="examTermWrap" key={'examTermWrap22'}>
                            <span className="examTermName">第二学期</span>
                            <div className="examTestList">
                                <i className="dotTop"></i>
                                {this.createTestList(arrT2, 2)}
                            </div>
                        </div>)
                        break;
                }
            case '1':
                switch (num1) {
                    case '0':
                        arrTerm.push(<div className="examTermWrap" key={'examTermWrap10'}>
                            <span className="examTermName">第一学期</span>
                            <div className="examTestList">
                                <i className="dotTop"></i>
                                {this.createTestList(arrT1, 0)}
                            </div>
                        </div>)
                        break;
                    case '1':
                        arrTerm.push(<div className="examTermWrap" key={'examTermWrap11'}>
                            <span className="examTermName">第一学期</span>
                            <div className="examTestList">
                                <i className="dotTop"></i>
                                {this.createTestList(arrT1, 1)}
                            </div>
                        </div>)
                        break;
                    case '2':
                        arrTerm.push(<div className="examTermWrap" key={'examTermWrap12'}>
                            <span className="examTermName">第一学期</span>
                            <div className="examTestList">
                                <i className="dotTop"></i>
                                {this.createTestList(arrT1, 2)}
                            </div>
                        </div>)
                        break;
                }
        }

        var tA = arrTerm.reverse()
        this.setState({
            arrTerm: tA,
        })
    }
    // 生成考试条目
    createTestList(arr, type) {
        var list = [];
        var len = arr.length;
        var flag;
        if (len > 0) {
            var type = type + ''
            switch (type) {
                case '0':
                    for (var i = 0; i < len; i++) {
                        // 1=有分数，批改完毕 2=未批改 3=没分，未开始 4=没分，可进入 5=没分，缺考
                        list.push(<p key={Date.parse(new Date()) + i} className={arr[i].showtype == 3 || arr[i].showtype == 4 ? "testItems anchor" : "testItems"}>
                            <span className="testItemName"><i>{arr[i].coursename}</i></span>
                            <span className="testItemInfo">
                                <span className={"testName"}>{arr[i].examname}</span>
                                <span
                                    className={arr[i].showtype == 4 ? 'testScore' : ' testScore'}
                                >
                                    {this.transType(arr[i].showtype, arr[i])}
                                    <span className={this.transClass(arr[i].showtype)}>{this.tipData(arr[i].showtype, arr[i])}</span>
                                </span>
                                <span className={arr[i].showtype == 4 ? "testhandle testStart" : "testhandle"} onClick={this.linkTo.bind(this, '0', arr[i])}><i className={this.createIconClass(arr[i].showtype)}></i>{this.transButtonName(arr[i].showtype)}</span>
                            </span>
                        </p>)
                    }
                    break;
                case '1':
                    for (var i = 0; i < len; i++) {
                        // 1=有分数，批改完毕 2=未批改 3=没分，未开始 4=没分，可进入 5=没分，缺考
                        // state ; null 说明没有提交过 00=都未评分 01=客观评分 10=主管评分 11=都评分
                        list.push(<p key={Date.parse(new Date()) + i} className={!arr[i].state == true ? "classTestItems anchor" : "classTestItems"}>
                            <span className="classTestItemName">
                                {this.changeClassAndStage(arr[i])}
                            </span>
                            <span className="classTestItemInfo">
                                <span className={"classTestName"}><i>{arr[i].paper_name}</i></span>
                                <span
                                    className={!arr[i].state == true || arr[i].state === '0' ? 'classTestScore' : ' classTestScore'}
                                >
                                    {this.transType(arr[i].state, arr[i])}
                                    <span className={this.transClass(arr[i].state)}>{'考试成绩将于次日公布请耐心等待'}</span>
                                </span>
                                <span
                                    className={!arr[i].state == true || arr[i].state === '0' ? "classTesthandle testStart" : "classTesthandle"}
                                    onClick={this.linkTo.bind(this, '1', arr[i])}>
                                    <i className={this.createIconClass(arr[i].state)}></i>
                                    {this.transButtonName(arr[i].state)}
                                </span>
                            </span>
                        </p>)
                    }
                    break;

            }

        } else {
            list.push(
                <p key={Date.parse(new Date()) + i} className='noTestShow'>本学期暂无考试</p>
            )
        }
        return list
    }
    // 转译时间戳
    transDate(str1, str2) {
        var now = new Date(str1)
        var year = now.getFullYear();
        var month = (now.getMonth() + 1 + '').length < 2 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1);
        var date = (now.getDate() + '').length < 2 ? '0' + now.getDate() : now.getDate();
        var hour = now.getHours();
        var minute = ('' + now.getMinutes()).length < 2 ? '0' + now.getMinutes() : now.getMinutes();
        var forward = new Date(str2)
        var hour1 = forward.getHours();
        var minute1 = ('' + forward.getMinutes()).length < 2 ? '0' + forward.getMinutes() : forward.getMinutes();
        return year + "/" + month + "/" + date + " " + hour + ":" + minute + '-' + hour1 + ":" + minute1;
    }
    // 提示内容
    tipData(flag, obj) {
        var arr = []
        var flag = flag + ''
        // 1=有分数，批改完毕 2=未批改 3=没分，未开始 4=没分，可进入 5=没分，缺考
        switch (flag) {
            // case '1':
            //     arr.push(<span><i>考试成绩将于次日公布请耐心等待</i></span>)
            //     break;
            case '2':
                arr.push(<span><i>考试成绩将于次日公布请耐心等待</i></span>)
                break;
            case '3':
                arr.push(<span className="tipHimStart">
                    <span className="warmPrompt"><i>温馨提示</i></span>
                    <span><i>{'考试名称：' + obj.examname}</i></span>
                    <span><i>考试时间：<i className="tipTime">{this.transDate(obj.s_date, obj.e_date)}</i></i></span>
                    <span><i>请提前做好准备，并准时参加考试，否则将会影响个人成绩排名</i></span>
                </span>)
                break;
            case '4':
                arr.push(<span className="tipHimStart">
                    <span className="warmPrompt"><i>温馨提示</i></span>
                    <span><i>{'考试名称：' + obj.examname}</i></span>
                    <span><i>考试时间：<i className="tipTime">{this.transDate(obj.s_date, obj.e_date)}</i></i></span>
                    <span><i>请提前做好准备，并准时参加考试，否则将会影响个人成绩排名</i></span>
                </span>)
                break;
            //     arr.push(<span><i>考试成绩将于次日公布请耐心等待</i></span>)
            //     break;

            //test 
            // case '1':
            // default:
            // arr.push(<span className="tipHimStart">
            //     <span className="warmPrompt"><i>温馨提示</i></span>
            //     <span><i>{'考试名称：' + obj.examname}</i></span>
            //     <span><i>考试时间：<i className="tipTime">{this.transDate(obj.s_date, obj.e_date)}</i></i></span>
            //     <span><i>请提前做好准备，并准时参加考试，否则将会影响个人成绩排名</i></span>
            // </span>)
            // arr.push(<span>考试成绩将于次日公布请耐心等待</span>)
        }
        return arr;
    }
    // 生成分数或者提示
    transType(flag, obj) {

        var str = ''
        var flag = flag + '';
        // 1=有分数，批改完毕 2=未批改 3=没分，未开始 4=没分，可进入 5=没分，缺考
        // 00=都未评分 01=客观评分 10=主管评分 11=都评分
        if (!flag) {
            str = '查看考试公告'
        } else {
            // //console.log(flag)
            switch (flag) {
                case '1':
                    var sc = !obj.score && obj.score != 0 ? '--' : obj.score
                    str = '成绩:' + sc + '分'
                    break;
                case '2':
                    // var sc = obj.score || '--'
                    str = '考试状态:批改中'
                    break;
                case '3':
                    str = '查看考试公告'
                    break;
                case '4':

                    str = '--'
                    break;
                case '5':
                    // var sc = obj.score || '--'
                    str = '缺考'
                    break;
                case '00':
                    // var sc = obj.score || '--'
                    str = '考试状态:批改中'
                    break;
                case '01':
                    // var sc = obj.score || '--'
                    str = '考试状态:批改中'
                    break;
                case '10':
                    // var sc = obj.score || '--'
                    str = '考试状态:批改中'
                    break;
                case '11':

                    var sc = !obj.score && obj.score != 0 ? '--' : obj.score
                    // //console.log(sc)
                    str = '成绩:' + sc + '分'
                    break;
                default:
                    str = ' -- '
                    break;
            }
        }
        return str;
    }
    // 生成类名
    transClass(flag) {
        var flag = flag + ''
        var str = '';
        // 1=有分数，批改完毕 2=未批改 3=没分，未开始 4=没分，可进入 5=没分，缺考
        switch (flag) {
            case '1':
                str = 'showTestTip'
                break;
            case '2':
                str = 'waitSc showTestTip'
                break;
            case '3':
                str = 'waitStart showTestTip'
                break;
            case '4':
                str = 'showTestTip waitStart'
                break;
            case '5':
                str = 'showTestTip'
                break;
            case '00':
                str = 'waitSc showClassTestTip'
                break;
            case '11':
                str = 'showClassTestTip'
                break;
            case '10':
                str = 'waitSc showClassTestTip'
                break;

            case '01':
                str = 'waitSc showClassTestTip'
                break;
            default:
                str = 'showClassTestTip'

        }
        return str;
    }
    createIconClass(flag) {
        var flag = flag + ''
        var str = '';
        // 1=有分数，批改完毕 2=未批改 3=没分，未开始 4=没分，可进入 5=没分，缺考
        // state ; null 说明没有提交过 00=都未评分 01=客观评分 10=主管评分 11=都评分
        switch (flag) {
            case '1':
                str = 'iconfont icon-yulan'
                break;
            case '2':
                str = 'iconfont icon-yulan'
                break;
            case '3':
                str = 'iconfont icon-kaishikaoshi'
                break;
            case '4':
                str = 'iconfont icon-kaishikaoshi'
                break;
            case '5':
                str = 'iconfont icon-yulan'
                break;
            case '00':
                str = 'iconfont icon-yulan'
                break;
            case '01':
                str = 'iconfont icon-yulan'
                break;
            case '10':
                str = 'iconfont icon-yulan'
                break;
            case '11':
                str = 'iconfont icon-yulan'
                break;
            default:
                str = 'iconfont icon-kaishikaoshi'

        }
        return str;
    }
    // 生成按钮提示
    transButtonName(flag) {
        var str = '';
        var flag = flag + '';
        if (flag == '') {
            str = '开始考试'
        } else {

            // 1=有分数，批改完毕 2=未批改 3=没分，未开始 4=没分，可进入 5=没分，缺考
            // 00=都未评分 01=客观评分 10=主管评分 11=都评分
            switch (flag) {
                case '1':
                    str = '查看试卷'
                    break;
                case '2':
                    str = '查看试卷'
                    break;
                case '3':
                    str = '尚未开始'
                    break;
                case '4':
                    str = '开始考试'
                    break;
                case '5':
                    str = '查看试卷'
                    break;
                case '00':
                    str = '查看试卷'
                    break;
                case '10':
                    str = '查看试卷'
                    break;
                case '01':
                    str = '查看试卷'
                    break;
                case '11':
                    str = '查看试卷'
                    break;

                default:
                    str = '开始考试'
                    break;

            }
        }
        return str
    }
    // 跳转到
    linkTo(flag, obj) {
        var flag = flag + '';
        // 0 期末 1 随堂 2 小测验
        switch (flag) {
            // 1=有分数，批改完毕 2=未批改 3=没分，未开始 4=没分，可进入 5=没分，缺考
            // state ; null 说明没有提交过 00=都未评分 01=客观评分 10=主管评分 11=都评分
            case '0':
                if (!!obj.showtype && obj.showtype == 3) {
                    return false;
                }
                this.setState({
                    data: obj,
                    // testId:obj.,
                    finalExamShow: true,
                })
                break;
            case '1':
                if (!!obj.showtype && obj.showtype == 3) {
                    return false;
                }
                this.setState({
                    data: obj,
                    testId: obj.lestestid,
                    testShow: true,
                })
                break;
            case '2':
                break;
        }
    }
    componentDidUpdate() {
        var anchor = document.getElementsByClassName('anchor')[0]
        if (anchor) {

            setTimeout(() => {
                $("html,body").stop(true);

                $("html,body").animate({ scrollTop: $(anchor).offset().top - 150 }, 1000);
            }, 1000)
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
    // 生成随堂测验课程+阶段名
    changeClassAndStage(obj) {
        // //console.log(obj)
        var str = ''
        var str1 = obj.coursename;
        var str2 = this.intToChinese(obj.stage)
        str = str1 + ' ' + '第' + str2 + '阶段'
        return str;

    }
    // 生成阶段名
    createStage(obj) {
        var str = ''
        var str1 = this.intToChinese(obj.stage)
        str = '第' + str1 + '阶段'
        return str;
    }
    // 小测验课程列表
    createTestNameArray(arr) {
        var len = arr.length;
        var list = [];
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                // 1=有分数，批改完毕 2=未批改 3=没分，未开始 4=没分，可进入 5=没分，缺考
                list.push(<p key={Date.parse(new Date()) + i} className={arr[i].showtype == 3 || arr[i].showtype == 4 ? "quiz anchor" : "quiz"}>
                    <span className="quizCourse" title={arr[i].coursename}>
                        <i className="quizCourseName">
                            {arr[i].coursename}
                        </i>
                        <i className="quizRound"></i>
                    </span>
                    <span className="quizInfo">
                        <span className="quizName">{arr[i].examname}</span>
                        <span className="quizDetail">
                            {this.transInfo(arr[i])}
                            <span className={this.transClass(arr[i].showtype)}>{this.tipData(arr[i].showtype, arr[i])}</span>
                        </span>
                        <span className={this.createQuizClass(arr[i].showtype)}
                            onClick={this.linkTo.bind(this, '0', arr[i])}
                        >
                            <i className={this.createIconClass(arr[i].showtype)}></i>

                            {this.nameOfIt(arr[i].showtype)}
                        </span>
                    </span>


                </p>)
            }
        } else {
            list.push(<p key={Date.parse(new Date())} className="quiz noQuize"><i>暂无考试信息</i></p>)
        }
        this.setState({
            arrTerm: list,
        })
    }
    nameOfIt(f) {
        // {arr[i].showtype == '4' || arr[i].showtype == '3' ? '开始考试' : '查看试卷'}
        var f = f + ''
        var str = ''
        switch (f) {
            case '3':
                str = '尚未开始'
                break;
            case '4':
                str = '开始考试'
                break;
            default:
                str = '查看试卷'

        }
        return str;
    }
    createQuizClass(type) {
        var type = type + ''
        var str = '';
        switch (type) {
            case '3':
                str = "quizHandle notStart"
                break;
            case '4':
                str = "quizHandle startQuizHandle"
                break;
            default:
                str = "quizHandle";

        }
        return str
    }
    // 生成小测验信息
    transInfo(obj) {
        var type = obj.showtype + ''
        var str = '--'
        // 1=有分数，批改完毕 2=未批改 3=没分，未开始 4=没分，可进入 5=没分，缺考
        switch (type) {
            case '5':
                str = '缺考'
                break;
            case '1':
                str = '成绩:' + obj.score + '分'
                break;
            case '2':
                str = '考试状态:批改中'
                break;
            case '3':
                str = '查看考试公告'
                break;
            case '4':
                str = '查看考试公告'
                break;
            default:
        }
        return str
    }
    // 上一页下一页
    prevPage() {
        var page = this.state.page
        var total = this.state.pageTotal;
        var p = Number(page) - 1
        if (page < 2||this.state.tabIndex!=2) {
            return false;
        } else {
            $.llsajax({
                url: "exam/gettestlist",
                type: "post",
                data: {
                    page: p
                },
                success: data => {
                    // //console.log(data.rows)
                    
                    //  console.log(page)
                    this.setState({
                        page: p,
                        testData: data.rows,
                        pageTotal: data.total,
                    })
                    var arr = data.rows || [];
                    this.createTestNameArray(arr)
                }
            })
        }
    }
    nextPage() {
        var page = this.state.page
        var total = this.state.pageTotal;
        // console.log(page)
        // console.log(total)
        var p = Number(page) + 1
        if (page >= total||this.state.tabIndex!=2) {
            return false;
        } else {
            $.llsajax({
                url: "exam/gettestlist",
                type: "post",
                data: {
                    page: p
                },
                success: data => {
                    // //console.log(data.rows)
                    
                    // console.log(p)
                    this.setState({
                        page: p,
                        testData: data.rows,
                        pageTotal: data.total,
                    })
                    var arr = data.rows || [];
                    this.createTestNameArray(arr)
                }
            })
        }
    }
    /**学校成绩
     * t:当前学期
     * arr1:学生学校成绩详情
     * arr2:学生学校考试数据
     */
    schoolScore(t, arr1, arr2) {

        var t = t + '';
        var arrInfo = arr1;
        var arrDet = arr2;
        var len1 = arrInfo.length;
        var len2 = arrDet.length;
        var arrTerm = [];

        var sc1 = '--'; var sc2 = '--'; var sc3 = '--'; var sc4 = '--'; var sc5 = '--';
        var arrInfo1 = []; var arrInfo2 = []; var arrInfo3 = []; var arrInfo4 = []; var arrInfo5 = [];
        if (len1 > 0) {
            for (var i = 0; i < len1; i++) {
                if (arrInfo[i].term == 5) {
                    sc5 = arrInfo[i].evaluate || '--'
                }
                if (arrInfo[i].term == 4) {
                    sc4 = arrInfo[i].evaluate || '--'
                }
                if (arrInfo[i].term == 3) {
                    sc3 = arrInfo[i].evaluate || '--'
                }
                if (arrInfo[i].term == 2) {
                    sc2 = arrInfo[i].evaluate || '--'
                }
                if (arrInfo[i].term == 1) {
                    sc1 = arrInfo[i].evaluate || '--'
                }
            }
        }
        if (len2 > 0) {
            for (var j = 0; j < len2; j++) {

                if (arrDet[j].term == 5) {
                    arrInfo5.push(arrDet[j])
                }
                if (arrDet[j].term == 4) {
                    arrInfo4.push(arrDet[j])
                }
                if (arrDet[j].term == 3) {
                    arrInfo3.push(arrDet[j])
                }
                if (arrDet[j].term == 2) {
                    arrInfo2.push(arrDet[j])
                }
                if (arrDet[j].term == 1) {
                    arrInfo1.push(arrDet[j])
                }
            }
        }
        switch (t) {
            case '5':
                arrTerm.push(<div className="examTermWrap" key={'examTermWrap50'}>
                    <span className="examTermName schoolScTerm">第五学期
                    <i className={sc5 != '--' ? "schoolSc" : "schoolScNone"}>{'学校综合评价:' + sc5 + '分'}</i>
                        <i className="grayRoung"></i>
                    </span>
                    <div className="SchoolScore">
                        {this.createSchoolList(arrInfo5)}
                    </div>
                </div>)
            case '4':
                arrTerm.push(<div className="examTermWrap" key={'examTermWrap40'}>
                    <span className="examTermName schoolScTerm">第四学期
                    <i className={sc4 != '--' ? "schoolSc" : "schoolScNone"}>{'学校综合评价:' + sc4 + '分'}</i>
                        <i className="grayRoung"></i>
                    </span>
                    <div className="SchoolScore">
                        {this.createSchoolList(arrInfo4)}
                    </div>
                </div>)
            case '3':
                arrTerm.push(<div className="examTermWrap" key={'examTermWrap30'}>
                    <span className="examTermName schoolScTerm">第三学期
                    <i className={"schoolSc"}>{'学校综合评价:' + sc3 + '分'}</i>
                        <i className="grayRoung"></i>
                    </span>
                    <div className="SchoolScore">
                        {this.createSchoolList(arrInfo3)}
                    </div>
                </div>)
            case '2':
                arrTerm.push(<div className="examTermWrap" key={'examTermWrap20'}>
                    <span className="examTermName schoolScTerm">第二学期
                    <i className="schoolSc">{'学校综合评价:' + sc2 + '分'}</i>
                        <i className="grayRoung"></i>
                    </span>
                    <div className="SchoolScore">
                        {this.createSchoolList(arrInfo2)}
                    </div>
                </div>)
            case '1':
                arrTerm.push(<div className="examTermWrap" key={'examTermWrap10'}>
                    <span className="examTermName schoolScTerm">第一学期
                    <i className={"schoolSc"}>{'学校综合评价:' + sc1 + '分'}</i>
                        <i className="grayRoung"></i>
                    </span>
                    <div className="SchoolScore">
                        {this.createSchoolList(arrInfo1)}
                    </div>
                </div>)
        }
        var tA = arrTerm.reverse()
        this.setState({
            arrTerm: tA,
        })
    }
    // 生成学校成绩内容
    createSchoolList(arr) {
        var list = []
        var len = arr.length;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                list.push(<p key={Date.parse(new Date()) + i} className="schoolScItem">
                    <span className="schoolScName">{arr[i].examname}</span>
                    <span className="schoolScExamName">{arr[i].examname}</span>
                    <span className="schoolScScore">{arr[i].score || '--'}分</span>

                </p>)
            }
        } else {
            list.push(
                <p key={Date.parse(new Date())} className='noTestShow'>本学期暂无考试</p>
            )
        }
        return list
    }
    // 强制刷新
    refreshPage(){
       var tp = this.state.testType+'';
        var term = this.state.term
        console.log(tp);
        switch(tp){
            case '0':
            this.getAllDataAjax(term)
            break;
            case '1':
            this.getAllClassAjax(true)
            break;
            case '2':
             this.getAllTestAjax(1, true)
            break;
            case '3':
             this.getSchoolData()
            break;
        }
    }
}