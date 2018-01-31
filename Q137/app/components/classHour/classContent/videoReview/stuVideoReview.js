
import React from 'react';
import styles from './styleStuVideoReview.js';

export default class VideoReview extends React.Component {
    constructor() {
        super();
        this.state = {
            lessonresourceListArr: [],
            titleName: [],
            userJudge: sessionStorage.getItem("userJudge"), // 从session中获取是教师还是学生
            iID: 0,
            videoName: [],
            cacheID: 0,
        }
    }
    // 第一次加载视频
    componentDidMount() {
        console.log(this.props.lessonresourceList)
        this.props.lessonresourceList.map((value, key) => {
            this.state.videoName.push(value.name);
            this.state.lessonresourceListArr.push(value.cc_address.replace(/width=600/, "width=690"))
        });
        let script = window.document.createElement("script");
        script.src = this.state.lessonresourceListArr[0];
        sessionStorage.setItem("othername", this.state.videoName[0]);
        let a = document.getElementById("aaa");
        a.insertBefore(script, a.firstChild);
        $(".videoReviewListSpan").eq(0).addClass('videoReviewListSpan1');
        $(".videoReviewListSpan").eq(0).children("i").addClass('videoReviewListIShow').removeClass('videoReviewListIHide');
    }
    // 点击视频列表切换视频
    clickVideoList(id) {
        let lessonresourceListArr = this.state.lessonresourceListArr[id];
        let script = window.document.createElement("script");
        script.src = lessonresourceListArr;
        let a = document.getElementById("aaa");
        a.replaceChild(script, a.firstChild);
    }
    // 鼠标点击视频列表样式
    lookVideo(id) {
        let othername = document.getElementById("spanName" + id).innerHTML;
        sessionStorage.setItem("othername", othername);
        this.setState({
            iID: id
        });
        $(".videoReviewListSpan").eq(id).addClass('videoReviewListSpan1').parents().siblings().children('.videoReviewListSpan').removeClass('videoReviewListSpan1');
        this.setState({
            titleName: $(".videoReviewListSpan").eq(id).children("span").html()
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
            cacheID: id
        });
    }
    _showVideoList() {
        return this.props.lessonresourceList.map((value, key) => {
            return (
                <p className="videoReviewListP" style={styles.videoReviewListP} onClick={this.clickVideoList.bind(this, key)} key={key} name={value.id}>
                    <span className="videoReviewListSpan videoReviewListSpan2" onMouseEnter={this.lookVideoCss.bind(this, key)} onMouseLeave={this.hideVideoCss.bind(this, key)} style={styles.videoReviewListSpan}>
                        <i style={this.state.iID == key ? styles.videoReviewListIShow : styles.videoReviewListI}></i>
                        <span style={styles.videoReviewListName} onClick={this.lookVideo.bind(this, key)} id={"spanName" + key}>{value.name}</span>
                        <span onMouseEnter={this.onCacheEnter.bind(this, key)} onMouseLeave={this.onCacheLeave.bind(this, key)} onClick={this.onLinkToVideo.bind(this, value.id)} className={"videoReviewListCache" + key} style={this.state.iID == key || this.state.cacheID == key ? styles.videoReviewListCache : styles.videoReviewListCache2}>提前缓存</span>
                    </span>
                </p>
            );
        });
    }
    onCacheEnter(key) {
        $(".videoReviewListP").eq(key).children(".videoReviewListSpan").children(".videoReviewListCache" + key).css({ opacity: "1" });
    }
    onCacheLeave(key) {
        $(".videoReviewListP").eq(key).children(".videoReviewListSpan").children(".videoReviewListCache" + key).css({ opacity: "0.5" });
    }

    onLinkToVideo(id) {
        window.open('video.html?key=' + id + "&name=" + Base64.encodeURI(this.props.name) + "&course=" + Base64.encodeURI(this.props.coursename));
    }
    render() {
        return (
            <div style={styles.videoReviewWrap}>
                <div style={this.props.StuVideoReview ? this.props.StuVideoReview : styles.videoReviewBox}>
                    {/*<div style={styles.videoReviewCaption}>视频回顾</div>*/}
                    <div style={styles.videoReviewCenterStudent}>
                        <div style={styles.videoReviewShowCenter}>
                            <div style={styles.videoReviewShowMsg}>
                                <p style={styles.videoReviewShowMsgP}>说明：该视频暂时无法播放，请安装Flash播放器。为了能够正常观看视频，请点击下载最新版本。<a href="https://get2.adobe.com/cn/flashplayer/?no_redirect" target="_blank" style={styles.videoReviewShowMsgA}>立即下载</a></p>
                            </div>
                            <div style={styles.videoReviewShow} id="aaa"></div>
                            <div style={styles.videoReviewList}>
                                <div style={styles.videoReviewListTitle}>
                                    <div style={styles.videoReviewListTitleBox}>
                                        <i style={styles.videoReviewListTitleI} className="iconfont icon-bofangliebiao"></i>
                                        <span style={styles.videoReviewListTitleSpan}>视频播放列表</span>
                                    </div>
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
