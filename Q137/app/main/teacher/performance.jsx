import React from 'react';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import Footer from '../../components/public/footer/footer.js';
import HeadMasterTitle from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import PerformanceBody from '../../headMasterComponents/performanceBody/performanceBody.jsx';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';

export default class Performance extends React.Component {
    constructor(){
        super();
    }
    componentWillMount() {}
    onShowMajor() {}
    onCourseShow() { }
	onLessonShow() { }
	onClickMessage1() {}
    render(){
        let styles = {
            title: {
                background: "#f9ae39",
            }
        };
        return(<div>
            <TeacherComp onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onLessonShow={this.onLessonShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)}/>
            <HeadMasterTitle style={styles.title} title={"学员成绩"} msg={"全面的统计学员成绩   注重全面素质的提高"}/>
            <PerformanceBody/>
            <TeacherWork />
            <Footer />
        </div>)
    }
}