'use strict';
import React from 'react';
import $ from 'jquery';
export default class SkItem extends React.Component{
    constructor() {
        super();
        this.state=({
            info:"",
            val:"",
            SKscore:"",
            isSave:false,
            urlFlag:[]
        })
    }
    //只触发一次
    componentWillMount(){
      let urlFlag=location.hash;
         if(urlFlag.indexOf("LKSG")!=-1){
           
         this.setState({
            urlFlag:"S",
            SKscore:this.props.score!=null?this.props.score:0,
         })
        }else{
        this.setState({
            urlFlag:"E",
            SKscore: this.props.evaluate!=null?this.props.evaluate:0, 
         })
        }
    }
    //父组件state改变时 会触发这个生命周期函数
    componentWillReceiveProps(propstate){
        
     if(propstate.isSave){
         let urlFlag=location.hash;
         if(urlFlag.indexOf("LKSG")!=-1){
   
         this.setState({
            SKscore:propstate.score,
         })

        }
        else{
            this.setState({
               SKscore: propstate.evaluate,
            })
        }
          this.props.isSaveInit();
     }else{
         let urlFlag=location.hash;
         if(urlFlag.indexOf("LKSG")!=-1){
   
         this.setState({
            SKscore:propstate.score,
         })

        }
        else{
            this.setState({
               SKscore: propstate.evaluate,
            })
        }
     }
    }
    changeHandle(e){
         var regExp =/\D/;
        var str = e.target.value;
        if (regExp.test(str) == true) {
            this.setState({"info":"*只能输入数字!"});
            setTimeout(function(){
                this.setState({"info":""});
                this.setState({
                      SKscore:''
                })
            }.bind(this),1000);
        } else {
            if(isNaN(str)){
            // val = _val;
            this.setState({"info":"只能输入数字!"});
            setTimeout(function(){
                this.setState({"info":""});
                this.setState({
                      SKscore:''
                })
            }.bind(this),1000);
        }else if(Number(str)>100){
            this.setState({"info":"请输入合理的数字!"});
            setTimeout(function(){
                this.setState({"info":"",});
                this.setState({
                      SKscore:''
                })
            }.bind(this),1000);
        }else if(Number(str)<0){
             this.setState({"info":"请输入合理的数字!"});
            setTimeout(function(){
                this.setState({"info":"",});
               this.setState({
                      SKscore:''
                })
            }.bind(this),1000);
        }else if(str.length>1&&Number(str.substring(0,1)==0)){
              this.setState({"info":"第一位数字不能为0!"});
            setTimeout(function(){
                this.setState({"info":"",});
               this.setState({
                      SKscore:''
                })
            }.bind(this),1000);
        }
        else{
            this.setState({
                SKscore:str
            })
           
           
            let  a=e.target.id;
            this.props.changeTodoscore(str,a);
        }


        }

    }
    handlerChange(){
       
        let isDone = !this.props.isDone;
        
        this.props.changeTodoState(this.props.index, isDone);
    }
    render() {
        let studentno=this.props.userid;
        
        let NUmberindex=Number(this.props.index);
        if(NUmberindex<9){
            NUmberindex="0"+(NUmberindex+1)
        }else{
            NUmberindex=NUmberindex+1
        }
        let Lflag=(location.hash.indexOf("LKG")!=-1);
        
        let inputStyle={
            display:Lflag?"none":"inline-block"
        }
        let Iteminfo={
            display:Lflag&&this.props.score==null?"none":"inline-block"
        }
        let SKItemStyle={
            paddingLeft:"22px"
        }
        // let SKTspanone={
        //     width:Lflag?"70px":"50px",
        //     marginLeft:Lflag?"10px":"20px"
        // }
        let SKTspanfiv={
            display:Lflag?"inline-block":"none"
        }
        // let SKTspanfouL={
        //     width:Lflag?"100px":"auto",
        //     textAlign:"center"
        // }
        const listConfig=this.props.listconfig;
        return(
            <div>
             <div className="SKItemStyle">       
                <span className="SKTspanone dib" style={{width:listConfig[0]+"%"}}>
                <input id={"SKItem"+this.props.index} style={inputStyle} type="checkbox"  checked={this.props.isDone} onChange={this.handlerChange.bind(this)}/>
                {NUmberindex}
                <label htmlFor={"SKItem"+this.props.index}></label>
                </span>
                <span className="SKTspantwo dib" style={{width:listConfig[1]+"%"}}>{this.props.username}</span>
                <span className="SKTspanthr dib" style={{width:listConfig[2]+"%"}}>{this.props.studentno}</span>
                <span className="SKTspanfou dib" style={{width:listConfig[3]+"%"}}>
                    <span className="SKTspanfouinputspan"  style={inputStyle}>    
                    <input className="SKTinput2"  
                        type="text" id={this.props.userid}
                        value={this.state.SKscore}
                        name={this.props.userid}
                        onChange={this.changeHandle.bind(this)}/>
                    </span>
                    <span style={SKTspanfiv}>{this.props.score!=null?this.props.score:"缺考"}</span>
                    <span className="SKspanscore" style={Iteminfo}>分</span>
                    <b className="SKTscoreinfo1">{this.state.info}</b>
                </span>   
             </div>
            </div>
        );
    }
}