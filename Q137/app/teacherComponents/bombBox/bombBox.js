
import React from 'react';
import './bombBox.css';
import styles from './styleBombBox.js';

export default class BombBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: true,
            closeFlag: false
        }
    }
    onEnterStyleShow() {
        this.setState({
            flag: false
        });
    }
    onEnterStyleHide() {
        this.setState({
            flag: true
        });
    }
    enterClose() {
        this.setState({
            closeFlag: !this.state.closeFlag
        });
    }
    enterClose() {
        this.setState({
            closeFlag: !this.state.closeFlag
        });
    }
    render() {
        return this.props.isHidden ? null : (
            <div style={styles.y_bombBox}>
                <div style={styles.y_bombBoxCenter} className="y_nowbombBoxCenter">
                    <div style={styles.y_bombBoxTitle}>
                        <span style={this.state.closeFlag ? styles.y_bombBoxTitleClose2 : styles.y_bombBoxTitleClose} onMouseEnter={this.enterClose.bind(this)} onMouseLeave={this.enterClose.bind(this)} onClick={this.props.hideClick} className="iconfont icon-guanbi"></span>
                    </div>
                    <div style={styles.y_bombBoxMsg}>
                        <p style={styles.y_bombBoxMsgP}>{this.props.bombBoxMsg}</p>
                    </div>
                    <div style={styles.y_bombBoxTools}>
                        <span style={this.state.flag ? styles.y_bombBoxToolsDetermine : styles.y_bombBoxToolsCancel} onClick={this.props.hideClick} onMouseEnter={this.onEnterStyleShow.bind(this)} onMouseLeave={this.onEnterStyleHide.bind(this)}>知道了</span>
                    </div>
                </div>
            </div>
        )
    }
}
