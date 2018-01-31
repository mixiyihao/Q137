import React, { Component } from 'react';
import "./Logoutassistant.css";
export default class Logoutassistant extends Component {
    constructor() {
        super()
    }
    render() {
        let { logoutData } = this.props;
        return (
            <div className="TMspro_delete">
                <div className="TMspro_deletes">
                    <div className="TMspro_preheads">
                        <span className="fl TMspro_deletprev1">注销助教</span>
                        <span className="fr TMspro_deletprevs iconfont icon-guanbi" onClick={this.props.tmChoseConfigpage.bind(this)} data-title="logoutF"></span>
                    </div>
                    <p className="TMspro_deletitle"><span>{logoutData.LogoutInfoSpanOne}</span><span>{logoutData.LogoutInfoSpanTwo}</span></p>
                    <div className="TMspro_prevbtns">
                        <button className="TMspro_prevbtns1" onClick={this.props.tmChoseConfigpage.bind(this)} data-title="logoutF">{logoutData.LogoutInfofalse}</button>
                        <button className="TMspro_prevbtns2 commonButton" onClick={this.props.tmChoseConfigpage.bind(this)} data-title="logoutT"
                            style={{ display: logoutData.LogoutInfotruedisplay ? "none" : "inline-block" }}>{logoutData.LogoutInfotrue}</button>
                    </div>
                </div>
            </div>
        )
    }
}