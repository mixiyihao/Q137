import React from 'react';
import $ from 'jquery';
import SJQEvent  from '../../public/EventEmitter/EventEmitter.js';
import { Link, hashHistory } from 'react-router';
import './styleNavsspro.css';
export default class LeftNavBar extends React.Component {
    constructor() {
        super();
        this.valueChange=this.valueChange.bind(this);
        this.state = {
            defaultMajor: [],
            //全部课程
            defaultCourse: [],
            //全部课时
            defaultCourseChilds: [],
            //当前课程
            defaultCoursenow: [],
            //当前课时
            defaultCourseChildnow: [],
            optionData: [
                "全部学期",
                "第一学期",
                "第二学期",
                "第三学期",
                "第四学期",
                "第五学期",
                "第六学期"
            ],
            SJQvalue:1,
            optionDataInit: [],
            SproClickindex: sessionStorage.getItem("SproCourKid") != null ? sessionStorage.getItem("SproCourKid") : -1,
            defaultoptionTerm: sessionStorage.getItem("defaultoptionTerm") != null ? sessionStorage.getItem("defaultoptionTerm") : -1,
            // UlClickState: false,
            SproLinkClickindex: -1,
            sproCourkidIndex: sessionStorage.getItem("sproCourkidIndex") != null ? sessionStorage.getItem("sproCourkidIndex") : -1,
        }
    }
    InfoflagClick(Sproindex) {
        if (this.state.SproClickindex == Sproindex) {
            this.setState({
                SproClickindex: -1
            })
            sessionStorage.setItem("SproCourKid", -1)
        } else {
            this.setState({
                SproClickindex: Sproindex,
                sproCourkidIndex: -1,
            })
            sessionStorage.setItem("SproCourKid", Sproindex)
        }

    }
    Optionconfig() {
        return this.state.optionDataInit.map((values, key) => {
            let valueinfo = this.state.defaultMajor.nowTerm == key ? values + "(本学期)" : values
            return (
                <li key={key} value={key} onClick={this.ChooseTerm.bind(this)}>
                    &nbsp;&nbsp;&nbsp;{valueinfo}
                </li>
            )
        })
    }
    AllClose(){
        if($("div.sproPublicside").find("ul").css("visibility")!="hidden"){
            $("div.sproPublicleftselect").css("border","1px solid #656d76")
            $("div.sproPublicside").find("ul").css("visibility","hidden");
        }else{
            $("div.sproPublicleftselect").css("border","1px solid #0acdff")
            $("div.sproPublicside").find("ul").css("visibility","visible");
        }
    }
    Courseconfig() {
        return this.state.defaultCoursenow.map((value, key) => {
            // console.info(key + "****" + this.state.SproLinkClickindex);
            let Vname = value.name;
            let DisplayFlag = {
                display: this.state.SproClickindex == key ? "block" : "none",
            }
            let ClickFlag = {
                borderLeft: this.state.SproClickindex == key || this.state.SproLinkClickindex == key ? "4px solid #49b6d3" : "",
                background: this.state.SproClickindex == key || this.state.SproLinkClickindex == key ? "#49525e" : "",
            }
            let ClickLink = {
                color: this.state.SproClickindex == key || this.state.SproLinkClickindex == key ? "#fff" : "#a3a3a4"
            }
            let ClickLinkStyle = {
                borderRadius: this.state.SproClickindex == key || this.state.SproLinkClickindex == key ? "4px" : "4px",
                border: this.state.SproClickindex == key || this.state.SproLinkClickindex == key ? "1px solid #49c0e0" : "",
                background: this.state.SproClickindex == key || this.state.SproLinkClickindex == key ? "#49c0e0" : "",
            }
            let SproiStyle = {
                color: this.state.SproClickindex == key || this.state.SproLinkClickindex == key ? "#fff" : ""
            }
            return (
                <div key={key}>
                    <div style={ClickFlag} className="sproPublicCourseStyle">
                        <Link style={ClickLink} onClick={this.onLessoClick.bind(this, value.id, key, value.term)} to={{ pathname: '/lesson', query: { id: Base64.encodeURI(value.id),t:this.state.defaultoptionTerm,v:key} }} title={value.name}>   {Vname}</Link><div className="weiSpan"
                            style={ClickLinkStyle} onClick={this.InfoflagClick.bind(this, key)}
                            >
                            <i className={this.state.SproClickindex == key ? "iconfont icon-jian" : "iconfont icon-jia"} style={SproiStyle}></i></div></div>
                    <div style={DisplayFlag} className="sproPublicCoursekidStyleS">  {
                        this.Coursekidconfig(key)
                    }
                    </div>
                </div>
            )
        })
    }
    classOrder2(Obj) {
        let Sproarr = [];
        let S2 = 1
        let S3 = 1;
        let S4 = 1;
        let S5 = 1;
        let S6 = 1;
        let S7 = 1;
        let S8 = 1;
        let S9 = 1;
        let S10 = 1;
        Obj.map((value) => {
            if (value.stage_ordernum == 1) {
                Sproarr.push(value.stage_ordernum + "." + value.ordernum);
            } else if (value.stage_ordernum == 2) {
                Sproarr.push(value.stage_ordernum + "." + S2++);
            } else if (value.stage_ordernum == 3) {
                Sproarr.push(value.stage_ordernum + "." + S3++);
            } else if (value.stage_ordernum == 4) {
                Sproarr.push(value.stage_ordernum + "." + S4++);
            }else if (value.stage_ordernum == 5) {
                Sproarr.push(value.stage_ordernum + "." + S5++);
            }else if (value.stage_ordernum == 6) {
                Sproarr.push(value.stage_ordernum + "." + S6++);
            }else if (value.stage_ordernum == 7) {
                Sproarr.push(value.stage_ordernum + "." + S7++);
            }else if (value.stage_ordernum == 8) {
                Sproarr.push(value.stage_ordernum + "." + S8++);
            }else if (value.stage_ordernum == 9) {
                Sproarr.push(value.stage_ordernum + "." + S9++);
            }else if (value.stage_ordernum == 10) {
                Sproarr.push(value.stage_ordernum + "." + S10++);
            }

        })

        return Sproarr;
    }
    Coursekidconfig(Sproindex) {

        let defaultCourseChildnow = this.state.defaultCourseChildnow[Sproindex];
        let classOrderarr = this.classOrder2(defaultCourseChildnow);

        return defaultCourseChildnow.map((value, key) => {
            let Vname = value.name;

            let SproCoursekidStyle = {
                background: this.state.sproCourkidIndex == key ? "#49c0e0" : "",

            }
            let SproCoursekidFontStyle = {
                color: this.state.sproCourkidIndex == key ? "white" : ""
            }
            return (
                <div style={SproCoursekidStyle} className="sproPublicCoursekidStyle" key={key} onClick={this.onClassClick.bind(this, value.id, value.stage_ordernum, key)}>
                    <Link to={{ pathname: '/classhours', query: { id: Base64.encodeURI(value.id) } }} style={SproCoursekidFontStyle} title={value.name}>{classOrderarr[key] + " " + Vname}</Link>
                </div>
            )
        })
    }
    //点击课程显示课程页数据
    onLessoClick(id, key, Sproterm) {
        // //console.info(id);
        // //console.info(key);
        if (sessionStorage.getItem('constraintMessage') != 'true') {
            sessionStorage.setItem("classItem", true)
        }
        if (this.state.SproClickindex != key) {
            this.setState({
                SproClickindex: -1,
            })
        }
        sessionStorage.setItem("defaultoptionTerm", this.state.defaultoptionTerm);
        if (location.hash.indexOf("/lesson") != -1) {
            this.setState({
                SproLinkClickindex: key,
            })
            $.llsajax({
                url: "course/courseindex/" + id,
                type: "POST",
                async: false,
                success: majorIndex => {
                 
                    let name = majorIndex.course.name;
                    let lessons = majorIndex.course.lessons;
                    let content = majorIndex.course.content;
                    this.props.onLessonShow({ majorIndex, name, lessons, content });
                }
            });
        }
        else {
            sessionStorage.setItem("SproLinkClickindex", key);
        }
    }
    //点击课时显示课时页数据
    onClassClick(id, pValueID, key) {
        if (sessionStorage.getItem('constraintMessage') != true) {
            sessionStorage.setItem("classItem", true)
        }
        let courseList = this.state.defaultCoursenow;
        this.setState({
            sproCourkidIndex: key,

        })
        sessionStorage.setItem("sproCourkidIndex", key);
        $.llsajax({
            url: "lesson/findLessonById/" + id,
            type: "POST",
            async: false,
            success: lessonMessage => {

                //阶段
                this.props.onClassShow({ lessonMessage, courseList, pValueID, tabID: 0 });
                sessionStorage.setItem("colorIndex", 3);
                sessionStorage.setItem("defaultoptionTerm", this.state.defaultoptionTerm);
                sessionStorage.setItem("SproCourKid", this.state.SproClickindex);
            }
        });
    }
    classOrder(Obj) {
        let ObjnewArray = [];
        let TempStageordernum = []
        for (var i = 0; i < Obj.length; i++) {

            TempStageordernum.push(Obj[i].stage_ordernum);
            if (i != 0) {
                if (Obj[i].stage_ordernum != TempStageordernum[i - 1]) {
                    ObjnewArray.push(Number(Obj[i].stage_ordernum) + Number(0.1));
                } else {
                    if (ObjnewArray[ObjnewArray.length - 1] == "1.1") {
                        ObjnewArray.push(1.2);
                    }
                    else {

                        ObjnewArray.push((Number(ObjnewArray[ObjnewArray.length - 1]) + Number(0.1)).toFixed(1));
                    }
                }
            } else {
                ObjnewArray.push(1.1);
            }
        }

        return ObjnewArray;
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.SJQvalue===1&&location.hash.indexOf("lesson") != -1 && location.hash.indexOf("&t=") != -1) {
            this.setState({
                defaultoptionTerm:this.state.optionTerms?this.state.optionTerms:location.hash.split("&t=")[1].split("&")[0],
                SproLinkClickindex:location.hash.split("&v=")[1].split("&")[0],
            })
            let TempCourse = [];
            this.state.defaultCourse.map((value, key) => {
                if (value.term == location.hash.split("&t=")[1].split("&")[0]) {
                    TempCourse.push(value);
                }
            })
            let TempCoursekid = []
            TempCourse.map((valuekid) => {
                TempCoursekid.push(this.state.defaultCourseChilds[valuekid.Sproindex])
            })
            this.setState({
                defaultCoursenow: TempCourse.length!=0?TempCourse:this.state.defaultCourse,
                defaultCourseChildnow: TempCoursekid.length!=0?TempCoursekid:this.state.defaultCourseChilds,
                })
            }
    }
    componentWillMount() {
       
        let userState = sessionStorage.getItem("userJudge");
        if (userState == "S") {
            if (sessionStorage.getItem("leftNavBar") == "" || sessionStorage.getItem("leftNavBar") == null) {
                $.llsajax({
                    url: 'major/findMajor',
                    type: "POST",
                    async: false,
                    success: professionData => {

                        sessionStorage.setItem("leftNavBar", JSON.stringify(professionData));
                    }
                });
            }
            var professionData = JSON.parse(sessionStorage.getItem("leftNavBar"));

            ////console.log(professionData);

            //专业内容集合
            const defaultMajor = {
                code: professionData.major.code,
                content: professionData.major.content,
                enname: professionData.major.enname,
                id: professionData.major.id,
                name: professionData.major.name,
                termcount: professionData.major.termcount,
                nowTerm: professionData.nowTerm
            }
            //学期初始化集合
            let optionDataInit = [];
            for (var i = 0; i <= defaultMajor.nowTerm; i++) {
                optionDataInit.push(this.state.optionData[i]);
            }

            this.setState({
                optionDataInit: optionDataInit
            })
            //课程内容集合
            const defaultCourseClone = professionData.major.courseList;
            let defaultCourse = [];
            //课时内容集合
            let defaultCourseChild = [];

            defaultCourseClone.map((value, key) => {
                let defaultCourseObj = {}
                if (Number(value.term) <= Number(defaultMajor.nowTerm)) {
                    defaultCourseObj = {
                        beforeids: value.beforeids,
                        code: value.code,
                        color: value.color,
                        content: value.content,
                        id: value.id,
                        lector: value.lector,
                        majorId: value.majorId,
                        majorName: value.majorName,
                        name: value.name,
                        ordernum: value.ordernum,
                        stage: value.stage,
                        teacherId: value.teacherId,
                        term: value.term,
                        Sproindex: key,
                    }
                    defaultCourseChild.push(value.lessons);
                    defaultCourse.push(defaultCourseObj);
                }


            })

            let defaultCoursenow = [];
            let SproCourseIndex = sessionStorage.getItem("defaultoptionTerm") != -1 ? sessionStorage.getItem("defaultoptionTerm") : defaultMajor.nowTerm;
            //判断是否有之前的课时点击信息
            let SpronowTerm = SproCourseIndex != null ? SproCourseIndex : defaultMajor.nowTerm;
            if (SpronowTerm != 0) {

                defaultCourse.map((value, key) => {
                    if (value.term == SpronowTerm) {
                        defaultCoursenow.push(value);
                    }

                })
            }
            else {

                defaultCoursenow = defaultCourse
            }

            let defaultCourseChildnow = [];
            defaultCoursenow.map((value) => {
                defaultCourseChildnow.push(defaultCourseChild[value.Sproindex]);
            })
            this.setState({
                defaultMajor: defaultMajor,
                defaultCourse: defaultCourse,
                defaultCourseChilds: defaultCourseChild,
                defaultCoursenow: defaultCoursenow,
                defaultCourseChildnow: defaultCourseChildnow,
                defaultoptionTerm: SpronowTerm
            })
        }

    }
    componentDidMount(){
        SJQEvent.listen("click",this.valueChange)
    }
    valueChange(SJQvalue){
        this.setState({
            SJQvalue,
        })
    }
    componentWillUnmount(){
         SJQEvent.remove("click",this.valueChange)
    }
    ChooseState(e) {
        this.setState({
            SJQvalue:2
        })
        window.event? window.event.cancelBubble = true : e.stopPropagation();
        if (this.props.CloseLeftSelectFlag!=true) {
            this.props.CloseLeftSelect();
        }
    }
    ChooseTerm(e) {
        this.setState({
            sproCourkidIndex: -1,
            SproClickindex: -1,
            SproLinkClickindex: -1,
            defaultoptionTerm: e.target.value
        })
        sessionStorage.setItem("defaultoptionTerm", e.target.value)
        if (e.target.value != "0") {
            let TempCourse = []

            this.state.defaultCourse.map((value, key) => {
                if (value.term == e.target.value) {
                    TempCourse.push(value);
                }
            })
            let TempCoursekid = []
            TempCourse.map((valuekid) => {
                TempCoursekid.push(this.state.defaultCourseChilds[valuekid.Sproindex])
            })
            this.setState({
                defaultCoursenow: TempCourse,
                defaultCourseChildnow: TempCoursekid,
                // UlClickState: false,
            })

        } else {
            this.setState({
                defaultCoursenow: this.state.defaultCourse,
                defaultCourseChildnow: this.state.defaultCourseChilds,
                // UlClickState: false,
            })
        }
    }
    onChangeSelect() {
        sessionStorage.setItem("switchListControl", -1)
    }
    hashSproTamp() {
        hashHistory.push("/profession");
    }
    render() {
        let userState = sessionStorage.getItem("userJudge");

        if (userState != "S") {
            return false;
        }
        else {
            // let UlClickState = this.state.UlClickState;
            // console.log(UlClickState);
            console.log(this.props.CloseLeftSelectFlag);
            let Height = document.body.clientHeight - 130;
            let ulStyle = {
                visibility: this.props.CloseLeftSelectFlag? "visible" : "hidden",
                borderLeft: this.props.CloseLeftSelectFlag? "1px solid  #0acbff" : "",
                borderBottom: this.props.CloseLeftSelectFlag? "1px solid  #0acbff" : "",
                borderRight: this.props.CloseLeftSelectFlag? "1px solid  #0acbff" : "",
            }
            let CourseconfigStyle = {
                height: Height + "px"
            }
            let Spanstyle = {
                border: this.props.CloseLeftSelectFlag ? "1px solid  #0acbff" : "1px solid  #656d76"
            }
            console.log(this.state.defaultoptionTerm);
            let valueinfo = this.state.defaultMajor.nowTerm == this.state.defaultoptionTerm ? this.state.optionDataInit[this.state.defaultoptionTerm] + "   (本学期)" :
                this.state.optionDataInit[this.state.defaultoptionTerm]
    

            return (
                <div className="sproPublicside">
                    <Link to="/profession" className="lenovotit" onClick={this.onChangeSelect.bind(this)}></Link>
                    <div className="sproPublicMajor" onClick={this.hashSproTamp.bind(this)}>{this.state.defaultMajor.name}</div>
                    <div className="sproPublicleftselectWrap">
                        <div className="sproPublicleftselect" style={Spanstyle}>
                            <span onClick={this.ChooseState.bind(this)}>&nbsp;&nbsp;&nbsp;{valueinfo}</span>
                            <ul style={ulStyle}>
                                {
                                    this.Optionconfig()
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="CourseconfigWrap" style={CourseconfigStyle}>
                        {
                            this.Courseconfig()
                        }
                    </div>
                </div>
            )
        }
    }
}
