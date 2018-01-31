
import React from 'react';
import $ from 'jquery';
import styles from './styleNote.js';

export default class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noteShow: false,
            userJudge: sessionStorage.getItem("userJudge"), // 从session中获取是教师还是学生
            isShow: false,
            isSuccess: false,
            isFixed: false,
            isBoxShow: false,
        }
    }
    componentDidMount() {

    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.noteHide) {
            this.setState({
                noteShow: false,
            });
        }
    }

    // ctrl+s 保存
    onTextareaValue(e) {
        // 禁用浏览器默认事件
        document.onkeydown = function (e) {
            e = e || window.event;
            if ((e.which || e.keyCode) == 83 && e.ctrlKey) {
                setTimeout(function () {
                    if (window.location.hash.indexOf("&") > 0) {
                        this.getSaveNote(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]));
                    } else {
                        this.getSaveNote(Base64.decode(window.location.hash.split("?")[1].split("=")[1]));
                    }
                }, 1);
                if (e.preventDefault) {  // firefox
                    e.preventDefault();
                } else { // other
                    e.returnValue = false;
                }
            }
        }
    }
    // 点击保存按钮保存
    onTextareaEnter() {
        if (window.location.hash.indexOf("&") > 0) {
            this.getSaveNote(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]));
        } else {
            this.getSaveNote(Base64.decode(window.location.hash.split("?")[1].split("=")[1]));
        }
    }
    getSaveNote(lesson_id) {
        $.llsajax({
            url: "lesson/saveNote",
            type: "post",
            data: {
                lesson_id: lesson_id,
                content: this.refs.y_noteBoxWriteMsgCenter.value
            },
            success: saveNoteData => {
                this.setState({
                    isShow: true,
                    isBoxShow: true,
                    noteShow: false,
                });
                setTimeout(
                    () => {
                        this.setState({
                            isShow: false,
                        });
                    },
                    2000
                );
                setTimeout(
                    () => {
                        this.setState({
                            isBoxShow: false,
                        });
                    },
                    5000
                );
            }
        })
    }
    // 提交按钮鼠标进入事件
    onTextareaStyle() {
        this.setState({
            isSuccess: true
        });
    }
    // 提交按钮鼠标移出事件
    LeaveTextareaStyle() {
        this.setState({
            isSuccess: !this.state.isSuccess
        });
    }
    clickShowNote() {
        this.setState({
            noteShow: !this.state.noteShow
        });
        if (this.props.onShowNote) {
            this.props.onShowNote();
        }
        if (this.props.onHideWork) {
            this.props.onHideWork(true)
        }

    }
    render() {
        return (
            <div className="y_noteBox" style={styles.shadowItem}>
                <div className="y_note" style={this.state.noteShow ? styles.y_noteBoxAnimate : styles.y_noteBox}>
                    <div style={styles.y_noteBoxWrap}>
                        <div style={styles.y_noteBoxWrap2}>
                            <div style={styles.y_spanBox}>
                                <span className={this.state.noteShow ? "iconfont icon-shouqi-" : "iconfont icon-zhankai-2"} style={styles.y_noteBoxTop} onClick={this.clickShowNote.bind(this)}></span>
                                <span style={this.state.noteShow ? styles.y_noteBoxTargetAnimate : styles.y_noteBoxTarget}  onClick={this.clickShowNote.bind(this)}>做笔记</span>
                            </div>
                            <div style={styles.y_noteBoxWriteMsgBox}>
                                <div style={styles.y_noteBoxWriteMsg}>
                                    <textarea ref="y_noteBoxWriteMsgCenter" onChange={this.onTextareaValue.bind(this)} style={styles.y_noteBoxWriteMsgCenter} defaultValue={this.props.note.length == 0 ? "" : this.props.note.content}></textarea>
                                    <span onClick={this.onTextareaEnter.bind(this)} onMouseEnter={this.onTextareaStyle.bind(this)} onMouseLeave={this.LeaveTextareaStyle.bind(this)} style={this.state.isSuccess ? styles.y_noteBoxWriteMsgStyle : styles.y_noteBoxWriteMsgEnter}>提交</span>
                                </div>
                            </div>
                            {
                                this.state.isBoxShow ?
                                    <div style={styles.notificationBox}>
                                        <div style={this.state.isShow ? styles.notificationCenter : styles.notificationCenterAnimate}>
                                            <i style={styles.notificationCenterIcon} className="iconfont icon-xiaoxizhongxin-"></i>
                                            <span style={this.state.isShow ? styles.notificationCenterMsg : styles.notificationCenterMsgAnimate}>笔记已经保存成功</span>
                                        </div>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
