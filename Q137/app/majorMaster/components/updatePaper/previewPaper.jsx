import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import TeacherComp from '../../public/teacherPublic/teacherComp.js';
import Footer from '../../../components/public/footer/footer.js';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import url from '../../../controller/url.js';
import $ from 'jquery';
import './previewPaper.css';

import PreviewItem from './previewItem.jsx'
import EditItem from './editItem.jsx'


export default class ExamPage extends Component {

    constructor() {
        super();
        this.state = {
            dataList: [],
            showItem: [],
            // 单选多选简答
            allNum: 0,
            singleNum: 0,
            doubleNum: 0,
            shoutAnsNum: 0,
            // 预览或编辑的题目
            chooseItem: {},
            // 编辑预览控制
            editFlag: false,
            previewFlag: false,
            paper: 'paper',
            disSucOrErr: false,
        }
    }
    onShowMajor() {
    }

    onCourseShow() {
    }

    onLessonShow() {
    }

    onClickMessage1() {
    }
    componentWillMount() {
        var hashStr = window.location.hash;
        var type = hashStr.split('type=')[1];
        var objs = JSON.parse(sessionStorage.getItem('obj'))
        // console.log(objs)
        // console.log(objs)
        var data = [];
        if (type == 'exercise') {
            data = JSON.parse(sessionStorage.getItem('exerciseData'))
        }
        if (type == 'paper'||type=='test') {
            data = JSON.parse(sessionStorage.getItem('paperData'))

        }
        // console.log(data)
        // console.log(data)
        var len = data.length;
        var countSingle = 0;
        var countDouble = 0;
        var countShortAnswer = 0;
        if (len > 0) {
            // console.log(data[0])
            for (var i = 0; i < len; i++) {
                if (data[i].type == 1) {
                    countSingle = ++countSingle
                }
                if (data[i].type == 2) {
                    countDouble = ++countDouble
                }
                if (data[i].type == 3) {
                    countShortAnswer = ++countShortAnswer
                }
                data[i].markid = i + 1;
                data[i].majorId = objs.mid;
                data[i].courseId = objs.cId;
                data[i].lessonId = objs.lId;
                // data.c
            }
        }
        // console.log(data)
        this.setState({
            dataList: data,
            allNum: len,
            singleNum: countSingle,
            doubleNum: countDouble,
            shoutAnsNum: countShortAnswer,
            objs: objs,
        })
        this.creataTable(data)

        this.setState({
            paper: type
        })
    }
    render() {
        let styles = {
            title: {
                backgroundColor: "#6cc4ce",
                backgroundImage: "linear-gradient(60deg, #6cc4ce, #65f1ce)",
            }
        };
        return (

            <div>
                <TeacherComp onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                    onClickMessage1={this.onClickMessage1.bind(this)} />
                <HeadMasterTitle
                    style={styles.title}
                    title={"考试管理"}
                    msg={"贴合知识点 自动判卷 多维度统计"}
                />
                <div className="previewContainer">
                    <div className="previewPaperInner">
                        <h2>{'预览'}</h2>
                        <div className="previewInfo">
                            <p className="lineOne">
                                <span>共<i>{this.state.allNum}</i>道题</span>
                                <span>单选题<i>{this.state.singleNum}</i>道</span>
                                <span>多选题<i>{this.state.doubleNum}</i>道</span>
                                <span>简答题<i>{this.state.shoutAnsNum}</i>道</span></p>
                            <p className="lineTwo">
                                <span>所属专业:{this.state.objs.mName || '--'}</span>
                                <span>所属课程:{this.state.objs.cName || '--'}</span>
                                <span>所属课时:{this.state.objs.lName || '--'}</span>
                            </p>
                        </div>
                        <table>
                            <tr>
                                <th><div className="tbNo">序号</div></th>
                                <th><div className="tbName">题目</div></th>
                                <th><div className="tbType">题型</div></th>
                                <th><div className="tbLevel">难易度</div></th>
                                <th><div className="tbTime">创建时间</div></th>
                                <th><div className="tbMethod">操作</div></th>
                            </tr>
                            <tbody>
                                {this.state.showItem}
                            </tbody>
                        </table>
                        <div className="handlebox">
                            <a href="javascript:;" className="previewOff" onClick={this.goBack.bind(this)}>取消</a>
                            <a href="javascript:;" onClick={this.updateDate.bind(this)} className="sureToSave button commonButton">确定</a>
                        </div>
                    </div>

                </div>
                <div className='sucorerr' >
                    <span className={this.state.disSucOrErr == true ? 'sOeShow' : 'sOeHide'}><i className="iconfont icon-xiaoxizhongxin-"></i>数据保存成功</span>
                </div>
                <PreviewItem
                    closeMask={this.closeMask.bind(this)}
                    data={this.state.chooseItem}
                    flag={this.state.previewFlag}
                    obj={this.state.objs}
                />
                <EditItem
                    closeMask={this.closeMask.bind(this)}
                    data={this.state.chooseItem}
                    flag={this.state.editFlag}
                    saveHandle={this.saveHandle.bind(this)}
                    obj={this.state.objs}
                />
                <Footer />
            </div>
        )
    }

    creataTable(arr) {
        var arr = arr;
        var len = arr.length;
        var showArr = [];
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                showArr.push(<tr key={i} className="previewItem">
                    <td><div className="tbNo">{this.createNo(i)}</div></td>
                    <td><div className="tbName">{arr[i].stem}</div></td>
                    <td><div className="tbType">{this.createType(arr[i].type)}</div></td>
                    <td><div className="tbLevel">{this.createLeval(arr[i].level)}</div></td>
                    <td><div className="tbTime"></div></td>
                    <td><div className="tbMethod">
                        <i className="iconfont icon-yulan" onClick={this.previewHandle.bind(this, arr[i].markid)}></i>
                        <i className="iconfont icon-bianji" onClick={this.editHandle.bind(this, arr[i].markid)}></i>
                        <i className="iconfont icon-SHANCHU-" onClick={this.deleteHandle.bind(this, arr[i].markid)}></i>
                    </div></td>
                </tr>)
            }
        }
        this.setState({
            showItem: showArr
        })
    }
    createNo(n) {
        var n = n || 0;

        n = (Number(n) + 1)
        if (n < 10) {
            n = '0' + n
        }
        return n
    }
    createType(n) {
        var n = n + '';
        var str = '--';
        switch (n) {
            case '1':
                str = '单选题'
                break;
            case '2':
                str = '多选题'
                break;
            case '3':
                str = '简答题'
                break;
        }
        return str

    }
    createLeval(n) {
        var n = n + '';
        var str = '--';
        switch (n) {
            case '1':
                str = '易'
                break;
            case '2':
                str = '中'
                break;
            case '3':
                str = '难'
                break;
        }
        return str
    }
    saveHandle(obj) {
        var data = this.state.dataList;
        var len = data.length;
        for (var i = 0; i < len; i++) {
            if (data[i].markid == obj.markid) {
                data[i] = obj;
                this.setState({
                    data: data,
                })
                break;
            }
        }
        this.creataTable(data)
    }
    // 操作
    previewHandle(id) {
        // console.log(id)
        var data = this.state.dataList
        var len = data.length;
        for (var i = 0; i < len; i++) {
            if (data[i].markid == id) {
                this.setState({
                    chooseItem: data[i],
                })
                break;
            }
        }
        this.setState({
            previewFlag: true,
        })
    }
    editHandle(id) {
        // console.log(id)
        var data = this.state.dataList
        var len = data.length;
        for (var i = 0; i < len; i++) {
            if (data[i].markid == id) {
                this.setState({
                    chooseItem: data[i],
                })
                break;
            }
        }
        this.setState({
            editFlag: true
        })
    }
    deleteHandle(id) {
        // console.log(id)
        var data = this.state.dataList;
        var len = data.length;
        for (var i = 0; i < len; i++) {
            if (data[i].markid == id) {
                data.splice(i, 1);
                break;
            }
        }
        this.creataTable(data)
        this.setState({
            data: data,
        })
    }
    updateDate() {
        var baseList = this.state.dataList
        var len = baseList.length;
        for (var i = 0; i < len; i++) {
            for (var j in baseList[i]) {
                if (typeof (baseList[i][j]) == null || baseList[i][j] == 'null' || baseList[i][j] == '' || baseList[i][j] === null) {
                    delete baseList[i][j]
                    delete baseList[i].markid
                }
            }
        }
        var questionList = {
            baseList: baseList
        }
        var obj = {
            srlist: questionList
        }
        if (this.state.paper == 'exercise') {
            $.llsajax({
                url: "examImport/saveQuestionList",
                type: "POST",
                data: {
                    srlist: JSON.stringify(questionList)
                },
                success: data => {
                    this.setState({

                        disSucOrErr: true,
                    })
                    var _This = this;
                    setTimeout(function () {
                        _This.setState({
                            disSucOrErr: false
                        })
                        hashHistory.push('/teacherQuestion')
                    }, 2000)
                }
            })
        }
        if (this.state.paper == 'paper'||this.state.paper=='test') {
            console.log(this.state.objs)
            // if(1==1){
            //     return false;
            // }
            $.llsajax({
                url: "examInationPaper/addPaper",
                type: "POST",
                data: {
                    paper_name: this.state.objs.paperName,
                    major_id: this.state.objs.mid,
                    course_id: this.state.objs.cId,
                    lesson_id: this.state.objs.lId,
                    type: this.state.objs.paperType,
                },
                async: false,
                success: data => {
                    // console.log(data)
                    $.llsajax({
                        url: "question/savePaperQuestions",
                        type: "POST",
                        data: {
                            questionsJson: JSON.stringify(questionList),
                            paper_id: data.msg,
                        },
                        success: data1 => {
                            // console.log(data1)
                            
                            this.setState({

                                disSucOrErr: true,
                            })
                            var _This = this;
                            setTimeout(function () {
                                _This.setState({
                                    disSucOrErr: false
                                })

                                if (_This.state.objs.paperType == 1) {
                                    hashHistory.push('/teacherteststorefinal')
                                }
                                if (_This.state.objs.paperType == 2) {
                                    hashHistory.push('/teacherteststorequizz')
                                }
                                if (_This.state.objs.paperType == 0) {
                                    hashHistory.push('/teacherStagePaperLibrary')
                                }
                            }, 2000)
                        }
                    })
                }
            })

        }
    }
    closeMask() {
        if (!!this.state.editFlag) {
            this.setState({
                editFlag: false,
            })
        }
        if (!!this.state.previewFlag) {
            this.setState({
                previewFlag: false,
            })
        }

    }
    goBack() {
        hashHistory.go(-1)
    }
}