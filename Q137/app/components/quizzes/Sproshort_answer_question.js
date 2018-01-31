import React from 'react';
export default class Sprosaq extends React.Component{
    constructor(props){
         super(props);
         this.state={
            sanswer:"",
            speedanwer:1,
            EXSubscoreItem:0,
            stemItem:2,
         }
    }
    componentWillMount(){
        this.props.SproMathexList2(this.props.index,this.props.id+"|")
        if(this.state.EXstate!="W"&&this.props.ExSubarray){
            let sanswer=this.props.ExSubarray.split("|")[1];
            // 答案的长度
            let speedanwer = this.props.MHeight(sanswer,87);
            this.setState({
                    sanswer:sanswer,
                    speedanwer:speedanwer,
                    EXSubscoreItem:this.props.EXSubscoreArray?this.props.EXSubscoreArray.split("!")[1]:0
            })
        }
        // 题干的长度
        let Height=this.props.MHeight(this.props.stem,90);
        this.setState({
            stemItem:Height
        })
        
      
    }
    strlen(str,width) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                len++;
            }
            else {
                len += 2;
            }
            if(c===10){
              len+=width;
            }
        }
        return len;
    }
    
    SubmitResult(event){
        let value="";
        if(event.target.value.length!=0){
           value=event.target.value;
        }
        if(value.trim()!= ""||value.indexOf("\n")!=-1){
            this.setState({
              speedanwer:Math.ceil(this.strlen(value,87)/87)
            })
            this.props.exList2Submitresult(value,this.props.index,this.props.id);
        }else{
            this.props.exList2Submitresult(value,this.props.index,this.props.id,"0");
        }
    }
    render(){
        let Height={
            height:(this.state.speedanwer*26+9)+"px"
        }
        let exStyle={
                display:this.props.EXstate=="K"?"none":"block"
        }
        let EXSubscoreItem=this.state.EXSubscoreItem;
        let score=this.props.score;
        let RightorErrorFlag="";
        if(EXSubscoreItem==score){
            RightorErrorFlag="icon-cuowu" + "" + " finalrflag " + "" + "iconfont"
        }else if(EXSubscoreItem==0&&score!=0){
            RightorErrorFlag="icon-cuowu" + "" + " finalrflag " + "" + "iconfont"
        }else if (!Boolean(EXSubscoreItem.trim())) {
            RightorErrorFlag = "icon-cuowu" + "" + " finalrflag " + "" + "iconfont"
        }
        let stemHei={
            height:(this.state.stemItem)*32+"px",
             width:this.props.EXstate==="L"?"89%":"100%"
        }
        return(
          <div className="exItem spre_newexItem">
          <div className="radioExam">
            <div className="h-titlItem spre_newexamdiv">
              <p className="Sprosaq_p quizz_subp">
              <strong style={{display:this.props.EXLorW!="SL"?"none":"inline-block"}} className={EXSubscoreItem==score||EXSubscoreItem==0?RightorErrorFlag:"finalrflag iconfont icon-cuowu"} ></strong>
              <span className="radiorightScore"  style={{display:this.props.EXLorW!="SL"?"none":"block"}}>
                  <i>{this.state.EXSubscoreItem!=null&&this.state.EXSubscoreItem!=""?"得分 :  加"+this.props.score+"分":"得分 :  加0分"}</i>
              </span>
                  <b className="spre_previewtestItemb Sprosaq_Itemb"><i className="iii" >{Number(this.props.index+1)<10?"0"+Number(this.props.index+1):
                  Number(this.props.index+1)}</i><i className="ii">/{this.props.exList2length<10?"0"+this.props.exList2length:this.props.exList2length}</i></b>
                  <textarea className="Sprosaq_Spanstem" style={stemHei} value={this.props.stem} readOnly>
                  </textarea></p>

                 <div className="textareaWrap" style={{display:this.props.EXLorW=="W"?"block":"none"}}>
                      <strong>输入答案 :</strong>
                      <textarea id={this.props.id} style={Height} placeholder="请输入正确答案" 
                      className="Sprosaq_textarea" onChange={this.SubmitResult.bind(this)}>
                </textarea>
                <div className="fileupload" style={{display:"none"}}></div>
                </div>
                <div className="textareaWrap" style={{display:this.props.EXLorW=="W"?"none":"block"}}>
                      <strong>学生答案 :</strong>
                      <textarea id={this.props.id+"answer"} className="Sprosaq_textareanswer" disabled
                      style={Height}>
                           {this.state.sanswer?this.state.sanswer:"考生未作答"}
                </textarea>
                <div className="fileupload" style={{display:"none"}}></div>
                </div>
            </div>
             <div className="rightItem spre_newrightItem" style={exStyle}><span className="answerspan_quizz"><i>正确答案:</i> {this.props.answer}
             </span></div>
          </div>
        </div>
        )
    }
}
