import React from 'react';
import $ from 'jquery';
import TeacherComp from '../../teacherComponents/teacherPublic/teacherComp.js';
import Title from '../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import EditTestPaperTool from '../../teacherComponents/teacherEditPaper/editTestPaperTool/editTestPaperTool.js';
import EditPaperTopic from '../../teacherComponents/teacherEditPaper/editPaperTopic/editPaperTopic.js';
import Footer from '../../components/public/footer/footer.js';
import TeacherWork from '../../teacherComponents/teacherWork/teacherWork.jsx';

export default class EditTestPaper extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            paper_name: [], // 试卷名字
            questions: [], // 试卷题目
            testQuestionsSum: 0, // 试题总数
            editRadioSelectNum: 0, // 编辑试卷单选数目
            editMultiselectNum: 0, // 编辑试卷多选数目
            editSubjectiveNum: 0, // 编辑试卷主观题数目
            minute: 0, // 编辑试卷考试时间
            getSubjectValue: [],
            multiselectScore: 0, // 多选题每道题分数
            radioButtonListScore: 0, // 单选题每道题分数
            subjectiveScore: 0, // 编辑试卷主观题数目
            TriodeLink: [], // 三级联动信息
            major_id: 0, // 专业ID
            course_id: 0, // 课程ID
            lesson_id: 0, // 课时ID
            exam_id: [],
            fullMarks:0,
            radioButtonListFirst: 0, // 第一次改写头部信息单选题数量
            multiselectFirst: 0, // 第一次改写头部信息多选题数量
            subjectiveFirst: 0, // 第一次改写头部信息主观题数量
        }
    }
    componentWillMount() {
        $.llsajax({
            url: "examInationPaper/paperPreview",
            type: "post",
            async: false,
            data: {
                id: window.location.hash.split("?")[1].split("&")[1].split("=")[1]
            },
            success: paperPreviewData => {
                let editRadioSelectNum = 0;
                let editMultiselectNum = 0;
                let editSubjectiveNum = 0;
                let radioButtonListScore = 0;
                let multiselectScore = 0;
                let subjectiveScore = 0;
                paperPreviewData.questions.map((item) => {
                    if (item.type === 1) {
                        editRadioSelectNum = editRadioSelectNum + 1;
                        this.setState({
                            editRadioSelectNum: ++this.state.editRadioSelectNum,
                            radioButtonListScore: item.score
                        });
                        radioButtonListScore = item.score;
                    } else if (item.type === 2) {
                        editMultiselectNum = editMultiselectNum + 1;
                        this.setState({
                            editMultiselectNum: ++this.state.editMultiselectNum,
                            multiselectScore: item.score
                        });
                        multiselectScore = item.score;
                    } else if (item.type === 3) {
                        editSubjectiveNum = editSubjectiveNum + 1;
                        this.setState({
                            editSubjectiveNum: ++this.state.editSubjectiveNum,
                            subjectiveScore: item.score
                        });
                        subjectiveScore = item.score;
                    }
                });
                let score = Number(editRadioSelectNum) * Number(radioButtonListScore) + Number(editMultiselectNum) * Number(multiselectScore) + Number(editSubjectiveNum) * Number(subjectiveScore);
                this.setState({
                    paper_name: paperPreviewData.paper.paper_name,
                    questions: paperPreviewData.questions,
                    testQuestionsSum: paperPreviewData.questions.length,
                    major_id: paperPreviewData.paper.major_id === null ? "" : paperPreviewData.paper.major_id,
                    course_id: paperPreviewData.paper.course_id === null ? "" : paperPreviewData.paper.course_id,
                    lesson_id: paperPreviewData.paper.lesson_id === null ? "" : paperPreviewData.paper.lesson_id,
                    exam_id: window.location.hash.split("?")[1].split("&")[0].split("=")[1],
                    radioButtonListFirst: this.state.editRadioSelectNum, // 第一次改写头部信息单选题数量
                    multiselectFirst: this.state.editMultiselectNum, // 第一次改写头部信息多选题数量
                    subjectiveFirst: this.state.editSubjectiveNum, // 第一次改写头部信息主观题数量
                    fullMarks: score
                });
            }
        });
    }
    componentDidMount() {

    }
    // 获取试卷头部信息
    onGetMessageTool(message) {
        this.setState({
            paper_name: message.paper_name, // 试卷名称
            minute: message.minute, // 考试时长
            testQuestionsSum: message.testQuestionsSum, // 试题总数
            editRadioSelectNum: message.radioButtonList, // 单选题数
            editMultiselectNum: message.multiselect, // 多选题数
            editSubjectiveNum: message.subjective, // 主观题数量
            radioButtonListScore: message.radioButtonListScore,
            multiselectScore: message.multiselectScore,
            subjectiveScore: message.subjectiveScore, // 主观题分数
            fullMarks:message.fullMarks,
            radioButtonListFirst: message.radioButtonList, // 第一次改写头部信息单选题数量
            multiselectFirst: message.multiselect, // 第一次改写头部信息多选题数量
            subjectiveFirst: message.subjective, // 第一次改写头部信息主观题数量
        });
    }
    onResetMessageTool(radioButtonList,multiselect,subjective) {
        // console.log(radioButtonList,multiselect,subjective);
        let resetRadioButtonList = Number(radioButtonList);
        let resetMultiselect = Number(multiselect);
        let resetSubjective = Number(subjective);
        this.setState({
            editRadioSelectNum: resetRadioButtonList,
            editMultiselectNum: resetMultiselect,
            editSubjectiveNum: resetSubjective
        });
        // if (this.state.testQuestionsSum <= (resetRadioButtonList + resetMultiselect + resetSubjective)) {
        //     // console.log(resetRadioButtonList + resetMultiselect + resetSubjective);
        //     this.state.testQuestionsSum = resetRadioButtonList + resetMultiselect + resetSubjective;
        //     this.setState({
        //         testQuestionsSum: this.state.testQuestionsSum
        //     });
        // }
    }
    onResetQuestionSum(num) {
        // console.log(this.state.testQuestionsSum);
        // console.log(num);
        if (num >= this.state.testQuestionsSum) {
            this.state.testQuestionsSum = Number(num);
            this.setState({
                testQuestionsSum: this.state.testQuestionsSum
            });
        }
    }
    // 获取专业、课程、课时信息
    TriodeLink(value) {
        // console.log(value);
        if (value.majorValue.length !== 0) {
            this.setState({
                major_id: value.majorValue
            });
        }
        this.setState({
            course_id: value.courseValue,
            lesson_id: value.lessonValue
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
                <TeacherComp onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} onLessonShow={this.onLessonShow.bind(this)} onClickMessage1={this.onClickMessage1.bind(this)}/>
                <Title style={styles.title} title={"考试管理"} msg={"贴合知识点 自动判卷 多维度统计"}/>
                <EditTestPaperTool
                    editRadioSelectNum={this.state.editRadioSelectNum}
                    editMultiselectNum={this.state.editMultiselectNum}
                    editSubjectiveNum={this.state.editSubjectiveNum}
                    paper_name={this.state.paper_name}
                    onGetMessageTool={this.onGetMessageTool.bind(this)}
                    TriodeLink={this.TriodeLink.bind(this)}
                    major_id={this.state.major_id}
                    course_id={this.state.course_id}
                    lesson_id={this.state.lesson_id}
                    radioButtonListScore={this.state.radioButtonListScore}
                    multiselectScore={this.state.multiselectScore}
                    subjectiveScore={this.state.subjectiveScore}
                    title={'小测验'}
                />
                <EditPaperTopic
                    questions={this.state.questions}
                    editRadioSelectNum={this.state.editRadioSelectNum}
                    editMultiselectNum={this.state.editMultiselectNum}
                    editSubjectiveNum={this.state.editSubjectiveNum}
                    testQuestionsSum={this.state.testQuestionsSum}
                    major_id={this.state.major_id}
                    course_id={this.state.course_id}
                    lesson_id={this.state.lesson_id}
                    minute={this.state.minute}
                    paper_name={this.state.paper_name}
                    multiselectScore={this.state.multiselectScore}
                    radioButtonListScore={this.state.radioButtonListScore}
                    subjectiveScore={this.state.subjectiveScore}
                    exam_id={this.state.exam_id}
                    fullMarks={this.state.fullMarks}
                    onResetMessageTool={this.onResetMessageTool.bind(this)}
                    radioButtonListFirst={this.state.radioButtonListFirst}
                    multiselectFirst={this.state.multiselectFirst}
                    subjectiveFirst={this.state.subjectiveFirst}
                    onResetQuestionSum={this.onResetQuestionSum.bind(this)}
                    paperType={2}
                    title={'小测验'}
                />
                <TeacherWork />
                <Footer />
            </div>
        );
    }
}
