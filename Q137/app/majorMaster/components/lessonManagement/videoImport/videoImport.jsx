import React, { Component } from 'react';
import $ from 'jquery';
import './videoImport.css';
import SelectLesson from '../selectLesson/selectLesson.jsx'; // 阶段学期下拉选择组件
import PaperSelect from '../../../public/pageSelect/pageSelect.jsx'; // 分页组件
import ruData from '../../../../headMasterComponents/ruData.js'; // 时间转换函数
import VideoShowBox from '../videoShowBox/videoShowBox.jsx';
import VideoImportBox from '../videoImportBox/videoImportBox.jsx';
import { getLessonName, getStageIndex } from '../../../util/methods.js';
import BombBox from '../../../../components/public/bombBox/bombBox.js';

/*
* 视频录入组件
* css样式引用了课程目标guidanceImport.css的样式
* 修改的样式在videoImport.css里面
* */
export default class VideoImport extends Component {
    constructor() {
        super();
        this.state = {
            lessonID: 0, // 课时ID
            rows: [], // 数据
            page: 1, // 当前页数
            count: 0, // 总数
            total: 0, // 总页数
            isShowVideoBox: false,
            isShowVideoBox2: false,
            stageIndex: 0, // 阶段信息
            lessonName: '', // 课时名称
            isHidden: true, // 确定弹框是否显示
            markdownid: 0,
            videoValue: [],
            userID: [],
        }
    }

    componentWillMount() {
        this.setState({
            lessonID: this.props.lessonID
        });
        this.findLessonDataPageAjax(this.props.lessonID,this.state.page);
        this.getUserAjax();
    }

    getUserAjax() {
        $.llsajax({
            url: "Luser/meansLuser",
            type: "POST",
            async: true,
            success: meansLuserData => {
                this.setState({
                    userID: meansLuserData.user.id
                });
            }
        })
    }

    componentDidMount() {
        this.setState({
            lessonName: getLessonName(this.props.lessons,this.state.lessonID),
            stageIndex: getStageIndex(this.props.lessons,this.state.lessonID), // 获取最小阶段作为默认阶段
        });
    }

    // 获取视频信息 2 代表视频
    findLessonDataPageAjax(lessonid,page) {
        $.llsajax({
            url: "lessonDate/findLessonDataPage",
            type: "POST",
            async: true,
            data: {
                type: 2,
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
                    <td>{value.name}</td>
                    <td>{ruData(value.cDate,'-')}</td>
                    <td>
                        <span onClick={this.onShowVideo.bind(this,value.cc_address)}>
                            <i className="iconfont icon-yulan"></i>
                            预览
                        </span>
                        <span onClick={this.onEditVideo.bind(this,value)}>
                            <i className="iconfont icon-bianji"></i>
                            编辑
                        </span>
                        <span onClick={this.onDeleteVideo.bind(this,value.id)}>
                            <i className="iconfont icon-SHANCHU-"></i>
                            删除
                        </span>
                    </td>
                </tr>
            );
        });
    }

    // 预览视频
    onShowVideo(cc_address) {
        this.setState({
            cc_address: cc_address,
            isShowVideoBox: true,
        });
    }

    // 编辑视频
    onEditVideo(value) {
        this.setState({
            isShowVideoBox2: true,
            videoValue: [value]
        });
    }

    // 删除视频
    onDeleteVideo(id) {
        this.setState({
            isHidden: false,
            videoid: id,
            bombBoxMsg: '是否删除此视频？'
        });
    }

    enterClick() {
        $.llsajax({
            url: "lessonDate/deleteVideo",
            type: "POST",
            async: true,
            data: {
                vid: this.state.videoid,
                lessonid: this.state.lessonID
            },
            success: deleteVideo => {
                this.findLessonDataPageAjax(this.state.lessonID,this.state.page);
                this.setState({
                    isHidden: true,
                    videoid: 0,
                });
            }
        })
    }

    addVideo() {
        this.setState({
            isShowVideoBox2: true,
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
        this.setState({
            isShowVideoBox: false,
            isShowVideoBox2: false,
            videoValue: []
        });
        if (flag === 1) {
            this.findLessonDataPageAjax(this.state.lessonID,this.state.page);
        }
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
                    <span className="commonButton button guidanceImport-tool-add" onClick={this.addVideo.bind(this)}>
                        <i className="iconfont icon-tianjiadaoshijuan"></i>新增视频
                    </span>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th className="one">排序</th>
                        <th className="two">视频名称</th>
                        <th className="three">录入时间</th>
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
                    this.state.isShowVideoBox ?
                        <VideoShowBox 
                            cc_address={this.state.cc_address}
                            onCloseBox={this.onCloseBox.bind(this)}
                            name={this.props.name}
                            lessonName={this.state.lessonName}
                            stageIndex={this.state.stageIndex}
                        />
                        :
                        null
                }
                {
                    this.state.isShowVideoBox2 ?
                        <VideoImportBox 
                            name={this.props.name}
                            lessonName={this.state.lessonName}
                            stageIndex={this.state.stageIndex}
                            onCloseBox={this.onCloseBox.bind(this)}
                            count={this.state.count}
                            videoValue={this.state.videoValue}
                            lessonID={this.state.lessonID}
                            userID={this.state.userID}
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