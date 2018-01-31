import React, { Component } from 'react';
import TeacherComp from '../../public/header/teacherComp.js';
import HeadMasterTitle from '../../../headMasterComponents/headMasterTitle/headMasterTitle.jsx';
import Footer from '../../../assistantSup/public/footer/footer.js';
import MyContribute from './contentItem/contentItem.jsx'
import ContributeTab from './tabItem/tabItem.jsx'
import $ from 'jquery';
// import TeacherWork from '../../../teacherComponents/teacherWork/teacherWork.jsx';

export default class MyContribution extends Component {
    constructor() {
        super();
        this.state = {
            teacherData: [],
            info: {},
            feedback: {},
            // workStatistics: {},
            interewardStatistics: {},
            examStrage: {},
            id: null,
            index: 0,
        }
    }

    componentWillMount() {
        sessionStorage.setItem('displayFlag', 6)
        var hash = window.location.hash;
        if (hash.indexOf('id=') > -1 && hash.indexOf('index=') > -1) {

            var id = Base64.decode(hash.split('id=')[1].split('&')[0])
            var index = Base64.decode(hash.split('index=')[1])
            this.setState({
                id: id,
                index: index,
            })
            $.llsajax({
                url: 'teachManage/listAllTeacher',
                type: "POST",
                success: data => {
                    var arr = data.list != null && typeof (data.list) != undefined ? data.list : [];
                    // console.log(arr)
                    this.setState({
                        teacherData: arr,
                    })
                    var len = arr.length;
                    if (len > 0) {
                        this.getDataHandle(id)
                        this.setState({
                            id: id,
                            index:0,
                        })
                    }

                },
            })
        } else {

            $.llsajax({
                url: 'teachManage/listAllTeacher',
                type: "POST",
                success: data => {
                    var arr = data.list != null && typeof (data.list) != undefined ? data.list : [];
                    // console.log(arr)
                    this.setState({
                        teacherData: arr,
                    })
                    var len = arr.length;
                    if (len > 0) {
                        this.getDataHandle(arr[0].id)
                        this.setState({
                            id: arr[0].id
                        })
                    }

                },
            })
        }
    }
    propsChangeId(id, index) {
        console.log(id)
        
        this.getDataHandle(id)
        this.setState({
            index: index,
            id: id
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
                backgroundColor: "#fd724d",
                backgroundImage: "none",
            },
            width: {
                width: "1100px",
                margin: "20px auto"
            },
            imgWidth: {
                width: "100%",
                height: "100%"
            },
            bg: {
                backgroundColor: "#f4f4f5",
                minHeight: "650px",
                overflow: "hidden"
            }
        };
        return (
            <div>
                <TeacherComp onShowMajor={this.onShowMajor.bind(this)} onCourseShow={this.onCourseShow.bind(this)}
                    onLessonShow={this.onLessonShow.bind(this)}
                    onClickMessage1={this.onClickMessage1.bind(this)} />
                <HeadMasterTitle style={styles.title} title={"班主任管理"} msg={"多维度统计 全面分析 综合了解自己行业竞争力"} />
                <ContributeTab 
                data={this.state.teacherData} 
                propsChangeId={this.propsChangeId.bind(this)} 
                id={this.state.id} 
                index={this.state.index} />
                <MyContribute
                    id={this.state.id}
                    info={this.state.info}
                    index={this.state.index}
                    feedback={this.state.feedback}
                    // workStatistics={this.state.workStatistics}
                    interewardStatistics={this.state.interewardStatistics}
                    examStrage={this.state.examStrage}
                />
                <Footer />
            </div>
        );
    }
    getDataHandle(id) {
        // 信息
        // console.log(id)
        $.llsajax({
            url: 'contribute/info',
            type: "POST",
            data: {
                teacherid: id,
            },
            success: data => {
                // console.log(data)
                this.setState({
                    info: data
                })
            },
        })
        // 评价
        $.llsajax({
            url: 'contribute/stufeedback',
            type: "POST",
            async: false,
            data: {
                teacherid: id,
            },
            success: data => {
                // console.log(data)
                this.setState({
                    feedback: data
                })
            },
        })
        // // 工作
        // $.llsajax({
        //     url: 'contribute/workStatistics',
        //     type: "POST",
        //     async: false,
        //     data: {
        //         teacherid: id,
        //     },
        //     success: data => {
        //         // console.log(data)
        //         this.setState({
        //             workStatistics: data
        //         })
        //     },
        // })

        // 管理
        $.llsajax({
            url: 'contribute/interewardStatistics',
            type: "POST",
            async: false,
            data: {
                teacherid: id,
            },
            success: data => {
                // console.log(data)
                this.setState({
                    interewardStatistics: data
                })
            },
        })
        // 班级
        $.llsajax({
            url: 'contribute/examStrage',
            type: "POST",
            async: false,
            data: {
                teacherid: id,
            },
            success: data => {
                // console.log(data)
                this.setState({
                    examStrage: data
                })
            },
        })

    }
}