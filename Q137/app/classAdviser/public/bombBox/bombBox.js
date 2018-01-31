
import React from 'react';
import styles from './styleBombBox.js';
import './bombBox.css'
export default class BombBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag1: true,
            closeFlag: false,
        }
    }
    onEnterStyleShow1() {
        this.setState({
            flag1: false
        });
    }
    onEnterStyleHide1() {
        this.setState({
            flag1: true
        });
    }
    onCloseStyle() {
        this.setState({
            closeFlag: true
        });
    }
    LeaveCloseStyle() {
        this.setState({
            closeFlag: false
        });
    }
    hideClick() {
        this.setState({
            closeFlag: false,
            flag1: true
        });
        this.props.hideClick();
    }
    enterClick() {
        this.props.enterClick();
    }
    render() {
        return this.props.isHidden ? null : (
            <div style={styles.y_bombBox}>
                <div style={styles.y_bombBoxCenter} className="y_nowbombBoxCenterTop">
                    <div style={styles.y_bombBoxTitle}>
                        <span onMouseEnter={this.onCloseStyle.bind(this)} onMouseLeave={this.LeaveCloseStyle.bind(this)} style={this.state.closeFlag ? styles.y_bombBoxTitleClose2 :  styles.y_bombBoxTitleClose} onClick={this.hideClick.bind(this)} className="iconfont icon-guanbi"></span>
                    </div>
                    <div style={styles.y_bombBoxMsg}>
                        <p style={styles.y_bombBoxMsgP}>{this.props.bombBoxMsg}</p>
                    </div>
                    <div style={styles.y_bombBoxTools}>             
                        <span style={this.state.flag1 ? styles.y_bombBoxToolsDetermine2 : styles.y_bombBoxToolsCancel2}  onClick={this.hideClick.bind(this)} onMouseEnter={this.onEnterStyleShow1.bind(this)} onMouseLeave={this.onEnterStyleHide1.bind(this)}>取消</span>
                        <span className="commonButton" style={styles.y_bombBoxToolsCancel} onClick={this.enterClick.bind(this)}>确定</span>
                    </div>
                </div>
            </div>
        )
    }
}
