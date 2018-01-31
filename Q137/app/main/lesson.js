/**
 * Created by YH on 2017/1/11.
 */

import React from 'react';
import $ from 'jquery';
import Tab from '../components/public/tab/tab.js';
import Footer from '../components/public/footer/footer.js';
import Header from '../components/profession/header/header.js';
import LeftNavBar from '../components/profession/leftNavBar/leftNavBarspro.js';
import TopMessage from '../components/public/lessonTopMessage/topMessage.js';
import LineMessage from '../components/public/LineMessage/lineMessage.js';
import EvaluatePopBox from '../components/public/evaluatePopBox/evaluatePopBox.jsx';
import Sproquiz from '../components/quizzes/Sproquiz.js';
import Sprofinal from '../components/finalExam/Sprofinal.js';

export default class Lesson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            majorIndex: [],
            name: [], //课程名字
            lessons: [], //课程章节
            lessonnum: [],
            lessonFlag: null,
            term: 1,
            isPopBoxShow: false,
            degree: null, //强制评价
            isSproquizShow: false,//测验是否显示
            isSprofinalShow: false, // 期末考试是否显示
            examID: 0, // 试卷ID
            examFinalID: 0,
            courseID: 0,
            examFlag: 0,
            examresult: [],
            examid: 0,
            ajaxFlag: false,
            exam: [],
            noreadmessageInfo:[],
            LeftNavNum:[],
        }
    }
 
    findnoreadmessagecountAjaxInfo(data){
        this.setState({
            noreadmessageInfo:data
        })
    }
    componentWillMount() {
        let lessonID = Base64.decode(location.hash.split("id=")[1].split("&")[0]);
        if (location.hash.indexOf('les=') > 0) {
            this.setState({
                lessonFlag: Base64.decode(location.hash.split("les=")[1].split("&")[0])
            });
        }
        $.llsajax({
            url: "course/courseindex/" + lessonID,
            type: "POST",
            async: false,
            success: majorIndex => {
            
                this.setState({
                    lessonnum: majorIndex.lessonnum,
                    majorIndex: majorIndex,
                    name: majorIndex.course.name,
                    lessons: majorIndex.course.lessons,
                    content: majorIndex.course.content,
                    term: majorIndex.course.term,
                    degree: majorIndex.degree,
                    courseID: majorIndex.course.id,
                    ajaxFlag: true,
                });
                this.getCourseexam(majorIndex.course.id);
                if (majorIndex.degree !== null) {
                    this.setState({
                        isPopBoxShow: true
                    });
                }
            }
        })
    }
    CloseLeftSelect(e){
        let NB=this.state.LeftNavNum;
        //末尾增加
         NB.push(e);
        if(NB.length>2){
        //头部删除
            NB.shift();
        }
        if(NB.indexOf(undefined)!=-1){
            this.setState({
               LeftNavNum:["haha"],
               CloseLeftSelectFlag:true, 
            })
        }else if(NB.indexOf("haha")!=-1){
             this.setState({
               LeftNavNum:[],
               CloseLeftSelectFlag:false, 
            })
        }
    }
    componentDidMount() { }
    onLessonShow(lessonValue) {
        this.setState({
            majorIndex: lessonValue.majorIndex,
            name: lessonValue.name,
            lessons: lessonValue.lessons,
            content: lessonValue.content,
            lessonFlag: null,
            term: lessonValue.majorIndex.course.term,
            courseID: lessonValue.majorIndex.course.id
        });
        if (this.state.ajaxFlag === true) {
            this.getCourseexam(lessonValue.majorIndex.course.id);
        }
    }
    onRenderLesson() {
        let lessonID = Base64.decode(location.hash.split("id=")[1].split("&")[0]);
        $.llsajax({
            url: "course/courseindex/" + lessonID,
            type: "POST",
            async: false,
            success: majorIndex => {
                this.setState({
                    lessonnum: majorIndex.lessonnum,
                    majorIndex: majorIndex,
                    name: majorIndex.course.name,
                    lessons: majorIndex.course.lessons,
                    content: majorIndex.course.content,
                    term: majorIndex.course.term,
                    degree: majorIndex.degree,
                    courseID: majorIndex.course.id,
                });
            }
        })
    }
    onRenderCourseExam() {
        this.getCourseexam(this.state.courseID);
    }
    getCourseexam(id) {
        $.llsajax({
            url: "exam/courseexam",
            type: "POST",
            async: false,
            data: {
                courseid: id
            },
            success: courseexamData => {
                this.setState({
                    examFlag: courseexamData.showtype,
                    examid: courseexamData.examid
                });
                if (courseexamData.examresult) {
                    this.setState({
                        examresult: courseexamData.examresult,
                    });
                }
                if (courseexamData.exam) {
                    this.setState({
                        exam: courseexamData.exam,
                    });
                }
            }
        })
    }
    // 显示试卷
    onShowExam(id) {
        this.setState({
            isSproquizShow: true,
            examID: id,
        });
    }
    onShowFinalExam(id) {
        this.setState({
            isSprofinalShow: true,
            examFinalID: id,
        });
    }
    // 关闭试卷
    onHideExam() {
        this.setState({
            isSproquizShow: false,
        });
    }
    onHideFinalExam() {
        this.setState({
            isSprofinalShow: false,
        });
    }
    onRefestHead() { }
    onClassShow() { }
    onClickMessage() {}
    onLineMessage() {}
    onCourseShow() {}
    render() {
       
        let styles = {
            position: {
                position: "relative"
            },
            Wrap: {
                width: "1280px",
                margin: "auto"
            },
            positionBg: {
                width: "100%",
                height: "100%",
                position: "absolute",
                left: "0",
                top: "0",
                background: "rgba(0,0,0,0.4)",
                zIndex: "998",
            },
        };
        let data = {
            exam_id: this.state.examID,
            userid: 0
        };
        let dataFinal = {
            exam_id: this.state.examFinalID,
            userid: 0
        };
        return (
            <div onClick={this.CloseLeftSelect.bind(this)}>
                <Header
                    onCourseShow={this.onCourseShow.bind(this)}
                    onClickMessage={this.onClickMessage.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                    noreadmessageInfo={this.state.noreadmessageInfo}
                    
                />
                <div style={styles.position}>
                    <TopMessage
                        name={this.state.name}
                        lessonnum={this.state.lessonnum}
                        term={this.state.term}
                       
                    />
                </div>
                <div style={styles.Wrap}>
                    <div id="show">
                        <Tab
                            content={this.state.content}
                            lessons={this.state.lessons}
                            lessonFlag={this.state.lessonFlag}
                            onShowExam={this.onShowExam.bind(this)}
                            onShowFinalExam={this.onShowFinalExam.bind(this)}
                            courseID={this.state.courseID}
                            examFlag={this.state.examFlag}
                            examresult={this.state.examresult}
                            examid={this.state.examid}
                            exam={this.state.exam}
                            term={this.state.term}
                        />
                    </div>
                    <LeftNavBar
                        CloseLeftSelectFlag={this.state.CloseLeftSelectFlag}
                        CloseLeftSelect={this.CloseLeftSelect.bind(this)}                      
                        onLessonShow={this.onLessonShow.bind(this)}
                        onClassShow={this.onClassShow.bind(this)}
                    />
                </div>
                {
                    this.state.isPopBoxShow ? 
                    <div id="evaluatePopBox" style={styles.positionBg}>
                        <EvaluatePopBox degree={this.state.degree}/>
                    </div>
                    : null
                }
                {
                    this.state.isSproquizShow ? <Sproquiz data={data} onHideExam={this.onHideExam.bind(this)} onRenderLesson={this.onRenderLesson.bind(this)}/> : null
                }
                {
                    this.state.isSprofinalShow ? <Sprofinal data={dataFinal} onHideExam={this.onHideFinalExam.bind(this)} onRenderCourseExam={this.onRenderCourseExam.bind(this)}/> : null
                }
                <Footer />
                <LineMessage onRefestHead={this.onRefestHead.bind(this)} onLineMessage={this.onLineMessage.bind(this)}
                findnoreadmessagecountAjaxInfo={this.findnoreadmessagecountAjaxInfo.bind(this)}/>
            </div>
        );
    }
}
