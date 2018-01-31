import React from 'react';
import $ from 'jquery';
import './thCmt.css'
import url from '../../../controller/url.js';


export default class ThCmt extends React.Component {
    constructor() {
        super();
        this.state = {
            showItem: false,
            id: '',
            term: '1',
            cTime: '--',
            // cSTime: '--',
            cContent: '',
            // cSContent: '',
            cPerson: '--',
            tTime: '--',
            // tSTime: '--',
            tContent: '',
            // tSContent: '',
            tPerson: '--',
            value: '',
            errmsg: '无法保存',//提示错误内容
            disSucOrErr: false,
            tip: '学期评语保存成功',
            showJugeType: '00',// 00 展示公开 01 展示内部
            editJugeType: '10',// 10 编辑公开 11 编辑内部
            showTime: '--',
            editTime: '--',
            showContent: '',
            csContent: '',//内部评价
            csDate: '--',//内部评价时间
            tsContent: '',//内部评价
            tsDate: '--',//内部评价时间
            editNormalValue: '',
            editSecretValue: '',
            num1: 0,
            num2: 0,
        }
    }
    componentWillMount() {
        this.setState({
            showItem: false,
            id: this.props.id,
            term: this.props.term,
        })
        if (sessionStorage.getItem('userJudge') == 'T') {
            this.setState({
                tPerson: sessionStorage.getItem('cUserNm')
            })
        }
        if (sessionStorage.getItem('userJudge') == 'C') {
            this.setState({
                cPerson: sessionStorage.getItem('cUserNm')
            })
        }
    }
    componentWillReceiveProps(props) {
        // console.log(props)
        this.setState({
            showItem: false,
            id: props.id,
            term: props.term,
        })
    }
    render() {
        let showItem = {
            display: this.state.showItem == true ? 'block' : 'none'
        }
        let psnStyle = {
            left: sessionStorage.getItem('userJudge') == 'C' ? '0px' : '0px'
        }
        let TMview = {
            show: {

                display: sessionStorage.getItem('userJudge') == 'TM'|| sessionStorage.getItem('userJudge') == 'CM'||sessionStorage.getItem('userJudge') == 'EM'||sessionStorage.getItem('userJudge') == 'PM'||sessionStorage.getItem('userJudge') == 'HM'? "none" : "block"
            },
            hide:{
                display: sessionStorage.getItem('userJudge') == 'TM'||sessionStorage.getItem('userJudge') == 'CM'||sessionStorage.getItem('userJudge') == 'EM'||sessionStorage.getItem('userJudge') == 'PM'||sessionStorage.getItem('userJudge') == 'HM' ? "block" : "none"
            },
            right:{
                // left:'0',
                right:'0px',
                textAlign:'right',
            }

        }
        return (<div className="thCmt" style={psnStyle}>
            <a className="createCmt" onClick={this.showItem.bind(this)} data-id={this.props.id} title="学期评语"><i className="iconfont icon-pingjia" data-id={this.props.id} title='学期评语'></i>学期评语</a>
            <div className="cM_mask" style={showItem}>
                <div className="thCmtInner">
                    <i onClick={this.hideItem.bind(this)} className="iconfont icon-guanbi"></i>
                    <h6 className="thCmtTit">学期评语
                        <span>
                            评价对象：
                            <i>{this.props.stuName + ' ' + this.props.stuNo}</i>
                        </span>
                        <span>
                            当前学期:
                            <i>{this.transTerm(this.props.term)}</i>
                        </span>
                    </h6>
                    {/* <div className="thCmtWrapper">
                        <p>评价对象：<span>{this.props.stuName + ' ' + this.props.stuNo}</span></p>
                        <p>当前学期:<span>{this.transTerm(this.props.term)}</span></p>
                    </div>*/}
                    <div className="thCmtWrapper1">
                        <p className="thCmtWrapTit">
                            {/*<span>{sessionStorage.getItem('userJudge') == 'C' ? '助教老师的评语' : '班主任的评语'}</span>    */}
                            <span className={'s_tcmt'}>{sessionStorage.getItem('userJudge') == 'C'||sessionStorage.getItem('userJudge') == 'CM' ? '助教老师公开评语' : '班主任公开评语'}</span>
                            <span className={'s_tcmt s_tcmt1'}>{sessionStorage.getItem('userJudge') == 'C'||sessionStorage.getItem('userJudge') == 'CM' ? '助教老师非公开评语' : '班主任非公开评语'}</span>
                        </p>
                        <div className="cmtContainer">
                            <p className="cmtShowText andLine">

                                <span className="cmtTypeContent">{sessionStorage.getItem('userJudge') == 'T'||sessionStorage.getItem('userJudge') == 'TM' ? this.state.cContent : this.state.tContent}</span>
                                <span className="cmtTypeName">评价人：{this.state.showP1}</span>
                                <span className="cmtTypeTime">评价时间：{sessionStorage.getItem('userJudge') == "T" ||sessionStorage.getItem('userJudge') == 'TM'? this.transTime(this.state.cTime) : this.transTime(this.state.tTime)}</span>
                            </p>
                            <p className="cmtShowText">

                                <span className="cmtTypeContent">{sessionStorage.getItem('userJudge') == 'T' ||sessionStorage.getItem('userJudge') == 'TM'? this.state.csContent : this.state.tsContent}</span>
                                <span className="cmtTypeName">评价人：{this.state.showP2}</span>
                                <span className="cmtTypeTime">评价时间：{sessionStorage.getItem('userJudge') == "T"||sessionStorage.getItem('userJudge') == 'TM' ? this.transTime(this.state.csDate) : this.transTime(this.state.tsDate)}</span>
                            </p>

                        </div>
                    </div>
                    <div className="thCmtWrapper2"  style={TMview.show}>
                        <p className="thCmtWrapTit">
                            <span data-t="10" className={'tcmt'}>{sessionStorage.getItem('userJudge') == 'T' ? '助教老师公开评语' : '班主任公开评语'}</span>
                            <span data-t="11" className={'tcmt tcmt1'}>{sessionStorage.getItem('userJudge') == 'T' ? '助教老师非公开评语' : '班主任非公开评语'}</span>
                            <span className="cmtUser">{sessionStorage.getItem('userJudge') == 'T' ? '助教老师' : '班主任'}</span>
                            <span className="words1">*已录入<i>{this.state.num1}字</i>&nbsp;最多可录入300字</span>
                            <span className="words2">*已录入<i>{this.state.num2}字</i>&nbsp;最多可录入300字</span>
                        </p>
                        <div className="cmtContainer">
                            <div className='cmtContainerInfo'>
                                <textarea value={this.state.editNormalValue} onChange={this.editIt.bind(this)}></textarea>
                                <p>
                                    {sessionStorage.getItem('userJudge') == 'T' ? '评价人：' + this.state.tPerson : '评价人：' + this.state.cPerson}
                                    <span className="cmtTime">评价时间:{this.transTime(this.state.editTime)}</span>
                                    <a id="thCmtBtn2" className="button commonButton " onClick={this.saveCmt.bind(this, 0)}>暂存</a>
                                    <a id="thCmtBtn1" className="button commonButton " onClick={this.saveCmt.bind(this, 1)}>提交</a>
                                </p>
                            </div>
                            <div className='cmtContainerInfo'>
                                <textarea id="editSecret" value={this.state.editSecretValue} onChange={this.editIt2.bind(this)}></textarea>
                                <p>
                                    {sessionStorage.getItem('userJudge') == 'T' ? '评价人：' + this.state.tPerson : '评价人：' + this.state.cPerson}
                                    <span className="cmtTime">评价时间:{this.transTime(this.state.editTime)}</span>
                                    <a id="thCmtBtn3" className="button commonButton" onClick={this.saveCmt.bind(this, 0)}>暂存</a>
                                    <a id="thCmtBtn" className="button commonButton" onClick={this.saveCmt.bind(this, 1)}>提交</a>
                                </p>
                            </div>
                            <span className="cmtLineItem"></span>
                        </div>
                    </div>
                    <div className="thCmtWrapper2"  style={TMview.hide}>
                        <p className="thCmtWrapTit">
                            <span data-t="10" className={'tcmt'}>{sessionStorage.getItem('userJudge') == 'TM'||sessionStorage.getItem('userJudge') == 'PM'||sessionStorage.getItem('userJudge') == 'EM'||sessionStorage.getItem('userJudge') == 'HM' ? '助教老师公开评语' : '班主任公开评语'}</span>
                            <span data-t="11" className={'tcmt tcmt1'}>{sessionStorage.getItem('userJudge') == 'TM'||sessionStorage.getItem('userJudge') == 'PM'||sessionStorage.getItem('userJudge') == 'EM'||sessionStorage.getItem('userJudge') == 'HM' ? '助教老师非公开评语' : '班主任非公开评语'}</span>
                        </p>
                        <div className="cmtContainer">
                            <div className='cmtContainerInfo'>
                                <textarea value={this.state.editNormalValue} disabled="disabled"></textarea>
                                <p>
                                    <span className="cmtTime" style={TMview.right}>{sessionStorage.getItem('userJudge') == 'TM'||sessionStorage.getItem('userJudge') == 'PM'||sessionStorage.getItem('userJudge') == 'EM'||sessionStorage.getItem('userJudge') == 'HM' ? '评价人：' + this.state.tPerson : '评价人：' + this.state.cPerson}</span>
                                    评价时间:{this.transTime(this.state.editTime)}
                                </p>
                            </div>
                            <div className='cmtContainerInfo'>
                                <textarea id="editSecret" value={this.state.editSecretValue} disabled="disabled"></textarea>
                                <p>
                                    <span className="cmtTime" style={TMview.right}>{sessionStorage.getItem('userJudge') == 'TM'||sessionStorage.getItem('userJudge') == 'PM'||sessionStorage.getItem('userJudge') == 'EM'||sessionStorage.getItem('userJudge') == 'HM' ? '评价人：' + this.state.tPerson : '评价人：' + this.state.cPerson}</span>
                                    评价时间:{this.transTime(this.state.editTime)} 
                                </p>
                            </div>
                            <span className="cmtLineItem"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sucorerr' >
                <span className={this.state.disSucOrErr == true ? 'sOeShow' : 'sOeHide'}><i className="iconfont icon-xiaoxizhongxin-"></i>{this.state.tip}</span>
            </div>
        </div>)
    }
    // 显示内容
    showItem(e) {
        // //console.log(e.target.getAttribute('data-id'))
        var id = e.target.getAttribute('data-id')
        var t = this.state.term;
        this.getDataAjax(id, t)
        this.setState({
            showItem: true,
        })
    }
    // 隐藏内容
    hideItem() {
        this.setState({
            showItem: false,
            showTime: '--',
            editTime: '--',
            showContent: '',
            csContent: '',//内部评价
            csDate: '--',//内部评价时间
            tsContent: '',//内部评价
            tsDate: '--',//内部评价时间
            editNormalValue: '',
            editSecretValue: '',
            cTime: '--',
            // cSTime: '--',
            cContent: '',
            // cSContent: '',
            cPerson: '--',
            tTime: '--',
            // tSTime: '--',
            tContent: '',
            // tSContent: '',
            tPerson: '--',
            value: '',
        })
    }
    // 请求数据
    getDataAjax(id, t) {
        // var names = sessionStorage.getItem('userJudge')=='C'?this.state.cPerson:this.state.tPerson
        $.llsajax({
            url: "/UserComment/getComment",
            type: "post",
            data: {
                userid: id,
                term: t,
            },
            success: data => {
                // //console.log(data)
                var et = '--'
                var p1 = '--'
                var p2 = '--'
                var j = sessionStorage.getItem('userJudge')
                if (j == 'T'||j == 'TM') {
                    et = !!data.luc.tcomm ? data.luc.tdate || '--' : '1'
                    p1 = !!data.luc.ccomm ? data.luc.cuname || '--' : '--'
                    p2 = !!data.luc.cscomm ? data.luc.cuname || '--' : '--'
                } else {
                    et = !!data.luc.ccomm ? data.luc.cdate || '--' : '1'
                    p1 = !!data.luc.tcomm ? data.luc.tuname || '--' : '--'
                    p2 = !!data.luc.tscomm ? data.luc.tuname || '--' : '--'
                }
                this.setState({
                    cTime: !!data.luc.ccomm ? data.luc.cdate || '--' : '1',
                    cContent: data.luc.ccomm || '',
                    cPerson: !!data.luc.cuname ? data.luc.cuname : '--',
                    tTime: !!data.luc.ccomm ? data.luc.tdate || '--' : '1',
                    tContent: data.luc.tcomm || '',
                    tPerson: !!data.luc.tuname ? data.luc.tuname : '--',
                    csContent: data.luc.cscomm || '',
                    csDate: !!data.luc.cscomm ? data.luc.csdate || '--' : '1',
                    tsContent: data.luc.tscomm || '',
                    tsDate: !!data.luc.tscomm ? data.luc.tsdate || '--' : '1',
                    showContent: j == 'T' ? data.luc.ccomm || '' : data.luc.tcomm || '',
                    editTime: this.transTime(et),
                    showP1: p1,
                    showP2: p2,
                    editNormalValue: j == 'C'||j=='CM'||j=='PM'||j=='HM' ? data.luc.ccomm : data.luc.tcomm,
                    editSecretValue: j == 'C'||j=='CM'||j=='PM'||j=='HM' ? data.luc.cscomm : data.luc.tscomm,
                })
                if (j == 'C') {
                    this.setState({
                        num1: data.luc.ccomm != null ? data.luc.ccomm.length : 0,
                        num2: data.luc.cscomm != null ? data.luc.cscomm.length : 0,
                    })
                }
                if (j == 'T') {
                    this.setState({
                        num1: data.luc.tcomm != null ? data.luc.tcomm.length : 0,
                        num2: data.luc.tscomm != null ? data.luc.tscomm.length : 0,
                    })
                }
                // var flag = true;
                // var arrLocal = JSON.parse(localStorage.getItem('useless'));
                // var len = arrLocal.length;
                // if (len > 0) {
                //     for (var i = 0; i < len; i++) {
                //         if (id == arrLocal[i].id && j == arrLocal[i].judge) {
                //             this.setState({
                //                 editNormalValue: arrLocal[i].nor,
                //                 editSecretValue: arrLocal[i].scr,
                //             })
                //             flag = false;
                //             break;
                //         }
                //     }
                // }
                // if (flag) {
                //     this.setState({
                //         editNormalValue: j == 'C' ? data.luc.ccomm : data.luc.tcomm,
                //         editSecretValue: j == 'C' ? data.luc.cscomm : data.luc.tscomm,
                //     })
                // }

            }
        })
    }
    // 处理姓名字符串
    transName(str1, str2) {

    }
    // 处理学期字符串
    transTerm(str) {
        var t = str + '';
        var s = '';
        switch (t) {
            case '5':
                s = '第五学期'
                break;
            case '4':
                s = '第四学期'
                break;
            case '3':
                s = '第三学期'
                break;
            case '2':
                s = '第二学期'
                break;
            case '1':
                s = '第一学期'
                break;
        }
        return s;
    }
    // 处理时间
    transTime(str) {
        // //console.log(str)
        var strs = '--'
        if (str == '--') {
            var date = new Date();
            var now = new Date(date)
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var hour = now.getHours();
            var minute = ('' + now.getMinutes()).length < 2 ? '0' + now.getMinutes() : now.getMinutes();
            var second = now.getSeconds();
            strs = year + "/" + month + "/" + date + " " + hour + ":" + minute;
        } else {
            strs = str.substring(0, 16).replace(/\-/g, '/')
        }
        if (str == '1') {
            strs = '--'
        }
        return strs;

    }
    editIt(e) {
        //  editJugeType: '10',// 10 编辑公开 11 编辑内部
        // //console.log(e.target.value)
        var str = '' + e.target.value
        if (str.length > 300) {
            return false;
        }
        this.setState({
            value: str,
            num1: str.length,
        })
        // if(this.state.editJugeType == '10'){
        this.setState({
            editNormalValue: e.target.value,
        })
        // }else{
        //     this.setState({
        //         editSecretValue:e.target.value,
        //     })
        // }
    }
    editIt2(e) {
        //  editJugeType: '10',// 10 编辑公开 11 编辑内部
        // //console.log(e.target.value)
        var str = '' + e.target.value
        if (str.length > 300) {
            return false;
        }
        this.setState({
            value: str,
            num2: str.length,
        })
        // if(this.state.editJugeType == '10'){
        //     this.setState({
        //         editNormalValue:e.target.value,
        //     })
        // }else{
        this.setState({
            editSecretValue: e.target.value,
        })
        // }
    }
    // 保存评价
    saveCmt(type) {
        // console.log(type)
        var id = this.state.id;
        // var value = this.state.value;
        var judge = sessionStorage.getItem('userJudge')
        // //console.log(this.state.editNormalValue)
        // //console.log(this.state.editSecretValue)
        if (judge == 'T') {
            $.llsajax({
                url: "/UserComment/editComment",
                type: "post",
                data: {
                    id: id,
                    tcomm: this.state.editNormalValue,
                    tscomm: this.state.editSecretValue,
                    term: this.state.term,
                    type: type,
                },
                success: data => {
                    //console.log(data)
                    this.setState({
                        tPerson: data.luc.tuname || '--',
                        disSucOrErr: true,
                        tip: type == 0 ? '学期评语暂存成功' : '学期评语保存成功',

                    })
                    // if (type == 1) {
                    //     this.setState({
                    //         showTime: '--',
                    //         editTime: '--',
                    //         showContent: '',
                    //         csContent: '',//内部评价
                    //         csDate: '--',//内部评价时间
                    //         tsContent: '',//内部评价
                    //         tsDate: '--',//内部评价时间
                    //         editNormalValue: '',
                    //         editSecretValue: '',
                    //     })
                    // }
                    // this.successHandle(id,sessionStorage.getItem('userJudge'))
                    var _This = this;
                    setTimeout(function () {
                        _This.setState({
                            disSucOrErr: false,
                            showItem: false,
                            showTime: '--',
                            editTime: '--',
                            showContent: '',
                            csContent: '',//内部评价
                            csDate: '--',//内部评价时间
                            tsContent: '',//内部评价
                            tsDate: '--',//内部评价时间
                            editNormalValue: '',
                            editSecretValue: '',
                        })
                    }, 2000)
                }
            })
        }
        if (judge == 'C') {
            $.llsajax({
                url: "/UserComment/editComment",
                type: "post",
                data: {
                    id: id,
                    ccomm: this.state.editNormalValue,
                    cscomm: this.state.editSecretValue,
                    term: this.state.term,
                    type: type
                },
                success: data => {
                    // console.log(data)
                    this.setState({
                        cPerson: data.luc.cuname || '--',
                        disSucOrErr: true,
                        tip: type == 0 ? '学期评语暂存成功' : '学期评语保存成功',
                        // showTime: '--',
                        // editTime: '--',
                        // showContent: '',
                        // csContent: '',//内部评价
                        // csDate: '--',//内部评价时间
                        // tsContent: '',//内部评价
                        // tsDate: '--',//内部评价时间
                        // editNormalValue: '',
                        // editSecretValue: '',
                    })
                    // if (type == 1) {
                    //     this.setState({
                    //         showTime: '--',
                    //         editTime: '--',
                    //         showContent: '',
                    //         csContent: '',//内部评价
                    //         csDate: '--',//内部评价时间
                    //         tsContent: '',//内部评价
                    //         tsDate: '--',//内部评价时间
                    //         editNormalValue: '',
                    //         editSecretValue: '',
                    //     })
                    // }
                    // this.successHandle(id,sessionStorage.getItem('userJudge'))
                    var _This = this;
                    setTimeout(function () {
                        _This.setState({
                            disSucOrErr: false,
                            showItem: false,
                            showTime: '--',
                            editTime: '--',
                            showContent: '',
                            csContent: '',//内部评价
                            csDate: '--',//内部评价时间
                            tsContent: '',//内部评价
                            tsDate: '--',//内部评价时间
                            editNormalValue: '',
                            editSecretValue: '',
                        })
                    }, 2000)
                }
            })
        }

    }
    // saveCmtLocal() {
    //     // console.log(localStorage.getItem('useless'))

    //     // 处理数据
    //     var id = this.state.id;
    //     var judge = sessionStorage.getItem('userJudge')
    //     var nor = this.state.editNormalValue;
    //     var scr = this.state.editSecretValue;
    //     var t = this.state.term;
    //     var obj = {}
    //     obj.id = id;
    //     obj.t = t;
    //     obj.judge = judge;
    //     obj.nor = nor;
    //     obj.scr = scr;

    //     // 查询插入
    //     if (!!localStorage.getItem('useless')) {
    //         var flag = false;
    //         var arr = JSON.parse(localStorage.getItem('useless'))
    //         var len = arr.length
    //         if (len > 0) {
    //             for (var i = 0; i < len; i++) {
    //                 if (arr[i].id == id && arr[i].judge == judge) {
    //                     arr[i] = obj;
    //                     flag = false;
    //                     break;
    //                 } else {
    //                     flag = true;
    //                 }
    //             }
    //         }
    //         if (flag) {
    //             arr.push(obj)
    //         }
    //         localStorage.setItem('useless', JSON.stringify(arr))
    //     } else {
    //         var arr = [];
    //         arr.push(obj)
    //         localStorage.setItem('useless', JSON.stringify(arr))
    //     }
    // }
    // successHandle(id,judge){
    //     if (!!localStorage.getItem('useless')) {
    //         var arr = JSON.parse(localStorage.getItem('useless'))
    //         var len = arr.length
    //         if (len > 0) {
    //             for (var i = 0; i < len; i++) {
    //                 if (arr[i].id == id && arr[i].judge == judge) {
    //                     arr[i] =null;
    //                     break;
    //                 } 
    //             }
    //         }
    //         localStorage.setItem('useless', JSON.stringify(arr))
    //     }else{
    //         localStorage.setItem('useless', '[]')
    //     }
    // }
    // 更改评价类型
    changeCmtType(e) {
        // 评论人
        var cP = this.state.cPerson;
        var tP = this.state.tPerson
        // 班主任评论
        var cT = this.transTime(this.state.cTime);
        var cCnt = this.state.cContent;
        var csT = this.transTime(this.state.csDate);
        var csCnt = this.state.csContent
        // 助教评论
        var tT = this.transTime(this.state.tTime);
        var tCnt = this.state.tContent;
        var tsT = this.transTime(this.state.tsDate);
        var tsCnt = this.state.tsContent
        var judgePerson = sessionStorage.getItem('userJudge')
        //console.log(cT)
        //console.log(csT)
        //console.log(tT)
        //console.log(tsT)
        // 00 展示公开 01 展示内部 10 编辑公开 11 编辑内部
        // //console.log(e.target.getAttribute('data-t'))
        var mark = e.target.getAttribute('data-t') + '';
        switch (mark) {
            case '00':
                this.setState({
                    showJugeType: '00'
                })
                if (judgePerson == 'T') {
                    this.setState({
                        showTime: cT,
                        // editTime: '--',
                        showContent: cCnt,
                        // value:'',
                    })
                } else {
                    this.setState({
                        showTime: tT,
                        // editTime: '--',
                        showContent: tCnt,
                        // value:'',
                    })
                }
                break;
            case '01':
                this.setState({
                    showJugeType: '01'
                })
                if (judgePerson == 'T') {
                    this.setState({
                        showTime: csT,
                        // editTime: '--',
                        showContent: csCnt,
                        // value:'',
                    })
                } else {
                    this.setState({
                        showTime: tsT,
                        // editTime: '--',
                        showContent: tsCnt,
                        // value:'',
                    })
                }
                break;
            case '10':
                this.setState({
                    editJugeType: '10'
                })
                if (judgePerson == 'T') {
                    this.setState({
                        editTime: tT,
                        // value:tCnt,
                    })
                } else {
                    this.setState({
                        editTime: cT,
                        // value:cCnt,
                    })
                }
                break;
            case '11':
                this.setState({
                    editJugeType: '11'
                })
                if (judgePerson == 'T') {
                    this.setState({
                        editTime: tsT,
                        // value:tsCnt,
                    })
                } else {
                    this.setState({
                        editTime: csT,
                        // value:csCnt,
                    })
                }
                break;
        }
    }
    componentDidUpdate() {
        if (this.state.showItem == true) {
            $("html").css("overflow-y", "hidden");
        } else {
            $("html").css("overflow-y", "auto");
        }
    }
}