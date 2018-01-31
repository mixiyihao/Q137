/**
 * Created by heshuai on 2017/1/11.
 */
import React from 'react';
import './styleMainBody.css';
import $ from 'jquery';
import MainItem from './mainItem.js';
import MainItem1 from './mainItem1.js';
export default class mainBody extends React.Component {
    constructor() {
        super();
        this.state = {
            everyDone: false,
            tabID: 0

        };
    }
    handlerClick() {
        var checkedItem = false;
        for (var i = 0; i < $('.z-mainTop1 ul li input[type="checkbox"]').length; i++) {
            if ($('.z-mainTop1 ul li input[type="checkbox"]')[i].checked == true) {
                checkedItem = true
            }
        }
        if (!this.props.isEDone && checkedItem == false) {
            return false
        } else {
            this.props.isEDone || this.props.listw2 != 0 ? this.props.clearDone() : null;
            this.props.isEDone || this.props.listw2 != 0 ? this.props.onRefestHead() : null;
        }
    }
    componentWillMount() {

    }
    handlerAllState(event) {
        this.props.changeTodoState(null, event.target.checked, true);
    }
    selectTab(flag) {

        this.setState({
            tabID: flag
        })
        if (flag == 1) {
            this.props.onhandlemess1Click();
        }
    }
    Tabone() {

        let nomessage = {
            display: this.props.list.length != 0 ? "block" : "none"
        }
        let message = {
            display: this.props.list.length != 0 ? "none" : "block"
        }

        return (
            <div>
                <div className='z-mainTop1'>
                    <p style={nomessage}>
                        <input className="input" type="checkbox" checked={this.props.isAllChecked} onChange={this.handlerAllState.bind(this)} />全选
                                  <button onClick={this.handlerClick.bind(this)} id="yidu">标记为已读</button>
                    </p>
                    <ul>
                        {
                            this.props.list.map((todo, index) => {
                                return <MainItem key={index} {...todo} index={index} {...this.props} styleinput={false}
                                    handleurlTab={this.props.handleurlTab.bind(this)} />
                            })
                        }
                    </ul>
                    <p style={message} className="spro-nomessageStylep">
                        <span className="spro-nomessageUniqueStyle dib"></span>
                        暂无未读消息</p>
                </div>
            </div>
        )
    }
    Tabtwo() {
        let messageStyle1 = {
            display: this.props.list1.length != 0 ? "none" : "block"
        }
        return (
            <div>
                <div className='z-mainTop1'>
                    <ul>
                        {
                            this.props.list1.map((todo, index) => {
                                return <MainItem1 key={index} {...todo} index={index} {...this.props}
                                    handleurlTab={this.props.handleurlTab.bind(this)}
                                />
                            })
                        }
                    </ul>
                    <p style={messageStyle1} className="spro-nomessageStylep">
                        <span className="spro-nomessageUniqueStyle dib"></span>
                        暂无已读消息</p>
                </div>
            </div>
        )
    }
    Tabthree() {
        let messageStyle2 = {
            display: this.props.list1.length == 0 && this.props.list.length == 0 ? "block" : "none"
        }
        return (
            <div>
                <div className='z-mainTop1'>
                    <ul>
                        {
                            this.props.list.map((todo, index) => {
                                return <MainItem key={index} {...todo} index={index} {...this.props}
                                    styleinput={true}
                                    handleurlTab={this.props.handleurlTab.bind(this)}
                                />
                            })
                        }
                        {
                            this.props.list1.map((todo, index) => {
                                return <MainItem1 key={index} {...todo} index={index} {...this.props}
                                    handleurlTab={this.props.handleurlTab.bind(this)}
                                />
                            })
                        }
                    </ul>
                    <p style={messageStyle2} className="spro-nomessageStylep">
                        <span className="spro-nomessageUniqueStyle dib"></span>
                        暂无消息</p>
                </div>
            </div>
        )
    }
    render() {
        let stylemessage = {
            display: location.hash.split("?")[1] == 0 ? "block" : "none"
        }
        let stylemessage1 = {
            display: location.hash.split("?")[1] != 1 ? "none" : "block"
        }
        let stylemessage2 = {
            display: location.hash.split("?")[1] != 2 ? "none" : "block"
        }
        let styleTextp = {
            display: this.props.list.length != 0 ? "block" : "none"
        }
        let styleinput = false;
        let userState = sessionStorage.getItem("userJudge");
        let SproStyle = {
            paddingLeft: userState == "S" ? "210px" : "0px"
        }
        return (
            <div className="z-landing" style={SproStyle}>
                <div className="spro-myself">
                    <span className="spro-myselfspan dib">消息中心</span>
                </div>
                <div className="spro-messageTab">
                    <span className={this.state.tabID == 0 ? "spro-messageselectTabstyle" : " "}
                        onClick={this.selectTab.bind(this, 0)}
                    >未读消息</span>
                    <span className={this.state.tabID == 1 ? "spro-messageselectTabstyle" : " "}
                        onClick={this.selectTab.bind(this, 1)}
                    >已读消息</span>
                    <span className={this.state.tabID == 2 ? "spro-messageselectTabstyle" : " "}
                        onClick={this.selectTab.bind(this, 2)}
                    >全部消息</span>
                </div>
                <div className='z-mainTop'>
                    <div className={this.state.tabID == 0 ? "spro-messagedb" : "spro-messagedn"}>
                        <div>
                            {this.Tabone()}
                        </div>
                    </div>
                    <div className={this.state.tabID == 1 ? "spro-messagedb" : "spro-messagedn"}>
                        {this.Tabtwo()}
                    </div>
                    <div className={this.state.tabID == 2 ? "spro-messagedb" : "spro-messagedn"}>
                        {this.Tabthree()}
                    </div>
                </div>
            </div>
        );
    }
}
