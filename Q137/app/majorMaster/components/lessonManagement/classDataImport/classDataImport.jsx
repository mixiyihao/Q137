import React, { Component } from 'react';
import $ from 'jquery';
import './classDataImport.css';
import SelectLesson from '../selectLesson/selectLesson.jsx'; // 阶段学期下拉选择组件
import PaperSelect from '../../../public/pageSelect/pageSelect.jsx'; // 分页组件
import MaskFloor from '../../../../components/classHour/imgComp/MaskFloor.js';
import ClassDataImportBox from "../classDataImportBox/classDataImportBox.jsx";
import { getLessonName, getStageIndex } from '../../../util/methods.js'
import BombBox from '../../../../components/public/bombBox/bombBox.js';

/*
* 课堂资料组件
* css样式引用了课程目标guidanceImport.css的样式
* 修改的样式在classDataImport.css里面
* */
export default class ClassDataImport extends Component {
    constructor() {
        super();
        this.state = {
            lessonID: 0, // 课时ID
            rows: [], // 数据
            page: 1, // 当前页数
            count: 0, // 总数
            total: 0, // 总页数
            isShow: false, // 是否显示预览
            imgKeys: 0, // 图片索引
            isImportBoxShow: true,
            stageIndex: 0, // 阶段信息
            lessonName: '', // 课时名称
            fileList: [],
            bombBoxMsg: '', // 弹框文案
            isHidden: true, // 确定弹框是否显示
            dataid: 0,
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

    // 获取资料信息 3 代表资料
    findLessonDataPageAjax(lessonid,page) {
        $.llsajax({
            url: "lessonDate/findLessonDataPage",
            type: "POST",
            async: true,
            data: {
                type: 3,
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
                    <td>{index === 9 ? this.state.page : this.state.page - 1}{index === 9 ? 0 : index + 1}</td>
                    <td>{value.ordernum}</td>
                    <td>{value.c_date.substr(0,19)}</td>
                    <td>
                        <span onClick={this.showImg.bind(this,index)}>
                            <i className="iconfont icon-yulan"></i>
                            预览
                        </span>
                        <span onClick={this.editImg.bind(this,value)}>
                            <i className="iconfont icon-bianji"></i>
                            编辑
                        </span>
                        <span onClick={this.onDeleteImg.bind(this,value.id)}>
                            <i className="iconfont icon-SHANCHU-"></i>
                            删除
                        </span>
                    </td>
                </tr>
            );
        });
    }

    // 预览
    showImg(key) {
        this.setState({
            isShow: true,
            imgKeys: key,
        });
    }

    // 编辑
    editImg(value) {
        this.setState({
            isImportBoxShow: false,
            fileList: [value]
        });
    }

    // 删除
    onDeleteImg(id) {
        this.setState({
            isHidden: false,
            dataid: id,
            bombBoxMsg: '是否删除此课时资料？'
        });
    }

    enterClick() {
        this.deleteDataAjax(this.state.dataid,this.state.lessonID);
    }

    deleteDataAjax(id,lessonid) {
        $.llsajax({
            url: "lessonDate/deleteData",
            type: "POST",
            async: true,
            data: {
                dataid: id,
                lessonid: lessonid,
            },
            success: deleteData => {
                this.findLessonDataPageAjax(this.state.lessonID,this.state.page);
                this.setState({
                    isHidden: true,
                    dataid: 0,
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

    // 新增资料
    addClassData() {
        this.setState({
            isImportBoxShow: false,
        });
    }

    onCloseBox() {
        this.setState({
            isImportBoxShow: true,
            fileList: []
        });
    }

    imgCompClose() {
        this.setState({
            isShow: false
        });
    }

    // 确认弹框消失事件
    hideClick() {
        this.setState({
            dataid: 0,
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
                    <span className="commonButton button guidanceImport-tool-add" onClick={this.addClassData.bind(this)}>
                        <i className="iconfont icon-tianjiadaoshijuan"></i>新增资料
                    </span>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th className="">序号</th>
                        <th className="">顺序</th>
                        <th className="">录入时间</th>
                        <th className="">操作</th>
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
                        null
                        :
                        <ClassDataImportBox
                            lessonID={this.state.lessonID}
                            onCloseBox={this.onCloseBox.bind(this)}
                            name={this.props.name}
                            lessonName={this.state.lessonName}
                            stageIndex={this.state.stageIndex}
                            findLessonDataPageAjax={this.findLessonDataPageAjax.bind(this)}
                            fileList={this.state.fileList}
                        />
                }
                {
                    this.state.isShow ? <MaskFloor imgCompClose={this.imgCompClose.bind(this)} dataList={this.state.rows} KeyMarks={this.state.imgKeys}/> : null
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