import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery';
import './previewComp.css'
import url from '../../../controller/url.js';
import { Link, hashHistory } from 'react-router';
import Input from './inputItem.jsx'
import BombBox from '../../../components/public/bombBox/bombBox.js'

export default class UploadComp extends React.Component {
    constructor() {
        super()
        this.state = {
            title: '',//标题
            num: '',//条数
            term: '',//学期
            school: '',//学校
            major: '',//专业
            class: '',//班级
            grates: [],//解析数据
            update: [],//上传数据
            preArr: [],//table
            total: '',//全选成绩修改
            totalshow: '',
            checkAll: false,//全选
            checkItem: [],//单个选中的index
            isHidden: true,
            bombBoxMsg: '',
            type: '',
            changes: false,
            sucOrErr: true,//导入成功或失败
            sureInput: true,

            a: '',
            s: '',
            ci: '',
            im: '',
            t: '',

            errInfoshow: false,
            disSucOrErr: false,
            saveTotal: false,
            hasChange: false,

            // 错误提示
            wrongs: '',
            warn: '',
        }
    }
    changeScore(e) {
        var index = e.target.getAttribute('data-id')
        var arr = this.state.update;
        if (this.state.type == 'grates') {
            arr[index].score = e.target.value;
        } else {
            arr[index].evaluate = e.target.value;
        }
        arr[index].ck = false;
        this.setState({
            update: arr,
            saveTotal: false,
            hasChange: true,
        })
    }
    transFlag(flag) {
        var str = ''
        switch (flag) {
            case 0:
                str = ''
                break;
            case 1:
                str = 'trWarning'
                break;
            case 2:
                str = 'trWrong'
                break;
            case '0':
                str = ''
                break;
            case '1':
                str = 'trWarning'
                break;
            case '2':
                str = 'trWrong'
                break;
        }
        return str;
    }
    componentWillMount() {
        var st = window.location.hash.split("st=")[1].split("&")[0];
        if (st == 'suc') {
            var type = window.location.hash.split("type=")[1].split("&")[0]
            var title = Base64.decode(window.location.hash.split("name=")[1].split("&")[0])
            if (type == 'grates') {
                var dateArr = JSON.parse(sessionStorage.getItem('schoolGrates'))
                var len = dateArr.length;
                if (len > 0) {
                    var arr = []
                    for (let i = 0; i < len; i++) {
                        if (dateArr[i].flag == 2) {
                            this.setState({
                                errInfoshow: true,
                                wrongs: '灰色数据为错误数据灰色数据无法保存 ；请检查数据准确性！'
                            })
                        }
                        if (dateArr[i].flag == 1) {
                            this.setState({
                                errInfoshow: true,
                                warn: '红色数据为已有数据保存后将覆盖原有数据；'
                            })
                        }
                        arr.push(<tr key={i} className={this.transFlag(dateArr[i].flag)}>
                            <td>
                                <input type="checkbox" className="preck" data-index={i} onChange={this.changeCheckItem.bind(this)} />
                            </td>
                            <td>
                                {Number(i) + 1}
                            </td>
                            <td>
                                {dateArr[i].name}
                            </td>
                            <td>
                                {dateArr[i].stuno}
                            </td>
                            <td>
                                {dateArr[i].coursename}
                            </td>
                            <td>
                                <Input value={dateArr[i].score} change={this.changeScore.bind(this)} id={i} />
                            </td>
                        </tr>)
                    }
                    this.setState({
                        num: len,//条数
                        term: dateArr[0].term,//学期
                        school: dateArr[0].schoolname,//学校
                        major: dateArr[0].majorname,//专业
                        class: dateArr[0].classname,//班级
                        preArr: arr,
                    })
                }
                this.setState({
                    grates: dateArr,
                    update: dateArr,
                })
            }
            if (type == 'evaluate') {
                var dateArr = JSON.parse(sessionStorage.getItem('schoolEvalute'))
                var len = dateArr.length;
                if (len > 0) {
                    var arr = []
                    for (let i = 0; i < len; i++) {
                        if (dateArr[i].flag == 2) {
                            this.setState({
                                errInfoshow: true,
                                wrongs: '灰色数据为错误数据灰色数据无法保存 ；请检查数据准确性！'
                            })
                        }
                        if (dateArr[i].flag == 1) {
                            this.setState({
                                errInfoshow: true,
                                warn: '红色数据为已有数据保存后将覆盖原有数据；'
                            })
                        }
                        arr.push(<tr key={i} className={this.transFlag(dateArr[i].flag)}>
                            <td>
                                <input type="checkbox" className="preck" data-index={i} onChange={this.changeCheckItem.bind(this)} />
                            </td>
                            <td>
                                {Number(i) + 1}
                            </td>
                            <td>
                                {dateArr[i].username}
                            </td>
                            <td>
                                {dateArr[i].studentno}
                            </td>
                            <td>
                                <Input value={dateArr[i].evaluate} change={this.changeScore.bind(this)} id={i} />
                            </td>
                        </tr>)
                    }
                    this.setState({
                        num: len,//条数
                        term: dateArr[0].term,//学期
                        school: dateArr[0].schoolname,//学校
                        major: dateArr[0].majorname,//专业
                        class: dateArr[0].classname,//班级
                        preArr: arr,
                    })
                }
                this.setState({
                    grates: dateArr,
                    update: dateArr,
                })
            }
            this.setState({
                type: type,
                bombBoxMsg: type == 's' ? '是否保存该成绩' : '是否保存该评价',
                title: title,//标题
                sucOrErr: true,
            })
        } else {
            this.setState({
                sucOrErr: false
            })
        }
        this.setState({
            a: window.location.hash.split("a=")[1].split("&")[0],
            s: window.location.hash.split("s=")[1].split("&")[0],
            ci: window.location.hash.split("ci=")[1].split("&")[0],
            im: window.location.hash.split("im=")[1].split("&")[0],
            t: window.location.hash.split("&t=")[1].split("&")[0],
        })
    }
    changeTotal(e) {
        // input value test
        var regExp = /\D/
        var str = e.target.value;
        if (regExp.test(str) == true) {
            this.setState({
                total: '0',
                totalshow: '',
                sureInput: false,
            })
        } else {
            if (0 <= Number(str) && Number(str) <= 100) {
                this.setState({
                    total: e.target.value,
                    totalshow: e.target.value,
                    sureInput: true,
                    saveTotal: true,
                    hasChange: true,
                })
            } else {
                this.setState({
                    total: '0',
                    totalshow: '',
                    sureInput: false,
                })
            }
        }
    }
    changeCheck() {
        var arr = [];
        var cks = document.getElementsByClassName('preck');
        if (this.state.checkAll == true) {
            for (var i = 0; i < cks.length; i++) {
                cks[i].checked = false;
            }
            this.setState({
                checkAll: false,
                checkItem: arr,
            })
        } else if (this.state.checkAll == false) {
            for (var i = 0; i < cks.length; i++) {
                cks[i].checked = true;
            }
            var num = this.state.num;
            for (var i = 0; i < num; i++) {
                arr.push(i)
            }
            this.setState({
                checkAll: true,
                checkItem: arr,
            })
        }
    }
    // 选中的数据项
    changeCheckItem(e) {
        var arr = this.state.checkItem
        var cks = document.getElementsByClassName('preck');
        var len = cks.length
        // checkAll?
        for (var i = 0; i < len; i++) {
            if (cks[i].checked == false) {
                this.setState({
                    checkAll: false,
                })
                break;
            } else {
                this.setState({
                    checkAll: true,
                })
            }
        }
        // save checked index
        if (e.target.checked == true) {
            arr.push(e.target.getAttribute('data-index'))
            this.setState({
                checkItem: arr,
            })
        }
        if (e.target.checked == false) {
            var len = arr.length;
            var arr2 = [];
            for (var i = 0; i < len; i++) {
                if (e.target.getAttribute('data-index') != arr[i]) {
                    arr2.push(arr[i])
                }
            }
            this.setState({
                checkItem: arr2,
                checkAll: false,
            })
        }
    }
    // 是否有修改
    blurHandle(e) {
        if (e.target.length > 0) {
            this.setState({
                changes: true
            })
        } else {
            this.setState({
                changes: false
            })
        }
    }
    handleArr(arrCk) {
        var arr2 = [];
        var lengthItem = arrCk.length;
        if (this.state.type == 'grates') {
            for (var m = 0; m < lengthItem; m++) {
                if (arrCk[m].ck == true) {
                    arr2.push(
                        <tr key={m + 'equl'} className={this.transFlag(arrCk[m].flag)}>
                            <td>
                                <input type="checkbox" className="preck" data-index={m} onChange={this.changeCheckItem.bind(this)} defaultChecked="true" />
                            </td>
                            <td>
                                {Number(m) + 1}
                            </td>
                            <td>
                                {arrCk[m].name}
                            </td>
                            <td>
                                {arrCk[m].stuno}
                            </td>
                            <td>
                                {arrCk[m].coursename}
                            </td>
                            <td>
                                <Input value={arrCk[m].score} change={this.changeScore.bind(this)} id={m} />
                            </td>
                        </tr>)
                } else {
                    arr2.push(
                        <tr key={m + 'uneq'} className={this.transFlag(arrCk[m].flag)}>
                            <td>
                                <input type="checkbox" className="preck" data-index={m} onChange={this.changeCheckItem.bind(this)} />
                            </td>
                            <td>
                                {Number(m) + 1}
                            </td>
                            <td>
                                {arrCk[m].name}
                            </td>
                            <td>
                                {arrCk[m].stuno}
                            </td>
                            <td>
                                {arrCk[m].coursename}
                            </td>
                            <td>
                                <Input value={arrCk[m].score} change={this.changeScore.bind(this)} id={m} />
                            </td>
                        </tr>)
                }
            }
        } else {
            for (var m = 0; m < lengthItem; m++) {
                if (arrCk[m].ck == true) {
                    arr2.push(
                        <tr key={m + 'equl'} className={this.transFlag(arrCk[m].flag)}>
                            <td>
                                <input type="checkbox" className="preck" data-index={m} onChange={this.changeCheckItem.bind(this)} defaultChecked="true" />
                            </td>
                            <td>
                                {Number(m) + 1}
                            </td>
                            <td>
                                {arrCk[m].name}
                            </td>
                            <td>
                                {arrCk[m].studentno}
                            </td>

                            <td>
                                <Input value={arrCk[m].evaluate} change={this.changeScore.bind(this)} id={m} />

                            </td>
                        </tr>)
                } else {
                    arr2.push(
                        <tr key={m + 'uneq'} className={this.transFlag(arrCk[m].flag)}>
                            <td>
                                <input type="checkbox" className="preck" data-index={m} onChange={this.changeCheckItem.bind(this)} />
                            </td>
                            <td>
                                {Number(m) + 1}
                            </td>
                            <td>
                                {arrCk[m].name}
                            </td>
                            <td>
                                {arrCk[m].studentno}
                            </td>

                            <td>
                                <Input value={arrCk[m].evaluate} change={this.changeScore.bind(this)} id={m} />
                            </td>
                        </tr>)
                }
            }
        }
        this.setState({
            preArr: arr2
        })
    }
    saveHandle() {
        // var scoreIndex = this.state.checkItem;
        // var len2 = scoreIndex.length;
        // if(len2<1){
        //     return false
        // }
        this.setState({
            isHidden: false,
        })
    }
    hideClick() {
        this.setState({
            isHidden: true
        })
    }
    enterClick() {
        // console.log(this.state.update)
        var listExcelExam = {}
        var list = '';
        var arr = this.state.update;
        var scoreIndex = this.state.checkItem;
        var len2 = scoreIndex.length;
        var lengthArr = arr.length;
        var arrUpdate = []
        for (var i = 0; i < lengthArr; i++) {
            if (arr[i].ck == true || arr[i].ck == false) {
                delete arr[i].ck
            }
            if (arr[i].flag != 2) {
                arrUpdate.push(arr[i])
            }
        }
        //update dates
        if (this.state.saveTotal == true) {
            for (var i = 0; i < lengthArr; i++) {
                for (var j = 0; j < len2; j++) {
                    if (i == scoreIndex[j]) {
                        if (this.state.type == 'grates') {
                            arr[i].score = this.state.total;
                        } else {
                            arr[i].evaluate = this.state.total;
                        }
                    }
                }
            }
        }
        if (arrUpdate.length < 1) {
            this.setState({
                isHidden: true
            })
            return false;
        }
        if (this.state.type == 'grates') {
            listExcelExam.excelExamList = JSON.stringify(arrUpdate)
            $.llsajax({
                url: "schoolexam/insertFinalExam",
                data: {
                    questionsJson: '{"excelExamList":' + listExcelExam.excelExamList + "}"
                },
                type: 'POST',
                success: data => {
                    var scoreIndex = this.state.checkItem;
                    var len2 = scoreIndex.length;
                    var len = arrUpdate.length;
                    var arr3 = arrUpdate
                    for (var k = 0; k < len; k++) {
                        for (var l = 0; l < len2; l++) {
                            if (k == scoreIndex[l]) {
                                arr3[k].ck = true
                            }
                        }
                    }
                    this.handleArr(arr3)
                    sessionStorage.setItem('schoolGrates', JSON.stringify(this.state.update))
                    this.setState({
                        update: arr3,
                        isHidden: true,
                        totalshow: '',
                        disSucOrErr: true
                    })
                    var _This = this;
                    setTimeout(function () {
                        _This.setState({
                            disSucOrErr: false
                        })
                        hashHistory.push({
                            pathname: '/performance',
                            query: {
                                a: _This.state.a,
                                t: _This.state.t,
                                s: _This.state.s
                            },
                        })
                    }, 2000)
                }
            });
        } else if (this.state.type == 'evaluate') {
            list = JSON.stringify(arrUpdate)
            $.llsajax({
                url: "classmaster/insertEvaluate",
                data: {
                    json: '{"list":' + list + "}"
                },
                type: 'POST',
                success: data => {
                    var scoreIndex = this.state.checkItem;
                    var len2 = scoreIndex.length;
                    var len = arrUpdate.length;
                    var arr3 = arrUpdate
                    for (var k = 0; k < len; k++) {
                        for (var l = 0; l < len2; l++) {
                            if (k == scoreIndex[l]) {
                                arr3[k].ck = true
                            }
                        }
                    }
                    this.handleArr(arr3)
                    sessionStorage.setItem('schoolEvalute', JSON.stringify(this.state.update))
                    this.setState({
                        update: arr3,
                        isHidden: true,
                        totalshow: '',
                        disSucOrErr: true
                    })
                    var _This = this;
                    setTimeout(function () {
                        _This.setState({
                            disSucOrErr: false
                        })
                        hashHistory.push({
                            pathname: '/performance',
                            query: {
                                a: _This.state.a,
                                t: _This.state.t,
                                s: _This.state.s
                            },
                        })
                    }, 2000)
                }
            });
        }
    }
    render() {
        let sucSHow = {
            display: this.state.sucOrErr == true ? 'block' : 'none'
        }
        let sureInput = {
            display: this.state.sureInput == false ? "inline-block" : "none"
        }
        let cgTable1 = {
            display: this.state.type == 'grates' ? 'block' : 'none'
        }
        let cgTable2 = {
            display: this.state.type == 'evaluate' ? 'block' : 'none'
        }
        let errMsg = {
            display: this.state.errInfoshow == true ? "inline-block" : 'none',
            // display: 'inline-block'
        }
        return (<div className="previewComp">
            <div className="previewInner">
                <h2>预览</h2>
                <Link to={{ pathname: "/uploader", query: { a: this.state.a, s: this.state.s, ci: this.state.ci, im: this.state.im, t: this.state.t } }} className="previewBack" >返回<i className="iconfont icon-back"></i></Link>
                <p className="previewTag">
                    说明：1.更新后重复数据将被覆盖！2.错误数据将导入失败，请检查数据的准确性！
                </p>
                <div style={sucSHow}>
                    <p className="previewTitle">
                        {this.state.title}
                        <span>共<i>{this.state.num}</i>条数据</span>
                    </p>
                    <p className="previewClassMessage">
                        <span>学期：<i>{this.state.term}</i></span>
                        <span>学校：<i>{this.state.school}</i></span>
                        <span>专业：<i>{this.state.major}</i></span>
                        <span>班级：<i>{this.state.class}</i></span>
                    </p>
                    <table style={cgTable1}>
                        <tr>
                            <th width="50px"></th>
                            <th width="65px">序号</th>
                            <th width="150px">姓名</th>
                            <th width="320px">学号</th>
                            <th width="300px">课程名称</th>
                            <th width="165px">考试成绩</th>
                        </tr>
                        <tbody>
                            {this.state.preArr}
                        </tbody>
                    </table>
                    <table style={cgTable2}>
                        <tr>
                            <th width="50px"></th>
                            <th width="65px">序号</th>
                            <th width="180px">姓名</th>
                            <th width="450px">学号</th>
                            <th width="315px">学校综合评价</th>
                        </tr>
                        <tbody>
                            {this.state.preArr}
                        </tbody>
                    </table>
                </div>
                <div className="chooseAll" style={sucSHow}>
                    <input type="checkbox" checked={this.state.checkAll == true ? true : false} onChange={this.changeCheck.bind(this)} />
                    全选，所选项全部打
                    <input type="text" value={this.state.totalshow} onChange={this.changeTotal.bind(this)} onBlur={this.blurHandle.bind(this)} />分
                    <span style={sureInput}>*可输入的分值范围为0-100的整数</span>
                </div>
                <div className="saveBtn" style={sucSHow}>
                    <Link to={{ pathname: "/uploader", query: { t: this.state.t, a: this.state.a, s: this.state.s, ci: this.state.ci, im: this.state.im } }} className="commonButton button" >取消</Link>
                    <a className='commonButton button' onClick={this.saveHandle.bind(this)}>提交</a>
                    <span className="errMsgShow" style={errMsg}>
                        <span className="errMsgInner">
                            提示:
                                <i className='errWarn'>{this.state.wrongs.length < 1 ? this.state.warn + '请检查数据准确性！' : this.state.warn}</i>
                            <i className='errWrong'>{this.state.wrongs}</i>
                            <i className="iconfont icon-guanbi" onClick={this.changeErrShow.bind(this)}></i>
                            <i className="triangle"></i>
                        </span>
                    </span>
                </div>
            </div>
            <BombBox
                hideClick={this.hideClick.bind(this)}
                enterClick={this.enterClick.bind(this)}
                isHidden={this.state.isHidden}
                bombBoxMsg={this.state.bombBoxMsg}
            />
            <div className='sucorerr' >
                <span className={this.state.disSucOrErr == true ? 'sOeShow' : 'sOeHide'}><i className="iconfont icon-xiaoxizhongxin-"></i>{this.state.type == 'grates' ? '综合成绩保存成功' : '综合评价保存成功'}</span>
            </div>
        </div>)
    }
    changeErrShow() {
        this.setState({
            errInfoshow: false
        })
    }
}