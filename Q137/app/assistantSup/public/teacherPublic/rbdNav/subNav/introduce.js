'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import EditMajor from '../../../../../majorMaster/public/editmajor/editmajor.jsx'

export default class Introduce extends React.Component {

    constructor() {
        super()
        this.state = {
            arrIntroName: []
        }

    }
    componentWillReceiveProps(props) {
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
        let stylebtn = {
            display: sessionStorage.getItem('userJudge') == 'PM' ? 'block' : 'none',
        }
        var IntroList = [];

        var len = this.state.arrIntroName.length;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                IntroList.push(<span className={i % 2 == 0 ? "subIntro01" : "subIntro02"} key={"item0" + i}><Link to={{ pathname: '/asscherProfession', query: { id: Base64.encodeURI(this.props.DataTab.majors[i].id) } }} onClick={this.onShowMajor.bind(this, this.props.DataTab.majors[i].id)}>{this.state.arrIntroName[i]}</Link></span>)
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
                {sessionStorage.getItem('userJudge') == 'PM' ?
                    <EditMajor /> : ''
                }
            </div>
        )
    }
}

