import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import TeacherComp from '../../../teacherComponents/teacherPublic/teacherComp.js';
import HeadMasterTitle from '../../../teacherComponents/teacherStatisticsTitle/teacherStatisticsTitle.js';
import Personage from '../../../headMasterComponents/manage/personage/personage.jsx';
import Footer from '../../../components/public/footer/footer.js';
import TeacherWork from '../../../teacherComponents/teacherWork/teacherWork.jsx';

export default class StatisticForm extends React.Component {
    constructor() {
        super();
    }
    componentWillMount() {
       
    }
    // useless
    onLessonShow() { }
    onShowMajor() { }
    onCourseShow() { }
    onClickMessage1() { }
    render() {
        let styles = {
            StatisticFormBox: {
                background: "#f4f4f6",
                overflow: "hidden",
            },
            PersonageStyle: {
                width: "1100px",
                margin: "19px auto"
            }
        }
        return (
            <div>
                <TeacherComp onLessonShow={this.onLessonShow.bind(this)} onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)} />
                <HeadMasterTitle />
                <div style={styles.StatisticFormBox}>
                    <Personage style={styles.PersonageStyle}/>
                </div>
                <TeacherWork />
                <Footer />
            </div>
        )
    }
}