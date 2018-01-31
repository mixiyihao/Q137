
import React from 'react';
import url from '../../controller/url.js';
import styles from './styleTeacherInformation.js';
import MaskFloor from '../../components/classHour/imgComp/MaskFloor.js';
import LazyLoad from 'react-lazyload';

export default class TeacherInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgID: [], //当前图片索引
            isShow: false,
            imgKeys:0,
        }
    }
    componentDidMount() {
        
    }
    // 鼠标移上显示边框
    showBorder(key) {
        this.setState({
            imgID: key
        });
    }
    // 鼠标移出边框消失
    hideBorder() {
        this.setState({
            imgID: []
        });
    }
    _showDataList() {
        let arr = [];
        this.props.dataList.map((dataListValue, dataListKey) => {
            arr.push(
                <div key={dataListKey} style={styles.teacherInformationImgBox}>
                    <LazyLoad throttle={200} height={300}>
                        <img onDoubleClick={this.imgCompShow.bind(this,dataListKey)} className="showimg" style={this.state.imgID == dataListValue.id ? styles.teacherInformationImgStyle : styles.teacherInformationImg} onMouseLeave={this.hideBorder.bind(this, dataListValue.id)} onMouseEnter={this.showBorder.bind(this, dataListValue.id)} src={url.WEBURL + dataListValue.url}>
                        </img>
                    </LazyLoad>
                </div>
            );
        });
        return (
            <div className="classroomboos">
                {arr}
            </div>
        )
    }
    imgCompShow(key) {
        $('html').css('overflow','hidden')
        this.setState({
            isShow: true,
            imgKeys:key,
        });
    }
    imgCompClose() {
        $('html').css('overflow','auto')
        this.setState({
            isShow: false
        });
    }
    render() {
        return (
            <div style={styles.teacherInformationBox}>
                {/*<div style={styles.classroomCaption}>查看教案</div>*/}
                <span className="warningTit" style={styles.warningTit}>说明：双击课堂资料图片将进入全屏模式</span>
                {this._showDataList()}
                {
                    this.state.isShow ? <MaskFloor imgCompClose={this.imgCompClose.bind(this)} dataList={this.props.dataList} KeyMarks={this.state.imgKeys}/> : null
                }
            </div>
        );
    }
}
