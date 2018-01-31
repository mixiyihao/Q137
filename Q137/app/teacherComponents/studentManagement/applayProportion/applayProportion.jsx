import React, { Component } from 'react';
import $ from 'jquery';
import './applayProportion.css';

export default class ApplayProportion extends Component {
    constructor() {
        super();
        this.state = {
            lenovo: 0,
            reward: 0,
            school: 0,
            schoolLe: 0,
            checkWork: 0,
            errorMsg: ""
        }
    }
    componentDidMount() {
        this.setState({
            lenovo: this.props.examscore,
            reward: this.props.reward,
            school: this.props.schoolscore,
            schoolLe: this.props.schooleval,
            checkWork: this.props.checkwork,
        });
        $("html").css("overflow-y","hidden");
    }
    onApplayHide() {
        this.props.onApplayHide();
    }
    onCalculation() {
        if (this.refs.applayProportion_lenovo.value !== "" && Number(this.refs.applayProportion_lenovo.value) !== this.state.lenovo) {
            this.setState({
                lenovo: Number(this.refs.applayProportion_lenovo.value)
            });
        }
        if (this.refs.applayProportion_reward.value !== "" && Number(this.refs.applayProportion_reward.value) !== this.state.reward) {
            this.setState({
                reward: Number(this.refs.applayProportion_reward.value)
            });
        }
        if (this.refs.applayProportion_school.value !== "" && Number(this.refs.applayProportion_school.value) !== this.state.school) {
            this.setState({
                school: Number(this.refs.applayProportion_school.value)
            });
        }
        if (this.refs.applayProportion_schoolLe.value !== "" && Number(this.refs.applayProportion_schoolLe.value) !== this.state.schoolLe) {
            this.setState({
                schoolLe: Number(this.refs.applayProportion_schoolLe.value)
            });
        }
        if (this.refs.applayProportion_checkWork.value !== "" && Number(this.refs.applayProportion_checkWork.value) !== this.state.checkWork) {
            this.setState({
                checkWork: Number(this.refs.applayProportion_checkWork.value)
            });
        }
    }
    isInteger(num) {
        return num % 1 === 0
    }
    onSubmit() {
        if (this.isInteger(this.state.lenovo) && this.isInteger(this.state.school) && this.isInteger(this.state.schoolLe) && this.isInteger(this.state.checkWork) && this.isInteger(this.state.reward)) {
            if (this.state.lenovo + this.state.school + this.state.schoolLe + this.state.checkWork + this.state.reward === 100) {
                $.llsajax({
                    url: 'classmaster/applyExamProportion',
                    type: "POST",
                    async: true,
                    data: {
                        class_id: this.props.classID,
                        examscore: this.state.lenovo,
                        schoolscore: this.state.school,
                        schooleval: this.state.schoolLe,
                        checkwork: this.state.checkWork,
                        reward: this.state.reward
                    },
                    success: applyExamProportion => {
                        this.props.onApplayHide();
                    }
                });
            } else {
                this.setState({
                    errorMsg: "请各项比重加一起总和为100%"
                });
                setTimeout(()=>{
                    this.setState({
                        errorMsg: ""
                    });
                },3000);
            }
        } else {
            this.setState({
                errorMsg: "请输入整数"
            });
            setTimeout(()=>{
                this.setState({
                    errorMsg: ""
                });
            },3000);
        }
    }
    render() {
        return (
            <div className="applayProportion_box">
                <div className="applayProportion_Center" onChange={this.onCalculation.bind(this)}>
                    <div className="applayProportion_title">
                        申请成绩比重
                        <span className="applayProportion_close iconfont icon-guanbi" onClick={this.onApplayHide.bind(this)}>

                        </span>
                    </div>
                    <div className="applayProportion_top">
                        <i className="iconfont icon-dingwei">

                        </i>
                        <span className="applayProportion_topSchool">学校：{this.props.schoolName || '--'}</span>
                        <span className="applayProportion_topMajor">专业：{this.props.majorName || '--'}</span>
                        <span className="applayProportion_topClass">班级：{this.props.className || '--'}</span>
                    </div>
                    <p>*各项比重加一起总和为100%</p>
                    <div className="applayProportion_msgCenter">
                        <div className="applayProportion_lenovo">
                            <span>联想成绩平均分：</span>
                            <input defaultValue={this.props.examscore} ref="applayProportion_lenovo" type="text"/>%
                        </div>
                        <div className="applayProportion_lenovo applayProportion_lenovo2">
                            <span>奖罚的分：</span>
                            <input defaultValue={this.props.reward} ref="applayProportion_reward" type="text"/>%
                        </div>
                        <div className="applayProportion_lenovo">
                            <span>学校成绩平均分：</span>
                            <input defaultValue={this.props.schoolscore} ref="applayProportion_school" type="text"/>%
                        </div>
                        <div className="applayProportion_lenovo applayProportion_lenovo3">
                            <span>学校综合评价：</span>
                            <input defaultValue={this.props.schooleval} ref="applayProportion_schoolLe" type="text"/>%
                        </div>
                        <div className="applayProportion_lenovo applayProportion_lenovo2">
                            <span>考勤成绩：</span>
                            <input defaultValue={this.props.checkwork} ref="applayProportion_checkWork" type="text"/>%
                        </div>
                    </div>
                    <div className="applayProportion_button">
                        <span onClick={this.onApplayHide.bind(this)}>取消</span>
                        <span className="commonButton button" onClick={this.onSubmit.bind(this)}>提交申请</span>
                    </div>
                    <p className="applayProportion_errorMsg">{this.state.errorMsg}</p>
                </div>
            </div>
        );
    }
    componentWillUnmount() {
        $("html").css("overflow-y","auto");
    }
}