import React from 'react';
import $ from 'jquery';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import Footer from '../../components/public/footer/footer.js';
import HeadMasterTitle from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import InputTheAttendanceBody from '../../headMasterComponents/inputTheAttendance/InputTheAttendanceBody.jsx';
export default class InputTheAttendance extends React.Component {
    constructor(){
        super()
    }
    onShowMajor() {}
    onCourseShow() { }
	onLessonShow() { }
	onClickMessage1() {}
    render(){
        return(<div>
            <TeacherComp onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onLessonShow={this.onLessonShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)}/>
            <HeadMasterTitle />
            <InputTheAttendanceBody />
            <Footer />
        </div>)
    }
}