import React, {Component} from 'react';
import AuthorityManagement from '../../../teachingManagement/components/authorityManagement/authorityManagement.jsx'
import TeacherComp from '../../../assistantSup/public/teacherPublic/teacherComp.js';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Footer from '../../../assistantSup/public/footer/footer.js';

/**
 * 院长权限管理页面
 */
export default class DeanJurisdictionMain extends Component {
    constructor() {
        super();
        this.state = {
            userJudge: sessionStorage.getItem("userJudge"),
        }
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
                <HeadMasterTitle style={styles.title} title={"用户管理"} msg={"多维度统计 全面分析 综合了解自己行业竞争力"}/>
                <AuthorityManagement 
                    type={this.state.userJudge == "PM" ? ['助教','班主任','班主任总监','助教总监','专业负责人','教管'] : ['助教','班主任','班主任总监','助教总监','专业负责人','教管','院长']}
                />
                <Footer/>
            </div>
        )
    }
}