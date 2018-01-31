import React from 'react';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import Footer from '../../components/public/footer/footer.js';
import TeacherStatisticsTitle from '../../teacherComponents/teacherStatisticsTitle/teacherStatisticsTitle.js'
import AccStatis from '../../teacherComponents/accessStatistics/AccessStatistics.js'

export default class AccessStatisticsMain extends React.Component {
    constructor() {
        super();
    }
    onLessonShow() {}
    onShowMajor() {}
    onCourseShow() {}
    onClickMessage1() {}
    render() {
        return (
            <div>
                <TeacherComp onLessonShow={this.onLessonShow.bind(this)} onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)}/>
                <TeacherStatisticsTitle />
                <AccStatis />
                <Footer />
            </div>
        );
    }
}
