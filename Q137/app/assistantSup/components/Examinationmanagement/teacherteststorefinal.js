import React, { Component } from 'react';
import $ from 'jquery';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import MainBody from '../teacherAnalyze/finalexamBody.js';
import Title from '../../public/teacherPublic/teacherComp.js';

import Footer from '../../public/footer/footer.js';
import '../../../teacherComponents/teacherteststore/s_predelate.css';
import '../../../teacherComponents/teachertestlist/spro_Teacarddelate.css';
export default class teacherteststorefinal extends Component {
    constructor() {
        super();
        this.state = {
            majors: [],
            RouterFlag: []
        }
        sessionStorage.setItem("testpaperFlag", "flase");
    }
    componentWillMount() {
        if (sessionStorage.getItem("teacherComp") == "") {
            $.llsajax({
                url: "major/findMajor",
                type: "POST",
                async: false,
                success: compData => {
                    sessionStorage.setItem("teacherComp", JSON.stringify(compData));
                }
            })
        }
        // 从session中获取数据
        let compData = JSON.parse(sessionStorage.getItem("teacherComp"));
        this.setState({
            majors: compData.majors,
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

    componentDidMount() {
        $("html").css("overflow-y", "auto");
    }

    render() {
        let styles = {
            title: {
                backgroundColor: "#6cc4ce",
                backgroundImage: "linear-gradient(60deg, #6cc4ce, #65f1ce)",
            }
        };
        return (
            <div>

                <Title
                    majors={this.state.majors}
                    onShowMajor={this.onShowMajor.bind(this)}
                    onCourseShow={this.onCourseShow.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                />
                <HeadMasterTitle
                    style={styles.title}
                    title={"考试管理"}
                    msg={"贴合知识点 自动判卷 多维度统计"}
                />
                <MainBody />
                <Footer />
            </div>
        );
    }
}
