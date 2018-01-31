
import React from 'react';
import './styleSearchResult.css';
import $ from 'jquery'
import zan from '../../../images/search/asasa.jpg';
import zan2 from '../../../images/search/qwewewewe.jpg';

//搜索结果组件
export default class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            dataResult: [],
            dataResultNow: [],
            flag: false,
            ShowHide: true,
            userJudge: sessionStorage.getItem("userJudge"), // 从session中获取是教师还是学生
            topFiveData: [],
            serachValue: ''
        }
    }
    componentDidMount() {
        let _this = this;
        window.canAutoScroll = true;
        //只要滚动事件发生，就停止自动滚动定位方法的执行
        var timeout = null;
        var panel = $(window);
        panel.scroll(function(){
            if(timeout != null){
                window.clearTimeout(timeout);
            }
            window.canAutoScroll = false;
            //500ms后，假定认为停止滚动
            timeout = window.setTimeout(function(){
                window.canAutoScroll = true;
            },100);
        });
        this.timer = setInterval(
            () => {
                var scrollNum = $(window).scrollTop();
                if (scrollNum > 800) {
                    if (window.canAutoScroll) {
                        $(".y-topTo").fadeIn(1000);
                    } else {
                        $(".y-topTo").css({
                            display: "none"
                        });
                    }
                } else {
                    $(".y-topTo").css({
                        display: "none",
                    });
                }
            },
            100
        );

    }
    componentWillMount() {
        this.state.serachValue = this.props.keyword;
        this.setState({
            serachValue: this.state.serachValue
        });
        this.getFindQuestion();
        this.getFindTopAjax();
    }
    // top5Qusetion
    getFindTopAjax() {
        $.llsajax({
            url: "onlineqa/findTop",
            type: "POST",
            async: true,
            success: findTopData => {
                let data = findTopData.map;
                let topFiveData = [];
                for (let i in data) {
                    topFiveData.push(data[i])
                }
                this.setState({
                    topFiveData: topFiveData,
                });
            }
        });
    }
    //获取数据
    getFindQuestion(flag) {
        this.setState({
            dataResultNow: []
        });
        if (this.props.keyword == "" && flag !== true) {
            this.setState({
                ShowHide: false
            });
        } else {
            for (var i = 1; i <= this.state.page; i++) {
                if (this.state.page <= i) {
                    $.llsajax({
                        url: "onlineqa/findQuestion",
                        data: {
                            keyword: this.state.serachValue,
                            pageno: this.state.page
                        },
                        type: "POST",
                        async: false,
                        success: resultData => {
                            var arr = this.state.dataResult;
                            resultData.list.map((value) => {
                                arr.push(value);
                            });
                            this.setState({
                                dataResult: arr,
                                dataResultNow: resultData.list
                            });
                        }
                    });
                }
            }
        }
    }
    onInputValue2(inputValue) {

    }
    //加载更多
    searchMore() {
        this.setState({
            page: ++this.state.page
        });
        this.getFindQuestion(true)
    }
    thumbsUp(key, imgKey) {
        $.llsajax({
            url: "onlineqa/thumbsup",
            type: "post",
            data: {
                questionid: key
            },
            success: deleteData => {
                if (deleteData.flag == "success") {
                    let $Value = $(".y-answereValuateFabulous span").eq(imgKey).html();
                    $(".y-answereValuateFabulous span").eq(imgKey).html(parseInt($Value) + 1)
                    $(".y-answereValuateFabulous img").eq(imgKey).replaceWith("<img src="+require('../../../images/search/asasa.jpg')+">");
                    // $(".y-answereValuateFabulous span").eq(imgKey).addClass("y-answereValuateFabulousSpan");
                }
            }
        })
    }
    descriptionContentI(key) {
        $(".y-descriptionContentI").eq(key).parents(".y-descriptionContent").hide();
        $(".y-descriptionContentI").eq(key).parents(".y-descriptionContent").siblings(".y-lecturerQuestion").show();
    }
    lecturerContentI(key) {
        $(".y-lecturerContentI").eq(key).parents(".y-lecturerContentP").hide();
        $(".y-lecturerContentI").eq(key).parents(".y-lecturerContentP").siblings(".y-lecturerContentP2").show();
    }
    lecturerContentIShow(key) {
        $(".y-lecturerContentI2").eq(key).parents(".y-lecturerContentP2").hide();
        $(".y-lecturerContentI2").eq(key).parents(".y-lecturerContentP2").siblings(".y-lecturerContentP").show();
    }
    _showTopFive() {
        return this.state.topFiveData.map((value,index) => {
            return (
                <div key={index} className="hotSearch_box_list">
                    {
                        index === 0
                            ?
                            <div>
                                <span className="hotSearch_box_listTop">
                                    <i>

                                    </i>
                                    <span>{index + 1}</span>
                                </span>
                                <div className="hotSearch_box_listMsg" onClick={this.onSerachResule.bind(this,value)}>
                                    <p>{value}</p>
                                </div>
                            </div>
                            :
                            <div className="hotSearch_box_listMsg2" onClick={this.onSerachResule.bind(this,value)}>
                                <span>{index + 1}、</span>
                                <p>{value}</p>
                            </div>
                    }
                </div>
            );
        });
    }
    onSerachResule(value) {
        $.llsajax({
            url: "onlineqa/findQuestion",
            data: {
                keyword: value,
                pageno: 1
            },
            type: "POST",
            async: false,
            success: resultData => {
                let arr = [];
                resultData.list.map((value) => {
                    arr.push(value);
                });
                this.setState({
                    dataResult: arr,
                    dataResultNow: resultData.list,
                    ShowHide: true,
                    serachValue: value
                });
                this.props.onInputReset(value);
            }
        });
    }
    _mapAnswerData() {
        let answerText = {
            questionTitle: "问题说明：",
            answertitle: "讲师答案："
        };
        let styles = {
            show: {
                display: "inline-block"
            },
            hide: {
                display: "none"
            },

        };
        return this.state.dataResult.map((value, key) => {
            return (
                <div key={key} className="y-lecturerAnswerWrap">
                    <div className="y-lecturerAnswerTop">
                        <h3>{value.question}</h3>
                        <div className="y-problemDescription">
                            <h4>{answerText.questionTitle}</h4>
                            <div className="y-descriptionContent">
                                <div style={value.headimgurl ? styles.show : styles.hide}>
                                    <img src={value.headimgurl} />
                                </div>
                                <p>
                                    {value.description == null || value.description.length < 50 ? value.description : value.description.substr(0, 50) + "..."}
                                    <i onClick={this.descriptionContentI.bind(this, key)} style={value.description == null || value.description.length < 50 ? styles.hide : styles.show} className="y-descriptionContentI">显示全部</i>
                                </p>
                            </div>
                            <div className="y-lecturerQuestion" dangerouslySetInnerHTML={{ __html: value.detailtext }} />
                        </div>
                    </div>
                    <div className="y-lecturerAnswer">
                        <div className="y-lecturerContent">
                            <h4>{answerText.answertitle}</h4>
                            <p className="y-lecturerContentP">
                                {value.answer == null || value.answer.length < 80 ? value.answer : value.answer.substr(0, 80) + "..."}
                                <i onClick={this.lecturerContentI.bind(this, key)} className="y-lecturerContentI" style={value.answer == null || value.answer.length < 80 ? styles.hide : styles.show}>显示全部</i>
                            </p>
                            <p className="y-lecturerContentP2">
                                {value.answer}
                                <i onClick={this.lecturerContentIShow.bind(this, key)} className="y-lecturerContentI2">收起</i>
                            </p>
                        </div>
                        <div className="y-answereValuate">
                            <div className="y-answereValuateTime">{value.subtime.substr(0, 19)}</div>
                            <div className="y-answereValuateFabulous" onClick={parseInt(value.evaluatenum) ? null : this.thumbsUp.bind(this, value.id, key)}>
                                <img src={parseInt(value.evaluatenum) ? zan : zan2} />
                                <span ref="thembsum" className="y-answereValuateFabulousSpan">{value.evaluatesum}</span>
                            </div>
                        </div>
                    </div>
                    <div className="y-lecturerAnswerLine">

                    </div>
                </div>
            );
        })
    }
    onTopTo() {
        $('html,body').animate({ scrollTop: 0 }, '600');
    }
    render() {
        let qusetionText = {
            caption: "相关搜索"
        };
        let styles = {
            moreShow: {
                display: "block"
            },
            moreHide: {
                display: "none"
            },
            myQuestionTeacher: {
                background: "#fff",
                width: "955px",
                margin: "auto",
                // paddingLeft: "30px",
                overflow: "hidden"
            },
            searchResult: {
                margin: "0px 0 20px 277px",
                background: "#fff",
                overflow: "hidden",
                padding: "0px 20px 20px",
                // width: "949px"
            },
            warningMsgStudent: {
                marginLeft: "0px"
            },
            wrapPosition: {
                position: "relative"
            },
            searchResult_More: {
                width: "955px",
                margin: "auto",
            }
        };
        return (
            <div style={styles.wrapPosition}>
                <div className="y-searchResult" style={this.state.userJudge !== "S" ? styles.myQuestionTeacher : styles.searchResult}>
                    <div className="y-searchResultBox">
                        <div className="y-caption">{qusetionText.caption}</div>
                        <div className="y-warning" style={this.state.dataResult.length === 0 && this.state.ShowHide == true ? styles.moreShow : styles.moreHide}>
                            <span className="y-warningMsg" style={this.state.userJudge !== "S" ? null : styles.warningMsgStudent}><i></i>很抱歉，没有搜到相关的答案</span>
                        </div>
                        <div className="y-warning" style={this.state.ShowHide ? styles.moreHide : styles.moreShow}>
                            <span className="y-warningMsg" style={this.state.userJudge !== "S" ? null : styles.warningMsgStudent}><i></i>请输入要搜索的问题呦</span>
                        </div>
                        {this._mapAnswerData()}
                    </div>
                    <div className="hotSearch_box">
                        <h2>热搜问题推荐</h2>
                        {this._showTopFive()}
                    </div>
                    <div className="y-topToWrap">
                        <div className="y-topTo" onClick={this.onTopTo.bind(this)}>

                        </div>
                    </div>
                </div>
                <div className={this.state.ShowHide && this.state.dataResult.length !== 0 ? "searchResult_More" : "searchResult_MoreHide"} style={this.state.userJudge !== "S" ? styles.searchResult_More : null}>
                    <div className="searchResult_MoreLine">

                    </div>
                    <span className={this.state.ShowHide && this.state.dataResult.length !== 0 && this.state.dataResultNow.length >= 5 ? "searchResult_MoreMsg" : "searchResult_MoreMsg2"} onClick={this.state.dataResultNow.length < 5 ? null : this.searchMore.bind(this)}>{this.state.dataResultNow.length < 5 ? "没有更多了" : "加载更多"}</span>
                </div>
            </div>
        );
    }
}
