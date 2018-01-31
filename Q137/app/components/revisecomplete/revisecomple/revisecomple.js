/**
 * Created by heshuai on 2017/1/19.
 */


import React from 'react';
import $ from 'jquery';
import './styleReviseComple.css';
import {
    Link,
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect,
    browserHistory
} from 'react-router';

export default class revisecomple extends React.Component {
    componentDidMount() {

    }

    gologin() {
        $.llsajax({
            url: "Luser/breakLogin",
            type: "post",
            success: extendName => {
                if (extendName.result == 200) {
                    window.location.href = './index.html'
                }
            }
        })
    }

    render() {
        let userState = sessionStorage.getItem("userJudge");
        let userStyle = {
            paddingLeft: userState == "S" ? "210px" : "0px"
        };
        let styles = {
            revisecomple_box: {
                marginLeft: "110px"
            }
        };
        return (
            <div className="h-reviseBody">
                <div className="spro-newrevisetitle" style={userStyle}>
                    <div className="sproinnernewrevisetitle">
                        <strong className="c-aeaeb0">---</strong>
                        <span className="dib c-aeaeb0">
                      <i className="iconfont icon-mima dib c-aeaeb0"></i>
                      <b className="dib c-aeaeb0">修改密码</b>
                  </span>
                        <strong className="c-aeaeb0">---</strong>
                        <strong className="c4ac0e0">---</strong>
                        <span className="dib ">
                      <i className="iconfont icon-wancheng dib spro-reviseitwo c4ac0e0"></i>
                      <b className="dib spro-revbtwo c4ac0e0">完成</b>
                  </span>
                        <strong className="c4ac0e0">---</strong>
                    </div>
                </div>
                <div className="h-email">
                    <div className="h-input spro-revisecomple" style={userState == "S" ? styles.revisecomple_box : null}>
                        <div className="h-treat">
                            <span className="h-wancheng iconfont icon-wancheng"></span>
                            <span>&nbsp;重置密码完成</span>
                        </div>
                        <div className="h-lianjie">
                            <button onClick={this.gologin}>立即登录</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}