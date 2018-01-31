'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
// import EditMajor from '../../../editmajor/editmajor.jsx'
export default class Introduce extends React.Component {

    constructor() {
        super()
        this.state = {
            arrIntroName: []
        }

    }
    componentWillReceiveProps(props){
        // console.log(props)
        if (typeof (props.DataTab.majors) != 'undefined') {
            var arrIntro = props.DataTab.majors;
            var arrName = []
            if (arrIntro != []) {

                for (var i = 0; i < arrIntro.length; i++) {
                    arrName.push(arrIntro[i].name)
                }

            }
            this.setState({
                arrIntroName: arrName
            })
        }
    }
    componentWillMount() {
        // console.log(typeof (this.props.DataTab.majors))
        if (typeof (this.props.DataTab.majors) != 'undefined') {
            var arrIntro = this.props.DataTab.majors;
            var arrName = []
            if (arrIntro != []) {
                for (var i = 0; i < arrIntro.length; i++) {
                    arrName.push(arrIntro[i].name)
                }

            }
            this.setState({
                arrIntroName: arrName
            })
        }
    }
    onShowMajor(majorsID) {
        // console.log(majorsID)
        this.props.onShowMajor(majorsID);
    }
    render() {

        /*
        * test code
        * this.state.arrIntroName.pop()
        */
        let stylebtn={
            display:sessionStorage.getItem('userJudge')=='PM'?'block':'none',
        }
        var IntroList = [];
        // switch (this.state.arrIntroName.length) {
        //     case 14:
        //         IntroList.push(<span className="subIntro02" key="item02"><Link to={{ pathname: '/asscherProfession', query: { id: Base64.encodeURI(this.props.DataTab.majors[13].id) } }} onClick={this.onShowMajor.bind(this, this.props.DataTab.majors[13].id)}>{this.state.arrIntroName[13]}</Link></span>)
        //     case 13:
        //         IntroList.push(<span className="subIntro01" key="item01"><Link to={{ pathname: '/asscherProfession', query: { id: Base64.encodeURI(this.props.DataTab.majors[12].id) } }} onClick={this.onShowMajor.bind(this, this.props.DataTab.majors[12].id)}>{this.state.arrIntroName[12]}</Link></span>)
        //     case 12:
        //         IntroList.push(<span className="subIntro02" key="item12"><Link to={{ pathname: '/asscherProfession', query: { id: Base64.encodeURI(this.props.DataTab.majors[11].id) } }} onClick={this.onShowMajor.bind(this, this.props.DataTab.majors[11].id)}>{this.state.arrIntroName[11]}</Link></span>)
        //     case 11:
        //         IntroList.push(<span className="subIntro01" key="item11"><Link to={{ pathname: '/asscherProfession', query: { id: Base64.encodeURI(this.props.DataTab.majors[10].id) } }} onClick={this.onShowMajor.bind(this, this.props.DataTab.majors[10].id)}>{this.state.arrIntroName[10]}</Link></span>)
        //     case 10:
        //         IntroList.push(<span className="subIntro02" key="item10"><Link to={{ pathname: '/asscherProfession', query: { id: Base64.encodeURI(this.props.DataTab.majors[9].id) } }} onClick={this.onShowMajor.bind(this, this.props.DataTab.majors[9].id)}>{this.state.arrIntroName[9]}</Link></span>)
        //     case 9:
        //         IntroList.push(<span className="subIntro01" key="item09"><Link to={{ pathname: '/asscherProfession', query: { id: Base64.encodeURI(this.props.DataTab.majors[8].id) } }} onClick={this.onShowMajor.bind(this, this.props.DataTab.majors[8].id)}>{this.state.arrIntroName[8]}</Link></span>)
        //     case 8:
        //         IntroList.push(<span className="subIntro02" key="item08"><Link to={{ pathname: '/asscherProfession', query: { id: Base64.encodeURI(this.props.DataTab.majors[7].id) } }} onClick={this.onShowMajor.bind(this, this.props.DataTab.majors[7].id)}>{this.state.arrIntroName[7]}</Link></span>)
        //     case 7:
        //         IntroList.push(<span className="subIntro01" key="item07"><Link to={{ pathname: '/asscherProfession', query: { id: Base64.encodeURI(this.props.DataTab.majors[6].id) } }} onClick={this.onShowMajor.bind(this, this.props.DataTab.majors[6].id)}>{this.state.arrIntroName[6]}</Link></span>)
        //     case 6:
        //         IntroList.push(<span className="subIntro02" key="item06"><Link to={{ pathname: '/asscherProfession', query: { id: Base64.encodeURI(this.props.DataTab.majors[5].id) } }} onClick={this.onShowMajor.bind(this, this.props.DataTab.majors[5].id)}>{this.state.arrIntroName[5]}</Link></span>)
        //     case 5:
        //         IntroList.push(<span className="subIntro01" key="item05"><Link to={{ pathname: '/asscherProfession', query: { id: Base64.encodeURI(this.props.DataTab.majors[4].id) } }} onClick={this.onShowMajor.bind(this, this.props.DataTab.majors[4].id)}>{this.state.arrIntroName[4]}</Link></span>)
        //     case 4:
        //         IntroList.push(<span className="subIntro02" key="item04"><Link to={{ pathname: '/asscherProfession', query: { id: Base64.encodeURI(this.props.DataTab.majors[3].id) } }} onClick={this.onShowMajor.bind(this, this.props.DataTab.majors[3].id)}>{this.state.arrIntroName[3]}</Link></span>)
        //     case 3:
        //         IntroList.push(<span className="subIntro01" key="item03"><Link to={{ pathname: '/asscherProfession', query: { id: Base64.encodeURI(this.props.DataTab.majors[2].id) } }} onClick={this.onShowMajor.bind(this, this.props.DataTab.majors[2].id)}>{this.state.arrIntroName[2]}</Link></span>)
        //     case 2:
        //         IntroList.push(<span className="subIntro02" key="item02"><Link to={{ pathname: '/asscherProfession', query: { id: Base64.encodeURI(this.props.DataTab.majors[1].id) } }} onClick={this.onShowMajor.bind(this, this.props.DataTab.majors[1].id)}>{this.state.arrIntroName[1]}</Link></span>)
        //     case 1:
        //         IntroList.push(<span className="subIntro01" key="item01"><Link to={{ pathname: '/asscherProfession', query: { id: Base64.encodeURI(this.props.DataTab.majors[0].id) } }} onClick={this.onShowMajor.bind(this, this.props.DataTab.majors[0].id)}>{this.state.arrIntroName[0]}</Link></span>)
        // }
        // IntroList.reverse();
        
        var len = this.state.arrIntroName.length;
        if(len>0){
            for(var i = 0;i<len;i++){
                IntroList.push(<span className={i%2==0?"subIntro01":"subIntro02"} key={"item0"+i}><Link to={{ pathname: '/asscherProfession', query: { id: Base64.encodeURI(this.props.DataTab.majors[i].id) } }} onClick={this.onShowMajor.bind(this, this.props.DataTab.majors[i].id)}>{this.state.arrIntroName[i]}</Link></span>)
            }
        }

        return (
            <div className="rbd-intro rbdItem">
                <div className="havechangeIntro" style={stylebtn}>
                    <a href="javascript:;"><i className="iconfont"></i>新增专业</a>
                    <a href="javascript:;"><i className="iconfont"></i>编辑专业</a>
                    <a href="javascript:;"><i className="iconfont"></i>删除该专业</a>
                </div>
                <div>
                    {IntroList}
                </div>
                {sessionStorage.getItem('userJudge')=='PM'?
                    <EditMajor />:''
                }
            </div>
        )
    }
}

