import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import TeacherComp from '../../public/header/teacherComp.js';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Footer from '../../../assistantSup/public/footer/footer.js';
import ContributeTab from '../myContribution/tabItem/tabItem.jsx'
import './teacherLog.css'
import $ from 'jquery';
import LogDetail from '../../../assistantSup/components/teacherLog/LogDetail.jsx'
// import TeacherWork from '../../../teacherComponents/teacherWork/teacherWork.jsx';

export default class teacherLog extends Component {
    constructor() {
        super();
        this.state = {
            teacherData: [],
            id: null,
            tName: '--',
            tNo: '--',
            tClass: [],
            total: 0,//总页数
            page: 0,//当前页数
            trajectorylogData: [],
            showFlag: true,
            obj: {},
        }
    }

    componentWillMount() {
        sessionStorage.setItem('displayFlag', 6)
        var hash = window.location.hash;
        var id = Base64.decode(hash.split('id=')[1].split('&')[0])
        var index = Base64.decode(hash.split('index=')[1])
        // console.log(id)
        // console.log(index)
        this.setState({
            id: id,
            index: index,
        })
        $.llsajax({
            url: 'teachManage/listAllTeacher',
            type: "POST",
            success: data => {
                var arr = data.list != null && typeof (data.list) != undefined ? data.list : [];
                this.setState({
                    teacherData: arr,
                })
                var len = arr.length;
                if (len > 0) {
                    this.setState({
                        id: id
                    })
                    this.getDataList(id)
                }

            },
        })
        this.getLogList(id, 1)
    }
    getDataList(id) {
        $.llsajax({
            url: 'teachManage/listTInfo',
            type: "POST",
            data: {
                uid: id
            },
            success: data => {
                // console.log(data)
                this.setState({
                    tName: data.map.user.name || '--',
                    tNo: data.map.user.studentNo || '--',
                    tClass: data.map.list || [],
                })
            },
        })
    }
    transClass(arr) {
        // console.log(arr)
        var arrList = [];
        var len = arr.length;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                arrList.push(<span key={i}>{arr[i].name}</span>)
            }
        } else {
            arrList.push(<span key={'0sp'}>{'--'}</span>)
        }
        return arrList
    }
    // componentWillReceiveProps(props){
    //     console.log(props)
    // }
    propsChangeId(id, index) {
        this.getDataList(id)
        this.getLogList(id, 1, true)
        this.setState({
            id: id,
            index: index
        })
    }
    onShowMajor() {
    }

    onCourseShow() {
    }

    onLessonShow() {
    }

    onClickMessage1() {
    }

    render() {
        let styles = {
            title: {
                backgroundColor: "#fd724d",
                backgroundImage: "none",
            },
            width: {
                width: "1100px",
                margin: "20px auto"
            },
            imgWidth: {
                width: "100%",
                height: "100%"
            },
            bg: {
                backgroundColor: "#f4f4f5",
                minHeight: "650px",
                overflow: "hidden"
            },
            notshow: {
                display: this.state.trajectorylogData.length > 0 ? 'none' : 'block'
            },
            maskShow: {
                display: this.state.showFlag == true ? 'block' : 'none',
            },
            // maskHide:{
            //     display: this.state.showFlag == false?'block':'none',
            // }
        };
        return (
            <div className="teacherLog_body">
                <TeacherComp onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                    onClickMessage1={this.onClickMessage1.bind(this)} />
                <HeadMasterTitle style={styles.title} title={sessionStorage.getItem('userJudge') == 'TM' ? "助教管理" : "班主任管理"} msg={"多维度统计 全面分析 综合了解自己行业竞争力"} />
                <ContributeTab data={this.state.teacherData} propsChangeId={this.propsChangeId.bind(this)} id={this.state.id} index={this.state.index} />
                <div className="teacherLogContainer">
                    <div className="teacherLogInner" style={styles.maskShow}>
                        <h2>工作行为日志</h2>
                        <a href="javascript:;" onClick={this.goBack.bind(this)}>返回 <i className="iconfont icon-back"></i></a>
                        <div className="teacherLogWrap">
                            <p>
                                <i>{sessionStorage.getItem('userJudge') == 'TM' ? '助教姓名' : '班主任姓名'}:</i>
                                <span>{this.state.tName}</span>
                                <i>工号:</i>
                                <span>{this.state.tNo}</span>
                            </p>
                            <p>
                                <i>管理权限:</i>
                                {this.transClass(this.state.tClass)}
                            </p>
                        </div>
                        <div className="teacherLogList">
                            {this.logListShow()}
                            <div className={this.state.trajectorylogData.length == 0 ? "LearningLog_Nomessage" : "LearningLog_NomessageHide"}></div>
                            <div className={this.state.trajectorylogData.length == 0 ? "LearningLog_LineHide" : "LearningLog_Line"}></div>
                        </div>
                        <div className="tLogEmpty" style={styles.notshow}>
                        </div>
                        <div className={this.state.total === 0 ? "LearningLog_MoreHide" : "LearningLog_More"}>
                            <div className="LearningLog_MoreLine"></div>
                            <span className={this.state.page == this.state.total || this.state.total <= 1 ? "LearningLog_MoreMsg2" : "LearningLog_MoreMsg"} onClick={this.onLoadMore.bind(this)}>{this.state.page == this.state.total || this.state.total <= 1 ? "没有更多了" : "加载更多"}</span>
                        </div>
                    </div>
                    <LogDetail hide={this.state.showFlag} backFlag={this.backFlag.bind(this)} obj={this.state.obj} tN={this.state.tNo} tName={this.state.tName} />
                </div>

                <Footer />
            </div>
        );
    }
    goBack() {
        // hashHistory.go(-1)
        // console.log(sessionStorage.getItem('userJudge'))
        // if(1==1){
        //     return false;
        // }
        if (sessionStorage.getItem('userJudge') == 'EM' || sessionStorage.getItem('userJudge') == 'PM') {
            hashHistory.go(-1)
        } else {
            hashHistory.push({
                pathname: '/myContribution',
                query: {
                    id: Base64.encodeURI(this.state.id),
                    index: Base64.encodeURI(this.state.index),
                }
            })
        }
    }
    getLogList(id, page, flag) {
        $.llsajax({
            url: 'trajectorylog/query',
            data: {
                userid: id,
                term: 0,
                page: page
            },
            type: "POST",
            // async: false,
            success: data => {
                // console.log(data)
                let arr = [];
                if (typeof (flag) != undefined && flag == true) {
                    arr = []
                } else {

                    arr = this.state.trajectorylogData;
                }
                // if (flag == 2) {
                //     arr = this.state.trajectorylogData;
                // } else {
                //     arr = [];
                // }
                data.grid.rows.map((value, index) => {
                    arr.push(value);
                });
                this.setState({
                    trajectorylogData: arr,
                    total: data.grid.total,
                    // nowPage: trajectorylogData.grid.page,
                    page: data.grid.page
                });
            }
        });
    }
    // log
    logListShow() {
        let dayArr = [];
        let arrTable = {};
        let arrData = [];
        this.state.trajectorylogData.map((dayValue, dayIndex) => {
            dayArr.push(dayValue.day);
        })
        for (var i = 0; i < dayArr.length; i++) {
            if (!arrTable[dayArr[i]]) {
                arrTable[dayArr[i]] = true;
                arrData.push(dayArr[i])
            }
        }
        return arrData.map((value1, index1) => {
            let date = value1.split('-');
            let logDataArr = []
            this.state.trajectorylogData.map((value2, index2) => {
                if (value1 == value2.day) {
                    logDataArr.push(<div className="LearningLog_Content" key={index2} >
                        <div className={this.judgeType(value2.type)}>
                            <p className={value2.describe == null && value2.type != 1 || value2.type == 1 ? "LearningLog_ItemTitle2" : "LearningLog_ItemTitle"}>{value2.title}<span className={value2.describe == null ? "LearningLog_ItemDate2" : "LearningLog_ItemDate"}><i className="iconfont icon-shijian"></i>{value2.time == null ? "" : value2.time.substr(0, 5)}</span></p>
                            <span className={value2.describe == null ? "LearningLog_Homework2" : "LearningLog_Homework"} onClick={this.jumpType.bind(this, value2.type, value2)}>{value2.type == 3 ? value2.describe : '立即查看'}</span>
                        </div>
                    </div>
                    );
                }
            });
            return (
                <ul key={index1}>
                    <li>
                        <p className="LearningLog_P">
                            <span className="LearningLog_Time">{date[1] + "月" + date[2] + "日"}</span>
                            <span className="LearningLog_Circle"></span>
                        </p>
                        {logDataArr}
                    </li>
                </ul>
            );
        });
    }
    onLoadMore() {
        if (this.state.page < this.state.total) {
            var p = Number(this.state.page) + 1
            var id = this.state.id
            // let userid = Base64.decode(location.hash.split("&i=")[1].split("&")[0]);
            this.getLogList(id, p);
            // this.setState({
            //     page: ++this.props.page
            // });
        } else {

        }
    }
    judgeType(type) {
        var type = type + '';
        var clsnm = '';
        switch (type) {
            case '131':
                clsnm = 'LearningLog_Item shouldLink'
                break;
            case '132':
                clsnm = 'LearningLog_Item shouldLink'
                break;
            case '14':
                clsnm = 'LearningLog_Item shouldLink'
                break;
            case '15':
                clsnm = 'LearningLog_Item shouldLink'
                break;
            case '16':
                clsnm = 'LearningLog_Item shouldLink'
                break;
            case '17':
                clsnm = 'LearningLog_Item shouldLink'
                break;
            case '18':
                clsnm = 'LearningLog_Item shouldLink'
                break;
            case '19':
                clsnm = 'LearningLog_Item shouldLink'
                break;
            default:
                clsnm = 'LearningLog_Item';
            // clsnm = 'LearningLog_Item shouldLink'
        }
        return clsnm
    }
    jumpType(type, obj) {
        var type = type + '';
        switch (type) {
            case '131':

                break;
            case '132':

                break;
            case '14':
                this.tansOptionHandle(obj)
                break;
            case '15':
                this.setState({
                    showFlag: false,
                    obj: obj,
                })
                break;
            case '16':
                // console.log(type)
                this.findTestRes(obj)
                break;
            case '17':
                // 评语
                this.setState({
                    showFlag: false,
                    obj: obj,
                })
                break;
            case '18':
                // 奖罚
                this.setState({
                    showFlag: false,
                    obj: obj,
                })
                break;
            case '19':
                // 访谈
                this.setState({
                    showFlag: false,
                    obj: obj,
                })
                break;
            default:
                return false;
        }
    }
    cutString(type, obj) {
        var type = type + '';
        var clsnm = '';
        switch (type) {
            case '131':

                break;
            case '132':

                break;
            case '14':

                break;
            case '15':

                break;
            case '16':

                break;
            case '17':

                break;
            case '18':

                break;
            case '19':

                break;
            default:
                clsnm = obj.describe
        }
        return clsnm
    }
    backFlag() {
        this.setState({
            showFlag: true,
        })
    }
    tansOptionHandle(obj) {
        // console.log(obj)
        if (obj.describe.indexOf('-') > 0) {
            var type = obj.describe.split('-')[1]
            var f = type == 1 ? 'f' : 'q'
            hashHistory.push({
                pathname: '/previewtestpaper',
                query: {
                    id: Base64.encodeURI(obj.describe.split('-')[0]),
                    zf: f,
                }
            })
        }
    }
    findTestRes(obj) {
        if (obj.type == 132) {
            hashHistory.push({
                pathname: '/finalEXanalyze',
                query: {
                    id: Base64.encodeURI(obj.describe),
                    F: 'q',
                }
            })
        } else {
            hashHistory.push({
                pathname: '/finalEXanalyze',
                query: {
                    id: Base64.encodeURI(obj.describe),
                    F: 'f',
                }
            })
        }
    }
}