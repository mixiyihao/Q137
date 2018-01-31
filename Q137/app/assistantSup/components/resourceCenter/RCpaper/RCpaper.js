import React, {Component} from 'react';
import TeacherComp from '../../../public/teacherPublic/teacherComp.js';
import CMTeacherComp from '../../../../classAdviser/public/header/teacherComp.js';
import MMTeacherComp from '../../../../majorMaster/public/teacherPublic/teacherComp.js'; // 专业负责人头部
import HeadMasterTitle from '../../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Footer from '../../../public/footer/footer.js';
import Papermain from './Papermain.js';
// import PaperData from './PaperData.js';
import $ from 'jquery';

export default class RCpaper extends React.Component {
    constructor() {
        super();
        this.state = {
            APaperData: [],
            Rdata: [],
            paperid: -1,
            LeftNavNum: []
        }
    }

    ChooseComp() {
        let userFlag = sessionStorage.getItem("userJudge");
        switch (userFlag) {
            case "TM":
            case "EM":
            case "PM":
            case "HM":
                return (
                    <TeacherComp
                        sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                        onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)}/>
                )
                break;
            case "CM":
                return (
                    <CMTeacherComp
                        sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                        onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)}/>
                )
                break;
            case "MM":
                return (
                    <MMTeacherComp
                        onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)}/>
                )
                break;
        }
    }

    CloseLeftSelect(e) {
        let NB = this.state.LeftNavNum;
        //末尾增加
        NB.push(e);
        if (NB.length > 2) {
            //头部删除
            NB.shift();
        }
        if (NB.indexOf(undefined) != -1) {
            this.setState({
                LeftNavNum: ["haha"],
                CloseLeftSelectFlag: true,
            })
        } else if (NB.indexOf("haha") != -1) {
            this.setState({
                LeftNavNum: [],
                CloseLeftSelectFlag: false,
            })
        }
    }

    componentWillMount() {
        if (Base64.decode(window.location.hash.split("i=")[1]) != null) {
            $.llsajax({
                url: "resourceCenter/viewbyid",
                type: "post",
                data: {
                    id: Base64.decode(window.location.hash.split("i=")[1]),
                },
                success: PaperData => {
                    this.setState({
                        paperid: Base64.decode(window.location.hash.split("i=")[1]),
                        APaperData: PaperData
                    })
                }
            })
        }
    }

    APaperDataajax() {
        if (Base64.decode(window.location.hash.split("i=")[1]) != null) {
            $.llsajax({
                url: "resourceCenter/viewbyid",
                type: "post",
                data: {
                    id: Base64.decode(window.location.hash.split("i=")[1]),
                },
                success: PaperData => {
                    this.setState({
                        paperid: Base64.decode(window.location.hash.split("i=")[1]),
                        APaperData: PaperData
                    })
                }
            })
        }
    }

    sproPropsRouterFlag() {
    }

    onShowMajor() {
    }

    onCourseShow() {
    }

    onLessonShow() {
    }

    onClassShow() {
    }

    onClickMessage1() {
    }

    render() {

        let SleftStyle = {
            wrap: {
                width: "1100px",
                margin: "0 auto"
            },
            title: {
                backgroundColor: "#0eb8c5",
                backgroundImage: "linear-gradient(60deg, #0eb8c5, #0eb8c5)",
            },

        };

        return (
            <div onClick={this.CloseLeftSelect.bind(this)}>
                {this.ChooseComp()}
                <HeadMasterTitle style={SleftStyle.title} title={"资源中心"} msg={"吸收大咖文化精髓 共享优秀教育资源 助力自我成长"}/>
                <div>
                    <Papermain APaperData={this.state.APaperData}
                               paperid={this.state.paperid}
                               APaperDataajax={this.APaperDataajax.bind(this)}/>
                </div>
                <Footer/>
            </div>
        )
    }
}