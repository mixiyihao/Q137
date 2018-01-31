import React from 'react';
import './detailEG.css';
import PublicStuinfo from './detailPublicStuinfo.js';
import PublicBody from './detailPublicEG.js';
import BrowserState from '../../components/public/BrowserState/Spro_browser.js';
import WEBurl from '../../controller/url.js';
import $ from 'jquery';
export default class detailExamG extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 1,
            ObjData: [],
            ObjData1: [],
            ObjInit: [],
            Flag: false,
            DefaultUserid: []
        }
    }

    StundentAjax(DefaultUserid) {
        $.llsajax({
            url: "schoolexam/findSchoolExamPage",
            type: "POST",
            data: {
                term: this.props.termsNow,
                userid: DefaultUserid
            },
            success: StuData => {

                if (StuData.date.length != 0) {
                    this.setState({ ObjData: StuData.date, ObjInit: StuData.date })
                    this
                        .props
                        .DetailEGStyle(StuData.date.length);

                }
            }

        })
    }
    LenovoAjax(DefaultUserid) {
        $.llsajax({
            url: "examResult/studentLenovoResult",
            type: "POST",
            data: {
                term: this.props.termsNow,
                userid: DefaultUserid
            },
            success: StuData => {
                this.setState({ ObjData: StuData.obj, ObjInit: StuData.obj })
                if (StuData.date.length != 0)
                    this.props.DetailEGStyle(StuData.date.length);
            }

        })
    }
    clickHandle(e) {
        var index = e
            .target
            .getAttribute('data-index')
        this.setState({ current: index })
        if (index == 1 && this.state.current != index) {
            this
                .props
                .getEGTabFlag(1);
            // this.StundentAjax(this.state.DefaultUserid)
            this.setState({ Flag: false })
        } else if (index == 2 && this.state.current != index) {
            //  this.LenovoAjax(182)
            this
                .props
                .getEGTabFlag(2);
            this.setState({ Flag: false })
        }
    }
    componentWillMount() {

        this.setState({
            DefaultUserid: Base64.decode(location.hash.split("i=")[1].split("&")[0]),
            ObjInit: this.props.EGInit,
            current: this.props.TabFlag
        })
        let DefaultUserid = Base64.decode(location.hash.split("i=")[1].split("&")[0]);
        // this.StundentAjax(DefaultUserid);
    }
    unique2(arr) {
        var newArr = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr.indexOf(arr[i]) == i) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }
    handleDownload() {
        if (this.state.current == 1) {
            let BrowserFlag = BrowserState();
            let Username = Base64.decode(location.hash.split("&n=")[1].split("&")[0]);
            let Userid = Base64.decode(location.hash.split("&i=")[1].split("&")[0]);
            //  $.llsajax({      url:"schoolexam/downSchoolExamPage",      type:"get",
            // data:{         term:this.props.termsNow,         userid:Userid,
            // browser:BrowserFlag      },      success:data=>{          console.log(data);
            //   }  })
            window.open(WEBurl.WEBURL + 'schoolexam/downSchoolExamPage?term=' + this.props.termsNow + "&userid=" + Userid + "&browser=" + BrowserFlag);
        } else if (this.state.current == 2) {
            let BrowserFlag = BrowserState();
            let Username = Base64.decode(location.hash.split("&n=")[1].split("&")[0]);
            let Userid = Base64.decode(location.hash.split("&i=")[1].split("&")[0]);
            window.open(WEBurl.WEBURL + 'examResult/exportTermExamResultLenovo?term=' + this.props.termsNow + "&userid=" + Userid + "&brower=" + BrowserFlag);
            // $.llsajax({     url:"examResult/exportTermExamResultLenovo",     type:"get",
            //  data:{        term:this.props.termsNow,        userid:Userid,
            // browser:BrowserFlag     },     success:data=>{         console.log(data); }
            // })
        }
    }
    sortNum(a, b) {
        return a - b
    }
    handleTip(topFlag) {
        if (this.state.Flag == false) {
            this.setState({ Flag: true })
            let Abc = [];
            let re = [];
            if (topFlag == "R") {
                this
                    .state
                    .ObjInit
                    .map((value, key) => {
                        re.push(value.rank);
                    })
            } else if (topFlag == "G") {
                this
                    .state
                    .ObjInit
                    .map((value, key) => {
                        re.push(value.score);
                    })
            }
            let er0 = re.sort(this.sortNum);
            ////console.log(er0) 这里需要去重
            let er = this.unique2(er0);
            ////console.log(er)
            for (var i = 0; i < er.length; i++) {
                this
                    .state
                    .ObjInit
                    .map((value, key) => {
                        if (topFlag == "R") {
                            if (er[i] == value.rank) {
                                Abc.push(value)
                            }
                        } else if (topFlag == "G") {
                            if (er[i] == value.score) {
                                Abc.push(value)
                            }
                        }
                    })
            }

            this.setState({ ObjInit: Abc })
        } else {
            let Abc = [];
            let re = [];
            if (topFlag == "R") {
                this
                    .state
                    .ObjInit
                    .map((value, key) => {
                        re.push(value.rank);
                    })
            } else if (topFlag == "G") {
                this
                    .state
                    .ObjInit
                    .map((value, key) => {
                        re.push(value.score);
                    })
            }
            let er0 = re.reverse();
            let er = this.unique2(er0);
            for (var i = 0; i < er.length; i++) {
                this
                    .state
                    .ObjInit
                    .map((value, key) => {
                        if (topFlag == "R") {
                            if (er[i] == value.rank) {
                                Abc.push(value)
                            }
                        } else if (topFlag == "G") {
                            if (er[i] == value.score) {
                                Abc.push(value)
                            }
                        }
                    })
            }
            this.setState({ ObjInit: Abc })
        }
    }
    render() {

        return (<div><div> <div className="det_tab" > <span className={
            this.state.current == 1
                ? 'ch'
                : ''
        }
            data-index = "1" onClick = {
                this
                    .clickHandle
                    .bind(this)
            } > 学校成绩 </span>  < span className={this.state.current == 2 ? 'ch' : ''} data-index = "2"onClick =  {this.clickHandle.bind(this)} > 期末成绩 </span > </div > < div className="det_info" > < PublicStuinfo /> </div > < div className="det_body" > < PublicBody ObjInit={
                this.state.ObjInit
            }
                handleTip={
                    this
                        .handleTip
                        .bind(this)
                }
                current={
                    this.state.current
                }
                handleDownload={
                    this
                        .handleDownload
                        .bind(this)
                } /> </div > </div >  </div >)
    }
}
