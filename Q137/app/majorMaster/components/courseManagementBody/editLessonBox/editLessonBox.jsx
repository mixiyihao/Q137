import React, { Component} from 'react';
import $ from 'jquery';
import '../lessonBox/lessonBox.css';

export default class EditLessonBox extends Component {
    constructor() {
        super();
        this.state = {
            lessonName: '', // 课时名称
            orderNum: 0, // 所在顺序
            stageArr: ['第一阶段','第二阶段','第三阶段','第四阶段'],
            stageID: 1, // 阶段选择索引
            saveArr: [],
            setStage: 4, // 第一次选中阶段信息
            info: '', // 警告信息
            errorMsg: '', // 错误信息
            ordernum_Num: 0, // 顺序最大值
        }
    }

    componentWillMount() {
        this.props.lessons.map((value,index) => {
            if (value.id === this.props.lessonClickID) {
                this.setState({
                    lessonName: value.name,
                    stageID: value.stage_ordernum,
                    orderNum: value.ordernum
                });
            }
        });
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
            }
        })
    }

    // 关闭弹框
    onCloseBox() {
        this.props.onCloseBox();
    }

    onSaveData() {
        if (this.state.lessonName == "" || this.state.orderNum == "") {
            this.setState({errorMsg:"*信息不能为空!"});
            let _this = this;
            setTimeout(function(){
                _this.setState({errorMsg:""});
            }.bind(this),1000);
        } else {
            let saveArr = {
                name: this.state.lessonName,
                course_id: this.props.courseID,
                ordernum: this.state.orderNum,
                stage_ordernum: this.state.stageID,
                id: this.props.lessonClickID
            };
            this.state.saveArr.push(saveArr);
            let postData = {
                type: 1,
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
                    this.props.clearRadioCheck();
                    this.props.getCourseindex(this.props.courseID);
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
            this.findLessonOrdernumAjax(index);
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
        let val = e.target.value;
        let _this = this;
        if(isNaN(val)){
            e.target.value = '';
            this.setState({info:"*只能输入数字!"});
            setTimeout(function(){
                _this.setState({info:""});
            }.bind(this),1000);
        }else{
            this.setState({
                orderNum: Number(e.target.value)
            });
        }
    }

    render() {
        return (
            <div className="lessonBox-container">
                <div className="lessonBox-wrap">
                    <div className="lessonBox-title">
                        <span className="lessonBox-title-msg">编辑课时</span>
                        <span className="iconfont icon-guanbi lessonBox-title-close" onClick={this.onCloseBox.bind(this)}></span>
                    </div>
                    <div className="lessonBox-center">
                        <div className="lessonBox-center-edit">
                            <div className="lessonBox-center-title">
                                <span>所属专业：云计算应用开发</span>
                                <span>所属课程：表格的设计与开发</span>
                            </div>
                            <div className="lessonBox-lesson-box">
                                <div className="lessonBox-center-name clearfix">
                                    <p className="lessonBox-label"><i className="lessonBox-center-important">*</i>名称</p>
                                    <input defaultValue={this.state.lessonName} type="text" id="lessonBox_lessonName" placeholder="请输入课时名字" onChange={this.onNameInput.bind(this)}/>
                                </div>
                                <div className="lessonBox-center-stage clearfix">
                                    <p className="lessonBox-label">所处阶段</p>
                                    {this._showStage()}
                                </div>
                                <div className="lessonBox-center-order clearfix">
                                    <p className="lessonBox-label"><i className="lessonBox-center-important">*</i>所在顺序</p>
                                    <input defaultValue={this.state.orderNum} type="text" id="lessonBox_order" onChange={this.onOrderChange.bind(this)}/>
                                    <span className="lessonBox-center-error-msg">{this.state.info}</span>
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