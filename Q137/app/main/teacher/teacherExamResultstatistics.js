import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Title from '../../teacherComponents/teacherPublic/teacherComp.js';
import Header from '../../teacherComponents/teacherQuestion/thQuestionTitle.js';
// import MainBody from '../../teacherComponents/teacherExamResultstatistics/statisticalResult/ExamResultMainbody.js';
// new
import StatisticEntry from '../../teacherComponents/teacherExamResultstatistics/statisticEntry.js';
import Footer from '../../components/public/footer/footer.js';

export default class teacherExamResultstatistics extends React.Component {
    constructor() {
        super();
        this.state = {
            majors: []
        }
    }
    componentWillMount() {
        if (sessionStorage.getItem("teacherComp") == "") {
            $.llsajax({
                url: "major/findMajor",
                type: "POST",
                async: false,
                success: compData => {
                    sessionStorage.setItem("teacherComp", JSON.stringify(compData));
                }
            })
        }
        // 从session中获取数据
        let compData = JSON.parse(sessionStorage.getItem("teacherComp"));
        this.setState({majors: compData.majors})
    }
    onClickMessage1() {}
    onLessonShow() {}
    render() {
        return (
            <div>
                <Title
                    majors={this.state.majors}
                    onClickMessage1={this.onClickMessage1.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                />
                <Header/>
                {/*<MainBody/>*/}
                <StatisticEntry />
                <Footer/>
            </div>
        )
    }
}
