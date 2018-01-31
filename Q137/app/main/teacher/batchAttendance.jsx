
import React from 'react';
import $ from 'jquery';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import Footer from '../../components/public/footer/footer.js';
import HeadMasterTitle from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import BatchAttendanceBody from '../../headMasterComponents/batchAttendance/batchAttendanceBody.jsx';

export default class BatchAttendance extends React.Component{
    constructor() {
        super();
        this.state = {
            // classMaster2: [],
        }
    }
    componentWillMount() {
        // $.llsajax({
        //     url: 'classmaster/statistics',
        //     type: "POST",
        //     async: false,
        //     success: statisticsData => {
        //         this.setState({
        //             classMaster2: statisticsData.classMaster
        //         });
        //     }
        // });
    }
    onShowMajor() {}
    onCourseShow() { }
    onLessonShow() { }
    onClickMessage1() {}
    render() {
        let styles = {
            title: {
                backgroundColor: "#ee526c",
                backgroundImage: "linear-gradient(45deg, #ee526c 0%, #ee526c 1%, #f36a80 100%)",
            }
        };
        return (
            <div>
                <TeacherComp onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onLessonShow={this.onLessonShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)}/>
                <HeadMasterTitle
                    style={styles.title}
                    title={"学员管理"}
                    msg={"真实客观统计学员数据  贴近学员生活学习 记录学生成长"}
                />
                <BatchAttendanceBody />
                <Footer />
            </div>
        );
    }
}