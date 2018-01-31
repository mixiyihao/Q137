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
            cTime: '--',
            cContent: '',
            cPerson: '--',
            tTime: '--',
            tContent: '',
            tPerson: '--',
            value:'',
        }
    }
    componentWillMount() {
        this.setState({
            id: this.props.id,
        })
        // //console.log(this.props)
    }
    render() {
        let showItem = {
            display: this.state.showItem == true ? 'block' : 'none'
        }
        return (<div className="thCmt">
            <a  className="createCmt" onClick={this.showItem.bind(this)} data-id={this.state.id}>学员评价</a>
            <div className="thCmtInner" style={showItem}>
                <i onClick={this.hideItem.bind(this)} className="iconfont icon-guanbi"></i>
                <h6 className="thCmtTit">学员评价</h6>
                <div className="thCmtWrapper">
                    <p>评价对象：<span>{this.props.stuName + ' ' +this.props.stuNo}</span></p>
                </div>
                <div className="thCmtWrapper1">
                    <p className="thCmtWrapTit">
                        <span>{sessionStorage.getItem('userJudge') == 'C' ? '助教老师的评价：' : '班主任的评价：'}</span>
                        <span className="cmtTime">{this.transTime(this.state.cTime)}</span>
                    </p>
                    <div className="cmtContainer">
                        <div className="cmtShowContent">{sessionStorage.getItem('userJudge')=='C'?this.state.cContent:this.state.tContent}</div>
                        <p>{sessionStorage.getItem('userJudge')=='C'?'评价人：'+this.state.tPerson:'评价人：'+this.state.cPerson}</p>
                    </div>
                </div>
                <div className="thCmtWrapper2">
                    <p className="thCmtWrapTit">
                        <span>{sessionStorage.getItem('userJudge') == 'T' ? '助教老师的评价：' : '班主任的评价：'}</span>
                        <span className="cmtTime">{this.transTime(this.state.tTime)}</span>
                    </p>
                    <div className="cmtContainer">
                        
                        <div>
                            <textarea name="" id="" value={this.state.value} onChange={this.editIt.bind(this)}></textarea>
                            <p>
                                {sessionStorage.getItem('userJudge')=='T'?'评价人：'+this.state.tPerson:'评价人：'+this.state.cPerson}
                                <a  className="button commonButton" onClick={this.saveCmt.bind(this)}>保存评价</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
    // 显示内容
    showItem(e) {
        // //console.log(e.target.getAttribute('data-id'))
        var id = e.target.getAttribute('data-id')
        this.getDataAjax(id)
        this.setState({
            showItem: true,
        })
    }
    // 隐藏内容
    hideItem() {
        this.setState({
            showItem: false,
        })
    }
    // 请求数据
    getDataAjax(id) {
        $.llsajax({
            url: "/UserComment/getComment",

            type: "post",
            data: {
                userid: id,
            },
            success: data => {
                //console.log(data)
                this.setState({
                    cTime: !!data.luc.cdate? data.luc.cdate:'--',
                    cContent: !!data.luc.ccomm?data.luc.ccomm : '',
                    cPerson: !!data.luc.cuname?data.luc.cuname :'--',
                    tTime: !!data.luc.tdate?data.luc.tdate :'--',
                    tContent: !!data.luc.tcomm?data.luc.tcomm : '',
                    tPerson: data.luc.tuname || this.props.name ||'--',
                    value:sessionStorage.getItem('userJudge')=='C'?data.luc.ccomm:data.luc.tcomm,
                })

            }
        })
    }
    // 处理姓名字符串
    transName(str1, str2) {

    }
    // 处理学期字符串
    transTerm(str) {

    }
    // 处理时间
    transTime(str) {
        // //console.log(str)
        var strs = ''
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
            strs = str.substring(0, 16)
        }
        return strs;

    }
    editIt(e){
        // //console.log(e.target.value)
        this.setState({
            value:e.target.value
        })
    }
    // 保存评价
    saveCmt() {
        var id = this.state.id;
        var value = this.state.value;
        var judge = sessionStorage.getItem('userJudge')
        if (judge == 'T') {
            $.llsajax({
                url: "/UserComment/editComment",

                type: "post",
                data: {
                    id: id,
                    tcomm: value
                },
                success: data => {
                    // //console.log(data)

                }
            })
        }
        if (judge == 'C') {
            $.llsajax({
                url: "/UserComment/editComment",

                type: "post",
                data: {
                    id: id,
                    ccomm: value
                },
                success: data => {
                    // //console.log(data)

                }
            })
        }

    }
}