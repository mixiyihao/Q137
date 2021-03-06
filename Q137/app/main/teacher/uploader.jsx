import React from 'react';
import $ from 'jquery';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import Footer from '../../components/public/footer/footer.js';
import HeadMasterTitle from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import UploadComp from '../../headMasterComponents/performanceBody/uploadAndPreview/uploadComp.jsx'
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';
export default class Uploader extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    }
    componentWillMount() {
        
    }
    
    onShowMajor() {}
    onCourseShow() { }
	onLessonShow() { }
	onClickMessage1() {}
    render(){
        let styles = {
            title: {
                background: "#f9ae39",
            }
        }  
        return(<div>
            <TeacherComp onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onLessonShow={this.onLessonShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)}/>
            <HeadMasterTitle  style={styles.title} title={"学员成绩"} />
            <UploadComp/>
            <TeacherWork />
            <Footer />
        </div>)
    }
}