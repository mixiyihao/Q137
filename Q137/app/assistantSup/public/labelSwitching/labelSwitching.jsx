import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './labelSwitching.css';

/**
 * @功能 标签左右切换组件
 * @参数 tabArr 名称数组
 * @方法 onTabClick tab被点击的回调，返回当前索引
 */

export default class LabelSwitching extends Component {
    constructor() {
        super();
        this.state = {
            tabID: 0, // 切换选中索引
            translate: 0, // 移动的距离
            width: 0, // 横线的宽度
            TabArr: 0, // 每个标签长度集合
            translateScroll: 0, // 滚动距离
            maxScroll: 0, // 滚动div与容器div的宽度差
            scrollNum: 0, // 滚动次数
        }
    }
    componentDidMount() {
        const TabNode = document.getElementsByClassName("tabs-tab");
        const maxScroll = this.refs.tabs_nav.clientWidth - this.refs.tabs_nav_scroll.clientWidth;
        let TabArr = [];
        if (TabNode.length !== 0) {
            for (let i = 0; i < TabNode.length; i++) {
                TabArr.push(TabNode[i].clientWidth);
            }
            let width = Number(TabNode[0].clientWidth);
            this.setState({
                width: width,
                TabArr: TabArr,
                maxScroll: maxScroll
            });
        }
    }

    tabsNav(tabIndex) {
        // 点击右边的标签
        if (tabIndex > this.state.tabID) {
            let moveRight = 0;
            for (let i = 0; i < tabIndex; i++) {
                moveRight = moveRight + this.state.TabArr[i] + 24
            }
            this.setState((prevState, props) => ({
                tabID: tabIndex,
                width: prevState.TabArr[tabIndex],
                translate: moveRight
            }));
        // 点击左边的标签
        } else {
            let moveLeft = 0;
            for (let i = 0, len = this.state.TabArr.length; i < len; i++) {
                if (tabIndex < i && this.state.tabID >= i) {
                    moveLeft = moveLeft + this.state.TabArr[i - 1] + 24
                }
            }
            this.setState((prevState, props) => ({
                tabID: tabIndex,
                width: prevState.TabArr[tabIndex],
                translate: prevState.translate - moveLeft
            }));
        }
        // tab被点击的回掉
        if (this.props.onTabClick) {
            this.props.onTabClick(tabIndex)
        }
    }
    // 点击左侧按钮
    onPrewClick() {
        const tabNavsLeft = this.refs.tabs_nav.clientWidth;
        const tabScrollLeft = this.refs.tabs_nav_scroll.clientWidth;
        if (tabNavsLeft <= tabScrollLeft || this.state.scrollNum === 0) {
            return false;
        }
        if (Math.abs(this.state.translateScroll) <= tabScrollLeft) {
            this.setState((prevState, props) => ({
                scrollNum: --prevState.scrollNum,
                translateScroll: 0,
            }));
        } else {
            this.setState((prevState, props) => ({
                scrollNum: --prevState.scrollNum,
                translateScroll: prevState.translateScroll + tabScrollLeft,
            }));
        }
    }
    // 点击右侧按钮
    onNextClick() {
        const tabNavsRight = this.refs.tabs_nav.clientWidth;
        const tabScrollRight = this.refs.tabs_nav_scroll.clientWidth;
        if (tabNavsRight <= tabScrollRight || this.state.scrollNum === Num) {
            return false;
        }
        const Num = Math.floor(tabNavsRight / tabScrollRight);
        const scrollLast = tabNavsRight % tabScrollRight;
        if (this.state.scrollNum < Num) {
            if (this.state.scrollNum === Num - 1) {
                if (Math.abs(this.state.translateScroll) % tabScrollRight === scrollLast) {
                    this.setState((prevState, props) => ({
                        scrollNum: ++prevState.scrollNum,
                        translateScroll: prevState.translateScroll - tabScrollRight,
                    }));
                } else {
                    this.setState((prevState, props) => ({
                        scrollNum: ++prevState.scrollNum,
                        translateScroll: prevState.translateScroll - scrollLast,
                    }));
                }
                return false;
            }
            this.setState((prevState, props) => ({
                scrollNum: ++prevState.scrollNum,
                translateScroll: -tabScrollRight * prevState.scrollNum,
            }));
        }
    }
    render() {
        const tabs = this.props.tabArr.length === 0 ? ['--'] : this.props.tabArr;
        // 线条的样式
        let barStyle = {
            display: "block",
            width: this.state.width,
            transform: "translate3d(" + this.state.translate + "px, 0px, 0px)"
        };
        // 左右切换滑动样式
        let scrollStyle = {
            transform: "translate3d(" + this.state.translateScroll + "px, 0px, 0px)"
        };
        return (
            <div className="labelSwitching-box">
                <div className="tabs-nav-container tabs-nav-container-scrolling">
                    <span className={this.state.translateScroll === 0 ? "tabs-tab-prev labelSwitching-tabs-arrow tabs-tab-btn-disabled" : "tabs-tab-prev labelSwitching-tabs-arrow"} onClick={this.onPrewClick.bind(this)}>
                        <span className="tabs-tab-prev-icon iconfont icon-riqizuo"></span>
                    </span>
                    <span className={this.state.maxScroll <= Math.abs(this.state.translateScroll) ? "tabs-tab-next labelSwitching-tabs-arrow tabs-tab-btn-disabled" : "tabs-tab-next labelSwitching-tabs-arrow"} onClick={this.onNextClick.bind(this)}>
                        <span className="tabs-tab-next-icon iconfont icon-riqiyou"></span>
                    </span>
                    <div className="tabs-nav-wrap">
                        <div className="tabs-nav-scroll" ref="tabs_nav_scroll">
                            <div className="tabs-nav tabs-nav-animated" ref="tabs_nav" style={scrollStyle}>
                                {
                                    tabs.length === 0 ? null : <div className="tabs-ink-bar tabs-ink-bar-animated" style={barStyle}></div>

                                }
                                {
                                    tabs.map((tabValue,tabIndex) => {
                                        return (
                                            <div
                                                key={tabIndex}
                                                className={this.state.tabID === tabIndex ? "tabs-tab tabs-tab-active" : "tabs-tab"}
                                                onClick={this.tabsNav.bind(this, tabIndex)}
                                            >
                                                {tabValue}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}