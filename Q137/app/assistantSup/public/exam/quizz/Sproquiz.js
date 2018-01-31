import React from 'react';
import ReactDOM from 'react-dom';
import {
    Link,
    Router,
    Route,
    hashHistory,
    IndexRoute,
    IndexRedirect,
    browserHistory
} from 'react-router';
import SproOneStyle from './SproradioItem.js';
import SproTwoStyle from './SprocheckboxItem.js';
import '../../../../components/classHour/classContent/examination/SproStyleexam.css';
import '../../../../components/classHour/classContent/examination/styleExamination.css';
import '../../../../components/classHour/classContent/examination/stylestudentEx.css';
import '../../../../components/classHour/classContent/examination/examsproDelete.css';
import '../../../../components/classHour/classContent/examination/spro_Publishedpaperscss.css';
import '../../../../components/classHour/classContent/examination/s_radiocheckbutton.css';
import Sproshortanswerquestion from './Sproshort_answer_question.js';
import $ from 'jquery';
export default class Sproquiz extends React.Component {
    constructor(props) {
        super(props);
        var ruData = "";
        var examObjSub = [];
        let examObj = [];
        Array.prototype.unique3 = function () {
            var res = [];
            var json = {};
            for (var i = 0; i < this.length; i++) {
                if (!json[this[i]]) {
                    res.push(this[i]);
                    json[this[i]] = 1;
                }
            }
            return res;
        };
        this.state = {
            //用户名
            username: [],
            //考试名字
            exam_name: [],
            //考试时间
            SprotimeInfo:[],
            //显示查看或者考试的状态显示文字
            leadtimeinfo: [],
            //已完成题目数
            examItem: 0,
            //题目总数目
            examNum: [],
            //单选题总分
            radioscores: [],
            //单选题单个分值
            radioscore: [],
            //单选题集合
            exList0: [],
            //多选题总分
            checkboxscores: [],
            //多选题单个分值
            checkboxscore: [],
            //多选题
            exList1: [],
            exList0style:false,
            exList1style:false,
            exList2style:false,
            exList2score:0,
            exList2scores:0,
            //主觀題
            exList2:[],
            //简答题数量
            exList2answernum:0,
            //显示查看或者考试的状态判断是否显示正确答案的div
            EXstate: "L",
            EXLorW:"L",
            //考试状态
            permissions: [],
            //显示时间风格
            leadtimestyle: [],
            //超过时间样式
            EXspro_Timeover: false,
            paperid: [],
            examxx: [],
            answers: [],
            page: [],
            submitid: [],
            examObj: [],
            examObjSub: [],
            examObj1:[],
            exList2answer:[],
            exList2answerModi:[],
            Tpreviewstate:true,
            ExSubarray:[],
            EXSubscoreArray:[],
            EXCoarray:[],
            quiztimeinfo:"--:--:--"
        }
    }
    //弹出层JS
    studentEx1(a) {
        this.EXhandleSubmit(a, "0");
    }
    componentWillMount() {
        //exam_id 考试ID  userid 学生ID 教师端默认为0

        if(location.hash.indexOf("examinationMain")!=-1){
            this.SproinitexamState(this.props.data.lestestid,0);
        }
        else{
            this.SproinitexamState(this.props.data.exam_id,this.props.data.userid?this.props.data.userid:"");
        }
    }
    SproinitexamState(Tid,userid,TorSFlag){
//Tid
        $.llsajax({
            url:"lestest/enterpaper",
            type:"POST",
            data:{
                testid:Tid,
                userid:userid,
            },
            success:data=>{
            if(data.list.length>0){
               this.setState({
                  showFlag:false,
                  Tpreviewstate:false,
               })
              

              switch(data.flag){
                  
              case "viewresult":
              this.setState({
                  EXstate:"L",
                  EXLorW:"SL"
              })

              this.seepaper(data,"G");

              break;
              case "answer":
              this.setState({
                  EXstate:"K",
                  EXLorW:"W"
              })
              this.studentEx0(data);

              break;
              case "view":
               this.setState({
                  EXstate:"K",
                  EXLorW:"P"
              })
              this.seepaper(data,"view");
             break;
              case "teacherview":
               this.setState({
                  EXstate:"L",
                  EXLorW:"L",
                  Tpreviewstate:true,
              })
              this.seepaper(data,"P");
              break;
                    }
                }
                else{
                  alert("当前试卷没有试题") 
                }
            }
        })
    }
    count() {
        let winWidth = 0;
        let winHeight = 0;
        let obj = {}
        if (window.innerWidth)
            winWidth = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            winWidth = document.body.clientWidth;
        //获取窗口高度
        if (window.innerHeight)
            winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
        return obj = {
            Width: winWidth,
            Height: winHeight
        }
    }
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }
    submitExamjianda(){
        let exList2answer=this.state.exList2answer;
        let exList2answerString="";
        for(var i=0;i<exList2answer.length;i++){
            if(i==0){
          exList2answerString=exList2answerString+exList2answer[i]
            }else{
                 exList2answerString=exList2answerString+"@"+exList2answer[i]
            }
        }
        return exList2answerString;
    }
    submitExam(examObj) {
        let examObjs = examObj.length > 0 ? examObj : " "
        let exList2answerString=this.submitExamjianda();
        $.llsajax({
            type: 'POST',
            async: false,
            url: 'lestest/submitResult',
            data: {
                lestest_id: this.state.submitid,
                class_id: 1,
                answerjson: examObjs,
                sanswerjson:exList2answerString,
            },
            success: data => {
                if (data.result == 200) {
                    //this.getExam(this.state.page);
                }
            }
        })
    }
    sproscoreStyle(score, flag) {
        let dlb = {
            display: "inline-block",
            height: "78px",
            lineHeight:"78px"
        }
        let spanStyle = {
            width: "158px",
            display: "inline-block",
        }
        let iStyle = {
            display: "inline-block",
            fontSize: "24px"
        }
        let quizStyle = {
            display: "inline-block",
            fontSize: "24px",
            fontWeight:"100"
        }
        let spanTwoStyle={
            width: "158px",
            display: "inline-block",
            background:"#49c0e0",
            fontSize: "24px",
            fontWeight:"300"
        }
        let topInfo = flag == "G" ? "成绩:" : "考试正在进行中";
        let lastInfo = flag == "G" ? "分" : "";
        let viewInfo="判卷中";
        let preview="预览试卷";
        if(flag=="G"){
                return (

            <div style={dlb}>
                <span style={spanStyle}>{topInfo}<i style={iStyle}>{score}</i>{lastInfo}</span>
            </div>
            )
        }
        else if(flag=="answer"){
            return (             <div style={dlb}>
                <span style={spanStyle}>{topInfo}</span>
            </div>
            )
        }else if (flag == "A") {
            return (<div style={dlb}>
                <span style={spanStyle}>{'剩余'}<i style={quizStyle}>{score}</i></span>
            </div>
            )
        }
        else if(flag=="view"){
             return (             <div style={dlb}>
                <span style={spanStyle}>{viewInfo}</span>
            </div>
            )
        }else if(flag=="P"){
            return (             <div style={dlb}>
                <span style={spanTwoStyle}>{preview}</span>
            </div>
            )
        }

    }
    exList2Submitresult(value,key,id,flag){
          let exList2answer=this.state.exList2answer;
          exList2answer[key]=id+"|"+value;
          let exList2answerModi=this.state.exList2answerModi;
          if(value!=""){
             exList2answerModi[key]=1;
          }
          this.setState({
            exList2answer:exList2answer
          })
          let exList2answernum=0;
          for(var i=0;i<exList2answerModi.length;i++){
             if(exList2answerModi[i]){
                exList2answernum++;
             }else if(flag){
                exList2answernum--;
             }
          }
          this.setState({
              exList2answernum:exList2answernum
          })

    }
    MHeight(Obj,Item){
        let answerLength=(Obj.split("\n")).length;
        if(answerLength==1){
            
            let Cobj=this.getByteLen(Obj);
                return Math.ceil(Cobj.len/Item);
           
        }else{
            let Nobj=Obj.split("\n");
            let MoreLen=0;
            Nobj.map((value,key)=>{
                let Cobj=this.getByteLen(value);
                if(Math.ceil(Cobj.len/Item)>1){
                    MoreLen=MoreLen+Math.floor(Cobj.len/Item);
                }
            })
            return MoreLen+Number(Nobj.length);
               
            
         
        }
    }
    
    seepaper(viewresult,LookState) {
     
        this.setState({
            letTime: -1,
        })
        let radioItem = [];
        var Obj = this.count();
                this.setState({
                    exList0: [],
                    exList1: [],
                    exList2: [],
                });
                  let score="";
                  let answers="";
                  let kanswers="";
                 if(LookState!="P"){
                   
                    if(viewresult.answer.answerjson.length>1){
                    answers = viewresult.answer.answerjson.indexOf("!")!=-1? viewresult.answer.answerjson.split("@") : "";
                    }else{
                    answers="";
                    }
                    let regu = "^[ ]+$";
                    let re=new RegExp(regu)
                    let answerflag=re.test(answers);
                    let kanswerflag=re.test(kanswers);
                    if (answers == null||answerflag||answers==="") {
                    $(".xuanxiangstyle").html(" ");
                    }else{
                        this.setState({
                            EXCoarray:answers
                        })
                    }
                    kanswers=viewresult.answer!=null?viewresult.answer.sanswerjson.split("@") :"";
                   
                    if (kanswers == null||kanswerflag||kanswers=="") {
                        $(".Sprosaq_textarea").html(" ");
                    }else{
                        this.setState({
                        ExSubarray:kanswers,
                        EXSubscoreArray:viewresult.answer.sanswerscore!=null?viewresult.answer.sanswerscore.split("@")
                        :[],
                      })
                    }
                        
                    score=viewresult.answer.score;
                 }
                let Timedate=viewresult.starttime;
                this.setState({
                    SprotimeInfo:this.ruData2(Timedate),
                    score:score,
                    username:viewresult.username?viewresult.username:"--",
                    exam_name: viewresult.coursename?viewresult.coursename+"阶段测验":"阶段测验",
                    examNum: viewresult.list.length,
                    permissions: "已结束",
                    leadtimestyle: false,
                    leadtimeinfo: score ? this.sproscoreStyle(score, LookState) : this.sproscoreStyle(0, LookState),
                });
                //判断是否为教师端预览试卷的状态
                if(LookState!="P"){
                if (answers != "" &&answers != null) {
                    // answers.map((index, key) => {
                    //     let indexdata = index.split("!");

                    //     let indexs = "#" + indexdata[0];
                    //     $(document).ready(function () {
                    //         $(indexs).html(index.split("!")[1]);
                    //     })
                    // })
                    this.setState({
                        examItem: this.state.examItem != 0 ? this.state.examItem :answers.length,
                    })
                } else {
                    this.setState({
                        examItem: 0
                    })
                }
                 if (kanswers != "" && kanswers != null) {

                //      kanswers.map((index, key) => {
                     
                //     let indexdata = index.split("|");
                //     console.log(indexdata)
                //     let indexs = "#" + indexdata[0]+"answer";

                // $(document).ready(function () {
                //     $(indexs).val(index.split("|")[1]);
                // })
                //     })
                     this.setState({
                exList2answernum: this.state.exList2answernum != 0 ? this.state.exList2answernum : kanswers.length,

                    })

                }else{
                     this.setState({
                        exList2answernum: 0
                    })
                }
            }
                var exlist00 = [];
                var b = [];
                var exlist2=[]
                var types = [];
                viewresult.list.map((index, key) => {
                    //$('.SproquizEx').css('display', 'block');
                    types.push(index.type);
                    if (types.length == viewresult.list.length) {
                        if (types.indexOf("2") == -1) {
                            this.setState({
                                exList1style: true,
                            })
                        } else {
                            this.setState({
                                exList1style: false
                            })
                        }
                         if (types.indexOf("3") == -1) {
                            this.setState({
                                exList2style: true,
                            })
                        } else {
                            this.setState({
                                exList2style: false
                            })
                        }
                        if (types.indexOf("1") == -1) {
                            this.setState({
                                exList0style: true
                            })
                        } else {
                            this.setState({
                                exList0style: false
                            })
                        }
                    }
                    if (index.type == 1) {
                        exlist00.push(index);
                        this.setState({
                            exList0: exlist00.length != 0 ? exlist00 : [],
                            radioscore: index.score,
                            radioscores: (exlist00.length) * index.score
                        })
                    } else if (index.type == 2) {
                        b.push(index);
                        this.setState({
                            exList1: b.length != 0 ? b : [],
                            checkboxscore: index.score,
                            checkboxscores: (b.length) * index.score
                        })
                    } else if(index.type==3){
                       exlist2.push(index);
                       this.setState({
                           exList2score:index.score,
                            exList2:exlist2,
                           exList2scores:(exlist2.length)*index.score
                       })
                    }
                    $(document).ready(function () {
                         $(".SproquizEx").animate({
                            top: "0px"
                         }, 200)
                        $(".navpare").addClass("co");
                        $('.submit').css("background", "#989898");
                        $('.SproquizEx').find('input').attr('disabled', 'true');
                        $('input[type=radio]').addClass('rdos');
                        $('.zhenkeng').css('color', "blue");
                        $('.submitDiv').css('visibility', 'hidden');
                       
                        //获取滚动条到顶部的垂直高度
                       
                        // $(".SproquizEx").slideInDown(100);
                    if(index.type!=3){
                        var title = index.id + index.answer;
                        $('.form_id').find('input[id="' + title + '"]').attr("checked", true);
                        if (index.answer!=null&&index.answer.length > 1) {
                            let asd = index.answer;
                            for (var i = 0; i < asd.length; i++) {
                                $('.form_id').find('input[id="' + index.id + asd.charAt(i) + '"]').attr("checked", true);
                            }
                        }
                    }
                    });
                })
    }
    componentDidMount(){
        $("html").css("overflow-y", "hidden");
    }
    ExsetInterval(Flag,examtime) {
        if(Flag=="viewresult"&&location.hash.indexOf("teacherCourse")==-1){
               this.setState({
                    leadtimeinfo: this.sproscoreStyle(0, "G")
                })
            }
        else if(Flag=="answertime"){
             clearInterval(this.timer);
            this.timer = setInterval(() => {
                examtime=examtime-1000;
  
                var h = Math.floor(examtime / 1000 / 60 / 60 % 24);
                var m = Math.floor(examtime / 1000 / 60 % 60);
                var s = Math.floor(examtime / 1000 % 60);
                h=Number(h<10)?"0"+h:h;
                m=Number(m<10)?"0"+m:m;
                s=Number(s<10)?"0"+s:s;
                
                if (examtime < 1000 && examtime > -1000) {
                    this.setState({
                        leadtimeinfo: this.sproscoreStyle("00:00:00", "A"),
                    })
                    clearInterval(this.timer);
                    /*qwer*/
                    this.examselfanswer();
                      
                    this.setState({
                        EXspro_Timeover:true
                        })

                    
                }else if (examtime <= 601000 &&examtime >= 600000) {
                    this.setState({
                        EXspro_Timeover: true,
                      
                        leadtimeinfo: this.sproscoreStyle(h + ":" + m+ ":" + s, "A"),
                    })
                } else if (examtime > 1000) {
                    this.setState({
                       
                        leadtimeinfo: this.sproscoreStyle(h + ":" + m+ ":" + s, "A"),
                    })
                } else {
                    this.setState({
                      
                        leadtimeinfo: this.sproscoreStyle(h + ":" + m+ ":" + s, "A"),
                    })
                }
            }, 1000);
        }
        else{
             this.setState({
                    leadtimeinfo: this.sproscoreStyle("", Flag)
                })
            }
    }
    SproMathexList2(key,value){
        let exList2answer=this.state.exList2answer;
        exList2answer[key]=value;
        this.setState({
            exList2answer:exList2answer
        })

    }
    studentEx0(answer){
        // 截止时间
        this.setState({
            exam_name: answer.coursename?answer.coursename+"阶段测验":"阶段测验",
            leadtimestyle: true,
        })
        let Flag="answer";
        if(answer.examtime){
            Flag="answertime";
            this.setState({
                leadtimeinfo:"--:--:--"
            })
        }
        var Obj = this.count();
        $('.SproquizEx').css("top", Obj.Height);
        //$('#form_id')[0].reset();
        // 鼠标进入到区域后，则强制window滚动条的高度
            $('input[type=radio]').removeClass('rdos');
            
                    this.setState({
                        examNum: answer.list.length,
                        exList0: [],
                        exList1: [],
                        exList2:[],
                        submitid: answer.testid,
                        username:answer.username?answer.username:"--",
                    })
                    if(Flag=="answertime"){
                        this.ExsetInterval(Flag,Number(0.1)*60*1000);
                    }
                    else{
                        this.ExsetInterval(Flag);
                    }
                    var types = []
                    answer.list.map((index, key) => {
                        types.push(index.type);
                        if (types.length == answer.list.length) {
                            if (types.indexOf("2") == -1) {
                                this.setState({
                                    exList1style: true,
                                })
                            } else {
                                this.setState({
                                    exList1style: false
                                })
                            }
                            if (types.indexOf("1") == -1) {
                                this.setState({
                                    exList0style: true
                                })
                            } else {
                                this.setState({
                                    exList0style: false
                                })
                            }
                            if (types.indexOf("3") == -1) {
                                this.setState({
                                    exList2style: true
                                })
                            } else {
                                this.setState({
                                    exList2style: false
                                })
                            }
                        }

                        if (index.type == 1) {
                            this.state.exList0.push(index);
                            this.setState({
                                radioscore: index.score,
                                radioscores: (this.state.exList0.length) * index.score
                            })
                        } else if(index.type==2){
                            this.state.exList1.push(index);
                            this.setState({
                                checkboxscore: index.score,
                                checkboxscores: (this.state.exList1.length) * index.score
                            })
                        }else {
                             this.state.exList2.push(index);
                            this.setState({
                                exList2score: index.score,
                                exList2scores: (this.state.exList2.length) * index.score
                            })
                        }

                            })
                    $('.submit').css("background", "#49C0E0");
                 //  $("html").css("overflow-y", "hidden");
                    $(".SproquizEx").scrollTop(0)
                    $(".SproquizEx").animate({
                        top: "0px"
                    }, 200)
                    $(".SproquizEx").css({
                        "overflow-y": "auto"
                    });
                    $(document).ready(function () {
                        $('.submitDiv').css('visibility', 'visible');
                        $(".navpare").addClass("co");
                    })
    }
    isRepeat(arr) {
        var hash = {};
        for (var i in arr) {
            if (hash[arr[i]])
                return true;
            hash[arr[i]] = true;
        }
        return false;
    }
    handleChange(event) {
        this.state.examObj.push(event.target.name);
        let examObj = this.state.examObj.unique3();
        // let examxx = event.target.title.substring(event.target.title.length - 1);
        let examxx = event.target.alt.substring(event.target.alt.length - 1);
        this.setState({
            examxx: examxx,
            examObj1: this.state.examObj.unique3(),
            examItem: this.state.examObj.unique3().length,
        });
    }
    examselfanswer() {
        let examObjjs = [];
        let examObjjs2 = [];
        let examtitle = [];
        $("input[type='radio']").each(function (i) {
            if ($(this).is(":checked")) {
                // var test0 = $(this)[0].title;
                var test0 = $(this)[0].id;
                var test = test0.substring(test0.length - 1);
                examObjjs.push($(this)[0].name + "!" + test);
            }
        });
        for (var i = 0; i < this.state.examObj1.length; i++) {
            var spCodesTemp = "";
            $('input:checkbox[name=' + this.state.examObj1[i] + ']:checked').each(function (i) {
                if (0 == i) {
                    var test0 = $(this)[0].id;
                    var test = test0.substring(test0.length - 1);
                    spCodesTemp = $(this)[0].name + "!" + test;
                } else {
                    var test0 = $(this)[0].id;
                    var test = test0.substring(test0.length - 1);
                    spCodesTemp += ("" + test);
                }
            });
            examObjjs2.push(spCodesTemp)
        }
        let examObjjs3 = examObjjs.concat(examObjjs2);
        examObjjs3 = this.skipEmptyElementForArray(examObjjs3);
        this.setState({
            examObjjs4: examObjjs3.join("@")
        })
        let examObjjs4 = examObjjs3.join("@");

        /*qwer*/
        this.submitExam(examObjjs4);

    }
    EXflag(display, flag) {

        if (flag == "3" && display == "已结束") {
            this.setState({
                showFlag:true
            })
            $(".EXspro_delete").css("display", "none");
            $("html").css("overflow-y", "auto");
        } else if (flag == "2") {
            $(".EXspro_delete").css("display", "none");
        } else if (flag == "3" && display != "已结束") {
            this.handleSubmitExam();

            $(".EXspro_delete").css("display", "none");
            $("html").css("overflow-y", "auto");
            //this.props.onClassMessageRefest();
            if(this.props.onRenderLesson){
                this.props.onRenderLesson();
            }
        }
    }
    EXhandleSubmit(display, flag) {
        if (display === "已结束") {
           if(this.props.onHideExam !== undefined){
               this.props.onHideExam();
           }

            this.setState({
                showFlag:true
            })

        } else {
            $(".EXspro_delete").css("display", "block");
            if (display == "1") {
                $(".EXspro_deletprev1").html("提交考试");
                $(".EXspro_deletitle").html("你有未答完的试题，是否提交");
                this.EXflag(display, flag);
            } else if (display == "进行中") {
                $(".EXspro_deletprev1").html("关闭");
                $(".EXspro_deletitle").html("关闭后将无法再次进行答题，试卷将自动提交");
                this.EXflag(display, flag);
            } else if (display == "已结束") {
                $(".EXspro_deletprev1").html("关闭试卷");
                $(".EXspro_deletitle").html("关闭后将无法再次进行答题");
                this.EXflag(display, flag);
            } else {
                $(".EXspro_deletprev1").html("提交考试");
                $(".EXspro_deletitle").html("提交后将无法再次修改答案");
                this.EXflag(display, flag);
            }
        }
    }
    componentWillUnmount() {
        $("html").css("overflow-y", "auto");
         this.timer && clearTimeout(this.timer);
    }
    handleSubmitExam() {
        this.setState({
            examObjSub1: this.state.examObjSub.unique3()
        })
        let examObjjs = [];
        let examObjjs2 = [];
        let examtitle = [];
        $("input[type='radio']").each(function (i) {
            if ($(this).is(":checked")) {
                var test0 = $(this)[0].id;
                var test = test0.substring(test0.length - 1);
                examObjjs.push($(this)[0].name + "!" + test);
            }
        });
        for (var i = 0; i < this.state.examObj1.length; i++) {
            var spCodesTemp = "";
            $('input:checkbox[name=' + this.state.examObj1[i] + ']:checked').each(function (i) {
                if (0 == i) {
                    var test0 = $(this)[0].id;
                    var test = test0.substring(test0.length - 1);
                    spCodesTemp = $(this)[0].name + "!" + test;
                } else {
                    var test0 = $(this)[0].id;
                    var test = test0.substring(test0.length - 1);
                    spCodesTemp += ("" + test);
                }

            });
            examObjjs2.push(spCodesTemp)
        }
        let examObjjs3 = examObjjs.concat(examObjjs2);
        examObjjs3 = this.skipEmptyElementForArray(examObjjs3);
        this.setState({
            examObjjs4: examObjjs3.join("@")
        })
        let examObjjs4 = examObjjs3.join("@");
        this.setState({
            letTime: -1001
        })
        this.submitExam(examObjjs4);
        $("html").css("overflow-y", "auto");
      

        if(this.props.onHideExam !== undefined){
               this.props.onHideExam();
           }

            this.setState({
                showFlag:true
            })
    }
    skipEmptyElementForArray(arr) {
        var a = [];
        $.each(arr, function (i, v) {
            var data = $.trim(v); //$.trim()函数来自jQuery
            if ('' != data) {
                a.push(data);
            }
        });
        return a;
    }
    ruData2(s_date) {
        var date = new Date(s_date);
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
    EXTimeout() {
         if(this.props.onRenderLesson){
                this.props.onRenderLesson();
                if(this.props.onHideExam){
                    this.props.onHideExam()
                }
                this.setState({
                   
                    EXspro_Timeover: false
                })
            }
         else if(this.props.refreshPage){  
                this.props.refreshPage();
                if(this.props.onHideExam){
                    this.props.onHideExam()
                }
                this.setState({
                   
                    EXspro_Timeover: false
                })
            }
                     
        $("html").css("overflow-y", "auto");
        

        
        
       
    }
    getByteLen(val) {
        var obj = {
            len: 0,
            Chinaese: {
                index: 0,
                num: 0
            },
            NoChinaese: {
                index: 0,
                num: 0
            }
        }
        for (var i = 0; i < val.length; i++) {
            var a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                obj.len += 2;
                obj.Chinaese.num++;
            } else {
                obj.len += 1;
                obj.NoChinaese.num++;
                if (i < 11) {
                    obj.NoChinaese.index++;
                }

            }
        }
        return obj;
    }
    render() {
    
        let leadtimestyle = {
            backgroundColor: this.state.leadtimestyle ? "#50c0de" : "#E3221B",
        }
        let exList0style = {
            display: this.state.exList0.length != 0 && this.state.exList0style == true ? "block" : "none"
        }
        let exList1style = {
            display: this.state.exList1.length != 0 && this.state.exList1style == true ? "block" : "none"
        }
        let exList2style = {
            display: this.state.exList2.length != 0 && this.state.exList2style == true ? "block" : "none"
        }
        let EXspro_Timeover = {
            display: this.state.EXspro_Timeover ? "block" : "none"
        }
        let props = {
            //及时反馈答题的数量
            
            examItem: this.state.examItem,
            exList0: this.state.exList0,
            exList1: this.state.exList1,
            exList2:this.state.exList2,
            examxx: this.state.examxx,
            answers: this.state.answers,
            page: this.state.page,
          
        };
        let Spronum1="一、";
        let Spronum2="二、";
        let Spronum3="三、";
        if(this.state.exList0.length==0&&this.state.exList1.length!=0){
            Spronum2="一、";
            Spronum3="二、";
        }
        else if(this.state.exList1.length==0&&this.state.exList0.length!=0){
             Spronum3="二、";
        }
        else if(this.state.exList1.length==0&&this.state.exList0.length==0){
            Spronum3="一、"
        }

        let SprotimeInfo=String(this.state.SprotimeInfo);
        let showFlagStyle={
            display:this.state.showFlag?"none":"block"
        }
   
        return (
            <div> <div className="spro_M120Auto">
                       <div className="navWrap">
                            <div className="spro_sEXd">
                                <i className="X-icon" onClick={this.studentEx1.bind(this, this.state.permissions)}></i>
                            </div>
                            <div className="navpare">
                                <div className="nav">
                                    <div className="nav_left">
                                        <strong className="iconfont icon-yonghuming-">{this.state.username}</strong>
                                        <b>{this.state.exam_name}</b>
                                    </div>
                                    <div id="leadtime" style={leadtimestyle}>{this.state.leadtimeinfo}</div>
                                    <span style={{display:this.state.Tpreviewstate?"none":"block"}} className="quizNavspan" >已完成{this.state.examItem+this.state.exList2answernum}/{this.state.examNum}</span>
                                </div>
                            </div>
                        </div>
                <div className="SproquizEx" id="SproquizEx" style={showFlagStyle}>
                   
                        <form  id="form_id" className='own form_id'>
                            <div className="danxuans" onChange={this.handleChange.bind(this)}>
                                <div className="danxuanstyle" style={exList0style} id="exlist0style">
                                    <div className="danxuan" >
                                        <span className="h-cubiud"></span><span className="h-information"><strong>{Spronum1}</strong> 单选题<i>({this.state.radioscores}分，每题{this.state.radioscore}分)
                                        <b className="seeanswer" style={{display:this.state.EXLorW!="SL"?"none":"inline-block"}}><i className="exSpro-icon Sproquiz-icon"></i>为正确答案</b></i></span></div>
                                    {
                                        this.state.exList0.map((todo, index) => {
                                            return <SproOneStyle key={index} {...todo} index={index} {...this.props} examNums={this.state.examNum}
                                                EXstate={this.state.EXstate}
                                                Tpreviewstate={this.state.Tpreviewstate}
                                                EXLorW={this.state.EXLorW}
                                                EXCoarray={this.state.EXCoarray}
                                                radioscore={this.state.radioscore}
                                                MHeight={this.MHeight.bind(this)}/>
                                        })
                                    }
                                </div>
                                <div className="dunxuanstyle" style={exList1style} id="exlist1style">
                                    <div className="duoxuan"  ><span className="h-cubiud"></span><span className="h-information">
                                        <strong>{Spronum2}</strong>多选题<i>({this.state.checkboxscores}分，每题{this.state.checkboxscore}分)
                                        <b className="seeanswer c1" style={{display:this.state.EXLorW!="SL"?"none":"inline-block"}}><i className="exSpro-icon Sproquiz-icon"></i>为正确答案</b></i></span></div>
                                    {
                                        this.state.exList1.map((todo, index) => {
                                            return <SproTwoStyle
                                                EXstate={this.state.EXstate} Tpreviewstate={this.state.Tpreviewstate}
                                                 EXLorW={this.state.EXLorW}
                                                key={index} {...todo} index={index} {...this.props} examNums={this.state.examNum} exl1length={this.state.exList0.length}
                                                EXCoarray={this.state.EXCoarray} 
                                                checkboxscore={this.state.checkboxscore}
                                                MHeight={this.MHeight.bind(this)}/>
                                        })
                                    }
                                </div>
                                </div>
                                <div>
                                     <div className="duoxuan" style={exList2style} ><span className="h-cubiud"></span><span className="h-information">
                                         <strong>{Spronum3}</strong>简答题<i>({this.state.exList2scores}分，每题{this.state.exList2score}分)</i></span></div>
                                        { this.state.exList2.map((Sprov,Sprok)=>{
                                           return (
                                            <Sproshortanswerquestion
                                               Tpreviewstate={this.state.Tpreviewstate}
                                               EXstate={this.state.EXstate}
                                                EXLorW={this.state.EXLorW}
                                               key={Sprok} {...Sprov} index={Sprok} {...this.props} examNums={this.state.examNum}
                                               exList2Submitresult={this.exList2Submitresult.bind(this)}
                                               SproMathexList2={this.SproMathexList2.bind(this)}
                                               exList2length={this.state.exList2.length}
                                               ExSubarray={this.state.ExSubarray[Sprok]}
                                               EXSubscoreArray={this.state.EXSubscoreArray[Sprok]}
                                               MHeight={this.MHeight.bind(this)}
                                            />
                                           )
                                          })

                                     }
                                </div>
                                <div className="submitDiv" style={{display:this.state.EXstate=="K"?"block":"none"}}><input className="submit" type="button" value="提交并退出" onClick={this.EXhandleSubmit.bind(this, this.state.examItem+this.state.exList2answernum < this.state.examNum ? "1" : "0", "0")} /><i className="fc6900">* 提交答案后，将无法再次进入考试</i>
                                </div>

                        </form>
                    </div>
                </div>
                <div className="EXspro_delete" >
                    <div className="EXspro_deletes" >
                        <div className="EXspro_preheads">
                            <span className="fl EXspro_deletprev1"></span>
                            <span className="fr EXspro_deletprevs iconfont icon-guanbi" onClick={this.EXhandleSubmit.bind(this, "0", "2")}></span>
                        </div>
                        <p className="EXspro_deletitle"></p>
                        <div className="EXspro_prevbtns">
                            <button className="EXspro_prevbtns1" onClick={this.EXhandleSubmit.bind(this, this.state.permissions, "2")}>取消</button>
                            <button className="EXspro_prevbtns2" onClick={this.EXhandleSubmit.bind(this, this.state.permissions, "3")}>确定</button>
                        </div>

                    </div>
                </div>
                <div className="EXspro_Timeover" style={EXspro_Timeover}>
                    <div className="EXspro_deletes" >
                        <div className="EXspro_preheads">
                            <span className="fl EXspro_deletprev1"></span>
                            <span className="fr EXspro_deletprevs iconfont icon-guanbi" onClick={this.EXTimeout.bind(this)} style={{display:"none"}}></span>
                        </div>
                        <p className="EXspro_deletitle">考试时间到，试卷已提交，无法再次修改答案</p>
                        <div className="EXspro_prevbtns">
                            <button className="EXspro_prevbtns2" onClick={this.EXTimeout.bind(this)}>知道了</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
