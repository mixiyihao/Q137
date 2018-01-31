
import React from 'react';
import $ from 'jquery';
import url from '../../controller/url.js';
import './stuhomework.css'
import {
    Link,
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect,
    browserHistory
} from 'react-router';


export default class HomeworkList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hkData: [],
            stage: 0,
            cgTab: 0,
            shouleHandIn: 0,
            didHandIn: 0,
            missHandIn: 0,
            showHkArr: [],//展示容器
            saveHkArr: [],//存储容器
            checkedAll: false,
            Browser: '',
            ckIds: [],
            homeworkCommet: '',
            userName: '',//学生名
            equl: 0,//平均分
            sex: 1,//性别
            noCmt:false,
        }
    }
    enterHandle(e) {
      
    }
    leaveHandle(e) {
       
    }
    spanClickHandle(e) {
        var data = this.state.hkData;
        var hkList = [];
        var num = e.target.getAttribute('data-num')
        var cmt = ''
        var equl = 0;
        var stuNum = 0;
        if (data.list != []) {
            var length = data.list[num].list.length;
            if(data.list[num].worksub-data.list[num].workwait<1){
                    this.setState({
                        noCmt:true
                    })
                }
                else{
                    this.setState({
                        noCmt:false
                    })
                }
            if (length != 0 && length != undefined) {
                for (var i = 0; i < length; i++) {
                    if (data.list[num].list[i].score) {
                        equl = equl + (data.list[num].list[i].score ? Number(data.list[num].list[i].score) : Number(0))
                        stuNum++
                    }
                    hkList.push(<tr key={"length" + i}>
                        <td>
                            <div className="stuHkCk">
                            <input type="checkbox" className="hkCk" onClick={this.cheackedHandle.bind(this)} data-id={data.list[num].list[i].id} defaultChecked={this.state.checkedItem == true ? true : false} disabled={data.list[num].list[i].textname == null ? 'true' : ''}></input>
                        </div></td>
                        <td className="hkTbCourse">
                            <div className="stuHkCs">{data.list[num].list[i].course_name || '--'}</div>
                        </td>
                        <td className="hkTblesson"><div className="stuHkLs">
                            <Link to={'classhours?id=' + Base64.encodeURI(data.list[num].list[i].lesson_id)}>{data.list[num].list[i].lesson_name || '--'}</Link>
                        </div></td>
                        <td className="hkTbD"><Link to={'classhours?id=' + Base64.encodeURI(data.list[num].list[i].lesson_id) + '&value='+Base64.encodeURI(4)} title="点击查看详情">{data.list[num].list[i].textname || '未提交'}<i className={data.list[num].list[i].textname == null ? 'iconfont icon-qushangchuan' : ''}></i></Link><a className={data.list[num].list[i].textname == null ? "dnI iconfont icon-xiazai noneItem" : "dnI iconfont icon-xiazai"} href={data.list[num].list[i].textname == null ? 'javascript:;' : url.WEBURL + "homework/downHw?homeworkid=" + data.list[num].list[i].id + "&lessonid=" + data.list[num].list[i].lesson_id + "&browser=" + this.state.Browser}></a></td>
                        <td><div className="stuHkTm">{data.list[num].list[i].c_date != null ? data.list[num].list[i].c_date.replace('.0', '') : '--'}</div></td>
                        <td><div className="stuHkSc">{data.list[num].list[i].score || '--'}</div></td>
                        <td className="hkComment" onMouseEnter={this.enterHandle} onMouseLeave={this.leaveHandle}><div className="hkCMTtext">{data.list[num].list[i].comment || '--'}</div></td>
                    </tr>)
                }
                var sc = equl / (stuNum)
                this.showBorG(sc)
            }
            this.setState({
                cgTab: num,
                hkData: data,
                stage: data.list.length,
                shouleHandIn: data.list[num].workcount || '0',
                didHandIn: data.list[num].worksub || '0',
                missHandIn: data.list[num].workwait || '0',
                showHkArr: hkList,
                saveHkArr: hkList,
                checkedAll: false,

            })
        }
    }
    searchHandle(e) {
        var list = this.state.saveHkArr;
        if (!(list instanceof Array)) {
            return;
        }
        var len = list.length;
        var arr = [];
        var str = e.target.value;
        for (var i = 0; i < len; i++) {
            //如果字符串中不包含目标字符会返回-1
            if (list[i].props.children[3].props.children[0].props.children[0].indexOf(str) >= 0) {
                if (str.length > 0) {
                    if (list[i].props.children[3].props.children[0].props.children[0].indexOf('未提交') >= 0) {
                        continue;
                    } else {
                        arr.push(list[i]);
                    }
                } else {
                    arr.push(list[i]);
                }
            }
        }
        this.setState({
            showHkArr: arr,
            checkedAll: false,
        })

    }
    componentWillMount() {
        var _This = this;
        this.onGool()
        var hkList = [];
        var hashStr = window.location.hash
        var num = Base64.decode(hashStr.split("&t=")[1])
        $.llsajax({
            url: "/homework/findALlUserWork",
            type: "post",
            success: data => {
                var _index = num - 1;      
                if(data.list[_index].worksub-data.list[_index].workwait <1){
                    this.setState({
                        noCmt:true
                    })
                }
                var cmt = ''
                var equl = 0;
                var stuNum = 0;
                if (data.list.length != 0) {
                    var length = data.list[_index].list.length;
                    if (length != 0 && length != undefined) {
                        for (var i = 0; i < length; i++) {
                            if (data.list[_index].list[i].score) {
                                equl = equl + (data.list[_index].list[i].score ? Number(data.list[_index].list[i].score) : Number(0))
                                stuNum++
                            }
                            hkList.push(<tr key={"length" + i}>
                                <td>
                                    <div className="stuHkCk">
                                        <input type="checkbox" className="hkCk" onChange={this.cheackedHandle.bind(this)} data-id={data.list[_index].list[i].id} disabled={data.list[_index].list[i].textname == null ? true : false}></input>
                                    </div>
                                </td>
                                <td className="hkTbCourse">
                                    <div className="stuHkCs">
                                        {data.list[_index].list[i].course_name || '--'}
                                    </div>
                                </td>
                                <td className="hkTblesson">
                                    <div className="stuHkLs">
                                        <Link to={'classhours?id=' + Base64.encodeURI(data.list[_index].list[i].lesson_id)}>{data.list[_index].list[i].lesson_name || '--'}</Link>
                                    </div>
                                </td>
                                <td className="hkTbD"><Link to={'classhours?id=' + Base64.encodeURI(data.list[_index].list[i].lesson_id) +'&value='+Base64.encodeURI(4)} title="点击查看详情">{data.list[_index].list[i].textname || '未提交'}<i className={data.list[_index].list[i].textname == null ? 'iconfont icon-qushangchuan' : ''}></i></Link><a className={data.list[_index].list[i].textname == null ? "dnI iconfont icon-xiazai noneItem" : "dnI iconfont icon-xiazai"} href={data.list[_index].list[i].textname == null ? 'javascript:;' : url.WEBURL + "homework/downHw?homeworkid=" + data.list[_index].list[i].id + "&lessonid=" + data.list[_index].list[i].lesson_id + "&browser=" + this.state.Browser}></a></td>
                                <td>
                                    <div className="stuHkTm">
                                        {data.list[_index].list[i].c_date != null ? data.list[_index].list[i].c_date.replace('.0', '') : '--'}
                                    </div>
                                </td>
                                <td>
                                    <div className="stuHkSc">
                                        {data.list[_index].list[i].score || '--'}
                                    </div>
                                </td>
                                <td className="hkComment" onMouseEnter={this.enterHandle} onMouseLeave={this.leaveHandle}><div className="hkCMTtext">{data.list[_index].list[i].comment || '--'}</div></td>
                            </tr>)
                        }
                    }
                   
                    var sc = equl / (stuNum)
                    this.showBorG(sc)
                    _This.setState({
                        equl: equl / (stuNum),
                        hkData: data,
                        stage: data.list.length,
                        shouleHandIn: data.list[_index].workcount || '0',
                        didHandIn: data.list[_index].worksub || '0',
                        missHandIn: data.list[_index].workwait || '0',
                        showHkArr: hkList,
                        saveHkArr: hkList,
                        cgTab: num - 1
                    })
                }

            }
        })
        $.llsajax({
            url: "Luser/meansLuser",
            type: "post",
            success: data => {
                this.setState({
                    sex: data.user.lUserMess.sex,
                    userName: data.user.name,
                })
            }
        })

    }
    cheackedHandle(e) {
        if (e.target.checked == false) {
            this.setState({
                checkedAll: false,
            })
        }
        var cks = document.getElementsByClassName('hkCk');
        // 加对禁用的判断
        var ck = [];
        for (var i = 0; i < cks.length; i++) {
            if (cks[i].disabled == false) {
                ck.push(cks[i])
            }
        }

        var ckl = ck.length;
        if (ckl > 0) {
            for (var i = 0; i < ckl; i++) {
                if (ck[i].checked == false) {
                    this.setState({
                        checkedAll: false,
                    })
                    break;
                } else {
                    this.setState({
                        checkedAll: true,
                    })
                }
            }
        }
    }
    checkedAllHandle(e) {
        if (this.state.checkedAll == false) {
            var cks = document.getElementsByClassName('hkCk');
            // 加对禁用的判断
            var ck = [];
        
            for (var i = 0; i < cks.length; i++) {
                if (cks[i].disabled == false) {
                    ck.push(cks[i])
                }
            }
            for (var i = 0; i < ck.length; i++) {
                ck[i].checked = true;
            }
            this.setState({
                checkedAll: true
            })
        }
        if (this.state.checkedAll == true) {
            var ck = document.getElementsByClassName('hkCk');
            for (var i = 0; i < ck.length; i++) {
                ck[i].checked = false;
            }
            this.setState({
                checkedAll: false
            })
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
    // 批量下载功能
    downloadAll() {
        var ck = document.getElementsByClassName('hkCk');
        var ckIds = []
        var cklen = ck.length;
        if (cklen > 0) {
            for (var i = 0; i < cklen; i++) {
                if (ck[i].checked == true) {
                    ckIds.push(ck[i].getAttribute('data-id'))
                }
            }
            this.setState({
                ckIds: ckIds
            })
        } else {
            this.setState({
                ckIds: []
            })
        }
    }

    render() {
        let colorstyle = {
            si01: {
                color: "#59e5f4",
            },
            si02: {
                color: "#f77712",
            },
            si03: {
                color: "#9fe9d8",
            },
        }
        let borg = {
            display:this.state.noCmt == true?'none':'block'
        }
        let stageArr = []
        switch (this.state.stage) {
            case 5: stageArr.push(<span key="4" data-num="4" className={this.state.cgTab == 4 ? "current" : ""} onClick={this.spanClickHandle.bind(this)}>第五学期</span>)
            case 4: stageArr.push(<span key="3" data-num="3" className={this.state.cgTab == 3 ? "current" : ""} onClick={this.spanClickHandle.bind(this)}>第四学期</span>)
            case 3: stageArr.push(<span key="2" data-num="2" className={this.state.cgTab == 2 ? "current" : ""} onClick={this.spanClickHandle.bind(this)}>第三学期</span>)
            case 2: stageArr.push(<span key="1" data-num="1" className={this.state.cgTab == 1 ? "current" : ""} onClick={this.spanClickHandle.bind(this)}>第二学期</span>)
            case 1: stageArr.push(<span key="0" data-num="0" className={this.state.cgTab == 0 ? "current" : ""} onClick={this.spanClickHandle.bind(this)}>第一学期</span>)
        }
        stageArr.reverse();
        return (
            <div className="stuHomeworkList">
                <div style={borg} className={this.state.sex == 1 ? "tallYourLeval boyPic" : "tallYourLeval girlPic"}>
                    <p className="toldYouSo">
                        <p><i className={this.state.sex == 1 ? "boyWord" : "girlWord"}>{this.state.userName}</i>同学：</p>
                        {this.state.homeworkCommet}
                    </p>
                </div>
                <div className="stuHkListTab">
                    {stageArr}
                </div>
                <div className="stuHkGroup">
                    <div className="stuHkHandIn clearfix">
                        <div className="Hkfl">
                            <span><i style={colorstyle.si01}>{this.state.shouleHandIn}</i>份</span>
                            <p>应提交</p>
                        </div>
                        <div className="Hkfl">
                            <span><i style={colorstyle.si02}>{this.state.didHandIn}</i>份</span>
                            <p>已提交</p>
                        </div>
                        <div className="Hkfl">
                            <span><i style={colorstyle.si03}>{this.state.missHandIn}</i>份</span>
                            <p>待批改</p>
                        </div>
                    </div>
                    <div className="stuHkListDetial">
                        <div className="HkSearchWrap">
                            <div className="HkSearchBox">
                                <div>
                                    <span>搜索作业：</span>
                                    <input type="text" placeholder="按作业名称搜索" onInput={this.searchHandle.bind(this)}></input>
                                </div>
                            </div>
                        </div>
                        <div>
                            <table className="HkTable">
                                <tr height="45px">
                                    <th width="50px"><input type="checkbox" id="hkAllCk" checked={this.state.checkedAll == true ? true : false} onClick={this.checkedAllHandle.bind(this)}></input></th>
                                    <th width="136px">所属课程</th>
                                    <th width="136px">所属课时</th>
                                    <th width="163px">作业</th>
                                    <th width="160px">提交时间</th>
                                    <th width="60px">成绩</th>
                                    <th width="300px">教师评语</th>
                                </tr>
                                <tbody>
                                    {this.state.showHkArr}
                                </tbody>
                            </table>
                            <div className={this.state.showHkArr.length == 0 ? "noHkTag block" : "noHkTag none"}>当前无作业数据</div>
                        </div>
                    </div>
                </div>
                <div className="HkDownLoad">
                    <a href={this.state.ckIds.length == 0 ? null : url.WEBURL + 'homework/downUserHwList?homeworkids=' + this.state.ckIds + "&browser=" + this.state.Browser} onClick={this.downloadAll.bind(this)}><i className="iconfont icon-xiazai"></i>批量下载</a>
                </div>
            </div>
        );
    }
    showBorG(num) {
        if (num == 0) {
            this.setState({
                hide: true,
                homeworkCommet: ''
            })
        } else if (0 < num && num < 3) {
            this.setState({
                hide: false,
                homeworkCommet: '你的作业略显差劲啊，还请继续努力',
            })

        } else if (3 <= num && num < 4) {
            this.setState({
                hide: false,
                homeworkCommet: '作业说的过去啦，可是离好还是有差距哦',
            })
        } else if (4 <= num && num < 4.6) {
            this.setState({
                hide: false,
                homeworkCommet: '作业成绩不错哟，请保持学习劲头',
            })
        } else if (4.6 <= num && num <= 5) {
            this.setState({
                hide: false,
                homeworkCommet: '你完成的作业质量堪称楷模啦',
            })
        } else {
            this.setState({
                hide: true,
                homeworkCommet: ''
            })
        }
    }
}
