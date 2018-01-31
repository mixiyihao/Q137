
import React from 'react';
import '../../../teacherComponents/createTestPaper/createTestPaper.css';
import TeacherComp from '../../public/teacherPublic/teacherComp.js';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import MajorMasterHead from '../../../majorMaster/public/teacherPublic/teacherComp.js'
import CreateTestPaperTool from '../../../teacherComponents/createTestPaper/createTestPaperTool/createTestPaperTool.js';
import CreatePaperTopic from '../../../teacherComponents/createTestPaper/createPaperTopic/createPaperTopic.js';
import Footer from '../../components/../public/footer/footer.js';

export default class CreateFinalPaper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paper_name: [], // 试卷名称
            minute: [], // 考试时长
            testQuestionsSum: 0, // 试题总数
            radioButtonList: 0, // 单选题数量
            multiselect: 0, // 多选题数量
            subjective: 0, // 主观题数量
            Sprofullmarker:0,//总分
            getSubjectValue: [],
            multiselectScore: 0,
            radioButtonListScore: 0,
            subjectiveScore: 0,
            TriodeLink: [],
            radioButtonListFirst: 0, // 第一次改写头部信息单选题数量
            multiselectFirst: 0, // 第一次改写头部信息多选题数量
            subjectiveFirst: 0, // 第一次改写头部信息主观题数量
            userJudge: sessionStorage.getItem('userJudge'), // 权限配置
        }
    }
    compomentDidMount() {
    }
    // 获取试卷头部信息
    onGetMessageTool(message) {
        this.setState({
            paper_name: message.paper_name, // 试卷名称
            minute: message.minute, // 考试时长
            testQuestionsSum: message.testQuestionsSum, // 试题总数
            radioButtonList: Number(message.radioButtonList), // 单选题数
            multiselect: Number(message.multiselect), // 多选题数
            subjective: Number(message.subjective), // 主观题数量
            radioButtonListScore: message.radioButtonListScore, // 单选题分数
            multiselectScore: message.multiselectScore, // 多选题分数
            subjectiveScore: message.subjectiveScore, // 主观题分数
            Sprofullmarker:message.fullMarks,
            radioButtonListFirst: Number(message.radioButtonList),
            multiselectFirst: Number(message.multiselect),
            subjectiveFirst: Number(message.subjective),
        });
    }
    // 添加试题重新计算头部信息
    onResetMessageTool(radioButtonList,multiselect,subjective) {
        // console.log(radioButtonList,multiselect,subjective);
        let resetRadioButtonList = Number(radioButtonList);
        let resetMultiselect = Number(multiselect);
        let resetSubjective = Number(subjective);
        this.setState({
            radioButtonList: resetRadioButtonList,
            multiselect: resetMultiselect,
            subjective: resetSubjective
        });
        if (this.state.testQuestionsSum <= (resetRadioButtonList + resetMultiselect + resetSubjective)) {
            console.log(resetRadioButtonList + resetMultiselect + resetSubjective);
            this.state.testQuestionsSum = resetRadioButtonList + resetMultiselect + resetSubjective;
            this.setState({
                testQuestionsSum: this.state.testQuestionsSum
            });
        }
    }
    onResetQuestionSum(num) {
        if (num >= this.state.testQuestionsSum) {
            this.state.testQuestionsSum = num;
            this.setState({
                testQuestionsSum: this.state.testQuestionsSum
            });
        }
    }
    // 获取专业、课程、课时信息
    TriodeLink(value) {
        this.setState({
            TriodeLink: value
        });
    }
    onShowMajor() { }
    onCourseShow() { }
    onLessonShow() { }
    onClickMessage1() {}
    render() {
        let styles = {
            title: {
                backgroundColor: "#6cc4ce",
                backgroundImage: "linear-gradient(60deg, #6cc4ce, #65f1ce)",
            },
        };
        return (
            <div>
                {
                    this.state.userJudge == "MM" ?
                        <MajorMasterHead
                            majors={this.state.majors}
                            onShowMajor={this.onShowMajor.bind(this)}
                            onCourseShow={this.onCourseShow.bind(this)}
                            onClickMessage1={this.onClickMessage1.bind(this)}
                            onLessonShow={this.onLessonShow.bind(this)}
                        /> 
                        :
                        <TeacherComp 
                            onShowMajor={this.onShowMajor.bind(this)} 
                            onCourseShow={this.onCourseShow.bind(this)} 
                            onLessonShow={this.onLessonShow.bind(this)} 
                            onClickMessage1={this.onClickMessage1.bind(this)} 
                        />
                }
                <HeadMasterTitle style={styles.title} title={"考试管理"} msg={"贴合知识点 自动判卷 多维度统计"}/>
                <CreateTestPaperTool
                    TriodeLink={this.TriodeLink.bind(this)}
                    onGetMessageTool={this.onGetMessageTool.bind(this)}
                    radioButtonList={this.state.radioButtonList}
                    multiselect={this.state.multiselect}
                    subjective={this.state.subjective}
                    title={"期末"}
                />
                <CreatePaperTopic
                    testQuestionsSum={this.state.testQuestionsSum}
                    radioButtonList={this.state.radioButtonList}
                    multiselect={this.state.multiselect}
                    subjective={this.state.subjective}
                    getSubjectValue={this.state.getSubjectValue}
                    paper_name={this.state.paper_name}
                    minute={this.state.minute}
                    multiselectScore={this.state.multiselectScore}
                    radioButtonListScore={this.state.radioButtonListScore}
                    subjectiveScore={this.state.subjectiveScore}
                    TriodeLink={this.state.TriodeLink}
                    Sprofullmarker={this.state.Sprofullmarker}
                    onResetMessageTool={this.onResetMessageTool.bind(this)}
                    radioButtonListFirst={this.state.radioButtonListFirst}
                    multiselectFirst={this.state.multiselectFirst}
                    subjectiveFirst={this.state.subjectiveFirst}
                    onResetQuestionSum={this.onResetQuestionSum.bind(this)}
                    paperType={1}
                    title={"期末"}
                />
                <Footer />
            </div>
        );
    }
}
