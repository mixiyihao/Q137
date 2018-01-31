import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './rankPage.css'
import TeacherComp from '../../../../teacherComponents/teacherPublic/teacherComp.js';
import AssistantSupComp from '../../../../assistantSup/public/teacherPublic/teacherComp.js';
// import Title1 from '../../majorMaster/public/teacherPublic/teacherComp.js'
import Title1 from '../../../../majorMaster/public/teacherPublic/teacherComp.js'
import HeadMasterTitle from '../../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Footer from '../../../../assistantSup/public/footer/footer.js';
import teacherComp from '../../../../teacherComponents/teacherQuestion/thEditexanbody';
import { hash, hashHistory } from 'react-router'
export default class RankPage extends React.Component {
    constructor() {
        super();
        this.state = {
            majorArr: [],
            mid: '0',
            type: 'p',//p paper q question
            trList: [],
            dataList: [],
            sortMark: '1',
            userJudge: sessionStorage.getItem('userJudge')
        }
    }
    componentWillMount() {
        this.getMajor()
        var mid = this.state.mid;
        var hashStr = window.location.hash;
        var type = hashStr.split('type=')[1]
        // var type = 'p'
        this.setState({
            type: type,
        })
        this.getList(mid, type)
    }
    onShowMajor() {

    }
    onCourseShow() {

    }
    onLessonShow() {

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
                {
                    this.state.userJudge == "MM" ?
                        <Title1
                            majors={this.state.majors}
                            onShowMajor={this.onShowMajor.bind(this)}
                            onCourseShow={this.onCourseShow.bind(this)}
                            onLessonShow={this.onLessonShow.bind(this)}
                        /> :
                        this.state.userJudge == "T"?
                            <TeacherComp onLessonShow={this.onLessonShow.bind(this)} onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)} />
                            : 
                            <AssistantSupComp onLessonShow={this.onLessonShow.bind(this)} onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}/>
                }
                <HeadMasterTitle
                    style={styles.title}
                    title={"考试管理"}
                    msg={"贴合知识点 自动判卷 多维度统计"}
                />
                <div className="rankPageWrap">
                    <div className="rankPageInner">

                        <h2>{this.state.type == 'p' ? '试卷贡献榜' : '试题贡献榜'}
                            <span onClick={this.goBack.bind(this)}>返回<i className="iconfont icon-back"></i></span>

                        </h2>
                        <div className="rankPageSele">
                            排名:
                            <select name="" id="sortsSelect" onChange={this.changeSort.bind(this)}>
                                <option value="1">&nbsp;从高到低</option>
                                <option value="2">&nbsp;从低到高</option>
                            </select>
                            专业来源:
                            <select name="" id="" onChange={this.changeMajor.bind(this)}>
                                <option value="0">&nbsp;全部专业</option>
                                {this.state.majorArr}
                            </select>
                        </div>
                        <table className="rankPageTable">
                            <tr>
                                <th>
                                    <div className="rankPageNo">排名</div>
                                </th>
                                <th>
                                    <div className='rankPagePerson'>创建人</div>
                                </th>
                                <th>
                                    <div className='rankPageNum'>贡献量</div>
                                </th>
                                <th>
                                    <div className='rankPageMajor'>专业来源(个)</div>
                                </th>

                            </tr>
                            <tbody>
                                {this.state.trList}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
    changeSort(e) {
        var vals = e.target.value;
        var mark = this.state.sortMark;
        var data = this.state.trList;
        if (vals != mark) {
            var arr = data.reverse();
            // this.createTable(arr)
            this.setState({
                trList: arr,
                sortMark: vals,
            })
        } else {
            var arr = data;
            this.setState({
                trList: arr,
                sortMark: vals,
            })
        }
        // if (vale == '1') {

        // }
    }
    changeMajor(e) {
        var vals = e.target.value;
        // console.log(vals)
        var type = this.state.type;
        this.getList(vals, type)
        this.setState({
            mid: vals,
            sortMark: '1',
        })
        document.getElementById('sortsSelect').value = '1'
    }
    getMajor() {
        $.llsajax({
            url: "major/findAllMajor",
            type: "POST",
            success: data => {
                // console.log(data)/
                var data = data.list || [];
                var arr = []
                var len = data.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        arr.push(
                            <option value={data[i].id} key={data[i].id}>&nbsp;{data[i].name}</option>
                        )
                    }
                }
                this.setState({
                    majorArr: arr
                })
            }
        })
    }
    getList(mid, type) {
        $.llsajax({
            url: "teachManage/listPaperRank",
            type: "POST",
            data: {
                mid: mid,
                type: type,
            },
            success: data => {
                // console.log(data)
                var arr = data.list || [];

                this.createTable(arr);
                this.setState({
                    dataList: arr,
                })
                // if()
            }
        })
    }
    createTable(arr) {
        var len = arr.length;
        var arr1 = [];
        if (len < 1) {
            arr1.push(
                <tr key="empty">
                    <td colSpan='4'>
                        <div className="nodata">没有数据</div>
                    </td>
                </tr>
            )
        } else {
            for (var i = 0; i < len; i++) {
                arr1.push(
                    <tr key={i + 'isData'}>
                        <td>
                            <div className="rankPageNo">
                                {this.sortTeacher(i)}
                            </div>
                        </td>
                        <td>
                            <div className='rankPagePerson'>
                                {arr[i].ownername}
                            </div>
                        </td>
                        <td>
                            <div className='rankPageNum'>
                                {arr[i].count || '0'}
                            </div>
                        </td>
                        <td>
                            <div className='rankPageMajor'>
                                {arr[i].majorcount}
                            </div>
                        </td>
                    </tr>
                )
            }
        }
        this.setState({
            trList: arr1,
        })
    }
    sortTeacher(i) {
        var i = Number(i) + 1;
        var str = '第' + i + '名'
        return str
    }
    goBack() {
        hashHistory.go(-1)
    }
}