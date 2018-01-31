import React, { Component } from 'react';
import $ from 'jquery';
import './homeWorkImport.css';
import SelectLesson from '../selectLesson/selectLesson.jsx'; // 阶段学期下拉选择组件
import PaperSelect from '../../../public/pageSelect/pageSelect.jsx'; // 分页组件
// import ruData from '../../../../headMasterComponents/ruData.js'; // 时间转换函数
import HandbookImportBox from '../handbookImportBox/handbookImportBox.jsx';
import HandbookShowBox from '../handbookShowBox/handbookShowBox.jsx';
import { getLessonName, getStageIndex } from '../../../util/methods.js'
import BombBox from '../../../../components/public/bombBox/bombBox.js';

/*
* 课后作业组件
* css样式引用了课程目标guidanceImport.css的样式
* 修改的样式在homeWorkImport.css里面
* */
export default class HomeWorkImport extends Component {
    constructor() {
        super();
        this.state = {
            isImportBoxHidden: true,
            lessonID: 0, // 课时ID
            rows: [], // 数据
            page: 1, // 当前页数
            count: 0, // 总数
            total: 0, // 总页数
            isImportBoxShow: false,
            isImportBoxShow2: false,
            handBookUrl: '',
            stageIndex: 0, // 阶段信息
            lessonName: '', // 课时名称
            homeworkid: 0,
            isHidden: true, // 确定弹框是否显示
            markdownid: 0,
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

    // 获取课后作业信息 6 代表课后作业
    findLessonDataPageAjax(lessonid,page) {
        $.llsajax({
            url: "lessonDate/findLessonDataPage",
            type: "POST",
            async: true,
            data: {
                type: 6,
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
                    <td>3</td>
                    <td>2017-01-01 21：00</td>
                    <td>
                        <span onClick={this.onShowHomeWork.bind(this,value.picurl)}>
                            <i className="iconfont icon-yulan"></i>
                            预览
                        </span>
                        <span onClick={this.onDeleteHomeWork.bind(this,value.id)}>
                            <i className="iconfont icon-SHANCHU-"></i>
                            删除
                        </span>
                    </td>
                </tr>
            );
        });
    }

    onShowHomeWork(url) {
        this.setState({
            isImportBoxShow2: true,
            handBookUrl: url
        });
    }

    onDeleteHomeWork(id) {
        this.setState({
            isHidden: false,
            homeworkid: id,
            bombBoxMsg: '是否删除此课后作业？'
        });
    }

    enterClick() {
        $.llsajax({
            url: "lessonDate/deleteHomeWork",
            type: "POST",
            async: true,
            data: {
                homeworkid: this.state.homeworkid,
                lessonid: this.state.lessonID
            },
            success: deletePractice => {
                this.findLessonDataPageAjax(this.state.lessonID,this.state.page);
                this.setState({
                    isHidden: true,
                    homeworkid: 0,
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

    onCloseBox(flag) {
        if (flag !== 1) {
            this.findLessonDataPageAjax(this.state.lessonID,this.state.page);
        }
        this.setState({
            isImportBoxShow: false,
            isImportBoxShow2: false,
        });
    }

    addHomeWork() {
        this.setState({
            isImportBoxShow: true,
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
                    {
                        this.state.rows.length !== 0 ?
                            null
                            :
                            <span className="commonButton button guidanceImport-tool-add" onClick={this.addHomeWork.bind(this)}>
                                <i className="iconfont icon-tianjiadaoshijuan"></i>新增作业
                            </span>
                    }
                </div>
                <table>
                    <thead>
                    <tr>
                        <th className="one">排序</th>
                        <th className="three">html名称</th>
                        <th className="two">上传时间</th>
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
                    this.state.isImportBoxShow ?
                        <HandbookImportBox
                            lessonID={this.state.lessonID}
                            onCloseBox={this.onCloseBox.bind(this)}
                            msg={"新增作业"}
                            name={this.props.name}
                            lessonName={this.state.lessonName}
                            stageIndex={this.state.stageIndex}
                        />
                        :
                        null
                }
                {
                    this.state.isImportBoxShow2 ?
                        <HandbookShowBox
                            lessonID={this.state.lessonID}
                            onCloseBox={this.onCloseBox.bind(this)}
                            handBookUrl={this.state.handBookUrl}
                        />
                        :
                        null
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