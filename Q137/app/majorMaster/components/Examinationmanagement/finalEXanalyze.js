import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Title from '../../../assistantSup/public/teacherPublic/teacherComp.js';
import Footer from '../../../assistantSup/public/footer/footer.js';
import StatisticEntry from '../../../teacherComponents/teacherfinalExSta/statisticEntry.js';
export default class finalEXanalyze extends React.Component {
    constructor() {
        super();
        this.state = {
            majors: [],
            Exowner:0,
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
    onCourseShow(){}
    render() {
        let styles = {
            title: {
                backgroundColor: "#6cc4ce",
                backgroundImage: "linear-gradient(60deg, #6cc4ce, #65f1ce)",
            }
        };
        return (
            <div>
                <Title
                    majors={this.state.majors}
                    onClickMessage1={this.onClickMessage1.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                    onCourseShow={this.onCourseShow.bind(this)}
                />
                <HeadMasterTitle
                    style={styles.title}
                    title={"考试管理"}
                    msg={"贴合知识点 自动判卷 多维度统计"}
                />
                <StatisticEntry />
                <Footer/>
            </div>
        )
    }
}
