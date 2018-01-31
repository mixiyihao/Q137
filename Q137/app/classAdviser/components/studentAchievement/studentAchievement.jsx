import React, { Component } from 'react';
import CMHead from '../../../classAdviser/public/header/teacherComp.js';
import EMHead from '../../../assistantSup/public/teacherPublic/teacherComp.js';
import MMHead from '../../../majorMaster/public/teacherPublic/teacherComp.js'
import TeacherComp from '../../public/header/teacherComp';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import AchievementBody from './achievementBody/achievementBody.jsx';
import Footer from '../../../components/public/footer/footer.js';


export default class StudentAchievement extends Component {
    constructor(){
        super();
        this.state = {
            userJudge: sessionStorage.getItem("userJudge")
        }
    }
    onClickMessage1() {}

    onShowMajor() {}

    onCourseShow() {}

    onLessonShow() {}

    _showHead() {
        switch(this.state.userJudge) {
            case 'CM':
                return (
                    <CMHead
                        onShowMajor={this.onShowMajor.bind(this)}
                        onCourseShow={this.onCourseShow.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)}
                        onClickMessage1={this.onClickMessage1.bind(this)}
                    />
                );
            case 'EM':
            case 'PM':
            case 'HM':
                return (
                    <EMHead
                        onShowMajor={this.onShowMajor.bind(this)}
                        onCourseShow={this.onCourseShow.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)}
                        onClickMessage1={this.onClickMessage1.bind(this)}
                    />
                );
            case 'MM':
                return (
                    <MMHead
                        onShowMajor={this.onShowMajor.bind(this)}
                        onCourseShow={this.onCourseShow.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)}
                        onClickMessage1={this.onClickMessage1.bind(this)}
                    />
                );
            default :
                return (
                    <TeacherComp
                        onClickMessage1={this.onClickMessage1.bind(this)}
                    />
                );
        }
    }
    render() {
        let styles = {
            title: {
                background: "#f9ae39",
            }
        };
        return (
            <div>
                {this._showHead()}
                <HeadMasterTitle
                    style={styles.title}
                    title={"学员成绩"}
                    msg={"全面的统计学员成绩   注重全面素质的提高"}
                />
                <AchievementBody />
                <Footer />
            </div>
        )
    }
}