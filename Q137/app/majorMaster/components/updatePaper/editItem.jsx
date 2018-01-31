'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import './editItem.css';

export default class editItem extends Component {
    constructor() {
        super();
        this.state = {
            showItem: false,
            data: {},
            // ansArr:[],
            first: false,
            disSucOrErr: false,//保存成功提示
        }
    }
    componentWillReceiveProps(props) {
        if (props.flag == true) {
            // console.log(props)
            this.setState({
                showItem: true,
                data: props.data,
            })
            // this.createAns(props.data)
        }
    }
    componentDidUpdate() {

        // if (this.state.first == false) {
        this.createAns(this.state.data)
        // this.setState({
        //     first: true,
        // })
        document.getElementById('changeType').value = this.props.data.type;
        document.getElementById('changeLevel').value = this.props.data.level;
    }
    // }
    render() {
        let showItem = {
            display: this.state.showItem == true ? '' : 'none'
        }
        return (<div className='editItemWrap' style={showItem}>
            <div className='editItemContainer'>
                <div className='editItemTitle'>
                    编辑
                    <i className="iconfont icon-guanbi" onClick={this.closeHandle.bind(this)}></i>
                </div>
                <div className="editItemChangeType">
                    编辑题型:
                    <select name="" id="changeType" onChange={this.changeType.bind(this)}>
                        <option value="1">&nbsp;单选题</option>
                        <option value="2">&nbsp;多选题</option>
                        <option value="3">&nbsp;问答题</option>
                    </select>
                </div>
                <p className="editItemChangeStem">
                    <textarea name="" id="" value={this.state.data.stem} onChange={this.changeStem.bind(this)}></textarea>
                </p>
                <div>
                    {/*{this.state.ansArr}*/}
                    {this.createAns(this.state.data)}
                </div>
                <div className="editItemChangeLevel">
                    难易度：
                    <select name="" id="changeLevel" onChange={this.changeLevel.bind(this)}>
                        <option value="1">&nbsp;易</option>
                        <option value="2">&nbsp;中</option>
                        <option value="3">&nbsp;难</option>
                    </select>
                </div>
                <div className="editItemBelongTo">
                    题目所属：
                    <span>{this.belongTo(this.props.obj)}</span>
                </div>

                <div className="editItemMethod">
                    <a href="javascript:;" className="turnBack" onClick={this.closeHandle.bind(this)}>取消</a>
                    <a href="javascript:;" onClick={this.saveHandle.bind(this)} className="saveThoseData button commonButton">保存</a>
                </div>
                <div className='editItemSucorerr' id="editItemSucorerr">
                    <div className={this.state.disSucOrErr == true ? 'editItemsOeShow' : 'editItemsOeHide'}><i className="iconfont icon-xiaoxizhongxin-"></i>数据保存成功</div>
                </div>
            </div>
        </div>)
    }

    createAns(data) {
        var data = data;
        var arr = [];
        var str = '0'
        // 判断是否有数据
        if (JSON.stringify(data) != '{}') {
            if (data.type == 1) {//单选
                str = '4'
            }
            if (data.type == 2) {//多选
                str = '6'
            }
        }
        switch (str) {
            case '6':
                arr.push(
                    <p className="ansItem" key='6'>
                        <i onClick={this.ABCDEF.bind(this, 'F')} className={this.state.data.answer.split('').indexOf('F') != -1 ? "roundOut isAns" : 'roundOut'}><i></i></i>
                        <i className={this.state.data.answer.split('').indexOf('F') != -1 ? "squOut isAns" : 'squOut'}>F</i>
                        <span className={this.state.data.answer.split('').indexOf('F') != -1 ? "isAns" : ''}>
                            <textarea name="" id="" value={this.state.data.optionF} onChange={this.changeF.bind(this)}></textarea>
                        </span>
                    </p>
                )
            case '5':
                arr.push(
                    <p className="ansItem" key='5'>
                        <i onClick={this.ABCDEF.bind(this, 'E')} className={this.state.data.answer.split('').indexOf('E') != -1 ? "roundOut isAns" : 'roundOut'}><i></i></i>
                        <i className={this.state.data.answer.split('').indexOf('E') != -1 ? "squOut isAns" : 'squOut'}>E</i>
                        <span className={this.state.data.answer.split('').indexOf('E') != -1 ? "isAns" : ''}>
                            <textarea name="" id="" value={this.state.data.optionE} onChange={this.changeE.bind(this)}></textarea>
                        </span>
                    </p>
                )
            case '4':
                arr.push(
                    <p className="ansItem" key='4'>
                        <i onClick={this.ABCDEF.bind(this, 'D')} className={this.state.data.answer.split('').indexOf('D') != -1 ? "roundOut isAns" : 'roundOut'}><i></i></i>
                        <i className={this.state.data.answer.split('').indexOf('D') != -1 ? "squOut isAns" : 'squOut'}>D</i>
                        <span className={this.state.data.answer.split('').indexOf('D') != -1 ? "isAns" : ''}>
                            <textarea name="" id="" value={this.state.data.optionD} onChange={this.changeD.bind(this)}></textarea>
                        </span>
                    </p>
                )
            case '3':
                arr.push(
                    <p className="ansItem" key='3'>
                        <i onClick={this.ABCDEF.bind(this, 'C')} className={this.state.data.answer.split('').indexOf('C') != -1 ? "roundOut isAns" : 'roundOut'}><i></i></i>
                        <i className={this.state.data.answer.split('').indexOf('C') != -1 ? "squOut isAns" : 'squOut'}>C</i>
                        <span className={this.state.data.answer.split('').indexOf('C') != -1 ? "isAns" : ''}>
                            <textarea name="" id="" value={this.state.data.optionC} onChange={this.changeC.bind(this)}></textarea>
                        </span>
                    </p>
                )
            case '2':
                arr.push(
                    <p className="ansItem" key='2'>
                        <i onClick={this.ABCDEF.bind(this, 'B')} className={this.state.data.answer.split('').indexOf('B') != -1 ? "roundOut isAns" : 'roundOut'}><i></i></i>
                        <i className={this.state.data.answer.split('').indexOf('B') != -1 ? "squOut isAns" : 'squOut'}>B</i>
                        <span className={this.state.data.answer.split('').indexOf('B') != -1 ? "isAns" : ''}>
                            <textarea name="" id="" value={this.state.data.optionB} onChange={this.changeB.bind(this)}></textarea>
                        </span>
                    </p>
                )
            case '1':
                arr.push(
                    <p className="ansItem" key='1'>
                        <i onClick={this.ABCDEF.bind(this, 'A')} className={this.state.data.answer.split('').indexOf('A') != -1 ? "roundOut isAns" : 'roundOut'}><i></i></i>
                        <i className={this.state.data.answer.split('').indexOf('A') != -1 ? "squOut isAns" : 'squOut'}>A</i>
                        <span className={this.state.data.answer.split('').indexOf('A') != -1 ? "isAns" : ''}>
                            <textarea name="" id="" value={this.state.data.optionA} onChange={this.changeA.bind(this)}></textarea>
                        </span>
                    </p>
                )
                break;
            case '0':
                arr.push(
                    <p className="shotAns" key='0'>
                        <textarea name="" id="" value={this.state.data.answer} onChange={this.changeAns.bind(this)}></textarea>
                    </p>
                )
                break;
        }
        // this.setState({
        //     ansArr:arr.reverse(),
        // })
        return arr.reverse();
    }
    changeStem(e) {
        var data = this.state.data
        // if(e.target.value.length>200){
        //     return false;
        // }
        data.stem = e.target.value;
        this.setState({
            data: data,
        })
    }
    ABCDEF(str) {
        // console.log(num)
        var type = this.state.data.type;
        var data = this.state.data;
        if (type == 1) {
            data.answer = str
        }
        if (type == 2) {

            var ansA = data.answer.split('');

            var i = ansA.indexOf(str);

            if (i > -1) {
                ansA.splice(i, 1)
            } else {
                ansA.push(str)
            }
            // console.log(ansA.sort().join(''))
            data.answer = ansA.sort().join('')
        }
        this.setState({
            data: data
        })
    }
    changeA(e) {
        var data = this.state.data
        data.optionA = e.target.value;
        this.setState({
            data: data,
        })
    }
    changeB(e) {
        var data = this.state.data
        data.optionB = e.target.value;
        this.setState({
            data: data,
        })
    }
    changeC(e) {
        var data = this.state.data
        data.optionC = e.target.value;
        this.setState({
            data: data,
        })
    }
    changeD(e) {
        var data = this.state.data
        data.optionD = e.target.value;
        this.setState({
            data: data,
        })
    }
    changeE(e) {
        var data = this.state.data
        data.optionE = e.target.value;
        this.setState({
            data: data,
        })
    }
    changeF(e) {
        var data = this.state.data
        data.optionF = e.target.value;
        this.setState({
            data: data,
        })
    }
    changeAns(e) {
        var data = this.state.data
        data.answer = e.target.value;
        this.setState({
            data: data,
        })
    }

    changeType(e) {
        var data = this.state.data
        data.type = e.target.value;
        if (e.target.value == 1) {

            data.answer = data.answer.substr(0, 1);
        }
        this.setState({
            data: data,
        })
    }

    changeLevel(e) {
        var data = this.state.data
        data.level = e.target.value;
        this.setState({
            data: data,
        })
    }
    closeHandle() {
        this.props.closeMask()
        this.setState({
            showItem: false,
            first: false,
            // data:{},
        })
    }
    saveHandle() {
        var obj = this.state.data;
        this.props.saveHandle(obj)
        // this.closeHandle()
        this.setState({
            disSucOrErr: true
        })
        var _This = this;
        setTimeout(function () {
            _This.setState({
                disSucOrErr: false,
            })
            _This.closeHandle()
        }, 2000)
    }
    belongTo(obj) {
        var str = ''
        if (typeof (obj.mName) != 'undefined') {
            str = obj.mName
        }
        if (typeof (obj.cName) != 'undefined') {
            str = str + '-' + obj.cName
        }
        if (typeof (obj.lName) != 'undefined') {
            str = str + '-' + obj.lName
        }
        if (str.length < 1) {
            str = '--'
        }
        return str
    }
}
