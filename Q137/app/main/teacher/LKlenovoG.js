import React from 'react';
import { hashHistory } from 'react-router';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import CMComp from '../../classAdviser/public/header/teacherComp.js'; // 班主任总监头部
import EMComp from '../../assistantSup/public/teacherPublic/teacherComp.js'; // 教管头部
import Footer from '../../components/public/footer/footer.js';
import HeadMasterTitle from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import SmallKid from '../../headMasterComponents/performanceBody/spre_publicModel/Sk.jsx';
import { Link } from 'react-router';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';

export default class LKG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userJudge: sessionStorage.getItem("userJudge")
        }
    }

    handleClick() {
        if (this.state.userJudge == "CM" || this.state.userJudge == "EM" || this.state.userJudge == "PM" || this.state.userJudge == "HM") {
            hashHistory.push({
                pathname: '/studentAchievement'
            })
        } else if (this.state.userJudge == "MM") {
            hashHistory.push({
                pathname: '/'
            })
        } else {
            hashHistory.push({
                pathname: '/performance',
                query: {
                    a: Base64.decode(location.hash.split("b=")[1].split("&")[0]),
                    s: Base64.decode(location.hash.split("t=")[1].split("&")[0]),
                    t: Base64.decode(location.hash.split("c=")[1].split("&")[0]),
                },
            })
        }
    }

    componentWillMount() {
        let flag = location.hash.split("flag=")[1].split("&")[0];
        switch (flag) {
            case "t":
                this.setState({
                    dafaultInfotitle: "查看小测验成绩"
                })
                break;
            case "f":
                this.setState({
                    dafaultInfotitle: "查看联想期末成绩"
                })
                break;
            case "q":
                this.setState({
                    dafaultInfotitle: "查看阶段测验成绩"
                })
                break;
            default:
                this.setState({
                    dafaultInfotitle: "查看成绩"
                })
                break;
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

    _showHead() {
        switch (this.state.userJudge) {
            case 'CM':
                return (
                    <CMComp
                        onClickMessage1={this.onClickMessage1.bind(this)}
                    />
                );
            case 'EM':
            case 'PM':
            case 'HM':
                return (
                    <EMComp
                        onShowMajor={this.onShowMajor.bind(this)}
                        onCourseShow={this.onCourseShow.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)}
                        onClickMessage1={this.onClickMessage1.bind(this)}
                    />
                );
            default:
                return (
                    <TeacherComp sproPropsRouterFlag={this.sproPropsRouterFlag.bind(this)}
                        onShowMajor={this.onShowMajor.bind(this)}
                        onCourseShow={this.onCourseShow.bind(this)}
                        onLessonShow={this.onLessonShow.bind(this)}
                    />
                );
        }
    }

    render() {
        let styles = {
            title: {
                background: "#f9ae39",
            }
        }
        return (
            <div>
                {
                    this._showHead()

                }
                <HeadMasterTitle style={styles.title} title={"学员成绩"} msg={"全面的统计学员成绩   注重全面素质的提高"} />
                <div className="CourseEvaluationBody_boxSpro">
                    <div className="CourseEvaluationBody_wrap SproLKLWrap">
                        <div className="SKOutterTitle">
                            <h2 className="dib">{this.state.dafaultInfotitle}</h2>
                            <a className="dib" onClick={this.handleClick.bind(this)}>
                                <span>返回</span><i className="iconfont icon-back Sproiconback"></i>
                            </a>
                        </div>
                        <SmallKid
                            userJudge={this.state.userJudge}
                        />
                    </div>
                </div>
                {
                    this.state.userJudge == "C" || this.state.userJudge == "T" ?
                        <TeacherWork />
                        :
                        null
                }

                <Footer />
            </div>
        )
    }
}
