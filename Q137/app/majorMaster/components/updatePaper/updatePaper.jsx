import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import TeacherComp from '../../public/teacherPublic/teacherComp.js';
import Footer from '../../../components/public/footer/footer.js';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import url from '../../../controller/url.js';
import $ from 'jquery';
import './updatePaper.css';

export default class TestPage extends Component {
    constructor() {
        super();
        this.state = {
            Browser: '0',
            paper: 'paper',
            showName: false,
            st: 'suc',
            dataArr: [],
            majorArr: [],
            courseArr: [],
            lessonArr: [],
            majorId: '',
            courseId: '',
            lessonId: '',
            obj: {
                paperType: 1,
            },
            
        }
    }

    componentWillMount() {
        this.onGool()
        var hashStr = window.location.hash;
        if (hashStr.indexOf('type=') > 0) {
            var type = hashStr.split('type=')[1];
            this.setState({
                paper: type,
            })
            if(type='test'){
                var obj = {}
                obj.paperType=0
                this.setState({
                    obj:obj,
                    paper:'test'
                })
            }
        }
        
        $.llsajax({
            url: "major/findMajor",
            type: "POST",
            async: false,
            success: data => {
                this.setState({
                    dataArr: data.majors || [],
                })
                if (data.majors != null && data.majors.length > 0) {
                    var arr = data.majors
                    this.createMajor(arr)
                }
            }
        })
    }


    onShowMajor() {
    }

    onCourseShow() {
    }

    onLessonShow() {
    }

    onClickMessage1() {
    }

    render() {
        let styles = {
            title: {
                backgroundColor: "#6cc4ce",
                backgroundImage: "linear-gradient(60deg, #6cc4ce, #65f1ce)",
            }
        };
        let fileDisplay = {
            display: this.state.showName == false ? "none" : "block"
        }
        let errTag = {
            display: this.state.st == 'suc' ? "none" : "block",
            color: '#ff997a',
            background: "#fff",
            marginLeft: '4px',
            fontSize: '12px'
        }
        let exerciseStyle = {
            display: this.state.paper == 'paper'||this.state.paper == 'test' ? 'block' : 'none'
        }
        let testStyle={
            display: this.state.paper != 'test'&&this.state.paper != 'exercise'||this.state.paper == 'paper' ? 'block' : 'none'
        }
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
                <div className="updatePaperWrap">
                    <div className="updatePaperInner">
                        <h2>{this.state.paper === 'paper' ? '导入试卷' :this.state.paper === 'test' ? '导入阶段试卷':'导入试题'}
                            <span onClick={this.goBack.bind(this)}>返回<i className="iconfont icon-back"></i></span>
                        </h2>
                        <div className="updatePaperDownloadBox">
                            <p>下载模板</p>
                            <div className="updatePaperDownloadTag">
                                {this.state.paper === 'paper' ? '说明：通过此功能将试卷导入本系统' : '说明：通过此功能将试题导入本系统'}
                                ，请根据需要下载模板。上传文件必须与本模板一致，如下：
                            </div>
                            <div className="updatePaperDownloadButton">
                                {this.state.paper === 'paper'||this.state.paper=='test' ? '试卷模板：' : '试题模板：'}
                                <a href={url.WEBURL + 'examImport/examModel?browser=' + this.state.Browser + '&paramtype=' + this.state.paper}><i className="iconfont icon-xiazaimoban"></i>下载模板</a>
                            </div>
                            <div className="uploadInfoChange">
                                <p>
                                    {this.state.paper === 'paper' ? '导入试卷' :this.state.paper === 'test' ? '导入阶段试卷': '导入试题'}
                                </p>
                                <div className="uploadInfoChangeName" style={exerciseStyle}>
                                    <i className="upRedstar">*</i>
                                    试卷名称: <input type="text" onChange={this.changeName.bind(this)} /></div>
                                <div style={testStyle} className="uploadInfoChangeType">
                                    <i className="upRedstar">*</i>
                                    考试类型:
                                        <input type="radio" name="type" onClick={this.clickTypeHandle.bind(this, 1)} />期末考试
                                        <input type="radio" name="type" onClick={this.clickTypeHandle.bind(this, 2)} />小测验
                                    </div>
                                <div className="uploadInfoSelect">
                                    <i className="upRedstar">*</i>
                                    所属专业:
                                        <select name="" id="" onChange={this.changeMajor.bind(this)}>
                                        <option value="">&nbsp;全部专业(必填)</option>
                                        {this.state.majorArr}
                                    </select>
                                    <i className="upRedstar">*</i>
                                    所属课程:
                                        <select name="" id="" onChange={this.changeCourse.bind(this)}>
                                        <option value="">&nbsp;全部课程(必填)</option>
                                        {this.state.courseArr}
                                    </select>
                                    所属课时:
                                        <select name="" id="" onChange={this.changeLesson.bind(this)}>
                                        <option value="">&nbsp;全部课时</option>
                                        {this.state.lessonArr}
                                    </select>
                                </div>


                            </div>
                            <div className="updatePaperUploadBox">

                                <div className="uploadBtn">
                                    <i className="iconfont icon-shangchuan"></i>选择文件上传
                                </div>
                                <span className="warnMsg">*支持文件格式:*.xsl、*.xlsx; 表头样式与模板保持一致</span>
                                <form id="uploadFile" enctype="multipart/form-data">
                                    <input type="file" id="addFile" className="uploadInput" name="execl" onChange={this.changeFileHandle.bind(this)} />
                                    <input type="text" name="classid" value={this.state.classid} />
                                </form>
                                <div className="uploadFileList">
                                    <p style={fileDisplay}>
                                        <span className={this.state.st != 'suc' ? "err" : ""}>{this.state.fileName}<i className="iconfont icon-guanbi" onClick={this.deleHandle.bind(this)}></i></span>
                                        <a className={this.state.st != 'suc' ? "err" : ""} onClick={this.startImport.bind(this)}>开始导入</a>
                                        <span style={errTag}><i className="xxxxxxx">x</i> 文件上传失败！请检查模板数据的准确性</span>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                    
                </div>
                <Footer />
            </div>
        );
    }
    startImport() {
        if (typeof (this.state.obj.cId) == 'undefined' || this.state.obj.cId == '') {
            return false;
        }
        // if(this.state.obj.)
        if (this.state.paper == 'paper'||this.state.paper == 'test') {
            if (typeof(this.state.obj.paperName) == 'undefined' || this.state.obj.paperName == '') {
                return false;
            }
        }
        sessionStorage.setItem('obj', JSON.stringify(this.state.obj))
        // console.log(this.state.obj)
        // if(1==1){
        //     return false
        // }
        hashHistory.push({
            pathname: '/previewpage',
            query: {
                type: this.state.paper
            }
        })
    }
    clickTypeHandle(type) {
        var obj = this.state.obj
        obj.paperType = type;
        this.setState({
            obj: obj,
        })
    }
    changeName(e) {
        var vals = e.target.value;
        var obj = this.state.obj
        obj.paperName = vals
        this.setState({
            obj: obj,
        })
        // console.log(obj)
    }
    changeMajor(e) {
        // console.log(e.target.value)
        var vals = e.target.value;
        var data = this.state.dataArr;
        var len = data.length;
        var obj = this.state.obj//记录专业名和专业id
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                if (vals == data[i].id) {
                    var arr = data[i].courseList;
                    obj.mName = data[i].name;
                    obj.mid = data[i].id
                    this.createCourse(arr);
                    break;
                }
            }
        }
        if (vals == '') {
            var arr = [];
            this.createCourse(arr);
        }
        this.setState({
            majorId: vals,
            obj: obj,
        })
    }
    changeCourse(e) {
        // console.log(e.target.value)
        var mi = this.state.majorId;
        var vals = e.target.value;
        var data = this.state.dataArr;
        var obj = this.state.obj;
        var len = data.length;
        if (mi != '') {
            for (var i = 0; i < len; i++) {
                if (mi == data[i].id) {
                    for (var j = 0; j < data[i].courseList.length; j++) {
                        if (vals == data[i].courseList[j].id) {
                            var arr = data[i].courseList[j].lessons
                            obj.cName = data[i].courseList[j].name;
                            obj.cId = data[i].courseList[j].id
                            this.createLesson(arr)
                            break;
                        }
                    }
                }
            }
        }
        this.setState({
            courseId: vals,
            obj: obj,
        })
    }
    changeLesson(e) {
        var obj = this.state.obj;
        var vals = e.target.value;
        obj.lId = vals;
        var mi = this.state.majorId;
        var ci = this.state.majorId;
        var data = this.state.dataArr;
        var len = data.length;
        for (var i = 0; i < len; i++) {
            if (mi == data[i].id) {
                for (var j = 0; j < data[i].courseList.length; j++) {
                    if (ci == data[i].courseList[j].id) {
                        for (var k = 0; k < data[i].courseList[j].lessons.length; k++) {
                            if (vals == data[i].courseList[j].lessons[k].id) {
                                obj.lName = data[i].courseList[j].lessons[k].name;
                            }
                        }
                    }
                }
            }
        }
        this.setState({
            obj: obj
        })

    }

    createMajor(arr) {
        var arr = arr || [];
        var emptyArr = [];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            emptyArr.push(
                <option value={arr[i].id} key={arr[i].id}>&nbsp;{arr[i].name}</option>
            )
        }
        this.setState({
            majorArr: emptyArr
        })
    }
    createCourse(arr) {
        var arr = arr || [];
        var emptyArr = [];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            emptyArr.push(
                <option value={arr[i].id} key={arr[i].id + 'course'}>&nbsp;{arr[i].name}</option>
            )
        }
        this.setState({
            courseArr: emptyArr
        })
    }
    createLesson(arr) {
        var arr = arr || [];
        var emptyArr = [];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            emptyArr.push(
                <option value={arr[i].id} key={arr[i].id + 'les'}>&nbsp;{arr[i].name}</option>
            )
        }
        this.setState({
            lessonArr: emptyArr
        })
    }
    onGool() {
        let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            this.setState({
                Browser: "1"
            });
        }
        else if (isEdge) {
            this.setState({
                Browser: "1"
            });
        }
        else {
            this.setState({
                Browser: "2"
            });
        }
    }

    changeFileHandle(e) {
        var vals = e.target.value.split("\\").pop()
        if (vals.length <= 0) {
            this.setState({
                showName: false,
                // fileName: '',
            })
        } else {

            this.setState({
                fileName: vals,
                showName: true,
            })
            // 加判断正则
            var regExp = /\.xl.{1,2}$/;
            if (regExp.test(vals) == true) {
                // console.log(new FormData($('#uploadFile')[0]))
                let formData = new FormData($('#uploadFile')[0]);


                if (this.state.paper == 'paper'||this.state.paper=='test') {

                    $.llsajaxupload({
                        url: "examImport/importQuestionExcel",
                        data: formData,
                        type: 'POST',
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: data => {
                            console.log(data)
                            if (data.result != 200) {
                                this.setState({
                                    st: 'err'
                                })
                            } else {
                                // if (data.msg) {
                                //     //console.log(date.msg)
                                //     this.setState({
                                //         st: 'err'
                                //     })
                                // } else {
                                //console.log('good')
                                sessionStorage.setItem('paperData', JSON.stringify(data.date.list))
                                this.setState({
                                    st: 'suc'
                                })
                                // }
                            }
                        },
                        error: err => {
                            this.setState({
                                st: 'err'
                            })
                        }
                    });
                }
                if (this.state.paper == 'exercise') {
                    $.llsajaxupload({
                        url: "examImport/importQuestionExcel",
                        data: formData,
                        type: 'POST',
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: data => {
                            if (data.result != 200) {
                                this.setState({
                                    st: 'err'
                                })
                            } else {
                                if (data.msg) {
                                    //console.log(date.msg)
                                    this.setState({
                                        st: 'err'
                                    })
                                } else {
                                    sessionStorage.setItem('exerciseData', JSON.stringify(data.date.list))
                                    this.setState({
                                        st: 'suc'
                                    })
                                }
                            }
                        },
                        error: err => {
                            this.setState({
                                st: 'err'
                            })
                        }
                    });
                }
            } else {
                this.setState({
                    st: 'err'
                })
            }
        }

    }
    deleHandle() {
        this.setState({
            showName: false,
            fileName: '',
        })
    }
    goBack() {
        hashHistory.go(-1)
    }
}