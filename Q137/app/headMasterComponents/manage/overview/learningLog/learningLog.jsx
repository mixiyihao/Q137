import React from 'react';
import $ from 'jquery';
import './styleLearningLog.css';

export default class LearningLog extends React.Component {
    constructor() {
        super();
        this.state = {
            user: [],
            page: 2,
            bodyHeight: 0
        }
    }
    componentWillMount() {
        this.setState({
            trajectorylogData: this.props.trajectorylogData,
            total: this.props.total,
            nowPage: this.props.nowPage
        });
    }
    componentDidMount() {
        let _this = this;
        window.canAutoScroll = true;
        //只要滚动事件发生，就停止自动滚动定位方法的执行
        var timeout = null;
        var panel = $(window);
        panel.scroll(function(){
            if(timeout != null){
                window.clearTimeout(timeout);
            }
            window.canAutoScroll = false;
            //500ms后，假定认为停止滚动
            timeout = window.setTimeout(function(){
                window.canAutoScroll = true;
            },100);
        });
        this.timer = setInterval(
            () => {
                var scrollNum = $(window).scrollTop();
                if (scrollNum > 800) {
                    if (window.canAutoScroll) {
                        $(".LearningLog_TopToCenter").fadeIn(1000);
                    } else {
                        $(".LearningLog_TopToCenter").css({
                            display: "none"
                        });
                    }
                } else {
                    $(".LearningLog_TopToCenter").css({
                        display: "none",
                    });
                }
            },
            100
        );
    }
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
                        <div className="LearningLog_Item">
                            <p className={value2.describe == null ? "LearningLog_ItemTitle2" : "LearningLog_ItemTitle"}>{value2.title}<span className={value2.describe == null ? "LearningLog_ItemDate2" : "LearningLog_ItemDate"}><i className="iconfont icon-shijian"></i>{value2.time == null ? "" : value2.time.substr(0, 5)}</span></p>
                            <span className={value2.describe == null ? "LearningLog_Homework2" : "LearningLog_Homework"}>{value2.describe}</span>
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
        if (this.props.nowPage < this.props.total) {
            let userid = Base64.decode(location.hash.split("&i=")[1].split("&")[0]);
            this.props.getTrajectorylogAjax(userid,this.props.page + 1,2,this.props.selectTerm);
            // this.setState({
            //     page: ++this.props.page
            // });
        }
    }
    onTopTo() {
        $('html,body').animate({ scrollTop: 0 }, '600');
    }
    render() {
        let styles = {
            margin: {
                marginLeft: "20px"
            }
        }
        return (
            <div className="LearningLog_Box">
                <div className="LearningLog_title">
                    <span className="LearningLog_name">学生：{Base64.decode(location.hash.split("&n=")[1].split("&")[0])}</span>
                    <span className="LearningLog_stuno">学号：{Base64.decode(location.hash.split("&s=")[1].split("&")[0])}</span>
                </div>
                <div className="LearningLog_title2">
                    <span className="LearningLog_school">学校：{Base64.decode(location.hash.split("&l=")[1].split("&")[0])}</span>
                    <span className="LearningLog_major">专业：{Base64.decode(location.hash.split("&m=")[1].split("&")[0])}</span>
                    <span className="LearningLog_class">班级：{Base64.decode(location.hash.split("&c=")[1].split("&")[0])}</span>
                </div>
                <div className="LearningLog_Log">
                    {this.logListShow()}
                    <div className={this.props.trajectorylogData.length == 0 ? "LearningLog_Nomessage" : "LearningLog_NomessageHide"}></div>
                    <div className={this.props.trajectorylogData.length == 0 ? "LearningLog_LineHide" : "LearningLog_Line"}></div>
                </div>
                <div className="LearningLog_TopTo">
                    <span className="LearningLog_TopToCenter" style={sessionStorage.getItem("userJudge") == "S" ? styles.margin : null} onClick={this.onTopTo.bind(this)}></span>
                </div>
                <div className={this.props.total === 0 ? "LearningLog_MoreHide" : "LearningLog_More"}>
                    <div className="LearningLog_MoreLine"></div>
                    <span className={this.props.nowPage == this.props.total || this.props.total <= 1  ? "LearningLog_MoreMsg2" : "LearningLog_MoreMsg"} onClick={this.onLoadMore.bind(this)}>{this.props.nowPage == this.props.total || this.props.total <= 1 ? "没有更多了" : "加载更多"}</span>
                </div>
            </div>
        );
    }
}