
import React from 'react';
import url from '../../../controller/url.js';
import styles from './styleHomeworkList.js';

export default class HomeworkList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true,
        }
    }
    SetCwinHeight() {
        let iframeid = document.getElementById("homeworkIframe"); //iframe id
        iframeid.height = $("#homeworkIframe").contents().find("body").height() + 100;
        //console.log($("#homeworkIframe").contents()[0].body.clientHeight);
        this.setState({
            isShow: false,
        });
	}
    // 显示作业问题列表
    //
    _showQuestionList() {
        return this.props.homeworkList.map((value, key) => {
            return (
                <div key={key} style={styles.y_homeworkListTitle}>
                    <iframe style={styles.iframeBox} onLoad={this.SetCwinHeight.bind(this)} height="1" id="homeworkIframe" scrolling="no" frameBorder="0" width="97%" src={value.picurl == null ? "" : url.WEBURL + value.picurl}></iframe>
                </div>
            );
        })
    }
    showImgLoad(id) {
        $(".homeworkListPic").eq(id).prop('src', require('../../../images/public/errorImg.png'));
    }
    onShowList() {
        this.setState({
            isShow: !this.state.isShow
        });

    }
    render() {
        return (
            <div style={styles.y_homeworkListBox}>
                <div style={styles.y_homeworkListCaption}>题目</div>
                <div onClick={this.onShowList.bind(this)} style={styles.y_homeworkListCaptionFlag}>{this.state.isShow ? "收起题目" : "展开题目"}<i style={styles.y_homeworkListCaptionFlagI} className={this.state.isShow ? "iconfont icon-zhankai-2" : "iconfont icon-shouqi-"}></i></div>
                <div style={this.state.isShow ? styles.y_homeworkList : styles.y_homeworkListHide}>
                    {this._showQuestionList()}
                </div>
            </div>
        );
    }
}
