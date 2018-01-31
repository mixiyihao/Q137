/**
 * Created by heshuai on 2017/1/11.
 */

import React from 'react';
import './styleTitleBar.css';
import $ from 'jquery';

export default class TitleBar extends React.Component {
    constructor() {
        super();
        this.state = {
            userJudge: sessionStorage.getItem("userJudge")
        }
    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    render() {
        let styles = {
            teacherTitle: {
                padding: "20px 40px 0 36px",
                width: "1100px",
                margin: "0 auto"
            },
            studentTitle: {
                width: "1280px",
                margin: "0 auto",
                height: "144px",
                padding: "20px 0px 0 320px",
                backgroundPosition: "830px -20px"
            },
        }
        return (
            <div className="y-navTitleBox">
                <div className="y-nav" style={this.state.userJudge != "S" ? styles.teacherTitle : styles.studentTitle}>
                    <div>
                        <div className='h-name'>{this.props.name}<span>{this.props.enname}</span></div>
                        <ul className='h-ul'>
                            <li>共<span>{this.props.termcount}</span>个学期</li>
                            <li><span>{this.props.coursenum}</span>门课程</li>
                            <li><span>{this.props.lessonnum}</span>节课时</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
