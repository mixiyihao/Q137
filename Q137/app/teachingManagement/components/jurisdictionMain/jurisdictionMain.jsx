import React, {Component} from 'react';
import AuthorityManagement from '../authorityManagement/authorityManagement.jsx'
import TeacherComp from '../../../assistantSup/public/teacherPublic/teacherComp.js';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Footer from '../../../assistantSup/public/footer/footer.js';

/**
 * 教管权限管理页面
 */
export default class JurisdictionMain extends Component {
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
                <HeadMasterTitle style={styles.title} title={"教管管理"} msg={"多维度统计 全面分析 综合了解自己行业竞争力"}/>
                <AuthorityManagement 
                    type={['助教','班主任','班主任总监','助教总监']}
                />
                <Footer/>
            </div>
        )
    }
}