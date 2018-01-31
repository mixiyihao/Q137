import React, { Component } from 'react';
import Title from '../../components/information/titleBar/sprotitleBar.js';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import Search from '../../components/public/search/search.js';
import Footer from '../../components/public/footer/footer.js';

export default class TeaSearchMain extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    componentWillMount() {
        sessionStorage.setItem("displayFlag", " ");
    }
    sproPropsRouterFlag(RF){}
    onClickMessage1() {}
    onCourseShow() {}
    onShowMajor() {}
    onLessonShow() {}
    render() {
        let styles = {
            Wrap: {
                position: "relative",
            },
        }
        return (
            <div>
                <TeacherComp
                    onCourseShow={this.onCourseShow.bind(this)}
                    onShowMajor={this.onShowMajor.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                    onClickMessage1={this.onClickMessage1.bind(this)}
                    sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                />
                <Title />
                <div style={styles.Wrap}>
                    <Search />
                </div>
                <Footer />
            </div>
        );
    }
}