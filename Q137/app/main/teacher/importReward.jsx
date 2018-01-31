
import React from 'react';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import Footer from '../../components/public/footer/footer.js';
import HeadMasterTitle from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import ImportRewardComp from '../../headMasterComponents/importReward/importReward.jsx'
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';
export default class ImportReward extends React.Component {
    constructor() {
        super();
    }
    onShowMajor() { }
    onCourseShow() { }
    onLessonShow() { }
    onClickMessage1() { }
    render() {
        return (
            <div>
                <TeacherComp onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onLessonShow={this.onLessonShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)} />
                <HeadMasterTitle title={'学员管理'}/>
                <ImportRewardComp />
                <TeacherWork />
                <Footer />
            </div>
        );
    }
}