import React, { Component } from 'react';
import $ from 'jquery';
import './guidanceImportBox.css';
import { _showStage } from '../../../util/methods.js';
// import Arabia_To_SimplifiedChinese from '../../../util/Arabia_To_SimplifiedChinese.js';

export default class GuidanceImportBox extends Component {
    constructor() {
        super();
        this.state = {
            isEdit: false, // 是否编辑
            isstageEdit: false, // 是否编辑步骤
            targetDetailEditIndex: 0, // 要被修改的课时目标明细的序号
            stageDetailEditIndex: 0, // 要被修改的目标步骤明细的序号
            stage: 0, // 步骤
            targetStr: '', // 目标信息
            ispoint: 1, // 是否重点
            ishard: 1, // 是否难点
            orderNum: '', // 顺序
            targetDetail: [], // 课时目标明细数据
            stepDetail: [], // 目标步骤明细
            info: '',
            infoVideo: '',
            objectives: 1, // 从属目标
            objectivesArr: 1, // 从属目标数组
            stepNameStr: '', // 步骤名称
            wayIndex: 1, // 默认实践 实践方式 0 视频 1 实践
            videoTime: 0, // 时长
            targetOrderNum: '', // 目标步骤顺序
        }
    }

    componentWillMount() {
        if (this.props.practiceID !== 0) {
            this.echoTargetAjax(this.props.practiceID);
        }
    }

    echoTargetAjax(id) {
        $.llsajax({
            url: "lessonDate/echoTarget",
            type: "POST",
            async: true,
            data: {
                targetid: id
            },
            success: echoTargetData => {
                document.getElementById("guidanceImportBox_target_textarea").value = echoTargetData.target.target;
                document.getElementById("lesson_target_orderNum").value = echoTargetData.target.ordernum;
                if (echoTargetData.target.ispoint === 1) {
                    document.getElementById("is_emphases").checked = true;
                    document.getElementById("not_emphases").checked = false;
                } else {
                    document.getElementById("not_emphases").checked = true;
                    document.getElementById("is_emphases").checked = false;
                }
                if (echoTargetData.target.ishard === 1) {
                    document.getElementById("is_difficulty").checked = true;
                    document.getElementById("not_difficulty").checked = false;
                } else {
                    document.getElementById("not_difficulty").checked = true;
                    document.getElementById("is_difficulty").checked = false;
                }
                this.setState({
                    ispoint: echoTargetData.target.ispoint,
                    ishard: echoTargetData.target.ishard,
                    targetStr: echoTargetData.target.target,
                    orderNum: echoTargetData.target.ordernum,
                    stepDetail: echoTargetData.target.teachguidances
                });
            }
        })
    }

    componentDidMount() {

    }

    onCloseBox() {
        this.props.onCloseBox();
    }

    onNextStage() {
        let _this = this;
        if (this.state.targetStr === '' || this.state.orderNum === '') {
            return false;
        }
        this.setState({
            stage: 1,
        });
        // 0 下一步 1 保存
        if (this.state.stage === 0) {
            // if (this.state.targetStr !== '' || this.state.orderNum !== '') {
            if (this.props.practiceID === 0) {
                let targetDetail = {
                    lessonId: this.props.lessonID,
                    target: this.state.targetStr,
                    ispoint: this.state.ispoint,
                    ishard: this.state.ishard,
                    ordernum: this.state.orderNum,
                    teachguidances: []
                };
                this.state.targetDetail.push(targetDetail);
                this.state.targetDetail.sort(function (a, b) {
                    return a.ordernum - b.ordernum
                });
                this.setState({
                    targetDetail: this.state.targetDetail,
                    objectives: this.state.targetDetail[0].ordernum,
                });
            } else {
                let targetDetail = {
                    id: this.props.practiceID,
                    lessonId: this.props.lessonID,
                    target: this.state.targetStr,
                    ispoint: this.state.ispoint,
                    ishard: this.state.ishard,
                    ordernum: this.state.orderNum,
                    teachguidances: []
                };
                this.state.targetDetail.push(targetDetail);
                this.state.targetDetail.sort(function (a, b) {
                    return a.ordernum - b.ordernum
                });
                this.setState({
                    targetDetail: this.state.targetDetail,
                    objectives: this.state.targetDetail[0].ordernum,
                });
            }
        } else {
            if (this.state.stepNameStr !== '' && this.state.targetOrderNum !== '') {
                if (this.state.isstageEdit) {
                    if (this.isStageRepeat('edit')) {
                        let editArr = this.state.stepDetail.slice(0);
                        editArr.map((value, index) => {
                            if (this.state.stageDetailEditIndex === index) {
                                value.ordernum = this.state.targetOrderNum;
                                value.step = this.state.stepNameStr;
                                value.way = this.state.wayIndex;
                                value.timelong = this.state.videoTime;
                                value.objectives = this.state.objectives;
                            }
                        });
                        editArr.sort(function (a, b) {
                            return a.ordernum - b.ordernum
                        });
                        this.setState({
                            isstageEdit: false,
                            stepDetail: editArr,
                            targetOrderNum: '',
                            stepNameStr: '',
                            isEdit: false,
                        });
                        document.getElementById("step_textarea").value = '';
                        document.getElementById("step_oredernum").value = '';
                        this.addOrUpdateTargetList();
                    } else {
                        this.setState({ info: "*配置信息里已存在该顺序!" });
                        setTimeout(function () {
                            _this.setState({ info: "" });
                        }.bind(this), 1000);
                    }
                } else {
                    if (this.isStageRepeat('add')) {
                        let stepDetail = {
                            ordernum: this.state.targetOrderNum,
                            step: this.state.stepNameStr,
                            way: this.state.wayIndex,
                            timelong: this.state.videoTime,
                            objectives: this.state.objectives
                        };
                        this.state.stepDetail.push(stepDetail);
                        this.setState({
                            stepDetail: this.state.stepDetail,
                            targetOrderNum: '',
                            stepNameStr: ''
                        });
                        this.addOrUpdateTargetList();
                        document.getElementById("step_textarea").value = '';
                        document.getElementById("step_oredernum").value = '';
                    } else {
                        this.setState({ info: "*配置信息里已存在该顺序!" });
                        setTimeout(function () {
                            _this.setState({ info: "" });
                        }.bind(this), 1000);
                    }
                }
                
            }
        }
    }

    // 保存课时目标 0 添加 1 修改
    addOrUpdateTargetList() {
        this.state.targetDetail.map((value, index) => {
            this.state.stepDetail.map((stepDetailValue, stepDetailIndex) => {
                value.teachguidances.push(stepDetailValue);
            });
        });
        let postData = {
            type: this.props.practiceID === 0 ? 0 : 1,
            targetList: this.state.targetDetail
        };
        $.llsajax({
            url: "lessonDate/addOrUpdateTargetList",
            type: "POST",
            async: true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(postData),
            success: addOrUpdateTargetList => {
                this.props.onCloseBox();
                this.props.findLessonDataPageAjax(this.props.lessonID, 1);
            }
        })
    }

    // 课时目标录入
    onLessonTargetChange(e) {
        let val = e.target.value;
        if (val.length > 100) {
            e.target.value = val.substring(0, 100);
        } else {
            this.setState({
                targetStr: val
            });
        }
    }

    // 是否重点
    onEmphases(index) {
        this.setState({
            ispoint: index
        });
    }

    // 是否难点
    onDifficulty(index) {
        this.setState({
            ishard: index
        });
    }

    // 顺序录入
    onOrderChange(e) {
        let val = e.target.value;
        let _this = this;
        if (isNaN(val)) {
            e.target.value = '';
            this.setState({ info: "*只能输入数字!" });
            setTimeout(function () {
                _this.setState({ info: "" });
            }.bind(this), 1000);
        } else {
            this.setState({
                orderNum: Number(e.target.value)
            });
        }
    }

    // 显示课时目标明细
    // _showTargetDetail() {
    //     return this.state.targetDetail.map((value, index) => {
    //         return (
    //             <div className="guidanceImportBox-detailed-card" key={index}>
    //                 <p title={value.target}>课时目标：{value.target}</p>
    //                 <p>是否重点：{value.ispoint === 1 ? "重点" : "非重点"}</p>
    //                 <p>是否难点：{value.ishard === 1 ? "难点" : "非难点"}</p>
    //                 <p>所在顺序：{value.ordernum}</p>
    //                 <div className="guidanceImportBox-detailed-button">
    //                     <span className="commonButton button" onClick={this.editTargetDetail.bind(this,index,1,value)}><i className="iconfont icon-bianji"></i>编辑</span>
    //                     <span className="commonButton button" onClick={this.onTargetDetail.bind(this, index,1)}>
    //                         <i className="iconfont icon-SHANCHU-"></i>
    //                         删除
    //                     </span>
    //                 </div>
    //             </div>
    //         );
    //     });
    // }

    // 显示目标步骤明细
    _showStageDetail() {
        return this.state.stepDetail.map((value, index) => {
            return (
                <div className="guidanceImportBox-detailed-card clearfix" key={index}>
                    <p title={value.target}>步骤名称：{value.step}</p>
                    {/*<p>从属目标：{Arabia_To_SimplifiedChinese(value.objectives)}</p>*/}
                    <p>实践方式：{value.way === 1 ? "实践" : "视频"}</p>
                    {
                        value.way === 1 ?
                            null
                            :
                            <p>所需时长：{value.timelong}</p>
                    }
                    <p>所在顺序：{value.ordernum}</p>
                    <div className="guidanceImportBox-detailed-button">
                        <span className="commonButton button" onClick={this.editTargetDetail.bind(this, index, 2, value)}><i className="iconfont icon-bianji"></i>编辑</span>
                        <span className="commonButton button" onClick={this.onTargetDetail.bind(this, index, 2)}>
                            <i className="iconfont icon-SHANCHU-"></i>
                            删除
                        </span>
                    </div>
                </div>
            );
        });
    }

    // 修改课时目标明细 1 课时目标明细修改 2 步骤明细修改
    editTargetDetail(index, flag, value) {
        // if (flag === 1) {
        //     document.getElementById("guidanceImportBox_target_textarea").value = value.target;
        //     document.getElementById("lesson_target_orderNum").value = value.ordernum;
        //     if (value.ispoint === 1) {
        //         document.getElementById("is_emphases").checked = true;
        //         document.getElementById("not_emphases").checked = false;
        //     } else {
        //         document.getElementById("not_emphases").checked = true;
        //         document.getElementById("is_emphases").checked = false;
        //     }
        //     if (value.ishard === 1) {
        //         document.getElementById("is_difficulty").checked = true;
        //         document.getElementById("not_difficulty").checked = false;
        //     } else {
        //         document.getElementById("not_difficulty").checked = true;
        //         document.getElementById("is_difficulty").checked = false;
        //     }
        //     this.setState({
        //         targetDetailEditIndex: index,
        //         isEdit: true,
        //         ispoint: value.ispoint,
        //         ishard: value.ishard,
        //         targetStr: value.target,
        //         orderNum: value.ordernum
        //     });
        // } else {
        document.getElementById("step_textarea").value = value.step;
        // document.getElementById("step_select").value = value.objectives;
        document.getElementById("step_oredernum").value = value.ordernum;
        if (value.way === 1) {
            document.getElementById("not_video").checked = true;
            document.getElementById("is_video").checked = false;
        } else {
            document.getElementById("is_video").checked = true;
            document.getElementById("not_video").checked = false;
            document.getElementById("step_timelong").value = value.timelong;
        }
        this.setState({
            stageDetailEditIndex: index,
            isstageEdit: true,
            targetOrderNum: value.ordernum,
            stepNameStr: value.step,
            wayIndex: value.way,
            videoTime: value.timelong,
            objectives: value.objectives,
        });
        // }
    }

    // 删除选中的专业配置信息 1 课时目标明细删除 2 步骤明细删除
    onTargetDetail(index, flag) {
        if (flag === 1) {
            this.state.targetDetail.splice(index, 1);
            this.setState({
                targetDetail: this.state.targetDetail
            });
        } else {
            this.state.stepDetail.splice(index, 1);
            this.setState({
                stepDetail: this.state.stepDetail
            });
        }
    }

    // 显示从属目标
    // _showSubordinate() {
    //     return this.state.targetDetail.map((value,index) => {
    //         return (
    //             <option key={index} value={value.ordernum}>&nbsp;{Arabia_To_SimplifiedChinese(value.ordernum)}</option>
    //         );
    //     });
    // }

    // 步骤名称录入
    stepNameChange(e) {
        let val = e.target.value;
        if (val.length > 50) {
            e.target.value = val.substring(0, 50);
        } else {
            this.setState({
                stepNameStr: val
            });
        }
    }

    // 从属目标选择
    // subordinateSelect(e) {
    //     this.state.objectives = Number(e.target.value);
    //     this.setState({
    //         objectives: this.state.objectives
    //     });
    // }

    // 实践方式选择
    onVideoSelect(index) {
        this.setState({
            wayIndex: Number(index),
        });
    }

    // 时长录入
    videoTimeChange(e) {
        // let val = e.target.value;
        // let _this = this;
        // if (isNaN(val)) {
        //     e.target.value = '';
        //     this.setState({infoVideo: "*只能输入数字!"});
        //     setTimeout(function () {
        //         _this.setState({infoVideo: ""});
        //     }.bind(this), 1000);
        // } else {
        this.setState({
            videoTime: Number(e.target.value)
        });
        // }
    }

    // 目标步骤顺序选择
    onTargetOrderChange(e) {
        let val = e.target.value;
        let _this = this;
        if (isNaN(val)) {
            e.target.value = '';
            this.setState({ info: "*只能输入数字!" });
            setTimeout(function () {
                _this.setState({ info: "" });
            }.bind(this), 1000);
        } else {
            this.setState({
                targetOrderNum: Number(val)
            });
        }
    }

    // 继续添加 1 课时目标 2 目标步骤
    onAddNew() {
        // if (index === 1) {
        //     // this.addTargetDetail();
        // } else {
        this.addStepDetail();
        // }
    }

    // 课时目标继续添加&修改
    // addTargetDetail() {
    //     let _this = this;
    //     if (this.state.targetStr !== '' && this.state.orderNum !== '') {
    //         // 判断是否是修改
    //         if (this.state.isEdit) {
    //             // 判断添加的顺序是否重复
    //             if (this.isRepeat('edit')) {
    //                 let editArr = this.state.targetDetail.slice(0);
    //                 editArr.map((value,index) => {
    //                     if (this.state.targetDetailEditIndex === index) {
    //                         value.target = this.state.targetStr;
    //                         value.ispoint = this.state.ispoint;
    //                         value.ishard = this.state.ishard;
    //                         value.ordernum = this.state.orderNum;
    //                     }
    //                 });
    //                 editArr.sort(function(a,b){
    //                     return a.ordernum - b.ordernum
    //                 });
    //                 this.setState({
    //                     targetDetail: editArr,
    //                     targetStr: '',
    //                     orderNum: '',
    //                     isEdit: false,
    //                 });
    //                 document.getElementById("guidanceImportBox_target_textarea").value = '';
    //                 document.getElementById("lesson_target_orderNum").value = '';
    //             } else {
    //                 this.setState({info: "*配置信息里已存在该顺序!"});
    //                 setTimeout(function () {
    //                     _this.setState({info: ""});
    //                 }.bind(this), 1000);
    //             }
    //         } else {
    //             if (this.isRepeat('add')) {
    //                 let targetDetail = {
    //                     lessonId: this.props.lessonID,
    //                     target: this.state.targetStr,
    //                     ispoint: this.state.ispoint,
    //                     ishard: this.state.ishard,
    //                     ordernum: this.state.orderNum,
    //                     teachguidances: []
    //                 };
    //                 this.state.targetDetail.push(targetDetail);
    //                 this.state.targetDetail.sort(function(a,b){
    //                     return a.ordernum - b.ordernum
    //                 });
    //                 this.setState({
    //                     targetDetail: this.state.targetDetail,
    //                     targetStr: '',
    //                     orderNum: '',
    //                 });
    //                 document.getElementById("guidanceImportBox_target_textarea").value = '';
    //                 document.getElementById("lesson_target_orderNum").value = '';
    //             } else {
    //                 this.setState({info: "*配置信息里已存在该顺序!"});
    //                 setTimeout(function () {
    //                     _this.setState({info: ""});
    //                 }.bind(this), 1000);
    //             }
    //         }
    //     }
    // }

    // 目标步骤继续添加&修改
    addStepDetail() {
        let _this = this;
        if (this.state.stepNameStr !== '' && this.state.targetOrderNum !== '') {
            if (this.state.isstageEdit) {
                if (this.isStageRepeat('edit')) {
                    let editArr = this.state.stepDetail.slice(0);
                    editArr.map((value, index) => {
                        if (this.state.stageDetailEditIndex === index) {
                            value.ordernum = this.state.targetOrderNum;
                            value.step = this.state.stepNameStr;
                            value.way = this.state.wayIndex;
                            value.timelong = this.state.videoTime;
                            value.objectives = this.state.objectives;
                        }
                    });
                    editArr.sort(function (a, b) {
                        return a.ordernum - b.ordernum
                    });
                    this.setState({
                        isstageEdit: false,
                        stepDetail: editArr,
                        targetOrderNum: '',
                        stepNameStr: '',
                        isEdit: false,
                    });
                    document.getElementById("step_textarea").value = '';
                    document.getElementById("step_oredernum").value = '';
                } else {
                    this.setState({ info: "*配置信息里已存在该顺序!" });
                    setTimeout(function () {
                        _this.setState({ info: "" });
                    }.bind(this), 1000);
                }
            } else {
                if (this.isStageRepeat('add')) {
                    let stepDetail = {
                        ordernum: this.state.targetOrderNum,
                        step: this.state.stepNameStr,
                        way: this.state.wayIndex,
                        timelong: this.state.videoTime,
                        objectives: this.state.objectives
                    };
                    this.state.stepDetail.push(stepDetail);
                    this.setState({
                        stepDetail: this.state.stepDetail,
                        targetOrderNum: '',
                        stepNameStr: ''
                    });
                    document.getElementById("step_textarea").value = '';
                    document.getElementById("step_oredernum").value = '';
                } else {
                    this.setState({ info: "*配置信息里已存在该顺序!" });
                    setTimeout(function () {
                        _this.setState({ info: "" });
                    }.bind(this), 1000);
                }
            }
        }
    }

    // 判断目标步骤顺序是否重复
    isStageRepeat(isEdit) {
        let flag = true;
        if (isEdit === 'edit') {
            for (let i = 0, len = this.state.stepDetail.length; i < len; i++) {
                if (this.state.stepDetail[i].ordernum === this.state.targetOrderNum && this.state.stepDetail[i].objectives === this.state.objectives && i !== this.state.stageDetailEditIndex) {
                    flag = false;
                    break;
                }
            }
        } else {
            for (let i = 0, len = this.state.stepDetail.length; i < len; i++) {
                if (this.state.stepDetail[i].ordernum === this.state.targetOrderNum && this.state.stepDetail[i].objectives === this.state.objectives) {
                    flag = false;
                    break;
                }
            }
        }
        return flag;
    }

    // 判断顺序是否重复
    // isRepeat(isEdit) {
    //     let flag = true;
    //     if (isEdit === 'edit') {
    //         for (let i = 0, len = this.state.targetDetail.length; i < len; i++) {
    //             if (this.state.targetDetail[i].ordernum === this.state.orderNum && i !== this.state.targetDetailEditIndex) {
    //                 flag = false;
    //                 break;
    //             }
    //         }
    //     } else {
    //         for (let i = 0, len = this.state.targetDetail.length; i < len; i++) {
    //             if (this.state.targetDetail[i].ordernum === this.state.orderNum) {
    //                 flag = false;
    //                 break;
    //             }
    //         }
    //     }
    //     return flag;
    // }

    render() {
        return (
            <div className="guidanceImportBox-container">
                <div className="guidanceImportBox-wrap">
                    <div className="guidanceImportBox-title">
                        <span className="guidanceImportBox-title-title-msg">添加课时目标</span>
                        <span className="iconfont icon-guanbi guidanceImportBox-title-title-close" onClick={this.onCloseBox.bind(this)}></span>
                    </div>
                    <div className="guidanceImportBox-step">
                        <div
                            className={this.state.stage === 0 ? "guidanceImportBox-step-one" : "guidanceImportBox-step-one-dif"}>
                            第一步：新增课时目标
                            <span className={this.state.stage === 0 ? "guidanceImportBox-step-triangle-one" : "guidanceImportBox-step-triangle-one-dif"}></span>
                        </div>
                        <div
                            className={this.state.stage === 1 ? "guidanceImportBox-step-two-dif" : "guidanceImportBox-step-two"}>
                            第二步：新增目标步骤
                            <span className={this.state.stage === 1 ? "guidanceImportBox-step-triangle-two-dif" : "guidanceImportBox-step-triangle-two"}></span>
                        </div>
                    </div>
                    <div className="guidanceImportBox-content">
                        <div className={this.state.stage === 0 ? "guidanceImportBox-content-left-diff" : "guidanceImportBox-content-left-none"}>
                            <div className="guidanceImportBox-content-msg">
                                <span>所属课程：{this.props.name}</span>
                                <span>所属阶段：{_showStage(this.props.stageIndex)}</span>
                                <span>所属课时：{this.props.lessonName}</span>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>课时目标
                                </p>
                                <textarea className="guidanceImportBox-target-textarea" id="guidanceImportBox_target_textarea" onChange={this.onLessonTargetChange.bind(this)}></textarea>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>是否重点
                                </p>
                                <span className="guidanceImportBox-emphases">
                                    <input type="radio" id="is_emphases" name="emphases" defaultChecked={true} onClick={this.onEmphases.bind(this, 1)} />
                                    <label htmlFor="is_emphases">重点</label>
                                </span>
                                <span className="guidanceImportBox-emphases">
                                    <input type="radio" id="not_emphases" name="emphases"
                                        onClick={this.onEmphases.bind(this, 0)} />
                                    <label htmlFor="not_emphases">非重点</label>
                                </span>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>是否难点
                                </p>
                                <span className="guidanceImportBox-emphases">
                                    <input type="radio" id="is_difficulty" name="difficulty" defaultChecked={true}
                                        onClick={this.onDifficulty.bind(this, 1)} />
                                    <label htmlFor="is_difficulty">难点</label>
                                </span>
                                <span className="guidanceImportBox-emphases">
                                    <input type="radio" id="not_difficulty" name="difficulty"
                                        onClick={this.onDifficulty.bind(this, 0)} />
                                    <label htmlFor="not_difficulty">非难点</label>
                                </span>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>所在顺序
                                </p>
                                <input type="text" className="guidanceImportBox-order" id="lesson_target_orderNum"
                                    onChange={this.onOrderChange.bind(this)} />
                                <span className="guidanceImportBox-error-msg">{this.state.info}</span>
                            </div>
                        </div>
                        <div className={this.state.stage === 1 ? "guidanceImportBox-content-left" : "guidanceImportBox-content-left-none"}>
                            <div className="guidanceImportBox-content-msg">
                                <span>所属课程：{this.props.name}</span>
                                <span>所属阶段：{_showStage(this.props.stageIndex)}</span>
                                <span>所属课时：{this.props.lessonName}</span>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>步骤名称
                                </p>
                                <textarea className="guidanceImportBox-target-textarea" id="step_textarea" onChange={this.stepNameChange.bind(this)}></textarea>
                            </div>
                            {/*<div className="guidanceImportBox-target clearfix">*/}
                            {/*<p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>从属目标*/}
                            {/*</p>*/}
                            {/*<select name="" id="step_select" className="guidanceImportBox-select" onChange={this.subordinateSelect.bind(this)}>*/}
                            {/*{this._showSubordinate()}*/}
                            {/*</select>*/}
                            {/*</div>*/}
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>实践方式
                                </p>
                                <span className="guidanceImportBox-emphases">
                                    <input type="radio" id="not_video" name="video" defaultChecked={true} onClick={this.onVideoSelect.bind(this, 1)} />
                                    <label htmlFor="not_video">实践</label>
                                </span>
                                <span className="guidanceImportBox-emphases">
                                    <input type="radio" id="is_video" name="video" onClick={this.onVideoSelect.bind(this, 0)} />
                                    <label htmlFor="is_video">视频</label>
                                </span>
                            </div>
                            <div className={this.state.wayIndex === 1 ? "guidanceImportBox-target-none" : "guidanceImportBox-target clearfix"}>
                                <p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>所需时长
                                </p>
                                <input type="text" id="step_timelong" className="guidanceImportBox-time-input" onChange={this.videoTimeChange.bind(this)} />
                                <span className="guidanceImportBox-error-msg">{this.state.infoVideo}</span>
                            </div>
                            <div className="guidanceImportBox-target clearfix">
                                <p className="guidanceImportBox-label"><i className="guidanceImportBox-important">*</i>所在顺序
                                </p>
                                <input type="text" className="guidanceImportBox-order" id="step_oredernum" onChange={this.onTargetOrderChange.bind(this)} />
                                <span className="guidanceImportBox-error-msg">{this.state.info}</span>
                            </div>
                            <div className={this.state.wayIndex === 1 ? "guidanceImportBox-addNew" : "guidanceImportBox-addNew diff"} onClick={this.onAddNew.bind(this, 2)}>
                                <i className="iconfont icon-jia"></i>
                                继续添加
                            </div>
                        </div>
                        {
                            this.state.stage === 0 ?
                                null
                                :
                                <div className="guidanceImportBox-content-right">
                                    <h4>目标步骤</h4>
                                    <div className="guidanceImportBox-detailed-content">
                                        {this._showStageDetail()}
                                    </div>
                                </div>
                        }
                    </div>
                    <div className="guidanceImportBox-button">
                        <span className="guidanceImportBox-button-cancel" onClick={this.onCloseBox.bind(this)}>取消</span>
                        <span className="commonButton button guidanceImportBox-button-next"
                            onClick={this.onNextStage.bind(this)}>{this.state.stage === 0 ? "下一步" : "保存"}</span>
                    </div>
                </div>
            </div>
        );
    }
}