import React from 'react';
import ReactDOM from 'react-dom'
import { Link, hashHistory } from 'react-router';
import $ from 'jquery';
import './tabItem.css'
import url from '../../../../controller/url.js';
export default class MyContribute extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 0,
            personArr: [
                { name: '班主任', id: 1 },
                { name: '班主任', id: 2 },
                { name: '班主任', id: 3 },
                { name: '班主任', id: 4 },
                { name: '班主任', id: 5 },
                { name: '班主任', id: 6 },
            ],
            tabspan: 0,//距离计算基本单位
            // 左右按钮
            left: false,
            right: true,

            // 当前教师
            currentPerson: 0,
            id:'',
            index:'',
        }
    }
    componentWillMount() {
    }
    componentWillReceiveProps(props) {
        console.log(props)
        this.setState({
            personArr: props.data,
            right: props.data.length < 5 ? false : true,
            id:props.id,
            index:props.index,
        })
        if(props.index!=''&&props.index!=null&&props.index!='null'){
            this.setState({
                current:props.index,
            })
        }
    }
    clickHandle(e) {
        var index = e.target.getAttribute('data-index')
        var id = e.target.getAttribute('data-id')
        // console.log(id)
        this.props.propsChangeId(id,index)
        this.setState({
            current: index,
            currentPerson: id,
        });
    }
    render() {
        return (<div className="tabItemWrap">
            <div className="tabItemInner">
                <div className="tabPersonBox">
                    <div className="tabBox" id="tabChangePosition">
                        {this.createPerson()}
                    </div>
                </div>
                <i className={this.state.left == true ? "tabFrontBtn iconfont icon-icon-test3" : "tabFrontBtn iconfont icon-icon-test3 noUse"}
                    onClick={this.goFront.bind(this)}></i>
                <i className={this.state.right == true ? "tabEndBtn iconfont icon-icon-test2" : "tabEndBtn iconfont icon-icon-test2 noUse"}
                    onClick={this.goEnd.bind(this)}></i>
            </div>
        </div>)
    }
    componentDidMount() {
        let _this = this;
        $(window).scroll(function () {
            if ($(window).scrollTop() > 146) {
                $('.tabItemWrap').addClass('onTheTop')
            }
            else {
                $('.tabItemWrap').removeClass('onTheTop')
            }

        });
    }
    createPerson() {
        var arr = this.state.personArr;
        return arr.map((value, index) => {
            return (
                <span key={index} data-id={value.id} data-index={index}
                    className={this.state.current == index ? 'current' : ''}
                    onClick={this.clickHandle.bind(this)}>{value.name || '--'}<i></i></span>
            );
        });

    }
    // 左右切换
    goFront() {
        // console.log('front')
        var arr = this.state.personArr;
        var len = arr.length;
        if (len <= 4) {
            return false;
        }


        var num = this.state.tabspan;
        var nums = num - 2;
        if (nums <= 0) {
            nums = 0;
            this.setState({
                left: false,
                right: true,
            })
        } else {
            this.setState({
                right: true,
                // left: false,
            })
        }

        // console.log(nums)
        var dis = -1 * nums * 255
        // var width = len*255;
        $('#tabChangePosition').stop().animate({ left: dis + 'px' }, 600)
        this.setState({
            tabspan: nums
        })
    }

    goEnd() {
        // console.log('end')

        var arr = this.state.personArr;
        var len = arr.length;
        if (len <= 4) {
            return false;
        }

        var num = this.state.tabspan;
        var nums = Number(num) + 2;
        if (nums >= len - 4) {
            nums = len - 4
            this.setState({
                right:false,
                left: true,
            })
        } else {

            this.setState({
                left: true,
                // right: false,
            })
        }

        var dis = -1 * nums * 255
        // var width = len*255;
        $('#tabChangePosition').stop().animate({ left: dis + 'px' }, 600)
        // var width = len*255;
        this.setState({
            tabspan: nums
        })
    }
}
