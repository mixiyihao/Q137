import React, { Component } from 'react';
import './interpretative.css';

export default class Interpretative extends Component {
    constructor() {
        super();
        this.state = {
            tabValue: ["课堂资料","学习手册","课堂练习","视频回顾","课后作业"],
            right: ["215px","345px","475px","605px","735px","865px"],
            msg: ["课堂资料：课堂上老师使用讲解的课件，服务于学生课前预习，课后复习，考前准备。","学习手册：课时的学习引导和学习目标","课堂练习：练习题，巩固知识点。","视频回顾：录播的课程知识点","课后作业：客观题为主的线上作业"],
        }
    }
    render() {
        let styles = {
            right: {
                left: this.state.right[this.props.index]
            }
        }
        return (
            <div className={this.props.isShow ? "interpretative_box Active1" : "interpretative_box Active2"} style={styles.right}>
                <p className="interpretative_topMsg">{this.state.msg[this.props.index]}</p>
            </div>
        );
    }
}