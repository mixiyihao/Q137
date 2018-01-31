import React, { Component } from 'react';
import $ from 'jquery';
import './guidanceImport.css';
import SelectLesson from '../selectLesson/selectLesson.jsx'; // 阶段学期下拉选择组件
import GuidanceImportBox from '../guidanceImportBox/guidanceImportBox.jsx'; // 学习指导录入弹框
import GuidanceShowBox from '../guidanceShowBox/guidanceShowBox.jsx'; // 学习指导显示弹框
import PaperSelect from '../../../public/pageSelect/pageSelect.jsx'; // 分页组件
import { getLessonName, getStageIndex } from '../../../util/methods.js';
import BombBox from '../../../../components/public/bombBox/bombBox.js';

/*
* 学习指导录入组件
* */
export default class GuidanceImport extends Component {
    constructor() {
        super();
        this.state = {
            lessonID: 0, // 课时ID
            isImportBoxHidden: true,
            isShowBoxHidden: true,
            rows: [], // 数据
            page: 1, // 当前页数
            count: 0, // 总数
            total: 0, // 总页数
            targetID: 0, // 目标ID
            stageIndex: 0, // 阶段信息
            lessonName: '', // 课时名称
            practiceID: 0,
            bombBoxMsg: '', // 弹框文案
            isHidden: true, // 确定弹框是否显示
        }
    }

    componentWillMount() {
        this.setState({
            lessonID: this.props.lessonID
        });
        this.findLessonDataPageAjax(this.props.lessonID,this.state.page);
    }

    componentDidMount() {
        this.setState({
            lessonName: getLessonName(this.props.lessons,this.state.lessonID),
            stageIndex: getStageIndex(this.props.lessons,this.state.lessonID), // 获取最小阶段作为默认阶段
        });
    }

    // 获取学习指导信息 1 代表学习指导
    findLessonDataPageAjax(lessonid,page) {
        $.llsajax({
            url: "lessonDate/findLessonDataPage",
            type: "POST",
            async: true,
            data: {
                type: 1,
                lessonid: lessonid,
                page: page
            },
            success: findLessonDataPageData => {
                this.setState({
                    rows: findLessonDataPageData.data.rows,
                    page: findLessonDataPageData.data.page,
                    count: findLessonDataPageData.data.count,
                    total: findLessonDataPageData.data.total
                });
            }
        })
    }

    //这是点击上一页执行的函数
    showPre() {
        if (this.state.page > 1) {
            this.setState({
                page: --this.state.page
            });
            this.findLessonDataPageAjax(this.state.lessonID,this.state.page);
        }
    }
    //这是点击下一页执行的函数
    showNext() {
        if (this.state.count === this.state.page) {
            return false;
        } else {
            this.setState({
                page: ++this.state.page
            });
            this.findLessonDataPageAjax(this.state.lessonID,this.state.page);
        }
    }

    _showData() {
        return this.state.rows.map((value,index) => {
            return (
                <tr key={index}>
                    <td>{index === 9 ? this.state.page : this.state.page - 1}{index === 9 ? 0 : index + 1}</td>
                    <td>{value.target}</td>
                    <td>{value.ispoint === 1 ? "是" : "否"}</td>
                    <td>{value.ishard === 1 ? "是" : "否"}</td>
                    <td>{value.teachguidancenum}</td>
                    <td>
                        <span onClick={this.onEchoTarget.bind(this,value.id)}>
                            <i className="iconfont icon-yulan"></i>
                            预览
                        </span>
                        <span onClick={this.addTarget.bind(this,value.id)}>
                            <i className="iconfont icon-bianji"></i>
                            编辑
                        </span>
                        <span onClick={this.onDeletetarget.bind(this,value.id)}>
                            <i className="iconfont icon-SHANCHU-"></i>
                            删除
                        </span>
                    </td>
                </tr>
            );
        });
    }

    // 删除目标
    onDeletetarget(id) {
        this.setState({
            isHidden: false,
            targetID: id,
            bombBoxMsg: '是否删除此课时目标？'
        });
    }

    enterClick() {
        $.llsajax({
            url: "lessonDate/deleteTarget",
            type: "POST",
            async: true,
            data: {
                targetid: this.state.targetID
            },
            success: deleteTargetData => {
                this.findLessonDataPageAjax(this.state.lessonID,1);
                this.setState({
                    targetID: 0,
                    isHidden: true,
                });
            }
        })
    }

    // 预览目标
    onEchoTarget(id) {
        this.setState({
            isShowBoxHidden: false,
            targetID: id
        });
    }

    // 新增目标
    addTarget(id) {
        this.setState({
            isImportBoxHidden: false,
            practiceID: id
        });
    }

    // 关闭弹框
    onCloseBox() {
        this.setState({
            isImportBoxHidden: true,
            isShowBoxHidden: true,
            practiceID: 0,
        });
    }

    // 获取所属课时ID
    onLessonChange(lessonID,stageIndex) {
        this.findLessonDataPageAjax(lessonID,1);
        this.props.saveLessonID(lessonID);
        this.setState({
            stageIndex: stageIndex,
            lessonID: lessonID,
            lessonName: getLessonName(this.props.lessons,lessonID),
        });
    }

    // 确认弹框消失事件
    hideClick() {
        this.setState({
            targetID: 0,
            isHidden: true,
        });
    }

    render() {
        return (
            <div className="guidanceImport-wrap clearfix">
                <div className="guidanceImport-tool">
                    <SelectLesson
                        lessons={this.props.lessons}
                        onLessonChange={this.onLessonChange.bind(this)}
                        courseID={this.props.courseID}
                    />
                    <span className="commonButton button guidanceImport-tool-add" onClick={this.addTarget.bind(this,0)}>
                        <i className="iconfont icon-tianjiadaoshijuan"></i>新增目标
                    </span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="one">排序</th>
                            <th className="two">课时目标</th>
                            <th className="three">是否重点</th>
                            <th className="three">是否难点</th>
                            <th className="three">目标步骤数量</th>
                            <th className="four">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this._showData()}
                    </tbody>
                </table>
                <div className={this._showData().length === 0 ? "guidanceImport-table-noData" : "guidanceImport-table-noData-hide"}>没有查询结果</div>
                <PaperSelect
                    page={this.state.page}
                    count={this.state.count}
                    total={this.state.total}
                    showPre={this.showPre.bind(this)}
                    showNext={this.showNext.bind(this)}
                />
                {
                    this.state.isImportBoxHidden ?
                        null
                        :
                        <GuidanceImportBox
                            lessonID={this.state.lessonID}
                            isImportBoxHidden={this.state.isImportBoxHidden}
                            onCloseBox={this.onCloseBox.bind(this)}
                            stageIndex={this.state.stageIndex}
                            lessonName={this.state.lessonName}
                            name={this.props.name}
                            practiceID={this.state.practiceID}
                            findLessonDataPageAjax={this.findLessonDataPageAjax.bind(this)}
                        />
                }
                {
                    this.state.isShowBoxHidden ?
                        null
                        :
                        <GuidanceShowBox
                            onCloseBox={this.onCloseBox.bind(this)}
                            targetID={this.state.targetID}
                            stageIndex={this.state.stageIndex}
                            lessonName={this.state.lessonName}
                            name={this.props.name}
                        />
                }
                <BombBox
                    enterClick={this.enterClick.bind(this)}
                    hideClick={this.hideClick.bind(this)}
                    bombBoxMsg={this.state.bombBoxMsg}
                    isHidden={this.state.isHidden}
                />
            </div>
        );
    }
}