import React, {Component} from 'react';
import AuthorityManagement from '../../../teachingManagement/components/authorityManagement/authorityManagement.jsx'
import TeacherComp from '../../public/teacherPublic/teacherComp.js';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Footer from '../../public/footer/footer.js';

export default class assistantJurisdiction extends Component {
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
                <HeadMasterTitle style={styles.title} title={"助教管理"} msg={"多维度统计 全面分析 综合了解自己行业竞争力"}/>
                <AuthorityManagement 
                    type={['助教']}
                />
                <Footer/>
            </div>
        )
    }
}