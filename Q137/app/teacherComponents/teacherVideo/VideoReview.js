
import React from 'react';
import $ from 'jquery';
import styles from './styleVideoReview.js';
import './styleVideoReview.css';

export default class VideoReview extends React.Component {
    constructor() {
        super();
        this.state = {
            lessonresourceListArr: [],
            titleName: [],
            userJudge: sessionStorage.getItem("userJudge"), // 从session中获取是教师还是学生
            iID: 0,
            videControlFlag: false,
            videControlFlag2: false,
            classesList: [],
            videoKey: 0,
            cacheID: 0,
        }
    }
    componentWillMount() {
        if (this.props.userJudge === "T") {
            this.onRefershClass();
        }
    }
    // 第一次加载视频
    componentDidMount() {
        let a = document.getElementById("aaa");
        this.props.lessonresourceList.map((value, key) => {
            this.state.lessonresourceListArr.push(value.cc_address);
            let script = window.document.createElement("script");
            script.src = value.cc_address.replace(/width=600/, "width=540");
            let node = document.createElement("div");
            node.setAttribute("id", "cc_address" + key);
            node.setAttribute('style', 'display: none');
            node.insertBefore(script, node.firstChild);
            a.appendChild(node);
            document.getElementById("cc_address0").setAttribute('style', 'display: block');
        });
        if (this.props.lessonresourceList.length !== 0) {
            this.setState({
                videoKey: this.props.lessonresourceList[0].id
            });
        }
        $(".videoReviewListSpan").eq(0).addClass('videoReviewListSpan1');
        $(".videoReviewListSpan").eq(0).children("i").addClass('videoReviewListIShow').removeClass('videoReviewListIHide');
    }
    // 鼠标点击视频列表样式
    lookVideo(id, videoID) {
        this.setState({
            iID: id
        });
        $(".videoReviewListSpan").eq(id).addClass('videoReviewListSpan1').parents().siblings().children('.videoReviewListSpan').removeClass('videoReviewListSpan1');
        this.setState({
            titleName: $(".videoReviewListSpan").eq(id).children("span").html()
        });
        $("#cc_address" + id).css({ display: "block" });
        $("#cc_address" + id).siblings().css({ display: "none" });
        this.setState({
            videoKey: videoID
        });
    }
    // 鼠标移到视频列表跟随样式
    lookVideoCss(id) {
        $(".videoReviewListSpan").eq(id).addClass('videoReviewListSpan3');
        this.setState({
            cacheID: id
        });
    }
    hideVideoCss(id) {
        $(".videoReviewListSpan").eq(id).removeClass('videoReviewListSpan3');
        this.setState({
            cacheID: -1
        });
    }
    onCacheEnter(key) {
        $(".videoReviewListP").eq(key).children(".videoReviewListSpan").children(".videoReviewListCache" + key).css({ opacity: "1" });
    }
    onCacheLeave(key) {
        $(".videoReviewListP").eq(key).children(".videoReviewListSpan").children(".videoReviewListCache" + key).css({ opacity: "0.5" });
    }
    _showVideoList() {
        return this.props.lessonresourceList.map((value, key) => {
            return (
                <p className="videoReviewListP" style={styles.videoReviewListP} key={key} name={value.id}>
                    <span className="videoReviewListSpan videoReviewListSpan2" onMouseEnter={this.lookVideoCss.bind(this, key)} onMouseLeave={this.hideVideoCss.bind(this, key)} style={styles.videoReviewListSpan}>
                        <i style={this.state.iID == key ? styles.videoReviewListIShow : styles.videoReviewListI}>

                        </i>
                        <span style={styles.videoReviewListName} title={value.name} onClick={this.lookVideo.bind(this, key, value.id)}>{value.name}</span>
                        <span onMouseEnter={this.onCacheEnter.bind(this, key)} onMouseLeave={this.onCacheLeave.bind(this, key)} onClick={this.onLinkToVideo.bind(this, value.id)} className={"videoReviewListCache" + key} style={this.state.iID == key || this.state.cacheID == key ? styles.videoReviewListCache : styles.videoReviewListCache2}>提前缓存</span>
                    </span>
                </p>
            );
        });
    }
    _showClassesList() {
        return this.state.classesList.map((value, item) => {
            return (
                <div key={item} style={styles.classItem}>
                    <p style={styles.classItemTitle}>{value.name}</p>
                    <div style={styles.classItemControll}>
                        <span className={value.type == 1 ? "classItemControllIcon classItemControllIcon-checked" : "classItemControllIcon"} onClick={value.type == 1 ? this.onControllerHide.bind(this, 0, value.id) : this.onControllerShow.bind(this, 1, value.id)}>

                        </span>
                        <span style={styles.classItemControllMsg}>{value.type == 1 ? "允许访问" : "禁止访问"}</span>
                    </div>
                </div>
            );
        });
    }
    onLinkToVideo(id) {
        window.open('video.html?key=' + id + "&name=" + Base64.encodeURI(this.props.name) + "&course=" + Base64.encodeURI(this.props.coursename));
    }
    getVideoCiontrol(flag, id) {
        if (window.location.hash.indexOf("&") > 0) {
            this.getVideoCiontrolAjax(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]), flag, id);
        } else {
            this.getVideoCiontrolAjax(Base64.decode(window.location.hash.split("?")[1].split("=")[1]), flag, id);
        }
    }
    getFindClassByLessonAjax(LessonID) {
        // 获取班级信息
        $.llsajax({
            url: "homework/findClassByLesson/" + LessonID,
            type: "POST",
            async: false,
            success: classesData => {
                this.setState({
                    classesList: classesData.list
                });
            }
        });
    }
    onRefershClass() {
        if (window.location.hash.indexOf("&") > 0) {
            this.getFindClassByLessonAjax(Base64.decode(window.location.hash.split("?")[1].split("&")[0].split("=")[1]));
        } else {
            this.getFindClassByLessonAjax(Base64.decode(window.location.hash.split("?")[1].split("=")[1]));
        }
    }
    getVideoCiontrolAjax(LessonID, flag, id) {
        $.llsajax({
            url: "lesson/videoControl",
            type: "POST",
            async: false,
            data: {
                lesson_id: LessonID,
                class_id: id,
                flag: flag
            },
            success: videoControl => { }
        });
    }
    // 点击展开班级列表
    onVideoRightsShow(e) {
        e.preventDefault();
        this.setState({
            videControlFlag: true,
            videControlFlag2: true,
        });
    }
    // 控制列表不消失
    videoRightsListBox() {
        this.state.videControlFlag2 = false;
    }
    videoRightsListBoxHide() {
        this.state.videControlFlag2 = true;
    }
    // 允许/禁止 控制功能
    onControllerShow(flag, id) {
        this.getVideoCiontrol(flag, id);
        this.state.videControlFlag2 = false;
        this.onRefershClass();
    }
    onControllerHide(flag, id) {
        this.getVideoCiontrol(flag, id);
        this.state.videControlFlag2 = false;
        this.onRefershClass();
    }
    // 点击其他地方列表消失
    onVideoRightsHide(e) {
        if (!this.state.videControlFlag2) {
            return false;
        }
        this.setState({
            videControlFlag: false,
            videControlFlag2: false,
        });
    }
    onExamRightsShow(e) {
        e.preventDefault();
        this.setState({
            examControlFlag: true,
            examControlFlag2: true,
            videControlFlag: false,
            videControlFlag2: false,
            isExamOrVideo: 1
        });
    }
    examRightsListBox() {
        this.state.examControlFlag2 = false;
    }
    examRightsListBoxHide() {
        this.state.examControlFlag2 = true;
    }
    render() {
        return (
            <div style={styles.videoReviewWrap} id="controllerBox" onClick={this.onVideoRightsHide.bind(this)}>
                <div style={styles.videoReviewBoxTeacher}>
                    {/*<div style={styles.videoReviewCaption}>我要上课</div>*/}
                    <div style={styles.videoReviewCenter}>
                        <div style={styles.videoReviewShowCenter}>
                            <div style={styles.videoReviewShowMsg}>
                                <p style={styles.videoReviewShowMsgP}>说明：该视频暂时无法播放，请安装Flash播放器。为了能够正常观看视频，请点击下载最新版本。<a href="https://get2.adobe.com/cn/flashplayer/?no_redirect" target="_blank" style={styles.videoReviewShowMsgA}>立即下载</a></p>
                            </div>
                            <div style={styles.videoReviewShow} id="aaa">
                            </div>
                            <div style={styles.videoReviewList}>
                                <div style={styles.videoReviewListTitle}>
                                    <div style={styles.videoReviewListTitleBox}>
                                        <i style={styles.videoReviewListTitleI} className="iconfont icon-bofangliebiao">

                                        </i>
                                        <span style={styles.videoReviewListTitleSpan}>视频播放列表</span>
                                    </div>
                                    {
                                        this.props.userJudge == "TM" || this.props.userJudge == "MM" || this.props.userJudge == "EM" || this.props.userJudge == "PM" ? null :
                                            <div id="videoRights" className={this.state.videControlFlag ? "videoRights2" : "videoRights"}>
                                                <div style={styles.videoRightsIconBox} className="videoRightsIconBox" onClick={this.onVideoRightsShow.bind(this)}>
                                                    <i className="iconfont icon-shezhi" style={styles.videoRightsIcon}>

                                                    </i>
                                                    <span style={styles.videoRightsMsg} >视频权限</span>
                                                </div>
                                                <div className="videoRightsListBox" onMouseEnter={this.videoRightsListBox.bind(this)} onMouseLeave={this.videoRightsListBoxHide.bind(this)} style={this.state.videControlFlag ? styles.videoRightsListBoxShow : styles.videoRightsListBoxHide}>
                                                    <i style={styles.videoRightsListBoTriangle}>

                                                    </i>
                                                    <div style={styles.videoRightsList}>
                                                        {this._showClassesList()}
                                                    </div>
                                                </div>
                                            </div>
                                    }

                                </div>
                                <div style={styles.videoReviewListWrap}>
                                    {this._showVideoList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
