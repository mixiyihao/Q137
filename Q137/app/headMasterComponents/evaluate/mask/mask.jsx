import React from 'react';
import ReactDOM from 'react-dom'
import { Link, hashHistory } from 'react-router';
import $ from 'jquery';
import './mask.css'
import url from '../../../controller/url.js';
import {
    DatePicker
} from 'antd';
import {
    TimePicker
} from 'antd';
import moment from 'moment';

export default class Mask extends React.Component {
    constructor() {
        super();
        this.state = {
            display: false,
            name: '',
            // antd
            olddataTime: new Date(),
            newdataTime: new Date(Date.parse(new Date()) + 86400000),
            startTime: '',
            endTime: '',
            courseArr: [],//专业列表
            evaName: '',//开启评价名
            classId: '',//班级id
            t: '',//选择的学期
            editId: '',
            startLine: new Date(),
            courseId: '',
            initArr: [],//本班本学期已经开启评价的专业
            warning: false,//评价已开启提示
            warningMsg: '开启失败',
            classArr: [],//总班级
            chooseClassArr: [],//筛选的班级
            showClass: [],
            arrData: [],
            termArr: [],//生成学期
            majorId: '',//专业id
            major: [],
            cA: [],
            change: false,
            editType: 11,
        }
    }
    componentWillMount() {
        // 若不选择时间，则默认当前开始一天后结束
        var start = Date.parse(new Date())
        var end = start + 86400000
        this.setState({
            display: this.props.displayFlag,
            // name: this.props.nameOfClass,
            startTime: this.transIntoDate(start),
            endTime: this.transIntoDate(end),
            // courseArr: this.props.course,
            // classId: this.props.classId,
            // t: this.props.t,
            classArr: this.props.classArr,
            arrData: this.props.arrData,
            major: this.props.major,
        })
        this.createTerm(0)
        this.createMajor(this.props.major)

    }
    componentWillReceiveProps(props) {
        if (props.objs.courseid != undefined) {
            var csId = props.objs.courseid;
            var seleIndex;
            var arrItem = props.course;
            var len = arrItem.length;
            for (var i = 0; i < len; i++) {
                if (arrItem[i].props.value == csId) {
                    document.getElementById("maskChoose").selectedIndex = i;
                    break;
                }
            }
        } else {
            document.getElementById("maskChoose").selectedIndex = 0;
        }

        var start;
        var end;
        if (props.edit == 0) {
            var term = props.t;
            start = props.objs.sdate
            end = props.objs.edate
            var id = props.objs.id
            this.setState({
                evaName: props.objs.dgname,
                editId: id,
                change: true,
                editType: 0,
                chooseClassArr: props.classArr,
                t: props.t,
                courseId: props.id,
                startTime: start,
                endTime: end,
                olddataTime:new Date(start),
                newdataTime:new Date(end),
            })
            var courseid = props.objs.courseid
            var len = props.major.length;
            var k;
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < props.major[i].courseList.length; j++) {
                    if (props.major[i].courseList[j].id == courseid) {
                        k = i;
                        this.setState({
                            majorIndex: i + 1,
                            cA: props.major[i].courseList,
                        })
                        break;
                    }
                }
            }

            this.createTerm(props.objs.term)
            var list = props.major[k].courseList;
            var listA = [];
            var listLen = list.length;
            for (var m = 0; m < listLen; m++) {
                if (list[m].term == term) {
                    listA.push(list[m])
                }
            }
            var lenlist = listA.length;
            for (var n = 0; n < lenlist; n++) {
                if (listA[n].id == courseid) {
                    this.setState({
                        courseIndex: n,
                    })
                }
            }
            this.createCourse(listA)
        } else {
            start = Date.parse(new Date())
            end = start + 86400000;
            this.setState({
                evaName: '',
                startTime: this.transIntoDate(start),
                endTime: this.transIntoDate(end),
            })
            this.createCourse([])
            this.createTerm(0)
            start = this.transIntoDate(start)
            end = this.transIntoDate(end)
        }
        this.setState({
            display: props.displayFlag,
            classId: props.classId,
            initArr: props.initArr,
            classArr: props.classArr,
            arrData: props.arrData,
            major: props.major,
        })
        this.createClass(props.classArr)
        this.createMajor(props.major)

    }
    render() {
        let warning = {
            display: this.state.warning == true ? "block" : "none"
        }
        let t = this.state.t;
        return (<div className={this.state.display == true ? "evaMask evaShowDisplay" : "evaMask"}>
            <div className="evaMaskBox">
                <span className="commetStart">{this.props.edit == 0 ? "修改调查" : "开启调查"}</span>
                <i className="iconfont icon-guanbi" onClick={this.closeHandle.bind(this)}></i>
                <div className="evaWrapItem">
                    <p>
                        <span className="evaMaskText">
                            反馈名称：
                            <input type="text" onChange={this.inputText.bind(this)} value={this.state.evaName} />
                        </span>
                    </p>
                    <p>
                        <span className="evaMaskTime">
                            开启时间：
                        </span>
                        <DatePicker className="Maskdatepicker"
                            format="YYYY-MM-DD HH:mm"
                            placeholder="选择时间"
                            onChange={this.chooseStartTime.bind(this)}
                            disabledDate={this.disabledDate.bind(this)}
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            showToday={false}
                            style={{ 'width': '236px', 'height': '35px', "marginRight": "12px" }}
                            value={moment(this.state.olddataTime, 'YYYY-MM-DD HH:mm:ss')}
                        />
                        至
                        <DatePicker className="Maskdatepicker"
                            format="YYYY-MM-DD HH:mm"
                            placeholder="选择时间"
                            onChange={this.chooseEndTime.bind(this)}
                            disabledDate={this.disabledEndDate.bind(this)}
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            showToday={false}
                            style={{ 'width': '236px', 'height': '35px', "marginLeft": "12px" }}
                            value={moment(this.state.newdataTime, 'YYYY-MM-DD HH:mm:ss')}
                        />
                    </p>
                    <p>
                        <span className="evaMaskMajor">
                            所属专业：
                            <select name="" id="maskMajor" onChange={this.chooseMajor.bind(this)}>
                                <option value="">&nbsp;选择专业</option>
                                {this.state.major}
                            </select>

                        </span>
                    </p>
                    <p className="evaMaskTermParents">
                        <span className="evaMaskTerm">
                            所属学期：
                            <select name="" id="maskTerm" onChange={this.chooseTerm.bind(this)}>
                                {this.state.termArr}
                            </select>
                        </span>
                    </p>
                    <p>
                        <span className="evaMaskCourse">
                            选择课程：
                            <select name="" id="maskChoose" onChange={this.changeCourse.bind(this)}>
                                {this.state.courseArr}
                            </select>
                        </span>
                    </p>
                    <p className="evaMaskClass">
                        <div className="evaMaskClass openClass">
                            <i className="cName">发放对象：</i>
                            <div className="chosCl">
                                {this.state.showClass}
                            </div>
                        </div>
                    </p>
                </div>
                <a className="openIt commonButton button" onClick={this.submitHandle.bind(this)}>{this.props.edit == 0 ? "确认修改" : "确认开启"}</a>
                <span className="warningsMsk" style={warning}>{this.state.warningMsg}</span>
            </div>
        </div>)
    }
    inputText(e) {
        if (e.target.value.length < 30) {
            this.setState({
                evaName: e.target.value,
            })
        } else {
            this.setState({
                evaName: e.target.value.substring(0, 30),
            })
        }
    }
    chooseStartTime(value) {
        var str = Date.parse(value._d)
        var str2 = new Date(Date.parse(value._d) + 86400000)
        var time = this.transIntoDate(str);
        var timeend = this.transIntoDate(str2)
        this.setState({
            startTime: time,
            endTime: timeend,
            olddataTime: time,
            newdataTime: timeend,
            startLine: value,
        })
        this.disabledEndDate(timeend, value)
    }
    chooseEndTime(value) {
        var startLine = this.state.startLine
        var str = Date.parse(value._d)
        var time = this.transIntoDate(str);
        this.setState({
            endTime: time,
            newdataTime: time,
        })
    }
    closeHandle() {
        this.props.closeFile();
        this.props.editFun();
        this.setState({
            warning: false,
        })
    }
    submitHandle() {
        var name = this.state.evaName;
        if (name.length < 1) {
            this.setState({
                warning: true,
                warningMsg: '请输入评价名称'
            })
            return false
        }
        var ckArr = [];
        var cks = document.getElementsByClassName('evaCk')
        var ckLen = cks.length;
        if (ckLen > 0) {
            for (var i = 0; i < ckLen; i++) {
                if (cks[i].checked == true) {
                    ckArr.push(cks[i].getAttribute('data-id'))
                }
            }
        }
        if (ckArr.length < 1) {
            this.setState({
                warning: true,
                warningMsg: '请选择开启班级'
            })
            return false
        }
        var classStr = ckArr.join(',');
        var judge = false;
        var ckl = ckArr.length
        var judgeData = this.state.arrData;
        for (var j = 0; j < ckl; j++) {
            for (var k = 0; k < judgeData.length; k++) {
                if (ckArr[j] == judgeData[k].id) {
                    var ci = this.state.courseId;
                    var Jlength = judgeData[k].degrees.length;
                    for (var l = 0; l < Jlength; l++) {
                        if (judgeData[k].degrees[l].courseid == ci) {
                            judge = true;
                            if (this.props.edit == 0) {
                                if (ci == this.props.id) {
                                    judge = false;
                                }
                            }
                            break;
                        }
                    }
                }
            }
        }
        if (this.state.t == '') {
            this.setState({
                warning: true,
                warningMsg: '请选择开启学期'
            })
            return false
        }
        if (this.state.courseId == '') {
            this.setState({
                warning: true,
                warningMsg: '请选择开启专业'
            })
            return false
        }

        if (judge == true) {
            this.setState({
                warning: true,
                warningMsg: '本课程本学期已开启过评价'
            })
            return false
        } else {
            this.setState({
                warning: false
            })
        }
        if (this.props.edit == 0) {
            var start = this.transIntoDate(this.state.startTime)
            var end = this.transIntoDate(this.state.endTime)
            $.llsajax({
                url: 'degree/editDegree',
                data: {
                    dgname: this.state.evaName,
                    courseid: this.props.objs.courseid,
                    sdate: start,
                    edate: end,
                    classids: classStr,
                    term: this.state.t,
                    id: this.state.editId
                },
                async: false,
                type: "POST",
                success: data => {
                    this.props.editFun()
                    this.props.closeFile();
                    this.props.getData(this.state.t)
                },
                error: data => {
                    this.props.closeFile();
                    this.props.editFun()
                }
            })
        } else {
            $.llsajax({
                url: 'degree/addDegree',
                data: {
                    dgname: this.state.evaName,
                    courseid: this.state.courseId,
                    sdate: this.state.startTime,
                    edate: this.state.endTime,
                    classids: classStr,
                    term: this.state.t,
                },
                async: false,
                type: "POST",
                success: data => {
                    this.props.closeFile();
                    this.props.getData(this.state.t)
                },
                error: data => {
                    this.props.closeFile();
                }
            })
        }
    }

    // antd
    range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }
    disabledDate(current) {
        // can not select days before today and today
        /*
          这里取得是毫秒值 Date.now()当前时间的毫秒值
        */
        var now = new Date()
        // var now = new Date(date)
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var str = year + "/" + month + "/" + date
        return current && current.valueOf() < (Date.parse(str));
        // return current && current.valueOf() <= Date.now();
    }
    disabledDateTime() {
        // let sc = []
        // for(var i =0;i<60;i++){
        //     sc.push(i)
        // }
        return {
            // disabledHours: () => range(0, 24).splice(4, 20),
            // disabledMinutes: () => range(30, 60),
            // disabledSeconds: () => this.range(0,60),
        };
    }

    disabledStartDate(startValue) {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate(endValue, startValue) {
        var startValue = this.state.startLine
        if (!endValue || !startValue) {
            return false;
        }
        // //console.log(endValue.valueOf())
        return endValue.valueOf() < startValue.valueOf();
    }
    // 转译时间戳
    transIntoDate(date) {
        var now = new Date(date)
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = ('' + now.getMinutes()).length < 2 ? '0' + now.getMinutes() : now.getMinutes();
        var second = now.getSeconds();
        return year + "/" + month + "/" + date + " " + hour + ":" + minute + ":" + second;
    }
    createTerm(t) {
        var arr = [];
        var t = t + '';
        if (t === '0') {
            arr.push(
                <option value="" key='mskterm'>&nbsp;{'选择学期'}</option>
            )
        } else {
            switch (t) {
                case '5':
                    arr.push(
                        <option value="5" key='mskterm5'>&nbsp;{'第五学期'}</option>
                    )
                case '4':
                    arr.push(
                        <option value="4" key='mskterm4'>&nbsp;{'第四学期'}</option>
                    )
                case '3':
                    arr.push(
                        <option value="3" key='mskterm3'>&nbsp;{'第三学期'}</option>
                    )
                case '2':
                    arr.push(
                        <option value="2" key='mskterm2'>&nbsp;{'第二学期'}</option>
                    )
                case '1':
                    arr.push(
                        <option value="1" key='mskterm1'>&nbsp;{'第一学期'}</option>
                    )
                case '0':
                    arr.push(
                        <option value="" key='mskterm0'>&nbsp;{'选择学期'}</option>
                    )
            }
        }
        var arr = arr.reverse();
        this.setState({
            termArr: arr
        })

    }
    chooseTerm(e) {
        var t = e.target.value;
        var cA = this.state.cA;
        var len = cA.length;
        var arr = [];
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                if (t == cA[i].term) {
                    arr.push(cA[i])
                }
            }
        }
        var classArr = [];
        classArr = this.state.chooseClassArr;
        var len2 = classArr.length;
        var arr2 = [];
        if (len2 > 0) {
            for (var j = 0; j < len2; j++) {
                if (classArr[j].nowTerm >= t) {
                    arr2.push(classArr[j])
                }
            }
        }
        if (t == '') {
            arr2 = classArr
        }
        this.createClass(arr2)
        this.createCourse(arr)
        this.setState({
            t: t,
        })
    }
    chooseMajor(e) {
        var m = e.target.value;
        var classArr = this.state.classArr;
        if (m.length < 0 || m == '') {
            this.createTerm(0);
            this.createCourse([])
            this.createClass(this.state.classArr)
            this.setState({
                courseId: '',
                t: '',
            })
        } else {
            var t = 1;
            var arrData = this.props.arrData;
            var len1 = arrData.length;
            if (len1 > 0) {
                for (var i = 0; i < len1; i++) {
                    if (arrData[i].majorid == m) {
                        if (arrData[i].nowTerm >= t) {
                            t = arrData[i].nowTerm;
                            if (t == 5) {
                                break;
                            }
                        }
                    }
                }
            }
            var major = this.props.major;
            var len2 = major.length;
            var cA = [];
            if (len2 > 0) {
                for (var j = 0; j < len2; j++) {
                    if (m == major[j].id) {
                        cA = major[j].courseList;
                    }
                }
            }
            var len3 = classArr.length;
            var arr3 = []
            if (len3 > 0) {
                for (var k = 0; k < len3; k++) {
                    if (classArr[k].majorid == m) {
                        arr3.push(classArr[k])
                    }
                }
            }
            this.createClass(arr3)
            this.createTerm(t);
            this.setState({
                cA: cA,
                chooseClassArr: arr3,
            })
        }
        this.setState({
            majorId: m,
        })
    }
    createMajor(Arr) {
        var len = Arr.length;
        var arr = [];
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                arr.push(
                    <option value={Arr[i].id} key={'ma' + i + Date.parse(new Date())}>&nbsp;{Arr[i].name}</option>
                )
            }
        }
        this.setState({
            major: arr,
        })
    }
    // 生成班级
    createClass(arr) {
        var classArr = [];
        var len = arr.length;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                classArr.push(
                    <span key={'ci' + i}>
                        <input type="checkbox" className='evaCk' id={'ckb' + i} data-id={arr[i].id} defaultChecked={false} />
                        <label htmlFor={'ckb' + i}><i>{arr[i].name}</i></label>
                    </span>
                )
            }
        }
        this.setState({
            showClass: classArr
        })
    }
    createCourse(arr) {
        var arr = arr || [];
        var len = arr.length;
        var cA = []
        if (len <= 0) {
            cA.push(
                <option value="" key="mskCourse">&nbsp;{'选择课程'}</option>
            )
            this.setState({
                courseArr: cA,
                courseId: ''
            })
        } else {
            var len1 = arr.length;
            if (len1 > 0) {
                for (var j = 0; j < len1; j++) {
                    cA.push(
                        <option value={arr[j].id} key={"mskCourse" + j}>&nbsp;{arr[j].name}</option>
                    )
                }
                this.setState({
                    courseArr: cA,
                    courseId: arr[0].id
                })
            } else {
                cA.push(
                    <option value="" key="mskCourse">&nbsp;{'选择课程'}</option>
                )
                this.setState({
                    courseArr: cA,
                    courseId: ''
                })
            }
        }

    }
    changeCourse(e) {
        this.setState({
            courseId: e.target.value,
        })
    }
    componentDidUpdate() {
        if (this.state.change == true) {
            console.log(this.state.courseIndex)
            document.getElementById("maskTerm").selectedIndex = this.props.objs.term;
            document.getElementById("maskMajor").selectedIndex = this.state.majorIndex;
            document.getElementById("maskChoose").selectedIndex = this.state.courseIndex;
            // maskChoose
            this.setState({
                change: false
            })
        }
    }
}
