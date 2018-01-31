/**
 * Created by heshuai on 2017/2/21.
 */
import React from 'react';
import './styleTeacherQuestion.css';
import $ from 'jquery';
import './s_predelate.css';
import ReactDOM from 'react-dom';
import TestlistItem from './TestlistItem.js';
import {
  Link,
  Router,
  Route,
  hashHistory,
  IndexRoute,
  IndexRedirect,
  browserHistory
} from 'react-router';
export default class thQuestionBodys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultInfotitle:"",
      // majors: [],
      bodyques: [],
      //当前页数
      page: 1,
      //条目信息
      rows: [],
      index: [],
      //总页数
      pages: [],
      pagesCount:[],
      styleText: false,
      idsto: [],
      temptitle: [],
      styleTextinput: [],
      spro_info:false,
      spro_noinfo: false,
      spro_noinfos: [],
      //當前縂頁數
      pageCount:[],
      ExamTypeHash:"",
      thatKey:"",
      paper_name:[],
      spro_pagestate2: false,
      spro_pagestate1: false,
      changeValue:'',
      //试卷来源
      LookState:"",
      ownerS:"",
      Sprocoursename:"全部课程",
      majors:[],
      SproCourseData:[],
      sproVimajor:"全部专业",
      SproMajorname:"",
      SproCoursname:"",
      AtestFlag:false,
      quizFlag:"",
      finaFlag:"",
    }
    $("body").css("overflow", "visible");
  }
  componentDidMount() {
 
  }
  handleEnter() {
      // this.handleSubmit("1");
      //如果是空字符串 不走AJAX
      var str = this.state.changeValue;
      if(str == ''){
        // //console.log('null')
        return false;
      }else{
        var page = 1;
        // //console.log('normal')
        this.setState({
          changeValue:str
        })
        this.cometoques(1,str,this.state.LookState,this.state.ownerS,this.state.sproVimajor,this.state.Sprocoursename)
      }

  }
  componentWillReceiveProps(nextProps){
 
    if(nextProps.RouterFlag!=undefined){
      if(nextProps.RouterFlag=="final"||location.hash.indexOf("?RF=f")!=-1){
       this.setState({
         AtestFlag:true,
         finaFlag:"final",
         ExamTypeHash:"F",
         quizFlag:"",
         LookState:"0",
         defaultInfotitle:"期末考试试卷库"
       })
       this.cometoques(1,"","0","",this.state.sproVimajor,this.state.Sprocoursename)
      }else if(nextProps.RouterFlag=="quiz"||location.hash.indexOf("?RF=q")!=-1){
      
        this.setState({
          quizFlag:"quiz",
          finaFlag:"",
          ExamTypeHash:"Q",
          LookState:"1", 
          defaultInfotitle:"试卷库"
        })
        this.cometoques(1,"","1","",this.state.sproVimajor,this.state.Sprocoursename)
      }else{
         this.setState({
          quizFlag:"",
          finaFlag:"",
          ExamTypeHash:"A",
          LookState:"", 
          defaultInfotitle:"试卷库"
        })
        this.cometoques(1);
      }
    }
  }
  componentWillMount() {
   
      if (sessionStorage.getItem("teacherComp") == "") {
            $.llsajax({
                url: "major/findMajor",
                type: "POST",
                async: false,
                success: compData => {
                    sessionStorage.setItem("teacherComp", JSON.stringify(compData));
                }
            })
        }
        // 从session中获取数据
        let compData = JSON.parse(sessionStorage.getItem("teacherComp"));
        this.setState({
            majors: compData.majors,
            
      })
    
      this.setState({
        SproCoursname:location.hash.indexOf("?Spro")!=-1?Base64.decode(location.hash.split("?Spro=")[1].split("&")[0]):"全部课程",
        LookStates:location.hash.indexOf("?")==-1?"0":"",
        AtestFlag:location.hash.indexOf("?RF=f")!=-1||this.props.RouterFlag=="final"?true:false,
        quizFlag:location.hash.indexOf("?RF=q")!=-1||this.props.RouterFlag=="quiz"?"quiz":"",
        finaFlag:location.hash.indexOf("?RF=f")!=-1||this.props.RouterFlag=="final"?"final":"",
    })
    if(location.hash.indexOf("?Spro")!=-1){
     compData.majors.map((value)=>{
       if(value.id==Base64.decode(location.hash.split("&i=")[1])){
          this.setState({
            SproMajorname:value.name
          }) 
        
      }
       })
     }
    let quizFlag=location.hash.indexOf("?RF=q")!=-1||this.props.RouterFlag=="quiz"?"quiz":"";
    let finaFlag=location.hash.indexOf("?RF=f")!=-1||this.props.RouterFlag=="final"?"final":"";
    if(quizFlag=="quiz"){
        this.cometoques(1,"","1","",this.state.sproVimajor,this.state.Sprocoursename)
        this.setState({
      //  ownerS:"1",
        LookState:"1", 
        defaultInfotitle:"试卷库",
        })
    }else if(finaFlag=="final"){
        this.cometoques(1,"","0","",this.state.sproVimajor,this.state.Sprocoursename)
        this.setState({
       // ownerS:"0",
        LookState:"0",
         defaultInfotitle:"期末考试试卷库"
        })
    }else{
        this.cometoques(this.state.page);
         this.setState({
        // ownerS:"0",
        LookState:"",
         defaultInfotitle:"试卷库"
        })
    }
  }
  ruData2(s_date) {
    var d = s_date;
    var date = new Date(d);
    var Y = date.getFullYear();
    var M = date.getMonth() + 1;
    if (M < 10) {
      M = "0" + M
    }
    var T = date.getDate();
    if (T < 10) {
      T = "0" + T
    }
    var S = date.getHours();
    if (S < 10) {
      S = "0" + S
    }
    var m = date.getMinutes();
    if (m < 10) {
      m = "0" + m
    }
    var ruData = Y + "-" + M + "-" + T + " " + S + ":" + m;
    return ruData;
  }
  cometoques(page,flag,LookState,owner,p,c) {
   
    var total = 10;
    var LookStates="";
    var Owners="";
    if(LookState!=this.state.LookState){
       LookStates=LookState
    }else{
       LookStates=this.state.LookState
    }
    if(owner!=this.state.ownerS){
      Owners=owner
    }else{
      Owners=this.state.ownerS
    }
    if(location.hash.indexOf("?Spro=")!=-1){
      c=this.state.Sprocoursename
    }
    $.llsajax({
    //  $.ajax({
      //  url:"http://10.103.123.49:8081/lls-web/examInationPaper/list",
      url: "examInationPaper/list",
      type: "post",
      data: {
        page: page,
        rows: total,
        paper_name:flag,
        userid:LookStates,
        owner:Owners,
        coursename:c!="全部课程"?c:"",
        majorname:p!="全部专业"?p:"",
      },
      success: bodyquesData => {
        this.setState({
          page:page,
          bodyques: bodyquesData.list.rows,
          pages: bodyquesData.list.total
        })
        
        if (bodyquesData.list.count == 0) {
          this.setState({
            spro_info:true,
            spro_noinfos: flag==null?"当前无试卷  可点击右上角进行创建":"没有符合该条件的试卷"
          })
        } else {
          this.setState({
            spro_info:false,
            spro_noinfo: false
          })
        }
       if (bodyquesData.list.total <= 1 && bodyquesData.list.count <= 10) {
                    this.setState({
                            spro_noinfo: true
                        })
                        //最后一页
                } else if (this.state.pages == page) {
                    this.setState({
                        spro_pagestate2: true,
                        spro_pagestate1: false
                    })
                }
                //首页
                else if (page == 1 && bodyquesData.list.total > 1) {
                    this.setState({
                        spro_pagestate1: true,
                        spro_pagestate2: false
                    })
                }
                //等于三页或以上当前页不是第一页也不是最后一页
                else {
                    this.setState({
                        spro_pagestate2: false,
                        spro_pagestate1: false
                    })
                }

      }
    })
  }
  closeprevs() {
    $(".spro_delete").css("display", "none");
  }
  showPre() { //这是点击上一页执行的函数
        if (this.state.page >= 2) {
            this.setState({
                page: --this.state.page,
               
            })
            this.cometoques(this.state.page,this.state.changeValue,this.state.LookState,this.state.ownerS,this.state.sproVimajor,this.state.Sprocoursename);
        }else{
          return;
        }
    }
  showNext() { //这是点击下一页执行的函数
        if (this.state.pages == this.state.page) {
           return;
        } else {
            this.setState({
                page: ++this.state.page,  
            })
            this.cometoques(this.state.page,this.state.changeValue,this.state.LookState,this.state.ownerS,this.state.sproVimajor,this.state.Sprocoursename);
        }
    }
  heiheihei(a, minute, c, l) {
    sessionStorage.setItem("majorid", a)
    sessionStorage.setItem("examinationTime", minute)
    sessionStorage.setItem("courseid", c);
    sessionStorage.setItem("lessonid", l);
  }
 
  onDelete(ids, owners, whe) {

    if (whe == 1) {
      this.setState({
        idsto: ids + ""
      })
    }

    $(".spro_delete").css("display", "block");
    if (whe == 2) {
      $(".spro_delete").css("display", "none");
    }
    if (whe == 3) {
      $.llsajax({
        url: "examInationPaper/delPaper",
        type: "post",
        data: {
          id: this.state.idsto,
        },
        success: bodyques => {
          this.cometoques(this.state.page);
        }
      })
      $(".spro_delete").css("display", "none");
    }
  }
  //选择专业
  ChooseStatemajor(Flag){
   
    if(Flag=="major"){
        if(this.state.UlClickStatemajor){
            this.setState({
                UlClickStatemajor:false
            })
        }
        else{
        this.setState({
            UlClickStatemajor:true,
        })
      }
    }
    else{
      if(this.state.UlClickStateCou){
            this.setState({
                UlClickStateCou:false
            })
        }
        else{
        this.setState({
            UlClickStateCou:true,
        })
      }
    }
    }
    
  handleTypeTabmajor(event) {
    if(event.target.getAttribute("data-flag")=="major"){
        this.setState({
            UlClickStatemajor:false,
            UlClickStateCou:false,
        })
  //处理e.target.value的值 同步setState 到伪select 框
    
      if(this.state.sproVimajor!=event.target.title){
       
        this.setState({
          sproVimajor:event.target.title,
           Sprocoursename:"全部课程"
        
        })
        if(event.target.getAttribute("data-key")!="allM"){
        
           //SproCourseData:this.state.majors[event.target.getAttribute("data-key")].
           this.setState({
             SproCourseData:this.state.majors[event.target.getAttribute("data-key")].courseList
           })
        }else{
           this.setState({
             SproCourseData:[],
            
           })
        }
        this.cometoques(this.state.page,this.state.changeValue,this.state.LookState,this.state.ownerS,event.target.title,"")
      }
    }else{
       this.setState({
            UlClickStateCou:false
        })
        
  //处理e.target.value的值 同步setState 到伪select 框
      if(this.state.Sprocoursename!=event.target.title){
        this.setState({
          Sprocoursename:event.target.title
        })
 
        this.cometoques(this.state.page,this.state.changeValue,this.state.LookState,this.state.ownerS,this.state.sproVimajor,event.target.title)
      }
    }
  }
  limajor(){
    return this.state.majors.map((Sprovalue,key)=>{
      return (
        <li key={key}  data-key={key} onClick={this.handleTypeTabmajor.bind(this)} data-flag="major" title={Sprovalue.name}>{Sprovalue.name}</li>
      )
    })
   
  }
  liCou(){
    if(this.state.SproCourseData.length!=0){
    return this.state.SproCourseData.map((Sprovalue,key)=>{
         return(
            <li key={key}  data-key={key} onClick={this.handleTypeTabmajor.bind(this)} data-flag="Cou" title={Sprovalue.name}>{Sprovalue.name}</li>
         )
     })
    }
    else{
      return false;
    }
  }
  Onceback(){
    sessionStorage.setItem("testpaperFlag","true")
  }
  LookState(e){
    if(this.state.LookState!=e.target.value){
      this.setState({
        LookState:e.target.value
      })
      if(e.target.value!="666"){
        this.cometoques(this.state.page,this.state.changeValue,e.target.value,"",this.state.sproVimajor,this.state.Sprocoursename);
      }else{
        this.setState({
          ownerS:"666"
        })
        this.cometoques(this.state.page,this.state.changeValue,e.target.value,"666",this.state.sproVimajor,this.state.Sprocoursename);
      }
    }
  
  }
  changeHandle(e){
    //对输入内容进行判断 输入空格 替换成空字符串
    var str = e.target.value;
    this.setState({
      changeValue:str.replace(/\s/g,''),
    })
  }
  Finallisthtmltitle(EXflag){
    return(
       <div className="spro_thQuhead">

                        <div className="spro_thQutitle2">
                            序号
                        </div>
                        <div className="spro_thQutitle3">
                            试卷名称
                        </div>
                        <div className="spro_thQutitle4">
                            题量
                        </div>
                        <div className="spro_thQutitle8" >
                            来源
                        </div>
                        <div className="spro_thQutitle5">
                            所属专业
                        </div>
                        <div className="spro_thQutitle6">
                            所属课程
                        </div>
                        <div className="spro_thQutitle7">
                            所属课时
                        </div>

                        <div className="spro_thQutitle9">
                            创建时间
                        </div>
                        <div className="spro_thQutitle10">
                            操作
                        </div>
                    </div>
    )
  }
  Finallisthtmlbody(){
     return(this.state.bodyques.map((todo, index) => {
                                    return <TestlistItem key={index} {...todo} index={index} {...this.props}
                                        onDelete={this.onDelete.bind(this)}
                                        heiheihei={this.heiheihei.bind(this)}
                                        page={this.state.page}
                                    />
          })
     )
  }
  render() {
 
  let UlClickStatemajor=this.state.UlClickStatemajor;
        let ulStylemajor={
            display:UlClickStatemajor?"block":"none"
        }
        let spanStylemajor={
            border:UlClickStatemajor?"1px solid #1280fb":""
        }
        let UlClickStateCou=this.state.UlClickStateCou;
        let ulStyleCou={
            display:UlClickStateCou?"block":"none"
        }
        let spanStyleCou={
            border:UlClickStateCou?"1px solid #1280fb":""
        }
    let AtestFlag={
      display:location.hash.indexOf("e?all")!=-1||this.props.RouterFlag=="all"?"inline-block":"none",
    }
    let quizFlag={
      display:this.state.quizFlag=="quiz"||location.hash.indexOf("RF=quiz")!=-1?"inline-block":"none",
     
    }
    let forbid = {
            backgroundColor: "#d3d3d3",
            color: "#ffffff",
            borderColor: "#d3d3d3"
        }
    let starts = {
            backgroundColor: "#ffffff",
            color: "#323232",
            borderColor: "#d3d3d3"
    }
    let SproCoursename=this.state.Sprocoursename;
    let Coursestate={
       display:location.hash.indexOf("?Spro")!=-1?"inline-block":"none",
      textAlign:"left",
      width:"auto",
      marginRight:"20px"
    }
    
    let noCourseStyle={
      position:"absolute",
       display:location.hash.indexOf("?Spro")!=-1?"none":"inline-block",
       left:this.state.AtestFlag||this.state.quizFlag=="quiz"?"204px":"188px",
       top:"-4px",
    }
     let noCourseStyle1={
       position:"absolute",
       display:location.hash.indexOf("?Spro")!=-1?"none":"inline-block",
       left:this.state.AtestFlag||this.state.quizFlag=="quiz"?"188px":"165px",
       top:"-4px",

    }

    let Courseinfo=location.hash.indexOf("?Spro")!=-1?Base64.decode(location.hash.split("?Spro=")[1].split("&")[0]):"--"
    //显隐无数据
    let spro_info={
      display: this.state.spro_info ? "none" : "block"
    }
    //显隐无数据提示
    let spro_noinfo = {
      display: this.state.spro_info ? "block" : "none"
    }
    // let spro_styleteapage = {
    //         display: this.state.spro_styleteapage ? "none" : "block"
    // }
       //显隐分页
    var spro_noinfos = {
      visibility: !this.state.spro_noinfo ? "visible" : "hidden"
    }
    let forbidcls = this.state.page == 1 ? forbid : starts;
    // let listlen = this.state.bodyexams.length < 10 ? forbid : starts;
    let listlens = this.state.page == this.state.pages ? forbid : starts;
    let styles = {
      background: "#fdfffe"
    }
    let styleI = {
            display:"inline-block",
            width:"60px",
            textAlign:"center",
        }
        let styleS = {
            display:"inline-block",
            width:"60px",
            textAlign:"center",
        }
    return (
      <div className="spro_questionBody">
            <div className="spro_thQuBody">
                    <div className="spro_questitle">
                        <span className="spro_cubiud"></span><span className="spro_information">{this.state.defaultInfotitle}</span>
                        <div><Link className="commonButton button" to={{pathname:"/createTestPaper",query:{id:""}}} onMouseDown={this.Onceback.bind(this)}>创建试卷</Link></div>
                    </div>
                    {/*这是下拉框的html*/}
                    <div className="spro_thSelect">
                        <div className="spro_thselection1">

                        </div>
                        <div className="spro_thselection">
                            <div className="spro_thSelects2" style={AtestFlag}>来源:
                              <select onChange={this.LookState.bind(this)}>
                                <option value="">&nbsp;全部试卷</option>
                                <option value="0">&nbsp;期末试卷</option>
                                <option value="1">&nbsp;公有测验</option>
                                <option value="666">&nbsp;私有测验</option>
                              </select>
                            </div>
                            <div className="spro_thSelects2" style={quizFlag}>来源:
                              <select onChange={this.LookState.bind(this)}>
                                <option value="1">&nbsp;公有测验</option>
                                <option value="666">&nbsp;私有测验</option>
                              </select>
                            </div>
                            <div className="sprosatPublicleftselect Spromajselect" style={noCourseStyle1}>专业 :
                                        <span onClick={this.ChooseStatemajor.bind(this,"major")} style={spanStylemajor}>{this.state.sproVimajor}</span>
                                            <ul style={ulStylemajor} className="SprothQuestion">
                                              <li title="全部专业" data-key="allM" data-flag="major"  onClick={this.handleTypeTabmajor.bind(this)}>全部专业</li>
                                               {this.limajor()}
                                            </ul>
                            </div>
                            <div className="sprosatPublicleftselect SproCouselect " style={noCourseStyle}>课程 :
                                        <span onClick={this.ChooseStatemajor.bind(this,"Cou")} style={spanStyleCou}>{this.state.Sprocoursename}</span>
                                            <ul style={ulStyleCou} className="SprothQuestion">
                                              <li title="全部课程" data-key="allC" data-flag="Cou" onClick={this.handleTypeTabmajor.bind(this)}>全部课程</li>
                                               {this.liCou()}
                                            </ul>
                            </div>
                            {/*<div style={AtestFlag1}>
                              <span className="AtestFlaginnerspan">来源 : </span>
                              <span> 期末考试</span>
                            </div>*/}
                            <div style={Coursestate}>
                              <span>专业 : </span>
                              <span>{" "+this.state.SproMajorname}</span>
                            </div>
                            <div style={Coursestate}>
                              <span>课程 : </span>
                              <span>{" "+this.state.SproCoursname}</span>
                            </div>
                            <div className="spro_thSelects3" >
                                <b onClick={this.handleEnter.bind(this)}>搜索</b>
                                <label>
                                <input type="text" placeholder="按名称搜索" id="wocao"  ref="sproinputteastore" onChange={this.changeHandle.bind(this)} value={this.state.changeValue}/>
                                </label>
                                <span>搜索试卷:</span>
                            </div>
                        </div>
                    </div>
                    {/*这是列表页的html*/}
                    {/*<div className="spro_thQuhead">

                        <div className="spro_thQutitle2">
                            序号
                        </div>
                        <div className="spro_thQutitle3">
                            试卷名称
                        </div>
                        <div className="spro_thQutitle4">
                            题量
                        </div>
                        <div className="spro_thQutitle8" >
                            来源
                        </div>
                        <div className="spro_thQutitle5">
                            所属专业
                        </div>
                        <div className="spro_thQutitle6">
                            所属课程
                        </div>
                        <div className="spro_thQutitle7">
                            所属课时
                        </div>

                        <div className="spro_thQutitle9">
                            创建时间
                        </div>
                        <div className="spro_thQutitle10">
                            操作
                        </div>
                    </div>*/}
                    {this.Finallisthtmltitle(this.state.ExamTypeHash)}
                    <div className="sproteastore-minheight" style={spro_info}>
                    {/*{
                                this.state.bodyques.map((todo, index) => {
                                    return <TestlistItem key={index} {...todo} index={index} {...this.props}
                                        onDelete={this.onDelete.bind(this)}
                                        heiheihei={this.heiheihei.bind(this)}
                                        page={this.state.page}
                                    />
                                })
                    }*/}
                     {this.Finallisthtmlbody(this.state.ExamTypeHash)}
                    </div>
                    <div style={spro_noinfo} className="spro_store">
                     <div className="spro_liststore">
                        <div className="spro_storeimage">
                           <i className="spro_storeimagespan">
                               {this.state.spro_noinfos}
                           </i>
                         </div>
                     </div>
                    </div>
                    <div style={spro_noinfos} className="spro_page" >
                        <div className="spro_pageinner">
                            <div className="exspro_styleteadiv">
                                <span  className="exspro_styletealistspan">共<i style={styleI}>{this.state.pages}</i>页</span>
                                <span  className="exspro_styletealistspan">第<b className="exspro_styletealistb" style={styleS}>{this.state.page}</b>页</span>
                            </div>
                            <button className={this.state.spro_pagestate2 ? "forbid" : "starts"}  onClick={this.showNext.bind(this)} >下一页</button>
                            <button className={this.state.spro_pagestate1 ? "forbid" : "starts"} onClick={this.showPre.bind(this)}  >上一页</button>
                        </div>
                    </div>

                </div>
                <div className="spro_delete">
                        <div className="spro_deletes">
                            <div className="spro_preheads">
                                <span className="fl spro_deletprev1">删除</span>
                                <span className="fr spro_deletprevs iconfont icon-guanbi" onClick={this.closeprevs.bind(this)}></span>

                            </div>
                            <p className="spro_deletitle"><span>确认删除该试卷吗？</span><span>删除后考试中的试卷也将自动删除</span></p>
                            <div className="spro_prevbtns">
                                <button className="spro_prevbtns1" onClick={this.onDelete.bind(this,"for","for",2)}>取消</button>
                                <button className="spro_prevbtns2" onClick={this.onDelete.bind(this,"for","for",3)}>确定</button>
                            </div>
                        </div>
                </div>
            </div>
    );
  }
}
