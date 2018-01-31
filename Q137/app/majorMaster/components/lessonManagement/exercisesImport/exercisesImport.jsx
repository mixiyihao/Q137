import React, { Component } from 'react';
import $ from 'jquery';
import './exercisesImport.css';
import ExercisesImportBox from '../exercisesImportBox/exercisesImportBox.jsx';
import ShowExerciesBox from '../showExerciesBox/showExerciesBox.jsx';
import ExercisesEditBox from '../exercisesEditBox/exercisesEditBox.jsx';
import SelectLesson from '../selectLesson/selectLesson.jsx'; // 阶段学期下拉选择组件
import PaperSelect from '../../../public/pageSelect/pageSelect.jsx'; // 分页组件
import ruData from '../../../../headMasterComponents/ruData.js'; // 时间转换函数
import { getLessonName, getStageIndex } from '../../../util/methods.js';
import BombBox from '../../../../components/public/bombBox/bombBox.js';

/*
* 课堂练习组件
* css样式引用了课程目标guidanceImport.css的样式
* 修改的样式在exercisesImport.css里面
* */
export default class ExercisesImport extends Component {
    constructor() {
        super();
        this.state = {
            isImportBoxHidden: true,
            isShowBoxHidden: true,
            isEditBoxHidden: true,
            lessonID: 0, // 课时ID
            rows: [], // 数据
            page: 1, // 当前页数
            count: 0, // 总数
            total: 0, // 总页数
            stageIndex: 0, // 阶段
            lessonName: '', // 课时名字
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

    // 获取课堂练习信息 5 代表课堂练习
    findLessonDataPageAjax(lessonid,page) {
        $.llsajax({
            url: "lessonDate/findLessonDataPage",
            type: "POST",
            async: true,
            data: {
                type: 5,
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

    // 显示列表信息
    _showData() {
        return this.state.rows.map((value,index) => {
            return (
                <tr key={index}>
                    <td>{this.state.page - 1}{index === 9 ? 0 : index + 1}</td>
                    <td>{value.question}</td>
                    <td>{ruData(value.c_date,'-')}</td>
                    <td>
                        <span onClick={this.showPracticesDetail.bind(this,value.id)}>
                            <i className="iconfont icon-yulan"></i>
                            预览
                        </span>
                        <span onClick={this.editPracticesDetail.bind(this,value.id)}>
                            <i className="iconfont icon-bianji"></i>
                            编辑
                        </span>
                        <span onClick={this.onDeletePractice.bind(this,value.id)}>
                            <i className="iconfont icon-SHANCHU-"></i>
                            删除
                        </span>
                    </td>
                </tr>
            );
        });
    }

    // 预览练习题
    showPracticesDetail(id) {
        this.setState({
            practicesID: id,
            isShowBoxHidden: false,
        });
    }

    // 编辑练习题
    editPracticesDetail(id) {
        this.setState({
            practicesID: id,
            isEditBoxHidden: false,
        });
    }

    // 删除练习
    onDeletePractice(id) {
        this.setState({
            isHidden: false,
            practicesID: id,
            bombBoxMsg: '是否删除此课堂练习？'
        });
        
    }

    enterClick() {
        $.llsajax({
            url: "lesson/deletePractice",
            type: "POST",
            async: true,
            data: {
                id: this.state.practicesID
            },
            success: findLessonDataPageData => {
                this.findLessonDataPageAjax(this.state.lessonID,this.state.page);
                this.setState({
                    isHidden: true,
                    practicesID: 0,
                });
            }
        })
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

    addExercises () {
        this.setState({
            isImportBoxHidden: false
        });
    }

    onCloseBox() {
        this.setState({
            isImportBoxHidden: true,
            isShowBoxHidden: true,
            isEditBoxHidden: true,
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
            <div className="guidanceImport-wrap">
                <div className="guidanceImport-tool">
                    <SelectLesson
                        lessons={this.props.lessons}
                        onLessonChange={this.onLessonChange.bind(this)}
                        courseID={this.props.courseID}
                    />
                    <span className="commonButton button guidanceImport-tool-add" onClick={this.addExercises.bind(this)}>
                        <i className="iconfont icon-tianjiadaoshijuan"></i>新增练习
                    </span>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th className="one">排序</th>
                        <th className="three">问题</th>
                        <th className="two">录入时间</th>
                        <th className="three">操作</th>
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
                        <ExercisesImportBox
                            isImportBoxHidden={this.state.isImportBoxHidden}
                            onCloseBox={this.onCloseBox.bind(this)}
                            lessonID={this.state.lessonID}
                            onDeletePractice={this.onDeletePractice.bind(this)}
                            findLessonDataPageAjax={this.findLessonDataPageAjax.bind(this)}
                            name={this.props.name}
                            stageIndex={this.state.stageIndex}
                            lessonName={this.state.lessonName}
                        />
                }
                {
                    this.state.isShowBoxHidden ?
                        null
                        :
                        <ShowExerciesBox
                            onCloseBox={this.onCloseBox.bind(this)}
                            practicesID={this.state.practicesID}
                        />
                }
                {
                    this.state.isEditBoxHidden ?
                        null
                        :
                        <ExercisesEditBox
                            onCloseBox={this.onCloseBox.bind(this)}
                            practicesID={this.state.practicesID}
                            lessonID={this.state.lessonID}
                            findLessonDataPageAjax={this.findLessonDataPageAjax.bind(this)}
                            name={this.props.name}
                            stageIndex={this.state.stageIndex}
                            lessonName={this.state.lessonName}
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