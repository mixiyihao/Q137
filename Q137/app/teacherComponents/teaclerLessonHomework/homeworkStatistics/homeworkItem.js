
import React from 'react';
import url from '../../../controller/url.js';
import styles from './styleHomeworkStatistics.js';
import HomeworkComment from '../homeworkComment/homeworkComment.js';

export default class HomeworkItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSuccess: true,
            commentValue: [],
            Browser: [],
            // idBoxFlag: true,
            flag: false,
        }
    }
    componentDidMount() {
        this.onGool();
    }
    // 处理任务是否完成状态
    handlerChange() {
        let isDone = !this.props.isDone;
        this.props.changeTodoState(this.props.index, isDone);
    }
    // 添加
    addMessage(flag) {
        this.acknowledgedFalse();
        this.setState({
            commentValue : this.props.comment,
            flag: flag
        });
    }
    // 点击让弹窗显示
    acknowledgedFalse() {
        this.setState({
            isSuccess: false
        })
    }
    //点击确定让弹窗消失
    acknowledgedTrue(value) {
        this.setState({
            isSuccess: true
        });
        this.refs.y_homeworkStatisticsMsgDiv7P.innerHTML = value.comment.length>25?value.comment.substring(0,26)+'...':value.comment;
        // this.refs.y_homeworkStatisticsMsgDiv6.innerHTML = value.stydentIntegral;
        this.refs.y_homeworkStatisticsMsgDiv5.innerHTML = value.stydentScore;
        //获取id
        let studentID = this.refs.y_homeworkStatisticsMsg.getAttribute("name");
        this.props.addMessgae(value, studentID);
    }
    // 点击取消让弹框消失
    acknowledgedTrue2() {
        this.setState({
            isSuccess: true
        })
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
    render() {
        let props = this.props;
        return (
            <tr style={styles.y_homeworkStatisticsMsg} name={props.id} ref="y_homeworkStatisticsMsg">
                <td style={styles.y_homeworkStatisticsMsgDiv0}>
                    <input id={"y_homeworkStatisticsMsg_input" + props.index} checked={props.isDone} name={props.id} onChange={this.handlerChange.bind(this)} type="checkbox" style={styles.y_homeworkStatisticsMsgInpiut} />
                    <label style={styles.y_homeworkStatisticsMsg_label} htmlFor={"y_homeworkStatisticsMsg_input" + props.index}></label>
                </td>
                <td style={styles.y_homeworkStatisticsMsgDiv1}>{props.user_idcard}</td>
                <td style={styles.y_homeworkStatisticsMsgDiv2}>{props.user_name}</td>
                <td style={styles.y_homeworkStatisticsMsgDiv3}>
                    <span title={props.textname} style={styles.y_homeworkStatisticsMsgDiv3Span}>{props.textname}</span>
                    <a href={url.WEBURL + "homework/downHw?lessonid=" + props.lessonID + "&homeworkid=" + props.id + "&browser=" + this.state.Browser} className="iconfont icon-xiazai" style={props.state == null ? styles.y_homeworkStatisticsMsgDiv3IHide : styles.y_homeworkStatisticsMsgDiv3I}></a>
                </td>
                <td style={styles.y_homeworkStatisticsMsgDiv4}>{props.c_date ? props.c_date.substr(0, 19) : props.c_date}</td>
                <td style={styles.y_homeworkStatisticsMsgDiv5} ref="y_homeworkStatisticsMsgDiv5">{props.score == null ? "" : props.score}</td>
                <td style={styles.y_homeworkStatisticsMsgDiv7} ref="y_homeworkStatisticsMsgDiv7">
                    <div style={styles.y_homeworkStatisticsMsgDiv7P} ref="y_homeworkStatisticsMsgDiv7P">{props.comment}</div>
                </td>
                <td style={styles.y_homeworkStatisticsMsgDiv8}>
                    <span title="修改" className="iconfont icon-bianji" style={props.state == 0 || props.state == null ? styles.y_homeworkStatisticsMsgDiv8Span1Hide : styles.y_homeworkStatisticsMsgDiv8Span1} onClick={this.addMessage.bind(this,true)}></span>
                    <span title="添加" className="iconfont icon-tianjia" style={props.comment == null && props.state == 0 ? styles.y_homeworkStatisticsMsgDiv8Span2 : styles.y_homeworkStatisticsMsgDiv8Span2Hide} onClick={this.addMessage.bind(this,false)} ref="y_homeworkStatisticsMsgDiv8Span2"></span>
                </td>
                <HomeworkComment acknowledgedTrue2={this.acknowledgedTrue2.bind(this)} acknowledgedTrue={this.acknowledgedTrue.bind(this)} isSuccess={this.state.isSuccess} commentValue={this.state.commentValue} score={props.score} integral={props.integral} flag={this.state.flag} />
            </tr>
        );
    }
}
