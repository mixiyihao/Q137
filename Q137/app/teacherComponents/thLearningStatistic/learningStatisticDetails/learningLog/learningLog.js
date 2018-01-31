import React from 'react';
import $ from 'jquery';
import './styleLearningLog.css';

export default class LearningLog extends React.Component {
    constructor() {
        super();
        this.state = {
            user: [],
            page: 2,
            trajectorylogData: [],
            total: [],
            nowPage: [],
            bodyHeight: 0
        }
    }
    componentWillMount() {
        let user = null;
        if (window.location.hash.indexOf("&n") > 0) {
            user = Base64.decode(window.location.hash.split("&")[1].split("=")[1]);
        }
        this.setState({
            user: user,
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
                        $(".learningLog_TopToCenter").fadeIn(2000);
                    } else {
                        $(".learningLog_TopToCenter").css({
                            display: "none"
                        });
                    }
                } else {
                    $(".learningLog_TopToCenter").css({
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
                    logDataArr.push(<div className="learningLog_Content" key={index2} >
                        <div className="learningLog_Item">
                            <p className={value2.describe == null ? "learningLog_ItemTitle2" : "learningLog_ItemTitle"}>{value2.title}<span className={value2.describe == null ? "learningLog_ItemDate2" : "learningLog_ItemDate"}><i className="iconfont icon-shijian"></i>{value2.time == null ? "" : value2.time.substr(0, 5)}</span></p>
                            <span className={value2.describe == null ? "learningLog_Homework2" : "learningLog_Homework"}>{value2.describe}</span>
                        </div>
                    </div>
                    );
                }
            });
            return (
                <ul key={index1}>
                    <li>
                        <p className="learningLog_P">
                            <span className="learningLog_Time">{date[1] + "月" + date[2] + "日"}</span>
                            <span className="learningLog_Circle"></span>
                        </p>
                        {logDataArr}
                    </li>
                </ul>
            );
        });
    }
    getTrajectorylogAjax(userid,page,flag) {
        $.llsajax({
            url:'trajectorylog/query',
            data: {
                userid: userid,
                page: page
            },
            type: "POST",
            async: false,
            success: trajectorylogData=>{
                let arr = this.state.trajectorylogData;
                trajectorylogData.grid.rows.map((value,index) => {
                    arr.push(value);
                });
                this.setState({
                    trajectorylogData: arr,
                    total: trajectorylogData.grid.total,
                    nowPage: trajectorylogData.grid.page
                });
            }
        });
    }
    onLoadMore() {
        if (this.state.nowPage < this.state.total) {
            let userid = Base64.decode(window.location.hash.split("?")[1].split("=")[1].split('&')[0]);
            this.getTrajectorylogAjax(userid,this.state.page,true);
            this.setState({
                page: ++this.state.page
            });
        }
    }
    onTopTo() {
        $('html,body').animate({ scrollTop: 0 }, '600');
    }
    render() {
        return (
            <div className="learningLog_Box">
                <div className="learningLog_title">
                    <span><i>{this.state.user}</i>的学习统计</span>
                </div>
                <div className="learningLog_Log">
                    {this.logListShow()}
                    <div className={this.state.trajectorylogData.length == 0 ? "learningLog_Nomessage" : "learningLog_NomessageHide"}></div>
                    <div className={this.state.trajectorylogData.length == 0 ? "learningLog_LineHide" : "learningLog_Line"}></div>
                </div>
                <div className="learningLog_TopTo">
                    <span className="learningLog_TopToCenter" onClick={this.onTopTo.bind(this)}></span>
                </div>
                <div className={"learningLog_More"}>
                    <div className="learningLog_MoreLine"></div>
                    <span className={this.state.nowPage == this.state.total ? "learningLog_MoreMsg2" : "learningLog_MoreMsg"} onClick={this.onLoadMore.bind(this)}>{this.state.nowPage == this.state.total || this.state.total <= 1 ? "没有更多了" : "加载更多"}</span>
                </div>
            </div>
        );
    }
}