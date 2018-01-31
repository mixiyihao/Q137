import React from 'react';
import './detailPublicStyle.css';
export default class detailPublicS extends React.Component {
    constructor() {
        super();
        this.state = ({claName: [], schName: [], CouName: [], StuName: [], StuNo: []})

    }
    componentWillMount() {
        //班级
        this.setState({
            claName: Base64.decode(location.hash.split("c=")[1].split("&")[0]),
            schName: Base64.decode(location.hash.split("l=")[1].split("&")[0]),
            CouName: Base64.decode(location.hash.split("m=")[1].split("&")[0]),
            StuName: Base64.decode(location.hash.split("n=")[1].split("&")[0]),
            StuNo: Base64.decode(location.hash.split("&s=")[1].split("&")[0])
        })
    }
    render() {
        return (
            <div>
                <div className="datailPublic">
                    <div className="dp-innerdivOne">
                        <span className="dib">
                            <b className="dib">学生：</b>
                            <i className="dib">{this.state.StuName}</i>
                        </span>
                        <span className="dib">
                            <b className="dib">学号：</b>
                            <i className="dib">{this.state.StuNo}</i>
                        </span>
                    </div>
                    <div className="dp-innerdivTwo">
                        <span className="dib dp-innerspan">
                            <b className="dib">学校：</b>
                            <i className="dib">{this.state.schName}</i>
                        </span>
                        <span className="dib dp-spaninnerTwo">
                            <b className="dib">专业：</b>
                            <i className="dib">{this.state.CouName}</i>
                        </span>
                        <span className="dib dp-innerspanThr">
                            <b className="dib">班级：</b>
                            <i className="dib">{this.state.claName}</i>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}