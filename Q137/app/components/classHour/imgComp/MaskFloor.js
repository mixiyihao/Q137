
import React from 'react'
import $ from 'jquery'
import './styleMaskFloor.css'
import url from '../../../controller/url.js';

export default class MaskFloor extends React.Component {
    constructor() {
        super()
        this.state = {
            count: 0
        }
    }
    componentDidMount() {
        var imgList = this.props.dataList;
        if (imgList.length == 1) {
            $('.prev-A,.next-A').css('display', 'none')
        } else {

            if (this.props.KeyMarks == 0) {
                $('.prev-A').css('display', 'none')
            }
            if (this.props.KeyMarks == imgList.length - 1) {
                $('.next-A').css('display', 'none')
            }
        }
        this.setState({
            count: this.props.KeyMarks
        })
        // var imgList = this.props.dataList
        // if (imgList.length == 1) {
        //     $('.prev-A,.next-A').css('display', 'none');
        // }
        var _This = this
        var getId = function (id) {
            return document.getElementById(id);
        }
        var addEvent = function (id, event, fn) {
            var el = getId(id) || document;
            if (el.addEventListener) {
                el.addEventListener(event, fn, false);
            } else if (el.attachEvent) {
                el.attachEvent('on' + event, fn);
            }
        }
        addEvent(getId('mask-A'),'keydown',function(e){
            // //console.log(e.keyCode);
            if(e.keyCode == 27){
                $('html').css('overflow','auto')
                // _This.setState({
                //     isShow: false
                // })
               _This.props.imgCompClose();
            }
        })
        $('html').css('overflow','hidden');
    }
    closeMask() {
        this.props.imgCompClose();
    }
    prevImg() {
        $('.next-A').css('display', 'block')
        var imgItem = document.getElementById('viewImg-A')
        var imgList = this.props.dataList
        var num = this.state.count - 1
      
        if (this.state.count <= 0) {
            num = 0
        }
        if (num == 0) {
            $('.prev-A').css('display', 'none')
            $('.next-A').css('display', 'block')
        } else {
            $('.prev-A').css('display', 'block')
        }
        this.setState({
            count: num
        })

        imgItem.setAttribute('src', url.WEBURL + imgList[num].url)
    }
    nextImg() {

        var imgItem = document.getElementById('viewImg-A')
        $('.prev-A').css('display', 'block')
        var imgList = this.props.dataList
        var len = imgList.length;
        var num = this.state.count + 1
        //console.log(num+'n')
        if (this.state.count >= len-1) {
            num = len
        }
        if (num == len-1) {
            $('.prev-A').css('display', 'block')
            $('.next-A').css('display', 'none')
        } else {
            $('.next-A').css('display', 'block')
        }
        this.setState({
            count: num
        })
        //console.log(num)
        imgItem.setAttribute('src', url.WEBURL + imgList[num].url)
    }
    render() {
        return (
            <div id="mask-A">
                <div className="container-A">
                    <div className="imgBox-A">
                        <img src={url.WEBURL + this.props.dataList[this.props.KeyMarks].url} alt="" height="100%" id="viewImg-A" />
                        <a  id="close-A" className="iconfont icon-guanbi" onClick={this.closeMask.bind(this)}></a>
                        <span className="close_msg">关闭全屏</span>
                        <div className="prev-A" onClick={this.prevImg.bind(this)}></div>
                        <div className="next-A" onClick={this.nextImg.bind(this)}></div>
                    </div>
                </div>
            </div>
        );
    }
    componentWillUnmount() {
        $('html').css('overflow','auto');
    }
}
