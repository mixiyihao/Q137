import React, { Component } from 'react';
import $ from 'jquery';
import './lessonBox.css';

export default class LessonBox extends Component {
    constructor() {
        super();
        this.state = {
            isEdit: false, // 是否编辑
            typeID: 1, // 类型选择索引
            exam: [],
            examID: 0, // 测试试卷ID
            exmaName: '', // 测试试卷名字
            lessonName: '', // 课时名称
            lesLessonName: '', // 阶段测试选择课时名称
            orderNum: '', // 所在顺序
            stageArr: ['第一阶段', '第二阶段', '第三阶段', '第四阶段'],
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
            editSerialNumber: 0, // 要被修改的明细的序号
            infoLes: '',
            lesFlag: true,
            flagNum: 0, // 该顺序是否已经有了 0 没有 1 有
            isShowStageAll: true,
        }
    }

    componentDidMount() {
        this.findLessonOrdernumAjax(this.state.stageID);
        this.findLesTestPaperAjax(this.props.courseID);
        if (this.props.lessons.length !== 0) {
            // this.setState({
            //     lessonID: this.props.lessons[0].id,
            //     lesLessonName: this.props.lessons[0].name,
            // });
            this._showlessonAfter(this.state.stageID);
        }
    }

    findLessonOrdernumAjax(stageID) {
        $.llsajax({
            url: "lesson/findLessonOrdernum",
            type: "POST",
            async: true,
            data: {
                courseid: this.props.courseID,
                stage_ordernum: stageID
            },
            success: findLessonOrdernumData => {
                this.setState({
                    ordernum_Num: findLessonOrdernumData.num + 1,
                    orderNum: findLessonOrdernumData.num + 1
                });
                document.getElementById("lessonBox_order").value = findLessonOrdernumData.num + 1;
            }
        })
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
                        // examID: findLesTestPaperData.paper[0].id,
                        // exmaName: findLesTestPaperData.paper[0].paper_name,
                    });
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
            isShowStageAll: true
        });

    }

    // 类型选择
    onTypeClick(type) {
        if (this.state.typeID !== type) {
            this.setState({
                typeID: type
            });
        }
    }

    // 显示试卷名字
    _showExamPaper() {
        return this.state.exam.map((value, index) => {
            return (
                <option value={value.id} title={value.paper_name} data-name={value.paper_name} key={index}>&nbsp;{value.paper_name}</option>
            );
        });
    }

    // 显示课时
    _showlessonAfter(stageID) {
        this.state._showlessonAfterArr = [];
        this.props.lessons.map((value, index) => {
            if (value.stage_ordernum === stageID && value.lessonTestList.length === 0) {
                this.state._showlessonAfterArr.push(
                    <option value={value.id} key={index}>&nbsp;{value.name}</option>
                );
            }
        });
        this.setState({
            _showlessonAfterArr: this.state._showlessonAfterArr
        });
    }

    // 显示添加明细
    _showDetailed() {
        return this.state.saveArr.map((value, index) => {
            return (
                <div className="lessonBox-detailed-content" key={index} data-key={index}>
                    <div className="lessonBox-detailed-card">
                        <p>选择类型：课时</p>
                        <p>名称：{value.name}</p>
                        <p>所处阶段：{value.stage_ordernum}</p>
                        <p>所在顺序：{value.ordernum}</p>
                        <div className="lessonBox-detailed-button">
                            <span className="commonButton button" onClick={this.onEditLessonData.bind(this, index)}><i className="iconfont icon-bianji"></i>编辑</span>
                            <span className="commonButton button" onClick={this.onDeleteLessonData.bind(this, index)}><i className="iconfont icon-SHANCHU-"></i>删除</span>
                        </div>
                    </div>
                </div>
            );
        });
    }

    // 显示测试添加明细
    _showTestDetail() {
        return this.state.lesTestDetail.map((value, index) => {
            return (
                <div className="lessonBox-detailed-content" key={index} data-key={index}>
                    <div className="lessonBox-detailed-card">
                        <p>选择类型：阶段测试</p>
                        <p>名称：{value.paperName}</p>
                        <p>所处阶段：{value.stage_ordernum}</p>
                        <p>在课时：{value.lessonName} 之后</p>
                        <div className="lessonBox-detailed-button">
                            <span className="commonButton button" onClick={this.onEditLesTestData.bind(this, index)}><i className="iconfont icon-bianji"></i>编辑</span>
                            <span className="commonButton button" onClick={this.onDeleteLesTestData.bind(this, index)}><i className="iconfont icon-SHANCHU-"></i>删除</span>
                        </div>
                    </div>
                </div>
            );
        });
    }

    // 删除添加明细中的数据
    onDeleteLessonData(index) {
        // if (this.state.saveArr[index].ordernum === this.state.ordernum_Num) {
        //     this.setState({
        //         ordernum_Num: --this.state.ordernum_Num
        //     });
        // }
        this.state.saveArr.splice(index, 1);
        this.setState({
            saveArr: this.state.saveArr
        });
    }

    // 修改添加明细中的数据
    onEditLessonData(index) {
        this.setState({
            isEdit: true,
            editSerialNumber: index,
            lessonName: this.state.saveArr[index].name,
            orderNum: this.state.saveArr[index].ordernum
        });
        document.getElementById("lessonBox_lessonName").value = this.state.saveArr[index].name;
        document.getElementById("lessonBox_order").value = this.state.saveArr[index].ordernum;
    }

    // 修改阶段测试明细中的数据
    onEditLesTestData(index) {
        this.setState({
            lessonID: this.state.lesTestDetail[index].lessonId,
            examID: this.state.lesTestDetail[index].paperId,
        });
        document.getElementById("lessonBox_edit_lesTestPaperSelect").value = this.state.lesTestDetail[index].paperId;
        document.getElementById("lessonBox_edit_lessonSelect").value = this.state.lesTestDetail[index].lessonId;
    }

    // 删除阶段测试明细中的数据
    onDeleteLesTestData(index) {
        this.state.lesTestDetail.splice(index, 1);
        this.state.lesTestArr.splice(index, 1);
        this.setState({
            lesTestDetail: this.state.lesTestDetail,
            lesTestArr: this.state.lesTestArr
        });
    }

    onSaveData() {
        if (this.state.typeID === 1) {
            this.onSaveLessonData();
        } else {
            this.onSaveLesTest();
        }
    }

    // 保存课时信息
    onSaveLessonData() {
        if (this.state.lessonName == "" || this.state.orderNum == "") {
            this.setState({ errorMsg: "*信息不能为空!" });
            let _this = this;
            setTimeout(function () {
                _this.setState({ errorMsg: "" });
            }.bind(this), 1000);
        } else {
            if (this.state.isEdit) {
                let editArr = this.state.saveArr.slice(0);
                editArr.map((value, index) => {
                    if (this.state.editSerialNumber === index) {
                        value.name = this.state.lessonName;
                        value.ordernum = this.state.orderNum;
                    }
                });
                editArr.sort(function (a, b) {
                    return a.ordernum - b.ordernum
                });
                this.state.saveArr = editArr;
            } else {
                let saveArr = {
                    name: this.state.lessonName,
                    course_id: this.props.courseID,
                    ordernum: this.state.orderNum,
                    stage_ordernum: this.state.stageID
                };
                this.state.saveArr.push(saveArr);
            }
            let postData = {
                type: 0,
                lessonList: this.state.saveArr
            };
            $.llsajax({
                url: "lesson/saveOrUpdateLesson",
                type: "POST",
                async: true,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(postData),
                success: saveOrUpdateLesson => {
                    this.props.onCloseBox();
                    this.props.getCourseindex(this.props.courseID);
                    this.props.clearRadioCheck();
                    this.setState({
                        saveArr: [],
                        lessonName: '',
                        orderNum: '',
                        stageID: 1
                    });
                }
            })
        }
    }

    // 保存阶段测试
    onSaveLesTest() {
        if (this.state.examID === 0 || this.state.lessonID === 0) {
            this.setState({ errorMsg: "*信息不能为空!" });
            let _this = this;
            setTimeout(function () {
                _this.setState({ errorMsg: "" });
            }.bind(this), 1000);
        } else {
            let lesTestArr = {
                lessonId: this.state.lessonID,
                paperId: this.state.examID,
            };
            this.state.lesTestArr.push(lesTestArr);
            let postData = {
                lesTestList: this.state.lesTestArr
            };
            $.llsajax({
                url: "lestest/saveLesTest",
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
        return this.state.stageArr.map((value, index) => {
            if (this.state.isShowStageAll) {
                return (
                    <span key={index} className={this.state.stageID === index + 1 ? "lessonBox-center-span lessonBox-center-span-stage Active" : "lessonBox-center-span lessonBox-center-span-stage"} onClick={this.onStageClick.bind(this, index + 1)}>{value}</span>
                );
            } else {
                if (this.state.stageID === index + 1) {
                    return (
                        <span key={index} className={this.state.stageID === index + 1 ? "lessonBox-center-span lessonBox-center-span-stage Active" : "lessonBox-center-span lessonBox-center-span-stage"} onClick={this.onStageClick.bind(this, index + 1)}>{value}</span>
                    );
                }
            }
        });
    }

    // 选择阶段
    onStageClick(index) {
        if (this.state.stageID !== index) {
            this.setState({
                stageID: index,
            });
            this.findLessonOrdernumAjax(index);
            this._showlessonAfter(index);
        }
    }

    // 课时名称添加
    onNameInput(e) {
        this.setState({
            lessonName: e.target.value
        });
    }

    // 所在顺序添加
    onOrderChange(e) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        let val = e.target.value;
        let _this = this;
        if (isNaN(val)) {
            e.target.value = '';
            this.setState({ info: "*只能输入数字!" });
            setTimeout(function () {
                _this.setState({ info: "" });
            }.bind(this), 1000);
        } else {
            // let timeStr = (new Date()).valueOf();
            // this.setState({
            //     timeStr: timeStr
            // });
            // if (timeStr - this.state.timeStr > 500) {
            this.timer = setTimeout(function () {
                _this.findOrdernumIfExistAjax(_this.state.orderNum);
            }, 600);
            this.setState({
                orderNum: Number(e.target.value)
            });
            // }
        }
    }

    // 选择试卷
    onSelectLesTest(e) {
        if (Number(e.target.value) !== 0) {
            this.setState({
                examID: Number(e.target.value),
                exmaName: this.state.exam[Number(e.target.selectedIndex) - 1].paper_name
            });
        }
    }

    // 选择课时
    onLessonSelect(e) {
        let lessonId = Number(e.target.value);
        if (lessonId !== 0) {
            let flag = true;
            this.state.lesTestDetail.map((value) => {
                if (value.lessonId === lessonId) {
                    flag = false;
                }
            });
            if (flag) {
                this.setState({
                    lesFlag: flag,
                    lessonID: lessonId,
                    lesLessonName: this.props.lessons[Number(e.target.selectedIndex) - 1].name
                });
            } else {
                let _this = this;
                this.setState({
                    infoLes: "*该课时已选择,请选择别的课时",
                    lesFlag: flag,
                });
                setTimeout(function () {
                    _this.setState({ infoLes: "" });
                }.bind(this), 1500);
            }
        }
    }

    findOrdernumIfExistAjax(ordernum) {
        $.llsajax({
            url: "lesson/findOrdernumIfExist",
            type: "POST",
            async: true,
            data: {
                course_id: this.props.courseID,
                ordernum: ordernum,
                stage_ordernum: this.state.stageID
            },
            success: findOrdernumIfExistData => {
                if (findOrdernumIfExistData.flag === 1) {
                    this.setState({
                        info: "*该顺序已存在,其他顺序将顺延",
                        flagNum: 1
                    });
                } else {
                    this.setState({
                        info: "",
                        flagNum: 0
                    });
                }
            }
        })
    }

    // 继续添加
    continueToAdd() {
        let _this = this;
        if (this.state.typeID === 1) {
            if (this.state.lessonName !== '' && this.state.orderNum !== '') {
                this.setState({
                    isShowStageAll: false,
                });
                // 判断是否编辑
                if (this.state.isEdit) {
                    if (this.isStageRepeat('edit')) {
                        let editArr = this.state.saveArr.slice(0);
                        editArr.map((value, index) => {
                            if (this.state.editSerialNumber === index) {
                                value.name = this.state.lessonName;
                                value.ordernum = this.state.orderNum;
                            }
                        });
                        editArr.sort(function (a, b) {
                            return a.ordernum - b.ordernum
                        });
                        this.setState({
                            saveArr: editArr,
                            isEdit: false,
                        });
                        document.getElementById("lessonBox_lessonName").value = "";
                        document.getElementById("lessonBox_order").value = "";
                    } else {
                        this.setState({ info: "*明细里已存在该顺序!" });
                        setTimeout(function () {
                            _this.setState({ info: "" });
                        }.bind(this), 1000);
                    }
                } else {
                    if (this.isStageRepeat('add')) {
                        let saveArr = {
                            name: this.state.lessonName,
                            course_id: this.props.courseID,
                            ordernum: this.state.orderNum,
                            stage_ordernum: this.state.stageID
                        };
                        this.state.saveArr.push(saveArr);
                        this.state.saveArr.sort(function (a, b) {
                            return a.ordernum - b.ordernum
                        });
                        this.setState({
                            saveArr: this.state.saveArr,
                            setStage: this.state.stageID,
                            lessonName: '',
                            orderNum: '',
                            serialNumber: ++this.state.serialNumber,
                            info: ""
                        });
                        document.getElementById("lessonBox_lessonName").value = "";
                        document.getElementById("lessonBox_order").value = "";
                    } else {
                        this.setState({ info: "*明细里已存在该顺序!" });
                        setTimeout(function () {
                            _this.setState({ info: "" });
                        }.bind(this), 1000);
                    }
                }
            } else {
                if (this.state.orderNum === '') {
                    this.setState({ info: "*请输入顺序!" });
                    setTimeout(function () {
                        _this.setState({ info: "" });
                    }.bind(this), 1000);
                }
            }
        } else {
            if (this.state.lesFlag) {
                if (this.state.paperId !== 0 && this.state.lessonID !== 0) {
                    let lesTestDetail = {
                        lessonId: this.state.lessonID,
                        paperId: this.state.examID,
                        paperName: this.state.exmaName,
                        lessonName: this.state.lesLessonName,
                        stage_ordernum: this.state.stageID
                    };
                    let lesTestArr = {
                        lessonId: this.state.lessonID,
                        paperId: this.state.examID,
                    };
                    this.state.lesTestArr.push(lesTestArr);
                    this.state.lesTestDetail.push(lesTestDetail);
                    this.setState({
                        lesTestArr: this.state.lesTestArr,
                        lesTestDetail: this.state.lesTestDetail,
                        setStage: this.state.stageID,
                        examID: 0,
                        lessonID: 0,
                    });
                    document.getElementById("lessonBox_edit_lesTestPaperSelect").selectedIndex = 0;
                    document.getElementById("lessonBox_edit_lessonSelect").selectedIndex = 0;
                }
            }
        }
    }

    isStageRepeat(isEdit) {
        let flag = true;
        if (isEdit === 'edit') {
            for (let i = 0, len = this.state.saveArr.length; i < len; i++) {
                if (this.state.saveArr[i].ordernum === this.state.orderNum &&  i !== this.state.editSerialNumber) {
                    flag = false;
                    break;
                }
            }
        } else {
            for (let i = 0, len = this.state.saveArr.length; i < len; i++) {
                if (this.state.saveArr[i].ordernum === this.state.orderNum) {
                    flag = false;
                    break;
                }
            }
        }
        return flag;
    }

    render() {
        return (
            <div className="lessonBox-container">
                <div className="lessonBox-wrap">
                    <div className="lessonBox-title">
                        <span className="lessonBox-title-msg">添加</span>
                        <span className="iconfont icon-guanbi lessonBox-title-close" onClick={this.onCloseBox.bind(this)}></span>
                    </div>
                    <div className="lessonBox-center">
                        <div className="lessonBox-center-add">
                            <div className="lessonBox-center-title">
                                <span>所属专业：云计算应用开发</span>
                                <span>所属课程：表格的设计与开发</span>
                            </div>
                            <div className="lessonBox-center-type clearfix">
                                <p className="lessonBox-label"><i className="lessonBox-center-important">*</i>选择类型</p>
                                <span className={this.state.typeID === 1 ? "lessonBox-center-span lessonBox-center-span-type Active" : "lessonBox-center-span lessonBox-center-span-type"} onClick={this.onTypeClick.bind(this, 1)}>课时</span>
                                <span className={this.state.typeID === 2 ? "lessonBox-center-span lessonBox-center-span-type Active" : "lessonBox-center-span lessonBox-center-span-type"} onClick={this.onTypeClick.bind(this, 2)}>阶段考试</span>
                            </div>
                            <div className={this.state.typeID === 1 ? "lessonBox-lesson-box" : "lessonBox-lesson-box-none"}>
                                <div className="lessonBox-center-name clearfix">
                                    <p className="lessonBox-label"><i className="lessonBox-center-important">*</i>名称</p>
                                    <input type="text" id="lessonBox_lessonName" placeholder="请输入课时名字" onChange={this.onNameInput.bind(this)} />
                                </div>
                                <div className="lessonBox-center-stage clearfix">
                                    <p className="lessonBox-label"><i className="lessonBox-center-important">*</i>所处阶段</p>
                                    {this._showStage()}
                                </div>
                                <div className="lessonBox-center-order clearfix">
                                    <p className="lessonBox-label"><i className="lessonBox-center-important">*</i>所在顺序</p>
                                    <input type="text" id="lessonBox_order" onChange={this.onOrderChange.bind(this)} />
                                    <span className="lessonBox-center-error-msg">{this.state.info}</span>
                                </div>
                            </div>
                            <div className={this.state.typeID === 2 ? "lessonBox-lesson-box" : "lessonBox-lesson-box-none"}>
                                <div className="lessonBox-center-exam clearfix">
                                    <p className="lessonBox-label">选择试卷</p>
                                    <select name="0" id="lessonBox_edit_lesTestPaperSelect" onChange={this.onSelectLesTest.bind(this)}>
                                        <option value="">&nbsp;请选择试卷</option>
                                        {this._showExamPaper()}
                                    </select>
                                </div>
                                <div className="lessonBox-center-stage clearfix">
                                    <p className="lessonBox-label">所处阶段</p>
                                    {this._showStage()}
                                </div>
                                <div className="lessonBox-center-exam clearfix">
                                    <p className="lessonBox-label">在课时</p>
                                    <select name="" id="lessonBox_edit_lessonSelect" onChange={this.onLessonSelect.bind(this)}>
                                        <option value="0">&nbsp;请选择课时</option>
                                        {this.state._showlessonAfterArr}
                                    </select>
                                    <span className="lessonBox-lesson-after">之后</span>
                                    <span className="lessonBox-center-error-msgLes">{this.state.infoLes}</span>
                                </div>
                            </div>
                            <div className="lessonBox-center-addNew" onClick={this.continueToAdd.bind(this)}>
                                <i className="iconfont icon-jia"></i>
                                继续添加
                            </div>
                        </div>
                        <div className="lessonBox-center-detailed">
                            <h4>添加明细</h4>
                            <div className="lessonBox-detailed-content">
                                {
                                    this.state.typeID === 1 ?
                                        this._showDetailed()
                                        :
                                        this._showTestDetail()
                                }
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