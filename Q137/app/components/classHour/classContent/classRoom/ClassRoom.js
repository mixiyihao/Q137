
import React from 'react';
import url from '../../../../controller/url.js';
import styles from './styleClassRoom.js';
import MaskFloor from '../../imgComp/MaskFloor.js';
import LazyLoad from 'react-lazyload';
import './ClassRoom.css';

export default class ClassRoom extends React.Component {
    constructor() {
        super();
        this.state = {
            isShow: false,
            imgKeys:0,
            imgID: [],
        }
    }
    componentDidMount() {}
    //显示ppt图片 YH
    showBorder(key) {
        this.setState({
            imgID: key
        });
    }
    hideBorder(key) {
        this.setState({
            imgID: []
        });
    }
    _showPPTImg() {
        let arr = [];
        this.props.dataList.map((value, key) => {
            arr.push(
                <div key={key} style={styles.stuInformationImgBox}>
                    <LazyLoad throttle={200} height={300}>
                        <img onDoubleClick={this.imgCompShow.bind(this,key)} className="showimg" onMouseLeave={this.hideBorder.bind(this, value.id)} onMouseEnter={this.showBorder.bind(this, value.id)} style={this.state.imgID == value.id ? styles.classroomImgAni : styles.classroomImg} src={url.WEBURL + value.url}>
                        </img>
                    </LazyLoad>
                </div>
            );
        });
        return (
            <div className='classroomboos'>
                {arr}
            </div>
        );
    }
    // 显示图片预览组件
    imgCompShow(key) {
        this.setState({
            isShow: true,
            imgKeys:key,
        });
    }
    // 关闭图片预览组件
    imgCompClose() {
        this.setState({
            isShow: false
        });
    }
    render() {
        return (
            <div className="y_classroomBox" style={this.props.classroomStyle ? this.props.classroomStyle : styles.classroomBox} id="y_classroomBox">
                <span className="warningTit">说明：双击课堂资料图片将进入全屏模式</span>
                <div style={styles.classroomContent}>
                    {this._showPPTImg()}
                </div>
                {
                    this.state.isShow ? <MaskFloor imgCompClose={this.imgCompClose.bind(this)} dataList={this.props.dataList} KeyMarks={this.state.imgKeys}/> : null
                }
            </div>
        );
    }
}
