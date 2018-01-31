/**
 * Created by heshuai on 2017/2/21.
 */

import React from 'react';
import $ from 'jquery';
import TeacherComp from '../../public/teacherPublic/teacherComp.js';
import Title1 from '../../../majorMaster/public/teacherPublic/teacherComp.js'
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import ThEditexambody from '../../../teacherComponents/teacherQuestion/thEditexanbody.js';
import Footer from '../../public/footer/footer.js';
import TeacherWork from '../../../teacherComponents/teacherWork/teacherWork.jsx';
export default class teacherQuestion extends React.Component {
    constructor() {
        super();
        this.state = {
            majors: [],
            isSuccess: true,
            isSucc: []
        }
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
    onLessonShow() { }
    onShowMajor() { }
    onCourseShow() { }
    onClickMessage1() { }
    render() {
        let styles = {
            title: {
                backgroundColor: "#6cc4ce",
                backgroundImage: "linear-gradient(60deg, #6cc4ce, #65f1ce)",
            }
        };
        return (
            <div>
                {sessionStorage.getItem('userJudge') == "MM" ?
                    <Title1
                        majors={this.state.majors}
                        onShowMajor={this.onShowMajor.bind(this)}
                        onCourseShow={this.onCourseShow.bind(this)}
                        onClickMessage1={this.onClickMessage1.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)}
                    /> :
                    <TeacherComp onLessonShow={this.onLessonShow.bind(this)} onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} majors={this.state.majors} onClickMessage1={this.onClickMessage1.bind(this)} />}

                <HeadMasterTitle
                    style={styles.title}
                    title={"考试管理"}
                    msg={"贴合知识点 自动判卷 多维度统计"}
                />
                <ThEditexambody />
                <Footer />
            </div>
        )
    }
}
