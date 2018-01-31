/**
 * Created by YH on 2017/1/11.
 */

import React from 'react';
import { Link, hashHistory } from 'react-router';
import '../../components/profession/tab/styleTab.css'
import EditCourse from '../../majorMaster/public/editCourse/editCourse.jsx'
import EditContent from './editContent/editContent.jsx'
import $ from 'jquery'
import stores from '../../majorMaster/public/sto/sto.js'
import BombBox from '../../components/public/bombBox/bombBox.js'
export default class banner extends React.Component {
    constructor() {
        super();
        //导航栏置顶悬浮
        this.state = {
            xueqi: [
                '第一学期',
                '第二学期',
                '第三学期',
                '第四学期',
                '第五学期'
            ],
            nowTerm: [],
            userJudge: sessionStorage.getItem("userJudge"),
            height: [],
            courseid: '',
            majorid: '',
            showFlag: false,
            type: 0, //0 添加 1修改
            majorNames: '',
            // 编辑介绍
            showContentFlag: false,
            // bombbox
            isHidden: true,
            bombBoxMsg: '确认删除该课程？',
        }
    }
    componentWillReceiveProps(props) {
        var judge = sessionStorage.getItem('userJudge');
        if (judge == 'MM') {
            this.setState({
                majorid: props.major.id
            })
        }
    }
    componentDidMount() {
        let term1 = 0;
        let term2 = 0;
        let term3 = 0;
        let term4 = 0;
        let term5 = 0;
        this.props.courseList.map((value, key) => {
            if (value.term == 1) {
                term1 = term1 + 1;
            } else if (value.term == 2) {
                term2 = term2 + 1;
            } else if (value.term == 3) {
                term3 = term3 + 1;
            } else if (value.term == 4) {
                term4 = term4 + 1;
            } else if (value.term == 5) {
                term4 = term5 + 1;
            }
        });
        this.setState({
            nowTerm: this.props.nowTerm
        });
        var oli = [term1, term2, term3, term4];
        var maxInNumbers = Math.max.apply(Math, oli);
        let heightNum = 40 * maxInNumbers + 50;
        $('.z-list li').css('height', heightNum);
        $('.z-list li').mouseenter(function () {
            //rgb转16进制
            function colorRGB2Hex(color) {
                var rgb = color.split(',');
                var r = parseInt(rgb[0].split('(')[1]);
                var g = parseInt(rgb[1]);
                var b = parseInt(rgb[2].split(')')[0]);
                var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                return hex;
            }
            var xColor = $(this).children().css('background-color');
            var sHexColor = colorRGB2Hex(xColor);
            $(this).css("border", "1px" + sHexColor + " solid");
        }).mouseleave(function () {
            $(this).css("border", "1px #fff solid");
        });
        stores.addChangeListener(this._onChange.bind(this))
    }
    componentDidUpdate() {
        // console.log('update')
        let term1 = 0;
        let term2 = 0;
        let term3 = 0;
        let term4 = 0;
        let term5 = 0;
        this.props.courseList.map((value, key) => {
            if (value.term == 1) {
                term1 = term1 + 1;
            } else if (value.term == 2) {
                term2 = term2 + 1;
            } else if (value.term == 3) {
                term3 = term3 + 1;
            } else if (value.term == 4) {
                term4 = term4 + 1;
            } else if (value.term == 5) {
                term4 = term5 + 1;
            }
        })
        var oli = [term1, term2, term3, term4, term5];
        var maxInNumbers = Math.max.apply(Math, oli);
        let heightNum = 40 * maxInNumbers + 50;
        $('.z-list li').css('height', heightNum);
        // $('').checked(false)
        $("[name='cs']").removeAttr("checked");
    }
    // scrollToAnchor(anchorName) {
    //     if (anchorName) {
    //         let anchorElement = document.getElementById(anchorName);
    //         if (anchorElement) { anchorElement.scrollIntoView(false); }
    //     }
    // }
    render() {
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var arr4 = [];
        var arr5 = [];
        if (sessionStorage.getItem('userJudge') == 'MM') {
            this.props.courseList.map((value, key) => {
                if (value.term == 1) {
                    arr1.push(<a href="javascript:;" key={key}>
                        <input type="radio" name='cs' onClick={this.chooseHandle.bind(this, value.id)} />
                        <i onClick={this.linkTo.bind(this, value.id)}>{value.name}</i>

                    </a>);
                } else if (value.term == 2) {
                    arr2.push(<a href="javascript:;" key={key}>
                        <input type="radio" name='cs' onClick={this.chooseHandle.bind(this, value.id)} />
                        <i onClick={this.linkTo.bind(this, value.id)}>{value.name}</i>
                    </a>);
                } else if (value.term == 3) {
                    arr3.push(<a href="javascript:;" key={key}>
                        <input type="radio" name='cs' onClick={this.chooseHandle.bind(this, value.id)} />
                        <i onClick={this.linkTo.bind(this, value.id)}>{value.name}</i>
                    </a>);
                } else if (value.term == 4) {
                    arr4.push(<a href="javascript:;" key={key}>
                        <input type="radio" name='cs' onClick={this.chooseHandle.bind(this, value.id)} />
                        <i onClick={this.linkTo.bind(this, value.id)}>{value.name}</i>
                    </a>);
                } else if (value.term == 5) {
                    arr5.push(<a href="javascript:;" key={key}>
                        <input type="radio" name='cs' onClick={this.chooseHandle.bind(this, value.id)} />
                        <i onClick={this.linkTo.bind(this, value.id)} >{value.name}</i>
                    </a>);
                }
            });
        } else {

            this.props.courseList.map((value, key) => {
                if (value.term == 1) {
                    arr1.push(<Link to={{ pathname: this.state.userJudge === "MM" ? "/courseManagement" : "/teacherCourse", query: { id: Base64.encodeURI(value.id) } }} key={key}>
                        {value.name}
                    </Link>);
                } else if (value.term == 2) {
                    arr2.push(<Link to={{ pathname: this.state.userJudge === "MM" ? "/courseManagement" : "/teacherCourse", query: { id: Base64.encodeURI(value.id) } }} key={key}>
                        {value.name}
                    </Link>);
                } else if (value.term == 3) {
                    arr3.push(<Link to={{ pathname: this.state.userJudge === "MM" ? "/courseManagement" : "/teacherCourse", query: { id: Base64.encodeURI(value.id) } }} key={key}>
                        {value.name}
                    </Link>);
                } else if (value.term == 4) {
                    arr4.push(<Link to={{ pathname: this.state.userJudge === "MM" ? "/courseManagement" : "/teacherCourse", query: { id: Base64.encodeURI(value.id) } }} key={key}>
                        {value.name}
                    </Link>);
                } else if (value.term == 5) {
                    arr5.push(<Link to={{ pathname: this.state.userJudge === "MM" ? "/courseManagement" : "/teacherCourse", query: { id: Base64.encodeURI(value.id) } }} key={key}>
                        {value.name}
                    </Link>);
                }
            });
        }
        let styleText = {
            listShow: {
                display: "block",
                width: "172px"
            },
            listHide: {
                display: "none"
            }
        };
        let styleColor = {
            wColor: {
                background: '#49c0e0',
                color: '#fff'
            },
            zColor: {
                background: '#ff6b01',
                color: '#fff'
            },
            yColor: {
                background: '#f5f5f5',
                color: '#606060'
            }
        };
        let styleCartoon = {
            Acartoon: {
                boxShadow: '4px 4px 4px #d5e5e6',
                animation: 'Scale .3s 1 forwards'
            },
            Bcartoon: {
                boxShadow: '0px 0px 0px #d5e5e6',
                animation: 'Scale .3s 0 forwards'
            },
            teacherBox: {
                paddingLeft: "0px"
            },
            teacherBoxCenter: {
                width: "260px",
                margin: "0 auto",
                position: "relative"
            },
            teacherBoxPadding: {
                padding: "0px 120px 0 120px",
                overflow: "hidden"
            },
            banner: {
                width: "1100px",
                margin: "20px auto",
                background: "#fff"
            },
            z_bannerBox: {
                background: "rgb(244, 244, 245)",
                overflow: "hidden"
            }
        };
        let showMethod = {
            display: sessionStorage.getItem('userJudge') == 'MM' ? 'block' : 'none',
        }
        // console.log(this.props.content);
        return (
            <div className='z-navBox'>
                <div style={this.state.userJudge != "S" ? styleCartoon.z_bannerBox : null}>
                    <div className="z-banner" style={this.state.userJudge != "S" ? styleCartoon.banner : null}>
                        <div className="z-banner1" style={this.state.userJudge != "S" ? styleCartoon.teacherBoxPadding : null}>
                            {
                                this.props.content == null || this.props.content == "" && sessionStorage.getItem('userJudge') != 'MM' ?
                                    null
                                    :
                                    <div className="z-caption" id="screens">专业介绍
                                        <a href="javascript:;" className="editContentBtn button commonButton" style={showMethod} onClick={this.showContent.bind(this)}>
                                            <i className="iconfont icon-bianji"></i>
                                            编辑专业介绍</a>
                                    </div>
                            }
                            <div className='z-caption-content'>{this.props.content}</div>
                            <div className="z-caption" id="screens1">专业章节
                                <div className="captionEditMethod" style={showMethod}>
                                    <a href="javascript:;" className="button commonButton" onClick={this.addCourse.bind(this)}><i className="iconfont icon-tianjia"></i>配置课程</a>
                                    <a href="javascript:;" className={this.state.courseid == '' ? "button banButton" : "button commonButton"} onClick={this.editCourse.bind(this)}><i className="iconfont icon-bianji"></i>编辑课程</a>
                                    <a href="javascript:;" className={this.state.courseid == '' ? "button banButton" : "button commonButton"} onClick={this.deleCourse.bind(this)}><i className="iconfont icon-SHANCHU-"></i>删除课程</a>
                                </div>
                            </div>
                            <div className='z-list'>
                                <div className='z-kuang'></div>
                                <ul>
                                    <li className='ali' style={arr1.length == 0 ? styleText.listHide : styleText.listShow}>
                                        <div className='z-xueqi' id='1' style={styleColor.wColor}>第一学期
                                        </div>
                                        {arr1}
                                    </li>
                                    <li className='bli' style={arr2.length == 0 ? styleText.listHide : styleText.listShow}>
                                        <div className='z-xueqi' id='2' style={styleColor.wColor}>第二学期

                                        </div>
                                        {arr2}
                                    </li>
                                    <li className='cli' style={arr3.length == 0 ? styleText.listHide : styleText.listShow}>
                                        <div className='z-xueqi' id='3' style={styleColor.wColor}>第三学期

                                        </div>
                                        {arr3}
                                    </li>

                                    <li className='dli' style={arr4.length == 0 ? styleText.listHide : styleText.listShow}>
                                        <div className='z-xueqi' id='4' style={styleColor.wColor}>第四学期

                                        </div>
                                        {arr4}
                                    </li>
                                    <li className='eli' style={arr4.length == 0 ? styleText.listHide : styleText.listShow}>
                                        <div className='z-xueqi' id='5' style={styleColor.wColor}>第五学期

                                        </div>
                                        {arr5}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {sessionStorage.getItem('userJudge') == 'MM' ?
                    <EditCourse
                        showItem={this.state.showFlag}
                        majorId={this.state.majorid}
                        majorNames={this.state.majorNames}
                        showFlag={this.changeShowFlag.bind(this)}
                        courseid={this.state.courseid}
                        type={this.state.type}
                        responseData={this.updateDate.bind(this)}
                    /> :
                    ''
                }
                {sessionStorage.getItem('userJudge') == 'MM' ?
                    <EditContent
                        showItem={this.state.showContentFlag}
                        majorId={this.state.majorid}
                        showFlag={this.changeContentShowFlag.bind(this)}
                        responseData={this.updateDate.bind(this)}
                        content={this.props.content}
                    /> :
                    ''
                }
                <BombBox
                    hideClick={this.hideClick.bind(this)}
                    enterClick={this.enterClick.bind(this)}
                    isHidden={this.state.isHidden}
                    bombBoxMsg={this.state.bombBoxMsg}
                />
            </div>
        );
    }
    linkTo(id) {
        hashHistory.push({
            pathname: '/courseManagement',
            query: {
                id: Base64.encodeURI(id)
            }
        })
    }
    chooseHandle(id, e) {
        // console.log(id)
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        this.setState({
            courseid: id,
        })
        // e.previentDefault
    }
    updateDate() {
        var judge = sessionStorage.getItem('userJudge');
        if (judge == 'MM') {
            // console.log('updateBetween')
            this.props.changeHappend();
            this.setState({
                courseid:'',
            })
        }
    }
    // 增删改
    addCourse() {
        this.setState({
            type: 0,
            showFlag: true,
        })
    }
    editCourse() {
        if (this.state.courseid == '') {
            return false;
        }
        this.setState({
            type: 1,
            showFlag: true,
        })
    }
    deleCourse() {
        // console.log(this.state.courseid)
        if (this.state.courseid == '') {
            return false;
        }
        this.setState({
            isHidden: false,
        })

    }
    showContent() {
        this.setState({
            showContentFlag: true,
        })
    }
    // 展示
    changeShowFlag() {
        this.setState({
            showFlag: false,
        })
    }
    changeContentShowFlag() {
        this.setState({
            showContentFlag: false,
        })
    }
    _onChange() {
        // console.log(stores.getAll())
        var mark = stores.getAll()
        if (mark) {
            this.updateDate();
        }
    }
    componentWillUnmount() {
        stores.removeChangeListener(this._onChange.bind(this))
    }
    enterClick() {
        // var ids = this.state.deleId
        // var stuId = this.state.stuId
        var ci = this.state.courseid;
        var mi = this.state.majorid;
        $.llsajax({
            url: 'course/deleteCourseById',
            type: "POST",
            async: true,
            data: {
                courseid: ci,
                majorid: mi,
            },
            success: data => {
                // console.log(data)
                this.updateDate()
                this.setState({
                    courseid: ''
                })
            }
        });
        this.setState({
            isHidden: true,
        })
    }
    hideClick() {
        this.setState({
            isHidden: true
        })
    }
}
