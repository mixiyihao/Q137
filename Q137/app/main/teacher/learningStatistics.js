import React from 'react';
import ReactDOM from 'react-dom'
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import TeacherStatisticsTitle from '../../teacherComponents/teacherStatisticsTitle/teacherStatisticsTitle.js'
import Footer from '../../components/public/footer/footer.js';
import LearningStatis from '../../teacherComponents/thLearningStatistic/thLearningStatis.js'
import ThCmt from '../../teacherComponents/thLearningStatistic/teacherCommet/thCmt.jsx'
import $ from 'jquery';
import url from '../../controller/url.js';

export default class LearningStatistics extends React.Component {
    constructor() {
        super();
        this.state = {
            classData: [],
            indexItem:0,
        }
    }
    onLessonShow() { }
    onShowMajor() { }
    onCourseShow() { }
    onClickMessage1() { }

    componentWillMount() {
        // var term = sessionStorage.getItem('termNow');
        $.llsajax({
            url: "Luser/meansLuser",
            type: "post",
            async: false,
            success: data => {
                var term = data.user.term

                $.llsajax({
                    url: "/statistics/learningStatistics",
                    async: false,
                    type: "post",
                    data: {
                        term: term
                    },
                    success: data => {
                        //console.log(data)
                        this.setState({
                            classData: data.ls
                        })
                    }
                })
            }
        })
        // //console.log(term)
    }
    render() {
        return (
            <div>
                <TeacherComp onLessonShow={this.onLessonShow.bind(this)} onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)} />
                <TeacherStatisticsTitle />
                {/*<div className="statisTab">
                    <div className="statisTabInner">
                        <span data-i="0" onClick={this.changeTab.bind(this)} className={this.state.indexItem == 0?'current':''}>学习统计</span>
                        <span data-i="1" onClick={this.changeTab.bind(this)} className={this.state.indexItem == 1?'current':''}>学员评价</span>
                    </div>
                </div>
                <div id="statisBox">
                    <ThCmt />
                </div>*/}
                <LearningStatis ClData={this.state.classData} />
                <Footer />
            </div>
        );
    }
    changeTab(e) {
        var i = e.target.getAttribute('data-i')
        // //console.log(i)
        this.setState({
            indexItem:i,
        })
        this.switchTab(i)
    }
    switchTab(i){
        ReactDOM.unmountComponentAtNode(document.getElementById("statisBox"));
        switch(i){
            case 0:
            ReactDOM.render(
                    <LearningStatis ClData={this.state.classData} />,
                    document.getElementById("statisBox")
                );
            break;
            case '0':
             ReactDOM.render(
                    <LearningStatis ClData={this.state.classData} />,
                    document.getElementById("statisBox")
                );
            break;
            case 1:
             ReactDOM.render(
                    <ThCmt ClData={this.state.classData}/>,
                    document.getElementById("statisBox")
                );
            break;
            case '1':
             ReactDOM.render(
                    <ThCmt ClData={this.state.classData}/>,
                    document.getElementById("statisBox")
                );
            break;
        }
    }
    // componentDidMount(){
    //     this.switchTab(0)
    // }
}