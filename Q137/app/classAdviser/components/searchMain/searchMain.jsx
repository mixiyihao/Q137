import React, {Component} from 'react';
import Title from '../../../components/information/titleBar/sprotitleBar.js';
import TeacherComp from '../../public/header/teacherComp.js';
import MajorMasterHead from '../../../majorMaster/public/teacherPublic/teacherComp.js';
import Search from '../../../components/public/search/search.js';
import Footer from '../../../components/public/footer/footer.js';

export default class TeaSearchMain extends Component {
    constructor() {
        super();
        this.state = {
            userJudge: sessionStorage.getItem("userJudge")
        }
    }

    componentWillMount() {
        sessionStorage.setItem("displayFlag", " ");
    }

    sproPropsRouterFlag(RF) {
    }

    onClickMessage1() {
    }

    onClickMessage1() {
    }

    onShowMajor() {
    }

    onCourseShow() {
    }

    onLessonShow() {
    }

    render() {
        let styles = {
            Wrap: {
                position: "relative",
            },
        }
        return (
            <div>
                {
                    this.state.userJudge == "MM" ?
                        <MajorMasterHead
                            onShowMajor={this.onShowMajor.bind(this)}
                            onCourseShow={this.onCourseShow.bind(this)}
                            onLessonShow={this.onLessonShow.bind(this)}
                            onClickMessage1={this.onClickMessage1.bind(this)}
                        />
                        :
                        <TeacherComp
                            onClickMessage1={this.onClickMessage1.bind(this)}
                            sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                        />
                }
                <Title/>
                <div style={styles.Wrap}>
                    <Search/>
                </div>
                <Footer/>
            </div>
        );
    }
}