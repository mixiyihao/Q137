import React, { Component} from 'react';
import $ from 'jquery';
import '../lessonBox/lessonBox.css';

export default class EditLesTestBox extends Component {
    constructor() {
        super();
        this.state = {
            exam: [],
            examID: 0, // 测试试卷ID
            examNeme: '', // 测试试卷名字
            lessonName: '', // 课时名称
            lesLessonName: '', // 阶段测试选择课时名称
            orderNum: 0, // 所在顺序
            stageArr: ['第一阶段','第二阶段','第三阶段','第四阶段'],
            stageID: 1, // 阶段选择索引
            setStage: 4, // 第一次选中阶段信息
            saveArr: [], // 暂存
            info: '', // 警告信息
            errorMsg: '', // 错误信息
            ordernum_Num: 0, // 顺序最大值
            lessonID: 0, // 课时ID
            lesTestArr: [], // 阶段测试暂存
            lesTestDetail: [],
            _showlessonAfterArr: [],
            editLesTestID: 0, // 修改的考试ID
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        console.log(this.props.editLesTest);
        this.findLesTestPaperAjax(this.props.courseID);
        if (this.props.lessons.length !== 0) {
            this.setState({
                lessonID: this.props.lessons[0].id,
                lesLessonName: this.props.lessons[0].name,
            });
            this._showlessonAfter(this.state.stageID);
        }
    }

    // 获取测试试卷
    findLesTestPaperAjax(courseID) {
        $.llsajax({
            url: "lestest/findLesTestPaper",
            type: "POST",
            async: true,
            data: {
                courseid: courseID
            },
            success: findLesTestPaperData => {
                if (findLesTestPaperData.paper !== null) {
                    this.setState({
                        exam: findLesTestPaperData.paper,
                        examID: this.props.editLesTest.paperId,
                        lessonID: this.props.editLesTest.lessonId,
                        examNeme: this.props.editLesTest.paperName,
                        editLesTestID: this.props.editLesTest.id
                    });
                    document.getElementById("edit_lesTestPaperSelect").value = this.props.editLesTest.paperId;
                    document.getElementById("edit_lesTestLessonSelect").value = this.props.editLesTest.lessonId;
                }
            }
        })
    }

    // 关闭弹框
    onCloseBox() {
        this.props.onCloseBox();
        this.setState({
            saveArr: [],
            setStage: 4,
        });

    }

    // 显示试卷名字
    _showExamPaper() {
        return this.state.exam.map((value,index) => {
            return (
                <option value={value.id} key={index}>&nbsp;{value.paper_name}</option>
            );
        });
    }

    // 显示课时
    _showlessonAfter(stageID) {
        this.state._showlessonAfterArr = [];
        this.props.lessons.map((value,index) => {
            if (value.stage_ordernum === stageID) {
                this.state._showlessonAfterArr.push(
                    <option value={value.id} key={index}>&nbsp;{value.name}</option>
                );
            }
        });
        this.setState({
            _showlessonAfterArr: this.state._showlessonAfterArr
        });
    }

    onSaveData() {
        this.onSaveLesTest();
    }

    // 保存阶段测试
    onSaveLesTest() {
        if (this.state.examID === 0 || this.state.lessonID === 0) {
            this.setState({errorMsg:"*信息不能为空!"});
            let _this = this;
            setTimeout(function(){
                _this.setState({errorMsg:""});
            }.bind(this),1000);
        } else {
            this.state.lesTestArr = [];
            let lesTestArr = {
                lessonId: this.state.lessonID,
                paperId: this.state.examID,
                id: this.state.editLesTestID
            };
            this.state.lesTestArr.push(lesTestArr);
            let postData = {
                oldlessonid: this.props.editLesTest.lessonId,
                lesTestList: this.state.lesTestArr
            };
            $.llsajax({
                url: "lestest/updateLesTest",
                type: "POST",
                async: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(postData),
                success: saveLesTest => {
                    this.props.onCloseBox();
                    this.props.getCourseindex(this.props.courseID);
                    this.props.clearRadioCheck();
                    this.setState({
                        lesTestArr: [],
                        examID: 0,
                        lessonID: 0,
                    });
                }
            })
        }
    }

    // 显示阶段
    _showStage() {
        return this.state.stageArr.map((value,index) => {
            if (index  < this.state.setStage) {
                return (
                    <span key={index} className={this.state.stageID === index + 1 ? "lessonBox-center-span lessonBox-center-span-stage Active" : "lessonBox-center-span lessonBox-center-span-stage"} onClick={this.onStageClick.bind(this,index + 1)}>{value}</span>
                );
            }
        });
    }

    // 选择阶段
    onStageClick(index) {
        if (this.state.stageID !== index) {
            this.setState({
                stageID: index
            });
            this._showlessonAfter(index);
        }
    }

    // 选择试卷
    onSelectLesTest(e) {
        if (Number(e.target.value) !== 0) {
            this.setState({
                examID: Number(e.target.value),
                exmaName: this.state.exam[e.target.selectedIndex].paper_name
            });
        }
    }

    // 选择课时
    onLessonSelect(e) {
        if (Number(e.target.value) !== 0) {
            this.setState({
                lessonID: Number(e.target.value),
                lesLessonName: this.props.lessons[e.target.selectedIndex].name
            });
        }
    }

    render() {
        return this.props.isLessonBoxHidden ? null : (
            <div className="lessonBox-container">
                <div className="lessonBox-wrap">
                    <div className="lessonBox-title">
                        <span className="lessonBox-title-msg">添加</span>
                        <span className="iconfont icon-guanbi lessonBox-title-close" onClick={this.onCloseBox.bind(this)}></span>
                    </div>
                    <div className="lessonBox-center">
                        <div className="lessonBox-center-edit">
                            <div className="lessonBox-center-title">
                                <span>所属专业：云计算应用开发</span>
                                <span>所属课程：表格的设计与开发</span>
                            </div>
                            <div className="lessonBox-lesson-box">
                                <div className="lessonBox-center-exam clearfix">
                                    <p className="lessonBox-label">选择试卷</p>
                                    <select name="exam" id="edit_lesTestPaperSelect" onChange={this.onSelectLesTest.bind(this)}>
                                        <option value="0">&nbsp;请选择试卷</option>
                                        {this._showExamPaper()}
                                    </select>
                                </div>
                                <div className="lessonBox-center-stage clearfix">
                                    <p className="lessonBox-label">所处阶段</p>
                                    {this._showStage()}
                                </div>
                                <div className="lessonBox-center-exam clearfix">
                                    <p className="lessonBox-label">在课时</p>
                                    <select name="lesson" id="edit_lesTestLessonSelect" onChange={this.onLessonSelect.bind(this)}>
                                        <option value="0">&nbsp;请选择课时</option>
                                        {this.state._showlessonAfterArr}
                                    </select>
                                    <span className="lessonBox-lesson-after">之后</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lessonBox-button">
                        <span className="lessonBox-button-cancel" onClick={this.onCloseBox.bind(this)}>取消</span>
                        <span className="commonButton button lessonBox-button-save" onClick={this.onSaveData.bind(this)}>保存</span>
                        <p>{this.state.errorMsg}</p>
                    </div>
                </div>
            </div>
        );
    }
}