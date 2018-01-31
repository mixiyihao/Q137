import React, {Component} from 'react';
import AuthorityManagement from '../../../teachingManagement/components/authorityManagement/authorityManagement.jsx';
import CMTeacherComp from '../../../classAdviser/public/header/teacherComp.js';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Footer from '../../../components/public/footer/footer.js';

export default class ClassAdviserJurisdiction extends Component {
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
                <CMTeacherComp onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                               onLessonShow={this.onLessonShow.bind(this)}
                               onClickMessage1={this.onClickMessage1.bind(this)}/>
                <HeadMasterTitle style={styles.title} title={"班主任管理"} msg={"多维度统计 全面分析 综合了解自己行业竞争力"}/>
                <AuthorityManagement 
                    type={['班主任']}
                />
                <Footer/>
            </div>
        )
    }
}