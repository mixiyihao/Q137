
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import $ from 'jquery';
import './editCourse.css';
import ErrorBox from '../../../teacherComponents/bombBox/bombBox.js';
import AddTeacher from './addTeacher/addTeacher.jsx';
import stores from '../sto/sto.js';
import Act from '../act/act.js';

let act = new Act();
export default class EditCourse extends React.Component {
    constructor() {
        super();
        this.state = {
            showItem: false,
            titleName: '编辑',
            majorname: '--',
            majorId: '',
            teacherData: [],//老师数据
            teacherName: '',//老师名字
            maxOrderNum: '',//序列上限
            coursename: '',
            teacherItem: '',
            stageNo: '',
            orderNum: '',
            introduceSth: '',
            term: 1,
            teacherList: [],//展示老师列表
            saveArr: [],//保存添加的信息
            showCards: [],
            mark: 0,
            type: 0,//0添加 1修改
            warnings: false,//提示是否出现 f隐藏 t出现
            bombBoxMsgError: "当前序号已经存在 保存后其他课程将会顺延",
            isHiddenError: true,
            disSucOrErr: false,
            clickflag: true,
            differentOrder:[],

        }
    }

    componentWillReceiveProps(props) {
        // console.log(props)
        var flag = props.showItem
        if (flag == true) {
            // console.log(props)
            this.setState({
                showItem: props.showItem,
                majorname: props.majorNames,
                majorId: props.majorId
            })
            if (props.type == 0) {
                this.getOrder(props.majorId, 1)
            }
            // console.log(props.type)
            if (props.type == 1&&props.courseid!='') {
                this.getEditAjax(props.courseid)
            }
            this.creatTeacher()
            this.setState({
                type: props.type,
                titleName: props.type == 0 ? '添加' : '编辑',//添加或编辑
            })
        }
    }
    render() {
        let waringStyle = {
            display: this.state.warnings == true ? 'block' : 'none',
        }
        let showItem = {
            display: this.state.showItem == true ? '' : 'none'
        }
        let editIt = {
            display: this.state.type == 0 ? 'block' : 'none',
        }

        return (<div className="editCourseWrap" style={showItem}>
            <div className="editCourseContainer">
                <h2 className="editCourseTitle">
                    {this.state.titleName}
                    <i className="iconfont icon-guanbi" onClick={this.closeHandle.bind(this)}></i>
                </h2>
                <div className="editCourseInner">
                    <div className="editCourseLeft">
                        <div className="edCouLeftTitle">
                            所属专业:
                            <i>{this.state.majorname}</i>
                        </div>
                        <div className="edCouLeftName">
                            <i className="redStar">*</i>
                            课程名称
                            <input type="text" onChange={this.changeNameHandle.bind(this)} value={this.state.coursename} placeholder="最多输入30个字符" />
                        </div>
                        <div className="edCouLeftStage">
                            <i className="redStar">*</i>
                            共
                            <input type="text" onChange={this.changeStageHanle.bind(this)} value={this.state.stageNo} />
                            个阶段
                        </div>
                        <div className="edCouLeftTerm">
                            <i className="redStar">*</i>
                            所属学期
                            <div>
                                <span className={this.state.term == 1 ? "current" : ''} onClick={this.chooseTermHandle.bind(this, 1)}>第一学期</span>
                                <span className={this.state.term == 2 ? "current" : ''} onClick={this.chooseTermHandle.bind(this, 2)}>第二学期</span>
                                <span className={this.state.term == 3 ? "current" : ''} onClick={this.chooseTermHandle.bind(this, 3)}>第三学期</span>
                                <span className={this.state.term == 4 ? "current" : ''} onClick={this.chooseTermHandle.bind(this, 4)}>第四学期</span>
                                <span className={this.state.term == 5 ? "current" : ''} onClick={this.chooseTermHandle.bind(this, 5)}>第五学期</span>
                            </div>
                        </div>
                        <div className="edCouLeftTeacher">
                            <i className="redStar">*</i>
                            视频讲师
                            <select name="" id="editTeacher" onChange={this.changeTeacherHandle.bind(this)}>
                                <option value="">&nbsp;请选择讲师</option>
                                {this.state.teacherList}
                            </select>
                            <AddTeacher getTeacher={this.creatTeacher.bind(this)}/>
                        </div>
                        <div className="edCouLeftOrder">
                            <i className="redStar">*</i>
                            课程顺序
                            <input type="text" onChange={this.changeOrderHandle.bind(this)} value={this.state.orderNum} onBlur={this.maxOrder.bind(this)} />
                        </div>
                        <div className="edCorLeftIntroduce">
                            课程介绍
                            <textarea name="" id="" onChange={this.inputInterduce.bind(this)} value={this.state.introduceSth}></textarea>
                        </div>

                        <div className="edCorLeftAddNew" onClick={this.continueAdd.bind(this)} style={editIt}>+继续添加</div>
                        <div className="redWarning" style={waringStyle}>红色*为必填项</div>
                    </div>
                    <div className="editCourseRight">
                        <div className="edCouRightInner">
                            <div className="edCouRightTitle">课程配置信息</div>
                            <div className="edCouRightSelect">
                                <select name="" id="" onChange={this.searchCard.bind(this)}>
                                    <option value="">&nbsp;全部学期</option>
                                    <option value="1">&nbsp;第一学期</option>
                                    <option value="2">&nbsp;第二学期</option>
                                    <option value="3">&nbsp;第三学期</option>
                                    <option value="4">&nbsp;第四学期</option>
                                    <option value="5">&nbsp;第五学期</option>
                                </select>
                            </div>
                            {this.state.showCards}
                        </div>
                    </div>

                </div>
                <div className="editCourseSave">
                    <a href="javascript:;" className="cancelBtn" onClick={this.closeHandle.bind(this)}>取消</a>
                    <a href="javascript:;" className="saveBtn button commonButton" onClick={this.saveHandle.bind(this)}>保存</a>
                </div>
            </div>
            <ErrorBox
                hideClick={this.hideClickError.bind(this)}
                isHidden={this.state.isHiddenError}
                bombBoxMsg={this.state.bombBoxMsgError}
            />
            <div className='editCourseSucorerr' id="editCourseSucorerr">
                <div className={this.state.disSucOrErr == true ? 'editCoursesOeShow' : 'editCoursesOeHide'}><i className="iconfont icon-xiaoxizhongxin-"></i>数据保存成功</div>
            </div>
        </div>)
    }
    hideClickError() {
        this.setState({
            isHiddenError: !this.state.isHiddenError
        });
    }
    // 编辑删除
    editHandle(mark) {
        // console.log(mark)
        // if(1==1){

        // return false;
        // }
        var mark = mark;
        var arr = this.state.saveArr;
        var len = arr.length;
        var teacher = '';
        for (var i = 0; i < len; i++) {
            // console.log(arr[i].mark)
            if (arr[i].mark == mark) {
                this.setState({
                    coursename: arr[i].name,
                    teacherItem: arr[i].lector,
                    stageNo: arr[i].stage,
                    orderNum: arr[i].ordernum,
                    introduceSth: arr[i].content,
                    term: arr[i].term,
                })
                teacher = arr[i].lector
                // term = arr[i].term
                arr.splice(i, 1);
                break;
            }
        }
        // console.log(teacher)
        this.setState({
            saveArr: arr,
        })
        var teacherData = this.state.teacherData;
        var lent = teacherData.length;
        var index = 0;
        for (var i = 0; i < lent; i++) {
            if (teacher = teacherData[i].id) {
                index = i;
                break;
            }
        }
        document.getElementById('editTeacher').selectedIndex = index;
        this.creatRightCard(arr)
    }
    deleHandle(mark) {
        // console.log(mark)
        var mark = mark;
        var arr = this.state.saveArr;
        // console.log(arr)
        // if(1==1){

        // return false;
        // }
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            // console.log(arr[i].mark)
            if (arr[i].mark == mark) {
                arr.splice(i, 1);
                break;
            }
        }
        this.setState({
            saveArr: arr,
        })
        this.creatRightCard(arr)
        // this.changeTrigger(true)
        // if (hashStr.indexof('/asscherProfession') != -1) {
        // this.changeTrigger(true)
        // }
    }
    // 保存数据
    saveHandle() {
        // var aArr = this.state.saveArr
        // if (aArr.length > 0) {

        // } else {

        if (this.state.clickflag == false) {
            return false;
        }
        var arr = this.state.saveArr;
        var objs = {}
        var flag = 0;
        // if(arr.length>0&&this.state.)
        if (this.state.coursename.length > 0 && this.state.coursename != '') {
            objs.name = this.state.coursename
            flag = ++flag;
        } 
        // else {
        //     return false;
        // }
        // console.log(this.state.stageNo)
        if (this.state.stageNo.length > 0 || this.state.stageNo > 0) {
            objs.stage = this.state.stageNo
            flag = ++flag;
        } 
        // else {
        //     return false;
        // }
        if (this.state.introduceSth.length >= 0) {
            objs.content = this.state.introduceSth
            flag = ++flag;
        } 
        // else {
        //     return false;
        // }
        if (this.state.teacherItem != '') {
            objs.lector = this.state.teacherItem
            flag = ++flag;
        } 
        // else {
        //     return false;
        // }
        // console.log(flag)
        if (flag > 3) {
            objs.term = this.state.term;
            if (this.state.orderNum == '') {
                return false;
            }
            objs.ordernum = this.state.orderNum;
            objs.majorId = this.state.majorId;
        } else {
            if(this.state.saveArr.length<1){
                return false;
            }
        }
        var type = this.state.type + '';
        if (type === '1') {
            objs.id = this.props.courseid
        }
        // }
        arr.push(objs)
        if (arr.length < 1) {
            return false;
        }

        var type = this.state.type;
        // if (type == 0) {
        this.saveAjax(arr, type)
        this.setState({
            clickflag: false,
        })
        var _This = this;
        setTimeout(function () {
            _This.setState({
                clickflag: true,
            })
        }, 2000)
        // }
        // if (type == 1) {
        //     var c = this.props.courseid;
        //     this.saveAjax(arr, type, c)
        // }
    }
    /**
     * 保存数据调用接口
     * @param {*保存数据的数组} arr :[]
     * @param {*0 添加 1 编辑} type:number 
     * @param {*修改用的课程id} c:int
     */
    saveAjax(arr, type, c) {
        let postData = {};
        if (type == 0) {
            postData = {
                type: type,
                courseList: arr
            };
        }
        if (type == 1) {
            postData = {
                type: type,
                courseList: arr,
                courseid: c,
            };
        }

        $.llsajax({
            url: 'course/saveOrUpdateCourse',
            type: "POST",
            async: true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(postData),
            success: data => {
                // console.log(data)
                // console.log('updateIt')
                this.props.responseData();
                this.props.showFlag()
                this.setState({

                    disSucOrErr: true,
                })
                var _This = this;
                setTimeout(function () {
                    _This.setState({
                        disSucOrErr: false,
                        showItem: false,
                        saveArr: [],//保存添加的信息
                        showCards: [],
                        mark: 0,
                        coursename: '',
                        stageNo: '',
                        orderNum: '',
                        introduceSth: '',
                        term: 1,
                        warnings: false,
                        clickflag: true,
                        teacherItem:'',
                    })
                }, 2000)
                var hashStr = window.location.hashStr
                // if (hashStr.indexof('/asscherProfession') != -1) {
                this.changeTrigger(true)
                // }
                // this.setState({
                //     showItem: false,
                //     saveArr: [],//保存添加的信息
                //     showCards: [],
                //     mark: 0,
                //     coursename: '',
                //     stageNo: '',
                //     orderNum: '',
                //     introduceSth: '',
                //     term: 1,
                // })
            }
        });

    }

    /**
    * 获取课程顺序
    * @param {*专业id} m :int
    * @param {*学期} t :int
    */
    getStageNum(m, t) {
        $.llsajax({
            url: '',
            type: "POST",
            success: data => {
                console.log(data)
            }
        });
    }

    // 继续添加
    continueAdd() {
        var arr = this.state.saveArr;
        var obj = {};
        // var mark = this.state.mark
        if (this.state.coursename.length < 1) {
            this.setState({
                warnings: true,
            })
            return false;
        } else {
            obj.name = this.state.coursename;
        }
       
        // if (this.state.introduceSth.length < 1) {
        //     this.setState({
        //         warnings: true,
        //     })
        //     return false;
        // } else {
        obj.content = this.state.introduceSth;
        // }
        if (this.state.teacherItem == '') {
            this.setState({
                warnings: true,
            })
            return false;
        } else {
            obj.lector = this.state.teacherItem;
        }
        if (this.state.stageNo == '') {
            this.setState({
                warnings: true,
            })
            return false;
        } else {
            obj.stage = this.state.stageNo;
        }
       
        if (this.state.orderNum == '') {
            // obj.ordernum = this.state.maxOrderNum;
            return false;
        } else {
            obj.ordernum = this.state.orderNum;
        }
        obj.majorId = this.state.majorId;
        obj.term = this.state.term;
        obj.mark = this.state.mark;
        arr.push(obj)
        this.setState({
            saveArr: arr,
            coursename: '',
            stageNo: '',
            orderNum: '',
            introduceSth: '',
            term: 1,
            mark: ++this.state.mark,
            warnings: false,
        })
        this.creatRightCard(arr)
        document.getElementById('editTeacher').selectedIndex = 0

    }
    /**
     * 右侧卡片
     * @param {*数据数组} arr :[]
     */
    creatRightCard(arr) {
        var len = arr.length;
        var cards = [];
        if (len > 0) {
            arr.map((v, i) => {
                cards.push(
                    <div className="cardItem" key={i + new Date()}>
                        <div className="cardItemName">课程名称：&nbsp;{v.name}</div>
                        <div className="cardItemStage">阶段总数：&nbsp;{this.stageNum(v.stage)}</div>
                        <div className="cardItemTerm">所属学期：&nbsp;{this.termNum(v.term)}</div>
                        <div className="cardItemTeacher">视频讲师：&nbsp;{this.teacherName(v.lector)}</div>
                        <div className="cardItemOrder">课程顺序：&nbsp;{v.ordernum}</div>
                        <div className="cardItemInterduce">课程介绍：&nbsp;{v.content}</div>
                        <div className="cardChangeBtn">
                            <a href="javascript:;" onClick={this.editHandle.bind(this, v.mark)}><i className="iconfont"></i>编辑</a>
                            <a href="javascript:;" onClick={this.deleHandle.bind(this, v.mark)}><i className="iconfont"></i>删除</a>
                        </div>
                    </div>

                )
            })
        } else {
            cards = []
        }
        this.setState({
            showCards: cards,
        })
    }

    /**
     * 选择学期
     * @param {*学期数 学期数最大为5，默认为1} t:int
     */
    chooseTermHandle(t) {
        // console.log(t)
        this.setState({
            term: t,
        })
        var m = this.state.majorId;
        this.getOrder(m, t)
    }
    // 输入课程名称
    changeNameHandle(e) {
        var value = e.target.value;
        if (value.length > 30) {
            return false
        }
        this.setState({
            coursename: value,
        })
    }
    // 选择阶段
    changeStageHanle(e) {
        var value = e.target.value;
        var reg = /^[1-9]\d*$/;
        // console.log(value)
        if (value.length < 1 || value == '') {
            this.setState({
                stageNo: '',
            })
        }
        if (!reg.test(value) || value > 5) {
            return false;
        }
        this.setState({
            stageNo: value,
        })
    }
    // 选择顺序
    changeOrderHandle(e) {
        var value = e.target.value;
        var reg = /^[1-9]\d*$/;
        var num = this.state.orderNum;
         var max = this.state.maxOrderNum;
        // console.log(value)
        if (value.length < 1) {
            this.setState({
                orderNum: '',
            })
        }
        if (!reg.test(value)) {
            return false;
        }
        
        this.setState({
            orderNum: value,
        })
    }
    maxOrder() {
        var value = this.state.orderNum;
        var arr = this.state.saveArr;
        var len = arr.length;
        var max = this.state.maxOrderNum;
        if(len>0){
            // console.log(arr)
            for(var i=0;i<len;i++){
                if(value == arr[i].ordernum){
                    this.setState({
                        isHiddenError: !this.state.isHiddenError,
                    })
                }
            }
        }
        if (value < max && value != '') {
            this.setState({
                isHiddenError: !this.state.isHiddenError,
            })
        }
        
        // if (value > max || value == '') {
        //     this.setState({
        //         orderNum: max,
        //     })
        // }
        // if (value < max && value != '') {
        //     this.setState({
        //         isHiddenError: !this.state.isHiddenError,
        //     })
        // }
    }
    // 输入介绍
    inputInterduce(e) {
        var value = e.target.value;
        if (value.length > 255) {
            return false
        }
        this.setState({
            introduceSth: value,
        })
    }
    // 选择老师
    changeTeacherHandle(e) {
        // console.log(e.target.value)
        this.setState({
            teacherItem: e.target.value,
        })
    }
    /**
     * 获取课程序列
     * @param {*专业id} m :int
     * @param {*学期} t :int
     * @param {*序列} n:int
     */
    getOrder(m, t, n) {
        $.llsajax({
            url: 'course/findCourseOrdernum',
            type: "POST",
            async: true,
            data: {
                majorid: m,
                term: t,
            },
            success: data => {
                // console.log(data)
                var num = Number(data.num) + 1;
                if (typeof (n) == 'undefined' || n == '') {
                    this.setState({
                        orderNum: num,
                        // maxOrderNum: num,
                    })
                } else {
                    this.setState({
                        orderNum: n,
                        // maxOrderNum: num,
                    })
                }
                this.setState({

                    maxOrderNum: num,
                })

            }
        });
    }

    /**
     * 将老师id转换成老师名字
     * @param {*老师id} id :str
     */
    teacherName(id) {
        var data = this.state.teacherData;
        var len = data.length;
        var str = '--'
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                if (id == data[i].id) {
                    str = data[i].name
                    break;
                }
            }
        }
        return str
    }
    /**
     * 将阶段数转换成汉字
     * @param {*阶段数} num :str
     */
    stageNum(num) {
        var num = num + '';
        var str = '';
        switch (num) {
            case '1':
                str = '一个阶段'
                break;
            case '2':
                str = '二个阶段'
                break;
            case '3':
                str = '三个阶段'
                break;
            case '4':
                str = '四个阶段'
                break;
            case '5':
                str = '五个阶段'
                break;
            default:
                str = '--'
        }
        return str
    }
    /**
     * 将学期数转换成汉字
     * @param {*学期数} num :str
     */
    termNum(num) {
        var num = num + '';
        var str = ''
        switch (num) {
            case '1':
                str = '第一学期'
                break;
            case '2':
                str = '第二学期'
                break;
            case '3':
                str = '第三学期'
                break;
            case '4':
                str = '第四学期'
                break;
            case '5':
                str = '第五学期'
                break;
            default:
                str = '--'
        }
        return str
    }

    /**
     * 获取编辑的数据
     * @param {*课程id} c :int
     */
    getEditAjax(c) {
        $.llsajax({
            url: 'course/findCourseById',
            type: "POST",
            data: {
                courseid: c,
            },
            success: data => {
                // console.log(data)
                this.setState({
                    // maxOrderNum: '',//序列上限
                    coursename: data.course.name,
                    teacherItem: data.course.lector,
                    stageNo: data.course.stage,
                    orderNum: data.course.ordernum,
                    introduceSth: data.course.content,
                    term: data.course.term,
                })
                this.getOrder(data.course.majorId, data.course.term, data.course.ordernum)
                document.getElementById('editTeacher').selectedIndex = data.course.lector;
            }

        });
    }

    // 生成教师选择列表
    creatTeacher(flag) {
        // course/findLector
        $.llsajax({
            url: 'course/findLector',
            type: "POST",
            async: true,
            success: data => {
                // console.log(data)
                var arr = [];
                var data = data.lector || [];
                var len = data.length;
                if (len > 0) {
                    data.map((v, i) => {
                        arr.push(
                            <option value={v.id} key={v.id}>&nbsp;{v.name}</option>
                        )
                    })
                }
                this.setState({
                    teacherData: data,
                    teacherList: arr,
                })
                if(flag===true){
                    this.setState({
                        teacherItem:data[0].id
                    })
                }
            }
        });
    }
    // 关闭浮层
    closeHandle() {
        // console.log('close')
        // this.changeTrigger(true)

        // if(1==1){
        //     return false;
        // }
        this.setState({
            showItem: false,
            saveArr: [],//保存添加的信息
            showCards: [],
            mark: 0,
            coursename: '',
            stageNo: '',
            orderNum: '',
            introduceSth: '',
            term: 1,
            warnings: false,
        })
        this.props.showFlag()
    }
    // 搜索
    searchCard(e) {
        var value = e.target.value;
        var data = this.state.saveArr;
        var arr = [];
        if (value == '') {
            arr = data;
        } else {
            var len = data.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    if (data[i].term == value) {
                        arr.push(data[i])
                    }
                }
            }
        }
        this.creatRightCard(arr);

    }

    // flux
    changeTrigger(flag) {
        act.changeItem(flag)
    }

    // 更新老师列表使用
    componentDidUpdate(){
        if(this.state.teacherItem!=''){
            document.getElementById('editTeacher').value = this.state.teacherItem;
        }
    }
}