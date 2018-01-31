import React from 'react';
import { Link } from 'react-router';
import './manageTab.css'
import $ from 'jquery';

export default class ManageTab extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 0,
        }
    }
    componentWillMount() {
        this.setState({
            current: this.props.b,
            tab: this.props.tab,
            t: this.props.t,
            a: this.props.a,
        })
    }
    componentWillReceiveProps(props){
        this.setState({
            current: props.b,
        })
    }
    clickHandle(e) {
        var index = e.target.getAttribute('data-index')
        this.setState({
            current: index
        })
        this.props.changeTab(index)
        // sessionStorage.setItem('mgTab', index);
        if(history.pushState){
            var hStr = location.href;
            // //console.log(hStr)
            var str1 = hStr.split("?b=")[0]
            var str2 = hStr.split("?b=")[1].substr(1)
            // //console.log(str2);
            var str3 = str1+'?b='+index+str2;
            history.replaceState(null,'',str3)
        }
    }
    back() {
        history.go(-1)
    }
    render() {
        let styleSpan = {
            display:sessionStorage.getItem('userJudge') == 'T'?'none':'inline-block'
        }
        return (<div className="manageTabWrap">
            <div className="manageTabInner">
                <span className={this.state.current == 3 ? 'current' : ''} data-index="3" onClick={this.clickHandle.bind(this)}>奖罚</span>
                <span className={this.state.current == 2 ? 'current' : ''} data-index="2" onClick={this.clickHandle.bind(this)}>访谈</span>
                <span className={this.state.current == 1 ? 'current' : ''} data-index="1" onClick={this.clickHandle.bind(this)} style={styleSpan}>考勤</span>
                <span className={this.state.current == 4 ? 'current' : ''} data-index="4" onClick={this.clickHandle.bind(this)}>学员情况</span>
                {/*<Link to={'/CourseEvaluation'}>返回<i className="iconfont icon-back"></i></Link>*/}
                <Link to={sessionStorage.getItem('userJudge')=='T'?"/teaStudentManagement"+'?a='+this.props.tab+'&s='+this.props.t : "/masStudentManagement"+'?a='+this.props.tab+'&s='+this.props.t}>返回<i className="iconfont icon-back Sproiconback"></i></Link>
                {/*<a  onClick={this.back.bind(this)}>返回<i className="iconfont icon-back"></i></a>*/}
            </div>
        </div>)
    }
    componentDidMount(){
        let _this = this;
        $(window).scroll(function () {
            if ($(window).scrollTop() > 146) {
                $('.manageTabWrap').addClass('onTheTop')
            }
            else {
                $('.manageTabWrap').removeClass('onTheTop')
            }

        });
    }
}