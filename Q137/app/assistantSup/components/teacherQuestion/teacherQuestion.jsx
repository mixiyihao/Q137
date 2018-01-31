/**
 * Created by heshuai on 2017/2/21.
 */

import React from 'react';
import $ from 'jquery';
import TeacherComp from '../../public/teacherPublic/teacherComp.js';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import ThQuesfooter from '../../public/footer/footer.js';
import ThQuestionBody from '../../../teacherComponents/teacherQuestion/thQuestionBody.js';
import BombBox from '../../public/bombBox/bombBox.js';
// import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';
export default class teacherQuestion extends React.Component {
    constructor() {
        super();
        this.state = {
            isSuccess: true,
            isSucc: []
        }
    }
    componentWillMount() {

    }
    // 点击让弹窗显示
    acknowledgedFalse(ids, owners) {
        this.setState({
            isSuccess: false
        })

    }
    //点击让弹窗消失
    acknowledgedTrue() {
        this.setState({
            isSuccess: true
        })
    }
    acknowledgedTrueEnter() {
        this.setState({
            isSuccess: true
        })
    }
    onShowMajor() { }
    onCourseShow() { }
    onLessonShow() { }
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
                <BombBox
                    isHidden={this.state.isSuccess}
                    hideClick={this.acknowledgedTrue.bind(this)}
                    hideClickEnter={this.acknowledgedTrueEnter.bind(this)}
                />
               
                    <TeacherComp onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onLessonShow={this.onLessonShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)} />

                <HeadMasterTitle
                    style={styles.title}
                    title={"考试管理"}
                    msg={"贴合知识点 自动判卷 多维度统计"}
                />
                <ThQuestionBody onFailClick={this.acknowledgedFalse.bind(this)}
                />
                {/* <TeacherWork />*/}
                <ThQuesfooter />
            </div>
        )
    }
}
