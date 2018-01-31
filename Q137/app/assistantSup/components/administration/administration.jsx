import React, { Component } from 'react';
import TeacherComp from '../../public/teacherPublic/teacherComp.js';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import AdministrationComp from './administrationComp/administrationComp.jsx';
import Footer from '../../../components/public/footer/footer.js';

export default class Administration extends Component {
    constructor() {
        super();
    }
    componentWillMount(){
        if(sessionStorage.getItem('userJudge')=='EM'||sessionStorage.getItem('userJudge')=='PM'|| sessionStorage.getItem('userJudge') == 'HM'){
            sessionStorage.setItem('displayFlag','5')
        }
    }
    onShowMajor() { }
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
                <HeadMasterTitle style={styles.title} title={"学员管理"} msg={"真实客观统计学员数据  贴近学员生活学习 记录学生成长"}/>
                <AdministrationComp
                    flag={"teacher"}
                />
                <Footer />
            </div>
        );
    }
}