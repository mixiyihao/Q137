import React, {Component} from 'react';
import './schoolSwitching.css';

export default class SchoolSwitching extends Component {
    constructor() {
        super();
        this.state = {
            schoolTabID: 0, // 班级切换索引
            schoolName: '', // 学校名字
            prewFlag: false, // 向左图标显示阀门
            nextFlag: false, // 向右图标显示阀门
            tabScrollLen: 0, // tab滑动
        }
    }

    componentDidMount() {
        this.setState({
            prewFlag: this.props.prewFlag,
            nextFlag: this.props.nextFlag,
        });
        let classNode = document.getElementById("schoolSwitching_title");
        $(window).scroll(function () {
            if ($(window).scrollTop() > 144) {
                classNode.style.position = 'fixed';
                classNode.style.top = "37px";
                classNode.style.left = "0px";
                classNode.style.zIndex = "50";
                classNode.style.boxShadow = "rgba(0, 0, 0, 0.072392) 0px 2px 5px";
                classNode.style.webkitBoxShadow = "rgba(0, 0, 0, 0.072392) 0px 2px 5px";
                classNode.style.msBoxShadow = "rgba(0, 0, 0, 0.072392) 0px 2px 5px";
            } else {
                classNode.style.position = '';
                classNode.style.boxShadow = '';
            }
        });
    }

    _showSchoolName() {
        return this.props.listAllSchool.map((value,index) => {
            return (
                <span style={this.props.listAllSchool.length <= 2 ? {width: "550px"} : {width: "255px"}} key={index} className={this.state.schoolTabID === index ? "Active studentManagement_titleWrap_span" : "studentManagement_titleWrap_span"} onClick={this.onSchoolClick.bind(this,index,value.id,value.name)}>{value.name}</span>
            );
        });
    }

    onSchoolClick(index,schoolID,schoolName) {
        this.setState({
            schoolTabID: index,
            schoolID: schoolID,
            schoolName: schoolName
        });
        this.props.onSchoolClick(index,schoolID,schoolName);
    }

    // 标签左滑动
    onTabPrew() {
        let schoolLen = this.props.listAllSchool.length;
        if (schoolLen <= 4 || this.state.prewFlag === false) {
            return false;
        }
        let schoolNum = this.state.tabScrollLen;
        let nums = schoolNum - 2;
        if (nums < schoolNum && nums >= 0) {
            this.setState({
                nextFlag: true,
            });
        }
        if (nums <= 0) {
            nums = 0;
            this.setState({
                prewFlag: false,
            });
        }
        let dis = -1 * nums * 255;
        this.refs.studentManagement_titleWrap_scroll.style.transform = "translate3d(" + dis + "px, 0px, 0px)";
        this.setState({
            tabScrollLen: nums
        })
    }

    // 标签右滑动
    onTabNext() {
        let schoolLen = this.props.listAllSchool.length;
        if (schoolLen <= 4 || this.state.nextFlag === false) {
            return false;
        }
        let schoolNum = this.state.tabScrollLen;
        let nums = Number(schoolNum) + 2;
        if (nums > 1) {
            this.setState({
                prewFlag: true,
            });
        }
        if (nums >= schoolLen - 4) {
            nums = schoolLen - 4;
            this.setState({
                nextFlag: false,
            });
        }
        let dis = -1 * nums * 255;
        this.refs.studentManagement_titleWrap_scroll.style.transform = "translate3d(" + dis + "px, 0px, 0px)";
        this.setState({
            tabScrollLen: nums
        })
    }

    render() {
        return (
            <div className="schoolSwitching_titleBox">
                <div className="studentManagement_title" id="schoolSwitching_title">
                    <div className="studentManagement_titleWrap">
                        <div className="studentManagement_titleContainer">
                            <div className="studentManagement_titleWrap_scrollCen"
                                 ref="studentManagement_titleWrap_scrollCen">
                                <div className="studentManagement_titleWrap_scroll"
                                     ref="studentManagement_titleWrap_scroll">
                                    {this._showSchoolName()}
                                </div>
                            </div>
                            <span
                                className={this.state.prewFlag ? "studentManagement_prew studentManagement_tabSpan iconfont icon-icon-test3" : "studentManagement_prew studentManagement_tabSpan iconfont icon-icon-test3 studentManagement_prewNone"}
                                onClick={this.onTabPrew.bind(this)}>

                                </span>
                            <span
                                className={this.state.nextFlag ? "studentManagement_next studentManagement_tabSpan iconfont icon-icon-test2" : "studentManagement_next studentManagement_tabSpan iconfont icon-icon-test2 studentManagement_nextNone"}
                                onClick={this.onTabNext.bind(this)}>
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentWillUnmount() {
        $(window).off('scroll');
    }
}