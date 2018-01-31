/**
 * Created by heshuai on 2017/2/9.
 */


import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';
import './styleDirectTitle.css';
export default class directTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            compData: []
        }
    }
    componentWillMount() {
        let compData = sessionStorage.getItem("userJudge");
        this.setState({
            compData: compData
        })
    }
    render() {
        var csstitle = {
            paddingLeft: "36px",
            backgroundPositionX: "722px",
            width: "1100px",
            margin: "0 auto"
        }
        var csstitle1 = {
            width: "1280px", 
            margin: "auto",
            padding: "20px 40px 0 0px",
            
        }
        let studentStyle = {
            paddingLeft: "175px",
            margin: "0 auto",
            width: "1100px"
        }
        let direbody2 = this.state.compData == "T" ? csstitle : csstitle1;
        return (
            <div className="h-directhang">
                <div className="h-directitl" style={direbody2}>
                    <div className="h-ltitl" style={sessionStorage.getItem("userJudge") == "S" ? studentStyle: null}>
                        <div className="h-h1font">互联网大咖精品直播</div>
                        <span className="h-futitl">一线互联网工程师 精彩不断</span>
                    </div>
                </div>
            </div>
        );
    }
}