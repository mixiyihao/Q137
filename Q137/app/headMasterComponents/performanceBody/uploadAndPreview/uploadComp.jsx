import React from 'react';
import ReactDOM from 'react-dom'
import $ from 'jquery';
import './uploadComp.css'
import url from '../../../controller/url.js';
import { Link } from 'react-router';

export default class UploadComp extends React.Component {
    constructor() {
        super()
        this.state = {
            Browser: '0',
            fileName: '',
            showName: false,
            classid: '',
            type: '',
            st: 'suc',
            a: '',
            s: '',
            ci: '',
            im: '',
            t: '',
        }
    }
    onGool() {
        let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
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
    componentWillMount() {
        this.setState({
            a: window.location.hash.split("a=")[1].split("&")[0],
            s: window.location.hash.split("s=")[1].split("&")[0],
            classid: window.location.hash.split("ci=")[1].split("&")[0],
            type: window.location.hash.split("im=")[1].split("&")[0],
            ci: window.location.hash.split("ci=")[1].split("&")[0],
            im: window.location.hash.split("im=")[1].split("&")[0],
            t: window.location.hash.split("t=")[1],
        })
        this.onGool()
    }
    changeFileHandle(e) {
        var vals = e.target.value.split("\\").pop()
        if (vals.length <= 0) {
            this.setState({
                showName: false,
                // fileName: '',
            })
        } else {

            this.setState({
                fileName: vals,
                showName: true,
            })
            // 加判断正则
            var regExp = /\.xl.{1,2}$/;
            if (regExp.test(vals) == true) {
                // //console.log('ex')
                // //console.log(true)
                let formData = new FormData($('#uploadFile')[0]);
                // $.ajax({
                //     url: "http://10.103.112.14:28080/lls-web/excel/importExcel",
                //     data: formData,
                //     type: 'POST',
                //     cache: false,
                //     processData: false,
                //     contentType: false,
                //     success: date => {
                //         //console.log(date)
                //         sessionStorage.setItem('schoolGrates', JSON.stringify(date.date.list))
                //     }


                // });
                // //console.log(this.state.type)
                if (this.state.type == 's') {

                    $.llsajaxupload({
                        url: "excel/importExcel",
                        data: formData,
                        type: 'POST',
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: date => {
                            // //console.log('s')
                            // //console.log(date.result)
                            if (date.result != 200) {
                                this.setState({
                                    st: 'err'
                                })
                            } else {
                                if (date.msg) {
                                    //console.log(date.msg)
                                    this.setState({
                                        st: 'err'
                                    })
                                } else {
                                    //console.log('good')
                                    sessionStorage.setItem('schoolGrates', JSON.stringify(date.date.list))
                                    this.setState({
                                        st: 'suc'
                                    })
                                }
                            }
                        },
                        error: err => {
                            this.setState({
                                st: 'err'
                            })
                        }
                    });
                }
                if (this.state.type == 'e') {
                    $.llsajaxupload({
                        url: "classmaster/importExcel",
                        data: formData,
                        type: 'POST',
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: date => {
                            // //console.log('e')
                            if (date.result != 200) {
                                this.setState({
                                    st: 'err'
                                })
                            } else {
                                if (date.msg) {
                                    //console.log(date.msg)
                                    this.setState({
                                        st: 'err'
                                    })
                                } else {
                                    //console.log('good')
                                    sessionStorage.setItem('schoolEvalute', JSON.stringify(date.date.list))
                                    // //console.log(date)
                                    this.setState({
                                        st: 'suc'
                                    })
                                }
                            }
                        },
                        error: err => {
                            this.setState({
                                st: 'err'
                            })
                        }
                    });
                }
            } else {
                this.setState({
                    st: 'err'
                })
            }
        }
    }
    deleHandle() {
        this.setState({
            showName: false,
            fileName: '',
        })
        // document.getElementById('addFile').value = '';
    }
    render() {
        let fileDisplay = {
            display: this.state.showName == false ? "none" : "block"
        }
        let errTag = {
            display: this.state.st == 'suc' ? "none" : "block",
            color: '#ff997a',
            background: "#fff",
            marginLeft: '4px',
            fontSize: '12px'
        }
        return (<div className="uploadComp">
            <div className="uploadInner">
                <h2>{this.state.type == 's' ? '批量导入学校成绩' : '批量导入学校评价'}</h2>
                {/*<a  className="uploadBack" onClick={this.backHandle.bind(this)}>返回<i className="iconfont"></i></a>*/}
                <Link to={{ pathname: "/performance", query: { a: this.state.a, s: this.state.s, t: this.state.t } }} className="uploadBack" >返回<i className="iconfont icon-back"></i></Link>
                <div className="downloadBox">
                    <p>下载模板</p>
                    <div className="downloadTag">
                        说明：通过此功能将学员数据批量导入本系统，请根据需要下载模板。上传文件必须与本模板一致，如下：
                    </div>
                    <div className="downloadButton">
                        {this.state.type == 's' ? '学校成绩' : '学校评价'}
                        <a href={this.state.type == 's' ? url.WEBURL + 'schoolexam/downExcel?browser=' + this.state.Browser : url.WEBURL + '/classmaster/evaluateModel?browser=' + this.state.Browser}><i className="iconfont icon-xiazaimoban"></i>下载模板</a>
                    </div>
                </div>
                <div className="uploadBox">
                    <p>
                        {this.state.type == 's' ? '导入成绩' : '导入评价'}
                    </p>
                    <div className="uploadBtn">
                        <i className="iconfont icon-shangchuan"></i>选择文件上传
                    </div>
                    <span className="warnMsg">*支持文件格式:*.xsl、*.xlsx; 表头样式与模板保持一致</span>
                    <form id="uploadFile">
                        <input type="file" id="addFile" className="uploadInput" name="execl" onChange={this.changeFileHandle.bind(this)} />
                        <input type="text" name="classid" value={this.state.classid} />
                    </form>
                    <div className="uploadFileList">
                        <p style={fileDisplay}>
                            <span className={this.state.st != 'suc' ? "err" : ""}>{this.state.fileName}<i className="iconfont icon-guanbi" onClick={this.deleHandle.bind(this)}></i></span>
                            <Link to={this.state.st == 'suc' ? { pathname: "/preview", query: { type: this.state.type == 's' ? 'grates' : 'evaluate', name: Base64.encodeURI(this.state.fileName), st: this.state.st, a: this.state.a, s: this.state.s, ci: this.state.ci, im: this.state.im, t: this.state.t } } : ''} className={this.state.st != 'suc' ? "err" : ""}>开始导入</Link>
                            <span style={errTag}><i className="xxxxxxx">x</i> 文件上传失败！请检查模板数据的准确性</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>)
    }
}