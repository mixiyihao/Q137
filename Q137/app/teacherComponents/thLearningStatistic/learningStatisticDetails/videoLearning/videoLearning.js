import React from 'react';
import './styleVideoLearning.css';

export default class VideoLearning extends React.Component {
    constructor() {
        super();
        this.state = {
            trKey: -1,
            data: [
                {},{},{},{},{},{},{},{}
            ],
            user: [],
            count: 1,
            page: 1
        }
    }
    componentWillMount() {
        let user = Base64.decode(window.location.hash.split("&")[1].split("=")[1]);
        this.setState({
            user: user
        });
    }
    componentDidMount() {
    }
    onTrShow(key) {
        this.setState({
            trKey: key
        });
    }
    onTrHide(key) {
        this.setState({
            trKey: key
        });
    }
    onShowVideoMsgList() {
        return this.state.data.map((value,index) => {
            return (
                <tr key={index} height="54px" className={this.state.trKey == index ? "videoLearning_tableTR" : ""} onMouseEnter={this.onTrShow.bind(this,index)} onMouseLeave={this.onTrHide.bind(this,-1)}>
                    <td width="125px">0.0分钟</td>
                    <td width="188px">45分钟</td>
                    <td width="205px">计算机应用基础</td>
                    <td width="207px">spring2</td>
                    <td width="200px">Web前端全栈开发应用</td>
                    <td width="135px" className="videoLearning_tableTool"><span><i className="iconfont icon-shipinchakanxiangqing1"></i>查看视频</span></td>
                </tr>
            );
        });
    }
    //这是点击上一页执行的函数
    showPre() {
        if (this.state.page > 1) {
            this.setState({
                page: --this.state.page,
            })
            // this.getComent(this.state.page);
        }
    }
    //这是点击下一页执行的函数
    showNext() {
        if (this.state.count == this.state.page) {
            return;
        } else {
            this.setState({
                page: ++this.state.page,
            })
            // this.getComent(this.state.page);
        }
    }
    render() {
        return (
            <div className="videoLearning_Box">
                <div className="videoLearning_title">
                    <span><i>{this.state.user}</i>的学习统计</span>
                    <div className="videoLearning_More"><i className="iconfont icon-daochuchengji"></i>导出全部</div>
                </div>
                <div className="videoLearning_ListMsg">
                    <span className="videoLearning_ListSpan">共<i>20</i>条信息</span>
                    
                </div>
                <div className="videoLearning_tableBox">
                    <table className="videoLearning_table">
                        <tr height="46px">
                            <th width="125px">视频观看时长</th>
                            <th width="188px">视频总时长</th>
                            <th width="205px">课程名称</th>
                            <th width="207px">课时</th>
                            <th width="200px">所属专业</th>
                            <th width="135px">操作</th>
                        </tr>
                        <tbody>
                            {this.onShowVideoMsgList()}
                        </tbody>
                    </table>
                    <div className={this.state.data.length == 0 ? "videoLearning_error" : "videoLearning_errorHide"}>没有结果</div>
                </div>
                <div className={this.state.count <= 1 ? "videoLearning_pageHide" : "videoLearning_pageShow"}>
                    <div className="videoLearning_page">
                        <div className="videoLearning_pageNum">共<i>{this.state.count}</i>页&nbsp;&nbsp;&nbsp;&nbsp;第<span>{this.state.page}</span>页</div>
                        <button className="videoLearning_page1" onClick={this.showPre.bind(this)}>上一页<span className="iconfont icon-shangyiye"></span></button>
                        <button className="videoLearning_page2" onClick={this.showNext.bind(this)}>下一页<span className="iconfont icon-xiayiye"></span></button>
                    </div>
                </div>
            </div>
        );
    }
}