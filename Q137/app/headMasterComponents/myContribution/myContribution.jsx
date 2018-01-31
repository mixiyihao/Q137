import React, {Component} from 'react';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import HeadMasterTitle from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Footer from '../../components/public/footer/footer.js';
import MyContribute from './myContribute/myContribute.jsx'
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';

export default class MyContribution extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        sessionStorage.setItem('displayFlag', 6)
    }

    onShowMajor() {
    }

    onCourseShow() {
    }

    onLessonShow() {
    }

    onClickMessage1() {
    }

    render() {
        let styles = {
            title: {
                backgroundColor: "#fd724d",
                backgroundImage: "none",
            },
            width: {
                width: "1100px",
                margin: "20px auto"
            },
            imgWidth: {
                width: "100%",
                height: "100%"
            },
            bg: {
                backgroundColor: "#f4f4f5",
                minHeight: "650px",
                overflow: "hidden"
            }
        };
        return (
            <div>
                <TeacherComp onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                             onLessonShow={this.onLessonShow.bind(this)}
                             onClickMessage1={this.onClickMessage1.bind(this)}/>
                <HeadMasterTitle style={styles.title} title={"我的贡献"} msg={"多维度统计 全面分析 综合了解自己行业竞争力"}/>
                <MyContribute/>
                <TeacherWork/>
                <Footer/>
            </div>
        );
    }
}